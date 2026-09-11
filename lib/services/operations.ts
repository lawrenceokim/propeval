import "server-only";

import { randomUUID } from "node:crypto";
import { bookings as fixtureBookings, guests as fixtureGuests, maintenanceRequests as fixtureMaintenance, properties as fixtureProperties } from "@/lib/data/seed";
import { getDatabase, hasDatabase } from "@/lib/data/database";
import type {
  Booking,
  BookingListItem,
  BookingStatus,
  CreateBookingFieldErrors,
  CreateBookingResult,
  DashboardData,
  Guest,
  MaintenanceListItem,
  MaintenancePriority,
  MaintenanceRequest,
  MaintenanceStatus,
  Property,
  PropertyDetail,
  PropertyListItem,
  PropertyStatus,
} from "@/lib/types";
import { bookingDatesOverlap, validateCreateBookingInput } from "@/lib/validation/booking";

interface PropertyFilters { city?: string; status?: PropertyStatus }
interface MaintenanceFilters { status?: MaintenanceStatus; priority?: MaintenancePriority }

export type CreateBookingErrorCode =
  | "VALIDATION_ERROR"
  | "PROPERTY_NOT_FOUND"
  | "BOOKING_CONFLICT"
  | "PERSISTENCE_UNAVAILABLE";

export class CreateBookingError extends Error {
  constructor(
    public readonly code: CreateBookingErrorCode,
    message: string,
    public readonly fieldErrors?: CreateBookingFieldErrors,
  ) {
    super(message);
    this.name = "CreateBookingError";
  }
}

function mapProperty(row: Record<string, unknown>): Property {
  return { id: String(row.id), name: String(row.name), city: String(row.city), address: String(row.address), monthlyRent: Number(row.monthly_rent), status: row.status as PropertyStatus, createdAt: new Date(String(row.created_at)).toISOString() };
}

function mapGuest(row: Record<string, unknown>): Guest {
  return { id: String(row.id), name: String(row.name), email: String(row.email), phone: String(row.phone), createdAt: new Date(String(row.created_at)).toISOString() };
}

function mapBookingDate(value: unknown): string {
  return value instanceof Date
    ? value.toISOString().slice(0, 10)
    : String(value).slice(0, 10);
}

function mapBooking(row: Record<string, unknown>): Booking {
  return { id: String(row.id), propertyId: String(row.property_id), guestId: String(row.guest_id), checkIn: mapBookingDate(row.check_in), checkOut: mapBookingDate(row.check_out), status: row.status as BookingStatus, createdAt: new Date(String(row.created_at)).toISOString() };
}

function mapMaintenance(row: Record<string, unknown>): MaintenanceRequest {
  return { id: String(row.id), propertyId: String(row.property_id), title: String(row.title), description: String(row.description), priority: row.priority as MaintenancePriority, status: row.status as MaintenanceStatus, createdAt: new Date(String(row.created_at)).toISOString() };
}

async function readSource() {
  if (!hasDatabase()) {
    return { properties: fixtureProperties, guests: fixtureGuests, bookings: fixtureBookings, maintenance: fixtureMaintenance };
  }

  const sql = getDatabase();
  const [propertyRows, guestRows, bookingRows, maintenanceRows] = await Promise.all([
    sql`select * from properties order by name`,
    sql`select * from guests order by name`,
    sql`select * from bookings order by check_in desc`,
    sql`select * from maintenance_requests order by created_at desc`,
  ]);

  return {
    properties: propertyRows.map((row) => mapProperty(row)),
    guests: guestRows.map((row) => mapGuest(row)),
    bookings: bookingRows.map((row) => mapBooking(row)),
    maintenance: maintenanceRows.map((row) => mapMaintenance(row)),
  };
}

function joinBookings(source: Awaited<ReturnType<typeof readSource>>): BookingListItem[] {
  const propertyById = new Map(source.properties.map((item) => [item.id, item]));
  const guestById = new Map(source.guests.map((item) => [item.id, item]));
  return source.bookings.flatMap((booking) => {
    const property = propertyById.get(booking.propertyId);
    const guest = guestById.get(booking.guestId);
    return property && guest ? [{ ...booking, property, guest }] : [];
  });
}

function joinMaintenance(source: Awaited<ReturnType<typeof readSource>>): MaintenanceListItem[] {
  const propertyById = new Map(source.properties.map((item) => [item.id, item]));
  return source.maintenance.flatMap((request) => {
    const property = propertyById.get(request.propertyId);
    return property ? [{ ...request, property }] : [];
  });
}

export async function getProperties(filters: PropertyFilters = {}): Promise<PropertyListItem[]> {
  const source = await readSource();
  const guestById = new Map(source.guests.map((item) => [item.id, item]));
  return source.properties
    .filter((property) => !filters.city || property.city === filters.city)
    .filter((property) => !filters.status || property.status === filters.status)
    .map((property) => {
      const booking = source.bookings.find((item) => item.propertyId === property.id && item.status === "active");
      const guest = booking ? guestById.get(booking.guestId) : undefined;
      return { ...property, currentBooking: booking && guest ? { ...booking, guest } : null };
    });
}

export async function getProperty(id: string): Promise<PropertyDetail | null> {
  const source = await readSource();
  const property = source.properties.find((item) => item.id === id);
  if (!property) return null;
  const bookingHistory = joinBookings(source).filter((item) => item.propertyId === id).sort((a, b) => b.checkIn.localeCompare(a.checkIn));
  const currentBooking = bookingHistory.find((item) => item.status === "active") ?? null;
  return { ...property, currentBooking, bookingHistory, maintenanceRequests: joinMaintenance(source).filter((item) => item.propertyId === id) };
}

export async function getBookings(status?: BookingStatus): Promise<BookingListItem[]> {
  const items = joinBookings(await readSource()).sort((a, b) => b.checkIn.localeCompare(a.checkIn));
  return status ? items.filter((item) => item.status === status) : items;
}

export async function createBooking(input: unknown): Promise<CreateBookingResult> {
  const validation = validateCreateBookingInput(input);
  if (!validation.ok) {
    throw new CreateBookingError(
      "VALIDATION_ERROR",
      "Check the highlighted fields and try again.",
      validation.fieldErrors,
    );
  }

  const bookingInput = validation.value;
  if (!hasDatabase()) {
    const propertyExists = fixtureProperties.some(
      (property) => property.id === bookingInput.propertyId,
    );
    if (!propertyExists) {
      throw new CreateBookingError(
        "PROPERTY_NOT_FOUND",
        "The selected property no longer exists.",
        { propertyId: "Select an available property." },
      );
    }
    throw new CreateBookingError(
      "PERSISTENCE_UNAVAILABLE",
      "Booking creation requires a configured database. Set DATABASE_URL and try again.",
    );
  }

  const sql = getDatabase();
  return sql.begin(async (transaction) => {
    const propertyRows = await transaction`
      select * from properties
      where id = ${bookingInput.propertyId}
      for update
    `;
    const propertyRow = propertyRows[0];
    if (!propertyRow) {
      throw new CreateBookingError(
        "PROPERTY_NOT_FOUND",
        "The selected property no longer exists.",
        { propertyId: "Select an available property." },
      );
    }

    const blockingBookings = await transaction`
      select check_in, check_out from bookings
      where property_id = ${bookingInput.propertyId}
        and status in ('confirmed', 'active')
    `;
    const hasConflict = blockingBookings.some((booking) =>
      bookingDatesOverlap(
        bookingInput.checkIn,
        bookingInput.checkOut,
        mapBookingDate(booking.check_in),
        mapBookingDate(booking.check_out),
      ),
    );
    if (hasConflict) {
      const dateMessage = "These dates overlap an active or confirmed booking.";
      throw new CreateBookingError(
        "BOOKING_CONFLICT",
        "This property is unavailable for the selected dates.",
        { checkIn: dateMessage, checkOut: dateMessage },
      );
    }

    const guestRows = await transaction`
      insert into guests (id, name, email, phone)
      values (
        ${`guest_${randomUUID()}`},
        ${bookingInput.guestName},
        ${bookingInput.guestEmail},
        ${bookingInput.guestPhone}
      )
      returning *
    `;
    const guestRow = guestRows[0];

    const bookingRows = await transaction`
      insert into bookings (id, property_id, guest_id, check_in, check_out, status)
      values (
        ${`book_${randomUUID()}`},
        ${bookingInput.propertyId},
        ${String(guestRow.id)},
        ${bookingInput.checkIn}::date,
        ${bookingInput.checkOut}::date,
        'confirmed'
      )
      returning *
    `;

    return {
      booking: {
        ...mapBooking(bookingRows[0]),
        property: mapProperty(propertyRow),
        guest: mapGuest(guestRow),
      },
    };
  });
}

export async function getMaintenanceRequests(filters: MaintenanceFilters = {}): Promise<MaintenanceListItem[]> {
  return joinMaintenance(await readSource())
    .filter((item) => !filters.status || item.status === filters.status)
    .filter((item) => !filters.priority || item.priority === filters.priority)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getDashboardData(): Promise<DashboardData> {
  const [properties, bookings, maintenance] = await Promise.all([getProperties(), getBookings(), getMaintenanceRequests()]);
  const occupiedProperties = properties.filter((item) => item.status === "occupied").length;
  const cities = Array.from(new Set(properties.map((item) => item.city)));
  const occupancyByCity = cities.map((city) => {
    const cityProperties = properties.filter((item) => item.city === city);
    const occupied = cityProperties.filter((item) => item.status === "occupied").length;
    return { city, occupied, total: cityProperties.length, rate: Math.round((occupied / cityProperties.length) * 100) };
  });
  const upcomingCheckIns = bookings.filter((item) => item.status === "confirmed").sort((a, b) => a.checkIn.localeCompare(b.checkIn));
  const outstandingMaintenance = maintenance.filter((item) => item.status !== "resolved").sort((a, b) => {
    const rank: Record<MaintenancePriority, number> = { critical: 4, high: 3, medium: 2, low: 1 };
    return rank[b.priority] - rank[a.priority] || b.createdAt.localeCompare(a.createdAt);
  });
  return {
    metrics: {
      totalProperties: properties.length,
      occupiedProperties,
      vacantProperties: properties.length - occupiedProperties,
      occupancyRate: Math.round((occupiedProperties / properties.length) * 100),
      activeBookings: bookings.filter((item) => item.status === "active").length,
      upcomingCheckIns: upcomingCheckIns.length,
      openMaintenanceRequests: outstandingMaintenance.length,
    },
    occupancyByCity,
    upcomingCheckIns: upcomingCheckIns.slice(0, 4),
    outstandingMaintenance: outstandingMaintenance.slice(0, 5),
  };
}

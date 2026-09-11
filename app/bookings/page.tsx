import type { Metadata } from "next";
import { FilterBar } from "@/components/filter-bar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { formatDate } from "@/lib/format";
import { getBookings } from "@/lib/services/operations";
import { BOOKING_STATUSES, type BookingStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Bookings" };
export const dynamic = "force-dynamic";

export default async function BookingsPage({
  searchParams,
}: PageProps<"/bookings">) {
  const query = await searchParams;
  const requestedStatus =
    typeof query.status === "string" ? query.status : undefined;
  const status = BOOKING_STATUSES.includes(requestedStatus as BookingStatus)
    ? (requestedStatus as BookingStatus)
    : undefined;
  const bookings = await getBookings(status);
  const createAction = (
    <div>
      <button
        className="button button-primary"
        type="button"
        disabled
        aria-describedby="create-booking-hint"
      >
        Create booking
      </button>
      <span id="create-booking-hint" className="button-hint">
        Workflow not yet implemented
      </span>
    </div>
  );
  return (
    <>
      <PageHeader
        eyebrow="Guest operations"
        title="Bookings"
        description="Track current stays, upcoming arrivals, and historical bookings."
        action={createAction}
      />
      <FilterBar
        clearHref="/bookings"
        resultCount={bookings.length}
        resultLabel={bookings.length === 1 ? "booking" : "bookings"}
        fields={[
          {
            name: "status",
            label: "Status",
            value: status,
            options: BOOKING_STATUSES.map((value) => ({
              value,
              label:
                value === "cancelled"
                  ? "Cancelled"
                  : value[0].toUpperCase() + value.slice(1),
            })),
          },
        ]}
      />
      <div className="data-panel">
        {bookings.length === 0 ? (
          <EmptyState
            icon="bookings"
            title="No bookings found"
            description="No bookings match this status. Clear the filter to see the complete booking history."
          />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Property</th>
                <th>City</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td data-primary>
                    <div className="primary-cell">
                      <strong>{booking.guest.name}</strong>
                      <span>{booking.guest.email}</span>
                    </div>
                  </td>
                  <td data-label="Property">{booking.property.name}</td>
                  <td data-label="City">{booking.property.city}</td>
                  <td data-label="Check-in">{formatDate(booking.checkIn)}</td>
                  <td data-label="Check-out">{formatDate(booking.checkOut)}</td>
                  <td data-label="Status">
                    <Badge value={booking.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

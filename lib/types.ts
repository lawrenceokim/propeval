export const PROPERTY_STATUSES = ["occupied", "vacant"] as const;
export const BOOKING_STATUSES = ["confirmed", "active", "completed", "cancelled"] as const;
export const MAINTENANCE_PRIORITIES = ["low", "medium", "high", "critical"] as const;
export const MAINTENANCE_STATUSES = ["open", "in_progress", "resolved"] as const;

export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];
export type BookingStatus = (typeof BOOKING_STATUSES)[number];
export type MaintenancePriority = (typeof MAINTENANCE_PRIORITIES)[number];
export type MaintenanceStatus = (typeof MAINTENANCE_STATUSES)[number];

export interface Property {
  id: string;
  name: string;
  city: string;
  address: string;
  monthlyRent: number;
  status: PropertyStatus;
  createdAt: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  createdAt: string;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  createdAt: string;
}

export interface PropertyListItem extends Property {
  currentBooking: (Booking & { guest: Guest }) | null;
}

export interface BookingListItem extends Booking {
  property: Property;
  guest: Guest;
}

export interface MaintenanceListItem extends MaintenanceRequest {
  property: Property;
}

export interface PropertyDetail extends Property {
  currentBooking: (Booking & { guest: Guest }) | null;
  bookingHistory: BookingListItem[];
  maintenanceRequests: MaintenanceListItem[];
}

export interface DashboardData {
  metrics: {
    totalProperties: number;
    occupiedProperties: number;
    vacantProperties: number;
    occupancyRate: number;
    activeBookings: number;
    upcomingCheckIns: number;
    openMaintenanceRequests: number;
  };
  occupancyByCity: Array<{ city: string; occupied: number; total: number; rate: number }>;
  upcomingCheckIns: BookingListItem[];
  outstandingMaintenance: MaintenanceListItem[];
}

import type { Metadata } from "next";
import { BookingsContent } from "@/components/bookings-content";
import { getBookings, getProperties } from "@/lib/services/operations";
import { BOOKING_STATUSES, type BookingStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Bookings" };
export const dynamic = "force-dynamic";

export default async function BookingsPage({ searchParams }: PageProps<"/bookings">) {
  const query = await searchParams;
  const requestedStatus =
    typeof query.status === "string" ? query.status : undefined;
  const status = BOOKING_STATUSES.includes(requestedStatus as BookingStatus)
    ? (requestedStatus as BookingStatus)
    : undefined;
  return <BookingsContent source={getBookings(status)} status={status} properties={getProperties()} />;
}

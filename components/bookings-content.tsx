import { CreateBookingDialog } from "@/components/create-booking-dialog";
import { FilterBar } from "@/components/filter-bar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { formatDate } from "@/lib/format";
import { BOOKING_STATUSES, type BookingStatus } from "@/lib/types";

import { DataRegion } from "@/components/data-region";
import { DataSkeleton, TableRowsSkeleton } from "@/components/ui/data-skeleton";
import type { BookingListItem, PropertyListItem } from "@/lib/types";

const columns = ["Guest","Property","City","Check-in","Check-out","Status"] as const;

export function BookingsContent({ source, status, properties }: { source?: Promise<BookingListItem[]>; status?: BookingStatus; properties?: Promise<PropertyListItem[]>; }) {
  const createAction = <DataRegion source={properties} fallback={<div className="create-booking-action"><button className="button button-primary" type="button" disabled aria-busy="true">Create booking</button><p className="booking-success" /></div>}>{(items) => <CreateBookingDialog properties={items.map(({ id, name, city }) => ({ id, name, city }))} />}</DataRegion>;
  return <>
    <PageHeader
        eyebrow="Guest operations"
        title="Bookings"
        description="Track current stays, upcoming arrivals, and historical bookings."
        action={createAction}
      />
    <FilterBar
        clearHref="/bookings"
        pending={!source} key={JSON.stringify([status])} result={<DataRegion source={source} fallback={<><DataSkeleton label="Loading count" /> bookings</>}>{(bookings) => <><strong>{bookings.length}</strong> {bookings.length === 1 ? "booking" : "bookings"}</>}</DataRegion>}
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
    <div className="data-panel"><table className="data-table"><thead>
              <tr>
                <th>Guest</th>
                <th>Property</th>
                <th>City</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
              </tr>
            </thead><tbody>
      <DataRegion source={source} fallback={<TableRowsSkeleton columns={columns} />}>{(bookings) => bookings.length === 0 ? <tr className="empty-table-row"><td colSpan={columns.length}><EmptyState icon="bookings" title="No bookings found" description="No bookings match this status. Clear the filter to see the complete booking history." /></td></tr> : <>
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
            </>}</DataRegion>
    </tbody></table></div>
  </>;
}

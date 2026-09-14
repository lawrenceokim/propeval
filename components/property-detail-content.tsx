import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";
import { formatCurrency, formatDate } from "@/lib/format";
import type { PropertyDetail } from "@/lib/types";
import { DataRegion } from "@/components/data-region";
import { DataSkeleton, ListSkeleton } from "@/components/ui/data-skeleton";

export function PropertyDetailContent({ source }: { source?: Promise<PropertyDetail> }) {
  return <>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/properties">Properties</Link><Icon name="chevron" size={14} /><span aria-current="page"><DataRegion source={source} fallback={<DataSkeleton />}>{(property) => property.name}</DataRegion></span></nav>
    <section className="detail-hero"><div><p className="overline"><DataRegion source={source} fallback={<DataSkeleton />}>{(property) => property.city}</DataRegion> portfolio</p><h1><DataRegion source={source} fallback={<DataSkeleton />}>{(property) => property.name}</DataRegion></h1><p className="detail-address"><Icon name="pin" size={16} /><DataRegion source={source} fallback={<DataSkeleton />}>{(property) => property.address}</DataRegion></p></div><div className="detail-price"><strong><DataRegion source={source} fallback={<DataSkeleton />}>{(property) => formatCurrency(property.monthlyRent, property.city)}</DataRegion></strong><span>per month</span></div></section>
    <div className="detail-grid">
      <div className="detail-stack">
        <section className="panel"><div className="panel-header"><div><p className="overline">Live status</p><h2>Occupancy</h2></div><DataRegion source={source} fallback={<DataSkeleton />}>{(property) => <Badge value={property.status} />}</DataRegion></div>
          <div className="info-list"><div className="info-item"><span>City</span><strong><DataRegion source={source} fallback={<DataSkeleton />}>{(property) => property.city}</DataRegion></strong></div><div className="info-item"><span>Property ID</span><strong><DataRegion source={source} fallback={<DataSkeleton />}>{(property) => property.id}</DataRegion></strong></div><div className="info-item"><span>Monthly rent</span><strong><DataRegion source={source} fallback={<DataSkeleton />}>{(property) => formatCurrency(property.monthlyRent, property.city)}</DataRegion></strong></div><div className="info-item"><span>Added to portfolio</span><strong><DataRegion source={source} fallback={<DataSkeleton />}>{(property) => formatDate(property.createdAt)}</DataRegion></strong></div></div>
          <DataRegion source={source} fallback={<div className="booking-guest"><ListSkeleton rows={1} /></div>}>{(property) => { const initials = property.currentBooking?.guest.name.split(" ").map((part) => part[0]).join("").slice(0, 2); return (property.currentBooking ? <div className="booking-guest"><span className="avatar">{initials}</span><div><strong>{property.currentBooking.guest.name}</strong><span>{property.currentBooking.guest.email}</span><span>{formatDate(property.currentBooking.checkIn)} – {formatDate(property.currentBooking.checkOut)}</span></div></div> : <div className="booking-guest"><span className="metric-icon"><Icon name="key" /></span><div><strong>Ready for a guest</strong><span>There is no active booking at this property.</span></div></div>); }}</DataRegion>
        </section>
        <section className="panel"><div className="panel-header"><div><p className="overline">Stay record</p><h2>Booking history</h2></div><Link href="/bookings" className="text-link">All bookings <Icon name="arrow" size={16} /></Link></div>
          <DataRegion source={source} fallback={<ListSkeleton />}>{(property) => (property.bookingHistory.length ? <div className="compact-list">{property.bookingHistory.map((booking) => <div className="compact-row" key={booking.id}><div className="compact-copy"><strong>{booking.guest.name}</strong><span>{formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}</span></div><Badge value={booking.status} /></div>)}</div> : <EmptyState icon="bookings" title="No booking history" description="This property has no recorded stays yet." />)}</DataRegion>
        </section>
      </div>
      <section className="panel"><div className="panel-header"><div><p className="overline">Property care</p><h2>Maintenance</h2></div><Link href={`/maintenance?status=open`} className="text-link">Open queue <Icon name="arrow" size={16} /></Link></div>
          <DataRegion source={source} fallback={<ListSkeleton />}>{(property) => (property.maintenanceRequests.length ? <div className="compact-list">{property.maintenanceRequests.map((request) => <div className="compact-row" key={request.id}><div className="compact-copy"><strong>{request.title}</strong><span>{formatDate(request.createdAt)}</span></div><div className="badge-group"><Badge value={request.priority} /><Badge value={request.status} /></div></div>)}</div> : <EmptyState icon="maintenance" title="No maintenance requests" description="There are no requests logged for this property." />)}</DataRegion>
      </section>
    </div>
  </>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";
import { formatCurrency, formatDate } from "@/lib/format";
import { getProperty } from "@/lib/services/operations";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/properties/[id]">): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);
  return { title: property?.name ?? "Property not found" };
}

export default async function PropertyDetailPage({ params }: PageProps<"/properties/[id]">) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) notFound();
  const initials = property.currentBooking?.guest.name.split(" ").map((part) => part[0]).join("").slice(0, 2);
  return <>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/properties">Properties</Link><Icon name="chevron" size={14} /><span aria-current="page">{property.name}</span></nav>
    <section className="detail-hero"><div><p className="overline">{property.city} portfolio</p><h1>{property.name}</h1><p className="detail-address"><Icon name="pin" size={16} />{property.address}</p></div><div className="detail-price"><strong>{formatCurrency(property.monthlyRent, property.city)}</strong><span>per month</span></div></section>
    <div className="detail-grid">
      <div className="detail-stack">
        <section className="panel"><div className="panel-header"><div><p className="overline">Live status</p><h2>Occupancy</h2></div><Badge value={property.status} /></div>
          <div className="info-list"><div className="info-item"><span>City</span><strong>{property.city}</strong></div><div className="info-item"><span>Property ID</span><strong>{property.id}</strong></div><div className="info-item"><span>Monthly rent</span><strong>{formatCurrency(property.monthlyRent, property.city)}</strong></div><div className="info-item"><span>Added to portfolio</span><strong>{formatDate(property.createdAt)}</strong></div></div>
          {property.currentBooking ? <div className="booking-guest"><span className="avatar">{initials}</span><div><strong>{property.currentBooking.guest.name}</strong><span>{property.currentBooking.guest.email}</span><span>{formatDate(property.currentBooking.checkIn)} – {formatDate(property.currentBooking.checkOut)}</span></div></div> : <div className="booking-guest"><span className="metric-icon"><Icon name="key" /></span><div><strong>Ready for a guest</strong><span>There is no active booking at this property.</span></div></div>}
        </section>
        <section className="panel"><div className="panel-header"><div><p className="overline">Stay record</p><h2>Booking history</h2></div><Link href="/bookings" className="text-link">All bookings <Icon name="arrow" size={16} /></Link></div>
          {property.bookingHistory.length ? <div className="compact-list">{property.bookingHistory.map((booking) => <div className="compact-row" key={booking.id}><div className="compact-copy"><strong>{booking.guest.name}</strong><span>{formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}</span></div><Badge value={booking.status} /></div>)}</div> : <EmptyState icon="bookings" title="No booking history" description="This property has no recorded stays yet." />}
        </section>
      </div>
      <section className="panel"><div className="panel-header"><div><p className="overline">Property care</p><h2>Maintenance</h2></div><Link href={`/maintenance?status=open`} className="text-link">Open queue <Icon name="arrow" size={16} /></Link></div>
        {property.maintenanceRequests.length ? <div className="compact-list">{property.maintenanceRequests.map((request) => <div className="compact-row" key={request.id}><div className="compact-copy"><strong>{request.title}</strong><span>{formatDate(request.createdAt)}</span></div><div className="badge-group"><Badge value={request.priority} /><Badge value={request.status} /></div></div>)}</div> : <EmptyState icon="maintenance" title="No maintenance requests" description="There are no requests logged for this property." />}
      </section>
    </div>
  </>;
}

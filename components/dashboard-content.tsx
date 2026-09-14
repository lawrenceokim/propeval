import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Icon, type IconName } from "@/components/ui/icon";
import { PageHeader } from "@/components/ui/page-header";
import { formatShortDate } from "@/lib/format";
import type { DashboardData } from "@/lib/types";
import { DataRegion } from "@/components/data-region";
import { DataSkeleton, DashboardListSkeleton } from "@/components/ui/data-skeleton";

  const metricCards: Array<{ label: string; value: (data: DashboardData) => string | number; context: string | ((data: DashboardData) => string); icon: IconName; emphasized?: boolean }> = [
    { label: "Total properties", value: (data) => data.metrics.totalProperties, context: "Across 4 operating cities", icon: "building" },
    { label: "Occupied properties", value: (data) => data.metrics.occupiedProperties, context: "Homes with active guest stays", icon: "user" },
    { label: "Vacant properties", value: (data) => data.metrics.vacantProperties, context: "Available or awaiting arrival", icon: "key" },
    { label: "Occupancy rate", value: (data) => `${data.metrics.occupancyRate}%`, context: (data) => `${data.metrics.occupiedProperties} of ${data.metrics.totalProperties} currently occupied`, icon: "trend", emphasized: true },
    { label: "Active bookings", value: (data) => data.metrics.activeBookings, context: "Guests currently in residence", icon: "bookings" },
    { label: "Upcoming check-ins", value: (data) => data.metrics.upcomingCheckIns, context: "Confirmed arrivals ahead", icon: "calendar" },
    { label: "Open maintenance", value: (data) => data.metrics.openMaintenanceRequests, context: "Includes in-progress work", icon: "wrench" },
  ];

export function DashboardContent({ source }: { source?: Promise<DashboardData> }) {
  return <>
    <PageHeader eyebrow="Operations overview" title="Good morning, Maya" description="Here’s what needs attention across the portfolio today." />
    <section aria-labelledby="portfolio-heading"><div className="section-heading"><div><p className="overline">Live portfolio</p><h2 id="portfolio-heading">At a glance</h2></div><span className="live-indicator"><span /><DataRegion source={source} fallback={<>Updating…</>}>{() => <>Updated just now</>}</DataRegion></span></div>
      <div className="metric-grid">{metricCards.map((metric) => <article className={`metric-card ${metric.emphasized ? "metric-featured" : ""}`} key={metric.label}><div className="metric-card-top"><p>{metric.label}</p><span className="metric-icon"><Icon name={metric.icon} size={18} /></span></div><strong className="metric-value"><DataRegion source={source} fallback={<DataSkeleton label={`Loading ${metric.label.toLowerCase()}`} />}>{(data) => metric.value(data)}</DataRegion></strong><span className="metric-context">{typeof metric.context === "string" ? metric.context : <DataRegion source={source} fallback={<DataSkeleton />}>{(data) => typeof metric.context === "function" ? metric.context(data) : metric.context}</DataRegion>}</span></article>)}</div>
    </section>
    <div className="dashboard-grid">
      <section className="panel" aria-labelledby="occupancy-heading"><div className="panel-header"><div><p className="overline">Portfolio health</p><h2 id="occupancy-heading">Occupancy by city</h2></div><Link href="/properties" className="text-link">View properties <Icon name="arrow" size={16} /></Link></div>
        <DataRegion source={source} fallback={<DashboardListSkeleton kind="occupancy" />}>{(data) => (<div className="occupancy-list">{data.occupancyByCity.map((item) => <div className="occupancy-row" key={item.city}><div className="occupancy-meta"><span><strong>{item.city}</strong><small>{item.occupied} of {item.total} occupied</small></span><strong>{item.rate}%</strong></div><div className="progress-track" role="progressbar" aria-label={`${item.city} occupancy`} aria-valuenow={item.rate} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${item.rate}%` }} /></div></div>)}</div>)}</DataRegion>
      </section>
      <section className="panel" aria-labelledby="arrivals-heading"><div className="panel-header"><div><p className="overline">Guest arrivals</p><h2 id="arrivals-heading">Upcoming check-ins</h2></div><Link href="/bookings" className="text-link">All bookings <Icon name="arrow" size={16} /></Link></div>
        <DataRegion source={source} fallback={<DashboardListSkeleton kind="arrivals" />}>{(data) => (<div className="arrival-list">{data.upcomingCheckIns.map((booking) => <div className="arrival-row" key={booking.id}><span className="date-tile"><strong>{formatShortDate(booking.checkIn).split(" ")[0]}</strong><small>{formatShortDate(booking.checkIn).split(" ")[1]}</small></span><div className="arrival-details"><strong>{booking.guest.name}</strong><span>{booking.property.name} · {booking.property.city}</span></div><Badge value={booking.status} /></div>)}</div>)}</DataRegion>
      </section>
    </div>
    <section className="panel" aria-labelledby="maintenance-heading"><div className="panel-header"><div><p className="overline">Attention required</p><h2 id="maintenance-heading">Maintenance overview</h2></div><Link href="/maintenance" className="text-link">View all requests <Icon name="arrow" size={16} /></Link></div>
      <DataRegion source={source} fallback={<DashboardListSkeleton kind="maintenance" />}>{(data) => (<div className="maintenance-overview">{data.outstandingMaintenance.map((request) => <article className="maintenance-summary" key={request.id}><span className={`priority-bar priority-${request.priority}`} /><div className="maintenance-copy"><strong>{request.title}</strong><span>{request.property.name} · {request.property.city}</span></div><div className="badge-group"><Badge value={request.priority} /><Badge value={request.status} /></div></article>)}</div>)}</DataRegion>
    </section>
  </>;
}

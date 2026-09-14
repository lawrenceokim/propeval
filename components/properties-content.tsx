import Link from "next/link";
import { FilterBar } from "@/components/filter-bar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";
import { PageHeader } from "@/components/ui/page-header";
import { formatCurrency, formatDate } from "@/lib/format";
import type { PropertyStatus } from "@/lib/types";

import { DataRegion } from "@/components/data-region";
import { DataSkeleton, TableRowsSkeleton } from "@/components/ui/data-skeleton";
import type { PropertyListItem } from "@/lib/types";

const columns = ["Property","City","Monthly rent","Occupancy","Current guest","Action"] as const;

export function PropertiesContent({ source, city, status }: { source?: Promise<PropertyListItem[]>; city?: string; status?: PropertyStatus; }) {

  return <>
    <PageHeader eyebrow="Portfolio" title="Properties" description="Review occupancy, guest stays, and property details across every city." />
    <FilterBar clearHref="/properties" pending={!source} key={JSON.stringify([city, status])} result={<DataRegion source={source} fallback={<><DataSkeleton label="Loading count" /> properties</>}>{(properties) => <><strong>{properties.length}</strong> {properties.length === 1 ? "property" : "properties"}</>}</DataRegion>} fields={[
      { name: "city", label: "City", value: city, options: ["London", "Paris", "Lisbon", "Algiers"].map((value) => ({ value, label: value })) },
      { name: "status", label: "Occupancy", value: status, options: [{ value: "occupied", label: "Occupied" }, { value: "vacant", label: "Vacant" }] },
    ]} />
    <div className="data-panel"><table className="data-table"><thead><tr><th>Property</th><th>City</th><th>Monthly rent</th><th>Occupancy</th><th>Current guest</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>
      <DataRegion source={source} fallback={<TableRowsSkeleton columns={columns} />}>{(properties) => properties.length === 0 ? <tr className="empty-table-row"><td colSpan={columns.length}><EmptyState icon="properties" title="No properties found" description="No properties match these filters. Clear the filters to return to the full portfolio." /></td></tr> : <>{properties.map((property) => <tr key={property.id}>
      <td data-primary><div className="primary-cell"><strong>{property.name}</strong><span>{property.address}</span></div></td>
      <td data-label="City">{property.city}</td><td data-label="Monthly rent">{formatCurrency(property.monthlyRent, property.city)}</td><td data-label="Occupancy"><Badge value={property.status} /></td>
      <td data-label="Current guest">{property.currentBooking ? <div className="primary-cell"><strong>{property.currentBooking.guest.name}</strong><span>{formatDate(property.currentBooking.checkIn)} – {formatDate(property.currentBooking.checkOut)}</span></div> : <span className="secondary-cell">No active stay</span>}</td>
      <td data-label="Action"><Link className="table-link" href={`/properties/${property.id}`}>View <Icon name="chevron" size={15} /></Link></td>
    </tr>)}</>}</DataRegion>
    </tbody></table></div>
  </>;
}

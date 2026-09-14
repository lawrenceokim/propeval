import Link from "next/link";
import { FilterBar } from "@/components/filter-bar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { formatDate, labelize } from "@/lib/format";
import { MAINTENANCE_PRIORITIES, MAINTENANCE_STATUSES, type MaintenancePriority, type MaintenanceStatus } from "@/lib/types";

import { DataRegion } from "@/components/data-region";
import { DataSkeleton, TableRowsSkeleton } from "@/components/ui/data-skeleton";
import type { MaintenanceListItem } from "@/lib/types";

const columns = ["Issue","Property","Description","Priority","Status","Created"] as const;

export function MaintenanceContent({ source, status, priority }: { source?: Promise<MaintenanceListItem[]>; status?: MaintenanceStatus; priority?: MaintenancePriority; }) {

  return <>
    <PageHeader eyebrow="Property care" title="Maintenance" description="Triage issues, monitor active work, and keep every home guest-ready." />
    <FilterBar clearHref="/maintenance" pending={!source} key={JSON.stringify([status, priority])} result={<DataRegion source={source} fallback={<><DataSkeleton label="Loading count" /> requests</>}>{(requests) => <><strong>{requests.length}</strong> {requests.length === 1 ? "request" : "requests"}</>}</DataRegion>} fields={[
      { name: "status", label: "Status", value: status, options: MAINTENANCE_STATUSES.map((value) => ({ value, label: labelize(value) })) },
      { name: "priority", label: "Priority", value: priority, options: MAINTENANCE_PRIORITIES.map((value) => ({ value, label: labelize(value) })) },
    ]} />
    <div className="data-panel"><table className="data-table"><thead><tr><th>Issue</th><th>Property</th><th>Description</th><th>Priority</th><th>Status</th><th>Created</th></tr></thead><tbody>
      <DataRegion source={source} fallback={<TableRowsSkeleton columns={columns} />}>{(requests) => requests.length === 0 ? <tr className="empty-table-row"><td colSpan={columns.length}><EmptyState icon="maintenance" title="No maintenance requests" description="No requests match this combination. Clear the filters to review the full queue." /></td></tr> : <>{requests.map((request) => <tr key={request.id}>
      <td data-primary><div className="primary-cell"><strong>{request.title}</strong><span>{request.id}</span></div></td><td data-label="Property"><div className="primary-cell"><Link className="table-link" href={`/properties/${request.property.id}`}>{request.property.name}</Link><span>{request.property.city}</span></div></td><td data-label="Description"><p className="table-description">{request.description}</p></td><td data-label="Priority"><Badge value={request.priority} /></td><td data-label="Status"><Badge value={request.status} /></td><td data-label="Created">{formatDate(request.createdAt)}</td>
    </tr>)}</>}</DataRegion>
    </tbody></table></div>
  </>;
}

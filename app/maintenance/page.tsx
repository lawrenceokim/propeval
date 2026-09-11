import type { Metadata } from "next";
import Link from "next/link";
import { FilterBar } from "@/components/filter-bar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { formatDate, labelize } from "@/lib/format";
import { getMaintenanceRequests } from "@/lib/services/operations";
import { MAINTENANCE_PRIORITIES, MAINTENANCE_STATUSES, type MaintenancePriority, type MaintenanceStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Maintenance" };
export const dynamic = "force-dynamic";

export default async function MaintenancePage({ searchParams }: PageProps<"/maintenance">) {
  const query = await searchParams;
  const requestedStatus = typeof query.status === "string" ? query.status : undefined;
  const requestedPriority = typeof query.priority === "string" ? query.priority : undefined;
  const status = MAINTENANCE_STATUSES.includes(requestedStatus as MaintenanceStatus) ? requestedStatus as MaintenanceStatus : undefined;
  const priority = MAINTENANCE_PRIORITIES.includes(requestedPriority as MaintenancePriority) ? requestedPriority as MaintenancePriority : undefined;
  const requests = await getMaintenanceRequests({ status, priority });
  return <>
    <PageHeader eyebrow="Property care" title="Maintenance" description="Triage issues, monitor active work, and keep every home guest-ready." />
    <FilterBar clearHref="/maintenance" resultCount={requests.length} resultLabel={requests.length === 1 ? "request" : "requests"} fields={[
      { name: "status", label: "Status", value: status, options: MAINTENANCE_STATUSES.map((value) => ({ value, label: labelize(value) })) },
      { name: "priority", label: "Priority", value: priority, options: MAINTENANCE_PRIORITIES.map((value) => ({ value, label: labelize(value) })) },
    ]} />
    <div className="data-panel">{requests.length === 0 ? <EmptyState icon="maintenance" title="No maintenance requests" description="No requests match this combination. Clear the filters to review the full queue." /> : <table className="data-table"><thead><tr><th>Issue</th><th>Property</th><th>Description</th><th>Priority</th><th>Status</th><th>Created</th></tr></thead><tbody>{requests.map((request) => <tr key={request.id}>
      <td data-primary><div className="primary-cell"><strong>{request.title}</strong><span>{request.id}</span></div></td><td data-label="Property"><div className="primary-cell"><Link className="table-link" href={`/properties/${request.property.id}`}>{request.property.name}</Link><span>{request.property.city}</span></div></td><td data-label="Description"><p className="table-description">{request.description}</p></td><td data-label="Priority"><Badge value={request.priority} /></td><td data-label="Status"><Badge value={request.status} /></td><td data-label="Created">{formatDate(request.createdAt)}</td>
    </tr>)}</tbody></table>}</div>
  </>;
}

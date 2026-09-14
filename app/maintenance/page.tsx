import type { Metadata } from "next";
import { MaintenanceContent } from "@/components/maintenance-content";
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
  return <MaintenanceContent source={getMaintenanceRequests({ status, priority })} status={status} priority={priority} />;
}

import { apiError, internalServerError, ok } from "@/lib/http/api-response";
import { getMaintenanceRequests } from "@/lib/services/operations";
import { MAINTENANCE_PRIORITIES, MAINTENANCE_STATUSES, type MaintenancePriority, type MaintenanceStatus } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const priorityParam = searchParams.get("priority");
    if (statusParam && !MAINTENANCE_STATUSES.includes(statusParam as MaintenanceStatus)) return apiError("Invalid maintenance status.", 400, "INVALID_FILTER");
    if (priorityParam && !MAINTENANCE_PRIORITIES.includes(priorityParam as MaintenancePriority)) return apiError("Invalid maintenance priority.", 400, "INVALID_FILTER");
    const data = await getMaintenanceRequests({ status: statusParam as MaintenanceStatus | undefined, priority: priorityParam as MaintenancePriority | undefined });
    return ok(data, { count: data.length, filters: { status: statusParam ?? null, priority: priorityParam ?? null } });
  } catch (error) {
    return internalServerError(error);
  }
}

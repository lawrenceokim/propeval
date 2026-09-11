import { apiError, internalServerError, ok } from "@/lib/http/api-response";
import { getProperties } from "@/lib/services/operations";
import { PROPERTY_STATUSES, type PropertyStatus } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") ?? undefined;
    const statusParam = searchParams.get("status");
    if (statusParam && !PROPERTY_STATUSES.includes(statusParam as PropertyStatus)) return apiError("Invalid property status.", 400, "INVALID_FILTER");
    const data = await getProperties({ city, status: statusParam as PropertyStatus | undefined });
    return ok(data, { count: data.length, filters: { city: city ?? null, status: statusParam ?? null } });
  } catch (error) {
    return internalServerError(error);
  }
}

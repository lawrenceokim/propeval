import { apiError, internalServerError, ok } from "@/lib/http/api-response";
import { getBookings } from "@/lib/services/operations";
import { BOOKING_STATUSES, type BookingStatus } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const statusParam = new URL(request.url).searchParams.get("status");
    if (statusParam && !BOOKING_STATUSES.includes(statusParam as BookingStatus))
      return apiError("Invalid booking status.", 400, "INVALID_FILTER");
    const data = await getBookings(statusParam as BookingStatus | undefined);
    return ok(data, {
      count: data.length,
      filters: { status: statusParam ?? null },
    });
  } catch (error) {
    return internalServerError(error);
  }
}

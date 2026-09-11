import { apiError, created, internalServerError, ok } from "@/lib/http/api-response";
import { createBooking, CreateBookingError, getBookings } from "@/lib/services/operations";
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

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError(
      "Send a valid JSON request body.",
      400,
      "MALFORMED_JSON",
    );
  }

  try {
    return created(await createBooking(body));
  } catch (error) {
    if (error instanceof CreateBookingError) {
      const statusByCode = {
        VALIDATION_ERROR: 400,
        PROPERTY_NOT_FOUND: 404,
        BOOKING_CONFLICT: 409,
        PERSISTENCE_UNAVAILABLE: 503,
      } as const;
      return apiError(error.message, statusByCode[error.code], error.code, {
        fieldErrors: error.fieldErrors,
      });
    }
    return internalServerError(
      error,
      "We could not create the booking. Please try again.",
    );
  }
}

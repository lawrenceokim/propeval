import { apiError, internalServerError, ok } from "@/lib/http/api-response";
import {
  CreateBookingError,
  getBookingAvailability,
} from "@/lib/services/operations";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;

  try {
    const result = await getBookingAvailability({
      propertyId: searchParams.get("propertyId"),
      checkIn: searchParams.get("checkIn"),
      checkOut: searchParams.get("checkOut"),
    });
    return ok(result);
  } catch (error) {
    if (error instanceof CreateBookingError) {
      const status = error.code === "PROPERTY_NOT_FOUND" ? 404 : 400;
      return apiError(error.message, status, error.code, {
        fieldErrors: error.fieldErrors,
      });
    }
    return internalServerError(
      error,
      "We could not check availability. You can still create the booking.",
    );
  }
}

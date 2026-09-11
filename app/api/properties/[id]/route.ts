import { apiError, internalServerError, ok } from "@/lib/http/api-response";
import { getProperty } from "@/lib/services/operations";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const property = await getProperty(id);
    if (!property) return apiError("Property not found.", 404, "NOT_FOUND");
    return ok(property);
  } catch (error) {
    return internalServerError(error);
  }
}

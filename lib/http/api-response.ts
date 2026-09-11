export function ok<T>(data: T, meta?: Record<string, unknown>): Response {
  return Response.json(meta ? { data, meta } : { data }, { status: 200 });
}

export function apiError(message: string, status = 500, code = "INTERNAL_ERROR"): Response {
  return Response.json({ error: { code, message } }, { status });
}

export function internalServerError(error: unknown): Response {
  console.error("API request failed", error);
  return apiError("We could not load this data. Please try again.");
}

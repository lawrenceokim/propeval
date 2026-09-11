export function ok<T>(data: T, meta?: Record<string, unknown>): Response {
  return Response.json(meta ? { data, meta } : { data }, { status: 200 });
}

export function created<T>(data: T): Response {
  return Response.json({ data }, { status: 201 });
}

export function apiError(
  message: string,
  status = 500,
  code = "INTERNAL_ERROR",
  details?: Record<string, unknown>,
): Response {
  return Response.json({ error: { code, message, ...details } }, { status });
}

export function internalServerError(
  error: unknown,
  message = "We could not load this data. Please try again.",
): Response {
  console.error("API request failed", error);
  return apiError(message);
}

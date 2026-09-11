import type {
  CreateBookingFieldErrors,
  CreateBookingInput,
} from "@/lib/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

type CreateBookingValidationResult =
  | { ok: true; value: CreateBookingInput }
  | { ok: false; fieldErrors: CreateBookingFieldErrors };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readTrimmedString(
  source: Record<string, unknown>,
  field: keyof CreateBookingInput,
): string {
  const value = source[field];
  return typeof value === "string" ? value.trim() : "";
}

export function isValidBookingDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  if (value.startsWith("0000-")) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function bookingDatesOverlap(
  newCheckIn: string,
  newCheckOut: string,
  existingCheckIn: string,
  existingCheckOut: string,
): boolean {
  return newCheckIn < existingCheckOut && newCheckOut > existingCheckIn;
}

export function validateCreateBookingInput(
  input: unknown,
): CreateBookingValidationResult {
  const source = isRecord(input) ? input : {};
  const value: CreateBookingInput = {
    propertyId: readTrimmedString(source, "propertyId"),
    guestName: readTrimmedString(source, "guestName"),
    guestEmail: readTrimmedString(source, "guestEmail"),
    guestPhone: readTrimmedString(source, "guestPhone"),
    checkIn: readTrimmedString(source, "checkIn"),
    checkOut: readTrimmedString(source, "checkOut"),
  };
  const fieldErrors: CreateBookingFieldErrors = {};

  if (!value.propertyId) fieldErrors.propertyId = "Select a property.";
  if (!value.guestName) fieldErrors.guestName = "Enter the guest's name.";
  if (!value.guestEmail) {
    fieldErrors.guestEmail = "Enter the guest's email address.";
  } else if (!EMAIL_PATTERN.test(value.guestEmail)) {
    fieldErrors.guestEmail = "Enter a valid email address.";
  }
  if (!value.guestPhone) fieldErrors.guestPhone = "Enter the guest's phone number.";
  if (!value.checkIn) {
    fieldErrors.checkIn = "Select a check-in date.";
  } else if (!isValidBookingDate(value.checkIn)) {
    fieldErrors.checkIn = "Enter a valid check-in date.";
  }
  if (!value.checkOut) {
    fieldErrors.checkOut = "Select a check-out date.";
  } else if (!isValidBookingDate(value.checkOut)) {
    fieldErrors.checkOut = "Enter a valid check-out date.";
  }
  if (
    !fieldErrors.checkIn &&
    !fieldErrors.checkOut &&
    value.checkOut <= value.checkIn
  ) {
    fieldErrors.checkOut = "Check-out must be after check-in.";
  }

  return Object.keys(fieldErrors).length > 0
    ? { ok: false, fieldErrors }
    : { ok: true, value };
}

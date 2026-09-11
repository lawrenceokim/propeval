import assert from "node:assert/strict";
import { describe, test } from "node:test";
import type { BookingStatus, CreateBookingInput } from "../lib/types";
import {
  bookingDatesOverlap,
  hasBookingConflict,
  validateCreateBookingInput,
} from "../lib/validation/booking";

const existingDates = {
  checkIn: "2026-09-05",
  checkOut: "2026-09-20",
};

const validPayload: CreateBookingInput = {
  propertyId: "prop_01",
  guestName: "Amelia Hart",
  guestEmail: "amelia@example.com",
  guestPhone: "+44 7700 900101",
  checkIn: "2026-09-20",
  checkOut: "2026-09-25",
};

function bookingWithStatus(status: BookingStatus) {
  return { ...existingDates, status };
}

describe("booking overlap", () => {
  test("detects overlapping date ranges", () => {
    assert.equal(
      bookingDatesOverlap(
        "2026-09-15",
        "2026-09-28",
        existingDates.checkIn,
        existingDates.checkOut,
      ),
      true,
    );
  });

  test("allows a booking starting when the existing booking ends", () => {
    assert.equal(
      bookingDatesOverlap(
        "2026-09-20",
        "2026-09-25",
        existingDates.checkIn,
        existingDates.checkOut,
      ),
      false,
    );
  });

  test("allows a booking ending when the existing booking starts", () => {
    assert.equal(
      bookingDatesOverlap(
        "2026-09-01",
        "2026-09-05",
        existingDates.checkIn,
        existingDates.checkOut,
      ),
      false,
    );
  });
});

describe("booking blocking statuses", () => {
  for (const [status, expected] of [
    ["confirmed", true],
    ["active", true],
    ["completed", false],
    ["cancelled", false],
  ] as const) {
    test(`${status} bookings ${expected ? "block" : "do not block"} dates`, () => {
      assert.equal(
        hasBookingConflict([bookingWithStatus(status)], {
          checkIn: "2026-09-15",
          checkOut: "2026-09-28",
        }),
        expected,
      );
    });
  }
});

describe("create booking validation", () => {
  test("rejects check-out equal to check-in", () => {
    const result = validateCreateBookingInput({
      ...validPayload,
      checkIn: "2026-09-20",
      checkOut: "2026-09-20",
    });
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.fieldErrors.checkOut ?? "", /after/);
  });

  test("rejects check-out before check-in", () => {
    const result = validateCreateBookingInput({
      ...validPayload,
      checkIn: "2026-09-21",
      checkOut: "2026-09-20",
    });
    assert.equal(result.ok, false);
  });

  test("rejects an invalid email", () => {
    const result = validateCreateBookingInput({
      ...validPayload,
      guestEmail: "not-an-email",
    });
    assert.equal(result.ok, false);
    if (!result.ok) assert.ok(result.fieldErrors.guestEmail);
  });

  test("rejects missing required fields", () => {
    const result = validateCreateBookingInput({ ...validPayload, guestName: " " });
    assert.equal(result.ok, false);
    if (!result.ok) assert.ok(result.fieldErrors.guestName);
  });

  test("rejects invalid calendar dates", () => {
    const result = validateCreateBookingInput({
      ...validPayload,
      checkIn: "2026-02-29",
    });
    assert.equal(result.ok, false);
    if (!result.ok) assert.ok(result.fieldErrors.checkIn);
  });

  test("accepts and trims a valid payload", () => {
    const result = validateCreateBookingInput({
      ...validPayload,
      guestName: "  Amelia Hart  ",
      guestEmail: "  amelia@example.com  ",
    });
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.value.guestName, "Amelia Hart");
      assert.equal(result.value.guestEmail, "amelia@example.com");
    }
  });
});

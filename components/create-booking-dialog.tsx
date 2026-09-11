"use client";

import { useRouter } from "next/navigation";
import {
  type FormEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/ui/icon";
import type {
  BookingAvailabilityResponse,
  CreateBookingErrorResponse,
  CreateBookingField,
  CreateBookingFieldErrors,
  CreateBookingInput,
  CreateBookingResponse,
} from "@/lib/types";
import {
  validateBookingAvailabilityInput,
  validateCreateBookingInput,
} from "@/lib/validation/booking";

interface PropertyOption {
  id: string;
  name: string;
  city: string;
}

const INITIAL_VALUES: CreateBookingInput = {
  propertyId: "",
  guestName: "",
  guestEmail: "",
  guestPhone: "",
  checkIn: "",
  checkOut: "",
};

const FIELD_LABELS: Record<CreateBookingField, string> = {
  propertyId: "Property",
  guestName: "Guest name",
  guestEmail: "Guest email",
  guestPhone: "Guest phone",
  checkIn: "Check-in date",
  checkOut: "Check-out date",
};

type AvailabilityState =
  | { status: "idle"; message: "" }
  | { status: "checking" | "available" | "unavailable" | "error"; message: string };

const IDLE_AVAILABILITY: AvailabilityState = { status: "idle", message: "" };

export function CreateBookingDialog({
  properties,
}: {
  properties: PropertyOption[];
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submissionRef = useRef(false);
  const availabilityRequestRef = useRef(0);
  const [values, setValues] = useState<CreateBookingInput>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<CreateBookingFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [availability, setAvailability] =
    useState<AvailabilityState>(IDLE_AVAILABILITY);

  useEffect(() => {
    if (!isOpen) return;

    const validation = validateBookingAvailabilityInput({
      propertyId: values.propertyId,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
    });
    if (!validation.ok) return;

    const requestId = ++availabilityRequestRef.current;
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      if (requestId !== availabilityRequestRef.current) return;
      setAvailability({
        status: "checking",
        message: "Checking availability…",
      });

      const searchParams = new URLSearchParams([
        ["propertyId", validation.value.propertyId],
        ["checkIn", validation.value.checkIn],
        ["checkOut", validation.value.checkOut],
      ]);
      try {
        const response = await fetch(
          `/api/bookings/availability?${searchParams.toString()}`,
          { cache: "no-store", signal: controller.signal },
        );
        const payload = (await response.json()) as
          | BookingAvailabilityResponse
          | CreateBookingErrorResponse;
        if (requestId !== availabilityRequestRef.current) return;

        if (!response.ok || !("data" in payload)) {
          setAvailability({
            status: "error",
            message:
              "error" in payload
                ? payload.error.message
                : "Availability could not be checked. You can still create the booking.",
          });
          return;
        }

        setAvailability(
          payload.data.available
            ? {
                status: "available",
                message: "Property is available for these dates.",
              }
            : {
                status: "unavailable",
                message:
                  "This property already has a booking during the selected dates.",
              },
        );
      } catch {
        if (
          controller.signal.aborted ||
          requestId !== availabilityRequestRef.current
        ) {
          return;
        }
        setAvailability({
          status: "error",
          message:
            "Availability could not be checked. You can still create the booking.",
        });
      }
    }, 350);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [isOpen, values.checkIn, values.checkOut, values.propertyId]);

  function focusField(field: CreateBookingField) {
    const control = formRef.current?.elements.namedItem(field);
    if (control instanceof HTMLElement) control.focus();
  }

  function openDialog() {
    setSuccessMessage(null);
    setFormError(null);
    setAvailability(IDLE_AVAILABILITY);
    setIsOpen(true);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    if (submissionRef.current) return;
    availabilityRequestRef.current += 1;
    setAvailability(IDLE_AVAILABILITY);
    setIsOpen(false);
    dialogRef.current?.close();
    triggerRef.current?.focus();
  }

  function updateField(field: CreateBookingField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[field];
      if (field === "propertyId" || field === "checkIn" || field === "checkOut") {
        delete next.checkIn;
        delete next.checkOut;
      }
      return next;
    });
    if (field === "propertyId" || field === "checkIn" || field === "checkOut") {
      availabilityRequestRef.current += 1;
      setAvailability(IDLE_AVAILABILITY);
    }
    setFormError(null);
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) closeDialog();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionRef.current) return;

    const validation = validateCreateBookingInput(values);
    if (!validation.ok) {
      setFieldErrors(validation.fieldErrors);
      setFormError("Check the highlighted fields and try again.");
      const firstInvalidField = Object.keys(validation.fieldErrors)[0] as
        | CreateBookingField
        | undefined;
      if (firstInvalidField) focusField(firstInvalidField);
      return;
    }

    submissionRef.current = true;
    setIsSubmitting(true);
    setFieldErrors({});
    setFormError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.value),
      });
      const payload = (await response.json()) as
        | CreateBookingResponse
        | CreateBookingErrorResponse;

      if (!response.ok) {
        if ("error" in payload) {
          setFieldErrors(payload.error.fieldErrors ?? {});
          setFormError(payload.error.message);
          if (payload.error.code === "BOOKING_CONFLICT") {
            availabilityRequestRef.current += 1;
            setAvailability({
              status: "unavailable",
              message:
                "This property already has a booking during the selected dates.",
            });
          }
          const firstInvalidField = Object.keys(
            payload.error.fieldErrors ?? {},
          )[0] as CreateBookingField | undefined;
          if (firstInvalidField) focusField(firstInvalidField);
        } else {
          setFormError("We could not create the booking. Please try again.");
        }
        return;
      }

      const guestName = validation.value.guestName;
      setValues(INITIAL_VALUES);
      setFieldErrors({});
      availabilityRequestRef.current += 1;
      setAvailability(IDLE_AVAILABILITY);
      setIsOpen(false);
      dialogRef.current?.close();
      triggerRef.current?.focus();
      setSuccessMessage(`Booking for ${guestName} created successfully.`);
      router.refresh();
    } catch {
      setFormError(
        "We could not reach the server. Check your connection and try again.",
      );
    } finally {
      submissionRef.current = false;
      setIsSubmitting(false);
    }
  }

  function fieldDescription(field: CreateBookingField): string | undefined {
    return fieldErrors[field] ? `${field}-error` : undefined;
  }

  function fieldError(field: CreateBookingField) {
    const message = fieldErrors[field];
    return message ? (
      <span className="booking-field-error" id={`${field}-error`}>
        {message}
      </span>
    ) : null;
  }

  return (
    <div className="create-booking-action">
      <button
        className="button button-primary"
        type="button"
        ref={triggerRef}
        onClick={openDialog}
      >
        Create booking
      </button>
      <p className="booking-success" aria-live="polite">
        {successMessage}
      </p>

      <dialog
        className="booking-dialog"
        ref={dialogRef}
        aria-labelledby="create-booking-title"
        aria-describedby="create-booking-description"
        aria-modal="true"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={handleBackdropClick}
      >
        <form
          className="booking-form"
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="booking-dialog-header">
            <div>
              <h2 id="create-booking-title">Create booking</h2>
              <p id="create-booking-description">
                Add a guest stay and reserve the selected dates.
              </p>
            </div>
            <button
              className="icon-button"
              type="button"
              onClick={closeDialog}
              disabled={isSubmitting}
              aria-label="Close create booking dialog"
            >
              <Icon name="close" />
            </button>
          </div>

          {formError ? (
            <div className="booking-form-alert" role="alert">
              <Icon name="info" size={18} />
              <span>{formError}</span>
            </div>
          ) : null}

          <div className="booking-fields">
            <label className="field-label booking-field booking-field-wide">
              <span>{FIELD_LABELS.propertyId}</span>
              <select
                name="propertyId"
                value={values.propertyId}
                onChange={(event) =>
                  updateField("propertyId", event.target.value)
                }
                aria-invalid={Boolean(fieldErrors.propertyId)}
                aria-describedby={fieldDescription("propertyId")}
                disabled={isSubmitting || properties.length === 0}
                autoFocus
              >
                <option value="">Select a property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name} — {property.city}
                  </option>
                ))}
              </select>
              {fieldError("propertyId")}
              {properties.length === 0 ? (
                <span className="booking-field-help">
                  No properties are available for booking.
                </span>
              ) : null}
            </label>

            <label className="field-label booking-field booking-field-wide">
              <span>{FIELD_LABELS.guestName}</span>
              <input
                name="guestName"
                type="text"
                autoComplete="name"
                value={values.guestName}
                onChange={(event) =>
                  updateField("guestName", event.target.value)
                }
                aria-invalid={Boolean(fieldErrors.guestName)}
                aria-describedby={fieldDescription("guestName")}
                disabled={isSubmitting}
              />
              {fieldError("guestName")}
            </label>

            <label className="field-label booking-field">
              <span>{FIELD_LABELS.guestEmail}</span>
              <input
                name="guestEmail"
                type="email"
                autoComplete="email"
                value={values.guestEmail}
                onChange={(event) =>
                  updateField("guestEmail", event.target.value)
                }
                aria-invalid={Boolean(fieldErrors.guestEmail)}
                aria-describedby={fieldDescription("guestEmail")}
                disabled={isSubmitting}
              />
              {fieldError("guestEmail")}
            </label>

            <label className="field-label booking-field">
              <span>{FIELD_LABELS.guestPhone}</span>
              <input
                name="guestPhone"
                type="tel"
                autoComplete="tel"
                value={values.guestPhone}
                onChange={(event) =>
                  updateField("guestPhone", event.target.value)
                }
                aria-invalid={Boolean(fieldErrors.guestPhone)}
                aria-describedby={fieldDescription("guestPhone")}
                disabled={isSubmitting}
              />
              {fieldError("guestPhone")}
            </label>

            <label className="field-label booking-field">
              <span>{FIELD_LABELS.checkIn}</span>
              <input
                name="checkIn"
                type="date"
                value={values.checkIn}
                onChange={(event) => updateField("checkIn", event.target.value)}
                aria-invalid={Boolean(fieldErrors.checkIn)}
                aria-describedby={fieldDescription("checkIn")}
                disabled={isSubmitting}
              />
              {fieldError("checkIn")}
            </label>

            <label className="field-label booking-field">
              <span>{FIELD_LABELS.checkOut}</span>
              <input
                name="checkOut"
                type="date"
                value={values.checkOut}
                min={values.checkIn || undefined}
                onChange={(event) =>
                  updateField("checkOut", event.target.value)
                }
                aria-invalid={Boolean(fieldErrors.checkOut)}
                aria-describedby={fieldDescription("checkOut")}
                disabled={isSubmitting}
              />
              {fieldError("checkOut")}
            </label>

            <div
              className={`booking-availability booking-availability-${availability.status}`}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {availability.status !== "idle" ? (
                <>
                  <Icon name="info" size={18} />
                  <span>{availability.message}</span>
                </>
              ) : null}
            </div>
          </div>

          <div className="booking-dialog-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={closeDialog}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              className="button button-primary"
              type="submit"
              disabled={isSubmitting || properties.length === 0}
            >
              {isSubmitting ? "Creating booking…" : "Create booking"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

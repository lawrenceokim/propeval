"use client";
import { Icon } from "@/components/ui/icon";
export default function BookingsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="state-card" role="alert">
      <span className="state-icon error">
        <Icon name="bookings" />
      </span>
      <h1>Unable to load bookings</h1>
      <p>
        We couldn’t retrieve the booking register. Check the connection and try
        again.
      </p>
      <button className="button button-primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}

# Practical Assessment — Booking Creation

You are working on an internal property operations platform.

The operations team currently has visibility into properties and existing bookings but cannot create new bookings through the dashboard.

Your task is to implement the Create Booking workflow.

## Requirements

### 1. Create Booking Form

Add a Create Booking interface accessible from the Bookings page.

Fields:

* Property
* Guest name
* Guest email
* Guest phone
* Check-in date
* Check-out date

### 2. Booking API

Implement:

POST `/api/bookings`

### 3. Validation

Validate:

* required fields
* valid email
* selected property exists
* check-out occurs after check-in

### 4. Booking Conflicts

Prevent overlapping bookings for the same property.

Confirmed and active bookings should block conflicting dates.

Example:

Existing booking:

September 5 → September 20

Requested booking:

September 15 → September 28

Result:

Booking must be rejected.

Back-to-back bookings are allowed.

Existing:

September 5 → September 20

Requested:

September 20 → September 25

Result:

Booking should be accepted.

### 5. Persistence

Successful bookings must be persisted to the database.

### 6. User Experience

Provide meaningful:

* loading states
* validation messages
* API error messages
* success feedback

### 7. UI Refresh

After creating a booking, the new booking should appear in the interface without requiring the user to manually refresh the browser.

### 8. Design

Follow the existing application's UI patterns and the project's `design system.md`.

Do not redesign unrelated areas of the application.

## Bonus

* Automated tests
* Availability feedback before form submission
* Accessibility improvements
* Thoughtful handling of edge cases

## Time Limit

2 hours.

Focus on delivering the core requirements first.

We value:

* correctness
* maintainability
* pragmatic engineering decisions
* clear TypeScript
* product thinking
* sensible UX
* ability to work within an existing codebase

Avoid rewriting existing functionality unless necessary.

# Sage Property Operations

Sage Property Operations is the starter application for a two-hour technical assessment. It models an internal workspace used by operations teams to monitor properties, guests, bookings, occupancy, and maintenance across London, Paris, Lisbon, and Algiers.

The application is intentionally complete for read workflows. Booking creation is visibly unavailable because implementing that workflow is the candidate task described in [ASSIGNMENT.md](./ASSIGNMENT.md).

## Getting started

Requirements: Node.js 20.9 or later, npm, and optionally PostgreSQL.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Without environment variables, the app uses deterministic in-process fixtures and is immediately populated.

Useful checks:

```bash
npm run lint
npm run build
```

## Database setup

PostgreSQL support is optional for running the starter but ready for local or hosted environments.

1. Create a PostgreSQL database.
2. Apply `database/schema.sql`.
3. Apply `database/seed.sql`.
4. Copy `.env.example` to `.env.local` and set `DATABASE_URL`.

```bash
psql "$DATABASE_URL" -f database/schema.sql
psql "$DATABASE_URL" -f database/seed.sql
```

The schema contains `properties`, `guests`, `bookings`, and `maintenance_requests`, with foreign keys and read-oriented indexes. The seed includes 12 properties, 10 guests, 20 bookings, and 12 maintenance requests.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | No | PostgreSQL connection string. Omitting it selects the fixture adapter. |
| `DATABASE_SSL` | No | Set to `disable` for a trusted local database; remote connections require SSL by default. |

## Architecture

- `app/` contains App Router pages, route-level loading/error states, and API route handlers.
- `components/` contains the responsive application shell and reusable Sage UI primitives.
- `lib/services/operations.ts` is the typed read boundary shared by pages and API routes.
- `lib/data/database.ts` owns the lazy PostgreSQL client; `lib/data/seed.ts` provides the zero-setup adapter.
- `lib/types.ts` defines domain and joined-view types.
- `lib/http/api-response.ts` standardizes API success and error envelopes.
- `database/` contains portable PostgreSQL schema and seed scripts.
- `context/feature-specs/design-system.md` is the product design source of truth.

Server components call the operations service directly rather than making a loopback HTTP request. Public read APIs use the same service, keeping data behavior consistent without duplicating query logic.

## Application routes

| Route | Description |
| --- | --- |
| `/` | Portfolio metrics, city occupancy, upcoming arrivals, and maintenance priorities |
| `/properties` | Filterable property register |
| `/properties/[id]` | Property occupancy, guest, booking history, and maintenance details |
| `/bookings` | Status-filtered booking register and the intentionally disabled Create Booking action |
| `/maintenance` | Status- and priority-filtered maintenance queue |

## Read API

Successful responses use `{ "data": ..., "meta": ... }`; errors use `{ "error": { "code": ..., "message": ... } }`.

| Endpoint | Supported query parameters |
| --- | --- |
| `GET /api/properties` | `city`, `status=occupied\|vacant` |
| `GET /api/properties/[id]` | None |
| `GET /api/bookings` | `status=confirmed\|active\|completed\|cancelled` |
| `GET /api/maintenance` | `status=open\|in_progress\|resolved`, `priority=low\|medium\|high\|critical` |

There is deliberately no write endpoint for bookings in this starter repository.

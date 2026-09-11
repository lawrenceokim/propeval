<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 1. Repository Purpose

This repository is the starter for a practical engineering assessment. It is an internal property-operations dashboard covering properties, bookings, guests, occupancy, and maintenance.

The current assessment focuses on the Create Booking workflow. Before making assessment-related changes, agents MUST read `ASSIGNMENT.md`; do not duplicate the full assignment here.

# 2. Mandatory Reading Before Changes

DO NOT begin implementation based only on a task description. First understand how this repository solves nearby problems.

Before assessment work, agents MUST inspect:

1. `AGENTS.md`
2. `ASSIGNMENT.md`
3. `context/feature-specs/design-system.md`
4. Relevant existing pages and components
5. `lib/types.ts` and other relevant shared types
6. Relevant code in `lib/services/` and `lib/data/`
7. Relevant handlers under `app/api/`
8. `database/schema.sql` whenever domain data or persistence is involved

Also read the relevant Next.js 16 guide in `node_modules/next/dist/docs/` before using or changing framework APIs.

# 3. Existing Architecture

- Next.js 16 App Router and React 19
- Strict TypeScript
- Tailwind CSS 4, with design tokens and component styles primarily in `app/globals.css`
- npm (`package-lock.json`)
- PostgreSQL through Postgres.js; no ORM
- Server Components are the primary data-fetching architecture
- Domain read logic lives in `lib/services/`
- Database access and fixture data live in `lib/data/`
- API response helpers live in `lib/http/`
- Shared domain types and status constants live in `lib/types.ts`
- App Router Route Handlers live under `app/api/**`

There is no `src/` directory. The `@/*` alias resolves from the repository root.

# 4. Architecture Preservation Rules

- Work WITH the existing architecture and extend existing services and APIs instead of creating a parallel architecture.
- DO NOT add an ORM.
- DO NOT add React Query, SWR, Redux, Zustand, or another state-management/data-fetching ecosystem merely for a local feature.
- DO NOT add a form or validation library without first confirming that the feature genuinely requires it.
- Prefer existing Next.js and React patterns.
- Keep Server Components server-oriented. Convert or extract only the interactive portion into a Client Component.
- Keep client boundaries as small as possible.
- DO NOT broadly refactor or rewrite unrelated functionality during feature work.
- A new abstraction SHOULD solve an actual repeated problem, not merely reorganize code.

# 5. Design System Rules

`context/feature-specs/design-system.md` is the UI source of truth. Agents MUST read it before creating or modifying UI and MUST inspect `app/globals.css` and nearby components before adding primitives.

Reuse existing patterns where appropriate:

- `PageHeader`
- `Icon`
- `Badge`
- `EmptyState`
- `LoadingPage`
- Existing button CSS classes
- `.field-label`
- `.panel`
- `.data-panel`
- Existing spacing, radius, typography, focus, and color tokens

DO NOT redesign unrelated areas. New UI must look native to the existing application. If the design system specifies a needed pattern but no reusable component exists, implement the smallest appropriate component for the feature.

# 6. TypeScript Rules

- Maintain strict TypeScript and avoid `any`.
- Reuse domain types and constants from `lib/types.ts` where appropriate.
- Create explicit request and response types for API mutations.
- DO NOT duplicate status values or other domain constants.
- Keep server-only code out of Client Components.
- Model validation results and expected service errors clearly.
- Prefer readable, straightforward TypeScript over clever abstractions.

# 7. API Rules

- Use Next.js App Router Route Handlers.
- Use the standardized helpers from `lib/http/api-response.ts` and preserve structured error responses.
- Return appropriate HTTP status codes.
- Route handlers SHOULD parse and validate requests, then delegate business rules and database work to service/domain functions.
- Validate every mutation on the server; client validation is never sufficient by itself.
- Do not expose raw database or internal errors.
- When adding `POST /api/bookings`, preserve the existing `GET` behavior in the same route.

# 8. Data Layer / Database Rules

- PostgreSQL is accessed with Postgres.js; there is no ORM.
- The schema is defined in `database/schema.sql` and SQL seed data in `database/seed.sql`.
- Fixture data is defined in `lib/data/seed.ts`.
- IDs are text values and are not generated automatically by the database.
- Bookings reference `properties.id` and `guests.id`.
- Booking date columns are PostgreSQL `DATE` values represented in TypeScript as `YYYY-MM-DD` strings.
- The database already enforces `check_out > check_in`.

Agents MUST inspect `database/schema.sql` before making persistence assumptions. DO NOT invent columns or relationships. If a schema change is necessary, make the smallest viable change and keep the schema and relevant seed data consistent.

# 9. Fixture vs Database Awareness

The repository runs in two modes:

- PostgreSQL when `DATABASE_URL` exists
- In-memory fixture arrays when `DATABASE_URL` is absent

Understand which path a change affects. DO NOT implement fake persistence that appears successful but disappears after a refresh or process restart. Features requiring true persistence MUST explicitly support the database-backed path. Any fixture-mode mutation support must be intentional and its limitations clearly understood.

# 10. Booking Domain Rules

Booking statuses are:

- `confirmed`
- `active`
- `completed`
- `cancelled`

For availability, confirmed and active bookings block dates; completed and cancelled bookings do not.

Back-to-back bookings MUST be allowed. Conflict logic follows:

```text
newCheckIn < existingCheckOut
AND
newCheckOut > existingCheckIn
```

DO NOT use inclusive comparisons that reject a new September 20 check-in when an existing booking checks out September 20.

The selected property must exist, and check-out must be after check-in. Provide user-facing validation rather than relying only on the database constraint.

# 11. Guest Handling Rules

Bookings reference `guest_id`; guest name, email, and phone live in `guests`. Guest email is not unique.

DO NOT assume email uniquely identifies a guest unless that behavior is deliberately established. Booking creation must make guest creation/reuse behavior explicit and consistent with the schema. Do not silently infer missing business rules.

# 12. Server / Client Boundary Rules

The bookings page is currently a Server Component and fetches data directly through `lib/services/operations.ts`. There is no React Query/SWR setup and no established mutation or invalidation convention.

For interactive creation UI:

- Create a focused Client Component only where interactivity is required.
- Keep the Bookings page server-oriented if possible.
- After success, refresh the server-rendered booking data with a simple Next.js-compatible approach.
- DO NOT introduce a new data-fetching ecosystem for one mutation.

# 13. Validation and Error Handling

Handle all of the following meaningfully:

- Required fields
- Invalid email
- Invalid or nonexistent property
- Invalid date range
- Booking conflict
- Database/server failure

Equivalent client validation may improve UX, but server validation remains mandatory. API errors must be structured and usable by the UI. Messages should explain what happened and, where possible, how the user can correct it.

# 14. UX Expectations

Interactive work SHOULD include:

- Loading/submitting state
- Prevention of duplicate submission
- Field-level validation feedback
- API error feedback
- Success feedback
- Appropriate empty states
- Keyboard usability
- Accessible labels and focus behavior
- Responsive layouts

Follow the design system instead of introducing unrelated visual patterns.

# 15. Accessibility

- Associate persistent labels with every field.
- Use semantic buttons and native controls where possible.
- Keep interactions keyboard-accessible.
- Dialogs must support sensible focus behavior, Escape dismissal where appropriate, and focus restoration.
- Preserve visible focus states.
- Use `aria-invalid` and `aria-describedby` when they improve error communication.
- Never communicate errors or state through color alone.

Avoid obvious regressions without over-engineering new accessibility infrastructure.

# 16. File Placement Conventions

- Pages and layouts: `app/`
- API routes: `app/api/`
- Feature-specific/client UI: `components/`
- Generic reusable UI: `components/ui/`
- Domain services: `lib/services/`
- Database connection and data sources: `lib/data/`
- HTTP response helpers: `lib/http/`
- Shared domain types/constants: `lib/types.ts`
- Substantial validation helpers: `lib/validation/`
- Database schema and seed SQL: `database/`

Inspect neighboring files before deciding that a new file or abstraction is necessary.

# 17. Testing and Verification

No automated test framework is currently configured. Existing verification commands are:

```bash
npm run lint
npm run build
```

Run both after meaningful implementation work unless blocked by a documented, unrelated pre-existing issue.

If tests are added for the assessment bonus, keep setup lightweight and prioritize business-critical behavior, especially overlapping and back-to-back booking cases. Do not spend disproportionate time on testing infrastructure before core requirements work end to end.

# 18. Worktree Safety

Before editing:

- Inspect `git status`.
- Preserve unrelated user changes.
- DO NOT revert or overwrite existing modifications.
- Avoid formatting unrelated files and mass rewrites.
- Change only files needed for the task.

This repository already has working-tree changes. If a target file contains user changes, integrate carefully instead of replacing it wholesale.

# 19. Scope Control

For assessment work, complete core requirements before bonus work. Avoid unrelated redesigns, speculative features, broad refactors, and unnecessary abstractions.

Optimize for correctness, maintainability, pragmatic engineering, clear TypeScript, product thinking, sensible UX, and the ability to work within an existing codebase.

# 20. Before Coding Checklist

- Have I read `AGENTS.md`?
- Have I read `ASSIGNMENT.md`?
- Have I read the design-system document for UI work?
- Have I inspected the relevant existing files?
- Have I checked domain types and the database schema?
- Have I checked `git status`?
- Do I understand the server/client boundary?
- Am I extending the existing architecture rather than replacing it?
- Am I limiting the change to the requested scope?

# 21. After Coding Checklist

- Does the core requirement work end to end?
- Does server-side validation exist?
- Is UI validation and feedback meaningful?
- Are expected error paths handled?
- Does persistence actually work?
- Does existing behavior still work?
- Does the UI follow the design system?
- Were unrelated files left untouched?
- Does `npm run lint` pass?
- Does `npm run build` pass?

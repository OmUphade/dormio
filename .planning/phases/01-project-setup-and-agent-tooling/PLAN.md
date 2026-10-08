# Phase 1 Plan: Project Setup & Agent Tooling

**Phase Goal:** Scaffold monorepo core infrastructure per `docs/architecture.md` §3 and ensure all foundational tooling, databases, Express 5 API, Drizzle ORM with PostGIS & pgvector, Next.js route groups, shared packages, and CI pipelines are completely operational and tested.

## Task Breakdown & Verification Criteria

### Task 1.3: apps/web Route Groups & Architecture Alignment
- Ensure `apps/web/src/app` contains all architecture §3 route groups:
  - `(marketplace)`: Home, Search, Listing detail
  - `(auth)`: Login, Register, Verify, Reset
  - `(account)`: `me` (profile, bookings, saved)
  - `(stay)`: `stay/[propertyId]` (resident hub)
  - `(owner)`: `owner` (onboarding, listings)
  - `(manage)`: `manage/[propertyId]` (operator console)
  - `(guard)`: `guard` (minimal full-screen guard)
  - `(admin)`: `admin` (platform verification)
- Verify `/api/:path*` rewrite in `next.config.js` points to `http://localhost:4000/api/:path*`.
- Acceptance criteria: `pnpm --filter web build` compiles cleanly.

### Task 1.4: Scaffold apps/api (Node.js + Express 5, ES modules)
- Create `apps/api` package with `"type": "module"`.
- Server entry `src/server.js` with graceful shutdown.
- Express setup `src/app.js` with middleware strictly in the fixed order:
  1. `requestId`
  2. `rateLimit`
  3. `auth`
  4. `scope`
  5. `policies`
  6. `feature`
  7. `validate`
- Pino logging (`src/infra/logger.js`).
- Central error handler (`src/middleware/error.js`).
- `/health` endpoint checking DB & Valkey connectivity.
- OpenAPI docs via `@asteasolutions/zod-to-openapi` and Swagger UI at `/api/docs`.
- Acceptance criteria: Supertest integration test for `/health` and `/api/docs` passes.

### Task 1.5: packages/shared & packages/config
- `packages/shared`:
  - Enums: `PropertyKind`, `UserRole`, `BookingStatus`, `PaymentStatus`, `FeatureFlag`.
  - Zod Schemas: User, Organization, Property, Listing, Auth, Pagination, Money (integer paise).
  - Permissions: Action/Subject definitions and permission matrix for CASL.
  - JSDoc typedef documentation.
- `packages/config`:
  - Shared ESLint config.
  - Monorepo `jsconfig.json` base.
  - Tailwind tokens preset.
- Acceptance criteria: Packages export cleanly and resolve across `apps/web` and `apps/api`.

### Task 1.6: Code Quality, Linting & Git Hooks
- ESLint configuration covering ES modules and React/JSX.
- Prettier configuration (`.prettierrc.json`, `.prettierignore`).
- Husky git hooks (`pre-commit` running lint-staged and `check-no-typescript.sh`, `commit-msg` running commitlint).
- lint-staged config (`.lintstagedrc.json`).
- Commitlint config (`commitlint.config.cjs`) with Conventional Commits.
- Acceptance criteria: `pnpm lint` passes without errors.

### Task 1.7: docker-compose Verification
- Postgres (PostGIS + pgvector), Valkey, MinIO, Mailpit verified healthy.
- Acceptance criteria: `docker compose ps` healthy and psql confirms extensions.

### Task 1.8: Drizzle ORM + Schema (PostGIS & pgvector) + First Migration
- Configure `drizzle-orm` and `drizzle-kit` with PostgreSQL client.
- Base schema tables in `apps/api/src/db/schema/`:
  - `users`: id, email, phone, role, password_hash, created_at.
  - `organizations`: id, name, kind, kyc_status, created_at.
  - `properties`: id, org_id, name, kind, address, location (`geometry(Point, 4326)`), features (`jsonb`), created_at.
  - `listings`: id, property_id, slug, title, status, embedding (`vector(1536)`), published_at, created_at.
- Run `drizzle-kit generate` to produce SQL migration.
- Execute migration and verify by running a test script inserting and querying a property with PostGIS coordinates and a listing with a pgvector 1536-dim embedding.
- Acceptance criteria: Geometry and vector columns successfully write and read in PostgreSQL.

### Task 1.9: Environment Validation & Finalize .env.example
- Define Zod environment validation schema in `apps/api/src/config/env.js`.
- Update `.env.example` with all configuration keys (Database, Redis, MinIO, Mailpit, JWT, Port).
- Acceptance criteria: API fails fast on missing env and passes with valid env.

### Task 1.10: CI & Agent Tooling Verification
- Update `.github/workflows/ci.yml` to run lint, test, build, `check-no-typescript.sh`, `check-ui-rules.sh`, and `check-ui-provenance.sh`.
- Ensure `.coderabbit.yaml` is configured.
- Run Definition of Done verification suite.

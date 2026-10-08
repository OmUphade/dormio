# Project Memory — Dormio

> The living brain of the project. Agents read this **first** every session and update it **last**. Keep it short and factual; archive old detail.

**Last updated:** 2026-10-08 | **Updated by:** Planning session

---

## 1. Current Status

| Item           | Value                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product        | **Dormio**: marketplace (find hostel/PG/mess by area) + stay manager (rent, complaints, notices, meals) + operator console (owners, institutions)             |
| Current phase  | Phase 2: UI Foundation / Phase 5: Marketplace Discovery                                                                                                       |
| Progress       | 23 / 149 tasks (15%)                                                                                                                                          |
| Active task    | Phase 1 Complete                                                                                                                                              |
| Next task      | 2.3 Implement tokens (Tailwind theme + CSS variables) from MASTER.md / P-04d Mess Detail                                                                      |
| Release target | Alpha "Find" = Phases 1–5                                                                                                                                     |
| Blocker        | None                                                                                                                                                          |
| Repo state     | Monorepo active, apps/web operational with route groups, apps/api operational with Express 5, Drizzle ORM, PostGIS, pgvector, Valkey, OpenAPI, and passing CI |
| Deployed?      | No                                                                                                                                                            |

---

## 2. Decisions (settled; do not relitigate without an ADR)

| #   | Decision                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Date       |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| D1  | Product = marketplace + stay manager + operator console for **HOSTEL, PG, MESS**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 2026-10-08 |
| D2  | Modular monolith: **Node.js + Express 5 API** + **React via Next.js** web (SSR/ISR for public pages; chosen because UI UX Pro Max has dedicated `nextjs`/`shadcn` stacks and the marketplace needs SEO), pnpm/Turborepo monorepo                                                                                                                                                                                                                                                                                                                                                  | 2026-10-08 |
| D3  | **PostgreSQL 16** + PostGIS + pgvector + pg_trgm; **Drizzle ORM** (Prisma rejected: weak PostGIS support); Valkey + BullMQ; MinIO                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 2026-10-08 |
| D4  | Scoping: `property_id` (operations), `organization_id` (owners), `user_id` (personal); RLS as defense in depth                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 2026-10-08 |
| D5  | Public/private boundary via `listing_public` DTO; guests never see PII or contact details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 2026-10-08 |
| D6  | Payments **UPI-direct**, staff-verified (UTR unique per property); no gateway in MVP; Dormio never holds funds                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 2026-10-07 |
| D7  | CCTV optional per property; badge on listing; never public; on-site edge connector; no video storage                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 2026-10-07 |
| D8  | English only (i18n-ready)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 2026-10-07 |
| D9  | Hosting: free online site; primary Oracle Always Free VM, fallback PC/college server + Cloudflare Tunnel; no Vercel Hobby (commercial)                                                                                                                                                                                                                                                                                                                                                                                                                                            | 2026-10-07 |
| D10 | AI: local-first (Ollama) with free-tier cloud fallback for non-personal content; write actions need confirmation                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 2026-10-07 |
| D11 | **Agents have no design opinions: every UI decision comes from UI UX Pro Max** (UI Gate, provenance headers, `check-ui-provenance.sh`); bans: gradients, black, dark theme v1, boxed-white pages. System generated via skill: Style `flat-design` + `vibrant-and-block-based`; Palette `#EA580C` (Terracotta), `#F97316` (Tangerine), `#2563EB` (Action Blue), `#FFF7ED` (Linen), `#0F172A` (Slate Navy); Module hues: Mess `#059669`, Payment `#0D9488`, Security `#0369A1`; Fonts: `Outfit` (Headings) + `Plus Jakarta Sans` (Body); Shape language: The Arch (`--radius-arch`) | 2026-10-08 |
| D16 | **JavaScript only** (ES modules + JSX), no TypeScript; JSDoc for types, `// @ts-check` on money/permission modules, Zod for runtime validation; `packages/types` renamed `packages/shared`; no typecheck step; `check-no-typescript.sh` in CI                                                                                                                                                                                                                                                                                                                                     | 2026-10-08 |
| D15 | Same-origin routing: Caddy serves Next.js and proxies `/api/*` to Express (dev: Next rewrites)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 2026-10-08 |
| D12 | Build is ~90–99% AI-driven; autonomy protocol in `rules.md` §11                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 2026-10-08 |
| D13 | Free listing and free tools for owners in v1; monetization is backlog                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 2026-10-08 |
| D14 | Launch in one area cluster; seed ≥ 30 listings before opening                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 2026-10-08 |

---

## 3. Completed Work (log)

| Date       | Task     | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-07 | 0.1–0.6  | First drafts of the six docs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-10-08 | 0.7      | Re-scoped to marketplace + operator platform; PRD v0.3, architecture, Design, task (149 tasks), rules updated; starter kit with AGENTS.md, `.agents/rules`, `.agents/workflows`, BOOTSTRAP, PROMPTS, infra files                                                                                                                                                                                                                                                                                                      |
| 2026-10-08 | 2.1      | Generated `design-system/dormio/MASTER.md` via UI UX Pro Max with Selection Rationale, tokens, Outfit + Plus Jakarta Sans fonts, Arch shape language, and strict bans                                                                                                                                                                                                                                                                                                                                                 |
| 2026-10-08 | 2.2      | Generated page overrides and complete specs for: home, search, listing-detail, mess-detail, owner-wizard, my-stay, rent-ledger, guard-screen, owner-dashboard with recorded skill evidence                                                                                                                                                                                                                                                                                                                            |
| 2026-10-09 | 1.1      | Initialized repository hygiene: MIT LICENSE, comprehensive .gitignore, detailed README.md, and .github/BRANCH_PROTECTION.md                                                                                                                                                                                                                                                                                                                                                                                           |
| 2026-10-09 | 1.2      | Initialized pnpm + Turborepo monorepo with `packages/shared`, `packages/config`                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 2026-10-09 | 1.3      | Scaffolded `apps/web` (Next.js App Router in JS/JSX, Tailwind with tokens preset) with all 8 route groups per architecture §3; rewrites `/api/*` to Express                                                                                                                                                                                                                                                                                                                                                           |
| 2026-10-09 | 1.4      | Scaffolded `apps/api` (Node.js + Express 5, ES modules, fixed middleware chain, pino, `/health`, OpenAPI via Zod at `/api/docs`, Supertest suite)                                                                                                                                                                                                                                                                                                                                                                     |
| 2026-10-09 | 1.5      | Created `packages/shared` (enums, Zod schemas, permissions, JSDoc typedefs) and `packages/config` (eslint preset, jsconfig base, tailwind preset)                                                                                                                                                                                                                                                                                                                                                                     |
| 2026-10-09 | 1.6      | Configured ESLint, Prettier, Husky (`pre-commit`, `commit-msg`), lint-staged, commitlint                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-10-09 | 1.7      | Docker Compose infra verified: Postgres, Valkey, MinIO, Mailpit healthy; postgis, vector, pg_trgm verified                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2026-10-09 | 1.8      | Drizzle ORM + drizzle-kit + initial migration for User, Organization, Property, Listing; verified PostGIS `geometry` and pgvector `vector` in integration test                                                                                                                                                                                                                                                                                                                                                        |
| 2026-10-09 | 1.9      | Environment validation via Zod in `apps/api/src/config/env.js`; finalized `.env.example`                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-10-09 | 1.10     | CI `.github/workflows/ci.yml` and `.coderabbit.yaml` configured; agent tooling verified                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2026-10-09 | 5.4, 5.5 | Built Search Results (`/search`) page via `/build-ui` (P-04b): multi-parameter filter rail with active counters, split-screen desktop dual pane (stream + synchronized map with price pins), both Hostel/PG and Mess card variants, and mobile ViewTogglePill; screenshots reviewed at 360/768/1280; all gate scripts passed                                                                                                                                                                                          |
| 2026-10-09 | 5.6      | Built Listing Detail (`/listings/[slug]`) page via `/build-ui` (P-04c): 5-photo mosaic with lightbox trigger, room type & sharing selector with deposit and live bed availability, amenities matrix, house rules & safety standards (curfew, notice, security, attached dining mess details), rating breakdown with verified resident reviews, owner KYC badge, sticky desktop reservation card, and mobile floating action bar with Book/Enquire CTAs; screenshots reviewed at 360/768/1280; all gate scripts passed |

## 4. In Progress

| Task | Started    | State | Next step                                                        |
| ---- | ---------- | ----- | ---------------------------------------------------------------- |
| 1.4  | 2026-10-09 | Ready | Scaffold `apps/api` (Node.js + Express 5, JavaScript ES modules) |

## 5. Changes Log

| Date       | Change                                                                                                                                                        | Reason                                | Docs updated                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------------------------------------------------- |
| 2026-10-08 | Scope changed from single-hostel manager to marketplace + operations platform; `hostel_id` → `property_id`; added orgs, listings, search, reviews, moderation | Owner clarification                   | PRD, architecture, task, rules, Design, memory        |
| 2026-10-08 | UI process made mandatory via UI UX Pro Max with UI Gate                                                                                                      | Agents produce generic, misaligned UI | Design, rules §12, AGENTS.md, `.agents/`              |
| 2026-10-08 | TypeScript → JavaScript across the kit                                                                                                                        | Owner request                         | all docs, scripts, CI, workflows                      |
| 2026-10-08 | Stack change: NestJS → Express 5; Prisma → Drizzle; Design.md seed palette/fonts removed (skill decides); provenance enforcement added                        | Owner request                         | architecture, rules, Design, task, AGENTS.md, scripts |

---

## 6. Bugs and Fixes

| ID  | Severity | Description | Status |
| --- | -------- | ----------- | ------ |
| —   | —        | None yet    | —      |

---

## 7. Open Questions and Assumptions

**Open (non-blocking; agents proceed with the stated default and log changes)**

1. Launch area/city for the first seed listings. _Default:_ build area-agnostic; seed demo data for 3 areas.
2. Local LLM hardware unknown. _Default:_ Ollama small model on the server; benchmark in task 13.1; Gemini/Groq free tier fallback for non-personal content.
3. Domain name. _Default:_ free subdomain for pilot.
4. Photon/Nominatim limits. _Default:_ cache + debounce; self-host later.

**Assumptions**

- Owners provide their own UPI ID (merchant VPA preferred).
- Free-tier terms (Oracle, Cloudflare, Brevo/Resend, Gemini/Groq, OSM services) may change.
- Cities may require tenant-verification submission to police; consult legal before launch.

---

## 8. Risk Watchlist

| Risk                              | Trigger                                                | Response                          |
| --------------------------------- | ------------------------------------------------------ | --------------------------------- |
| Generic/misaligned UI from agents | Page lacks spec or screenshots                         | Reject; rerun UI Gate             |
| Marketplace cold start            | < 10 listings at launch                                | Hold launch; onboard more owners  |
| Stale listings                    | > 14 days without confirmation                         | Auto down-rank; nudge owner       |
| Scope leak (PII on public routes) | Any public endpoint returns non-`listing_public` field | P0 bug; add public-leak test      |
| Agent drift                       | Inconsistent patterns                                  | Re-read `rules.md`; add lint rule |

---

## 9. Environment and Setup Notes

- Package manager: pnpm. Node LTS. Python 3 (for UI UX Pro Max scripts). uv (for Graphify).
- Local services: `docker compose up -d` (Postgres+PostGIS+pgvector, Valkey, MinIO, Mailpit; profiles `ai`, `cctv`)
- Ports: web 3000 · api 4000 · postgres 5432 · valkey 6379 · minio 9000/9001 · mailpit 8025 · ollama 11434
- Seed users: _TBD in task 1.8 / 15.10_

## 10. AI Tooling Notes

| Tool                      | Command                                                                                                                     | Installed? |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Get Shit Done             | `npx @opengsd/get-shit-done-redux@latest`                                                                                   | No         |
| UI UX Pro Max             | `npm install -g ui-ux-pro-max-cli` → `uipro init --ai antigravity`                                                          | No         |
| Graphify                  | `uv tool install graphifyy` → `graphify install` → `graphify antigravity install` → `/graphify .` → `graphify hook install` | No         |
| CodeRabbit                | GitHub App on the repo                                                                                                      | No         |
| Context7 / Playwright MCP | Add in Antigravity MCP settings                                                                                             | No         |

Lessons learned: _(append)_

---

## 11. Session Log (newest first)

### 2026-10-09 — Phase 1 Monorepo & Backend Foundation Complete

- **Done:**
  - Scaffolded `apps/api` with Node.js LTS + Express 5 in JavaScript ES modules (`"type": "module"`).
  - Implemented fixed global middleware chain: `requestId` → `rateLimit` → `auth` → `scope` → `policies` → `feature` → `validate`.
  - Added central RFC 7807 problem details error handling with Pino structured logging.
  - Added `/health` and OpenAPI 3.0 generation from Zod served with Swagger UI at `/api/docs`.
  - Created `packages/shared` (enums, Zod validation schemas, CASL permission matrix) and `packages/config` (eslint preset, jsconfig base, tailwind preset).
  - Scaffolded `apps/web` App Router route groups per architecture §3: `(marketplace)`, `(auth)`, `(account)`, `(stay)`, `(owner)`, `(manage)`, `(guard)`, `(admin)` with Next.js `/api/*` rewrites.
  - Set up Drizzle ORM + drizzle-kit with PostgreSQL on Docker Compose.
  - Built initial migration for `users`, `organizations`, `properties` (with PostGIS `geometry` column), and `listings` (with pgvector 1536-dim `vector` column).
  - Successfully proved PostGIS spatial coordinates and pgvector Euclidean/cosine similarity operations in automated integration tests (`apps/api/test/verify-db.js`).
  - Configured ESLint, Prettier, Husky (`pre-commit`, `commit-msg`), lint-staged, commitlint, and verified `.github/workflows/ci.yml`.
  - Ran Definition of Done: `pnpm lint`, `pnpm test`, `pnpm build`, `bash scripts/check-no-typescript.sh`, `bash scripts/check-ui-rules.sh`, and `bash scripts/check-ui-provenance.sh` all passed with code 0.
- **Decisions:** Used PostgreSQL port 5433 to map cleanly to docker-compose host port. Set Next.js `ignoreDuringBuilds: true` for ESLint because root Turbo handles unified monorepo linting.
- **Problems / bugs:** Resolved PostGIS geometry object shape `{ x, y }` for Drizzle `mode: 'xy'`.
- **Next session:** Continue with Phase 2 tokens implementation (Task 2.3) or marketplace pages from `docs/PROMPTS.md` (P-04d: Mess detail `/[kind]/[slug]`).
- **Notes for next agent:** Zero TypeScript files rule must remain strictly respected.

### 2026-10-08 — Re-scope and starter kit

- **Done:** PRD rewrite (marketplace + stay + operator), architecture/data model update, Design.md with mandatory UI Gate, task.md (149 tasks), AGENTS.md, rules, workflows, BOOTSTRAP, PROMPTS, infra files.
- **Next session:** Owner runs BOOTSTRAP; agent starts Phase 1 (1.1–1.3).
- **Notes for next agent:** Do not start any UI work until `design-system/dormio/MASTER.md` exists (task 2.1).

```
### YYYY-MM-DD — <focus>
- Done:
- Decisions:
- Problems / bugs:
- Next session:
- Notes for next agent:
```

## 12. End-of-Session Checklist

- [ ] `task.md` ticked + summary updated
- [ ] §1, §4 updated; decisions/changes/bugs logged; session entry added
- [ ] `graphify update .` run; commit `docs: update memory and tasks`

## 13. Archive

_Move old logs here when this file exceeds ~300 lines._

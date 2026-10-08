# System Architecture — Dormio

**Style:** Modular monolith (Node.js + Express API) + Next.js web app (React, PWA), packaged in a pnpm/Turborepo monorepo.
**Why:** one developer + AI agents, zero budget, one VM. Microservices would add cost and complexity with no benefit at this scale. Modules have strict boundaries so they can be split later.

**Product shape:** a **marketplace** (public discovery of hostels, PGs, messes by area) + **stay/subscription manager** (resident side) + **operator console** (owners and institutions). One codebase, one database, three experiences separated by route groups, roles, and a strict public/private data boundary.

---

## 1. High-Level Architecture

```
                        ┌───────────────────────────────┐
                        │   Clients (PWA, any browser)  │
                        │ Prospect · Resident · Parent  │
                        │ Warden · Guard · Admin · Mess │
                        └───────────────┬───────────────┘
                                        │ HTTPS
                              ┌─────────▼─────────┐
                              │ Caddy (reverse    │  auto-TLS, gzip, headers
                              │ proxy)            │
                              └───┬───────────┬───┘
                    ┌─────────────▼──┐     ┌──▼───────────────┐
                    │ apps/web       │     │ apps/api         │
                    │ Next.js (SSR/  │────▶│ Express REST +   │
                    │ RSC, PWA)      │     │ SSE/WebSocket    │
                    └────────────────┘     └──┬───────────────┘
                                              │
   ┌──────────────────────────────────────────┼─────────────────────────────────────┐
   │ API modules (domain-driven)              │                                     │
   │ auth · orgs · properties · listings · search · media · bookings · stays          │
   │ notices · complaints · mess · security · cctv · payments · reviews · moderation  │
   │ notifications · ai · analytics · audit                                            │
   └───────┬─────────────┬──────────────┬───────────────┬──────────────┬─────────────┘
           │             │              │               │              │
   ┌───────▼──────┐ ┌────▼─────┐  ┌─────▼──────┐  ┌─────▼──────┐ ┌─────▼─────────┐
   │ PostgreSQL   │ │ Valkey   │  │ MinIO /    │  │ Ollama     │ │ go2rtc /      │
   │ +PostGIS+vec │ │ (Redis)  │  │ S3 storage │  │ (local LLM,│ │ MediaMTX      │
   │ (data+vectors│ │ cache +  │  │ images,    │  │ embeddings,│ │ (RTSP→WebRTC) │
   │  +search)    │ │ BullMQ   │  │ docs, PDFs │  │ Whisper)   │ │ + Frigate NVR │
   └──────────────┘ └──────────┘  └────────────┘  └────────────┘ └───────┬───────┘
                                                                          │ RTSP
                                                                    ┌─────▼──────┐
                                                                    │ IP cameras │
                                                                    └────────────┘
   External (all free): UPI deep links/QR (generated in-app, money goes straight to each hostel), Email (Brevo/Resend free),
   Web Push (VAPID), OpenStreetMap tiles, Gemini/Groq free API (fallback LLM for non-sensitive queries)
   On-site (only for hostels that have cameras): Edge connector = go2rtc + Cloudflare Tunnel on a PC in the hostel LAN
```

### Key architectural decisions (summary)

| # | Decision | Reason |
|---|---|---|
| ADR-1 | Modular monolith, not microservices | Simplicity, single deploy, low RAM |
| ADR-2 | PostgreSQL for everything incl. vectors (pgvector) and full-text search | One datastore, free, powerful |
| ADR-3 | Scoping: operational data carries `property_id`, owner-level data carries `organization_id`; enforced by scope middleware + scoped repository helpers + Postgres RLS (`SET LOCAL app.property_id` per request transaction) as defense in depth | Cheapest isolation model for many owners/institutions |
| ADR-4 | **Frontend: Next.js (React, App Router) + Tailwind + shadcn/ui.** Backend: **Node.js + Express (JavaScript)**, separate apps | SSR/ISR gives SEO for the public marketplace; UI UX Pro Max ships dedicated `nextjs` and `shadcn` stack guidelines; a clean REST API serves web, PWA and any future app |
| ADR-16 | **Database: PostgreSQL 16 (+ PostGIS, pgvector, pg_trgm).** ORM/migrations: **Drizzle** | One free database covers relational data and money, geo search (PostGIS), AI vectors (pgvector), fuzzy/full-text search, RLS and JSONB. Beats MongoDB (weak relations/transactions) and MySQL (weaker geo/vector). Drizzle has first-class `geometry` and `vector` columns and plain-SQL escape hatches; Prisma handles PostGIS poorly |
| ADR-17 | **Same-origin routing:** Caddy serves Next.js on `/` and proxies `/api/*` (including SSE) to Express; in dev Next.js `rewrites` do the same | Cookies stay same-site; no CORS/CSRF complexity |
| ADR-5 | Local-first AI (Ollama) with provider abstraction | Privacy, zero cost; cloud free-tier as optional fallback |
| ADR-6 | AI actions only through typed **tools** that call the same service layer as the UI | Same RBAC and validation; no direct DB access by LLM |
| ADR-7 | CCTV: no video storage in our system; proxy streams and store events/metadata | Legal, storage, cost |
| ADR-8 | Payments are **UPI-direct** (no gateway, no fees) behind a `PaymentProvider` interface | Dormio never holds funds; a gateway can be added later without rewrites |
| ADR-9 | PWA instead of native apps | One codebase, no store fees |
| ADR-10 | Event-driven internals (domain events + BullMQ jobs) for notifications, AI jobs, reminders | Decouples modules |
| ADR-11 | **Optional modules per hostel** via `property_features` flags (mess, cctv, ai, visitors, outpass…) | Not every hostel has CCTV or a mess; UI and API hide/deny disabled modules |
| ADR-13 | **Marketplace search in PostgreSQL**: PostGIS (distance/area) + `pg_trgm` (fuzzy names) + full-text; no Elasticsearch | One datastore, free, enough for 500 properties / 20k users |
| ADR-14 | **Public/private boundary:** public pages read from a `listing_public` view/DTO that exposes only approved public fields; resident/owner data is never reachable from public routes | Prevents PII leaks on a public marketplace |
| ADR-15 | Public pages are **SSR/ISR** (Next.js) with sitemap + structured data | SEO is the main free growth channel |
| ADR-12 | CCTV through an **on-site edge connector** (go2rtc + Cloudflare Tunnel) | Cloud server cannot reach cameras on a hostel LAN; hostel manages its own devices |

---

## 2. Technology Stack (all free / open source)

### Frontend (`apps/web`)
| Concern | Choice |
|---|---|
| Framework | **Next.js (App Router)** + React + **JavaScript (ES modules, JSX)**; types via JSDoc, path aliases via `jsconfig.json` |
| Styling | **Tailwind CSS** + **shadcn/ui** (Radix primitives) |
| State/data | TanStack Query (server state), Zustand (light client state) |
| Forms/validation | React Hook Form + **Zod** (schemas shared with API) |
| Tables/charts | TanStack Table, Recharts |
| i18n | next-intl; **English only at launch**, all strings externalized so locales can be added later |
| PWA | Serwist (service worker), Web Push |
| Maps | **MapLibre GL** + OpenStreetMap tiles (with attribution); marker clustering |
| SEO | Next.js metadata API, `sitemap.js`, JSON-LD structured data, OG image generation (`next/og`) |
| QR | `qrcode` (generate), `@zxing/browser` (scan) |
| PDF | `@react-pdf/renderer` or pdfmake (receipts, agreements) |
| Icons / charts / motion | **Chosen by UI UX Pro Max** (recorded in MASTER.md); chart library Recharts only if the skill's chart guidance fits |

### Backend (`apps/api`)
| Concern | Choice |
|---|---|
| Runtime / framework | **Node.js (LTS) + Express 5**, JavaScript ES modules (`"type": "module"`); dev with `node --watch`; no build step |
| Structure | Feature modules: `routes → controller → service → repository` (see §3); middleware chain for auth/scope/policy/feature/validation |
| ORM / migrations | **Drizzle ORM + drizzle-kit** (typed schema, SQL migrations, hand-written SQL for RLS, views, PostGIS indexes) |
| DB | **PostgreSQL 16** + **PostGIS** + `pgvector` + `pg_trgm` + `unaccent` (custom image in `infra/postgres/`) |
| Search | SQL on PostGIS + trigram + full-text with materialized listing rows; cached hot queries in Valkey |
| Geocoding | Nominatim/Photon (OpenStreetMap), **cached in DB**, debounced, with a proper User-Agent; self-host Photon later if limits bite |
| Cache/queue | **Valkey** (Redis-compatible, open source) + **BullMQ** |
| Auth | Custom JWT with `jose`: short-lived access token + rotating refresh token in httpOnly cookies; **argon2** hashing |
| Authorization | RBAC + permission policies (**CASL**) with org/property scoping, applied by Express middleware |
| Validation | **Zod** schemas (shared in `packages/shared`) via a `validate()` middleware; `helmet`; `express-rate-limit` (Valkey store); `cors` locked to same origin |
| API docs | OpenAPI generated from the Zod schemas (`@asteasolutions/zod-to-openapi`) served with Swagger UI at `/api/docs` (dev/staging) |
| Realtime | Server-Sent Events (alerts, gate feed); WebSocket only if needed |
| Files | S3 API: **MinIO** (self-host) or Cloudflare R2 free tier |
| Email | Mailpit (dev), Brevo/Resend free tier (prod) |
| Logging | Pino; Sentry free tier (errors) |

### AI layer (`apps/api/src/modules/ai` + optional `services/ai-worker`)
| Concern | Choice |
|---|---|
| LLM runtime | **Ollama** (e.g., Qwen 2.5 / Llama 3.x / Gemma small models; choose per hardware) |
| Fallback | Gemini or Groq free tier for non-PII requests (feature-flagged) |
| Embeddings | `nomic-embed-text` via Ollama → **pgvector** (swap to `bge-m3` if multilingual is added) |
| Orchestration | Vercel AI SDK or LangChain.js (tool calling, streaming) |
| Speech-to-text | **Whisper** (`faster-whisper` / whisper.cpp) |
| Forecasting | `statsforecast` or Prophet in a small Python worker (FastAPI), added only in the forecasting phase |
| Anomaly detection | SQL rules first, then scikit-learn IsolationForest |
| Eval/observability | **Promptfoo** (evals), **Langfuse** self-hosted (traces), optional |

### CCTV / Security
| Concern | Choice |
|---|---|
| Stream proxy | **go2rtc** or **MediaMTX** (RTSP → WebRTC/HLS for browser) |
| NVR + detection | **Frigate** (optional; MQTT events → API webhook) |
| Event bus (optional) | Mosquitto MQTT |

### DevOps
| Concern | Choice |
|---|---|
| Monorepo | **pnpm workspaces + Turborepo** |
| Containers | Docker + Docker Compose |
| CI/CD | GitHub Actions (free for public repos; free minutes for private) |
| Hosting (free, online) | **Primary:** Oracle Cloud Always Free ARM VM running the whole Docker stack behind Caddy (card verification needed; ARM capacity can be limited by region). **Fallback:** any always-on PC/college server + **Cloudflare Tunnel** (free, no open ports). Dormio is commercial, so **do not use Vercel Hobby** (non-commercial terms). Free tiers change; keep everything Docker-portable |
| Domain | Pilot on a free subdomain (e.g., via Cloudflare Tunnel or DuckDNS). A custom domain (~₹700/yr) is the one cost you will likely want before launch |
| DB (managed alt.) | Neon or Supabase free Postgres (watch storage/pause limits) |
| Backups | `pg_dump` cron → R2/free object storage |
| Quality | ESLint, Prettier, Husky, lint-staged, commitlint, **Vitest + Supertest + Testcontainers** (API), Vitest + Testing Library (web), Playwright (E2E), Dependabot/Renovate |

---

## 3. Monorepo Folder Structure

```
dormio/
├── AGENTS.md                    # Single source of instructions for AI agents (see rules.md)
├── GEMINI.md                    # Thin pointer to AGENTS.md (Antigravity reads it)
├── .agents/
│   ├── rules/                   # Always-on Antigravity rules (core, ui-quality, security)
│   ├── workflows/               # Slash-style workflows (/next-task, /build-ui, /end-session…)
│   └── skills/                  # Installed skills (UI UX Pro Max, Graphify)
├── graphify-out/                # Knowledge graph (graph.json, GRAPH_REPORT.md) — generated
├── .graphifyignore
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── docker-compose.yml           # postgres, valkey, minio, mailpit, ollama, go2rtc
├── docker-compose.prod.yml
├── .env.example
├── .github/
│   ├── workflows/               # ci.yml, deploy.yml
│   └── pull_request_template.md
├── .coderabbit.yaml             # CodeRabbit config
├── docs/
│   ├── PRD.md
│   ├── architecture.md
│   ├── rules.md
│   ├── Design.md
│   ├── task.md
│   ├── memory.md
│   ├── adr/                     # one file per architecture decision
│   └── api/                     # exported OpenAPI, Postman collection
├── design-system/
│   └── dormio/                  # UI UX Pro Max output: MASTER.md + pages/<page>.md overrides
├── apps/
│   ├── web/                     # Next.js
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (marketplace)/       # PUBLIC, SSR/ISR: home, search, /hostels /pgs /messes,
│   │   │   │   │                        #   /[kind]/[slug], /pg-in/[city]/[locality], compare, saved
│   │   │   │   ├── (auth)/              # login, register, verify, reset
│   │   │   │   ├── (account)/me/        # bookings, subscriptions, saved, profile, notifications
│   │   │   │   ├── (stay)/stay/[propertyId]/   # resident/subscriber hub: rent, complaints, notices,
│   │   │   │   │                        #   QR pass, outpass, mess plan, rules
│   │   │   │   ├── (guardian)/          # guardian portal
│   │   │   │   ├── (owner)/owner/       # become-an-owner, onboarding, listings wizard, leads, properties
│   │   │   │   ├── (manage)/manage/[propertyId]/  # operator console per property
│   │   │   │   │   ├── overview/ residents/ bookings/ rooms/ rent/ complaints/ notices/
│   │   │   │   │   ├── mess/ security/ cctv/ reviews/ reports/ settings/
│   │   │   │   ├── (guard)/guard/       # minimal full-screen guard PWA
│   │   │   │   ├── (admin)/admin/       # platform admin: verification, moderation, analytics
│   │   │   │   └── api/                 # only BFF helpers (e.g., health, push subscribe)
│   │   │   ├── features/                # feature-sliced UI: hostel/, booking/, mess/, ...
│   │   │   │   └── <feature>/{components,hooks,api,schemas,types}
│   │   │   ├── components/              # shared UI (ui/ = shadcn, layout/, data/)
│   │   │   ├── lib/                     # api client, auth, utils, i18n
│   │   │   ├── messages/                # en.json (add locales later)
│   │   │   └── styles/
│   │   ├── public/                      # icons, manifest, sw
│   │   └── tests/                       # Playwright e2e
│   └── api/                     # Node.js + Express (JavaScript, ES modules)
│       ├── src/
│       │   ├── server.js                # process entry, graceful shutdown
│       │   ├── app.js                   # builds the Express app: middleware order + routers
│       │   ├── config/                  # env validation (Zod)
│       │   ├── middleware/              # requestId, auth, scope, policies, feature, validate, rateLimit, error
│       │   ├── infra/                   # db (Drizzle client), redis, storage, mailer, push, queue, logger
│       │   ├── db/
│       │   │   ├── schema/              # Drizzle tables per module
│       │   │   ├── migrations/          # drizzle-kit SQL + hand-written SQL (RLS, views, PostGIS/GiST indexes)
│       │   │   └── seed.js
│       │   └── modules/                 # every module = routes.js, controller.js, service.js,
│       │                                #   repository.js, schemas.js (Zod), policies.js, events.js, *.test.js
│       │       ├── auth/                # login, tokens, sessions
│       │       ├── users/               # profiles, KYC docs, guardian links
│       │       ├── orgs/                # organizations (individual, business, institution), verification
│       │       ├── properties/          # hostel / PG / mess, units, beds, amenities, rules, features
│       │       ├── listings/            # public listing profile, publish workflow, listing_public view
│       │       ├── search/              # PostGIS + trigram search, filters, autocomplete, geocode cache
│       │       ├── media/               # upload, WebP pipeline, thumbnails
│       │       ├── bookings/            # booking requests, approvals, waitlist
│       │       ├── stays/               # residents, allotments, check-in/out, agreements
│       │       ├── notices/             # notices, circulars, alerts
│       │       ├── complaints/
│       │       ├── leaves/              # outpass
│       │       ├── mess/                # plans, subscriptions, menus, scans, feedback
│       │       ├── security/            # gate, visitors, incidents
│       │       ├── cctv/                # optional module
│       │       ├── payments/            # invoices, upi/, verification/, reconciliation/, receipts
│       │       ├── reviews/             # verified reviews, ratings aggregates, owner replies
│       │       ├── moderation/          # reports, takedowns, admin queues
│       │       ├── leads/               # enquiries, visit requests, saved searches
│       │       ├── notifications/
│       │       ├── ai/                  # gateway/, rag/, tools/, agents/, guardrails/, concierge/
│       │       ├── analytics/
│       │       └── audit/
│       └── test/                        # integration tests (Supertest + Testcontainers)
├── packages/
│   ├── shared/                  # shared enums, Zod schemas, JSDoc typedefs, permission matrix (single source of truth)
│   ├── ui/                      # shared React components if a 2nd front-end appears
│   └── config/                  # eslint, jsconfig, tailwind presets
├── services/
│   └── ai-worker/               # (later) FastAPI: forecasting, Whisper, anomaly models
├── infra/
│   ├── caddy/Caddyfile
│   ├── postgres/Dockerfile      # PostGIS + pgvector image
│   ├── edge-connector/          # on-site CCTV connector (go2rtc + cloudflared compose)
│   ├── go2rtc/go2rtc.yaml
│   ├── frigate/config.yml
│   └── scripts/                 # backup.sh, restore.sh, seed.sh
└── scripts/                     # check-ui-rules.sh (UI bans), repo utilities
```

---

## 4. Core Domain Model (high level)

```
User ─┬─ PlatformRole (ADMIN, MODERATOR)
      ├─ OrgMember ── Organization(type: INDIVIDUAL | BUSINESS | INSTITUTION, verified_at, upi settings)
      └─ PropertyMember(role: OWNER | MANAGER | ACCOUNTANT | GUARD | MESS_MANAGER | MAINTENANCE
                              | RESIDENT | SUBSCRIBER | GUARDIAN)

Organization ── Property(kind: HOSTEL | PG | MESS, status, linked_mess_property_id?, features)
Property ─┬─ Listing (public profile, slug, location POINT, rating aggregates, freshness, publish status)
          │    ├─ Media, Amenity, Rule, CurfewRule, NearbyPlace
          │    └─ ListingModeration (draft → pending → approved | rejected | suspended)
          ├─ Block ─ Floor ─ Room ─ Bed  (HOSTEL/PG)         ── Unit pricing + availability
          ├─ MessPlan, MenuItem, MenuSchedule                 (MESS)
          ├─ Lead (enquiry), VisitRequest
          ├─ Booking ─ Allotment ─ Agreement ─ CheckIn/CheckOut
          ├─ MessSubscription ─ Coupon ─ MealScan ─ SkipMeal ─ MealFeedback
          ├─ FeeStructure ─ Invoice ─ InvoiceLine ─ PaymentIntent ─ Payment(utr, status) ─ Receipt ─ Refund
          ├─ Notice / Circular / Alert ─ Acknowledgment
          ├─ Complaint ─ Comment ─ Attachment ─ Assignment ─ Feedback
          ├─ LeaveRequest, Visitor, GateEvent, Incident, LostItem
          ├─ Camera ─ CameraEvent                              (optional)
          └─ Review(verified_ref → Booking | MessSubscription) ─ OwnerReply ─ Report

User ── SavedListing, SavedSearch, CompareSet, Notification, PushSubscription
Platform ── AiConversation, AiMessage, AiAction, KnowledgeChunk(vector), GeocodeCache, AuditLog
```

Rules:
- Operational tables carry `property_id` (indexed); owner-level tables carry `organization_id`; user-level tables carry `user_id`.
- A **Review** must reference a real `Booking` or `MessSubscription` of the reviewer (enforced in DB).
- `Listing` rows are the only entities the public can read, through the `listing_public` DTO (approved + published only).
- Soft delete (`deleted_at`) for user-facing data. Money in integer paise. Timestamps UTC, displayed in IST.
- `Payment.utr` unique per property.

---

## 5. Cross-Cutting Design

### 5.1 Authentication and Authorization
- Login → access token (15 min) + refresh token (7 days, rotating, stored hashed) in httpOnly cookies.
- Public routes serve only `listing_public` data and never PII.
- Express middleware chain per route: `requestId` → `rateLimit` → `auth` (verify JWT) → `scope` (resolve `organization_id` / `property_id` + caller's membership role, open a transaction and `SET LOCAL app.property_id` for RLS) → `policies` (CASL ability check) → `feature` (property feature flag) → `validate(zodSchema)` → controller.
- Public routes are declared on a separate `publicRouter` that cannot access scoped repositories and only returns `listing_public` DTOs.
- Same-origin cookies (Caddy proxies `/api` to Express), so CSRF is handled with `SameSite=Lax` cookies + Origin header check on mutating requests.
- Permission matrix lives in `packages/shared/permissions.js`; used by both API and UI.
- Postgres RLS enabled on operational tables as defense in depth.
- One account can hold multiple memberships (e.g., RESIDENT in a PG and SUBSCRIBER of a mess); the UI shows a context switcher.

### 5.2 API Conventions
- REST, JSON, `/api/v1/...`, plural nouns, cursor pagination, consistent error envelope `{ code, message, details, requestId }`.
- Idempotency keys for payment and booking creation.
- OpenAPI generated from Zod schemas; the web app imports the same Zod schemas/types from `packages/shared` (single source of truth).
- Express rules: async handlers wrapped by a single error-forwarding helper (Express 5 forwards rejected promises); one central error middleware maps domain errors to the envelope.

### 5.3 Payments Flow (UPI-direct)
```
Resident taps "Pay now" on an invoice
   │  API creates PaymentIntent {invoiceId, amount (paise), ref "DRM-<invoiceNo>", expiresAt}
   ▼
UI shows: UPI QR  +  "Pay with UPI app" button (deep link)
   upi://pay?pa=<hostel VPA>&pn=<hostel name>&am=<amount>&cu=INR&tn=<note>&tr=<ref>
   │  Resident pays in their UPI app → money goes DIRECTLY to the hostel's account
   ▼
Resident returns → enters 12-digit UTR (+ optional screenshot)   → Payment = SUBMITTED
   │  unique(property_id, utr) blocks reuse of the same UTR
   ▼
Staff "Verification queue" (accountant/warden) compares with bank app/statement
   ├─ VERIFIED → invoice PAID → receipt PDF job → notification
   └─ REJECTED (reason) → resident notified, can resubmit
Optional (PY-09): upload bank-statement CSV → auto-match by UTR + amount → bulk VERIFY
Offline: staff record cash/bank payment → same ledger, source = OFFLINE
```
- Each hostel stores its **own UPI ID** (a merchant/current-account VPA is recommended; some UPI apps restrict amount-prefilled links to personal VPAs).
- A screenshot never marks anything paid by itself; only a staff action or a statement match does.
- Ledger entries are append-only; refunds create reversal entries.
- `PaymentProvider` interface: `UpiDirectProvider` (MVP) · `GatewayProvider` (future, PY-10).

### 5.4 Notifications
Domain event → Notification service → channel router (in-app, email, web push) with user preferences, templates per language, retry via BullMQ. Emergency alerts bypass quiet hours.

### 5.5 Security Module (Gate)
- Resident QR = short-lived signed token (rotates every 60 s) to prevent screenshot sharing.
- Guard PWA queues scans offline in IndexedDB and syncs with idempotency keys.
- Rules engine: curfew, blocked residents, visitor allow-list → emits `GateViolation` events → warden alert + parent notification.

### 5.6 CCTV Integration (optional, per hostel)
CCTV is a **feature flag** (`property_features.cctv`). Hostels without cameras never see it; hostels with cameras get a "CCTV-monitored" badge on the listing and detail page. **Feeds are never public.**

```
HOSTEL LAN (hostel-managed)                         DORMIO SERVER
IP cameras ─RTSP─▶ Edge connector (Docker on a PC)   ┌──────────────────────────┐
                   • go2rtc  (RTSP → WebRTC/HLS)     │ API: Camera registry,    │
                   • cloudflared (Cloudflare Tunnel) │ signed short-lived URLs, │
                   • Frigate (optional, detection) ─▶│ view audit log           │
                         │ outbound only (no open ports) └─────────▲────────────┘
                         └──────── authenticated stream URL ───────┘
Browser (Warden/Security/Admin only) ◀── WebRTC/HLS via signed URL
Frigate events (person/motion) ──webhook/MQTT──▶ API: CameraEvent (snapshot + time) ↔ Incident
```
- Hostel IT/owner runs the connector from a ready-made `infra/edge-connector/docker-compose.yml` and pastes a pairing token into Dormio.
- Dormio stores camera metadata, health, and event snapshots (7-day default retention). It never records or stores continuous video.
- Every live view is written to the audit log; roles: Security, Warden, Admin only.

### 5.7 AI Architecture
```
User message
   │
   ▼
AI Gateway ──▶ Guardrails (PII scrub, prompt-injection checks, role context)
   │
   ▼
Orchestrator (tool-calling loop)
   ├─ RAG tool ──▶ pgvector (hostel rules, FAQs, notices, menu) — property-filtered
   ├─ Public tools ──▶ searchListings(filters), compareListings(ids)   (public data only; powers the search concierge)
   ├─ Read tools ──▶ getMyDues, getTodayMenu, getMyComplaints, getNotices (user-scoped)
   ├─ Write tools ──▶ createComplaint, requestOutpass, skipMeal   ← return a *proposal*;
   │                                                         user must tap "Confirm"
   └─ Staff tools ──▶ runReport(name, params)  (whitelisted, read-only)
   │
   ▼
Response (streamed) + AiAction audit record (who, tool, params, result)
```
Rules: the LLM never writes SQL; tools call existing service-layer methods with the **caller's identity**; every write requires explicit confirmation; per-user rate limits; eval suite must pass before prompt/model changes ship.

Background AI jobs (BullMQ): complaint triage on create, notice summarization, nightly mess forecast, anomaly scans, weekly digest.

### 5.8 Observability and Operations
- `/health` and `/ready` endpoints; request IDs in all logs; Sentry for errors.
- Daily encrypted DB backup (retain 14 days); restore tested monthly.
- Per-hostel feature flags in `property_features` (mess, cctv, ai_assistant, visitors, outpass, reviews). API returns 403 and UI hides screens for disabled modules.

### 5.9 Security Baseline
Helmet headers, CSRF protection for cookie auth, strict CORS, rate limits on auth and AI endpoints, file-type/size validation + virus scan (ClamAV optional), signed upload URLs, secrets via env only, dependency audit in CI, audit log for admin actions.

---

### 5.10 Marketplace Search and SEO
```
Query (area text / lat,lng / filters) ─▶ Search API
   1. Resolve area: locality/college autocomplete (own `places` table seeded from OSM, geocode cache)
   2. SQL: listing_public ⨝ PostGIS ST_DWithin(point, radius) + filters (kind, rent, gender, sharing, amenities,
      rating, verified, available_from, cctv) + trigram name match
   3. Rank: relevance score = distance + rating (Bayesian average) + freshness + verified boost
   4. Return cards + facets + bounding box (for map) — cached in Valkey (60 s) for hot queries
Pages: /search (CSR hydrated from SSR), /[kind]/[slug] (ISR, revalidate on listing change),
       /pg-in/[city]/[locality] (ISR), sitemap.xml generated from published listings, JSON-LD per listing
```
- Rating aggregates are denormalized onto `Listing` and recomputed by a BullMQ job on each review change.
- **Freshness:** `Listing.availability_confirmed_at`; >14 days stale → down-ranked and labeled; owner nudged at 7 days.
- Contact info is returned only to authenticated users and rate-limited per user.

---

## 6. Environments

| Env | Purpose | Notes |
|---|---|---|
| Local | Dev | `docker compose up` brings infra; seed data script |
| Preview | PR checks | CI runs lint, type-check, unit, e2e smoke |
| Production | Pilot | Single VM, Caddy TLS, daily backups |

---

## 7. Scalability Path (when needed)

1. Add read replica / move DB to managed free tier.
2. Split `ai-worker` and `cctv` into separate containers (already isolated by module).
3. Move queues to a separate Valkey instance.
4. Extract the notifications module as a service.
No rewrite is required if module boundaries in `rules.md` are respected.

---

## 8. AI-Assisted Development Toolchain (verified install steps)

Dormio is built almost entirely by AI agents, so the toolchain is part of the architecture. Install order and exact commands are in `docs/BOOTSTRAP.md`.

| Purpose | Tool | Install / usage (from each project's README) |
|---|---|---|
| IDE + agent | **Google Antigravity** | Primary. Reads `AGENTS.md`, `GEMINI.md`, `.agents/rules`, `.agents/workflows`, `.agents/skills` |
| Spec-driven workflow | **Get Shit Done** (`@opengsd/get-shit-done-redux`) | `npx @opengsd/get-shit-done-redux@latest` — plan → execute → verify per phase |
| UI/UX design intelligence | **UI UX Pro Max** ([repo](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)) | `npm install -g ui-ux-pro-max-cli` then `uipro init --ai antigravity` (needs Python 3). Persist the system with `--design-system --persist -p "Dormio"` → `design-system/dormio/MASTER.md` |
| Codebase knowledge graph | **Graphify** ([repo](https://github.com/Graphify-Labs/graphify)) | `uv tool install graphifyy` → `graphify install` → `graphify antigravity install` → `/graphify .` → `graphify hook install`. Code is parsed locally (no API cost) |
| Code review | **CodeRabbit** | Install the GitHub App on the repo (free for public repos); config in `.coderabbit.yaml` |
| Autonomous loop | **Ralph loop** | Only for tasks with a test/type-check pass condition and a max-iteration cap |

**Additional recommended (free/open source):** Context7 MCP (current library docs), Playwright MCP (agent verifies UI in a real browser), shadcn/ui MCP, Promptfoo + Langfuse (evaluate Dormio's own AI), axe-core + Lighthouse CI (a11y/perf gates), Dependabot/Renovate, Open WebUI (try Ollama models). Verify each tool's current README before installing.

> **Graphify cost note:** its code graph is free and local. Docs/PDF/image extraction uses your assistant's model, so keep `.graphifyignore` tight and index code + `docs/` only.

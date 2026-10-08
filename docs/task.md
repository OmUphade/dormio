# Project Tasks — Dormio

**Legend:** ✅ done · 🔄 in progress · ⬜ not started · ⏸ blocked · 🅿 parked (post-MVP; do not start until MVP is shipped)
**Rules:** Only one task 🔄 at a time. Update this file and `memory.md` at the end of every session (`/end-session`). Every UI task must follow the **UI Gate** in `Design.md` §2 (UI UX Pro Max).
**Release markers:** 🅰 Alpha "Find" · 🅱 Beta "Live" · 🏁 v1.0 "Run"

---

## Progress Summary

| Metric | Count |
|---|---|
| **Total tasks** | **149** |
| ✅ Completed | 7 |
| 🔄 In progress | 0 |
| ⬜ Not started | 142 |
| ⏸ Blocked | 0 |
| **Overall progress** | **5%** |

| Phase | Name | Tasks | Done | In progress | Release |
|---|---|---|---|---|---|
| 0 | Planning & Documentation | 7 | 7 | 0 | — |
| 1 | Project Setup & Agent Tooling | 10 | 0 | 0 | 🅰 |
| 2 | UI Foundation via UI UX Pro Max | 9 | 0 | 0 | 🅰 |
| 3 | Auth, Accounts & Access Control | 9 | 0 | 0 | 🅰 |
| 4 | Owner Onboarding & Listing Management | 11 | 0 | 0 | 🅰 |
| 5 | Marketplace Discovery (Hostels & PGs) | 12 | 0 | 0 | 🅰 |
| 6 | Mess Marketplace & Mess Management | 12 | 0 | 0 | 🅱 |
| 7 | Booking & Stay Lifecycle | 9 | 0 | 0 | 🅱 |
| 8 | Rent & Payments (UPI-direct) | 9 | 0 | 0 | 🅱 |
| 9 | Communication & Complaints | 10 | 0 | 0 | 🅱 |
| 10 | Security, Entry/Exit & CCTV (optional module) | 11 | 0 | 0 | 🅱/🏁 |
| 11 | Reviews, Ratings & Trust | 7 | 0 | 0 | 🅱 |
| 12 | Dashboards, Analytics & Reports | 6 | 0 | 0 | 🏁 |
| 13 | AI Layer | 12 | 0 | 0 | 🅱/🏁 |
| 14 | PWA, Push & Performance | 4 | 0 | 0 | 🏁 |
| 15 | Testing, Hardening & Launch | 11 | 0 | 0 | 🏁 |
| | **Total** | **149** | **7** | **0** | |

**Suggested build order:** 0 → 1 → 2 → 3 → 4 → 5 (Alpha: marketplace live) → 8 → 7 → 9 → 6 → 11 → 10 → 12 → 13 → 14 → 15.
Reason: owners and seekers must meet first (listings + search), then money and stays, then daily-living features, then AI.

**MVP cut (🅱):** everything marked 🅰 or 🅱. Items marked 🅿 are parked until after the pilot.

---

## Phase 0: Planning & Documentation (7/7)

- ✅ 0.1 Write `PRD.md`
- ✅ 0.2 Write `architecture.md`
- ✅ 0.3 Write `rules.md`
- ✅ 0.4 Write `Design.md`
- ✅ 0.5 Write `task.md`
- ✅ 0.6 Write `memory.md`
- ✅ 0.7 Resolve open questions, rename to Dormio, re-scope as marketplace + operator platform, add agent/tooling files


## Phase 1: Project Setup & Agent Tooling (0/10)

- ⬜ 1.1 Initialize Git repo, license, README, `.gitignore`, branch protection
- ⬜ 1.2 Create pnpm + Turborepo monorepo (`apps/`, `packages/`, `docs/`)
- ⬜ 1.3 Scaffold `apps/web` (React via Next.js App Router in JavaScript/JSX + Tailwind + shadcn/ui) with route groups from architecture §3 and `/api` rewrite to Express
- ⬜ 1.4 Scaffold `apps/api` (Node.js + Express 5, JavaScript ES modules: app.js/server.js, middleware chain skeleton, central error handler, pino logging, `/health`, OpenAPI from Zod at `/api/docs`)
- ⬜ 1.5 Create `packages/shared` and `packages/config` (jsconfig, eslint, tailwind preset)
- ⬜ 1.6 Configure ESLint, Prettier/Biome, Husky, lint-staged, commitlint
- ⬜ 1.7 `docker-compose.yml` up: Postgres (PostGIS + pgvector), Valkey, MinIO, Mailpit; verify extensions load
- ⬜ 1.8 Drizzle ORM + drizzle-kit setup + base schema (User, Organization, Property, Listing) + first migration + seed skeleton; verify PostGIS `geometry` and pgvector `vector` columns work
- ⬜ 1.9 Env validation (Zod) + `.env.example` finalized
- ⬜ 1.10 CI (GitHub Actions: build, lint, test, `check-ui-rules.sh`, `check-ui-provenance.sh`, `check-no-typescript.sh`) + `.coderabbit.yaml` + verify agent tooling (GSD, UI UX Pro Max, Graphify installed and working)


## Phase 2: UI Foundation via UI UX Pro Max (0/9)

- ⬜ 2.1 Generate `design-system/dormio/MASTER.md` with UI UX Pro Max (see `Design.md` §2.1); verify against bans; record selection rationale
- ⬜ 2.2 Generate page overrides + page specs for: home, search, listing detail, mess detail, owner wizard, My Stay hub, rent ledger, guard screen, owner dashboard
- ⬜ 2.3 Implement tokens (Tailwind theme + CSS variables) from MASTER.md
- ⬜ 2.4 Fonts via `next/font` per MASTER.md
- ⬜ 2.5 Install shadcn/ui as unstyled structure and fully restyle to MASTER.md
- ⬜ 2.6 App shells: marketplace, account/stay (bottom tabs), owner/manage (sidebar), guard, admin
- ⬜ 2.7 Shared components: ListingCard (both variants), FilterBar, Gallery, RatingBreakdown, TrustBadges, MapView, DataTable, KpiStrip, Chips, Empty/Error/Skeleton, FileUpload
- ⬜ 2.8 Component showcase `/dev/components` + Playwright screenshot baselines (360/768/1280)
- ⬜ 2.9 UI gate automation: `check-ui-rules.sh` + `check-ui-provenance.sh` in CI + axe-core + `PAGES.md` / `COMPONENTS.md` registries (every page/component traceable to UI UX Pro Max output)


## Phase 3: Auth, Accounts & Access Control (0/9)

- ⬜ 3.1 Signup / login / logout (argon2, JWT access + rotating refresh in httpOnly cookies)
- ⬜ 3.2 Email verification and password reset
- ⬜ 3.3 Auth UI pages (via UI Gate) + route protection + context switcher (multiple memberships)
- ⬜ 3.4 Platform roles + org roles + property roles (`property_members`) + CASL policies + Express middleware (auth → scope → policies → feature)
- ⬜ 3.5 Scoping (`organization_id` / `property_id`) + scoped repository helpers + RLS (`SET LOCAL app.property_id`) + isolation tests + public-leak tests
- ⬜ 3.6 Profile + KYC/document upload (MinIO signed URLs)
- ⬜ 3.7 Invites: staff, resident, guardian (token links)
- ⬜ 3.8 Audit log service + viewer for admins
- ⬜ 3.9 Rate limiting, Helmet, CSRF, security headers


## Phase 4: Owner Onboarding & Listing Management (0/11)

- ⬜ 4.1 Data model: Property (HOSTEL/PG/MESS), Listing, Unit/Room/Bed, Media, Amenity, Rule, CurfewRule, NearbyPlace, property_features
- ⬜ 4.2 "Become an owner" flow: org creation (individual / business / institution), KYC, UPI ID settings 🅰
- ⬜ 4.3 Hostel/PG listing wizard with live preview (via UI Gate) 🅰
- ⬜ 4.4 Rooms/beds/pricing/availability management + vacancy dates 🅰
- ⬜ 4.5 Media pipeline: upload, WebP compression, thumbnails, reorder, cover image 🅰
- ⬜ 4.6 Location pin + address + geocoding with DB cache + places seed (cities/localities/colleges)
- ⬜ 4.7 Publish workflow: draft → pending → approved/rejected/suspended + preview 🅰
- ⬜ 4.8 Platform admin verification queue (owner KYC + listing review) 🅰
- ⬜ 4.9 Per-property feature flags UI (mess link, CCTV, visitors, outpass, reviews)
- ⬜ 4.10 Institution workspace: hidden listing, bulk resident import (CSV), allotment list, own branding
- ⬜ 4.11 Availability freshness: weekly confirm nudge, stale labeling, "last updated"


## Phase 5: Marketplace Discovery (Hostels & PGs) (0/12)

- ⬜ 5.1 `listing_public` view/DTO + search API (PostGIS radius, filters, sort, pagination) 🅰
- ⬜ 5.2 Area autocomplete (locality/college/landmark, "near me") 🅰
- ⬜ 5.3 Home page (via UI Gate) 🅰
- ⬜ 5.4 Search results page with filters and cards 🅰
- ⬜ 5.5 Map view with clustered price pins, "search this area", list/map sync
- ⬜ 5.6 Listing detail page: gallery, rooms/rent, availability, amenities, rules, safety, location, reviews slot 🅰
- ⬜ 5.7 Compare (up to 3) and compare table
- ⬜ 5.8 Shortlist / saved listings and saved searches
- ⬜ 5.9 SEO: area landing pages, sitemap, JSON-LD, OG images, ISR revalidation
- ⬜ 5.10 Enquiry/contact (login to reveal contact) + owner lead inbox 🅰
- ⬜ 5.11 Schedule-a-visit requests + share links
- ⬜ 5.12 Search performance: indexes, Valkey caching, load check at 500 listings


## Phase 6: Mess Marketplace & Mess Management (0/12)

- ⬜ 6.1 Mess property model (standalone or linked to hostel/PG), service area, timings
- ⬜ 6.2 Mess listing wizard (cuisine, veg/non-veg, plans, sample menu, photos, hygiene info)
- ⬜ 6.3 Mess discovery in search + mess detail page (via UI Gate)
- ⬜ 6.4 Weekly menu management + resident menu view
- ⬜ 6.5 Plans and subscription purchase (UPI) incl. trial meal / day pass
- ⬜ 6.6 Coupons / QR meal tokens (guest meals, extras, expiry)
- ⬜ 6.7 Meal scan at counter (rotating QR, duplicate prevention, balance)
- ⬜ 6.8 Skip-meal with cutoff and rebate
- ⬜ 6.9 Mess billing integration (monthly invoice, rebates)
- ⬜ 6.10 Menu feedback per meal and mess announcements
- ⬜ 6.11 Mess manager dashboard (meal counts, revenue, feedback, wastage log)
- ⬜ 6.12 Link mess to hostel/PG: residents see and subscribe from My Stay


## Phase 7: Booking & Stay Lifecycle (0/9)

- ⬜ 7.1 Booking request flow (unit/bed, move-in date, token amount) 🅱
- ⬜ 7.2 Owner approve / waitlist / reject with reason 🅱
- ⬜ 7.3 Token payment via UPI (uses Phase 8 UPI flow)
- ⬜ 7.4 Bed allotment + agreement PDF 🅱
- ⬜ 7.5 Check-in checklist and resident activation 🅱
- ⬜ 7.6 **My Stay hub**: rent, notices, complaints, QR pass, rules 🅱
- ⬜ 7.7 Transfer, notice period, vacate/check-out, deposit refund
- ⬜ 7.8 Cancellation and refund policy rules per property
- ⬜ 7.9 Booking history and rebook


## Phase 8: Rent & Payments (UPI-direct) (0/9)

- ⬜ 8.1 Fee structures + recurring monthly rent invoices + deposits 🅱
- ⬜ 8.2 UPI config per owner + QR + "Pay with UPI app" deep link
- ⬜ 8.3 UTR submission + staff verification queue + duplicate-UTR protection 🅱
- ⬜ 8.4 Offline payment recording (cash/bank) 🅱
- ⬜ 8.5 PDF receipts and invoice download 🅱
- ⬜ 8.6 Dues dashboard + automated reminders (BullMQ)
- ⬜ 8.7 Late-fee rules engine + deposit ledger (append-only) with unit tests
- ⬜ 8.8 Bank-statement CSV import + auto-match by UTR/amount
- ⬜ 8.9 Financial reports and CSV export


## Phase 9: Communication & Complaints (0/10)

- ⬜ 9.1 Notice board: CRUD, audience targeting, attachments, pin/expiry 🅱
- ⬜ 9.2 Circulars with read-acknowledgment tracking
- ⬜ 9.3 Notification service (in-app, email; preferences; templates; retries) 🅱
- ⬜ 9.4 Emergency alerts (broadcast, SSE, banner, acknowledge)
- ⬜ 9.5 Complaint creation with photos, categories, priority 🅱
- ⬜ 9.6 Complaint workflow: assign, status, comments, SLA timers, escalation 🅱
- ⬜ 9.7 Maintenance staff view (assigned tickets, proof photo)
- ⬜ 9.8 Resolution feedback, reopen flow, complaint analytics
- ⬜ 9.9 Outpass / leave with manager and guardian approval
- ⬜ 9.10 Visitor pre-registration (resident side)


## Phase 10: Security, Entry/Exit & CCTV (optional module) (0/11)

- ⬜ 10.1 Gate entry/exit by rotating QR scan 🅱
- ⬜ 10.2 Curfew rules, late-entry flags, blocked-resident handling 🅱
- ⬜ 10.3 Visitor management at gate (approve/deny, ID photo, times)
- ⬜ 10.4 Guardian notification on entry/exit and late entry
- ⬜ 10.5 Guard PWA screen with offline queue + sync
- ⬜ 10.6 CCTV feature flag + camera registry + "CCTV-monitored" badge on listing/detail
- ⬜ 10.7 Edge connector kit (`infra/edge-connector`) + pairing + live view via signed URLs + view audit log
- ⬜ 10.8 CCTV event ingestion from Frigate + snapshot retention job 🅿
- ⬜ 10.9 Incident and theft reporting (evidence, severity, timeline, link to camera events) 🅱
- ⬜ 10.10 Lost and found 🅿
- ⬜ 10.11 Security dashboard and patrol check-ins 🅿


## Phase 11: Reviews, Ratings & Trust (0/7)

- ⬜ 11.1 Verified reviews (must reference real booking/subscription) with rating dimensions; mess dimensions 🅱
- ⬜ 11.2 Owner replies to reviews
- ⬜ 11.3 Rating aggregates (Bayesian), badges, trust score; wire into search ranking and cards
- ⬜ 11.4 Report listing/review + moderation queue (admin) 🅱
- ⬜ 11.5 Verified-owner and verified-listing badges across UI
- ⬜ 11.6 Spam/abuse controls: rate limits, contact masking, enquiry throttles 🅱
- ⬜ 11.7 Fake-review and stale-listing detection rules 🅿


## Phase 12: Dashboards, Analytics & Reports (0/6)

- ⬜ 12.1 Owner dashboard: occupancy, rent collected/due, leads, complaints
- ⬜ 12.2 Warden/manager dashboard: approvals, complaints SLA, gate feed
- ⬜ 12.3 Institution dashboard + reports
- ⬜ 12.4 Platform admin dashboard: listings, verification, reports, growth
- ⬜ 12.5 Guardian portal
- ⬜ 12.6 Report exports (CSV, PDF) for key reports


## Phase 13: AI Layer (0/12)

- ⬜ 13.1 AI Gateway: Ollama provider, optional Gemini/Groq fallback (non-PII only), timeouts, rate limits, logging 🅱
- ⬜ 13.2 Knowledge ingestion + pgvector RAG (property rules, FAQs, notices, menu), property-filtered 🅱
- ⬜ 13.3 Resident assistant v1 (chat panel, streaming, source chips) 🅱
- ⬜ 13.4 **AI search concierge**: natural language → filters, ranking, explanation, compare (public data tools)
- ⬜ 13.5 Agentic tools with RBAC + confirmation (complaint, outpass, skip meal, dues, menu)
- ⬜ 13.6 Complaint auto-triage (category, priority, duplicates, assignee)
- ⬜ 13.7 Owner listing assistant: descriptions, missing-info checks, rent suggestions from nearby listings
- ⬜ 13.8 Review summaries (pros/cons) per listing
- ⬜ 13.9 Mess demand forecasting and waste insights 🅿
- ⬜ 13.10 Gate anomaly detection 🅿
- ⬜ 13.11 Natural-language analytics for owners via whitelisted tools 🅿
- ⬜ 13.12 AI audit log, eval suite (Promptfoo), guardrails (prompt-injection tests), feedback loop


## Phase 14: PWA, Push & Performance (0/4)

- ⬜ 14.1 PWA manifest, service worker, install prompt, offline shell
- ⬜ 14.2 Web push notifications (VAPID) incl. emergency alerts
- ⬜ 14.3 Offline-safe flows (guard queue, cached menu/notices/QR)
- ⬜ 14.4 Performance pass (Lighthouse budgets, image optimization, bundle analysis)


## Phase 15: Testing, Hardening & Launch (0/11)

- ⬜ 15.1 Unit tests for critical logic (fees, fines, curfew, refunds, permissions, ranking)
- ⬜ 15.2 Integration tests with real Postgres; isolation + public-leak suites for all modules
- ⬜ 15.3 Playwright E2E: search → book → pay → My Stay; owner list → approve; complaint; gate scan; mess scan
- ⬜ 15.4 Security review (OWASP checklist, dependency audit, secrets scan)
- ⬜ 15.5 DPDP compliance pass (consent, retention jobs, export/delete flows, privacy policy, terms)
- ⬜ 15.6 Load test (k6) at target scale; fix hotspots
- ⬜ 15.7 Production Docker setup + Caddy TLS + hardening
- ⬜ 15.8 Free online deployment (Oracle Always Free VM, or PC/college server + Cloudflare Tunnel) + domain/subdomain
- ⬜ 15.9 Backups, restore drill, monitoring, uptime check, Sentry
- ⬜ 15.10 Demo seed data (hostels, PGs, messes, residents), user guides per role, owner handbook
- ⬜ 15.11 Pilot launch in one area; seed ≥ 30 listings; feedback loop; bug triage

---

## Backlog / Ideas (not counted)

- Monetization: featured listings, lead packs, owner subscriptions, mess ad slots, booking commission (via UPI to Dormio)
- Police/authority tenant-verification export (after legal advice)
- Face-recognition gate entry (legal review + explicit consent)
- Voice complaints (Whisper), roommate matching AI
- Mess inventory and vendor management
- Laundry/gym/common-room booking, parcel tracking
- Native app wrapper (Capacitor) if PWA limits are hit
- WhatsApp/SMS adapters; Hindi/Marathi locales
- Payment-gateway adapter (Razorpay/Cashfree)
- Self-hosted Photon geocoder / vector tiles

---

## Task Writing Template

```
### Task X.Y — Title
Goal: …
Acceptance criteria:
- [ ] …
UI Gate required: yes/no (page spec path)
Dependencies: …
Touches: apps/api/modules/…, apps/web/features/…
Tests required: …
```

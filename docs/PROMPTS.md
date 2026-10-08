# PROMPTS — copy/paste into Antigravity

Order for a fresh start: **P-00 → P-01 → P-02 → P-10 (Phase 1) → P-11 (Phase 2) → …** Use **P-03** any day to continue. Replace nothing unless a `<placeholder>` appears.

| ID | Purpose |
|---|---|
| P-00 | Kickoff (once) |
| P-01 | Verify tooling |
| P-02 | Generate the design system with UI UX Pro Max |
| P-03 | Daily "continue" |
| P-04 | Page-by-page UI briefs (marketplace, owner, resident, guard…) |
| P-05 | Review and ship a PR |
| P-06 | UI redo (when it looks generic, boxed or misaligned) |
| P-07 | Deploy |
| P-08 | Resume after a crash / new chat |
| P-09 | Unstick + safe autonomous loop |
| P-10 … P-24 | Phase 1 … Phase 15 prompts |

---

## P-00 Kickoff (paste once)
```
You are the lead engineer building Dormio, a marketplace to find hostels, PGs and messes by area, plus a stay/subscription manager for residents and an operator console for owners and institutions. I will interact with you as little as possible, so be self-sufficient and honest.

The project is JavaScript only (ES modules + JSX); never create TypeScript files.

Read in this order and fully: AGENTS.md, docs/memory.md, docs/task.md, docs/PRD.md, docs/architecture.md, docs/rules.md, docs/Design.md, docs/BOOTSTRAP.md.

Then:
1. Check that the tooling in docs/BOOTSTRAP.md is installed: Get Shit Done, UI UX Pro Max (.agents/skills/ui-ux-pro-max with a working scripts/search.py), Graphify, Playwright MCP, Context7 MCP. Report anything missing with exact fix steps for me.
2. Run `graphify .` (or /graphify .) to build the knowledge graph, then `graphify hook install`.
3. Summarize back to me in 15 lines: the product, the three experiences (marketplace, stay manager, operator console), the UI Gate rule, the autonomy rules, and the first three tasks you will do.
4. Do NOT write any application code yet. Wait for my next prompt (P-02 or a phase prompt).
```

## P-01 Verify tooling
```
Verify every tool required by AGENTS.md works. Show real command output for each:
- `ls .agents/skills/` and `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "marketplace housing" --domain style`
- `graphify --version` and `graphify query "what files exist?"`
- Get Shit Done is available (show how to invoke it)
- Playwright MCP can open https://example.com and take a screenshot
- Context7 MCP can fetch docs for "next.js app router"
- `docker compose ps` shows postgres, valkey, minio, mailpit healthy; and `psql` confirms extensions postgis, vector, pg_trgm exist
Fix what you can. For anything that needs me, give numbered exact steps. Do not continue to other work until everything passes or I have been told what to do.
```

## P-02 Generate the design system (UI UX Pro Max)
```
Run the UI Gate step 0 and 1 from docs/Design.md §2 and generate the Dormio design system. Do NOT write app code.

1. Generate the master:
   python3 .agents/skills/ui-ux-pro-max/scripts/search.py "marketplace accommodation hostel PG mess student housing local discovery warm friendly trustworthy image-rich" --design-system --persist -p "Dormio"
2. Compare 3 style alternatives with `--domain style`, colors with `--domain color`, typography with `--domain typography`. Reject anything that violates docs/Design.md §3 (no gradients, no black, no dark theme, no glassmorphism/neon/AI purple, no boxed-card-only look). Prefer warm, light, colorful, image-led, flat, editorial with distinct hues per module (Hostel/PG, Mess, Payments, Security, Community, AI).
3. Do not use any palette or fonts from your own memory. Use only what the skill returned. Write the final result into design-system/dormio/MASTER.md including a "Selection rationale" (why this style/palette/fonts fit the brief and satisfy the bans), and: tokens (colors, spacing 4-px scale, radius, elevation), type scale and fonts, icon family, shape language (the Arch), component rules, motion, accessibility rules, and an explicit "Do / Don't" list.
4. Create page specs (docs/Design.md §2 step 2) in design-system/dormio/pages/ for: home, search, listing-detail, mess-detail, owner-wizard, my-stay, rent-ledger, guard-screen, owner-dashboard. Each page spec needs a `## UI UX Pro Max evidence` section with real recorded commands, and neighbouring pages must use different compositions as chosen via the skill.
5. Show me a one-screen summary of the palette, fonts, and the pattern chosen for each page. Update docs/memory.md (decision D11 stays; add the chosen style names) and tick task 2.1 and 2.2 in docs/task.md only if fully done.
```

## P-03 Daily "continue"
```
/next-task
```
(If your Antigravity does not show workflows, paste: "Follow .agents/workflows/next-task.md exactly.")

## P-04 Page-by-page UI briefs
Use after the design system exists. Paste one at a time. These briefs describe **what the page must do and contain**. They deliberately say nothing about how it looks: **layout, composition, colors, type, spacing, icons, charts and states are decided only by the UI UX Pro Max skill** (use the keywords given as query input).

**Common footer for every page prompt below (always paste it too):**
```
Follow /build-ui exactly. You have NO design opinions: every visible decision must come from UI UX Pro Max output, with the exact commands and chosen results recorded in design-system/dormio/pages/<name>.md. Undecided detail = another skill query, never your own choice. Neighbouring pages must differ in composition (as chosen via the skill). Real copy and imagery; build all states. First line of page.jsx/layout.jsx: // ui-spec: <spec path>. Register new components in COMPONENTS.md. Verify with Playwright screenshots at 360/768/1280 and review them. Run scripts/check-ui-rules.sh and scripts/check-ui-provenance.sh. No gradients, no black, no dark theme, no white-page-of-identical-boxes. Report evidence.
```

**P-04a Home** (`/`) — Function: area search ("Where do you want to stay or eat?") with Hostel/PG/Mess switch and near-me; popular areas; how Dormio works for seekers; what residents can do after booking (rent, complaints, QR pass, mess); owner call-to-action ("List your hostel, PG or mess free"); trust signals (verified owners, verified-stay reviews). Query keywords: *marketplace landing hero search accommodation food local discovery trust*.

**P-04b Search results** (`/search`) — Function: filters (kind, rent, gender, sharing, food, amenities, rating, verified, available-from, CCTV-monitored), sort, results as listing cards (hostel/PG variant and mess variant), map with price pins and clustering, mobile list/map switch. Keywords: *search filters map listing cards marketplace*.

**P-04c Listing detail, hostel/PG** (`/[kind]/[slug]`) — Function: photo gallery, room types with rent and deposit, availability + freshness, amenities, safety (CCTV-monitored badge only if enabled, guard, curfew), rules, map and nearby places, rating breakdown and verified-stay reviews, owner info, Book and Enquire actions (always reachable on mobile). Keywords: *listing detail gallery booking panel reviews rating breakdown*.

**P-04d Mess detail** — Function: sample weekly menu by day and meal with veg/non-veg marks, timings, plans and prices, trial meal, hygiene info, service area, reviews. Keywords: *restaurant menu food plans subscription reviews*.

**P-04e Owner listing wizard** (`/owner/listings/new`) — Function: type (Hostel/PG/Mess), basics, location pin, photos, rooms and rent, amenities and rules, UPI ID and optional features (mess link, CCTV, visitors), review and submit, with a live preview of how the listing will look. Plain language, large touch targets. Keywords: *multi-step form wizard preview onboarding non-technical users*.

**P-04f My Stay hub** (`/stay/[propertyId]`) — Function: switch between multiple stays/subscriptions; rent due with Pay; latest notices; open complaints; today's mess menu; gate-pass QR shortcut; property rules. Keywords: *resident dashboard account hub mobile bottom navigation*.

**P-04g Rent ledger and UPI pay** (`/stay/[propertyId]/rent`) — Function: monthly statement with running balance and status, UPI QR + "Pay with UPI app" link, UTR entry, receipt download. Keywords: *invoice ledger payment statement receipt status*.

**P-04h Notices and circulars** — Function: notice list with priority and audience, emergency notice at top, attachments, acknowledge for circulars. Keywords: *notice board announcements priority acknowledge*.

**P-04i Complaints** — Function: create with photos and category, list, detail with status history, comments, SLA countdown, feedback and reopen. Keywords: *ticket tracking timeline status feedback*.

**P-04j Guard screen** (`/guard`) — Function: scan button, instant allowed/blocked/late result with photo, name, room and reason, recent log, visitor and incident buttons, offline queue indicator; large type, one-handed use. Keywords: *kiosk scanner full-screen status high contrast*.

**P-04k Owner dashboard** (`/manage/[propertyId]/overview`) — Function: occupancy, rent collected/due, leads, complaints, prioritized actions (verify payments, approve bookings, SLA breaches), occupancy board, data table. Keywords: *admin dashboard KPI action queue data table charts*.

**P-04l AI concierge and assistant** — Function: public search concierge (plain-language request → filters and ranked results) and logged-in resident assistant; streamed answers, result cards, confirmation card for any write action (Confirm/Edit/Cancel), sources, AI label. Keywords: *chat assistant confirmation card ai disclosure*.

## P-05 Review and ship a PR
```
Run /review. Then open a PR with a clear description (what, why, how tested, screenshots for UI). Wait for CodeRabbit, fix every valid comment, re-run checks (pnpm lint, test, build, check-no-typescript.sh, scripts/check-ui-rules.sh), merge when green. Update docs/task.md and docs/memory.md (/end-session).
```

## P-06 UI redo (use when a page looks generic, boxed, or misaligned)
```
The page <route or name> looks generic/boxed/misaligned. Do not patch it. Redo it properly:
1. Re-run the UI Gate from scratch: UI UX Pro Max research for this page (design-system --page, --domain ux, --domain style, --stack nextjs), re-read design-system/dormio/MASTER.md and docs/Design.md §3, §4, §6.
2. Rewrite design-system/dormio/pages/<name>.md from the new skill results: a composition different from the current one (as chosen by the skill), a signature element taken from the skill output, layout sketches for 360/768/1280, and a complete UI UX Pro Max evidence section.
3. Rebuild the page using only MASTER.md tokens and the new spec. Check: purposeful color areas and imagery instead of a white canvas of boxes; consistent grid and the spacing scale from MASTER.md; aligned edges and baselines; one clear primary action; no gradients, no black. Any choice not in the spec = another skill query.
4. Take Playwright screenshots at 360/768/1280, open them, list every defect you see, fix, re-shoot (max 3 rounds). Show me the before/after summary.
```

## P-07 Deploy (task 15.7–15.9)
```
Prepare and execute free online deployment. Read docs/architecture.md §2 (hosting) and §6.
1. Write production Docker Compose (api, web, postgres, valkey, minio, caddy), Caddyfile, and a hardened env template.
2. Write step-by-step instructions for me for BOTH options: (A) Oracle Cloud Always Free VM, (B) a spare PC/college server with Cloudflare Tunnel. Include every account/signup/click I must do, and what to paste back to you.
3. Add backup (pg_dump cron to object storage), restore drill script, uptime check, and Sentry (optional).
4. Do not do anything that needs my accounts/secrets yourself: stop and ask with exact steps.
5. Do not use Vercel Hobby (commercial use).
```

## P-08 Resume (new chat, crash, or context lost)
```
/resume
```
(Or: "Read AGENTS.md, docs/memory.md, docs/task.md; run git status and git log -5; run the checks; report the real state in 5 lines; then continue the 🔄 task.")

## P-09 Unstick + safe autonomous loop
```
You are stuck or repeating the same failing approach. Stop. In 10 lines: what you tried, the exact error, your 3 best hypotheses. Use `graphify query`/`graphify path` and Context7 docs to verify assumptions. Choose the simplest fix; write a failing test first if it is a bug. If it needs me (secret, account, legal, paid), ask with exact steps and switch to another task.

Autonomous loop rule (Ralph-style): allowed only when success is machine-checkable (tests, type-check, lint, check-ui-rules) and with max 5 iterations. Never loop on auth, payments, RLS, or migrations without showing me the diff first.
```

---

## Phase prompts (P-10 … P-24)
All phase prompts start with this line (already included below as "Preamble"): *Read AGENTS.md, docs/memory.md, docs/task.md. Use Get Shit Done to plan, then execute with /build-phase.*

**P-10 Phase 1: Project setup & agent tooling**
```
Preamble: read AGENTS.md, docs/memory.md, docs/task.md. Run /build-phase for Phase 1 (tasks 1.1–1.10) using Get Shit Done for planning.
Scaffold exactly per docs/architecture.md §3: pnpm + Turborepo monorepo; apps/web = React via Next.js App Router (JavaScript + JSX, NO TypeScript; Tailwind, shadcn/ui, route groups (marketplace) (auth) (account) (stay) (owner) (manage) (guard) (admin), /api rewrite to Express); apps/api = Node.js + Express 5 in JavaScript ES modules (app.js/server.js, middleware folder with the fixed order requestId → rateLimit → auth → scope → policies → feature → validate, central error middleware, pino, /health, OpenAPI from Zod); packages/shared (Zod schemas, enums, JSDoc typedefs, permission matrix) and packages/config. Database: Drizzle ORM + drizzle-kit on the PostGIS+pgvector Postgres from docker-compose; first migration with User, Organization, Property, Listing; prove geometry and vector columns work. Zod env validation. ESLint/Prettier, Husky, lint-staged, commitlint. Make .github/workflows/ci.yml pass. Use Context7 for current Next.js/Express/Drizzle docs. NO UI design work yet (no styling beyond what is needed to boot). Finish with the DoD checks and /end-session.
```
**P-11 Phase 2: UI foundation (UI UX Pro Max)**
```
Run /build-phase for Phase 2 (2.1–2.9). If P-02 was not done, do it first. Implement tokens from design-system/dormio/MASTER.md into Tailwind, fonts via next/font, shadcn as unstyled structure fully restyled, app shells, shared components (ListingCard both variants, FilterBar, Gallery, RatingBreakdown, TrustBadges, MapView, DataTable, KpiStrip, chips, empty/error/skeleton, FileUpload), and /dev/components showcase with Playwright baselines. Every component follows /build-ui. Enforce scripts/check-ui-rules.sh in CI and add axe. Show me screenshots of the showcase page.
```
**P-12 Phase 3: Auth, accounts, access control**
```
Run /build-phase for Phase 3 (3.1–3.9). JWT (jose) with rotating refresh tokens in httpOnly same-origin cookies, argon2id, email verify/reset (Mailpit in dev), platform roles + org roles + property roles via property_members, CASL policies as Express middleware (auth → scope → policies → feature), scoped repository helpers + Postgres RLS via SET LOCAL, isolation tests AND public-leak tests, KYC upload with signed URLs, invites, audit log, rate limiting/Helmet/CSRF. Auth pages go through /build-ui. Security-critical: show me the diff summary before merging.
```
**P-13 Phase 4: Owner onboarding & listings**
```
Run /build-phase for Phase 4 (4.1–4.11). Data model for Property (HOSTEL/PG/MESS), Listing, Unit/Room/Bed, Media, Amenity, Rule, CurfewRule, NearbyPlace, property_features. "Become an owner" flow (individual/business/institution, KYC, UPI ID), listing wizard with live preview (P-04e), availability management, media pipeline (WebP, thumbnails, reorder), location pin + cached geocoding + places seed, publish workflow (draft → pending → approved), admin verification queue, feature-flag UI, institution workspace (hidden listing, CSV resident import), freshness nudges. Seed 3 demo areas with realistic data. UI via /build-ui.
```
**P-14 Phase 5: Marketplace discovery (Alpha)**
```
Run /build-phase for Phase 5 (5.1–5.12). listing_public DTO/view; PostGIS search API with filters/sort/pagination; area autocomplete; Home (P-04a), Search (P-04b), Detail (P-04c); map with clustering; compare; saved; SEO (area pages, sitemap, JSON-LD, OG images, ISR); enquiry with login-to-reveal contact + owner lead inbox; visit requests; caching and indexes; load check at 500 listings. Public-leak tests are mandatory. Every page via /build-ui with a different composition pattern. At the end, run the Alpha acceptance: a guest can search an area, open a listing, enquire after login; an owner can list and be approved.
```
**P-15 Phase 6: Mess marketplace & management**
```
Run /build-phase for Phase 6 (6.1–6.12). Mess as a Property (standalone or linked), mess wizard, discovery + detail (P-04d), weekly menu, plans/subscriptions via UPI flow, QR coupons, meal scan with duplicate prevention, skip-meal rebates, mess billing, feedback, dashboard, and linking a mess to a hostel/PG so residents subscribe from My Stay. UI via /build-ui.
```
**P-16 Phase 7: Booking & stay lifecycle**
```
Run /build-phase for Phase 7 (7.1–7.9). Booking request, owner approve/waitlist/reject, token payment through the UPI flow, bed allotment + agreement PDF, check-in, My Stay hub (P-04f), transfer/vacate/deposit refund, cancellation policy, history. Transactions and idempotency keys for booking/allotment. Isolation tests for every endpoint.
```
**P-17 Phase 8: Rent & payments (UPI-direct)**
```
Run /build-phase for Phase 8 (8.1–8.9). Recurring invoices, per-owner UPI ID, QR + upi:// deep link generation, UTR submission with unique(property_id, utr), staff verification queue, offline payments, PDF receipts, reminders (BullMQ), late-fee engine with unit tests, append-only ledger, bank-statement CSV import with auto-match, reports. Ledger UI via P-04g. NEVER mark a payment paid from a screenshot or resident claim alone. Show me the diff summary of payment logic before merge.
```
**P-18 Phase 9: Communication & complaints**
```
Run /build-phase for Phase 9 (9.1–9.10). Notices (P-04h), circulars with acknowledgment, notification service (in-app + email, preferences, retries), emergency alerts (SSE + banner), complaints (P-04i) with SLA/escalation, maintenance view, feedback/reopen, outpass with guardian approval, visitor pre-registration. All via /build-ui.
```
**P-19 Phase 10: Security, entry/exit & CCTV**
```
Run /build-phase for Phase 10 (10.1–10.11; skip 🅿 items). Rotating signed QR gate scans with offline queue and idempotency, curfew/late flags, visitors, guardian alerts, guard screen (P-04j), CCTV as an optional feature flag with camera registry and "CCTV-monitored" listing badge, edge connector flow with signed short-lived stream URLs and view audit log, incidents/theft reporting. CCTV feeds are never public; store no video. Ask me before any face/biometric idea.
```
**P-20 Phase 11: Reviews, ratings & trust**
```
Run /build-phase for Phase 11 (11.1–11.7; skip 🅿). Verified reviews that must reference a real Booking or MessSubscription (DB-enforced), rating dimensions for stays and messes, owner replies, Bayesian aggregates wired into search ranking and cards, report/moderation queue, verified badges, spam/rate-limit/contact-masking controls. UI via /build-ui. Add public-leak and abuse tests.
```
**P-21 Phase 12: Dashboards, analytics & reports**
```
Run /build-phase for Phase 12 (12.1–12.6). Owner dashboard (P-04k), manager dashboard, institution dashboard, platform admin dashboard, guardian portal, exports. Use UI UX Pro Max chart guidance (--domain chart). Different composition patterns per dashboard; module colors per Design.md.
```
**P-22 Phase 13: AI layer**
```
Run /build-phase for Phase 13 (13.1–13.12; skip 🅿). AI Gateway (Ollama, optional Gemini/Groq for non-personal content only), pgvector RAG per property, resident assistant, AI search concierge (public tools only: searchListings, compareListings), agentic tools with RBAC + explicit confirmation, complaint triage, owner listing assistant, review summaries, Promptfoo evals + prompt-injection tests + AiAction audit log. Chat UI per P-04l. Benchmark the local model first (task 13.1) and tell me the result and recommendation.
```
**P-23 Phase 14: PWA, push, performance**
```
Run /build-phase for Phase 14 (14.1–14.4). PWA manifest + service worker (Serwist), web push (VAPID), offline-safe guard queue and cached QR/menu/notices, Lighthouse budgets (LCP < 2.5s on 4G for home/search/detail), image and bundle optimization.
```
**P-24 Phase 15: Testing, hardening & launch**
```
Run /build-phase for Phase 15 (15.1–15.11). Unit/integration/E2E (search → book → pay → My Stay; owner list → approve; complaint; gate scan; mess scan), isolation + public-leak suites for every module, OWASP review, DPDP pass (consent, retention jobs, export/delete, privacy policy, terms), k6 load test, then deployment via P-07, backups/monitoring, demo seed data, role guides, and pilot launch checklist (≥ 30 seeded listings in one area). Tell me every account or decision you need from me in one list.
```

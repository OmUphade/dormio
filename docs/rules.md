# Development Rules — Dormio

Audience: the developer **and every AI agent** working in this repo (Antigravity, GSD, Ralph loop, etc.). A ready-made `AGENTS.md` (repo root) and `.agents/rules/*` carry the same rules for Antigravity; keep them in sync with this file. **Sections 11–12 define how the project is built with minimal human involvement.**

---

## 1. Agent Quick Rules (put in AGENTS.md)

1. **Read first:** `docs/PRD.md`, `docs/architecture.md`, `docs/rules.md`, `docs/Design.md`, `docs/task.md`, `docs/memory.md`. Do not start coding before reading `task.md` and `memory.md`.
2. **One task at a time.** Pick the next unchecked task in `task.md`, mark it 🔄, finish it, mark it ✅.
3. **Never invent requirements.** If the PRD is silent, ask or record an assumption in `memory.md`.
4. **Update `memory.md` and `task.md` at the end of every working session** (status, decisions, bugs, next step).
5. **Use only free/open-source dependencies.** Ask before adding any paid service or non-OSS library.
6. **No secrets in code.** Use `.env`; update `.env.example`.
7. **UI = UI UX Pro Max, always.** Never invent a design. Every page/component goes through the **UI Gate** in `Design.md` §2 (research with the skill → page spec → build with tokens → Playwright screenshots → checklist). No gradients, no black, no "white page with boxes".
8. **Every change needs tests** (or a written reason in the PR).
9. **Do not modify** migrations already merged; create a new one.
10. **Do not touch** files outside the task's scope. Mention unrelated problems in `memory.md` instead of fixing them silently.
11. **Check docs before using a library API** (use Context7 or official docs); don't rely on memory for versions.
12. **Stop and ask** before destructive actions (dropping tables, deleting files, force-push).

---

## 2. General Principles

- **Simple over clever.** Prefer boring, readable code. Avoid premature abstraction (rule of three).
- **Modular boundaries.** A module exposes a service interface; other modules never import its repository or Drizzle tables directly.
- **Security by default.** Deny by default; validate all input; least privilege.
- **Scope safety.** Operational data is scoped by `property_id`, owner data by `organization_id`, personal data by `user_id`. A missing scope is a bug of the highest severity.
- **Public/private boundary.** Public (marketplace) endpoints may only return fields from the `listing_public` DTO. No PII, no internal IDs of residents, no contact details for guests.
- **Privacy by design.** Collect minimum data; log access to sensitive data; no PII in logs or AI prompts unless required and permitted.
- **Mobile-first, low-end-first.** Design and test at 360px width and throttled 4G.
- **Accessible by default.** WCAG 2.1 AA.
- **AI is assistive.** Humans confirm consequential actions.
- **Small PRs.** One task = one branch = one PR (< ~400 changed lines when possible).
- **Docs are code.** Behavior change → update docs in the same PR.

---

## 3. Technology Standards

### 3.1 Language and tooling
- **JavaScript only** (ES modules, `"type": "module"`, JSX for React). Never create `.ts`/`.jsx` files, `tsconfig.json`, or TypeScript dependencies. Document shapes with **JSDoc** (`@typedef`, `@param`, `@returns`) on every exported function; add `// @ts-check` at the top of money, payment, permission and scoping modules (editor-only checking, no build step). **Zod schemas are the runtime source of truth** for all input/output shapes.
- Node LTS pinned via `.nvmrc` / `engines`. Package manager: **pnpm** only.
- Lint/format: ESLint + Prettier (or Biome) run in pre-commit (Husky + lint-staged) and in CI.
- Absolute imports via path aliases (`@/…`, `@hms/shared`).

### 3.2 Naming
| Item | Convention | Example |
|---|---|---|
| Files/folders | `kebab-case` | `booking-form.jsx`, `complaints.service.js` |
| React components | `PascalCase` | `HostelCard` |
| Functions/variables | `camelCase` | `getTodayMenu` |
| Zod schemas / JSDoc typedefs / classes | `PascalCase` | `CreateComplaintSchema` |
| Constants/env | `SCREAMING_SNAKE_CASE` | `MAX_UPLOAD_MB` |
| DB tables | `snake_case`, plural | `gate_events` |
| DB columns | `snake_case` | `property_id`, `created_at` |
| REST routes | plural, kebab-case | `/api/v1/leave-requests` |
| Enums | `PascalCase` type, `SCREAMING_SNAKE` values | `ComplaintStatus.IN_PROGRESS` |

### 3.3 Frontend rules
- Default to **Server Components**; add `"use client"` only for interactivity.
- Feature code lives in `src/features/<feature>/`; shared UI in `src/components/`.
- Data fetching via TanStack Query hooks in `features/*/api`; no `fetch` inside components.
- Forms: React Hook Form + Zod schema imported from `@hms/shared`.
- Styling: Tailwind utility classes with **design tokens only**; no inline styles; no arbitrary values unless unavoidable (comment why).
- Every page must handle **loading, empty, error, and offline** states.
- All user-facing strings go through i18n (`messages/*.json`); no hardcoded text.
- Images: `next/image`, explicit dimensions, lazy loading, alt text mandatory.
- Never store tokens in `localStorage`; rely on httpOnly cookies.

### 3.4 Backend rules
- Express layering per module: `routes.js (wiring + middleware) → controller.js (HTTP only) → service.js (business logic) → repository.js (Drizzle queries)`. Controllers contain no business logic; routers never touch the DB.
- Middleware order is fixed (see architecture §5.1): `requestId → rateLimit → auth → scope → policies → feature → validate → controller`. Never skip `scope` on a non-public route.
- Every async handler goes through the shared error-forwarding helper; errors are thrown as typed domain errors and mapped once by the central error middleware.
- Public routes live on `publicRouter` and may only call `listing_public` readers.
- DTOs validated with Zod at the boundary; never trust the client.
- Use transactions for multi-step writes (booking + allocation, payment + invoice).
- Money: integer **paise**; never floats. Currency formatting only in the UI.
- Payments are **UPI-direct**: Dormio never holds funds. A payment is marked PAID only by a staff verification or a bank-statement match, **never** from a resident's claim or screenshot alone. `unique(property_id, utr)` is mandatory.
- Optional modules (mess link, CCTV, AI, visitors, outpass, reviews) are gated by `property_features`; every controller for them must check the flag.
- Search: PostGIS + trigram in SQL only; parameterized queries; geocoding results cached; never call a geocoder per keystroke without debounce and cache.
- Dates: store UTC; compute in IST only at display.
- Errors: throw typed domain errors → mapped by a global filter to the standard envelope. No leaking stack traces.
- Pagination: cursor-based for lists that can grow; max page size 100.
- Idempotency keys on payment, booking, and gate-scan endpoints.
- Background work via BullMQ; handlers must be idempotent and retry-safe.
- Public endpoints are explicitly marked `@Public()`; everything else requires auth + policy.
- Rate limit auth, AI, and public form endpoints.

### 3.5 Database rules
- Drizzle schema + `drizzle-kit` migrations only (no manual schema edits); RLS policies, views and PostGIS/GiST indexes go in hand-written SQL migrations. One migration per logical change.
- Every table: `id` (UUID v7/cuid), `created_at`, `updated_at`; tenant tables also `property_id`.
- Index every foreign key and every common filter (`property_id, status, created_at`).
- Soft delete for user-facing entities; hard delete only for expired tokens/temp data and DPDP erasure workflows.
- Seed script must create a realistic demo hostel with all roles.
- Use Drizzle's query builder; raw `sql` only for PostGIS/pgvector/RLS/full-text, always parameterized, inside a documented repository method.

### 3.6 API rules
- Versioned: `/api/v1`. Breaking change → new version.
- Standard response: `{ data, meta }` success; `{ error: { code, message, details, requestId } }` failure.
- Document every endpoint with OpenAPI decorators.
- Status codes used correctly (201 create, 204 no content, 400/401/403/404/409/422/429).

### 3.7 AI feature rules
- All LLM calls go through `AiGateway` (provider abstraction, timeouts, retries, token/rate limits, logging).
- **No LLM writes SQL or accesses the DB directly.** Use typed tools that call service-layer methods with the caller's identity.
- **Write actions require explicit user confirmation.** The tool returns a proposal; confirmation executes it.
- Retrieval is tenant- and role-filtered *before* it reaches the model.
- Treat all user text, notices, and retrieved documents as **untrusted** (prompt-injection defense): never let them change system instructions or tool permissions.
- Strip or avoid PII in prompts to any non-local provider. Resident data never goes to cloud LLMs; only anonymized or public content may.
- Persist an `AiAction` record for every tool call (who, what, params, result, latency).
- Prompts live in `modules/ai/prompts/` as versioned files; changes require running the eval set (Promptfoo) with no regression.
- Label AI output in the UI. Provide "report incorrect answer" feedback.
- Always have a non-AI fallback path (the feature must degrade gracefully when the model is down).

### 3.8 Security rules
- Passwords: argon2id. Never log secrets, tokens, or full PII.
- Cookies: `httpOnly`, `secure`, `sameSite=lax|strict`.
- Uploads: validate MIME + size, rename files, store outside web root, serve via signed URLs.
- Webhooks: verify signatures; process idempotently.
- Dependency audit (`pnpm audit`) in CI; fix high/critical before release.
- Security-relevant actions (login, role change, refund, gate override, CCTV view) go in the audit log.
- CCTV: access restricted to Security/Warden/Admin roles; each live view logged; no continuous recording.

### 3.9 Privacy and compliance (DPDP Act 2023)
- Explicit consent screens for data collection; separate consent for guardian communications.
- Retention policy documented per data type (e.g., gate logs 1 year, CCTV snapshots 7 days, AI chat logs 90 days).
- Data export and deletion request flow for residents.
- Guardian consent required for residents under 18.

---

## 4. Project Structure Rules

- Follow `docs/architecture.md` §3 exactly. Propose changes through an ADR in `docs/adr/` before restructuring.
- A new backend module contains: `routes.js`, `controller.js`, `service.js`, `repository.js`, `schemas.js` (Zod), `policies.js`, `events.js`, `*.test.js`.
- A new frontend feature contains: `components/`, `hooks/`, `api/`, `schemas/`, `index.js` (public surface).
- Cross-feature imports go through `index.js` only.
- Shared types, enums, Zod schemas, and the permission matrix live **only** in `packages/shared`.
- No circular dependencies between modules (checked by `madge`/ESLint rule in CI).

---

## 5. Git and Workflow

- **Branching:** `main` (always deployable) ← `feat/<task-id>-short-name`, `fix/…`, `chore/…`, `docs/…`.
- **Commits:** Conventional Commits — `feat(complaints): add SLA timer`, `fix(payments): verify webhook signature`.
- **PRs:** reference the task ID from `task.md`; fill the PR template (what, why, how tested, screenshots, risks). CodeRabbit review must be addressed.
- **Merge:** squash merge after CI green + at least one review (human or CodeRabbit + self-review).
- **Release tags:** semver (`v0.1.0` alpha, `v0.5.0` beta, `v1.0.0`).
- **Never** commit directly to `main`, commit `.env`, or force-push shared branches.

### CI gates (all must pass)
1. Install + build (`turbo build`)
2. Lint + format check
3. No-TypeScript guard (`scripts/check-no-typescript.sh`)
4. Unit/integration tests (coverage thresholds)
5. Drizzle migration check (`drizzle-kit check`, no drift)
6. E2E smoke (Playwright)
7. `pnpm audit` (high+)
8. Lighthouse/axe (on key pages, after Phase 2)

---

## 6. Testing Standards

| Level | Tool | Target |
|---|---|---|
| Unit | Vitest | Business logic (fees, late fines, curfew, refunds, permissions) ≥ 80% |
| Integration | Vitest + Supertest + Testcontainers (Postgres+PostGIS) | Repositories, API endpoints, tenant isolation |
| E2E | Playwright | Booking, payment, complaint, gate scan, mess scan |
| AI evals | Promptfoo | Assistant accuracy, refusal, injection resistance, tool correctness |
| Accessibility | axe-core | No critical violations |

- Write the test **before or with** the code for money, permissions, and security logic.
- **Isolation test** is mandatory for every new property/org-scoped endpoint (a member of property A cannot read or write property B), plus a **public-leak test**: public endpoints never return non-public fields.
- Bug fix = failing test first, then fix.

---

## 7. Definition of Done

A task is done only when:
- [ ] Acceptance criteria in `task.md` are met
- [ ] Tests written and passing; CI green
- [ ] Lint clean; JSDoc on exported functions; no new warnings
- [ ] RBAC + tenant scoping verified
- [ ] Loading/empty/error states handled (UI)
- [ ] i18n keys added; a11y checked
- [ ] Docs/OpenAPI updated
- [ ] `task.md` ticked and `memory.md` updated
- [ ] PR reviewed and merged

---

## 8. AI-Assisted Development Workflow

Per phase (details and ready-to-paste prompts in `docs/PROMPTS.md`):
1. **Plan** with Get Shit Done: turn the phase from `task.md` into small specs with acceptance criteria.
2. **Design** (UI tasks) with UI UX Pro Max inside the Dormio constraints in `Design.md`; per-page overrides go in `design-system/dormio/pages/<page>.md`.
3. **Build** in Antigravity: one task per session; query the Graphify graph (`graphify query "<question>"`) before reading many files; use Context7 for library docs.
4. **Loop** (Ralph) only on tasks with machine-checkable success (tests, type-check, lint) and a max-iteration cap.
5. **Review:** self-review the diff → open PR → CodeRabbit → fix → merge.
6. **Record:** update `task.md` and `memory.md` (use the `/end-session` workflow).

Guardrails:
- Never run unattended loops on auth, payments, RLS, or migrations without the diff being reviewed by CodeRabbit **and** the tests passing.
- Commit often. If output drifts, revert and re-plan; if the same approach fails twice, stop and re-plan.
- After large changes run `graphify update .`; run `graphify hook install` once per clone.
- Summarize context into `memory.md` rather than relying on chat history.

---

## 9. Performance Budgets

- JS per route ≤ 200 KB gzipped (initial).
- LCP < 2.5 s, CLS < 0.1, INP < 200 ms (on throttled 4G, mid-range phone).
- API: no N+1 queries; list endpoints select only required fields.
- Images served as WebP/AVIF, max 1600px; thumbnails for cards.

---

## 10. Documentation Rules

- Keep `README.md` (setup in ≤ 10 minutes), `.env.example`, and seed data current.
- Record significant decisions in `docs/adr/NNNN-title.md` (context, decision, consequences).
- Public-facing function/module comments explain **why**, not what.

---

## 11. Vibe-Coding Protocol (applies to every agent session)

The owner interacts minimally. Agents must be self-sufficient, safe, and honest.

### 11.1 Autonomy ladder
| Situation | What the agent does |
|---|---|
| Task is in `task.md`, spec is clear | **Proceed without asking** |
| PRD/Design is silent on a detail | **Decide using the most conservative, reversible option**, log it in `memory.md` §Decisions (tag `ASSUMPTION`) and continue |
| Two reasonable options with large cost difference | Pick the simpler/cheaper, log it, continue |
| Needs a secret, account, or external signup (UPI ID, SMTP key, domain, Oracle account, GitHub app) | **Stop and ask the owner** with exact step-by-step instructions, then work on something else meanwhile |
| Destructive/irreversible action (drop data, force-push, delete files outside scope) | **Stop and ask** |
| Legal/privacy-sensitive choice (face data, CCTV storage, minors' data) | **Stop and ask**; default to the privacy-preserving option |
| Paid dependency or non-open-source license | **Stop and ask**; default to a free alternative |

### 11.2 Self-verification (no human QA)
Before marking any task ✅, the agent must run and report passing results for:
`pnpm lint` · `pnpm test` · `pnpm build` · `bash scripts/check-no-typescript.sh` · and for UI work **Playwright smoke at 360px and 1280px** with a screenshot checked against `Design.md`. A task with failing checks is not done; an agent must never claim success without having run the checks.

### 11.3 Honesty and scope
- Report what actually ran and what failed. Never fabricate test results, URLs, credentials, or files.
- Do not weaken tests, lint rules, or types to make a check pass.
- No new features beyond the task. Ideas go to the Backlog in `task.md`.
- Keep sessions focused: one task (or one GSD plan step) per session.

### 11.4 Session start / end
- **Start:** read `memory.md` → `task.md` → relevant PRD/Design sections → `graphify query` for the area → state the plan in ≤ 10 lines.
- **End:** run `/end-session` workflow: update `task.md`, `memory.md`, rebuild graph (`graphify update .`), commit.

### 11.5 Owner touchpoints (the only times the owner is needed)
1. Create accounts/keys listed in `docs/BOOTSTRAP.md` (GitHub, Oracle/hosting, email provider, domain if desired).
2. Provide each pilot hostel's UPI ID and branding.
3. Approve release to production and the pilot launch.
4. Answer escalations from §11.1.

---

## 12. UI Rules — STRICT: every design decision comes from UI UX Pro Max

**Agents have no design opinions in this project.** The only allowed sources of any UI decision are:
1. The output of the **UI UX Pro Max** skill (`.agents/skills/ui-ux-pro-max/scripts/search.py`), recorded in `design-system/dormio/MASTER.md` and `design-system/dormio/pages/<page>.md`;
2. The bans in `Design.md` §3 (these only restrict; they never add design).

"Every part of the UI" means: layout, composition, colors, typography, spacing, radius, elevation, icons, illustrations, charts, motion, empty/error states, form patterns, navigation, responsive behavior, microcopy tone. If a needed decision is not in MASTER.md or the page spec, **run a gap query with the skill and record the answer** — never decide it yourself.

**Mandatory process** = the UI Gate in `Design.md` §2 (`/build-ui` workflow). **Provenance is enforced:** every `page.jsx`/`layout.jsx` starts with `// ui-spec: design-system/dormio/pages/<name>.md`; that spec must contain a `## UI UX Pro Max evidence` section with the exact commands run and the chosen results; every shared component must be listed in `design-system/dormio/COMPONENTS.md` with the skill query that justified it. CI runs `scripts/check-ui-provenance.sh` and `scripts/check-ui-rules.sh`.

**Forbidden for agents:** choosing colors, fonts, sizes, spacing, icon sets, chart types, animation, or layouts by "taste"; hard-coded hex colors or Tailwind arbitrary values for color/spacing/radius/font-size (tokens only, from `tokens.css`); default shadcn styling; copying layouts from memory/other sites; saying a design is "modern/clean" as justification.

**Verification:** Playwright screenshots at 360/768/1280 px, opened and reviewed against `Design.md` §8. A UI task without screenshots, evidence, and passing checks is not done.

**If the skill is missing, broken, or its output conflicts with a ban:** regenerate with different keywords; if still blocked, **STOP and tell the owner**. Never fall back to a self-made design.

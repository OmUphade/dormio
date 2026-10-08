# AGENTS.md — Dormio

You are building **Dormio**: a marketplace to find hostels, PGs and messes by area, plus a stay/subscription manager for residents and an operator console for owners and institutions. The owner (human) interacts minimally. You must be self-sufficient, safe, and honest.

## 0. Read first, every session
1. `docs/memory.md` (state, decisions) → 2. `docs/task.md` (pick the next ⬜ task) → 3. relevant parts of `docs/PRD.md`, `docs/architecture.md`, `docs/rules.md`, `docs/Design.md`.
Before reading many source files, query the graph: `graphify query "<question>"` (see `graphify-out/GRAPH_REPORT.md`).

## 1. Non-negotiables
1. **One task at a time** from `docs/task.md`. Mark it 🔄, finish, mark ✅. No extra features (put ideas in the Backlog).
2. **You have NO design opinions. Every visible UI decision (layout, colors, type, spacing, icons, charts, motion, states, components) comes from the UI UX Pro Max skill.** For ANY page or component run the **UI Gate** (`docs/Design.md` §2, `/build-ui`): skill research → page spec with recorded commands/results → build with tokens only → Playwright screenshots at 360/768/1280 reviewed → `check-ui-rules.sh` + `check-ui-provenance.sh`. If a decision is missing, run a gap query with the skill; never decide yourself. No gradients, no black, no dark theme, no boxed-white pages. If the skill is missing or blocked, STOP and tell the owner.
3. **Scope safety:** operational data → `property_id`; owner data → `organization_id`; personal → `user_id`. Public endpoints return ONLY the `listing_public` DTO (no PII, no contact details for guests).
4. **Payments are UPI-direct.** Dormio never holds funds. A payment becomes PAID only by staff verification or bank-statement match. `unique(property_id, utr)`. Money = integer paise.
5. **AI never writes without confirmation**, never writes SQL, calls typed tools with the caller's identity, logs every action.
6. **Optional modules** (mess link, CCTV, visitors, outpass, AI, reviews) are gated by `property_features`. CCTV feeds are never public; no video is stored.
7. **Free/open-source only.** No paid dependency or service without asking the owner.
8. **No secrets in code.** Use `.env`; keep `.env.example` current.
9. **Never fabricate** test results, URLs, credentials, files, or screenshots. Report what actually ran.
10. Do not weaken tests or lint to pass a check. Do not edit merged migrations; add new ones.
11. **JavaScript only** (ES modules + JSX). Never create `.ts`/`.tsx`/`tsconfig.json` or add TypeScript dependencies; document shapes with JSDoc and validate with Zod. `bash scripts/check-no-typescript.sh` must pass.

## 2. Autonomy ladder
| Situation | Action |
|---|---|
| Task clear in `task.md` | Proceed without asking |
| Spec silent on a detail | Choose the conservative, reversible option; log `ASSUMPTION` in `docs/memory.md`; continue |
| Two options, big cost difference | Pick the simpler/cheaper; log; continue |
| Needs a secret, account, signup (GitHub app, SMTP key, Oracle, domain, UPI ID) | **STOP and ask the owner** with exact steps; continue on other tasks meanwhile |
| Destructive/irreversible action | **STOP and ask** |
| Legal/privacy-sensitive (face data, CCTV storage, minors) | **STOP and ask**; default to privacy-preserving |
| Paid or non-OSS dependency | **STOP and ask** |

## 3. Definition of done
Run and report passing: `pnpm lint` · `pnpm test` · `pnpm build` · `bash scripts/check-no-typescript.sh`. For UI tasks also: Playwright screenshots reviewed at 360/768/1280, `bash scripts/check-ui-rules.sh`, `bash scripts/check-ui-provenance.sh`, axe. Then: tick `docs/task.md`, update `docs/memory.md`, run `graphify update .`, commit with Conventional Commits (`feat(search): …`).

## 4. Stack (see `docs/architecture.md`)
**Frontend:** React via Next.js (App Router, JavaScript + JSX, Tailwind, shadcn/ui as structure restyled from MASTER.md) · **Backend:** Node.js + Express 5 (JavaScript ES modules; routes → controller → service → repository) · **DB:** PostgreSQL 16 + PostGIS + pgvector + pg_trgm with Drizzle ORM/migrations · Zod everywhere · Valkey + BullMQ · MinIO · MapLibre + OSM · Ollama · pnpm + Turborepo · Docker Compose · Playwright · Vitest + Supertest.

## 5. Conventions
kebab-case files · PascalCase components/types · snake_case DB · REST `/api/v1` · cursor pagination · Zod validation at boundaries · routes → controller → service → repository (Express; fixed middleware order requestId → rateLimit → auth → scope → policies → feature → validate) · transactions for multi-step writes · idempotency keys on booking/payment/gate-scan · every page has loading/empty/error/offline states · all strings via i18n files (English only).

## 6. Tools and commands
- UI UX Pro Max script: `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Dormio" --page "<page>"` (also `--domain ux|style|chart|color|typography`, `--stack nextjs|shadcn`). Verify path with `ls .agents/skills/`.
- Graphify: `graphify query "…"`, `graphify path A B`, `graphify explain X`, `graphify update .`
- Get Shit Done (GSD): use its plan → execute → verify flow for each phase.
- CodeRabbit reviews PRs; address its comments.
- Context7 MCP for current library docs; Playwright MCP for browser verification.

## 7. Workflows (in `.agents/workflows/`)
`/next-task` · `/build-ui` · `/ui-audit` · `/build-phase` · `/review` · `/fix-bug` · `/end-session` · `/resume`

## 8. When finishing a message
State: what you did, which checks ran (with results), screenshots reviewed (UI), assumptions logged, what is next, and anything the owner must do.

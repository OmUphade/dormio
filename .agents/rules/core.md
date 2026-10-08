# Dormio core rules (Always On)

- Follow `AGENTS.md` at the repo root; it is the source of truth for agent behavior.
- At session start read `docs/memory.md` and `docs/task.md`; at session end run `/end-session`.
- Work on exactly one task from `docs/task.md`. No unrequested features.
- Scope safety: `property_id` / `organization_id` / `user_id`. Public routes expose only `listing_public`.
- Payments are UPI-direct and staff-verified. Money is integer paise.
- AI actions need explicit user confirmation; never let an LLM write SQL.
- Free and open-source dependencies only. Ask before anything paid.
- Never fabricate results. Never weaken tests or lint to pass.
- Stop and ask the owner for: secrets/accounts, destructive actions, legal/privacy choices, paid tools.
- Prefer `graphify query "<question>"` over reading many files.

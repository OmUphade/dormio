---
description: Pick and complete the next task from docs/task.md end to end
---
1. Read `docs/memory.md`, then `docs/task.md`. Choose the first ⬜ task in the earliest unfinished phase (respect the suggested build order). Do not start 🅿 tasks.
2. Run `graphify query "<area of the task>"` to understand existing code. Read only what you need.
3. State a plan in at most 10 lines (files, approach, tests, whether the UI Gate applies).
4. Mark the task 🔄 in `docs/task.md`.
5. If the task has any UI, run the `/build-ui` workflow for each page or component involved.
6. Implement with tests (isolation + public-leak tests for scoped/public endpoints).
7. Run `pnpm lint`, `pnpm test`, `pnpm build`, `bash scripts/check-no-typescript.sh`. Fix failures. Never weaken checks.
8. Run the `/end-session` workflow.
9. Reply with: what changed, checks run and results, screenshots reviewed (if UI), assumptions logged, next task, anything the owner must do.

---
description: Plan and execute a whole phase using Get Shit Done, task by task
---
Phase = $PHASE (number from docs/task.md).
1. Read `docs/memory.md` and the phase section in `docs/task.md` plus the matching PRD/architecture parts.
2. Use Get Shit Done to plan the phase: break it into small specs with acceptance criteria; keep each spec independent and testable.
3. For each task in order: follow `/next-task`. Commit after each task. Do not batch unrelated work.
4. Use a Ralph-style loop only for tasks whose success is machine-checkable (tests/type-check/lint) with a maximum of 5 iterations; never for auth, payments, RLS or migrations without reviewing the diff.
5. After the last task: run full checks (`pnpm lint && pnpm test && pnpm build && bash scripts/check-no-typescript.sh`), open a PR, address CodeRabbit comments, update `docs/task.md` and `docs/memory.md`.
6. Report phase summary and next phase.

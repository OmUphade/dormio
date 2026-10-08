---
description: Fix a bug test-first and record it
---
1. Reproduce. Write a failing test first.
2. Find root cause (`graphify query`, `graphify path`). Fix minimally.
3. Run all checks. Do not weaken tests.
4. Record in `docs/memory.md` §6 (description, root cause, fix, regression test) and commit `fix(<scope>): …`.

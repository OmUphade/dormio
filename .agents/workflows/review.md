---
description: Self-review the current diff before opening a PR
---
1. `git diff main...HEAD`. Check: scope safety (`property_id`/`organization_id`), public-leak risk, UPI payment rules, feature-flag checks, AI confirmation rules, secrets, missing tests, missing loading/empty/error states.
2. UI changes: confirm provenance — `// ui-spec:` headers, page specs with real UI UX Pro Max commands and results, screenshots, COMPONENTS.md/PAGES.md entries, and that `check-ui-rules.sh` + `check-ui-provenance.sh` pass. Reject anything designed by taste, generic, boxed, gradient, or black.
3. Run `pnpm lint && pnpm test && pnpm build && bash scripts/check-no-typescript.sh`.
4. Fix everything found. Summarize findings and fixes.

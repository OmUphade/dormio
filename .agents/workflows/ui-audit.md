---
description: Audit the whole UI for provenance and rule violations; fix anything not traceable to UI UX Pro Max
---
1. Run `bash scripts/check-ui-rules.sh` and `bash scripts/check-ui-provenance.sh`; list every failure.
2. For each page in `apps/web/src/app`: confirm the `// ui-spec:` header, a spec with real recorded `search.py` commands, screenshots in `design-system/dormio/screenshots/<name>/`, and an entry in `PAGES.md`.
3. Open the screenshots. List pages that look generic, boxed, misaligned, or share the same composition as a neighbouring page.
4. For each offending page, re-run `/build-ui` from step 3 (new skill research and a new composition). Do not patch by taste.
5. Report: pages audited, failures found, pages redone, final check results.

---
description: Mandatory UI Gate. Every UI decision comes from UI UX Pro Max. Never design on your own
---
Page or component name = $NAME (kebab-case). Do ALL steps. You have no design opinions; the skill decides.

1. Skill check: `ls .agents/skills/ui-ux-pro-max/scripts/` and `python3 .agents/skills/ui-ux-pro-max/scripts/search.py --help`. If missing or failing → STOP and tell the owner.
2. Master check: `design-system/dormio/MASTER.md` must exist. If not, generate it:
   `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "marketplace accommodation hostel PG mess student housing local discovery warm friendly trustworthy image-rich" --design-system --persist -p "Dormio"`
   Compare ≥ 3 style and ≥ 3 palette candidates from the skill; pick one that satisfies `docs/Design.md` §3 (no gradients, black, dark theme, glassmorphism, neon, AI purple, boxed-white look). Re-query with different keywords if violated. Record "Selection rationale" in MASTER.md. Never hand-edit the skill's palette or fonts.
3. Research this page/component (run all that apply, record exact commands and chosen results):
   - `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<purpose keywords>" --design-system --persist -p "Dormio" --page "$NAME"`
   - `... "<topic>" --domain ux`
   - `... "<mood/topic>" --domain style`
   - `... "<topic>" --stack nextjs` and `--stack shadcn`
   - `... "<topic>" --domain icons` (icons) · `--domain chart` (charts) · `--domain color` / `--domain typography` / `--domain landing` if listed by `--help`
   - Anything still undecided → one more gap query. Never decide by taste.
4. Write `design-system/dormio/pages/$NAME.md` using the template in `docs/Design.md` §5: evidence, composition (different from the neighbouring page), signature element, sketches for 360/768/1280, components, states, real copy, imagery needs.
5. Build with tokens/components from MASTER.md only. First line of each `page.jsx`/`layout.jsx`: `// ui-spec: design-system/dormio/pages/$NAME.md`. Register new shared components in `design-system/dormio/COMPONENTS.md` with the justifying skill query.
6. Run the app. Playwright screenshots at 360, 768, 1280 px → `design-system/dormio/screenshots/$NAME/`. OPEN each, review against `docs/Design.md` §8, fix, re-shoot (max 3 rounds). Log rounds in the spec ("Screenshot review log").
7. Run `bash scripts/check-ui-rules.sh`, `bash scripts/check-ui-provenance.sh` and the axe check. Fix all findings.
8. Append to `design-system/dormio/PAGES.md`.
9. Final message: commands run, skill results chosen, screenshots reviewed, checks passed, remaining issues.

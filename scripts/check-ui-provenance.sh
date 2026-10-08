#!/usr/bin/env bash
# Enforces that every page/layout and shared component is traceable to UI UX Pro Max output.
set -u
APP="apps/web/src/app"
COMP="apps/web/src/components"
SPECDIR="design-system/dormio"
FAIL=0
[ -f "$SPECDIR/MASTER.md" ] || { if [ -d "$APP" ] && find "$APP" -name 'page.jsx' | grep -q .; then echo "✗ $SPECDIR/MASTER.md missing (generate with UI UX Pro Max first)"; FAIL=1; fi; }
if [ -d "$APP" ]; then
  while IFS= read -r f; do
    case "$f" in */api/*|*/dev/*) continue;; esac
    spec=$(head -5 "$f" | grep -oE 'ui-spec:\s*\S+' | sed -E 's/ui-spec:\s*//')
    if [ -z "$spec" ]; then echo "✗ $f: missing '// ui-spec: design-system/dormio/pages/<name>.md' header"; FAIL=1; continue; fi
    if [ ! -f "$spec" ]; then echo "✗ $f: spec file not found: $spec"; FAIL=1; continue; fi
    grep -q '## UI UX Pro Max evidence' "$spec" || { echo "✗ $spec: missing '## UI UX Pro Max evidence' section"; FAIL=1; }
    n=$(grep -c 'search.py' "$spec"); [ "$n" -ge 3 ] || { echo "✗ $spec: needs ≥ 3 recorded search.py commands (found $n)"; FAIL=1; }
    grep -q 'Selection rationale' "$spec" || { echo "✗ $spec: missing 'Selection rationale'"; FAIL=1; }
    grep -q 'Screenshot review log' "$spec" || { echo "✗ $spec: missing 'Screenshot review log'"; FAIL=1; }
  done < <(find "$APP" \( -name 'page.jsx' -o -name 'layout.jsx' \))
fi
if [ -d "$COMP" ]; then
  [ -f "$SPECDIR/COMPONENTS.md" ] || { echo "✗ $SPECDIR/COMPONENTS.md missing"; FAIL=1; }
  while IFS= read -r f; do
    b=$(basename "$f" .jsx)
    grep -qi "$b" "$SPECDIR/COMPONENTS.md" 2>/dev/null || { echo "✗ component '$b' ($f) not registered in COMPONENTS.md"; FAIL=1; }
  done < <(find "$COMP" -name '*.jsx' ! -name '*.test.jsx' ! -name '*.stories.jsx')
fi
if [ $FAIL -ne 0 ]; then echo "UI provenance check FAILED. See docs/Design.md §2 and §5."; exit 1; fi
echo "UI provenance check passed."

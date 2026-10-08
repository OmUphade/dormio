#!/usr/bin/env bash
# Fails if UI code violates Dormio's design bans (docs/Design.md §3). Tokens only; no freestyle values.
set -u
DIRS="apps/web/src packages/ui/src"
FAIL=0
INC="--include=*.js --include=*.jsx --include=*.mjs --include=*.css --include=*.scss --include=*.mdx"
check() {
  local label="$1"; local pattern="$2"; local extra="${3:-}"
  local out
  out=$(grep -RInE $INC $extra "$pattern" $DIRS 2>/dev/null)
  if [ -n "$out" ]; then
    echo "✗ $label"; echo "$out" | head -20; echo; FAIL=1
  fi
}
check "Gradients are banned (flat fills only)" '(linear|radial|conic)-gradient|bg-gradient-|\b(from|via|to)-(\[|#|[a-z]+-[0-9]{2,3}\b|transparent|current)'
check "Black is banned" '#000(000)?\b|\bbg-black\b|\btext-black\b|\bborder-black\b|\b(color|background)\s*:\s*black\b|rgb\(0,\s*0,\s*0\)'
check "Dark theme is out of scope for v1" 'dark:|prefers-color-scheme:\s*dark'
check "Glassmorphism/blur panels are banned" 'backdrop-blur|backdrop-filter'
check "Lorem ipsum is banned" '[Ll]orem [Ii]psum'
# Tokens only: no hard-coded hex colors outside the token file (add real exceptions to scripts/ui-hex-allowlist.txt, one path per line)
HEX_OUT=$(grep -RInE $INC --exclude=tokens.css '#[0-9a-fA-F]{3,8}\b' $DIRS 2>/dev/null | grep -vFf scripts/ui-hex-allowlist.txt 2>/dev/null)
if [ -n "$HEX_OUT" ]; then echo "✗ Hard-coded hex colors found (use tokens from tokens.css)"; echo "$HEX_OUT" | head -20; echo; FAIL=1; fi
check "Tailwind arbitrary values for color/spacing/radius are banned (use tokens)" '\b(text|bg|border|ring|fill|stroke|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-x|space-y|rounded)-\['
if [ $FAIL -ne 0 ]; then echo "UI rule check FAILED. See docs/Design.md §3."; exit 1; fi
echo "UI rule check passed."

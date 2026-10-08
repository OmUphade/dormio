#!/usr/bin/env bash
# Dormio is JavaScript-only (ES modules + JSX). Fails if any TypeScript file or config is present.
set -u
FOUND=$(find . \( -path ./node_modules -o -path '*/node_modules' -o -path ./.git -o -path '*/.next' -o -path ./graphify-out \) -prune -o \
  \( -name '*.ts' -o -name '*.tsx' -o -name 'tsconfig*.json' \) ! -name '*.d.ts' -print)
if [ -n "$FOUND" ]; then echo "✗ TypeScript files found (project is JavaScript-only):"; echo "$FOUND" | head -20; echo "Convert to .js/.jsx and use JSDoc. Remove tsconfig.json and TypeScript dependencies."; exit 1; fi
PKGS=$(find . -name package.json -not -path '*/node_modules/*' 2>/dev/null)
if [ -n "$PKGS" ] && grep -qE '"(typescript|ts-node|tsx|tsup|@types/[^"]+)"' $PKGS; then
  echo "✗ TypeScript dependencies found in package.json (typescript, tsx, tsup, @types/*). Remove them."; exit 1; fi
echo "No TypeScript found. OK."

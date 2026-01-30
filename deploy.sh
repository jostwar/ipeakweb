#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

BEFORE="$(git rev-parse HEAD)"
git pull origin main
AFTER="$(git rev-parse HEAD)"

if [ "$BEFORE" = "$AFTER" ]; then
  echo "Sin cambios en el repo."
  exit 0
fi

CHANGED="$(git diff --name-only "$BEFORE" "$AFTER")"
echo "$CHANGED"

if echo "$CHANGED" | grep -E -q "^(package.json|package-lock.json)$"; then
  npm install --no-audit --no-fund
fi

if echo "$CHANGED" | grep -E -q "^(src/|public/|data/|next.config.ts|postcss.config.mjs|tsconfig.json)"; then
  npm run build
fi

pm2 restart ipeakweb

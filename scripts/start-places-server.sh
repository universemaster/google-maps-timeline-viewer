#!/bin/zsh
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "${ROOT_DIR}"
npm run build
echo "Open on Tailscale: http://grahams-macbook-air.tailcc5a23.ts:${PLACES_PORT:-8787}/"
echo "This stays in the foreground and stops when you press Ctrl-C."
exec node dist/src/server/places-server.js

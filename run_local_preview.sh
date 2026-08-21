#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
PORT="${PORT:-5180}"

echo "Portfolio preview: http://127.0.0.1:${PORT}"
python3 -m http.server "$PORT" --bind 127.0.0.1

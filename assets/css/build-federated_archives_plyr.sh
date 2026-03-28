#!/usr/bin/env bash
# Concatenate Plyr vendor CSS + PanDoRa preview rules into a single file (no nested @import).
# Tailwind v4 @tailwindcss/cli often drops nested imports from app.css; a flat file fixes that.
#
# Prerequisites: yarn install in extensions/bonfire_pandora (plyr in node_modules).
#
# Usage (from umbrella repo root):
#   ./extensions/federated_archives/assets/css/build-federated_archives_plyr.sh
# Or from this directory:
#   ./build-federated_archives_plyr.sh
set -euo pipefail
CSS_DIR="$(cd "$(dirname "$0")" && pwd)"
FA_ROOT="$(cd "$CSS_DIR/../.." && pwd)"
BP_ROOT="$(cd "$FA_ROOT/../bonfire_pandora" && pwd)"
PLYR_CSS="$BP_ROOT/node_modules/plyr/dist/plyr.css"
PANDORA_CSS="$BP_ROOT/assets/css/pandora_plyr.css"
OUT="$CSS_DIR/federated_archives_plyr.css"

if [[ ! -f "$PLYR_CSS" ]]; then
  echo "Missing: $PLYR_CSS — run: cd $BP_ROOT && yarn install" >&2
  exit 1
fi
if [[ ! -f "$PANDORA_CSS" ]]; then
  echo "Missing: $PANDORA_CSS" >&2
  exit 1
fi

{
  cat <<'HDR'
/**
 * Federated Archives — Plyr + PanDoRa feed preview CSS (single flat file, no @import).
 * AUTO-GENERATED — edit sources and re-run assets/css/build-federated_archives_plyr.sh
 *
 * Sources:
 *   - extensions/bonfire_pandora/node_modules/plyr/dist/plyr.css
 *   - extensions/bonfire_pandora/assets/css/pandora_plyr.css
 *
 * Umbrella app.css (after tailwind + nprogress):
 *   @import "../../../../extensions/federated_archives/assets/css/federated_archives_plyr.css";
 */
HDR
  echo ""
  cat "$PLYR_CSS"
  echo ""
  cat "$PANDORA_CSS"
} >"$OUT"

echo "Wrote $OUT ($(wc -c <"$OUT") bytes)"

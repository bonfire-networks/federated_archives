#!/bin/sh
# Idempotently ensure the umbrella's bonfire_ui_common app.css imports the flat
# Plyr + PanDoRa CSS bundle (federated_archives_plyr.css).
#
# WHY: that @import lives inside bonfire_ui_common's app.css, which is a dependency
# file — so it is overwritten (and the line lost) every time bonfire_ui_common is
# updated. Without it, Plyr renders unstyled (giant control icons) in feeds and the
# movie player. This script re-adds the line if missing, and is safe to run repeatedly.
#
# Run automatically from the flavour's deps.js.sh (during `just update` -> js-deps-fetch,
# after deps are refreshed), or manually from the umbrella repo root:
#   sh ./extensions/federated_archives/assets/css/ensure-app-css-import.sh
set -eu

CSS_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$CSS_DIR/../../../.." && pwd)"

MARKER="federated_archives_plyr.css"
# Relative path is valid from BOTH deps/bonfire_ui_common/assets/css/ and
# extensions/bonfire_ui_common/assets/css/ (both are 4 levels below the repo root).
IMPORT_LINE='@import "../../../../extensions/federated_archives/assets/css/federated_archives_plyr.css";'

# Locate the app.css actually used by the build (local extension fork preferred, else dep).
if [ -f "$ROOT/extensions/bonfire_ui_common/assets/css/app.css" ]; then
  APP_CSS="$ROOT/extensions/bonfire_ui_common/assets/css/app.css"
elif [ -f "$ROOT/deps/bonfire_ui_common/assets/css/app.css" ]; then
  APP_CSS="$ROOT/deps/bonfire_ui_common/assets/css/app.css"
else
  echo "[ensure-app-css-import] bonfire_ui_common app.css not found; skipping." >&2
  exit 0
fi

if grep -q "$MARKER" "$APP_CSS"; then
  echo "[ensure-app-css-import] already present in $APP_CSS"
  exit 0
fi

tmp="$APP_CSS.ensure.$$"
# Insert after the nprogress import (fallback: after the tailwindcss import).
inject() {
  awk -v line="$IMPORT_LINE" -v anchor="$1" '
    { print }
    !done && $0 ~ anchor {
      print ""
      print "/* PanDoRa/Plyr feed + movie player CSS (flat bundle: plyr.css + pandora_plyr.css)."
      print "   Auto-managed by extensions/federated_archives/assets/css/ensure-app-css-import.sh"
      print "   re-injected on `just update` because this dep file is overwritten when"
      print "   bonfire_ui_common is updated. */"
      print line
      done = 1
    }
  ' "$APP_CSS" > "$tmp"
}

inject '@import "nprogress/nprogress.css";'
grep -q "$MARKER" "$tmp" || inject '@import "tailwindcss";'

if grep -q "$MARKER" "$tmp"; then
  mv "$tmp" "$APP_CSS"
  echo "[ensure-app-css-import] injected import into $APP_CSS"
else
  rm -f "$tmp"
  echo "[ensure-app-css-import] no anchor @import found in $APP_CSS — add manually:" >&2
  echo "  $IMPORT_LINE" >&2
  exit 1
fi

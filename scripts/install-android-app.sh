#!/bin/zsh
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APK="$(${ROOT_DIR}/scripts/build-android-apk.sh)"
ADB="${ADB:-/Users/gra/.local/bin/adb}"
if [[ ! -x "${ADB}" ]] || [[ -z "$(${ADB} devices | sed -n '2,$p' | awk '$2 == "device" { print $1; exit }')" ]]; then
  echo "No connected Android device. APK ready at ${APK}"
  echo "With the Mac server running, it is also at http://grahams-macbook-air.tailcc5a23.ts:8787/android/latest.apk"
  exit 0
fi
"${ADB}" install -r "${APK}"
"${ADB}" shell am start -n com.grahamp.placestracker/.PlacesTrackerActivity

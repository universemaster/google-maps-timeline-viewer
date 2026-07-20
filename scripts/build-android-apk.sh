#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SDK_ROOT="${ANDROID_SDK_ROOT:-${ANDROID_HOME:-/Users/gra/Library/Android/sdk}}"
TARGET_SDK="${ANDROID_TARGET_SDK:-37.0}"
BUILD_TOOLS_VERSION="${ANDROID_BUILD_TOOLS_VERSION:-37.0.0}"
MIN_SDK=26
BUILD_DIR="${ROOT_DIR}/build/android"
WORK_DIR="${BUILD_DIR}/work"
ANDROID_JAR="${SDK_ROOT}/platforms/android-${TARGET_SDK}/android.jar"
TOOLS_DIR="${SDK_ROOT}/build-tools/${BUILD_TOOLS_VERSION}"
TOKEN_FILE="${ROOT_DIR}/.places-server-token"
SERVER_BASE_URL="${PLACES_ANDROID_SERVER_URL:-http://grahams-macbook-air.tailcc5a23.ts:8787}"
APK="${BUILD_DIR}/PlacesTrackerAndroid-debug.apk"

if [[ ! -f "${ANDROID_JAR}" || ! -x "${TOOLS_DIR}/aapt2" ]]; then
  echo "Android SDK platform ${TARGET_SDK} and build tools ${BUILD_TOOLS_VERSION} are required." >&2
  exit 1
fi

if [[ ! -s "${TOKEN_FILE}" ]]; then
  umask 077
  openssl rand -hex 32 > "${TOKEN_FILE}"
fi

if [[ -x "/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin/javac" ]]; then
  export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
  export PATH="${JAVA_HOME}/bin:${PATH}"
fi

rm -rf "${WORK_DIR}"
mkdir -p "${WORK_DIR}/gen" "${WORK_DIR}/classes" "${WORK_DIR}/dex" "${WORK_DIR}/generated/com/grahamp/placestracker" "${BUILD_DIR}"

ACCESS_TOKEN="$(tr -d '\r\n' < "${TOKEN_FILE}")"
sed -e "s|__SERVER_BASE_URL__|${SERVER_BASE_URL}|g" -e "s|__ACCESS_TOKEN__|${ACCESS_TOKEN}|g" \
  "${ROOT_DIR}/android/generated-src/com/grahamp/placestracker/ServerConfig.java.template" \
  > "${WORK_DIR}/generated/com/grahamp/placestracker/ServerConfig.java"

"${TOOLS_DIR}/aapt2" compile --dir "${ROOT_DIR}/android/app/src/main/res" -o "${WORK_DIR}/resources.zip"
"${TOOLS_DIR}/aapt2" link -o "${WORK_DIR}/unaligned.apk" -I "${ANDROID_JAR}" \
  --manifest "${ROOT_DIR}/android/app/src/main/AndroidManifest.xml" --java "${WORK_DIR}/gen" \
  --min-sdk-version "${MIN_SDK}" --target-sdk-version 37 --version-code "${ANDROID_VERSION_CODE:-$(date +%s)}" \
  --version-name "${ANDROID_VERSION_NAME:-$(date -u +%Y.%m.%d.%H%M%S)}" -R "${WORK_DIR}/resources.zip" --auto-add-overlay

find "${ROOT_DIR}/android/app/src/main/java" "${WORK_DIR}/generated" "${WORK_DIR}/gen" -name '*.java' | sort > "${WORK_DIR}/sources.list"
javac -encoding UTF-8 -source 8 -target 8 -bootclasspath "${ANDROID_JAR}" -d "${WORK_DIR}/classes" @"${WORK_DIR}/sources.list"
jar --create --file "${WORK_DIR}/classes.jar" -C "${WORK_DIR}/classes" .
"${TOOLS_DIR}/d8" --lib "${ANDROID_JAR}" --output "${WORK_DIR}/dex" "${WORK_DIR}/classes.jar"
(cd "${WORK_DIR}/dex" && zip -q -r "${WORK_DIR}/unaligned.apk" classes.dex)
"${TOOLS_DIR}/zipalign" -p -f 4 "${WORK_DIR}/unaligned.apk" "${WORK_DIR}/aligned.apk"

if [[ ! -f "${BUILD_DIR}/debug.keystore" ]]; then
  keytool -genkeypair -keystore "${BUILD_DIR}/debug.keystore" -storepass android -alias androiddebugkey -keypass android \
    -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Places Tracker,C=GB" >/dev/null
fi
"${TOOLS_DIR}/apksigner" sign --ks "${BUILD_DIR}/debug.keystore" --ks-pass pass:android --key-pass pass:android --out "${APK}" "${WORK_DIR}/aligned.apk"
"${TOOLS_DIR}/apksigner" verify --verbose "${APK}" >/dev/null
echo "${APK}"

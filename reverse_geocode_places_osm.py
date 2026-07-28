#!/usr/bin/env python3
"""Populate county/country/admin metadata for dashboard place clusters."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import math
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parent
DATA_JS = ROOT / "places_dashboard_data.js"
STAGING = ROOT / "combined_location_history_dedupe_work" / "staging"
CACHE_PATH = STAGING / "osm_admin_area_cache.json"
NOMINATIM_REVERSE = "https://nominatim.openstreetmap.org/reverse"
USER_AGENT = "google-maps-timeline-viewer personal reverse geocoding"
UTC = dt.timezone.utc


def haversine_m(a_lat: float, a_lng: float, b_lat: float, b_lng: float) -> float:
    radius = 6371000.0
    p1 = math.radians(a_lat)
    p2 = math.radians(b_lat)
    dp = math.radians(b_lat - a_lat)
    dl = math.radians(b_lng - a_lng)
    h = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * radius * math.asin(math.sqrt(h))


def load_dashboard_data() -> dict:
    text = DATA_JS.read_text(encoding="utf-8")
    return json.loads(text[text.index("=") + 1:text.rindex(";")])


def load_cache() -> dict:
    if not CACHE_PATH.exists():
        return {"generatedAt": "", "provider": "OpenStreetMap Nominatim", "places": {}}
    return json.loads(CACHE_PATH.read_text(encoding="utf-8"))


def write_cache(cache: dict) -> None:
    cache["generatedAt"] = dt.datetime.now(UTC).isoformat(timespec="seconds").replace("+00:00", "Z")
    CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    CACHE_PATH.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")


def cached_is_current(place: dict, cached: dict | None) -> bool:
    if not isinstance(cached, dict):
        return False
    if cached.get("status") != "ok":
        return False
    try:
        cached_lat = float(cached.get("lat"))
        cached_lng = float(cached.get("lng"))
    except (TypeError, ValueError):
        return False
    return haversine_m(place["lat"], place["lng"], cached_lat, cached_lng) <= 25


def reverse_geocode(lat: float, lng: float, timeout: int) -> dict:
    query = urllib.parse.urlencode({
        "format": "jsonv2",
        "lat": f"{lat:.7f}",
        "lon": f"{lng:.7f}",
        "zoom": 18,
        "addressdetails": 1,
        "extratags": 0,
        "namedetails": 0,
    })
    request = urllib.request.Request(
        f"{NOMINATIM_REVERSE}?{query}",
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.load(response)


def fetch_with_retries(place: dict, timeout: int) -> dict:
    last_error = ""
    for attempt in range(1, 4):
        try:
            return reverse_geocode(place["lat"], place["lng"], timeout)
        except urllib.error.HTTPError as exc:
            last_error = f"HTTP {exc.code}"
            if exc.code in {403, 429, 500, 502, 503, 504}:
                time.sleep(10 * attempt)
                continue
            break
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
            last_error = str(exc)
            time.sleep(4 * attempt)
    return {"error": last_error}


def cache_payload(place: dict, response: dict) -> dict:
    if response.get("error"):
        return {
            "status": "error",
            "source": "nominatim",
            "error": str(response.get("error")),
            "label": place["label"],
            "lat": place["lat"],
            "lng": place["lng"],
            "visitCount": place.get("visitCount", 0),
            "overnightCount": place.get("overnightCount", 0),
            "totalVisitHours": place.get("totalVisitHours", 0),
        }
    address = response.get("address") if isinstance(response.get("address"), dict) else {}
    return {
        "status": "ok",
        "source": "nominatim",
        "displayName": str(response.get("display_name") or ""),
        "osmType": str(response.get("osm_type") or ""),
        "osmId": response.get("osm_id"),
        "placeRank": response.get("place_rank"),
        "category": str(response.get("category") or ""),
        "type": str(response.get("type") or ""),
        "address": address,
        "label": place["label"],
        "lat": place["lat"],
        "lng": place["lng"],
        "visitCount": place.get("visitCount", 0),
        "overnightCount": place.get("overnightCount", 0),
        "totalVisitHours": place.get("totalVisitHours", 0),
    }


def sort_key(place: dict) -> tuple:
    return (
        place.get("visitCount", 0) + place.get("overnightCount", 0),
        place.get("totalVisitHours", 0),
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=0, help="maximum places to query; 0 means all")
    parser.add_argument("--sleep", type=float, default=1.1, help="delay between Nominatim requests")
    parser.add_argument("--timeout", type=int, default=45)
    parser.add_argument("--force", action="store_true", help="re-query current cached places")
    args = parser.parse_args()

    data = load_dashboard_data()
    cache = load_cache()
    cache.setdefault("places", {})
    places = [
        place for place in data["places"]
        if isinstance(place.get("lat"), (int, float))
        and isinstance(place.get("lng"), (int, float))
        and (args.force or not cached_is_current(place, cache["places"].get(place["id"])))
    ]
    places.sort(key=sort_key, reverse=True)
    if args.limit:
        places = places[:args.limit]

    print(f"Reverse-geocoding {len(places)} place clusters", flush=True)
    for index, place in enumerate(places, start=1):
        response = fetch_with_retries(place, args.timeout)
        payload = cache_payload(place, response)
        cache["places"][place["id"]] = payload
        if payload["status"] == "ok":
            address = payload["address"]
            county = address.get("county") or address.get("state_district") or address.get("state") or ""
            print(f"{index:4d}/{len(places)} {place['label']} -> {county or address.get('country', '')}", flush=True)
        else:
            print(f"{index:4d}/{len(places)} {place['label']} -> {payload['error']}", flush=True)
        write_cache(cache)
        time.sleep(args.sleep)

    ok = sum(1 for item in cache["places"].values() if item.get("status") == "ok")
    print(f"Wrote {CACHE_PATH} with {ok} reverse-geocoded places", flush=True)


if __name__ == "__main__":
    main()

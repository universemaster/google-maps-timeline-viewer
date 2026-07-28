#!/usr/bin/env python3
"""Populate a local OpenStreetMap label cache for generic Timeline places."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import math
import time
import urllib.error
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parent
DATA_JS = ROOT / "places_dashboard_data.js"
STAGING = ROOT / "combined_location_history_dedupe_work" / "staging"
CACHE_PATH = STAGING / "osm_place_label_cache.json"
UTC = dt.timezone.utc
OVERPASS_ENDPOINTS = (
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
)
USER_AGENT = "google-maps-timeline-viewer personal OSM label enrichment"
OSM_FEATURE_FILTERS = (
    "amenity",
    "shop",
    "railway",
    "public_transport",
    "tourism",
    "office",
    "building",
    "leisure",
    "healthcare",
    "historic",
    "craft",
    "aeroway",
    "emergency",
    "man_made",
    "natural",
    "landuse",
    "sport",
    "club",
    "place",
)


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
        return {"generatedAt": "", "radiusM": None, "places": {}}
    return json.loads(CACHE_PATH.read_text(encoding="utf-8"))


def is_generic_label(label: str) -> bool:
    lowered = label.lower()
    return (
        lowered.startswith("unknown near ")
        or lowered.startswith("searched address near ")
        or lowered.startswith("inferred work near ")
        or lowered.startswith("aliased location near ")
        or lowered.startswith("overnight area near ")
    )


def target_score(place: dict) -> tuple:
    return (
        place.get("visitCount", 0),
        place.get("overnightCount", 0),
        place.get("totalVisitHours", 0),
    )


def query_for_batch(batch: list[dict], radius_m: int) -> str:
    clauses = []
    for place in batch:
        lat = place["lat"]
        lng = place["lng"]
        for feature_filter in OSM_FEATURE_FILTERS:
            clauses.append(f'nwr(around:{radius_m},{lat},{lng})["name"]["{feature_filter}"];')
    body = "\n  ".join(clauses)
    return f"[out:json][timeout:60];(\n  {body}\n);out center tags;"


def fetch_overpass(query: str) -> dict:
    last_error = None
    for endpoint in OVERPASS_ENDPOINTS:
        request = urllib.request.Request(
            endpoint,
            data=query.encode("utf-8"),
            headers={
                "User-Agent": USER_AGENT,
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=90) as response:
                return json.load(response)
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
            last_error = exc
            time.sleep(2)
    raise RuntimeError(f"Overpass request failed: {last_error}")


def element_point(element: dict) -> tuple[float, float] | None:
    center = element.get("center") or element
    if "lat" not in center or "lon" not in center:
        return None
    return float(center["lat"]), float(center["lon"])


def category_and_penalty(tags: dict) -> tuple[str, int]:
    if tags.get("amenity"):
        value = tags["amenity"]
        if value in {"pub", "bar", "restaurant", "cafe", "fast_food", "nightclub", "pharmacy", "bank", "library", "courthouse", "police"}:
            return value, 0
        return value, 10
    if tags.get("shop"):
        return tags["shop"], 0
    if tags.get("railway") == "station" or tags.get("public_transport") == "station":
        return "station", 3
    if tags.get("building") == "train_station":
        return "station", 5
    if tags.get("tourism"):
        return tags["tourism"], 12
    if tags.get("office"):
        return tags["office"], 15
    if tags.get("leisure"):
        return tags["leisure"], 15
    if tags.get("healthcare"):
        return tags["healthcare"], 15
    if tags.get("historic"):
        return tags["historic"], 20
    if tags.get("aeroway"):
        return tags["aeroway"], 12
    if tags.get("emergency"):
        return tags["emergency"], 12
    if tags.get("club"):
        return tags["club"], 20
    if tags.get("sport"):
        return tags["sport"], 30
    if tags.get("man_made"):
        return tags["man_made"], 35
    if tags.get("natural"):
        return tags["natural"], 45
    if tags.get("landuse"):
        return tags["landuse"], 55
    if tags.get("building"):
        return "building", 30
    if tags.get("place"):
        return tags["place"], 80
    if tags.get("public_transport"):
        return tags["public_transport"], 45
    if tags.get("railway"):
        return tags["railway"], 70
    if tags.get("highway"):
        return tags["highway"], 90
    return "named_feature", 35


def feature_label(name: str, category: str, tags: dict) -> str:
    if category == "station" and "station" not in name.lower():
        return f"{name} Station"
    if tags.get("brand") and name.lower() in {"tesco", "boots", "greggs"}:
        return tags["brand"]
    return name


def rank_candidate(place: dict, element: dict, radius_m: int) -> dict | None:
    tags = element.get("tags", {})
    name = str(tags.get("name") or "").strip()
    point = element_point(element)
    if not name or point is None:
        return None
    distance = haversine_m(place["lat"], place["lng"], point[0], point[1])
    if distance > radius_m:
        return None
    category, penalty = category_and_penalty(tags)
    if category in {"rail", "abandoned", "disused", "platform", "bus_stop"} and distance > 40:
        penalty += 40
    score = distance + penalty
    if distance <= 35 and penalty <= 20:
        confidence = "high"
    elif distance <= 70 and penalty <= 30:
        confidence = "medium"
    elif distance <= 100 and penalty <= 10:
        confidence = "medium"
    else:
        confidence = "low"
    return {
        "label": feature_label(name, category, tags),
        "name": name,
        "category": category,
        "confidence": confidence,
        "distanceM": round(distance, 1),
        "score": round(score, 1),
        "osmType": element.get("type", ""),
        "osmId": element.get("id", ""),
        "tags": {key: tags[key] for key in sorted(tags) if key in {"amenity", "shop", "railway", "public_transport", "tourism", "office", "building", "leisure", "brand", "healthcare", "historic", "craft", "aeroway", "emergency", "man_made", "natural", "landuse", "sport", "club", "place"}},
    }


def choose_label(place: dict, elements: list[dict], radius_m: int) -> dict | None:
    candidates = [rank_candidate(place, element, radius_m) for element in elements]
    candidates = [item for item in candidates if item]
    if not candidates:
        return None
    candidates.sort(key=lambda item: (item["score"], item["distanceM"]))
    best = candidates[0]
    best["candidateCount"] = len(candidates)
    best["alternates"] = candidates[1:6]
    best["originalLabel"] = place["label"]
    best["lat"] = place["lat"]
    best["lng"] = place["lng"]
    best["visitCount"] = place.get("visitCount", 0)
    best["overnightCount"] = place.get("overnightCount", 0)
    best["totalVisitHours"] = place.get("totalVisitHours", 0)
    return best


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=300, help="number of generic places to consider")
    parser.add_argument("--batch-size", type=int, default=20)
    parser.add_argument("--radius-m", type=int, default=140)
    parser.add_argument("--refresh", action="store_true", help="re-query places already in the cache")
    args = parser.parse_args()

    data = load_dashboard_data()
    cache = load_cache()
    cache.setdefault("places", {})
    places = [
        place for place in data["places"]
        if is_generic_label(place["label"]) and (args.refresh or place["id"] not in cache["places"])
    ]
    places.sort(key=target_score, reverse=True)
    places = places[:args.limit]
    print(f"Geocoding {len(places)} generic places with radius {args.radius_m}m", flush=True)

    for index in range(0, len(places), args.batch_size):
        batch = places[index:index + args.batch_size]
        print(f"Batch {index // args.batch_size + 1}: {len(batch)} places", flush=True)
        response = fetch_overpass(query_for_batch(batch, args.radius_m))
        elements = response.get("elements", [])
        for place in batch:
            best = choose_label(place, elements, args.radius_m)
            cache["places"][place["id"]] = best or {
                "label": "",
                "confidence": "none",
                "originalLabel": place["label"],
                "lat": place["lat"],
                "lng": place["lng"],
                "visitCount": place.get("visitCount", 0),
                "overnightCount": place.get("overnightCount", 0),
                "totalVisitHours": place.get("totalVisitHours", 0),
            }
            if best and best["confidence"] in {"high", "medium"}:
                print(f"  {place['visitCount']:4d} visits {place['label']} -> {best['label']} ({best['distanceM']}m, {best['confidence']})", flush=True)
        time.sleep(1.2)

    cache["generatedAt"] = dt.datetime.now(UTC).isoformat(timespec="seconds").replace("+00:00", "Z")
    cache["radiusM"] = args.radius_m
    CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    CACHE_PATH.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")
    applied = sum(1 for item in cache["places"].values() if item.get("confidence") in {"high", "medium"})
    print(f"Wrote {CACHE_PATH} with {applied} usable labels", flush=True)


if __name__ == "__main__":
    main()

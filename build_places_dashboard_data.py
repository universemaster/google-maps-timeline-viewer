#!/usr/bin/env python3
"""Build a compact visits/overnights dataset for places-dashboard.html."""

from __future__ import annotations

import csv
import datetime as dt
import hashlib
import html
import json
import math
import re
import zipfile
from pathlib import Path
from urllib.parse import unquote_plus
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parent
STAGING = ROOT / "combined_location_history_dedupe_work" / "staging"
TIMELINE_JSON = STAGING / "unique_data_files" / "0016_Timeline.json"
POINTS_CSV = STAGING / "deduplicated_records" / "deduplicated_location_points.csv"
MAP_ACTIVITY_CSV = STAGING / "deduplicated_records" / "deduplicated_maps_activity.csv"
MAP_ACTIVITY_JSONL = STAGING / "deduplicated_records" / "deduplicated_maps_activity.jsonl"
MAP_ACTIVITY_SOURCES_JSON = STAGING / "MAP_ACTIVITY_SOURCE_SUMMARY.json"
OSM_LABEL_CACHE = STAGING / "osm_place_label_cache.json"
OSM_ADMIN_CACHE = STAGING / "osm_admin_area_cache.json"
OUTPUT = ROOT / "places_dashboard_data.js"
DRIVE_DOWNLOADS = ROOT / "proper_drive_downloads"
LOCAL_MAP_ACTIVITY_ZIPS = [
    Path("/Users/gra/Documents/from-old-macbook-pro/Downloads/takeout-20231124T173335Z-001.zip"),
    Path("/Users/gra/Documents/from-old-macbook-pro/Graham Phone March 2024/Download/takeout-20230511T174201Z-001.zip"),
]
MAP_ACTIVITY_MEMBER_SUFFIXES = (
    "Takeout/My Activity/Maps/My Activity.json",
    "Takeout/My Activity/Maps/MyActivity.json",
)

LOCAL_ZONE = ZoneInfo("Europe/London")
UTC = dt.timezone.utc
HOME_RADIUS_M = 350
PLACE_JOIN_RADIUS_M = 180
OVERNIGHT_CLUSTER_RADIUS_M = 350
COORD_RE = re.compile(r"(?<![\d.-])(-?\d{1,2}(?:\.\d+)?),\s*(-?\d{1,3}(?:\.\d+)?)(?![\d.-])")


def parse_iso(value: str | None) -> dt.datetime | None:
    if not value:
        return None
    try:
        parsed = dt.datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=LOCAL_ZONE)
    return parsed


def iso_utc(value: dt.datetime | None) -> str:
    if not value:
        return ""
    return value.astimezone(UTC).isoformat(timespec="seconds").replace("+00:00", "Z")


def local_date(value: dt.datetime | None) -> str:
    if not value:
        return ""
    return value.astimezone(LOCAL_ZONE).date().isoformat()


def parse_lat_lng(value: str | None) -> tuple[float, float] | None:
    if not value:
        return None
    parts = value.replace("deg", "").replace("°", "").split(",")
    if len(parts) < 2:
        return None
    try:
        return float(parts[0].strip()), float(parts[1].strip())
    except ValueError:
        return None


def haversine_m(a_lat: float, a_lng: float, b_lat: float, b_lng: float) -> float:
    radius = 6371000.0
    p1 = math.radians(a_lat)
    p2 = math.radians(b_lat)
    dp = math.radians(b_lat - a_lat)
    dl = math.radians(b_lng - a_lng)
    h = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * radius * math.asin(math.sqrt(h))


def title_semantic(value: str) -> str:
    if not value:
        return "Unknown"
    return value.replace("_", " ").title()


def add_year_counter(summary: dict, year: int, key: str, amount: int = 1) -> None:
    bucket = summary.setdefault(str(year), {
        "year": year,
        "knownNights": 0,
        "homeNights": 0,
        "awayNights": 0,
        "awayPlaces": set(),
        "visitCount": 0,
        "mapActivityCount": 0,
    })
    bucket[key] += amount


def valid_lat_lng(lat: float, lng: float) -> bool:
    return -90 <= lat <= 90 and -180 <= lng <= 180


def iter_strings(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, dict):
        for item in value.values():
            yield from iter_strings(item)
    elif isinstance(value, list):
        for item in value:
            yield from iter_strings(item)


def coord_from_value(value) -> tuple[tuple[float, float] | None, str]:
    if isinstance(value, dict):
        lat_value = value.get("latitude", value.get("lat"))
        lng_value = value.get("longitude", value.get("lng", value.get("lon")))
        if lat_value is not None and lng_value is not None:
            try:
                lat = float(lat_value)
                lng = float(lng_value)
                if valid_lat_lng(lat, lng):
                    return (lat, lng), "structured_lat_lng"
            except (TypeError, ValueError):
                pass
    for text in iter_strings(value):
        decoded = unquote_plus(text)
        for lat_text, lng_text in COORD_RE.findall(decoded):
            lat = float(lat_text)
            lng = float(lng_text)
            if valid_lat_lng(lat, lng):
                return (lat, lng), "embedded_url_or_text"
    return None, ""


def activity_identity_key(entry: dict) -> str:
    identity = {
        "time": entry.get("time") or entry.get("timestamp") or "",
        "title": entry.get("title") or "",
        "titleUrl": entry.get("titleUrl") or entry.get("url") or "",
        "description": entry.get("description") or "",
    }
    payload = json.dumps(identity, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def activity_kind(entry: dict) -> str:
    title = str(entry.get("title") or "").lower()
    url = str(entry.get("titleUrl") or entry.get("url") or "").lower()
    if "directions to" in title or "/dir/" in url:
        return "directions"
    if "navigated to" in title or "navigation" in title:
        return "navigation"
    if "searched for" in title or "/search/" in url:
        return "search"
    if "viewed" in title or "/place/" in url:
        return "place_view"
    return "maps_activity"


def normalized_activity_label(entry: dict) -> str:
    for info in entry.get("locationInfos") or []:
        if not isinstance(info, dict):
            continue
        name = html.unescape(str(info.get("name") or info.get("title") or "")).strip()
        if name and name.lower() not in {"from your current location", "current location"}:
            return name
    title = html.unescape(str(entry.get("title") or "")).strip()
    prefixes = (
        "Viewed ",
        "Searched for ",
        "Directions to ",
        "Navigated to ",
        "Used Google Maps to navigate to ",
    )
    for prefix in prefixes:
        if title.startswith(prefix):
            title = title[len(prefix):].strip()
            break
    return title or "Maps activity"


def source_candidates() -> list[Path]:
    seen = set()
    paths = []
    for path in LOCAL_MAP_ACTIVITY_ZIPS + sorted(DRIVE_DOWNLOADS.glob("*.zip")):
        if not path.exists():
            continue
        resolved = path.resolve()
        if resolved in seen:
            continue
        seen.add(resolved)
        paths.append(path)
    return paths


def generic_place_label(label: str) -> bool:
    lowered = label.lower()
    return (
        lowered.startswith("unknown near ")
        or lowered.startswith("searched address near ")
        or lowered.startswith("inferred work near ")
        or lowered.startswith("aliased location near ")
        or lowered.startswith("overnight area near ")
    )


def load_osm_label_cache() -> dict[str, dict]:
    if not OSM_LABEL_CACHE.exists():
        return {}
    try:
        payload = json.loads(OSM_LABEL_CACHE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}
    return payload.get("places", {}) if isinstance(payload, dict) else {}


def load_osm_admin_cache() -> dict[str, dict]:
    if not OSM_ADMIN_CACHE.exists():
        return {}
    try:
        payload = json.loads(OSM_ADMIN_CACHE.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}
    return payload.get("places", {}) if isinstance(payload, dict) else {}


def first_address_value(address: dict, keys: tuple[str, ...]) -> str:
    for key in keys:
        value = str(address.get(key) or "").strip()
        if value:
            return value
    return ""


def county_from_address(address: dict) -> str:
    return first_address_value(address, (
        "county",
        "state_district",
        "city",
        "borough",
        "district",
        "municipality",
        "region",
        "state",
    ))


def locality_from_address(address: dict) -> str:
    return first_address_value(address, (
        "city",
        "town",
        "village",
        "hamlet",
        "municipality",
        "suburb",
        "neighbourhood",
        "quarter",
    ))


def admin_metadata_for_place(place_id: str, cache: dict[str, dict]) -> dict:
    cached = cache.get(place_id)
    if not isinstance(cached, dict):
        return {
            "adminDisplayName": "",
            "country": "",
            "countryCode": "",
            "county": "",
            "state": "",
            "district": "",
            "locality": "",
            "postcode": "",
            "road": "",
            "adminSource": "",
            "adminPlaceRank": None,
        }
    address = cached.get("address") if isinstance(cached.get("address"), dict) else {}
    return {
        "adminDisplayName": str(cached.get("displayName") or "").strip(),
        "country": str(address.get("country") or "").strip(),
        "countryCode": str(address.get("country_code") or "").upper(),
        "county": county_from_address(address),
        "state": str(address.get("state") or "").strip(),
        "district": first_address_value(address, ("state_district", "district", "borough", "city_district")),
        "locality": locality_from_address(address),
        "postcode": str(address.get("postcode") or "").strip(),
        "road": first_address_value(address, ("road", "pedestrian", "footway", "path")),
        "adminSource": str(cached.get("source") or "").strip(),
        "adminPlaceRank": cached.get("placeRank"),
    }


def home_distance_band(distance_km: float | None) -> str:
    if distance_km is None:
        return "Unknown"
    miles = distance_km / 1.609344
    if miles <= 1:
        return "Within 1 mi"
    if miles <= 5:
        return "1-5 mi"
    if miles <= 10:
        return "5-10 mi"
    if miles <= 25:
        return "10-25 mi"
    if miles <= 50:
        return "25-50 mi"
    if miles <= 100:
        return "50-100 mi"
    return "100+ mi"


def apply_osm_labels(place_map: dict[str, dict]) -> int:
    cache = load_osm_label_cache()
    applied = 0
    for place_id, place in place_map.items():
        cached = cache.get(place_id)
        if not isinstance(cached, dict):
            continue
        label = str(cached.get("label") or "").strip()
        confidence = str(cached.get("confidence") or "")
        if not label or confidence not in {"high", "medium"}:
            continue
        if not generic_place_label(place["label"]):
            continue
        place["originalLabel"] = place["label"]
        place["label"] = label
        place["geocodeSource"] = "OpenStreetMap"
        place["geocodeConfidence"] = confidence
        place["geocodeDistanceM"] = cached.get("distanceM")
        place["osmType"] = cached.get("osmType", "")
        place["osmId"] = cached.get("osmId", "")
        place["osmCategory"] = cached.get("category", "")
        applied += 1
    return applied


def extract_maps_activity(home_refs: list[tuple[float, float]], work_refs: list[tuple[float, float]], confirmed_places: list[dict]) -> tuple[list[dict], list[dict], list[dict]]:
    records: dict[str, dict] = {}
    source_summary = []

    for zip_path in source_candidates():
        summary = {
            "sourceFile": str(zip_path),
            "member": "",
            "status": "not_read",
            "rawRecords": 0,
            "uniqueRecordsAdded": 0,
            "duplicateRecords": 0,
            "mappedRecords": 0,
            "dateMin": "",
            "dateMax": "",
            "notes": "",
        }
        try:
            with zipfile.ZipFile(zip_path) as archive:
                members = [
                    name for name in archive.namelist()
                    if any(name.endswith(suffix) for suffix in MAP_ACTIVITY_MEMBER_SUFFIXES)
                ]
                if not members:
                    summary["status"] = "no_maps_activity"
                    source_summary.append(summary)
                    continue
                member = members[0]
                summary["member"] = member
                entries = json.loads(archive.read(member).decode("utf-8"))
        except (OSError, zipfile.BadZipFile, json.JSONDecodeError, UnicodeDecodeError) as exc:
            summary["status"] = "error"
            summary["notes"] = str(exc)
            source_summary.append(summary)
            continue

        if isinstance(entries, dict):
            entries = entries.get("activity") or entries.get("records") or entries.get("items") or []
        if not isinstance(entries, list):
            summary["status"] = "unsupported_shape"
            summary["notes"] = type(entries).__name__
            source_summary.append(summary)
            continue

        summary["status"] = "parsed"
        summary["rawRecords"] = len(entries)
        dates = []
        for entry in entries:
            if not isinstance(entry, dict):
                continue
            timestamp = parse_iso(entry.get("time") or entry.get("timestamp"))
            if timestamp:
                dates.append(iso_utc(timestamp))
            key = activity_identity_key(entry)
            coordinate, coord_source = coord_from_value(entry)
            raw_hash = hashlib.sha256(
                json.dumps(entry, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")
            ).hexdigest()
            if key not in records:
                summary["uniqueRecordsAdded"] += 1
                records[key] = {
                    "id": f"activity-{key[:12]}",
                    "key": key,
                    "timeUtc": iso_utc(timestamp),
                    "localDate": local_date(timestamp),
                    "year": timestamp.astimezone(LOCAL_ZONE).year if timestamp else "",
                    "title": str(entry.get("title") or ""),
                    "url": str(entry.get("titleUrl") or entry.get("url") or ""),
                    "description": str(entry.get("description") or ""),
                    "activityKind": activity_kind(entry),
                    "locationName": normalized_activity_label(entry),
                    "lat": round(coordinate[0], 7) if coordinate else None,
                    "lng": round(coordinate[1], 7) if coordinate else None,
                    "coordSource": coord_source,
                    "sourceFiles": set(),
                    "sourceMembers": set(),
                    "rawVariants": {},
                }
            else:
                summary["duplicateRecords"] += 1
            record = records[key]
            record["sourceFiles"].add(str(zip_path))
            record["sourceMembers"].add(member)
            record["rawVariants"][raw_hash] = entry
            if coordinate:
                summary["mappedRecords"] += 1
        if dates:
            summary["dateMin"] = min(dates)
            summary["dateMax"] = max(dates)
        source_summary.append(summary)

    activities = []
    for record in records.values():
        raw_variants = record.pop("rawVariants")
        source_files = sorted(record.pop("sourceFiles"))
        source_members = sorted(record.pop("sourceMembers"))
        record["sourceFiles"] = source_files
        record["sourceMembers"] = source_members
        record["sourceCount"] = len(source_files)
        record["rawVariantCount"] = len(raw_variants)
        record["hasCoordinates"] = record["lat"] is not None and record["lng"] is not None
        activities.append(record)
        record["_rawVariants"] = raw_variants

    activities.sort(key=lambda item: item["timeUtc"], reverse=True)
    MAP_ACTIVITY_CSV.parent.mkdir(parents=True, exist_ok=True)
    csv_fields = [
        "id", "timeUtc", "localDate", "year", "activityKind", "title", "locationName", "url",
        "description", "lat", "lng", "hasCoordinates", "coordSource", "sourceCount",
        "rawVariantCount", "sourceFiles",
    ]
    with MAP_ACTIVITY_CSV.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=csv_fields)
        writer.writeheader()
        for activity in activities:
            writer.writerow({field: json.dumps(activity[field], ensure_ascii=False) if field == "sourceFiles" else activity.get(field, "") for field in csv_fields})

    with MAP_ACTIVITY_JSONL.open("w", encoding="utf-8") as handle:
        for activity in activities:
            raw_variants = activity.pop("_rawVariants")
            payload = {
                **activity,
                "rawVariants": list(raw_variants.values()),
            }
            handle.write(json.dumps(payload, ensure_ascii=False, sort_keys=True) + "\n")

    MAP_ACTIVITY_SOURCES_JSON.write_text(json.dumps(source_summary, indent=2, ensure_ascii=False), encoding="utf-8")

    activity_places = []
    for activity in activities:
        if not activity["hasCoordinates"]:
            continue
        lat = activity["lat"]
        lng = activity["lng"]
        label = activity["locationName"] or "Maps activity"
        normalized_label = label.lower()
        place = None
        for candidate in activity_places:
            if candidate["_normalizedLabel"] == normalized_label and haversine_m(lat, lng, candidate["lat"], candidate["lng"]) <= PLACE_JOIN_RADIUS_M:
                place = candidate
                break
        if place is None:
            matched_confirmed = None
            best_distance = PLACE_JOIN_RADIUS_M
            for confirmed in confirmed_places:
                distance = haversine_m(lat, lng, confirmed["lat"], confirmed["lng"])
                if distance <= best_distance:
                    matched_confirmed = confirmed
                    best_distance = distance
            is_home = bool(matched_confirmed and matched_confirmed.get("isHome")) or any(haversine_m(lat, lng, hlat, hlng) <= HOME_RADIUS_M for hlat, hlng in home_refs)
            is_work = bool(matched_confirmed and matched_confirmed.get("isWork")) or any(haversine_m(lat, lng, wlat, wlng) <= HOME_RADIUS_M for wlat, wlng in work_refs)
            place = {
                "id": f"activity-place-{len(activity_places) + 1:04d}",
                "label": "Home" if is_home else "Work" if is_work else label,
                "_normalizedLabel": normalized_label,
                "lat": lat,
                "lng": lng,
                "isHome": is_home,
                "isWork": is_work,
                "confirmedPlaceId": matched_confirmed["id"] if matched_confirmed else "",
                "activityCount": 0,
                "directionsCount": 0,
                "navigationCount": 0,
                "searchCount": 0,
                "placeViewCount": 0,
                "firstSeen": "",
                "lastSeen": "",
                "sourceCount": 0,
                "_sourceFiles": set(),
            }
            activity_places.append(place)
        place["activityCount"] += 1
        if activity["activityKind"] == "directions":
            place["directionsCount"] += 1
        elif activity["activityKind"] == "navigation":
            place["navigationCount"] += 1
        elif activity["activityKind"] == "search":
            place["searchCount"] += 1
        elif activity["activityKind"] == "place_view":
            place["placeViewCount"] += 1
        activity["activityPlaceId"] = place["id"]
        activity["placeLabel"] = place["label"]
        activity["isHome"] = place["isHome"]
        activity["isWork"] = place["isWork"]
        if activity["timeUtc"]:
            place["firstSeen"] = min(filter(None, [place["firstSeen"], activity["timeUtc"][:10]]), default=activity["timeUtc"][:10])
            place["lastSeen"] = max(filter(None, [place["lastSeen"], activity["timeUtc"][:10]]), default=activity["timeUtc"][:10])
        place["_sourceFiles"].update(activity["sourceFiles"])

    for place in activity_places:
        place["sourceCount"] = len(place.pop("_sourceFiles"))
        place.pop("_normalizedLabel")
    activity_places.sort(key=lambda item: item["activityCount"], reverse=True)
    public_activities = [{key: value for key, value in activity.items() if key != "_rawVariants"} for activity in activities]
    return public_activities, activity_places, source_summary


def build() -> dict:
    if not TIMELINE_JSON.exists():
        raise SystemExit(f"Missing {TIMELINE_JSON}")
    if not POINTS_CSV.exists():
        raise SystemExit(f"Missing {POINTS_CSV}")

    timeline = json.loads(TIMELINE_JSON.read_text(encoding="utf-8"))
    home_refs: list[tuple[float, float]] = []
    work_refs: list[tuple[float, float]] = []

    for place in timeline.get("userLocationProfile", {}).get("frequentPlaces", []):
        point = parse_lat_lng(place.get("placeLocation"))
        if not point:
            continue
        label = (place.get("label") or "").upper()
        if label == "HOME":
            home_refs.append(point)
        elif label == "WORK":
            work_refs.append(point)

    place_map: dict[str, dict] = {}
    visits: list[dict] = []
    explicit_night_candidates: dict[str, list[dict]] = {}

    def get_or_create_place(place_id: str, semantic: str, lat: float, lng: float) -> dict:
        if place_id not in place_map:
            lower = semantic.upper()
            is_home = lower == "HOME" or any(haversine_m(lat, lng, hlat, hlng) <= HOME_RADIUS_M for hlat, hlng in home_refs)
            is_work = lower == "WORK" or any(haversine_m(lat, lng, wlat, wlng) <= HOME_RADIUS_M for wlat, wlng in work_refs)
            if lower == "HOME" or is_home:
                label = "Home"
            elif lower == "WORK" or is_work:
                label = "Work"
            else:
                label = f"{title_semantic(semantic)} near {lat:.4f}, {lng:.4f}"
            place_map[place_id] = {
                "id": place_id,
                "label": label,
                "semanticType": semantic or "UNKNOWN",
                "lat": lat,
                "lng": lng,
                "isHome": is_home,
                "isWork": is_work,
                "visitCount": 0,
                "totalVisitHours": 0.0,
                "overnightCount": 0,
                "awayOvernightCount": 0,
                "firstSeen": "",
                "lastSeen": "",
                "source": "timeline_visit",
                "examplePlaceId": place_id if place_id.startswith("Ch") else "",
                "originalLabel": "",
                "geocodeSource": "",
                "geocodeConfidence": "",
                "geocodeDistanceM": None,
                "osmType": "",
                "osmId": "",
                "osmCategory": "",
            }
        return place_map[place_id]

    for index, segment in enumerate(timeline.get("semanticSegments", [])):
        visit = segment.get("visit")
        if not visit:
            continue
        candidate = visit.get("topCandidate") or {}
        point = parse_lat_lng((candidate.get("placeLocation") or {}).get("latLng"))
        if not point:
            continue
        start = parse_iso(segment.get("startTime"))
        end = parse_iso(segment.get("endTime"))
        if not start or not end or end <= start:
            continue
        lat, lng = point
        semantic = candidate.get("semanticType") or "UNKNOWN"
        place_id = candidate.get("placeId") or candidate.get("placeID") or f"visit:{lat:.5f},{lng:.5f}"
        place = get_or_create_place(place_id, semantic, lat, lng)
        duration_hours = (end - start).total_seconds() / 3600
        place["visitCount"] += 1
        place["totalVisitHours"] += duration_hours
        place["firstSeen"] = min(filter(None, [place["firstSeen"], iso_utc(start)]), default=iso_utc(start))
        place["lastSeen"] = max(filter(None, [place["lastSeen"], iso_utc(end)]), default=iso_utc(end))
        if semantic.upper() == "HOME":
            home_refs.append((lat, lng))

        visit_record = {
            "id": f"visit-{index}",
            "placeId": place["id"],
            "placeLabel": place["label"],
            "semanticType": semantic,
            "startUtc": iso_utc(start),
            "endUtc": iso_utc(end),
            "startLocalDate": local_date(start),
            "durationHours": round(duration_hours, 2),
            "lat": round(lat, 7),
            "lng": round(lng, 7),
            "probability": round(float(visit.get("probability", 0) or 0), 3),
            "candidateProbability": round(float(candidate.get("probability", 0) or 0), 3),
            "isHome": place["isHome"],
        }
        visits.append(visit_record)

        start_local = start
        end_local = end
        date_cursor = start_local.date() - dt.timedelta(days=1)
        last_date = end_local.date()
        while date_cursor <= last_date:
            target_local = dt.datetime.combine(date_cursor + dt.timedelta(days=1), dt.time(3, 0), tzinfo=start_local.tzinfo)
            target_utc = target_local.astimezone(UTC)
            if start.astimezone(UTC) <= target_utc <= end.astimezone(UTC):
                explicit_night_candidates.setdefault(date_cursor.isoformat(), []).append({
                    "nightDate": date_cursor.isoformat(),
                    "placeId": place["id"],
                    "lat": lat,
                    "lng": lng,
                    "source": "timeline_visit_0300",
                    "score": duration_hours,
                })
            date_cursor += dt.timedelta(days=1)

    point_candidates: dict[str, dict] = {}
    included_point_types = {
        "location_sample",
        "timeline_raw_position",
        "timeline_path_point",
        "timeline_visit_place",
        "fit_location_sample",
    }
    with POINTS_CSV.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            if row["point_type"] not in included_point_types or not row["timestamp_utc"]:
                continue
            timestamp = parse_iso(row["timestamp_utc"])
            if not timestamp:
                continue
            local = timestamp.astimezone(LOCAL_ZONE)
            if local.hour > 6:
                continue
            night_date = (local.date() - dt.timedelta(days=1)).isoformat()
            target = dt.datetime.combine(local.date(), dt.time(3, 0), tzinfo=LOCAL_ZONE)
            distance_minutes = abs((local - target).total_seconds()) / 60
            if distance_minutes > 240:
                continue
            try:
                lat = float(row["latitude"])
                lng = float(row["longitude"])
            except ValueError:
                continue
            priority = {
                "timeline_visit_place": 0,
                "timeline_raw_position": 1,
                "location_sample": 2,
                "fit_location_sample": 3,
                "timeline_path_point": 4,
            }.get(row["point_type"], 5)
            score = distance_minutes + priority * 0.01
            current = point_candidates.get(night_date)
            if current is None or score < current["score"]:
                point_candidates[night_date] = {
                    "nightDate": night_date,
                    "lat": lat,
                    "lng": lng,
                    "source": f"point_{row['point_type']}",
                    "score": score,
                }

    def nearest_place(lat: float, lng: float, radius_m: float) -> dict | None:
        best = None
        best_distance = radius_m
        for place in place_map.values():
            distance = haversine_m(lat, lng, place["lat"], place["lng"])
            if distance <= best_distance:
                best = place
                best_distance = distance
        return best

    def create_overnight_place(lat: float, lng: float) -> dict:
        nearest = nearest_place(lat, lng, OVERNIGHT_CLUSTER_RADIUS_M)
        if nearest:
            return nearest
        place_id = f"overnight:{len(place_map) + 1:04d}"
        is_home = any(haversine_m(lat, lng, hlat, hlng) <= HOME_RADIUS_M for hlat, hlng in home_refs)
        label = "Home" if is_home else f"Overnight area near {lat:.4f}, {lng:.4f}"
        place_map[place_id] = {
            "id": place_id,
            "label": label,
            "semanticType": "HOME" if is_home else "OVERNIGHT_CLUSTER",
            "lat": lat,
            "lng": lng,
            "isHome": is_home,
            "isWork": False,
            "visitCount": 0,
            "totalVisitHours": 0.0,
            "overnightCount": 0,
            "awayOvernightCount": 0,
            "firstSeen": "",
            "lastSeen": "",
            "source": "overnight_point_cluster",
            "examplePlaceId": "",
            "originalLabel": "",
            "geocodeSource": "",
            "geocodeConfidence": "",
            "geocodeDistanceM": None,
            "osmType": "",
            "osmId": "",
            "osmCategory": "",
        }
        return place_map[place_id]

    overnights: list[dict] = []
    year_summary: dict[str, dict] = {}
    all_nights = sorted(set(explicit_night_candidates) | set(point_candidates))
    for night_date in all_nights:
        explicit = explicit_night_candidates.get(night_date)
        if explicit:
            candidate = max(explicit, key=lambda item: item["score"])
            place = place_map[candidate["placeId"]]
        else:
            candidate = point_candidates[night_date]
            place = nearest_place(candidate["lat"], candidate["lng"], PLACE_JOIN_RADIUS_M) or create_overnight_place(candidate["lat"], candidate["lng"])

        night_year = int(night_date[:4])
        place["overnightCount"] += 1
        if not place["isHome"]:
            place["awayOvernightCount"] += 1
        night_iso = f"{night_date}T03:00:00"
        place["firstSeen"] = min(filter(None, [place["firstSeen"], night_iso]), default=night_iso)
        place["lastSeen"] = max(filter(None, [place["lastSeen"], night_iso]), default=night_iso)

        add_year_counter(year_summary, night_year, "knownNights")
        if place["isHome"]:
            add_year_counter(year_summary, night_year, "homeNights")
        else:
            add_year_counter(year_summary, night_year, "awayNights")
            year_summary[str(night_year)]["awayPlaces"].add(place["id"])

        overnights.append({
            "id": f"night-{night_date}",
            "nightDate": night_date,
            "year": night_year,
            "placeId": place["id"],
            "placeLabel": place["label"],
            "lat": round(place["lat"], 7),
            "lng": round(place["lng"], 7),
            "isHome": place["isHome"],
            "source": candidate["source"],
        })

    for visit in visits:
        year = int(visit["startUtc"][:4])
        add_year_counter(year_summary, year, "visitCount")

    home_points = home_refs[:]
    def distance_from_home_km(place: dict) -> float | None:
        if not home_points:
            return None
        return min(haversine_m(place["lat"], place["lng"], hlat, hlng) for hlat, hlng in home_points) / 1000

    geocoded_place_count = apply_osm_labels(place_map)
    admin_cache = load_osm_admin_cache()
    for visit in visits:
        visit["placeLabel"] = place_map[visit["placeId"]]["label"]
    for night in overnights:
        night["placeLabel"] = place_map[night["placeId"]]["label"]

    places = []
    for place in place_map.values():
        if not place["visitCount"] and not place["overnightCount"]:
            continue
        distance = distance_from_home_km(place)
        admin = admin_metadata_for_place(place["id"], admin_cache)
        places.append({
            "id": place["id"],
            "label": place["label"],
            "semanticType": place["semanticType"],
            "lat": round(place["lat"], 7),
            "lng": round(place["lng"], 7),
            "isHome": place["isHome"],
            "isWork": place["isWork"],
            "visitCount": place["visitCount"],
            "totalVisitHours": round(place["totalVisitHours"], 1),
            "overnightCount": place["overnightCount"],
            "awayOvernightCount": place["awayOvernightCount"],
            "firstSeen": place["firstSeen"][:10],
            "lastSeen": place["lastSeen"][:10],
            "distanceFromHomeKm": None if distance is None else round(distance, 1),
            "distanceFromHomeMiles": None if distance is None else round(distance / 1.609344, 1),
            "homeDistanceBand": home_distance_band(distance),
            **admin,
            "source": place["source"],
            "examplePlaceId": place["examplePlaceId"],
            "originalLabel": place.get("originalLabel", ""),
            "geocodeSource": place.get("geocodeSource", ""),
            "geocodeConfidence": place.get("geocodeConfidence", ""),
            "geocodeDistanceM": place.get("geocodeDistanceM"),
            "osmType": place.get("osmType", ""),
            "osmId": place.get("osmId", ""),
            "osmCategory": place.get("osmCategory", ""),
        })

    map_activities, activity_places, activity_source_summary = extract_maps_activity(home_refs, work_refs, list(place_map.values()))
    for activity in map_activities:
        if activity["year"]:
            add_year_counter(year_summary, int(activity["year"]), "mapActivityCount")

    places.sort(key=lambda item: (item["awayOvernightCount"], item["overnightCount"], item["visitCount"], item["totalVisitHours"]), reverse=True)
    visits.sort(key=lambda item: item["startUtc"], reverse=True)
    overnights.sort(key=lambda item: item["nightDate"], reverse=True)

    summary = []
    for value in year_summary.values():
        value["awayPlaces"] = len(value["awayPlaces"])
        summary.append(value)
    summary.sort(key=lambda item: item["year"], reverse=True)

    away_nights = sum(item["awayNights"] for item in summary)
    home_nights = sum(item["homeNights"] for item in summary)
    return {
        "meta": {
            "generatedAt": iso_utc(dt.datetime.now(UTC)),
            "timezoneAssumption": "Europe/London for point-derived overnight detection",
            "overnightRule": "one night per date, preferring explicit Timeline visits covering 03:00 local time, otherwise the nearest deduplicated point between midnight and 06:00",
            "homeRule": f"Timeline HOME places plus user profile HOME coordinates, matched within {HOME_RADIUS_M}m",
            "sourceFiles": {
                "timeline": str(TIMELINE_JSON.relative_to(ROOT)),
                "points": str(POINTS_CSV.relative_to(ROOT)),
                "mapsActivityCsv": str(MAP_ACTIVITY_CSV.relative_to(ROOT)),
                "mapsActivityJsonl": str(MAP_ACTIVITY_JSONL.relative_to(ROOT)),
                "mapsActivitySources": str(MAP_ACTIVITY_SOURCES_JSON.relative_to(ROOT)),
                "osmLabelCache": str(OSM_LABEL_CACHE.relative_to(ROOT)),
                "osmAdminCache": str(OSM_ADMIN_CACHE.relative_to(ROOT)),
            },
        },
        "totals": {
            "places": len(places),
            "visits": len(visits),
            "overnights": len(overnights),
            "awayNights": away_nights,
            "homeNights": home_nights,
            "mapActivities": len(map_activities),
            "mappedMapActivities": sum(1 for item in map_activities if item["hasCoordinates"]),
            "activityPlaces": len(activity_places),
            "mapsActivitySources": len(activity_source_summary),
            "geocodedPlaces": geocoded_place_count,
            "adminGeocodedPlaces": sum(1 for item in places if item.get("county") or item.get("country")),
            "counties": len({item["county"] for item in places if item.get("county")}),
            "years": len(summary),
        },
        "places": places,
        "visits": visits,
        "overnights": overnights,
        "mapActivities": map_activities,
        "activityPlaces": activity_places,
        "sourceCoverage": activity_source_summary,
        "yearSummary": summary,
    }


def main() -> None:
    data = build()
    OUTPUT.write_text(
        "window.PLACES_DASHBOARD_DATA = "
        + json.dumps(data, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUTPUT}")
    print(json.dumps(data["totals"], indent=2))


if __name__ == "__main__":
    main()

import { Temporal } from "@js-temporal/polyfill";
import type { NumericInterval } from "./intervals.js";

export function dayInterval(date: string, timeZone: string): NumericInterval {
  const start = Temporal.PlainDate.from(date).toZonedDateTime({ timeZone, plainTime: "00:00" });
  const end = start.add({ days: 1 });
  return { startMs: start.epochMilliseconds, endMs: end.epochMilliseconds };
}

export function localParts(timestamp: string, timeZone: string): {
  date: string;
  year: number;
  month: number;
  dayOfWeek: number;
  hour: number;
} {
  const zoned = Temporal.Instant.from(timestamp).toZonedDateTimeISO(timeZone);
  return {
    date: zoned.toPlainDate().toString(),
    year: zoned.year,
    month: zoned.month,
    dayOfWeek: zoned.dayOfWeek,
    hour: zoned.hour,
  };
}

export function monthKey(timestamp: string, timeZone: string): string {
  const parts = localParts(timestamp, timeZone);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}`;
}

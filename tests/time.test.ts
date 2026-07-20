import { describe, expect, it } from "vitest";
import { dayInterval, localParts } from "../src/analytics/time.js";

describe("timezone-aware calendar intervals", () => {
  it("handles the 23-hour spring daylight-saving day", () => {
    const interval = dayInterval("2026-03-29", "Europe/London");
    expect(interval.endMs - interval.startMs).toBe(23 * 3_600_000);
  });

  it("handles the 25-hour autumn daylight-saving day", () => {
    const interval = dayInterval("2026-10-25", "Europe/London");
    expect(interval.endMs - interval.startMs).toBe(25 * 3_600_000);
  });

  it("groups instants in the selected timezone", () => {
    expect(localParts("2026-07-01T23:30:00Z", "Europe/London").date).toBe("2026-07-02");
    expect(localParts("2026-07-01T23:30:00Z", "America/New_York").date).toBe("2026-07-01");
  });
});

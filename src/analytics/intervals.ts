export interface NumericInterval {
  startMs: number;
  endMs: number;
}

export function durationMilliseconds(start: string | null, end: string | null): number | null {
  if (!start || !end) return null;
  const startMs = Date.parse(start);
  const endMs = Date.parse(end);
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs < startMs) return null;
  return endMs - startMs;
}

export function mergeIntervals(intervals: readonly NumericInterval[]): NumericInterval[] {
  const valid = intervals
    .filter(({ startMs, endMs }) => Number.isFinite(startMs) && Number.isFinite(endMs) && endMs >= startMs)
    .sort((left, right) => left.startMs - right.startMs || left.endMs - right.endMs);
  const merged: NumericInterval[] = [];
  for (const interval of valid) {
    const previous = merged.at(-1);
    if (!previous || interval.startMs > previous.endMs) {
      merged.push({ ...interval });
    } else {
      previous.endMs = Math.max(previous.endMs, interval.endMs);
    }
  }
  return merged;
}

export function coveredMilliseconds(intervals: readonly NumericInterval[]): number {
  return mergeIntervals(intervals).reduce((sum, interval) => sum + interval.endMs - interval.startMs, 0);
}

export function overlappingMilliseconds(left: NumericInterval, right: NumericInterval): number {
  return Math.max(0, Math.min(left.endMs, right.endMs) - Math.max(left.startMs, right.startMs));
}

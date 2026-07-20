export interface DistributionSummary {
  count: number;
  minimum: number | null;
  p10: number | null;
  p25: number | null;
  median: number | null;
  mean: number | null;
  p75: number | null;
  p90: number | null;
  p95: number | null;
  maximum: number | null;
  interquartileRange: number | null;
}

export function mean(values: readonly number[]): number | null {
  return values.length === 0 ? null : values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function percentile(values: readonly number[], probability: number): number | null {
  if (values.length === 0) return null;
  if (!Number.isFinite(probability) || probability < 0 || probability > 1) {
    throw new RangeError("Percentile probability must be between 0 and 1.");
  }
  const sorted = [...values].sort((left, right) => left - right);
  const position = (sorted.length - 1) * probability;
  const lowerIndex = Math.floor(position);
  const upperIndex = Math.ceil(position);
  const lower = sorted[lowerIndex] as number;
  const upper = sorted[upperIndex] as number;
  return lower + (upper - lower) * (position - lowerIndex);
}

export function median(values: readonly number[]): number | null {
  return percentile(values, 0.5);
}

export function percentileRank(values: readonly number[], value: number): number | null {
  if (values.length === 0) return null;
  const below = values.filter(candidate => candidate < value).length;
  const equal = values.filter(candidate => candidate === value).length;
  return ((below + equal * 0.5) / values.length) * 100;
}

export function summarizeDistribution(values: readonly number[]): DistributionSummary {
  const finite = values.filter(Number.isFinite);
  const p25 = percentile(finite, 0.25);
  const p75 = percentile(finite, 0.75);
  return {
    count: finite.length,
    minimum: finite.length ? Math.min(...finite) : null,
    p10: percentile(finite, 0.1),
    p25,
    median: median(finite),
    mean: mean(finite),
    p75,
    p90: percentile(finite, 0.9),
    p95: percentile(finite, 0.95),
    maximum: finite.length ? Math.max(...finite) : null,
    interquartileRange: p25 === null || p75 === null ? null : p75 - p25,
  };
}

export function movingAverage(values: readonly number[], windowSize: number): Array<number | null> {
  if (!Number.isInteger(windowSize) || windowSize < 1) throw new RangeError("Window size must be a positive integer.");
  return values.map((_, index) => {
    if (index + 1 < windowSize) return null;
    const window = values.slice(index + 1 - windowSize, index + 1);
    return mean(window);
  });
}

/**
 * Build-time number/string formatters that render `null` as an em-dash.
 *
 * Centralized so any page/component that loads degrade-to-null data (project
 * metrics, labs cells, future build-time fetchers) renders missing values
 * the same way, and consumers don't need to pre-check for null.
 */

export function formatUsd(value: number | null): string {
  if (value === null) {
    return "—";
  }
  if (value >= 1) {
    return `$${value.toFixed(2)}`;
  }
  if (value >= 0.01) {
    return `$${value.toFixed(3)}`;
  }
  return `$${value.toFixed(4)}`;
}

export function formatPct(value: number | null): string {
  if (value === null) {
    return "—";
  }
  return `${value.toFixed(0)}%`;
}

export function formatCount(value: number | null): string {
  if (value === null) {
    return "—";
  }
  return value.toLocaleString("en-US");
}

export function formatTokens(value: number | null): string {
  if (value === null) {
    return "—";
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}k`;
  }
  return String(value);
}

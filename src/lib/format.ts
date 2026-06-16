/**
 * Build-time number/string formatters that render `null` as an em-dash.
 *
 * Centralized so any page/component that loads degrade-to-null data (project
 * metrics, labs cells, future build-time fetchers) renders missing values
 * the same way, and consumers don't need to pre-check for null.
 */

import { SITE_TIMEZONE } from "./utils";

// Long human date in day-first order ("3 May 2026") for provenance/datelines.
// Single source of truth so every "compiled / summarized / last-run / updated"
// timestamp reads identically across the site (ProvenanceBadge, datelines).
const longDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: SITE_TIMEZONE,
});

export function formatLongDate(date: Date): string {
  return longDateFormatter.format(date);
}

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

/**
 * Split a composite headline-metric value ("89% · 103 claims") into the
 * numeral that renders at instrument-display size and the qualifier that
 * folds into the mono micro-label beneath it. Values without a separator
 * ("$3.19") pass through whole. The big number stays a number — a composite
 * wraps into a three-line stack at display sizes.
 */
export function splitMetricValue(value: string): {
  numeral: string;
  qualifier: string | null;
} {
  const [numeral, ...rest] = value.split("·");
  const qualifier = rest.join("·").trim();
  return {
    numeral: numeral.trim(),
    qualifier: qualifier.length > 0 ? qualifier : null,
  };
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

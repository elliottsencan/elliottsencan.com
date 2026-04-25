/**
 * Shared opacity ramps for the contribution visualizations (rail + grid).
 *
 * Both components key their cell intensity off these helpers so a change to
 * the ramp only needs to land in one place. Zero-contribution cells keep a
 * faint dot so the visualization reads as a continuous artifact rather than
 * a gappy one. Ramps are monotonically increasing.
 */

/**
 * Opacity for a week-level cell on the rail. `max` is the year's max week
 * total; pass at least 1 to avoid divide-by-zero on a fully empty calendar.
 */
export function opacityForWeek(weekTotal: number, max: number): number {
  if (weekTotal === 0) {
    return 0.15;
  }
  const ratio = weekTotal / Math.max(1, max);
  if (ratio <= 0.25) {
    return 0.55;
  }
  if (ratio <= 0.5) {
    return 0.7;
  }
  if (ratio <= 0.75) {
    return 0.85;
  }
  return 1;
}

/**
 * Opacity for a day-level cell on the heatmap grid. Wider 5-stop ramp than
 * the week version because day counts span a smaller range and zero days are
 * common — the bottom step needs to read as 'present but quiet', not absent.
 */
export function opacityForDay(dayCount: number, max: number): number {
  if (dayCount === 0) {
    return 0.15;
  }
  const ratio = dayCount / Math.max(1, max);
  if (ratio <= 0.25) {
    return 0.45;
  }
  if (ratio <= 0.5) {
    return 0.6;
  }
  if (ratio <= 0.75) {
    return 0.8;
  }
  return 1;
}

// Cluster-region hull geometry shared by ConstellationStrip and
// ConstellationLocal: convex hull → closed cardinal-spline path. Regions
// render via the stroke-offset "bubble" technique — the raw hull path is
// drawn with a fat round-joined stroke in the region color, so the pad is
// uniform along the boundary (the earlier centroid inflation produced
// cusp/teardrop artifacts on elongated hulls). Pure functions over
// viewBox-space points; the components decide membership, stroke pad
// (stroke-width = 2 × pad), and styling.

export type Pt = { x: number; y: number };

export function convexHull(points: Pt[]): Pt[] {
  if (points.length <= 1) {
    return points.slice();
  }
  const pts = points.slice().sort((p, q) => p.x - q.x || p.y - q.y);
  const cross = (o: Pt, a: Pt, b: Pt) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower: Pt[] = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }
  const upper: Pt[] = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

// Returns "" for fewer than 3 points — callers treat the empty path as
// "no region to draw" while still rendering the cluster's label.
export function smoothClosed(points: Pt[]): string {
  if (points.length < 3) {
    return "";
  }
  const n = points.length;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const t = 0.18;
    const c1x = p1.x + (p2.x - p0.x) * t;
    const c1y = p1.y + (p2.y - p0.y) * t;
    const c2x = p2.x - (p3.x - p1.x) * t;
    const c2y = p2.y - (p3.y - p1.y) * t;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return `${d} Z`;
}

// Region outline for the stroke-offset bubble. Two hull points yield an
// open segment — the round-capped fat stroke turns it into a clean
// capsule — so 2-member clusters get a real region. Collinear member
// sets reduce to 2 hull points and take the same branch. "" only when
// there's nothing to draw (fewer than 2 distinct hull points).
export function regionPath(points: Pt[]): string {
  const hull = convexHull(points);
  if (hull.length < 2) {
    return "";
  }
  if (hull.length === 2) {
    return `M ${hull[0].x} ${hull[0].y} L ${hull[1].x} ${hull[1].y}`;
  }
  return smoothClosed(hull);
}

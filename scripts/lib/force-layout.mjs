// Force-directed constellation layout — ported from the wiki-design bundle.
// Tiny custom solver; d3-force would be overkill at this scale (~10–30 nodes).
//
// Each iteration:
//   - all-pairs repulsion (1/d² falloff)
//   - spring forces along edges (Hooke's law toward a rest length)
//   - cluster gravity (nodes with the same `cluster` field pull together)
//   - center gravity (mild pull toward (cx, cy) so disconnected nodes don't drift)
// then integrates velocity with damping.
//
// `nodes` items mutate in place. Each must have `id, x, y, vx, vy, cluster` and
// optional `pinned` (frozen to its position) and `weight` (for downstream
// rendering only — solver doesn't use it).

export function step(nodes, edges, opts) {
  const {
    width,
    height,
    repulse = 4500,
    springK = 0.04,
    springLen = 130,
    damp = 0.78,
    gravity = 0.012,
    clusterPull = 0.02,
  } = opts;

  const cx = width / 2;
  const cy = height / 2;

  for (const n of nodes) {
    n.fx = 0;
    n.fy = 0;
  }

  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      let d2 = dx * dx + dy * dy;
      if (d2 < 1) {
        d2 = 1;
      }
      const f = repulse / d2;
      const d = Math.sqrt(d2);
      const fx = (dx / d) * f;
      const fy = (dy / d) * f;
      a.fx += fx;
      a.fy += fy;
      b.fx -= fx;
      b.fy -= fy;
    }
  }

  for (const e of edges) {
    const a = nodes.find((n) => n.id === e.a);
    const b = nodes.find((n) => n.id === e.b);
    if (!a || !b) {
      continue;
    }
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 1;
    const force = (d - springLen) * springK;
    const fx = (dx / d) * force;
    const fy = (dy / d) * force;
    a.fx += fx;
    a.fy += fy;
    b.fx -= fx;
    b.fy -= fy;
  }

  const clusters = {};
  for (const n of nodes) {
    const key = n.cluster ?? "_";
    if (!clusters[key]) {
      clusters[key] = { x: 0, y: 0, n: 0 };
    }
    clusters[key].x += n.x;
    clusters[key].y += n.y;
    clusters[key].n += 1;
  }
  for (const c of Object.values(clusters)) {
    c.x /= c.n;
    c.y /= c.n;
  }
  for (const n of nodes) {
    const c = clusters[n.cluster ?? "_"];
    n.fx += (c.x - n.x) * clusterPull;
    n.fy += (c.y - n.y) * clusterPull;
  }

  for (const n of nodes) {
    n.fx += (cx - n.x) * gravity;
    n.fy += (cy - n.y) * gravity;
  }

  const pad = 40;
  for (const n of nodes) {
    if (n.pinned) {
      continue;
    }
    n.vx = (n.vx + n.fx) * damp;
    n.vy = (n.vy + n.fy) * damp;
    n.x += n.vx;
    n.y += n.vy;
    n.x = Math.max(pad, Math.min(width - pad, n.x));
    n.y = Math.max(pad, Math.min(height - pad, n.y));
  }
}

export function run(initialNodes, edges, opts, iterations = 320) {
  const nodes = initialNodes.map((n) => ({ ...n, vx: 0, vy: 0 }));
  for (let i = 0; i < iterations; i++) {
    step(nodes, edges, opts);
  }
  return nodes;
}

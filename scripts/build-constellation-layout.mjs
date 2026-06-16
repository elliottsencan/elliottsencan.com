#!/usr/bin/env node

/**
 * Pre-solve the wiki constellation layout at build time.
 *
 * Reads every src/content/wiki/*.md, builds the edge set (two concepts are
 * connected if they share a source slug OR if either links to the other in
 * the body), runs the force-directed solver to a stable arrangement, then
 * writes src/data/constellation-layout.json. The site renders that JSON as
 * static SVG with no runtime JS.
 *
 * Two outputs in the same file:
 *   - `global` — the full graph at strip dimensions (used on /wiki).
 *   - `local[slug]` — per-concept (slug + 1-hop neighbors) at small square
 *     dimensions (used on /wiki/<slug>).
 *
 * Run via `pnpm build:constellation`. Wired as a `prebuild` hook so the
 * standard `pnpm build` always emits a fresh layout before astro:check runs.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { clusterById, clusters } from "../src/data/wiki-clusters.mjs";
import { step } from "./lib/force-layout.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const WIKI_DIR = join(ROOT, "src/content/wiki");
const OUT_PATH = join(ROOT, "src/data/constellation-layout.json");

// ─── parse frontmatter (no gray-matter on the site side) ──────────────────

/** Parse a tiny subset of YAML frontmatter — single-line strings, dates,
 *  and `key:\n  - item\n  - item` lists. Enough for wiki metadata. */
function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return { data: {}, body: text };
  }
  const yaml = match[1];
  const body = text.slice(match[0].length);
  const data = {};
  const lines = yaml.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const kv = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    if (!kv) {
      i += 1;
      continue;
    }
    const [, key, rest] = kv;
    if (rest === "") {
      // multi-line list
      const items = [];
      let j = i + 1;
      while (j < lines.length && /^\s+-\s+/.test(lines[j])) {
        items.push(
          lines[j]
            .replace(/^\s+-\s+/, "")
            .trim()
            .replace(/^['"]|['"]$/g, ""),
        );
        j += 1;
      }
      data[key] = items;
      i = j;
    } else {
      data[key] = rest.trim().replace(/^['"]|['"]$/g, "");
      i += 1;
    }
  }
  return { data, body };
}

// ─── load wiki entries ────────────────────────────────────────────────────

function loadWiki() {
  const files = readdirSync(WIKI_DIR).filter((f) => f.endsWith(".md"));
  return files.map((f) => {
    const id = f.replace(/\.md$/, "");
    const raw = readFileSync(join(WIKI_DIR, f), "utf8");
    const { data, body } = parseFrontmatter(raw);
    return {
      id,
      title: data.title ?? id,
      sources: Array.isArray(data.sources) ? data.sources : [],
      cluster: clusterById[id] ?? null,
      body,
    };
  });
}

// ─── edges ─────────────────────────────────────────────────────────────────

const WIKI_LINK_RE = /\[[^\]]*\]\(\/wiki\/([a-z0-9-]+)\/?(?:[#?][^)]*)?\)/g;
const FENCED_RE = /```[\s\S]*?```/g;
const INLINE_CODE_RE = /`[^`\n]*`/g;

// Body cross-links count double in `weight` because they're authorial intent
// (someone deliberately linked one concept to another). Co-citation is
// ambient — two concepts sharing a source is signal but not authorship.
const LINK_W = 2;
const COCITE_W = 1;

// `display` flag: which edges actually render. Solver still sees every edge
// (topology stays informed by all relationships), but weak co-citation pairs
// drop from the picture so the canvas reads as a backbone, not a hairball.
// Threshold of 2 = at least two shared sources (or one shared source plus
// one body link) — enough signal to suggest a real relationship.
const DISPLAY_WEIGHT = 2;

function buildEdges(entries) {
  const slugs = new Set(entries.map((e) => e.id));
  const edgeMap = new Map();
  const bump = (a, b, key) => {
    if (a === b) {
      return null;
    }
    const [lo, hi] = a < b ? [a, b] : [b, a];
    const k = `${lo}|${hi}`;
    let entry = edgeMap.get(k);
    if (!entry) {
      entry = { a: lo, b: hi, via: { link: 0, cocite: 0 } };
      edgeMap.set(k, entry);
    }
    entry.via[key] += 1;
    return entry;
  };

  // body cross-links
  for (const entry of entries) {
    const sanitized = entry.body.replace(FENCED_RE, "").replace(INLINE_CODE_RE, "");
    for (const m of sanitized.matchAll(WIKI_LINK_RE)) {
      const target = m[1];
      if (target && slugs.has(target)) {
        bump(entry.id, target, "link");
      }
    }
  }

  // co-citation: any two concepts that share a source
  const sourceMap = new Map();
  for (const entry of entries) {
    for (const s of entry.sources) {
      const list = sourceMap.get(s);
      if (list) {
        list.push(entry.id);
      } else {
        sourceMap.set(s, [entry.id]);
      }
    }
  }
  for (const list of sourceMap.values()) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        bump(list[i], list[j], "cocite");
      }
    }
  }

  const edges = [...edgeMap.values()].map((e) => ({
    ...e,
    weight: e.via.link * LINK_W + e.via.cocite * COCITE_W,
  }));

  // Two-pass display rule. First pass: edges that qualify on their own merit
  // (any authorial body link, or co-citation weight ≥ DISPLAY_WEIGHT).
  for (const e of edges) {
    e.display = e.via.link > 0 || e.weight >= DISPLAY_WEIGHT;
  }

  // Second pass: rescue any node that would otherwise have zero visible
  // edges by promoting its single highest-weighted edge. Keeps the graph
  // connected without re-introducing the hairball.
  const strongIncidentCount = new Map();
  for (const e of edges) {
    if (e.display) {
      strongIncidentCount.set(e.a, (strongIncidentCount.get(e.a) ?? 0) + 1);
      strongIncidentCount.set(e.b, (strongIncidentCount.get(e.b) ?? 0) + 1);
    }
  }
  const bestEdgeForNode = new Map();
  for (const e of edges) {
    for (const node of [e.a, e.b]) {
      if ((strongIncidentCount.get(node) ?? 0) > 0) {
        continue;
      }
      const cur = bestEdgeForNode.get(node);
      if (!cur || e.weight > cur.weight) {
        bestEdgeForNode.set(node, e);
      }
    }
  }
  for (const e of bestEdgeForNode.values()) {
    e.display = true;
  }

  return edges;
}

// ─── solvers ──────────────────────────────────────────────────────────────

/** djb2-xor hash of a slug, mapped to [0, 2π). Seeds jitter from identity
 *  rather than array index so adding one concept doesn't reshuffle the rest. */
function hashAngle(slug) {
  let h = 5381;
  for (let i = 0; i < slug.length; i++) {
    h = ((h * 33) ^ slug.charCodeAt(i)) >>> 0;
  }
  return (h / 4294967296) * Math.PI * 2;
}

function solveStrip(entries, edges, width = 800, height = 420) {
  const cx = width / 2;
  const cy = height / 2;
  // Seed each entry near a cluster-specific anchor so the force step has a
  // sensible starting point for separating neighborhoods. Cluster anchors
  // are spread evenly around the canvas; entries without a cluster start at
  // the global center and let the springs find them a home.
  const clusterAnchors = new Map();
  // Canonical cluster order (the exported `clusters` array), not
  // first-occurrence discovery order — anchor angles stay put as entries
  // come and go.
  const present = new Set(entries.map((e) => e.cluster).filter(Boolean));
  const clusterIds = clusters.map((c) => c.id).filter((cid) => present.has(cid));
  clusterIds.forEach((cid, i) => {
    const a = (i / clusterIds.length) * Math.PI * 2;
    clusterAnchors.set(cid, {
      x: cx + Math.cos(a) * (width * 0.36),
      y: cy + Math.sin(a) * (height * 0.36),
    });
  });

  const seeded = entries.map((e) => {
    const anchor = e.cluster ? clusterAnchors.get(e.cluster) : null;
    const baseX = anchor?.x ?? cx;
    const baseY = anchor?.y ?? cy;
    const jitter = hashAngle(e.id);
    return {
      id: e.id,
      x: baseX + Math.cos(jitter) * (width * 0.04),
      y: baseY + Math.sin(jitter) * (height * 0.04),
      vx: 0,
      vy: 0,
      cluster: e.cluster ?? "default",
      weight: e.sources.length,
    };
  });

  // Community-aware spring rest length: same-cluster edges keep neighborhoods
  // tight; cross-cluster edges relax to a longer rest length so distinct
  // neighborhoods push apart instead of collapsing into a single hairball.
  const clusterOf = new Map(seeded.map((n) => [n.id, n.cluster]));
  const springLenFor = (e) => (clusterOf.get(e.a) === clusterOf.get(e.b) ? 80 : 180);
  // Per-edge spring strength scales with edge weight: weak co-citation pairs
  // (weight 1) barely pull, strong ties (weight ≥ 3) pull at full strength.
  // Strong relationships dominate placement.
  const springKFor = (e) => 0.08 * Math.min(1, e.weight / 3);

  // Anneal: phase-1 firmly separates cluster regions before phase-2 lets
  // within-cluster structure relax. Without this, weakly-connected clusters
  // get tugged toward the center by springs and the hulls tangle.
  for (let it = 0; it < 80; it++) {
    step(seeded, edges, {
      width,
      height,
      repulse: 4200,
      springLen: 80,
      springK: 0.08,
      gravity: 0.075,
      clusterPull: 0.1,
      springLenFor,
      springKFor,
    });
  }
  for (let it = 0; it < 200; it++) {
    step(seeded, edges, {
      width,
      height,
      repulse: 4200,
      springLen: 80,
      springK: 0.08,
      gravity: 0.075,
      clusterPull: 0.03,
      springLenFor,
      springKFor,
    });
  }
  // Post-solve extent normalization: the solver tends to leave slack at the
  // box edges, so affinely rescale extents to fill [40, dim-40] (the kernel's
  // own clamp pad). Anisotropy is capped at 1.8 — the larger scale shrinks to
  // exactly that ratio and the slack centers — so clusters don't smear.
  const minX = Math.min(...seeded.map((n) => n.x));
  const maxX = Math.max(...seeded.map((n) => n.x));
  const minY = Math.min(...seeded.map((n) => n.y));
  const maxY = Math.max(...seeded.map((n) => n.y));
  let sx = (width - 80) / Math.max(1, maxX - minX);
  let sy = (height - 80) / Math.max(1, maxY - minY);
  if (sx / sy > 1.8) {
    sx = sy * 1.8;
  } else if (sy / sx > 1.8) {
    sy = sx * 1.8;
  }
  const offX = 40 + (width - 80 - (maxX - minX) * sx) / 2;
  const offY = 40 + (height - 80 - (maxY - minY) * sy) / 2;
  return seeded.map((n) => ({
    id: n.id,
    x: offX + (n.x - minX) * sx,
    y: offY + (n.y - minY) * sy,
    weight: n.weight,
  }));
}

// Hubs can have 30+ neighbors; past this the local square is unreadable.
// Keep the strongest ties and let the caption report the full count.
const MAX_LOCAL_NEIGHBORS = 14;

function solveLocal(activeId, _entries, allEdges, size = 200) {
  // Rank neighbors by total edge weight to the focus concept; ties break on
  // slug so the cut is deterministic.
  const weightByNeighbor = new Map();
  for (const e of allEdges) {
    const other = e.a === activeId ? e.b : e.b === activeId ? e.a : null;
    if (other) {
      weightByNeighbor.set(other, (weightByNeighbor.get(other) ?? 0) + e.weight);
    }
  }
  const neighborTotal = weightByNeighbor.size;
  const kept = [...weightByNeighbor.keys()]
    .sort((a, b) => weightByNeighbor.get(b) - weightByNeighbor.get(a) || (a < b ? -1 : 1))
    .slice(0, MAX_LOCAL_NEIGHBORS);
  const neighborSet = new Set([activeId, ...kept]);
  const ids = [...neighborSet];
  const subEdges = allEdges.filter((e) => neighborSet.has(e.a) && neighborSet.has(e.b));
  const cx = size / 2;
  const cy = size / 2;
  const seeded = ids.map((id, i) => {
    if (id === activeId) {
      return { id, x: cx, y: cy, vx: 0, vy: 0, cluster: "x", pinned: true };
    }
    const a = (i / ids.length) * Math.PI * 2;
    return {
      id,
      x: cx + Math.cos(a) * (size * 0.32),
      y: cy + Math.sin(a) * (size * 0.32),
      vx: 0,
      vy: 0,
      cluster: "x",
    };
  });
  // Local layout is single-cluster (everyone is a neighbor of the active
  // node) so cluster-aware spring length doesn't apply, but weight-aware
  // strength still does — strongly-cocited neighbors land closer.
  const springKFor = (e) => 0.12 * Math.min(1, e.weight / 3);
  for (let it = 0; it < 220; it++) {
    step(seeded, subEdges, {
      width: size,
      height: size,
      repulse: 1400,
      springLen: 42,
      springK: 0.12,
      gravity: 0.05,
      clusterPull: 0,
      springKFor,
    });
  }
  return {
    nodes: seeded.map((n) => ({
      id: n.id,
      x: Math.max(10, Math.min(size - 10, n.x)),
      y: Math.max(10, Math.min(size - 10, n.y)),
    })),
    edges: subEdges,
    neighborTotal,
  };
}

// ─── main ─────────────────────────────────────────────────────────────────

function main() {
  if (!existsSync(WIKI_DIR)) {
    console.warn(`[constellation] no wiki directory at ${WIKI_DIR}; emitting empty layout`);
    write({
      titles: {},
      clusters,
      clusterById: {},
      global: { nodes: [], edges: [] },
      local: {},
    });
    return;
  }

  const entries = loadWiki();
  if (entries.length === 0) {
    console.warn("[constellation] no wiki entries found; emitting empty layout");
    write({
      titles: {},
      clusters,
      clusterById: {},
      global: { nodes: [], edges: [] },
      local: {},
    });
    return;
  }

  const edges = buildEdges(entries);
  const stripNodes = solveStrip(entries, edges);
  const titleById = Object.fromEntries(entries.map((e) => [e.id, e.title]));

  // Emit cluster assignment for every loaded slug. Slugs missing from the
  // hand-curated map land as `null` — components render their nodes but
  // skip cluster-region work for them.
  const clusterByIdForEntries = Object.fromEntries(entries.map((e) => [e.id, e.cluster ?? null]));

  // Surface unmapped slugs so an editor can fold them into a cluster on the
  // next pass. Soft warning, not a build break.
  const unmapped = entries.filter((e) => !e.cluster).map((e) => e.id);
  if (unmapped.length > 0) {
    console.warn(
      `[constellation] ${unmapped.length} concept(s) without a cluster: ${unmapped.join(", ")} (add to src/data/wiki-clusters.mjs)`,
    );
  }

  const local = {};
  for (const entry of entries) {
    local[entry.id] = solveLocal(entry.id, entries, edges);
  }

  const payload = {
    titles: titleById,
    clusters,
    clusterById: clusterByIdForEntries,
    global: { nodes: stripNodes, edges },
    local,
  };
  write(payload);
  console.log(
    `[constellation] solved ${entries.length} concepts (${clusters.length} clusters), ${edges.length} edges → ${OUT_PATH}`,
  );
}

function write(payload) {
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);
}

main();

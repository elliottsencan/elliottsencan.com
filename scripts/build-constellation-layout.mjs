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
      body,
    };
  });
}

// ─── edges ─────────────────────────────────────────────────────────────────

const WIKI_LINK_RE = /\[[^\]]*\]\(\/wiki\/([a-z0-9-]+)\/?(?:[#?][^)]*)?\)/g;
const FENCED_RE = /```[\s\S]*?```/g;
const INLINE_CODE_RE = /`[^`\n]*`/g;

function buildEdges(entries) {
  const slugs = new Set(entries.map((e) => e.id));
  const edges = [];
  const seen = new Set();
  const add = (a, b) => {
    if (a === b) {
      return;
    }
    const k = a < b ? `${a}|${b}` : `${b}|${a}`;
    if (seen.has(k)) {
      return;
    }
    seen.add(k);
    edges.push({ a, b });
  };

  // body cross-links
  for (const entry of entries) {
    const sanitized = entry.body.replace(FENCED_RE, "").replace(INLINE_CODE_RE, "");
    for (const m of sanitized.matchAll(WIKI_LINK_RE)) {
      const target = m[1];
      if (target && slugs.has(target)) {
        add(entry.id, target);
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
        add(list[i], list[j]);
      }
    }
  }

  return edges;
}

// ─── solvers ──────────────────────────────────────────────────────────────

function solveStrip(entries, edges, width = 800, height = 420) {
  const cx = width / 2;
  const cy = height / 2;
  const seeded = entries.map((e, i) => {
    const a = (i / entries.length) * Math.PI * 2;
    return {
      id: e.id,
      x: cx + Math.cos(a) * (width * 0.32),
      y: cy + Math.sin(a) * (height * 0.32),
      vx: 0,
      vy: 0,
      cluster: e.cluster ?? "default",
      weight: e.sources.length,
    };
  });
  // Gravity is intentionally firm. With weaker pulls, weakly-connected
  // concepts get punted to the canvas walls by repulsion and pin there,
  // leaving a sparse central cluster surrounded by stranded outliers.
  // A stronger center pull keeps the layout cohesive so the rendered
  // box frames a single legible cluster.
  for (let it = 0; it < 280; it++) {
    step(seeded, edges, {
      width,
      height,
      repulse: 4200,
      springLen: 80,
      springK: 0.08,
      gravity: 0.075,
      clusterPull: 0.005,
    });
  }
  return seeded.map((n) => ({
    id: n.id,
    x: Math.max(20, Math.min(width - 20, n.x)),
    y: Math.max(16, Math.min(height - 16, n.y)),
    weight: n.weight,
  }));
}

function solveLocal(activeId, _entries, allEdges, size = 200) {
  const neighborSet = new Set([activeId]);
  for (const e of allEdges) {
    if (e.a === activeId) {
      neighborSet.add(e.b);
    }
    if (e.b === activeId) {
      neighborSet.add(e.a);
    }
  }
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
  for (let it = 0; it < 220; it++) {
    step(seeded, subEdges, {
      width: size,
      height: size,
      repulse: 1400,
      springLen: 42,
      springK: 0.12,
      gravity: 0.05,
      clusterPull: 0,
    });
  }
  return {
    nodes: seeded.map((n) => ({
      id: n.id,
      x: Math.max(10, Math.min(size - 10, n.x)),
      y: Math.max(10, Math.min(size - 10, n.y)),
    })),
    edges: subEdges,
  };
}

// ─── main ─────────────────────────────────────────────────────────────────

function main() {
  if (!existsSync(WIKI_DIR)) {
    console.warn(`[constellation] no wiki directory at ${WIKI_DIR}; emitting empty layout`);
    write({ generated_at: new Date().toISOString(), global: { nodes: [], edges: [] }, local: {} });
    return;
  }

  const entries = loadWiki();
  if (entries.length === 0) {
    console.warn("[constellation] no wiki entries found; emitting empty layout");
    write({ generated_at: new Date().toISOString(), global: { nodes: [], edges: [] }, local: {} });
    return;
  }

  const edges = buildEdges(entries);
  const stripNodes = solveStrip(entries, edges);
  const titleById = Object.fromEntries(entries.map((e) => [e.id, e.title]));

  const local = {};
  for (const entry of entries) {
    local[entry.id] = solveLocal(entry.id, entries, edges);
  }

  const payload = {
    generated_at: new Date().toISOString(),
    titles: titleById,
    global: { nodes: stripNodes, edges },
    local,
  };
  write(payload);
  console.log(
    `[constellation] solved ${entries.length} concepts, ${edges.length} edges → ${OUT_PATH}`,
  );
}

function write(payload) {
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);
}

main();

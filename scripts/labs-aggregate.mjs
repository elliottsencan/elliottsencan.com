#!/usr/bin/env node
/**
 * labs-aggregate — derive the corpus-backed labs data files at build time.
 *
 * Reads `compile_cost` (added in PR #27) from every reading + wiki entry
 * and writes the aggregated measurements that the corpus-derived lab cells
 * read at build. Hand-snapshotted labs (e.g. human-judged evals) are
 * untouched — this script only writes JSON files it knows how to compute.
 *
 * Currently emits:
 *   src/content/labs/data/ingest-pipeline-cost.json
 *     Shape: { values: number[], weeks: string[], generated_at, source }
 *     Sum of compile_cost.cost_usd across reading + wiki, bucketed by ISO
 *     week of compiled_at. Sparkline reads `values`.
 *
 * Run via `pnpm labs:aggregate`. Wired into `pnpm build` so CI always
 * regenerates from the live corpus before astro:check runs.
 *
 * Empty-corpus behavior: if no entries carry compile_cost yet (e.g.
 * pre-/recompile-all state), `values` is `[]` and the Sparkline renders
 * an empty viewBox. That's the honest state — the cell's frontmatter
 * `status: draft` flags it as awaiting first data.
 */

import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { formatISO, startOfISOWeek } from "date-fns";
import yaml from "js-yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const READING_DIR = join(ROOT, "src/content/reading");
const WIKI_DIR = join(ROOT, "src/content/wiki");
const OUT_DIR = join(ROOT, "src/content/labs/data");

function* walkMd(dir) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".")) {
      continue;
    }
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      yield* walkMd(path);
    } else if (name.endsWith(".md")) {
      yield path;
    }
  }
}

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return null;
  }
  try {
    return yaml.load(match[1]);
  } catch {
    return null;
  }
}

function collectCostRecords() {
  const records = [];
  for (const file of [...walkMd(READING_DIR), ...walkMd(WIKI_DIR)]) {
    const fm = parseFrontmatter(readFileSync(file, "utf8"));
    if (!fm) {
      continue;
    }
    const cost = fm.compile_cost?.cost_usd;
    if (typeof cost !== "number") {
      continue;
    }
    const compiledAt = fm.compiled_at;
    if (!compiledAt) {
      continue;
    }
    const date = compiledAt instanceof Date ? compiledAt : new Date(compiledAt);
    if (Number.isNaN(date.valueOf())) {
      continue;
    }
    records.push({ cost_usd: cost, compiled_at: date });
  }
  return records;
}

function bucketByISOWeek(records) {
  const buckets = new Map();
  for (const r of records) {
    const weekStart = formatISO(startOfISOWeek(r.compiled_at), { representation: "date" });
    buckets.set(weekStart, (buckets.get(weekStart) ?? 0) + r.cost_usd);
  }
  // Sort weeks ascending. ISO date strings sort lexically.
  return [...buckets.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function writeIngestPipelineCost(records) {
  const buckets = bucketByISOWeek(records);
  const payload = {
    generated_at: new Date().toISOString(),
    source:
      "Aggregated from compile_cost in src/content/reading/**/*.md + src/content/wiki/*.md by scripts/labs-aggregate.mjs.",
    record_count: records.length,
    weeks: buckets.map(([start]) => start),
    // Round to four decimals — sub-cent precision per Anthropic billing.
    values: buckets.map(([, sum]) => Math.round(sum * 10_000) / 10_000),
  };
  const out = join(OUT_DIR, "ingest-pipeline-cost.json");
  writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return { out, payload };
}

mkdirSync(OUT_DIR, { recursive: true });

const records = collectCostRecords();
const { out, payload } = writeIngestPipelineCost(records);
console.log(`[labs-aggregate] ${records.length} records → ${payload.weeks.length} weeks → ${out}`);

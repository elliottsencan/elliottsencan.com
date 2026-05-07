#!/usr/bin/env node
/**
 * labs-aggregate — derive corpus-backed labs data files at build time.
 *
 * Reads `compile_cost` from every reading + wiki entry and writes the
 * aggregated measurements that corpus-derived lab cells read at build.
 * Hand-snapshotted labs (e.g. human-judged evals) are untouched — this
 * script only writes JSON files it knows how to compute.
 *
 * Currently emits:
 *   src/content/labs/data/ingest-pipeline-cost.json
 *     Shape: {
 *       summary: { stats[], total_cost_usd, record_count, ... },
 *       by_day:   [{ date,       cost_usd, count }],
 *       by_week:  [{ week_start, cost_usd, count }],
 *       by_model: [{ model,      cost_usd, count }],
 *       values:   number[]   // daily cost series for the chart kind
 *     }
 *
 * Buckets are computed in Pacific time (`SITE_TIMEZONE`) so the output is
 * deterministic across build machines (a Pacific laptop and a UTC CI
 * runner produce the same buckets) and matches the worker's day-boundary
 * intent — the worker stamps `compiled_at` from Pacific wallclock.
 *
 * Run via `pnpm labs:aggregate`. Wired into `pnpm build` (so CI always
 * regenerates from the live corpus before astro:check runs) and into
 * `pnpm predev` (so the file exists before astro dev imports it).
 */

import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { startOfISOWeek } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import yaml from "js-yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const READING_DIR = join(ROOT, "src/content/reading");
const WIKI_DIR = join(ROOT, "src/content/wiki");
const OUT_DIR = join(ROOT, "src/content/labs/data");
const SITE_TZ = "America/Los_Angeles";

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

function pacificDateStr(date) {
  return formatInTimeZone(date, SITE_TZ, "yyyy-MM-dd");
}

// ISO week start (Monday) for the Pacific date the timestamp falls on.
// We pin to the Pacific date first so a UTC instant just past midnight
// (which is still the previous evening Pacific) buckets with its Pacific
// day rather than the next UTC day's week.
function pacificWeekStartStr(date) {
  const [y, m, d] = pacificDateStr(date).split("-").map(Number);
  const local = new Date(y, m - 1, d);
  const monday = startOfISOWeek(local);
  const my = monday.getFullYear();
  const mm = String(monday.getMonth() + 1).padStart(2, "0");
  const md = String(monday.getDate()).padStart(2, "0");
  return `${my}-${mm}-${md}`;
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
    const model = fm.compile_cost?.model ?? "unknown";
    records.push({ cost_usd: cost, compiled_at: date, model });
  }
  return records;
}

function bucketBy(records, keyFn) {
  const buckets = new Map();
  for (const r of records) {
    const key = keyFn(r);
    const slot = buckets.get(key) ?? { cost_usd: 0, count: 0 };
    slot.cost_usd += r.cost_usd;
    slot.count += 1;
    buckets.set(key, slot);
  }
  return buckets;
}

function bucketsAsArray(buckets, keyName) {
  return [...buckets.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => ({
      [keyName]: k,
      cost_usd: Math.round(v.cost_usd * 10_000) / 10_000,
      count: v.count,
    }));
}

function formatUsd(n) {
  if (n >= 10) {
    return `$${n.toFixed(2)}`;
  }
  if (n >= 1) {
    return `$${n.toFixed(2)}`;
  }
  if (n >= 0.01) {
    return `$${n.toFixed(3)}`;
  }
  return `$${n.toFixed(4)}`;
}

function writeIngestPipelineCost(records) {
  const byDay = bucketBy(records, (r) => pacificDateStr(r.compiled_at));
  const byWeek = bucketBy(records, (r) => pacificWeekStartStr(r.compiled_at));
  const byModel = bucketBy(records, (r) => r.model);

  const dailyArr = bucketsAsArray(byDay, "date");
  const weeklyArr = bucketsAsArray(byWeek, "week_start");
  const modelArr = bucketsAsArray(byModel, "model");

  const total = records.reduce((s, r) => s + r.cost_usd, 0);
  const sortedTimes = records.map((r) => r.compiled_at).sort((a, b) => a - b);
  const avg = records.length > 0 ? total / records.length : 0;

  const stats = [
    { label: "Total spent", value: formatUsd(Math.round(total * 10_000) / 10_000) },
    { label: "Records", value: String(records.length) },
    { label: "Avg / record", value: formatUsd(Math.round(avg * 10_000) / 10_000) },
    { label: "Models", value: String(modelArr.length) },
  ];

  const payload = {
    generated_at: new Date().toISOString(),
    source:
      "Aggregated from compile_cost in src/content/reading/**/*.md + src/content/wiki/*.md by scripts/labs-aggregate.mjs.",
    summary: {
      stats,
      total_cost_usd: Math.round(total * 10_000) / 10_000,
      record_count: records.length,
      avg_per_record_usd: Math.round(avg * 10_000) / 10_000,
      first_compiled_at: sortedTimes[0]?.toISOString() ?? null,
      last_compiled_at: sortedTimes.at(-1)?.toISOString() ?? null,
    },
    by_day: dailyArr,
    by_week: weeklyArr,
    by_model: modelArr,
    // Daily cost series — fed straight to the chart kind's sparkline so a
    // sparse few days still reads as motion rather than a single point.
    values: dailyArr.map((d) => d.cost_usd),
  };

  const out = join(OUT_DIR, "ingest-pipeline-cost.json");
  writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return { out, payload };
}

function writeCitationFaithfulness() {
  // If the sidecar is absent, drop a `status: "no-data"` sentinel so the
  // labs cell renders a placeholder without failing the build. The sentinel
  // is committed so git-tracked output stays deterministic.
  //
  // If the real sidecar exists, append a `derived` block (per-judge accuracy,
  // headline agreement) so the labs cell renders without recomputing on every
  // page load. Derived numbers are pure functions of the sidecar — no
  // `generated_at` baked in — so a rebuild with no input change produces an
  // identical file (no `git diff`).
  //
  // Distinguish ENOENT (cold start) from other read/parse failures: only the
  // missing case is "expected"; corruption or permission errors should fail
  // the build loudly rather than be papered over with a sentinel.
  const sidecarPath = join(OUT_DIR, "citation-faithfulness.json");
  let raw;
  try {
    raw = readFileSync(sidecarPath, "utf8");
  } catch (err) {
    if (err && err.code === "ENOENT") {
      const sentinel = {
        status: "no-data",
        message:
          "POST /eval has not run yet — the sidecar will populate on the first non-dry-run pass.",
      };
      writeFileSync(sidecarPath, `${JSON.stringify(sentinel, null, 2)}\n`, "utf8");
      return { out: sidecarPath, status: "sentinel" };
    }
    throw new Error(`failed to read ${sidecarPath}: ${err?.message ?? err}`);
  }
  let sidecar;
  try {
    sidecar = JSON.parse(raw);
  } catch (err) {
    throw new Error(`failed to parse ${sidecarPath}: ${err?.message ?? err}`);
  }
  if (sidecar.status === "no-data") {
    // Sentinel already in place; leave it untouched. No churn.
    return { out: sidecarPath, status: "sentinel-preserved" };
  }
  if (!Array.isArray(sidecar.articles)) {
    return { out: sidecarPath, status: "skip-malformed" };
  }
  const judges = new Map();
  let totalAgreementClaims = 0;
  let totalAgree = 0;
  for (const article of sidecar.articles) {
    if (Array.isArray(article.judges)) {
      for (const judge of article.judges) {
        const name = judge.judge_model;
        if (!name) {
          continue;
        }
        const slot = judges.get(name) ?? {
          model: name,
          supported: 0,
          partial: 0,
          unsupported: 0,
          claims: 0,
          cost_usd: 0,
        };
        const sum = judge.summary ?? {};
        slot.supported += Number(sum.supported ?? 0);
        slot.partial += Number(sum.partial ?? 0);
        slot.unsupported += Number(sum.unsupported ?? 0);
        slot.claims += Array.isArray(judge.claims) ? judge.claims.length : 0;
        slot.cost_usd += Number(sum.total_cost_usd ?? 0);
        judges.set(name, slot);
      }
    }
    if (article.judge_agreement) {
      totalAgreementClaims += Number(article.judge_agreement.total_claims ?? 0);
      totalAgree += Number(article.judge_agreement.agree ?? 0);
    }
  }
  const judgeArr = [...judges.values()]
    .sort((a, b) => a.model.localeCompare(b.model))
    .map((j) => {
      const total = j.supported + j.partial + j.unsupported;
      const accuracy = total === 0 ? 0 : ((j.supported + 0.5 * j.partial) / total) * 100;
      return {
        model: j.model,
        claims: j.claims,
        supported: j.supported,
        partial: j.partial,
        unsupported: j.unsupported,
        accuracy_pct: Math.round(accuracy * 100) / 100,
        cost_usd: Math.round(j.cost_usd * 10_000) / 10_000,
      };
    });
  const agreementPct =
    totalAgreementClaims === 0 ? 0 : Math.round((totalAgree / totalAgreementClaims) * 10_000) / 100;
  const enriched = {
    ...sidecar,
    derived: {
      headline_agreement_pct: agreementPct,
      total_agreement_claims: totalAgreementClaims,
      judges: judgeArr,
    },
  };
  const next = `${JSON.stringify(enriched, null, 2)}\n`;
  if (next === raw) {
    return { out: sidecarPath, status: "unchanged", articles: sidecar.articles.length };
  }
  writeFileSync(sidecarPath, next, "utf8");
  return { out: sidecarPath, status: "enriched", articles: sidecar.articles.length };
}

mkdirSync(OUT_DIR, { recursive: true });

const records = collectCostRecords();
const { out, payload } = writeIngestPipelineCost(records);
console.log(
  `[labs-aggregate] ${records.length} records → ${payload.by_day.length} day(s), ${payload.by_week.length} week(s) → ${out}`,
);

const cf = writeCitationFaithfulness();
console.log(`[labs-aggregate] citation-faithfulness: ${cf.status} → ${cf.out}`);

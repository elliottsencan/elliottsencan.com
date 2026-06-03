#!/usr/bin/env node
/**
 * labs-aggregate — derive corpus-backed labs data files at build time.
 *
 * The ingest-pipeline-cost rollup is the site's all-in AI-spend ledger. It
 * folds three sources of Anthropic cost:
 *   1. `compile_cost` frontmatter on every reading entry (`/link` summaries)
 *      and wiki entry (`/synthesize` compiles) — immutable, one per entry.
 *   2. Per-judge `summary.total_cost_usd` in the citation-faithfulness
 *      sidecar (`/eval`).
 *   3. Per-URL `cost_usd` in the topic-stability A/B sidecar.
 * Sources (2) and (3) are sidecars that re-run in place, so they contribute
 * their *most recent* run's cost (the sidecar only retains the latest), not
 * every run ever — unlike the per-entry compile costs which accumulate.
 * Hand-snapshotted labs (e.g. human-judged evals) are untouched — this
 * script only writes JSON files it knows how to compute.
 *
 * Currently emits:
 *   src/content/labs/data/ingest-pipeline-cost.json
 *     Shape: {
 *       summary:   { stats[], total_cost_usd, record_count, ... },
 *       by_day:    [{ date,       cost_usd, count }],
 *       by_week:   [{ week_start, cost_usd, count }],
 *       by_model:  [{ model,      cost_usd, count }],
 *       by_source: [{ source,     cost_usd, count }],  // summarize/compile/eval/topic-stability
 *       values:    number[]   // daily cost series for the chart kind
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

import {
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
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

// `compile_cost` from reading (`/link` summaries) + wiki (`/synthesize`
// compiles). One immutable record per entry, tagged by which surface produced
// it so the rollup can break spend down "by what it went on".
function collectCompileCostRecords() {
  const records = [];
  for (const [dir, source] of [
    [READING_DIR, "reading-summary"],
    [WIKI_DIR, "wiki-compile"],
  ]) {
    for (const file of walkMd(dir)) {
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
      const date =
        compiledAt instanceof Date ? compiledAt : new Date(compiledAt);
      if (Number.isNaN(date.valueOf())) {
        continue;
      }
      const model = fm.compile_cost?.model ?? "unknown";
      records.push({ cost_usd: cost, compiled_at: date, model, source });
    }
  }
  return records;
}

// Read a labs sidecar JSON best-effort. These are folded into the cost rollup
// as an enrichment, so a missing/sentinel/malformed sidecar degrades to "no
// records" rather than failing the build. (The sidecar's *own* lab cell still
// validates loudly elsewhere — here we only want its cost numbers if present.)
function readSidecarJson(name) {
  let raw;
  try {
    raw = readFileSync(join(OUT_DIR, name), "utf8");
  } catch (err) {
    if (err && err.code === "ENOENT") {
      return null;
    }
    console.warn(
      `[labs-aggregate] cost-fold: skipping ${name} (${err?.message ?? err})`,
    );
    return null;
  }
  let json;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    console.warn(
      `[labs-aggregate] cost-fold: ${name} is not valid JSON (${err?.message ?? err})`,
    );
    return null;
  }
  return json && json.status === "no-data" ? null : json;
}

// Per-judge cost from the citation-faithfulness sidecar (`/eval`). Each
// (article, judge) pair is one record, dated at the article's `evaluated_at`
// and attributed to the judge model so it shows up in `by_model` too.
function collectEvalCostRecords() {
  const sidecar = readSidecarJson("citation-faithfulness.json");
  if (!sidecar || !Array.isArray(sidecar.articles)) {
    return [];
  }
  const records = [];
  for (const article of sidecar.articles) {
    const when = article.evaluated_at ?? sidecar.generated_at;
    const date = when ? new Date(when) : null;
    if (!date || Number.isNaN(date.valueOf())) {
      continue;
    }
    for (const judge of article.judges ?? []) {
      const cost = Number(judge.summary?.total_cost_usd ?? 0);
      if (!(cost > 0)) {
        continue;
      }
      records.push({
        cost_usd: cost,
        compiled_at: date,
        model: judge.judge_model ?? "unknown",
        source: "citation-eval",
      });
    }
  }
  return records;
}

// Per-URL cost from the topic-stability A/B sidecar (each URL is POSTed to
// `/link` twice, priors on vs off). No model is recorded in that sidecar, so
// these land under `model: "unknown"` — the `by_source` split is what makes
// them legible. Dated at the run's `generated_at` (no per-URL timestamp).
function collectTopicStabilityCostRecords() {
  const sidecar = readSidecarJson("topic-stability.json");
  if (!sidecar || !Array.isArray(sidecar.per_url)) {
    return [];
  }
  const date = sidecar.generated_at ? new Date(sidecar.generated_at) : null;
  if (!date || Number.isNaN(date.valueOf())) {
    return [];
  }
  const records = [];
  for (const entry of sidecar.per_url) {
    const c = entry.cost_usd ?? {};
    for (const cost of [c.priors_on, c.priors_off]) {
      const n = Number(cost ?? 0);
      if (!(n > 0)) {
        continue;
      }
      records.push({
        cost_usd: n,
        compiled_at: date,
        model: "unknown",
        source: "topic-stability",
      });
    }
  }
  return records;
}

function collectCostRecords() {
  return [
    ...collectCompileCostRecords(),
    ...collectEvalCostRecords(),
    ...collectTopicStabilityCostRecords(),
  ];
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
  const bySource = bucketBy(records, (r) => r.source ?? "unknown");

  const dailyArr = bucketsAsArray(byDay, "date");
  const weeklyArr = bucketsAsArray(byWeek, "week_start");
  const modelArr = bucketsAsArray(byModel, "model");
  const sourceArr = bucketsAsArray(bySource, "source");

  const total = records.reduce((s, r) => s + r.cost_usd, 0);
  const sortedTimes = records.map((r) => r.compiled_at).sort((a, b) => a - b);
  const avg = records.length > 0 ? total / records.length : 0;

  // Stats here are the *supporting* numbers under the headline "Spent so
  // far" — so we deliberately don't repeat the total here. Models count
  // is suppressed when degenerate (single model = no signal).
  const stats = [
    { label: "Records", value: String(records.length) },
    {
      label: "Avg / record",
      value: formatUsd(Math.round(avg * 10_000) / 10_000),
    },
  ];
  if (modelArr.length > 1) {
    stats.push({ label: "Models", value: String(modelArr.length) });
  }
  const headlineValue = formatUsd(Math.round(total * 10_000) / 10_000);

  const payload = {
    generated_at: new Date().toISOString(),
    source:
      "Aggregated by scripts/labs-aggregate.mjs from compile_cost in src/content/reading/**/*.md + src/content/wiki/*.md, plus per-judge cost in the citation-faithfulness sidecar (/eval) and per-URL cost in the topic-stability sidecar. Sidecar costs reflect their latest run; compile costs accumulate per entry.",
    // Hypothesis line — surfaces the dashed "$5/mo target" on the
    // cumulative chart. Static; if the budget assumption ever changes,
    // change the cell's hypothesis prose and this number in tandem.
    budget: 5,
    // Pulled up so the caller can sync the cell's `headlineMetric.value`
    // without having to dig into `summary.stats[0]`.
    headlineValue,
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
    // Spend "by what it went on" — summarize vs compile vs eval vs
    // topic-stability. The literal version of the cell's prose claim.
    by_source: sourceArr,
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
      writeFileSync(
        sidecarPath,
        `${JSON.stringify(sentinel, null, 2)}\n`,
        "utf8",
      );
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
      const accuracy =
        total === 0 ? 0 : ((j.supported + 0.5 * j.partial) / total) * 100;
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
    totalAgreementClaims === 0
      ? 0
      : Math.round((totalAgree / totalAgreementClaims) * 10_000) / 100;
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
    return {
      out: sidecarPath,
      status: "unchanged",
      articles: sidecar.articles.length,
    };
  }
  writeFileSync(sidecarPath, next, "utf8");
  return {
    out: sidecarPath,
    status: "enriched",
    articles: sidecar.articles.length,
  };
}

/**
 * Idempotently rewrite a lab MD's `headlineMetric.value` frontmatter
 * field. The function inspects only the frontmatter region (between the
 * `---` fences); the body and other frontmatter fields are untouched.
 * Returns the operation status so the caller can log "updated"
 * vs "unchanged" without re-reading the file.
 *
 * Why hand-roll instead of `gray-matter`: that dep isn't in site
 * package.json (it's a worker-only dep), and the regex over the
 * headlineMetric block is short enough that adding a dep isn't worth
 * it. Pattern: `headlineMetric:` followed by indented `label:`/`value:`
 * lines in any order, with `value:` being the one we replace.
 */
function syncLabHeadline(mdPath, newValue) {
  let raw;
  try {
    raw = readFileSync(mdPath, "utf8");
  } catch (err) {
    if (err && err.code === "ENOENT") {
      return { status: "missing" };
    }
    throw err;
  }
  if (!raw.startsWith("---\n")) {
    return { status: "no-frontmatter" };
  }
  const fmEnd = raw.indexOf("\n---", 4);
  if (fmEnd === -1) {
    return { status: "no-frontmatter" };
  }
  const fm = raw.slice(4, fmEnd);
  // headlineMetric: is a block scalar; its `value:` line is indented under it.
  // Match the indented `value: <text>` that follows headlineMetric:'s opening.
  const pattern =
    /(headlineMetric:\n(?:[ \t]+\w+: [^\n]*\n)*?[ \t]+value: )([^\n]+)/;
  const m = pattern.exec(fm);
  if (!m) {
    return { status: "no-value-field" };
  }
  if (m[2] === newValue) {
    return { status: "unchanged", value: m[2] };
  }
  // Use a replacer function so $-tokens in `newValue` (like `$1.86`) aren't
  // interpreted as backreferences by String.replace. The string form would
  // corrupt the file.
  const updatedFm = fm.replace(
    pattern,
    (_match, prefix) => `${prefix}${newValue}`,
  );
  const updated = `---\n${updatedFm}${raw.slice(fmEnd)}`;
  writeFileSync(mdPath, updated, "utf8");
  return { status: "updated", from: m[2], to: newValue };
}

mkdirSync(OUT_DIR, { recursive: true });

const records = collectCostRecords();
const { out, payload } = writeIngestPipelineCost(records);
console.log(
  `[labs-aggregate] ${records.length} records → ${payload.by_day.length} day(s), ${payload.by_week.length} week(s) → ${out}`,
);
// Headline = "Spent so far" = total spend, formatted. Keep the MD in sync
// with the freshly written sidecar so the page header and the chart match.
const ingestMd = join(ROOT, "src/content/labs/ingest-pipeline-cost.md");
const ingestSync = syncLabHeadline(ingestMd, payload.headlineValue);
console.log(
  `[labs-aggregate] ingest-pipeline-cost headline: ${ingestSync.status}`,
);

const cf = writeCitationFaithfulness();
console.log(`[labs-aggregate] citation-faithfulness: ${cf.status} → ${cf.out}`);
// Mirror the same sync for citation-faithfulness when there's real data;
// while the sentinel is in place, leave the MD's "TBD" alone.
if (cf.status === "enriched" || cf.status === "unchanged") {
  const cfRaw = JSON.parse(readFileSync(cf.out, "utf8"));
  const pct = cfRaw.derived?.headline_agreement_pct;
  if (typeof pct === "number") {
    const cfMd = join(ROOT, "src/content/labs/citation-faithfulness.md");
    const cfSync = syncLabHeadline(cfMd, `${pct}%`);
    console.log(
      `[labs-aggregate] citation-faithfulness headline: ${cfSync.status}`,
    );
  }
}

#!/usr/bin/env node
/**
 * topic-stability-ab — A/B driver for /link's `topic_priors` flag.
 *
 * Two modes, both POST to /link with `dry_run: true` (no commits, no
 * threshold-trigger spawn):
 *
 *   --corpus N (default)    Sample N URLs across src/content/reading/.
 *                           Captures each entry's original `topics` from
 *                           frontmatter so the run also measures how often
 *                           priors-on recovers the slugs production
 *                           originally produced.
 *   --fixture PATH          Read URLs from a checked-in JSON list. Use this
 *                           when probing URLs the corpus hasn't seen.
 *
 * Per URL the script POSTs twice — once with topic_priors:true and once
 * with topic_priors:false — captures topics_committed + cost, then writes
 * a sidecar JSON the blog post + /labs/topic-stability cell read.
 *
 * Why dry_run is required: every /link normally commits a reading entry
 * to main. Running an A/B over N URLs × 2 cells would otherwise pollute
 * the reading corpus with 2N duplicate entries.
 *
 * Defaults to local (http://localhost:8787 via `wrangler dev`); --remote
 * flips to the deployed worker. Both spend Anthropic tokens.
 *
 * Flags:
 *   --remote           hit the deployed worker instead of localhost
 *   --corpus N         sample N corpus URLs (default 20)
 *   --fixture PATH     URL-list fixture override (disables corpus mode)
 *   --output PATH      override the sidecar destination
 *   --no-write         compute and print summary; skip writing the sidecar
 *   --verbose          per-call logging
 *   --help / -h
 */

import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import yaml from "js-yaml";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const READING_DIR = resolve(REPO_ROOT, "src/content/reading");
const DEFAULT_OUTPUT = resolve(REPO_ROOT, "src/content/labs/data/topic-stability.json");
const LOCAL_BASE_URL = "http://localhost:8787";
const DEFAULT_REMOTE_URL = "https://site-ingest.elliottsencan.workers.dev";
const DEFAULT_CORPUS_N = 20;

const HELP = `topic-stability-ab — A/B driver for /link topic_priors

Usage:
  scripts/topic-stability-ab.mjs [--remote] [--corpus N | --fixture PATH]
                                 [--output PATH] [--no-write] [--verbose]

Default mode samples ${DEFAULT_CORPUS_N} URLs across src/content/reading/.
Reads SITE_INGEST_API_TOKEN from .env or the environment.
Default output: src/content/labs/data/topic-stability.json
`;

function loadEnvFile() {
  const envPath = resolve(REPO_ROOT, ".env");
  let raw;
  try {
    raw = readFileSync(envPath, "utf8");
  } catch {
    return;
  }
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

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
  return yaml.load(match[1]);
}

/**
 * Walk src/content/reading/**, pull every entry's url + topics, then
 * stride-sample N items spread across the full corpus (so a 20-entry
 * sample over 87 entries hits roughly every fourth one rather than the
 * 20 most recent). Sort order is path-ascending — paths are
 * `<YYYY-MM>/<isoTimestamp>-<slug>.md` so this is also chronological
 * order, which keeps the sample deterministic across runs.
 *
 * Skips entries with no `topics` field (opt-out stubs, which have
 * `noindex: true` and an empty topics array).
 */
function sampleCorpus(n) {
  const entries = [];
  for (const path of walkMd(READING_DIR)) {
    const text = readFileSync(path, "utf8");
    const fm = parseFrontmatter(text);
    if (!fm || typeof fm.url !== "string") {
      continue;
    }
    if (fm.noindex === true) {
      continue;
    }
    const topics = Array.isArray(fm.topics) ? fm.topics.filter((t) => typeof t === "string") : [];
    if (topics.length === 0) {
      continue;
    }
    entries.push({
      path: path.replace(`${REPO_ROOT}/`, ""),
      url: fm.url,
      topics,
    });
  }
  entries.sort((a, b) => a.path.localeCompare(b.path));
  if (entries.length <= n) {
    return entries;
  }
  // Stride sample: pick every kth entry, plus the very last so the most
  // recent ingest is always in the sample.
  const stride = Math.max(1, Math.floor(entries.length / n));
  const sampled = [];
  for (let i = 0; i < entries.length && sampled.length < n - 1; i += stride) {
    sampled.push(entries[i]);
  }
  sampled.push(entries[entries.length - 1]);
  return sampled;
}

async function callLink({ baseUrl, token, url, topic_priors, verbose }) {
  const body = { url, topic_priors, dry_run: true };
  if (verbose) {
    process.stderr.write(`POST ${baseUrl}/link priors=${topic_priors} url=${url}\n`);
  }
  const res = await fetch(`${baseUrl}/link`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let parsed = null;
  try {
    parsed = text.length > 0 ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }
  if (!res.ok) {
    const msg = parsed?.error ?? text;
    throw new Error(`HTTP ${res.status}: ${msg}`);
  }
  return parsed;
}

function jaccard(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  const intersection = new Set([...A].filter((x) => B.has(x)));
  const union = new Set([...A, ...B]);
  return union.size === 0 ? 1 : intersection.size / union.size;
}

function setDiff(a, b) {
  const B = new Set(b);
  return a.filter((x) => !B.has(x)).sort();
}

/**
 * Recovery rate measures how many of an entry's original topic slugs
 * appear in the A/B cell's predicted slugs. |predicted ∩ original| /
 * |original|. Used to score the "self-correcting drift" claim: with
 * priors on, the model should recover most of the original slugs; with
 * priors off it should recover fewer (the model is free to coin).
 */
function recovery(predicted, original) {
  if (original.length === 0) {
    return { rate: 1, recovered: [] };
  }
  const P = new Set(predicted);
  const recovered = original.filter((t) => P.has(t)).sort();
  return { rate: recovered.length / original.length, recovered };
}

async function main() {
  const { values } = parseArgs({
    options: {
      remote: { type: "boolean" },
      corpus: { type: "string" },
      fixture: { type: "string" },
      output: { type: "string" },
      "no-write": { type: "boolean" },
      verbose: { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
    strict: true,
  });

  if (values.help) {
    process.stdout.write(HELP);
    return;
  }

  loadEnvFile();
  const token = process.env.SITE_INGEST_API_TOKEN;
  if (!token) {
    process.stderr.write("error: SITE_INGEST_API_TOKEN not set. Add to .env or export it.\n");
    process.exit(1);
  }
  const baseUrl = values.remote
    ? process.env.SITE_INGEST_BASE_URL || DEFAULT_REMOTE_URL
    : LOCAL_BASE_URL;

  /**
   * `mode` is "corpus" by default; --fixture switches to fixture mode.
   * `targets` is an array of { url, topics?, path? } — topics + path are
   * present only in corpus mode and drive the recovery-rate stats.
   */
  let mode;
  let targets;
  let fixtureLabel;
  if (values.fixture) {
    mode = "fixture";
    const fixturePath = resolve(values.fixture);
    const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
    if (!Array.isArray(fixture.urls)) {
      throw new Error(`fixture at ${fixturePath} is missing a urls[] array`);
    }
    targets = fixture.urls.map((url) => ({ url }));
    fixtureLabel = fixturePath.replace(`${REPO_ROOT}/`, "");
  } else {
    mode = "corpus";
    const n = values.corpus ? Number.parseInt(values.corpus, 10) : DEFAULT_CORPUS_N;
    if (!Number.isFinite(n) || n <= 0) {
      throw new Error(`--corpus N must be a positive integer; got ${values.corpus}`);
    }
    targets = sampleCorpus(n);
    fixtureLabel = `corpus-sample(n=${n}, src/content/reading/)`;
  }

  process.stderr.write(
    `topic-stability A/B: mode=${mode} targets=${targets.length} against ${baseUrl}\n`,
  );

  const perUrl = [];
  let totalCostWithPriors = 0;
  let totalCostWithoutPriors = 0;
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  const errors = [];

  for (const target of targets) {
    try {
      const on = await callLink({
        baseUrl,
        token,
        url: target.url,
        topic_priors: true,
        verbose: values.verbose,
      });
      const off = await callLink({
        baseUrl,
        token,
        url: target.url,
        topic_priors: false,
        verbose: values.verbose,
      });
      const topicsOn = on.topics_committed ?? [];
      const topicsOff = off.topics_committed ?? [];
      const costOn = on.cost?.cost_usd ?? 0;
      const costOff = off.cost?.cost_usd ?? 0;
      totalCostWithPriors += costOn;
      totalCostWithoutPriors += costOff;
      totalInputTokens +=
        (on.cost?.usage?.input_tokens ?? 0) + (off.cost?.usage?.input_tokens ?? 0);
      totalOutputTokens +=
        (on.cost?.usage?.output_tokens ?? 0) + (off.cost?.usage?.output_tokens ?? 0);

      const entry = {
        url: target.url,
        ...(target.path ? { source_path: target.path } : {}),
        ...(target.topics ? { original_topics: target.topics } : {}),
        priors_on: topicsOn,
        priors_off: topicsOff,
        jaccard_on_vs_off: Number(jaccard(topicsOn, topicsOff).toFixed(4)),
        added_without_priors: setDiff(topicsOff, topicsOn),
        dropped_without_priors: setDiff(topicsOn, topicsOff),
        cost_usd: { priors_on: costOn, priors_off: costOff },
      };

      if (target.topics) {
        const recOn = recovery(topicsOn, target.topics);
        const recOff = recovery(topicsOff, target.topics);
        entry.recovery_priors_on = {
          rate: Number(recOn.rate.toFixed(4)),
          recovered: recOn.recovered,
          missed: setDiff(target.topics, topicsOn),
        };
        entry.recovery_priors_off = {
          rate: Number(recOff.rate.toFixed(4)),
          recovered: recOff.recovered,
          missed: setDiff(target.topics, topicsOff),
        };
      }
      perUrl.push(entry);

      const recLine = target.topics
        ? ` rec-on=${(entry.recovery_priors_on.rate * 100).toFixed(0)}% rec-off=${(entry.recovery_priors_off.rate * 100).toFixed(0)}%`
        : "";
      process.stderr.write(
        `  ✓ ${target.url}\n    on:  ${topicsOn.join(", ")}\n    off: ${topicsOff.join(", ")}\n    jaccard=${entry.jaccard_on_vs_off}${recLine} cost=$${(costOn + costOff).toFixed(4)}\n`,
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push({ url: target.url, error: message });
      process.stderr.write(`  ✗ ${target.url}: ${message}\n`);
    }
  }

  const allOn = perUrl.flatMap((e) => e.priors_on);
  const allOff = perUrl.flatMap((e) => e.priors_off);
  const distinctOn = [...new Set(allOn)].sort();
  const distinctOff = [...new Set(allOff)].sort();
  const corpusJaccard = jaccard(distinctOn, distinctOff);
  const avgJaccard =
    perUrl.length === 0
      ? null
      : Number((perUrl.reduce((a, e) => a + e.jaccard_on_vs_off, 0) / perUrl.length).toFixed(4));

  // Recovery stats only mean something when targets came with original_topics.
  const recoveryEntries = perUrl.filter((e) => e.original_topics);
  const avgRecoveryOn =
    recoveryEntries.length === 0
      ? null
      : Number(
          (
            recoveryEntries.reduce((a, e) => a + e.recovery_priors_on.rate, 0) /
            recoveryEntries.length
          ).toFixed(4),
        );
  const avgRecoveryOff =
    recoveryEntries.length === 0
      ? null
      : Number(
          (
            recoveryEntries.reduce((a, e) => a + e.recovery_priors_off.rate, 0) /
            recoveryEntries.length
          ).toFixed(4),
        );

  // Top-level `stats` is what /labs/topic-stability's `kind: stat` reads.
  // Same numbers as summary but in label/value pairs the StatGrid renders
  // verbatim. Recovery rows are omitted when the run was fixture-mode (no
  // original_topics → recovery is undefined).
  const stats = [];
  if (avgRecoveryOn !== null) {
    stats.push({
      label: "Recovery with priors",
      value: `${(avgRecoveryOn * 100).toFixed(1)}%`,
    });
    stats.push({
      label: "Recovery without priors",
      value: `${(avgRecoveryOff * 100).toFixed(1)}%`,
    });
  }
  stats.push({ label: "Distinct slugs (priors on)", value: String(distinctOn.length) });
  stats.push({ label: "Distinct slugs (priors off)", value: String(distinctOff.length) });
  if (avgJaccard !== null) {
    stats.push({ label: "Per-URL Jaccard (on vs off)", value: avgJaccard.toFixed(2) });
  }
  stats.push({
    label: "Total cost",
    value: `$${(totalCostWithPriors + totalCostWithoutPriors).toFixed(2)}`,
  });

  // Per-sample friendly label for the comparison strip. Reading entries
  // carry path `src/content/reading/<YYYY-MM>/<isoTimestamp>-<slug>.md` — we
  // strip the timestamp and clamp to keep the strip tidy. Fixture-mode
  // targets fall back to a short hostname/path token.
  const labelFromPath = (srcPath) => {
    const base = srcPath.split("/").pop().replace(/\.md$/, "");
    const m = base.match(/^\d{4}-\d{2}-\d{2}T\d{6}-(.+)$/);
    const slug = m ? m[1] : base;
    return slug.length > 44 ? `${slug.slice(0, 41)}...` : slug;
  };
  const labelFromUrl = (url) => {
    try {
      const u = new URL(url.split("\n")[0]);
      const host = u.hostname.replace(/^www\./, "");
      const last = u.pathname.replace(/\/$/, "").split("/").filter(Boolean).pop() || host;
      return last.length > 30 ? `${last.slice(0, 27)}...` : last;
    } catch {
      return "(url)";
    }
  };

  // Comparison shape — paired-bar headline metrics + per-sample strip. The
  // /labs/topic-stability cell renders this directly. Recovery rows are only
  // present when the run was corpus-mode (fixture-mode has no ground truth).
  const recoverySamples = perUrl
    .filter((e) => e.recovery_priors_on && e.recovery_priors_off)
    .map((e) => ({
      label: e.source_path ? labelFromPath(e.source_path) : labelFromUrl(e.url),
      with_priors: e.recovery_priors_on.rate,
      without_priors: e.recovery_priors_off.rate,
    }));

  const comparisonMetrics = [];
  if (avgRecoveryOn !== null && avgRecoveryOff !== null) {
    comparisonMetrics.push({
      label: "Recovery rate",
      with_priors: avgRecoveryOn,
      without_priors: avgRecoveryOff,
      format: "percent",
      better: "higher",
      caption: "share of original slugs recovered",
    });
  }
  comparisonMetrics.push({
    label: "Distinct slugs",
    with_priors: distinctOn.length,
    without_priors: distinctOff.length,
    format: "int",
    better: "lower",
    caption: "lower = less fragmentation",
  });
  if (avgJaccard !== null) {
    comparisonMetrics.push({
      label: "Per-URL Jaccard",
      with_priors: avgJaccard,
      without_priors: null,
      format: "decimal",
      single: true,
      caption: "set overlap between cells",
    });
  }

  const comparison = {
    legend: { left: "WITH PRIORS", right: "WITHOUT PRIORS" },
    metrics: comparisonMetrics,
    samples: recoverySamples,
    stripLabel: `Per-sample recovery (n=${recoverySamples.length})`,
  };

  const sidecar = {
    generated_at: new Date().toISOString(),
    source:
      "Generated by scripts/topic-stability-ab.mjs. Each URL was POSTed to /link twice (topic_priors:true vs false) with dry_run:true.",
    mode,
    sample: fixtureLabel,
    base_url: baseUrl,
    stats,
    comparison,
    summary: {
      url_count: perUrl.length,
      error_count: errors.length,
      distinct_topics_priors_on: distinctOn.length,
      distinct_topics_priors_off: distinctOff.length,
      distinct_delta: distinctOff.length - distinctOn.length,
      corpus_jaccard: Number(corpusJaccard.toFixed(4)),
      avg_per_url_jaccard: avgJaccard,
      avg_recovery_priors_on: avgRecoveryOn,
      avg_recovery_priors_off: avgRecoveryOff,
      total_cost_usd: Number((totalCostWithPriors + totalCostWithoutPriors).toFixed(4)),
      total_cost_priors_on_usd: Number(totalCostWithPriors.toFixed(4)),
      total_cost_priors_off_usd: Number(totalCostWithoutPriors.toFixed(4)),
      total_input_tokens: totalInputTokens,
      total_output_tokens: totalOutputTokens,
    },
    distinct_topics: {
      priors_on: distinctOn,
      priors_off: distinctOff,
      only_with_priors_on: setDiff(distinctOn, distinctOff),
      only_with_priors_off: setDiff(distinctOff, distinctOn),
    },
    per_url: perUrl,
    errors,
  };

  const recLine =
    avgRecoveryOn !== null
      ? `  avg recovery: priors-on=${(avgRecoveryOn * 100).toFixed(1)}% priors-off=${(avgRecoveryOff * 100).toFixed(1)}%\n`
      : "";
  process.stderr.write(
    `\nsummary: ${perUrl.length} URLs, ${errors.length} errors\n` +
      `  distinct slugs: priors-on=${distinctOn.length} priors-off=${distinctOff.length} delta=${distinctOff.length - distinctOn.length}\n` +
      `  corpus jaccard=${corpusJaccard.toFixed(4)} avg-per-url=${avgJaccard ?? "n/a"}\n` +
      recLine +
      `  total cost: $${(totalCostWithPriors + totalCostWithoutPriors).toFixed(4)} (on=$${totalCostWithPriors.toFixed(4)} off=$${totalCostWithoutPriors.toFixed(4)})\n`,
  );

  if (values["no-write"]) {
    process.stderr.write("--no-write: skipping sidecar write\n");
    process.stdout.write(`${JSON.stringify(sidecar, null, 2)}\n`);
    return;
  }
  const outputPath = values.output ? resolve(values.output) : DEFAULT_OUTPUT;
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(sidecar, null, 2)}\n`);
  process.stderr.write(`wrote ${outputPath.replace(`${REPO_ROOT}/`, "")}\n`);
}

main().catch((err) => {
  process.stderr.write(`error: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * wiki-surface-eval — offline, deterministic, $0 eval of the wiki surfacer.
 *
 * A separate feature surfaces relevant wiki concepts while you code: an
 * on-demand `/wiki` command plus an auto-surface hook that injects a note on
 * every prompt. The hook spends context tokens unprompted, so it is
 * NET-HURTFUL when it fires on irrelevant prompts. This eval measures the
 * surfacer's precision and — the headline — its false-positive ("nag") rate,
 * then recommends the threshold the hook should fire at.
 *
 * The scorer is pure lexical (no model calls), so this run is deterministic
 * and costs $0. It loads the scorer from a sibling repo via --scorer; if that
 * file does not exist yet (it's built in parallel) the eval does NOT crash —
 * it writes a `{ status: "no-data" }`-style pending sidecar so the lab cell
 * renders its methodology card, and reports that running is pending.
 *
 * Scorer contract (assets/wiki/wiki-query.cjs):
 *   module.exports = { loadConcepts, score, query }
 *   query(text, { wikiDir, limit, threshold }) ->
 *     [{ slug, title, summary, url, score }] sorted desc, score in [0,1].
 *   loadConcepts(wikiDir) resolves <wikiDir>/src/content/wiki/*.md or
 *     <wikiDir>/*.md.
 *
 * Flags:
 *   --scorer PATH     path to wiki-query.cjs (default sibling 2ts-claude repo)
 *   --wiki-dir DIR    dir the scorer reads concepts from (default this repo
 *                     root, so the scorer resolves src/content/wiki)
 *   --threshold T     restrict the sweep to a single threshold
 *   --out PATH        sidecar destination (default
 *                     src/content/labs/data/wiki-surface-precision.json)
 *   --no-write        compute + print; skip writing the sidecar
 *   --help / -h
 */

import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const FIXTURE_PATH = resolve(SCRIPT_DIR, "fixtures/wiki-surface-prompts.json");
const DEFAULT_SCORER = resolve(
  REPO_ROOT,
  "../2ts-claude/plugins/2ts-claude/assets/wiki/wiki-query.cjs",
);
const DEFAULT_OUT = resolve(REPO_ROOT, "src/content/labs/data/wiki-surface-precision.json");
const DEFAULT_SWEEP = [0.15, 0.25, 0.35, 0.45];
const QUERY_LIMIT = 5;

const HELP = `wiki-surface-eval — offline $0 eval of the wiki surfacer

Usage:
  scripts/wiki-surface-eval.mjs [--scorer PATH] [--wiki-dir DIR]
                                [--threshold T] [--out PATH] [--no-write]

Measures the surfacer's precision and false-positive (nag) rate across a
threshold sweep over labeled dev prompts, and recommends a firing threshold.
Deterministic, no model calls, $0. If the scorer file is missing the eval
writes a pending sidecar instead of crashing.

Default scorer: ${DEFAULT_SCORER}
Default wiki-dir: ${REPO_ROOT}
Default out: ${DEFAULT_OUT}
`;

function writeSidecar(outPath, sidecar, noWrite) {
  const json = `${JSON.stringify(sidecar, null, 2)}\n`;
  if (noWrite) {
    process.stderr.write("--no-write: skipping sidecar write\n");
    process.stdout.write(json);
    return;
  }
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, json);
  process.stderr.write(`wrote ${outPath.replace(`${REPO_ROOT}/`, "")}\n`);
}

function main() {
  const { values } = parseArgs({
    options: {
      scorer: { type: "string" },
      "wiki-dir": { type: "string" },
      threshold: { type: "string" },
      out: { type: "string" },
      "no-write": { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
    strict: true,
  });

  if (values.help) {
    process.stdout.write(HELP);
    return;
  }

  const scorerPath = values.scorer ? resolve(values.scorer) : DEFAULT_SCORER;
  const wikiDir = values["wiki-dir"] ? resolve(values["wiki-dir"]) : REPO_ROOT;
  const outPath = values.out ? resolve(values.out) : DEFAULT_OUT;
  const noWrite = Boolean(values["no-write"]);

  let sweep = DEFAULT_SWEEP;
  if (values.threshold !== undefined) {
    const t = Number.parseFloat(values.threshold);
    if (!Number.isFinite(t) || t < 0 || t > 1) {
      throw new Error(`--threshold must be a number in [0,1]; got ${values.threshold}`);
    }
    sweep = [t];
  }

  const fixtures = JSON.parse(readFileSync(FIXTURE_PATH, "utf8"));
  const onTopic = fixtures.filter((f) => Array.isArray(f.relevant) && f.relevant.length > 0);
  const offTopic = fixtures.filter((f) => Array.isArray(f.relevant) && f.relevant.length === 0);

  // Pending path: scorer built in parallel may not exist yet. Emit a
  // no-data sidecar (the lab cell renders its methodology card) instead of
  // crashing. The blocked headline FP rate stays "TBD".
  if (!existsSync(scorerPath)) {
    process.stderr.write(
      `scorer not found at ${scorerPath} — emitting pending (no-data) sidecar.\n`,
    );
    const sidecar = {
      status: "no-data",
      generated_at: new Date().toISOString(),
      scorer: scorerPath.replace(`${REPO_ROOT}/`, ""),
      reason: "scorer not yet present; eval pending. Re-run once wiki-query.cjs lands.",
      n_on_topic: onTopic.length,
      n_off_topic: offTopic.length,
      sweep: [],
      recommended_threshold: null,
    };
    writeSidecar(outPath, sidecar, noWrite);
    return;
  }

  const require = createRequire(import.meta.url);
  const scorer = require(scorerPath);
  if (typeof scorer.query !== "function") {
    throw new Error(`scorer at ${scorerPath} does not export query()`);
  }
  const scorerVersion =
    scorer.VERSION || scorer.version || (scorer.meta && scorer.meta.version) || "unknown";

  // Query each fixture once at QUERY_LIMIT; the per-threshold metrics are
  // derived from these same ranked results, so the scorer is invoked exactly
  // once per prompt regardless of sweep size.
  const ranked = new Map();
  for (const f of fixtures) {
    const results = scorer.query(f.prompt, { wikiDir, limit: QUERY_LIMIT });
    ranked.set(f.prompt, Array.isArray(results) ? results : []);
  }

  const perThreshold = sweep.map((threshold) => {
    // precision@1: of on-topic prompts, top-1 slug is in the relevant set.
    // The hook fires the top concept, so this is "when it fires, is it right".
    let p1Hits = 0;
    // recall@3: of on-topic prompts, any relevant slug appears in the top-3
    // with score >= threshold.
    let r3Hits = 0;
    for (const f of onTopic) {
      const results = ranked.get(f.prompt);
      const relevant = new Set(f.relevant);
      if (results.length > 0 && relevant.has(results[0].slug)) {
        p1Hits += 1;
      }
      const hitInTop3 = results
        .slice(0, 3)
        .some((r) => r.score >= threshold && relevant.has(r.slug));
      if (hitInTop3) {
        r3Hits += 1;
      }
    }

    // false_positive_rate: of OFF-topic prompts, fraction where ANY concept
    // scores >= threshold — i.e. the hook would have nagged. THE headline.
    let nagged = 0;
    for (const f of offTopic) {
      const results = ranked.get(f.prompt);
      if (results.some((r) => r.score >= threshold)) {
        nagged += 1;
      }
    }

    return {
      threshold,
      precision_at_1: onTopic.length === 0 ? 0 : Number((p1Hits / onTopic.length).toFixed(4)),
      recall_at_3: onTopic.length === 0 ? 0 : Number((r3Hits / onTopic.length).toFixed(4)),
      false_positive_rate:
        offTopic.length === 0 ? 0 : Number((nagged / offTopic.length).toFixed(4)),
    };
  });

  // Recommend the sweep point that drives the FP rate to ~0 while keeping
  // precision@1 highest. Among the lowest-FP points, pick the best
  // precision@1; tie-break on the lower threshold (less aggressive silencing
  // of on-topic prompts at equal precision).
  const minFp = Math.min(...perThreshold.map((s) => s.false_positive_rate));
  const recommended = perThreshold
    .filter((s) => s.false_positive_rate === minFp)
    .sort((a, b) => b.precision_at_1 - a.precision_at_1 || a.threshold - b.threshold)[0];

  const sidecar = {
    status: "live",
    generated_at: new Date().toISOString(),
    scorer: scorerPath.replace(`${REPO_ROOT}/`, ""),
    scorer_version: scorerVersion,
    cost_usd: 0,
    n_on_topic: onTopic.length,
    n_off_topic: offTopic.length,
    sweep: perThreshold,
    recommended_threshold: recommended.threshold,
    recommended: recommended,
    per_prompt: fixtures.map((f) => ({
      prompt: f.prompt,
      relevant: f.relevant,
      off_topic: f.relevant.length === 0,
      results: ranked.get(f.prompt).map((r) => ({
        slug: r.slug,
        score: Number(Number(r.score).toFixed(4)),
      })),
    })),
  };

  process.stderr.write(
    `\nwiki-surface eval: ${onTopic.length} on-topic, ${offTopic.length} off-topic\n`,
  );
  for (const s of perThreshold) {
    process.stderr.write(
      `  t=${s.threshold.toFixed(2)}  p@1=${(s.precision_at_1 * 100).toFixed(0)}%  ` +
        `r@3=${(s.recall_at_3 * 100).toFixed(0)}%  FP=${(s.false_positive_rate * 100).toFixed(0)}%\n`,
    );
  }
  process.stderr.write(
    `  recommended threshold = ${recommended.threshold} ` +
      `(FP=${(recommended.false_positive_rate * 100).toFixed(0)}%, ` +
      `p@1=${(recommended.precision_at_1 * 100).toFixed(0)}%)\n`,
  );

  writeSidecar(outPath, sidecar, noWrite);
}

main();

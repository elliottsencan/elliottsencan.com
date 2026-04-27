/**
 * Cross-link phase: validates and applies anchor-phrase link insertions
 * across the wiki and writing corpora.
 *
 * Contract:
 *  - Anchor must be an exact substring of an eligible text node within the
 *    paragraph containing source_passage.
 *  - Anchor must NOT sit inside an existing link, image alt, inline code, or
 *    fenced code block (the AST traversal in crosslink-mdast.ts excludes
 *    these structurally).
 *  - Source must not already link to the candidate target.
 *  - Validation runs AFTER the model returns proposals; insertion uses the
 *    same AST locator so passage uniqueness is enforced end-to-end.
 */

import { BlogFrontmatterSchema, WikiFrontmatterSchema } from "@shared/schemas/content.ts";
import matter from "gray-matter";
import type { z } from "zod";
import { type CrosslinkProposalSchema, proposeCrosslinks } from "./anthropic.ts";
import { applyAnchorInsertion, locateAnchor, parseMarkdown } from "./crosslink-mdast.ts";
import {
  CORPORA,
  MAX_CANDIDATES_PER_PIECE,
  MAX_CROSSLINK_CALLS_PER_RUN,
  SERIES_BOOST,
} from "./crosslink-config.ts";
import type { BlogEntry, EnumerateDeps, WikiEntry } from "./enumerate.ts";
import { enumerateBlogWithBodies, enumerateWikiWithBodies } from "./enumerate.ts";
import { CROSSLINK_SUGGEST_SYSTEM } from "./prompts.ts";
import type { Env } from "./types.ts";
import { log } from "./util.ts";

export type CrosslinkProposal = z.infer<typeof CrosslinkProposalSchema>;

declare const validProposalBrand: unique symbol;
export type ValidProposal = CrosslinkProposal & { readonly [validProposalBrand]: true };

export type ValidationResult =
  | { ok: true; proposal: ValidProposal }
  | { ok: false; reason: string };

export function normalizeUrl(url: string): string {
  let u = url.trim();
  if (!u.startsWith("/")) { u = `/${u}`; }
  const hashIdx = u.indexOf("#");
  if (hashIdx >= 0) { u = u.slice(0, hashIdx); }
  const queryIdx = u.indexOf("?");
  if (queryIdx >= 0) { u = u.slice(0, queryIdx); }
  if (u.length > 1 && u.endsWith("/")) { u = u.slice(0, -1); }
  return u;
}

export function isAlreadyLinked(body: string, targetUrl: string): boolean {
  const norm = normalizeUrl(targetUrl).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\]\\([^)]*?${norm}(?:[/#?][^)]*)?\\)`);
  return re.test(body);
}

export function validateProposal(p: CrosslinkProposal): ValidationResult {
  const root = parseMarkdown(p.source_passage);
  const located = locateAnchor(root, p.anchor_phrase);
  if (!located.ok) { return { ok: false, reason: located.reason }; }
  if (isAlreadyLinked(p.source_passage, p.target_url)) {
    return { ok: false, reason: "already-linked-target" };
  }
  return { ok: true, proposal: p as ValidProposal };
}

export function applyInsertion(body: string, p: ValidProposal): string {
  if (isAlreadyLinked(body, p.target_url)) { return body; }
  return applyAnchorInsertion(body, p.source_passage, p.anchor_phrase, p.target_url);
}

export function scoreCandidate(input: { sharedTags: string[]; sharedSeries: boolean }): number {
  const base = input.sharedTags.length;
  return input.sharedSeries ? base * SERIES_BOOST : base;
}

type CandidatePiece = { slug: string; tags: string[]; series: string | undefined };

export function selectCandidates(
  source: CandidatePiece,
  pool: CandidatePiece[],
  cap: number = MAX_CANDIDATES_PER_PIECE,
): CandidatePiece[] {
  const sourceTagSet = new Set(source.tags.map((t) => t.toLowerCase()));
  const scored = pool
    .map((p) => {
      const sharedTags = p.tags.map((t) => t.toLowerCase()).filter((t) => sourceTagSet.has(t));
      const sharedSeries = !!source.series && p.series === source.series;
      return { piece: p, score: scoreCandidate({ sharedTags, sharedSeries }) };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, cap).map((s) => s.piece);
}

export function dedupeBatch<
  P extends { source_slug: string; target_slug: string; anchor_phrase: string },
>(ps: P[]): P[] {
  const seen = new Set<string>();
  const out: P[] = [];
  for (const p of ps) {
    const key = `${p.source_slug}|${p.target_slug}|${p.anchor_phrase}`;
    if (seen.has(key)) { continue; }
    seen.add(key);
    out.push(p);
  }
  return out;
}

// ---------- orchestration ----------

export type Piece = { corpus: "wiki" | "blog" | "reading"; slug: string; url: string };

export type CorpusSnapshot = { wiki: WikiEntry[]; blog: BlogEntry[] };

export type CrosslinkPhaseInput = {
  newPieces: { added: Piece[]; changed: Piece[] };
  corpusSnapshot: CorpusSnapshot;
  proposeProposals: (
    forwardSources: Array<{ piece: Piece; body: string; candidates: Piece[] }>,
    backwardTargets: Array<{ piece: Piece; candidates: Piece[] }>,
  ) => Promise<{
    forward: CrosslinkProposal[];
    backward: CrosslinkProposal[];
    apiFailures?: number;
  }>;
};

export type ChangedFile = {
  path: string;
  before: string;
  after: string;
  frontmatter: Record<string, unknown>;
};

export type CrosslinkSkipCounters = {
  validationFailures: Record<string, number>;
  missingSlug: number;
  applyNoop: number;
  apiFailures: number;
};

export type CrosslinkPhaseResult = {
  forward: number;
  backward: number;
  applied: Array<{ path: string; anchor: string; target: string }>;
  changedFiles: ChangedFile[];
  skipped: CrosslinkSkipCounters;
};

function findInSnapshot(
  snapshot: CorpusSnapshot,
  slug: string,
): { path: string; body: string; frontmatter: Record<string, unknown> } | undefined {
  const wiki = snapshot.wiki.find((w) => w.slug === slug);
  if (wiki) {
    return {
      path: wiki.path,
      body: wiki.body,
      frontmatter: wiki.frontmatter as unknown as Record<string, unknown>,
    };
  }
  const blog = snapshot.blog.find((b) => b.slug === slug);
  if (blog) {
    return {
      path: blog.path,
      body: blog.body,
      frontmatter: blog.frontmatter as unknown as Record<string, unknown>,
    };
  }
  return undefined;
}

export async function runCrosslinkPhase(
  input: CrosslinkPhaseInput,
): Promise<CrosslinkPhaseResult> {
  // Callers own per-piece prompt building and aggregation. The orchestrator
  // is post-model: validate, dedupe, apply.
  const proposals = await input.proposeProposals([], []);
  const allRaw = [...proposals.forward, ...proposals.backward];
  const all = dedupeBatch(allRaw);

  const applied: CrosslinkPhaseResult["applied"] = [];
  const changedByPath = new Map<string, Omit<ChangedFile, "path">>();
  const counters: CrosslinkSkipCounters = {
    validationFailures: {},
    missingSlug: 0,
    applyNoop: 0,
    apiFailures: proposals.apiFailures ?? 0,
  };

  for (const p of all) {
    const v = validateProposal(p);
    if (!v.ok) {
      counters.validationFailures[v.reason] = (counters.validationFailures[v.reason] ?? 0) + 1;
      continue;
    }
    const entry = findInSnapshot(input.corpusSnapshot, p.source_slug);
    if (!entry) {
      counters.missingSlug++;
      continue;
    }
    const current = changedByPath.get(entry.path)?.after ?? entry.body;
    const next = applyInsertion(current, v.proposal);
    if (next === current) {
      counters.applyNoop++;
      continue;
    }
    const existing = changedByPath.get(entry.path);
    if (!existing) {
      changedByPath.set(entry.path, {
        before: entry.body,
        after: next,
        frontmatter: entry.frontmatter,
      });
    } else {
      existing.after = next;
    }
    applied.push({ path: entry.path, anchor: p.anchor_phrase, target: p.target_url });
  }

  if (
    counters.apiFailures > 0 ||
    counters.missingSlug > 0 ||
    counters.applyNoop > 0 ||
    Object.keys(counters.validationFailures).length > 0
  ) {
    log.info("crosslink", "phase", "skip-counters", {
      apiFailures: counters.apiFailures,
      missingSlug: counters.missingSlug,
      applyNoop: counters.applyNoop,
      validationFailures: JSON.stringify(counters.validationFailures),
    });
  }

  return {
    forward: proposals.forward.length,
    backward: proposals.backward.length,
    applied,
    changedFiles: [...changedByPath.entries()].map(([path, rest]) => ({ path, ...rest })),
    skipped: counters,
  };
}

// ---------- runner glue ----------

function corpusForPath(path: string): { corpus: Piece["corpus"]; urlPrefix: string } | null {
  for (const c of CORPORA) {
    if (path.startsWith(`${c.contentDir}/`)) {
      return { corpus: c.name, urlPrefix: c.urlPrefix };
    }
  }
  if (path.startsWith("src/content/reading/")) {
    return { corpus: "reading", urlPrefix: "/reading/" };
  }
  return null;
}

function pathToPiece(path: string): Piece | null {
  const meta = corpusForPath(path);
  if (!meta) { return null; }
  const dirPrefix =
    meta.corpus === "reading"
      ? "src/content/reading/"
      : `${CORPORA.find((c) => c.name === meta.corpus)?.contentDir}/`;
  const tail = path.slice(dirPrefix.length);
  const slug = tail.replace(/\.md$/, "");
  return { corpus: meta.corpus, slug, url: `${meta.urlPrefix}${slug}` };
}

type EntryRow = { piece: Piece; tags: string[]; series: string | undefined; body: string };

function snapshotToRows(snapshot: CorpusSnapshot): EntryRow[] {
  const rows: EntryRow[] = [];
  for (const w of snapshot.wiki) {
    rows.push({
      piece: { corpus: "wiki", slug: w.slug, url: `/wiki/${w.slug}` },
      // Wiki entries don't carry tags. Treat the slug as the only tag so
      // candidate filtering has a signal until topic propagation is added.
      tags: [w.slug],
      series: undefined,
      body: w.body,
    });
  }
  for (const b of snapshot.blog) {
    rows.push({
      piece: { corpus: "blog", slug: b.slug, url: `/writing/${b.slug}` },
      tags: b.frontmatter.tags ?? [],
      series: b.frontmatter.series,
      body: b.body,
    });
  }
  return rows;
}

function buildForwardPrompt(src: { piece: Piece; body: string; candidates: Piece[] }): string {
  return [
    `SOURCE (${src.piece.corpus}/${src.piece.slug}):`,
    src.body,
    "",
    "CANDIDATES:",
    ...src.candidates.map((c) => `- ${c.corpus}/${c.slug} -> ${c.url}`),
  ].join("\n");
}

function buildBackwardPrompt(
  tgt: { piece: Piece; candidates: Piece[] },
  rowsBySlug: Map<string, EntryRow>,
): string {
  const lines: string[] = [
    `TARGET (${tgt.piece.corpus}/${tgt.piece.slug}) -> ${tgt.piece.url}`,
    "",
    "CANDIDATE SOURCES (each block is a separate source — propose links INTO the target):",
  ];
  for (const c of tgt.candidates) {
    const row = rowsBySlug.get(`${c.corpus}/${c.slug}`);
    lines.push(`--- ${c.corpus}/${c.slug} (${c.url}) ---`);
    if (!row || c.corpus === "reading") {
      lines.push("(no body to insert into)");
    } else {
      lines.push(row.body.slice(0, 800));
    }
  }
  return lines.join("\n");
}

type RunnerMutation = {
  added: Array<{ path: string; content: string }>;
  changed: Array<{ path: string; before: string; after: string }>;
};

/**
 * Overlays the pending mutation on top of the main-branch snapshot so the
 * runner sees post-mutation bodies for added/changed pieces. Without this,
 * forward proposals from new wiki pages would have no source body and
 * backward proposals would target stale text.
 */
export function augmentSnapshot(
  base: CorpusSnapshot,
  mutation: RunnerMutation,
): CorpusSnapshot {
  const wikiByPath = new Map(base.wiki.map((e) => [e.path, e]));
  const blogByPath = new Map(base.blog.map((e) => [e.path, e]));

  const all: Array<{ path: string; content: string }> = [
    ...mutation.added.map((f) => ({ path: f.path, content: f.content })),
    ...mutation.changed.map((f) => ({ path: f.path, content: f.after })),
  ];

  for (const f of all) {
    const piece = pathToPiece(f.path);
    if (!piece) { continue; }
    const parsed = matter(f.content);
    const body = parsed.content.trim();
    const slug = piece.slug;
    if (piece.corpus === "wiki") {
      const fm = WikiFrontmatterSchema.safeParse(parsed.data);
      if (!fm.success) { continue; }
      wikiByPath.set(f.path, { slug, path: f.path, frontmatter: fm.data, body });
    } else if (piece.corpus === "blog") {
      const fm = BlogFrontmatterSchema.safeParse(parsed.data);
      if (!fm.success) { continue; }
      blogByPath.set(f.path, { slug, path: f.path, frontmatter: fm.data, body });
    }
  }

  return { wiki: [...wikiByPath.values()], blog: [...blogByPath.values()] };
}

export function makeCrosslinkRunner(
  env: Env,
  ghDeps: EnumerateDeps,
): (input: { mutation: RunnerMutation; env: Env }) => Promise<CrosslinkPhaseResult> {
  return async (input) => {
    const newAdded = input.mutation.added
      .map((f) => pathToPiece(f.path))
      .filter((p): p is Piece => !!p);
    const newChanged = input.mutation.changed
      .map((f) => pathToPiece(f.path))
      .filter((p): p is Piece => !!p);

    const [wiki, blog] = await Promise.all([
      enumerateWikiWithBodies(ghDeps),
      enumerateBlogWithBodies(ghDeps),
    ]);
    const snapshot = augmentSnapshot({ wiki, blog }, input.mutation);
    const rows = snapshotToRows(snapshot);
    const rowsBySlug = new Map(rows.map((r) => [`${r.piece.corpus}/${r.piece.slug}`, r]));

    const newPieces = { added: newAdded, changed: newChanged };

    const forwardSources = buildForwardSources(newPieces, rows);
    const backwardTargets = buildBackwardTargets(newPieces, rows);

    let callsLeft = MAX_CROSSLINK_CALLS_PER_RUN;
    const proposeProposals = async (): Promise<{
      forward: CrosslinkProposal[];
      backward: CrosslinkProposal[];
      apiFailures: number;
    }> => {
      const forward: CrosslinkProposal[] = [];
      const backward: CrosslinkProposal[] = [];
      let apiFailures = 0;
      for (const src of forwardSources) {
        if (callsLeft-- <= 0) {
          log.warn("crosslink", "runner", "forward call cap reached", {
            remaining: forwardSources.length - forward.length,
          });
          break;
        }
        const r = await proposeCrosslinks({
          apiKey: env.ANTHROPIC_API_KEY,
          model: env.ANTHROPIC_MODEL || undefined,
          systemPrompt: CROSSLINK_SUGGEST_SYSTEM,
          userMessage: buildForwardPrompt(src),
        });
        if (r.ok) {
          forward.push(...r.data.proposals);
        } else {
          apiFailures++;
          log.warn("crosslink", "runner", "forward call failed", {
            piece: `${src.piece.corpus}/${src.piece.slug}`,
            error: r.error,
          });
        }
      }
      for (const tgt of backwardTargets) {
        if (callsLeft-- <= 0) {
          log.warn("crosslink", "runner", "backward call cap reached", {
            remaining: backwardTargets.length - backward.length,
          });
          break;
        }
        const r = await proposeCrosslinks({
          apiKey: env.ANTHROPIC_API_KEY,
          model: env.ANTHROPIC_MODEL || undefined,
          systemPrompt: CROSSLINK_SUGGEST_SYSTEM,
          userMessage: buildBackwardPrompt(tgt, rowsBySlug),
        });
        if (r.ok) {
          backward.push(...r.data.proposals);
        } else {
          apiFailures++;
          log.warn("crosslink", "runner", "backward call failed", {
            piece: `${tgt.piece.corpus}/${tgt.piece.slug}`,
            error: r.error,
          });
        }
      }
      return { forward, backward, apiFailures };
    };

    return runCrosslinkPhase({
      newPieces,
      corpusSnapshot: snapshot,
      proposeProposals: async () => proposeProposals(),
    });
  };
}

function buildForwardSources(
  newPieces: { added: Piece[]; changed: Piece[] },
  rows: EntryRow[],
): Array<{ piece: Piece; body: string; candidates: Piece[] }> {
  const out: Array<{ piece: Piece; body: string; candidates: Piece[] }> = [];
  for (const piece of [...newPieces.added, ...newPieces.changed]) {
    if (piece.corpus === "reading") { continue; // empty body
}
    const row = rows.find((r) => r.piece.corpus === piece.corpus && r.piece.slug === piece.slug);
    if (!row?.body) { continue; }
    const pool: Array<{ slug: string; tags: string[]; series: string | undefined }> = rows
      .filter((r) => !(r.piece.corpus === piece.corpus && r.piece.slug === piece.slug))
      .map((r) => ({ slug: `${r.piece.corpus}/${r.piece.slug}`, tags: r.tags, series: r.series }));
    const source = { slug: `${piece.corpus}/${piece.slug}`, tags: row.tags, series: row.series };
    const winners = selectCandidates(source, pool);
    const candidates = winners
      .map((w) => rows.find((r) => `${r.piece.corpus}/${r.piece.slug}` === w.slug)?.piece)
      .filter((p): p is Piece => !!p);
    out.push({ piece, body: row.body, candidates });
  }
  return out;
}

function buildBackwardTargets(
  newPieces: { added: Piece[]; changed: Piece[] },
  rows: EntryRow[],
): Array<{ piece: Piece; candidates: Piece[] }> {
  const out: Array<{ piece: Piece; candidates: Piece[] }> = [];
  for (const piece of [...newPieces.added, ...newPieces.changed]) {
    // Backward = existing pieces that should now link TO the new piece.
    // Candidate sources are rows in the snapshot (excluding the new piece itself).
    const candidates = rows
      .filter((r) => !(r.piece.corpus === piece.corpus && r.piece.slug === piece.slug))
      .map((r) => r.piece);
    if (candidates.length === 0) { continue; }
    out.push({ piece, candidates });
  }
  return out;
}

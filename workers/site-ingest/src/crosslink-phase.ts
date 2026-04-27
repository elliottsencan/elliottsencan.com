/**
 * Cross-link phase: pure logic for proposing and applying anchor-phrase
 * link insertions across the wiki and writing corpora.
 *
 * Contract:
 *  - Anchor phrase MUST be an exact substring of source_passage and unique
 *    within it.
 *  - Anchor MUST NOT sit inside an existing markdown link, image alt, inline
 *    code, or fenced code block.
 *  - Source passage MUST NOT already link to the candidate target.
 *  - All checks run AFTER the model returns proposals — the validator is the
 *    backstop for hallucinated anchors and rule-skipping outputs.
 *
 * Insertion is a single substring replace. Idempotent: re-running on already-
 * linked text is a no-op (the already-linked check fires first).
 */

import { proposeCrosslinks } from "./anthropic.ts";
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

export type CrosslinkProposal = {
  source_slug: string;
  source_passage: string;
  anchor_phrase: string;
  target_corpus: "wiki" | "blog" | "reading";
  target_slug: string;
  target_url: string;
  rationale: string;
  confidence: "high" | "medium" | "low";
};

export type ValidationResult = { ok: true } | { ok: false; reason: string };

export function normalizeUrl(url: string): string {
  let u = url.trim();
  if (!u.startsWith("/")) u = `/${u}`;
  const hashIdx = u.indexOf("#");
  if (hashIdx >= 0) u = u.slice(0, hashIdx);
  const queryIdx = u.indexOf("?");
  if (queryIdx >= 0) u = u.slice(0, queryIdx);
  if (u.length > 1 && u.endsWith("/")) u = u.slice(0, -1);
  return u;
}

export function isAlreadyLinked(body: string, targetUrl: string): boolean {
  const norm = normalizeUrl(targetUrl).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // ](<...>{norm}{end-of-url-or-/-or-#-or-?})
  const re = new RegExp(`\\]\\([^)]*?${norm}(?:[/#?][^)]*)?\\)`);
  return re.test(body);
}

function indicesOf(haystack: string, needle: string): number[] {
  if (!needle) return [];
  const out: number[] = [];
  let i = 0;
  while (true) {
    const j = haystack.indexOf(needle, i);
    if (j < 0) break;
    out.push(j);
    i = j + needle.length;
  }
  return out;
}

function isInsideExistingLink(passage: string, idx: number): boolean {
  const before = passage.slice(0, idx);
  const lastOpen = before.lastIndexOf("[");
  const lastClose = before.lastIndexOf("]");
  if (lastOpen <= lastClose) return false;
  const after = passage.slice(idx);
  return /^[^\]]*\]\([^)]*\)/.test(after);
}

function isInsideImageAlt(passage: string, idx: number): boolean {
  const window = passage.slice(Math.max(0, idx - 200), idx);
  const lastBang = window.lastIndexOf("![");
  if (lastBang < 0) return false;
  const tail = window.slice(lastBang);
  return !tail.includes("]");
}

function isInsideInlineCode(passage: string, idx: number, anchorLen: number): boolean {
  const lineStart = passage.lastIndexOf("\n", idx - 1) + 1;
  const lineEndRaw = passage.indexOf("\n", idx);
  const lineEnd = lineEndRaw < 0 ? passage.length : lineEndRaw;
  const line = passage.slice(lineStart, lineEnd);
  const offset = idx - lineStart;
  const before = line.slice(0, offset);
  const after = line.slice(offset + anchorLen);
  return /`[^`]*$/.test(before) && /^[^`]*`/.test(after);
}

function isInsideCodeFence(passage: string, idx: number): boolean {
  const before = passage.slice(0, idx);
  const fenceCount = (before.match(/```/g) ?? []).length;
  return fenceCount % 2 === 1;
}

export function validateProposal(p: CrosslinkProposal): ValidationResult {
  const occurrences = indicesOf(p.source_passage, p.anchor_phrase);
  if (occurrences.length === 0) return { ok: false, reason: "anchor-not-found" };
  if (occurrences.length > 1) return { ok: false, reason: "anchor-not-unique" };
  const idx = occurrences[0]!;

  // Order matters: image-alt and inline-code are special cases of "inside
  // brackets/backticks" so they must run before the general existing-link
  // check. Fenced code is a structural pre-check.
  if (isInsideCodeFence(p.source_passage, idx)) return { ok: false, reason: "code-fence" };
  if (isInsideInlineCode(p.source_passage, idx, p.anchor_phrase.length)) {
    return { ok: false, reason: "inline-code" };
  }
  if (isInsideImageAlt(p.source_passage, idx)) return { ok: false, reason: "image-alt" };
  if (isInsideExistingLink(p.source_passage, idx)) return { ok: false, reason: "already-link" };
  if (isAlreadyLinked(p.source_passage, p.target_url)) {
    return { ok: false, reason: "already-linked-target" };
  }
  return { ok: true };
}

export function applyInsertion(body: string, anchor: string, targetUrl: string): string {
  if (isAlreadyLinked(body, targetUrl)) return body;
  const occurrences = indicesOf(body, anchor);
  if (occurrences.length !== 1) return body;
  const idx = occurrences[0]!;
  return `${body.slice(0, idx)}[${anchor}](${targetUrl})${body.slice(idx + anchor.length)}`;
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
    if (seen.has(key)) continue;
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
  ) => Promise<{ forward: CrosslinkProposal[]; backward: CrosslinkProposal[] }>;
};

export type CrosslinkPhaseResult = {
  forward: number;
  backward: number;
  applied: Array<{ path: string; anchor: string; target: string }>;
  changedFiles: Array<{ path: string; before: string; after: string }>;
};

function findInSnapshot(
  snapshot: CorpusSnapshot,
  slug: string,
): { path: string; body: string } | undefined {
  const wiki = snapshot.wiki.find((w) => w.slug === slug);
  if (wiki) return { path: wiki.path, body: wiki.body };
  const blog = snapshot.blog.find((b) => b.slug === slug);
  if (blog) return { path: blog.path, body: blog.body };
  return undefined;
}

export async function runCrosslinkPhase(
  input: CrosslinkPhaseInput,
): Promise<CrosslinkPhaseResult> {
  // For v1 we hand the callback empty arrays — the proposeProposals
  // implementation owns building per-piece prompts and aggregating. The
  // orchestrator's job is post-model: validate, dedupe, apply.
  const proposals = await input.proposeProposals([], []);
  const allRaw = [...proposals.forward, ...proposals.backward];
  const all = dedupeBatch(allRaw);

  const applied: CrosslinkPhaseResult["applied"] = [];
  const changedByPath = new Map<string, { before: string; after: string }>();

  for (const p of all) {
    const v = validateProposal(p);
    if (!v.ok) continue;
    const entry = findInSnapshot(input.corpusSnapshot, p.source_slug);
    if (!entry) continue;
    const current = changedByPath.get(entry.path)?.after ?? entry.body;
    const next = applyInsertion(current, p.anchor_phrase, p.target_url);
    if (next === current) continue;
    if (!changedByPath.has(entry.path)) {
      changedByPath.set(entry.path, { before: entry.body, after: next });
    } else {
      changedByPath.get(entry.path)!.after = next;
    }
    applied.push({ path: entry.path, anchor: p.anchor_phrase, target: p.target_url });
  }

  return {
    forward: proposals.forward.length,
    backward: proposals.backward.length,
    applied,
    changedFiles: [...changedByPath.entries()].map(([path, { before, after }]) => ({
      path,
      before,
      after,
    })),
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
  if (!meta) return null;
  const dirPrefix =
    meta.corpus === "reading"
      ? "src/content/reading/"
      : `${CORPORA.find((c) => c.name === meta.corpus)!.contentDir}/`;
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
    const snapshot: CorpusSnapshot = { wiki, blog };
    const rows = snapshotToRows(snapshot);
    const rowsBySlug = new Map(rows.map((r) => [`${r.piece.corpus}/${r.piece.slug}`, r]));

    const newPieces = { added: newAdded, changed: newChanged };

    const forwardSources = buildForwardSources(newPieces, rows);
    const backwardTargets = buildBackwardTargets(newPieces, rows);

    let callsLeft = MAX_CROSSLINK_CALLS_PER_RUN;
    const proposeProposals = async (): Promise<{
      forward: CrosslinkProposal[];
      backward: CrosslinkProposal[];
    }> => {
      const forward: CrosslinkProposal[] = [];
      const backward: CrosslinkProposal[] = [];
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
        if (r.ok) forward.push(...r.data.proposals);
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
        if (r.ok) backward.push(...r.data.proposals);
      }
      return { forward, backward };
    };

    return runCrosslinkPhase({
      newPieces,
      corpusSnapshot: snapshot,
      // Bridge: ignore the orchestrator's empty-args call shape; the runner
      // closes over the constructed sources/targets directly.
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
    if (piece.corpus === "reading") continue; // empty body
    const row = rows.find((r) => r.piece.corpus === piece.corpus && r.piece.slug === piece.slug);
    if (!row || !row.body) continue;
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
    if (candidates.length === 0) continue;
    out.push({ piece, candidates });
  }
  return out;
}

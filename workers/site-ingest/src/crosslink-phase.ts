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

import { MAX_CANDIDATES_PER_PIECE, SERIES_BOOST } from "./crosslink-config.ts";

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

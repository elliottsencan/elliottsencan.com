/**
 * POST /crosslink — orphan-case re-runs of the cross-link phase against
 * existing content. Used when content lands outside the worker (e.g. a
 * writing post pushed to main via git, or a hand-edit to a wiki article)
 * so cross-link suggestions can still be proposed without going through
 * /link, /synthesize, /contribute, or /recompile.
 *
 * Scope resolution:
 *  - { kind: "slug", corpus, slug } — single piece.
 *  - { kind: "since", since: ISO-date } — pieces added/updated after date,
 *    capped at MAX_SCOPE_PIECES.
 *  - { kind: "all" } — every piece, capped at MAX_SCOPE_PIECES.
 *
 * Output: PR on branch `crosslink/<scope-summary>-<ts>` with one commit per
 * changed file, body lists applied edits.
 */

import { z } from "zod";
import {
  CORPORA,
  MAX_CROSSLINK_CALLS_PER_RUN,
} from "./crosslink-config.ts";
import {
  type CrosslinkPhaseResult,
  type CrosslinkProposal,
  type Piece,
  runCrosslinkPhase,
  selectCandidates,
} from "./crosslink-phase.ts";
import {
  type BlogEntry,
  type EnumerateDeps,
  enumerateBlogWithBodies,
  enumerateWikiWithBodies,
  type WikiEntry,
} from "./enumerate.ts";
import {
  createBranch,
  createGitHubClient,
  findOpenPrByBranch,
  getBranchSha,
  getFile,
  type GitHubClient,
  listDir,
  openPullRequest,
  putFile,
} from "./github.ts";
import { proposeCrosslinks } from "./anthropic.ts";
import { CROSSLINK_SUGGEST_SYSTEM } from "./prompts.ts";
import type { Env } from "./types.ts";
import { jsonResponse, log } from "./util.ts";

const MAX_SCOPE_PIECES = 25;

const ScopeSlugSchema = z.object({
  kind: z.literal("slug"),
  corpus: z.enum(["wiki", "blog"]),
  slug: z.string().min(1),
});
const ScopeSinceSchema = z.object({
  kind: z.literal("since"),
  since: z.coerce.date(),
});
const ScopeAllSchema = z.object({ kind: z.literal("all") });

export const CrosslinkRequestSchema = z.object({
  scope: z.discriminatedUnion("kind", [ScopeSlugSchema, ScopeSinceSchema, ScopeAllSchema]),
  dry_run: z.boolean().default(false),
});

export type CrosslinkRequest = z.infer<typeof CrosslinkRequestSchema>;

// Exported for tests.
export function validate(body: unknown): { ok: true; data: CrosslinkRequest } | { ok: false; error: string } {
  const parsed = CrosslinkRequestSchema.safeParse(body);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") };
  }
  return { ok: true, data: parsed.data };
}

// Exported for tests.
export function resolveScope(
  scope: CrosslinkRequest["scope"],
  snapshot: { wiki: WikiEntry[]; blog: BlogEntry[] },
): { pieces: Piece[]; capped: boolean } {
  if (scope.kind === "slug") {
    if (scope.corpus === "wiki") {
      const w = snapshot.wiki.find((e) => e.slug === scope.slug);
      if (!w) return { pieces: [], capped: false };
      return { pieces: [{ corpus: "wiki", slug: w.slug, url: `/wiki/${w.slug}` }], capped: false };
    }
    const b = snapshot.blog.find((e) => e.slug === scope.slug);
    if (!b) return { pieces: [], capped: false };
    return { pieces: [{ corpus: "blog", slug: b.slug, url: `/writing/${b.slug}` }], capped: false };
  }
  // since + all both enumerate everything; "since" filters by date when
  // present, "all" returns the full set.
  const all: Piece[] = [
    ...snapshot.wiki.map((w) => ({ corpus: "wiki" as const, slug: w.slug, url: `/wiki/${w.slug}` })),
    ...snapshot.blog.map((b) => ({ corpus: "blog" as const, slug: b.slug, url: `/writing/${b.slug}` })),
  ];
  const filtered =
    scope.kind === "since"
      ? all.filter((p) => {
          const fm =
            p.corpus === "wiki"
              ? snapshot.wiki.find((e) => e.slug === p.slug)?.frontmatter
              : snapshot.blog.find((e) => e.slug === p.slug)?.frontmatter;
          const dateRaw =
            (fm?.compiled_at as unknown) ?? (fm?.date as unknown) ?? (fm?.updated as unknown);
          if (!dateRaw) return false;
          const date = new Date(dateRaw as string);
          return Number.isFinite(date.getTime()) && date >= scope.since;
        })
      : all;
  const capped = filtered.length > MAX_SCOPE_PIECES;
  return { pieces: filtered.slice(0, MAX_SCOPE_PIECES), capped };
}

type EntryRow = { piece: Piece; tags: string[]; series: string | undefined; body: string };

function snapshotToRows(snapshot: { wiki: WikiEntry[]; blog: BlogEntry[] }): EntryRow[] {
  const rows: EntryRow[] = [];
  for (const w of snapshot.wiki) {
    rows.push({
      piece: { corpus: "wiki", slug: w.slug, url: `/wiki/${w.slug}` },
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

async function runScopedPhase(
  env: Env,
  pieces: Piece[],
  snapshot: { wiki: WikiEntry[]; blog: BlogEntry[] },
): Promise<CrosslinkPhaseResult> {
  const rows = snapshotToRows(snapshot);
  const rowsBySlug = new Map(rows.map((r) => [`${r.piece.corpus}/${r.piece.slug}`, r]));

  const forwardSources: Array<{ piece: Piece; body: string; candidates: Piece[] }> = [];
  for (const piece of pieces) {
    const row = rowsBySlug.get(`${piece.corpus}/${piece.slug}`);
    if (!row || !row.body) continue;
    const pool = rows
      .filter((r) => !(r.piece.corpus === piece.corpus && r.piece.slug === piece.slug))
      .map((r) => ({ slug: `${r.piece.corpus}/${r.piece.slug}`, tags: r.tags, series: r.series }));
    const winners = selectCandidates(
      { slug: `${piece.corpus}/${piece.slug}`, tags: row.tags, series: row.series },
      pool,
    );
    const candidates = winners
      .map((w) => rows.find((r) => `${r.piece.corpus}/${r.piece.slug}` === w.slug)?.piece)
      .filter((p): p is Piece => !!p);
    forwardSources.push({ piece, body: row.body, candidates });
  }

  const backwardTargets: Array<{ piece: Piece; candidates: Piece[] }> = pieces
    .map((piece) => ({
      piece,
      candidates: rows
        .filter((r) => !(r.piece.corpus === piece.corpus && r.piece.slug === piece.slug))
        .map((r) => r.piece),
    }))
    .filter((t) => t.candidates.length > 0);

  let callsLeft = MAX_CROSSLINK_CALLS_PER_RUN;
  return runCrosslinkPhase({
    newPieces: { added: pieces, changed: [] },
    corpusSnapshot: snapshot,
    proposeProposals: async () => {
      const forward: CrosslinkProposal[] = [];
      const backward: CrosslinkProposal[] = [];
      for (const src of forwardSources) {
        if (callsLeft-- <= 0) break;
        const r = await proposeCrosslinks({
          apiKey: env.ANTHROPIC_API_KEY,
          model: env.ANTHROPIC_MODEL || undefined,
          systemPrompt: CROSSLINK_SUGGEST_SYSTEM,
          userMessage: buildForwardPrompt(src),
        });
        if (r.ok) forward.push(...r.data.proposals);
      }
      for (const tgt of backwardTargets) {
        if (callsLeft-- <= 0) break;
        const r = await proposeCrosslinks({
          apiKey: env.ANTHROPIC_API_KEY,
          model: env.ANTHROPIC_MODEL || undefined,
          systemPrompt: CROSSLINK_SUGGEST_SYSTEM,
          userMessage: buildBackwardPrompt(tgt, rowsBySlug),
        });
        if (r.ok) backward.push(...r.data.proposals);
      }
      return { forward, backward };
    },
  });
}

function buildPrBody(scope: CrosslinkRequest["scope"], result: CrosslinkPhaseResult): string {
  const scopeDesc =
    scope.kind === "slug"
      ? `${scope.corpus}/${scope.slug}`
      : scope.kind === "since"
        ? `since ${scope.since.toISOString().slice(0, 10)}`
        : "all";
  const lines: string[] = [
    `Scope: ${scopeDesc}`,
    `Forward proposals: ${result.forward}`,
    `Backward proposals: ${result.backward}`,
    `Applied edits: ${result.applied.length}`,
    "",
    "## Changes",
  ];
  for (const f of result.changedFiles) {
    lines.push(`- \`${f.path}\``);
  }
  if (result.applied.length > 0) {
    lines.push("");
    lines.push("## Insertions");
    for (const a of result.applied) {
      lines.push(`- \`${a.path}\` — \`${a.anchor}\` → ${a.target}`);
    }
  }
  return lines.join("\n");
}

export async function handle(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "invalid JSON" }, 400);
  }
  const validated = validate(body);
  if (!validated.ok) return jsonResponse({ error: validated.error }, 400);

  const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
  const ghDeps: EnumerateDeps = {
    listDir: (path) => listDir(path, "main", gh),
    getFile: (path) => getFile(path, "main", gh),
  };

  const [wiki, blog] = await Promise.all([
    enumerateWikiWithBodies(ghDeps),
    enumerateBlogWithBodies(ghDeps),
  ]);
  const snapshot = { wiki, blog };

  const { pieces, capped } = resolveScope(validated.data.scope, snapshot);
  if (pieces.length === 0) {
    return jsonResponse({
      ok: true,
      message: "no pieces in scope",
      scope: validated.data.scope,
      capped: false,
    });
  }

  const phase = await runScopedPhase(env, pieces, snapshot);

  if (phase.changedFiles.length === 0) {
    return jsonResponse({
      ok: true,
      forward: phase.forward,
      backward: phase.backward,
      applied: 0,
      message: "no insertions proposed",
      capped,
    });
  }

  if (validated.data.dry_run) {
    return jsonResponse({
      ok: true,
      dry_run: true,
      forward: phase.forward,
      backward: phase.backward,
      applied: phase.applied.length,
      changed_files: phase.changedFiles.map((f) => ({ path: f.path })),
      capped,
    });
  }

  return openCrosslinkPr(env, gh, validated.data.scope, phase, capped);
}

async function openCrosslinkPr(
  env: Env,
  gh: GitHubClient,
  scope: CrosslinkRequest["scope"],
  phase: CrosslinkPhaseResult,
  capped: boolean,
): Promise<Response> {
  const branch = `crosslink/${new Date().toISOString().slice(0, 10)}-${Date.now().toString(36)}`;
  const head = await getBranchSha("main", gh);
  if (!head.ok) return jsonResponse({ ok: false, error: `branch sha: ${head.error}` }, 502);
  const created = await createBranch(branch, head.data, gh);
  if (!created.ok) return jsonResponse({ ok: false, error: `branch: ${created.error}` }, 502);

  const committed: string[] = [];
  for (const f of phase.changedFiles) {
    const sha = await getFile(f.path, "main", gh);
    const put = await putFile({
      path: f.path,
      branch,
      content: f.after,
      message: `crosslink: ${f.path}`,
      ...(sha.ok ? { sha: sha.data.sha } : {}),
      gh,
    });
    if (!put.ok) {
      log.error("crosslink", "commit", "put failed", { path: f.path, error: put.error });
      continue;
    }
    committed.push(f.path);
  }
  if (committed.length === 0) {
    return jsonResponse({ ok: false, error: "no files committed", branch }, 502);
  }

  const existing = await findOpenPrByBranch(branch, gh);
  if (!existing.ok) {
    return jsonResponse(
      { ok: false, error: `pr lookup: ${existing.error}`, branch, committed },
      502,
    );
  }
  let prNumber: number;
  let prUrl: string;
  if (existing.data) {
    prNumber = existing.data.number;
    prUrl = `https://github.com/${env.GITHUB_REPO}/pull/${prNumber}`;
  } else {
    const opened = await openPullRequest({
      title: `Cross-link suggestions (${committed.length} file${committed.length === 1 ? "" : "s"})`,
      body: buildPrBody(scope, phase),
      head: branch,
      base: "main",
      gh,
    });
    if (!opened.ok) {
      return jsonResponse(
        { ok: false, error: `pr open: ${opened.error}`, branch, committed },
        502,
      );
    }
    prNumber = opened.data.number;
    prUrl = opened.data.html_url;
  }

  return jsonResponse({
    ok: true,
    forward: phase.forward,
    backward: phase.backward,
    applied: phase.applied.length,
    branch,
    pr: { number: prNumber, url: prUrl },
    committed,
    capped,
  });
}

// Compile-time assertion that CORPORA stays in sync with the corpora /crosslink
// supports. Update both if you add a new corpus.
type _CorporaCheck = (typeof CORPORA)[number]["name"] extends "wiki" | "blog" ? true : never;
const _check: _CorporaCheck = true;
void _check;

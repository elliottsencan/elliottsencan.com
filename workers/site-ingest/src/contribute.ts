/**
 * POST /contribute — file a manually-authored wiki concept article via PR.
 *
 * Distinct from /synthesize, which generates an article from a cluster of
 * sources via Anthropic. /contribute takes an already-authored body
 * (typically the result of an agent's analysis filed back to the wiki)
 * and commits it directly with no model call.
 *
 * Plumbed through `runPipeline` (pipeline.ts): strategy.plan() handles
 * the existence check (409 if the article exists and !force), markdown
 * compilation, and returns the Mutation. Substrate owns branch + commit
 * + PR. The cross-link phase runs as a follow-up (ctx.waitUntil →
 * separate PR) so the synchronous response fits inside Cloudflare's 30s
 * wall time even when the wiki corpus is large; mirrors the /link and
 * /synthesize pattern.
 */

import { MIN_WIKI_SOURCES } from "@shared/schemas/content.ts";
import matter from "gray-matter";
import { z } from "zod";
import { createGitHubClient, getFile } from "./github.ts";
import {
  type CrosslinkResult,
  type PlanOutput,
  type PlanResult,
  runPipeline,
  type Strategy,
} from "./pipeline.ts";
import { makePipelineDeps } from "./synthesize.ts";
import type { Env } from "./types.ts";
import { jsonResponse } from "./util.ts";

const WIKI_DIR = "src/content/wiki";
const TOPIC_SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const ContributeRequestSchema = z.object({
  topic: z.string().regex(TOPIC_SLUG_RE, "topic must be lowercase kebab-case"),
  title: z.string().min(1).optional(),
  summary: z.string().min(1).max(240),
  body: z.string().min(1),
  sources: z.array(z.string().min(1)).min(MIN_WIKI_SOURCES),
  related_concepts: z.array(z.string().min(1)).optional(),
  force: z.boolean().optional().default(false),
  dry_run: z.boolean().optional().default(true),
});

export type ContributeRequest = z.infer<typeof ContributeRequestSchema>;

type ContributeSummary = {
  topic: string;
  path: string;
  exists: boolean;
  sources: string[];
};

export function makeContributeStrategy(req: ContributeRequest): Strategy<ContributeSummary> {
  return {
    name: "contribute",
    branchPrefix: `contribute/${req.topic}`,
    plan: async ({ env }): Promise<PlanResult<ContributeSummary>> => {
      const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
      const path = `${WIKI_DIR}/${req.topic}.md`;
      const existing = await getFile(path, "main", gh);
      const exists = existing.ok;
      if (exists && !req.force) {
        return {
          ok: false,
          error: `wiki article already exists at ${path}; pass force: true to overwrite`,
          status: 409,
        };
      }
      const markdown = buildArticleMarkdown({
        title: req.title ?? humanize(req.topic),
        summary: req.summary,
        body: req.body,
        sources: [...req.sources].sort(),
        ...(req.related_concepts ? { related_concepts: req.related_concepts } : {}),
        compiled_with: env.ANTHROPIC_MODEL || "manual:contribute",
        compiled_at: new Date(),
      });
      const summary: ContributeSummary = {
        topic: req.topic,
        path,
        exists,
        sources: [...req.sources].sort(),
      };
      const mutation = exists
        ? { added: [], changed: [{ path, before: "", after: markdown }] }
        : { added: [{ path, content: markdown }], changed: [] };
      return {
        ok: true,
        data: { mutation, summary },
      };
    },
    prTitle: () => `Wiki contribution: ${req.topic}`,
    prBody: (plan, crosslink) => buildPrBody(plan, crosslink),
  };
}

function buildPrBody(plan: PlanOutput<ContributeSummary>, crosslink?: CrosslinkResult): string {
  if (!plan.summary) {
    return "Manually-authored wiki article filed via /contribute.";
  }
  const summary = plan.summary;
  const lines: string[] = [
    "Manually-authored wiki article filed via /contribute.",
    "",
    `- Topic: \`${summary.topic}\``,
    `- Path: \`${summary.path}\``,
    `- ${summary.exists ? "Overwrites existing article" : "New article"}`,
    `- Sources: ${summary.sources.length}`,
  ];
  if (crosslink && crosslink.applied.length > 0) {
    lines.push("", "### Cross-link suggestions");
    lines.push(
      `Applied ${crosslink.applied.length} insertion${crosslink.applied.length === 1 ? "" : "s"} ` +
        `(${crosslink.forward} forward + ${crosslink.backward} backward proposals).`,
    );
    for (const a of crosslink.applied) {
      lines.push(`- \`${a.path}\` — \`${a.anchor}\` → ${a.target}`);
    }
  }
  return lines.join("\n");
}

export async function handle(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid JSON" }, 400);
  }
  const validation = ContributeRequestSchema.safeParse(parsed);
  if (!validation.success) {
    const issue = validation.error.issues[0];
    return jsonResponse(
      {
        ok: false,
        error: `${issue?.path?.join(".") ?? "body"}: ${issue?.message ?? "invalid"}`,
      },
      400,
    );
  }
  const req = validation.data;
  const strategy = makeContributeStrategy(req);

  if (req.dry_run) {
    const planned = await strategy.plan({ env }, env);
    if (!planned.ok) {
      return jsonResponse({ ok: false, error: planned.error }, planned.status ?? 500);
    }
    const summary = planned.data.summary as unknown as ContributeSummary;
    const sample =
      planned.data.mutation.added[0]?.content ?? planned.data.mutation.changed[0]?.after ?? "";
    return jsonResponse({
      ok: true,
      dry_run: true,
      path: summary.path,
      exists: summary.exists,
      bytes: sample.length,
    });
  }

  const deps = makePipelineDeps(env);
  // /contribute uses crosslink: "followup" so the synchronous response returns
  // as soon as the contribution commit lands, and the crosslink phase runs in
  // ctx.waitUntil after. Defensive parity with /link, /synthesize, and
  // /recompile: even a single new piece running crosslink against a 38+
  // article corpus eventually risks the 30s wall time. Tradeoff: contribution
  // and crosslinks land as separate PRs (one for the new article, one for
  // anchor-phrase insertions) instead of a single PR with two commits.
  const result = await runPipeline(
    strategy,
    { commitTarget: "pr", crosslink: "followup" },
    env,
    ctx,
    deps,
  );
  if (!result.ok) {
    return jsonResponse({ ok: false, error: result.error }, result.status);
  }
  const summary = result.summary as unknown as ContributeSummary | undefined;
  return jsonResponse({
    ok: true,
    dry_run: false,
    path: summary?.path,
    branch: result.branch,
    pr: result.pr_number ? { number: result.pr_number, url: result.pr_url } : null,
    crosslink: result.crosslink
      ? {
          forward: result.crosslink.forward,
          backward: result.crosslink.backward,
          applied: result.crosslink.applied.length,
        }
      : null,
  });
}

export function buildArticleMarkdown(args: {
  title: string;
  summary: string;
  body: string;
  sources: string[];
  related_concepts?: string[];
  compiled_with: string;
  compiled_at: Date;
}): string {
  const data: Record<string, unknown> = {
    title: args.title,
    summary: args.summary,
    sources: args.sources,
  };
  if (args.related_concepts && args.related_concepts.length > 0) {
    data.related_concepts = args.related_concepts;
  }
  data.compiled_at = args.compiled_at.toISOString();
  data.compiled_with = args.compiled_with;
  return matter.stringify(args.body.trim(), data);
}

export function humanize(topic: string): string {
  if (topic.length === 0) {
    return topic;
  }
  const spaced = topic.replace(/-/g, " ");
  return spaced[0]?.toUpperCase() + spaced.slice(1);
}

/**
 * POST /contribute — file a manually-authored wiki concept article via PR.
 *
 * Distinct from /synthesize, which generates an article from a cluster of
 * sources via Anthropic. /contribute takes an already-authored body
 * (typically the result of an agent's analysis filed back to the wiki)
 * and commits it directly with no model call.
 */

import matter from "gray-matter";
import { z } from "zod";
import { MIN_WIKI_SOURCES } from "@shared/schemas/content.ts";
import {
  createBranch,
  createGitHubClient,
  findOpenPrByBranch,
  getBranchSha,
  getFile,
  openPullRequest,
  putFile,
} from "./github.ts";
import type { Env } from "./types.ts";
import { jsonResponse, log } from "./util.ts";

const WIKI_DIR = "src/content/wiki";
const TOPIC_SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const ContributeRequestSchema = z.object({
  topic: z
    .string()
    .regex(TOPIC_SLUG_RE, "topic must be lowercase kebab-case"),
  title: z.string().min(1).optional(),
  summary: z.string().min(1).max(240),
  body: z.string().min(1),
  sources: z.array(z.string().min(1)).min(MIN_WIKI_SOURCES),
  related_concepts: z.array(z.string().min(1)).optional(),
  force: z.boolean().optional().default(false),
  dry_run: z.boolean().optional().default(true),
});

export async function handle(request: Request, env: Env): Promise<Response> {
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

  const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
  const path = `${WIKI_DIR}/${req.topic}.md`;

  const existing = await getFile(path, "main", gh);
  const exists = existing.ok;
  if (exists && !req.force) {
    return jsonResponse(
      {
        ok: false,
        error: `wiki article already exists at ${path}; pass force: true to overwrite`,
        path,
      },
      409,
    );
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

  if (req.dry_run) {
    return jsonResponse({
      ok: true,
      dry_run: true,
      path,
      exists,
      bytes: markdown.length,
    });
  }

  const mainSha = await getBranchSha("main", gh);
  if (!mainSha.ok) {
    return jsonResponse({ ok: false, error: `main: ${mainSha.error}` }, 500);
  }

  const branch = `contribute/${req.topic}-${Date.now().toString(36)}`;
  const branchResult = await createBranch(branch, mainSha.data, gh);
  if (!branchResult.ok) {
    return jsonResponse({ ok: false, error: `branch: ${branchResult.error}` }, 500);
  }

  const put = await putFile({
    path,
    branch,
    content: markdown,
    message: `wiki: contribute ${req.topic}`,
    ...(exists ? { sha: existing.data.sha } : {}),
    gh,
  });
  if (!put.ok) {
    log.error("contribute", "commit", "put failed", { path, error: put.error });
    return jsonResponse(
      { ok: false, error: `commit: ${put.error}`, branch },
      500,
    );
  }

  const existingPr = await findOpenPrByBranch(branch, gh);
  if (!existingPr.ok) {
    return jsonResponse(
      {
        ok: false,
        error: `pr lookup: ${existingPr.error}`,
        branch,
        committed_path: path,
      },
      500,
    );
  }

  let prNumber: number | null = null;
  let prUrl: string | null = null;
  if (existingPr.data) {
    prNumber = existingPr.data.number;
  } else {
    const pr = await openPullRequest({
      title: `Wiki contribution: ${req.topic}`,
      body: buildPrBody({ topic: req.topic, path, exists, sources: req.sources }),
      head: branch,
      base: "main",
      gh,
    });
    if (pr.ok) {
      prNumber = pr.data.number;
      prUrl = pr.data.html_url;
    } else {
      log.error("contribute", "pr", "open failed", { error: pr.error, branch });
      return jsonResponse(
        {
          ok: false,
          error: `pr open: ${pr.error}`,
          branch,
          committed_path: path,
        },
        500,
      );
    }
  }

  return jsonResponse({
    ok: true,
    dry_run: false,
    path,
    branch,
    pr: prNumber ? { number: prNumber, url: prUrl } : null,
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
  if (topic.length === 0) return topic;
  const spaced = topic.replace(/-/g, " ");
  return spaced[0]!.toUpperCase() + spaced.slice(1);
}

function buildPrBody(args: {
  topic: string;
  path: string;
  exists: boolean;
  sources: string[];
}): string {
  return [
    `Manually-authored wiki article filed via /contribute.`,
    "",
    `- Topic: \`${args.topic}\``,
    `- Path: \`${args.path}\``,
    `- ${args.exists ? "Overwrites existing article" : "New article"}`,
    `- Sources: ${args.sources.length}`,
  ].join("\n");
}

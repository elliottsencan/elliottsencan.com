/**
 * Shared pipeline substrate for the four mutating endpoints.
 *
 * All four mutating endpoints (`/link`, `/synthesize`, `/contribute`,
 * `/recompile`) share branch/commit/PR/crosslink logic via this substrate
 * so each strategy only owns its planning step.
 *
 * Endpoints flow through `runPipeline(strategy, options, env, ctx, deps)`.
 * Each strategy contributes a planning function that returns a `Mutation`
 * (added/changed files) plus optional summary metadata. The substrate owns
 * branch creation, file commits, PR open, and (separately) the cross-link
 * phase that runs after mutations land.
 *
 * Two commit shapes:
 *  - `pr`: branch `${strategy.branchPrefix}/${date}-${ts}` → commit each file
 *    → find-or-open PR. Idempotent on re-runs via `findOpenPrByBranch`.
 *  - `main`: direct commit to main, no branch/PR. Used by /link's share-sheet
 *    path so the reading entry lands instantly. Cross-link follow-up runs via
 *    `ctx.waitUntil` (see `crosslink: "followup"`).
 */

import matter from "gray-matter";
import type { RunCost } from "./cost.ts";
import type { Env, Result } from "./types.ts";
import { log } from "./util.ts";

export type Mutation = {
  added: Array<{ path: string; content: string }>;
  changed: Array<{ path: string; before: string; after: string }>;
};

export type PlanOutput<S> = {
  mutation: Mutation;
  summary?: S;
};

export type PlanResult<S> =
  | { ok: true; data: PlanOutput<S> }
  | { ok: false; error: string; status?: number };

export type CrosslinkChangedFile = {
  path: string;
  before: string;
  after: string;
  frontmatter: Record<string, unknown>;
};

export type CrosslinkResult = {
  forward: number;
  backward: number;
  applied: Array<{ path: string; anchor: string; target: string }>;
  changedFiles: CrosslinkChangedFile[];
  /** Aggregated Anthropic cost across the proposeCrosslinks calls in this phase. */
  run_cost: RunCost;
};

export type CommitMessageInput = {
  added: Array<{ path: string; content: string }>;
  changed: Array<{ path: string; before: string; after: string }>;
};

export type Strategy<S = unknown> = {
  name: string;
  branchPrefix: string;
  plan(state: { env: Env }, env: Env): Promise<PlanResult<S>>;
  prTitle(plan: PlanOutput<S>): string;
  prBody(plan: PlanOutput<S>, crosslink?: CrosslinkResult): string;
  /** Optional commit-message formatter for the batched mutation commit. Default: `${name}: ${count} file(s)`. */
  commitMessage?(input: CommitMessageInput): string;
};

export type RunOptions = {
  commitTarget: "main" | "pr";
  crosslink: "inline" | "followup" | "skip";
};

export type RunResult<S = unknown> =
  | {
      ok: true;
      pr_number?: number;
      pr_url?: string;
      branch?: string;
      /** Last commit SHA from the mutation phase. Useful for /link's share-sheet response. */
      commit_sha?: string;
      summary?: S;
      crosslink?: CrosslinkResult;
    }
  | { ok: false; status: number; error: string };

export type GithubDeps = {
  getBranchSha: (branch: string) => Promise<Result<string>>;
  createBranch: (branch: string, fromSha: string) => Promise<Result<{ alreadyExists: boolean }>>;
  /** Atomic multi-file commit on `branch`. One commit regardless of file count, so a 20-article synthesis run produces 1 commit (and 1 Cloudflare preview build) instead of 20. */
  commitFiles: (args: {
    branch: string;
    files: Array<{ path: string; content: string }>;
    message: string;
  }) => Promise<Result<{ commitSha: string }>>;
  findOpenPrByBranch: (branch: string) => Promise<Result<{ number: number } | null>>;
  openPullRequest: (args: {
    title: string;
    body: string;
    head: string;
    base: string;
  }) => Promise<Result<{ number: number; html_url: string }>>;
};

export type CrosslinkRunner = (input: { mutation: Mutation; env: Env }) => Promise<CrosslinkResult>;

export type RunDeps = {
  github: GithubDeps;
  runCrosslink?: CrosslinkRunner;
};

export async function runPipeline<S>(
  strategy: Strategy<S>,
  options: RunOptions,
  env: Env,
  ctx: ExecutionContext,
  deps: RunDeps,
): Promise<RunResult<S>> {
  const planned = await strategy.plan({ env }, env);
  if (!planned.ok) {
    return { ok: false, status: planned.status ?? 500, error: planned.error };
  }
  const { mutation, summary } = planned.data;

  if (mutation.added.length === 0 && mutation.changed.length === 0) {
    return { ok: true, summary };
  }

  if (options.commitTarget === "main") {
    return commitToMain(strategy, mutation, summary, options, env, ctx, deps);
  }
  return commitToPR(strategy, mutation, summary, options, env, ctx, deps);
}

async function commitToPR<S>(
  strategy: Strategy<S>,
  mutation: Mutation,
  summary: S | undefined,
  options: RunOptions,
  env: Env,
  _ctx: ExecutionContext,
  deps: RunDeps,
): Promise<RunResult<S>> {
  const branch = buildBranchName(strategy.branchPrefix);
  const head = await deps.github.getBranchSha("main");
  if (!head.ok) {
    return { ok: false, status: 502, error: head.error };
  }
  const created = await deps.github.createBranch(branch, head.data);
  if (!created.ok) {
    return { ok: false, status: 502, error: created.error };
  }

  const commitOutcome = await commitMutation(strategy, branch, mutation, deps.github);
  if (commitOutcome.failure) {
    return commitOutcome.failure;
  }

  let crosslink: CrosslinkResult | undefined;
  if (options.crosslink === "inline" && deps.runCrosslink) {
    crosslink = await deps.runCrosslink({ mutation, env });
    if (crosslink.changedFiles.length > 0) {
      const r = await deps.github.commitFiles({
        branch,
        files: crosslink.changedFiles.map((f) => ({
          path: f.path,
          content: matter.stringify(f.after, f.frontmatter),
        })),
        message: `crosslink: ${crosslink.changedFiles.length} file${crosslink.changedFiles.length === 1 ? "" : "s"}`,
      });
      if (!r.ok) {
        return { ok: false, status: 502, error: r.error };
      }
    }
  }

  const existing = await deps.github.findOpenPrByBranch(branch);
  if (!existing.ok) {
    return { ok: false, status: 502, error: existing.error };
  }

  const planOut: PlanOutput<S> = { mutation, summary };
  let pr_number: number;
  let pr_url: string;
  if (existing.data) {
    pr_number = existing.data.number;
    pr_url = `https://github.com/${env.GITHUB_REPO}/pull/${existing.data.number}`;
  } else {
    const opened = await deps.github.openPullRequest({
      title: strategy.prTitle(planOut),
      body: strategy.prBody(planOut, crosslink),
      head: branch,
      base: "main",
    });
    if (!opened.ok) {
      return { ok: false, status: 502, error: opened.error };
    }
    pr_number = opened.data.number;
    pr_url = opened.data.html_url;
  }
  return {
    ok: true,
    pr_number,
    pr_url,
    branch,
    commit_sha: commitOutcome.lastCommitSha,
    summary,
    crosslink,
  };
}

async function commitToMain<S>(
  strategy: Strategy<S>,
  mutation: Mutation,
  summary: S | undefined,
  options: RunOptions,
  env: Env,
  ctx: ExecutionContext,
  deps: RunDeps,
): Promise<RunResult<S>> {
  const commitOutcome = await commitMutation(strategy, "main", mutation, deps.github);
  if (commitOutcome.failure) {
    return commitOutcome.failure;
  }

  if (options.crosslink === "followup" && deps.runCrosslink) {
    const runCrosslink = deps.runCrosslink;
    const github = deps.github;
    const strategyName = strategy.name;
    ctx.waitUntil(runCrosslinkFollowup({ runCrosslink, github, mutation, env, strategyName }));
  }
  return { ok: true, summary, commit_sha: commitOutcome.lastCommitSha };
}

/**
 * Best-effort follow-up: runs the cross-link phase against the just-committed
 * mutation, and if the phase produced any insertions, opens a separate PR
 * carrying them. Failures are logged and swallowed — the synchronous /link
 * response was already returned to the share-sheet caller.
 *
 * Runs after the synchronous response returns (via `ctx.waitUntil`), so
 * failures cannot block the share-sheet caller.
 */
async function runCrosslinkFollowup(args: {
  runCrosslink: CrosslinkRunner;
  github: GithubDeps;
  mutation: Mutation;
  env: Env;
  strategyName: string;
}): Promise<void> {
  try {
    const result = await args.runCrosslink({ mutation: args.mutation, env: args.env });
    if (result.changedFiles.length === 0) {
      log.info("pipeline", "crosslink-followup", "no edits proposed", {
        strategy: args.strategyName,
      });
      return;
    }
    const branch = `crosslink/from-${args.strategyName}-${Date.now().toString(36)}`;
    const head = await args.github.getBranchSha("main");
    if (!head.ok) {
      log.error("pipeline", "crosslink-followup", "branch sha failed", { error: head.error });
      return;
    }
    const created = await args.github.createBranch(branch, head.data);
    if (!created.ok) {
      log.error("pipeline", "crosslink-followup", "branch create failed", {
        error: created.error,
      });
      return;
    }
    const put = await args.github.commitFiles({
      branch,
      files: result.changedFiles.map((f) => ({
        path: f.path,
        content: matter.stringify(f.after, f.frontmatter),
      })),
      message: `crosslink: ${result.changedFiles.length} file${result.changedFiles.length === 1 ? "" : "s"}`,
    });
    if (!put.ok) {
      log.error("pipeline", "crosslink-followup", "commit failed", {
        proposed: result.changedFiles.length,
        error: put.error,
      });
      return;
    }
    const opened = await args.github.openPullRequest({
      title: `Cross-link suggestions (from ${args.strategyName}, ${result.changedFiles.length} file${result.changedFiles.length === 1 ? "" : "s"})`,
      body: buildFollowupPrBody(result, args.strategyName, 0),
      head: branch,
      base: "main",
    });
    if (!opened.ok) {
      log.error("pipeline", "crosslink-followup", "pr open failed", { error: opened.error });
      return;
    }
    log.info("pipeline", "crosslink-followup", "pr opened", {
      strategy: args.strategyName,
      pr: opened.data.number,
      url: opened.data.html_url,
    });
  } catch (err) {
    log.error("pipeline", "crosslink-followup", "threw", {
      msg: err instanceof Error ? err.message : String(err),
      strategy: args.strategyName,
    });
  }
}

function buildFollowupPrBody(
  result: CrosslinkResult,
  strategyName: string,
  dropped: number,
): string {
  const lines: string[] = [
    `Follow-up cross-link suggestions for the recent ${strategyName} commit.`,
    "",
    `- Forward proposals: ${result.forward}`,
    `- Backward proposals: ${result.backward}`,
    `- Applied edits: ${result.applied.length}`,
  ];
  if (dropped > 0) {
    lines.push(`- Dropped (commit failed): ${dropped} — see worker logs for per-file errors`);
  }
  lines.push("", "## Insertions");
  for (const a of result.applied) {
    lines.push(`- \`${a.path}\` — \`${a.anchor}\` → ${a.target}`);
  }
  return lines.join("\n");
}

async function commitMutation<S>(
  strategy: Strategy<S>,
  branch: string,
  mutation: Mutation,
  github: GithubDeps,
): Promise<{
  failure: { ok: false; status: number; error: string } | null;
  lastCommitSha: string | undefined;
}> {
  const total = mutation.added.length + mutation.changed.length;
  if (total === 0) {
    return { failure: null, lastCommitSha: undefined };
  }
  const files = [
    ...mutation.added.map((f) => ({ path: f.path, content: f.content })),
    ...mutation.changed.map((f) => ({ path: f.path, content: f.after })),
  ];
  const message =
    strategy.commitMessage?.({ added: mutation.added, changed: mutation.changed }) ??
    `${strategy.name}: ${total} file${total === 1 ? "" : "s"}`;
  const r = await github.commitFiles({ branch, files, message });
  if (!r.ok) {
    return { failure: { ok: false, status: 502, error: r.error }, lastCommitSha: undefined };
  }
  return { failure: null, lastCommitSha: r.data.commitSha };
}

function buildBranchName(prefix: string): string {
  const date = new Date().toISOString().slice(0, 10);
  const ts = Date.now().toString(36);
  return `${prefix}/${date}-${ts}`;
}

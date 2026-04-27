/**
 * Shared pipeline substrate for the four mutating endpoints.
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

import type { Env, Result } from "./types.ts";
import { log } from "./util.ts";

export type Mutation = {
  added: Array<{ path: string; content: string }>;
  changed: Array<{ path: string; before: string; after: string }>;
};

export type PlanOutput = {
  mutation: Mutation;
  summary?: Record<string, unknown>;
};

export type PlanResult =
  | { ok: true; data: PlanOutput }
  | { ok: false; error: string; status?: number };

export type CrosslinkResult = {
  forward: number;
  backward: number;
  applied: Array<{ path: string; anchor: string; target: string }>;
  changedFiles: Array<{ path: string; before: string; after: string }>;
};

export type Strategy = {
  name: string;
  branchPrefix: string;
  plan(state: { env: Env }, env: Env): Promise<PlanResult>;
  prTitle(plan: PlanOutput): string;
  prBody(plan: PlanOutput, crosslink?: CrosslinkResult): string;
};

export type RunOptions = {
  commitTarget: "main" | "pr";
  crosslink: "inline" | "followup" | "skip";
};

export type RunResult =
  | {
      ok: true;
      pr_number?: number;
      pr_url?: string;
      branch?: string;
      /** Last commit SHA from the mutation phase. Useful for /link's share-sheet response. */
      commit_sha?: string;
      summary?: Record<string, unknown>;
      crosslink?: CrosslinkResult;
    }
  | { ok: false; status: number; error: string };

export type GithubDeps = {
  getBranchSha: (branch: string) => Promise<Result<string>>;
  createBranch: (
    branch: string,
    fromSha: string,
  ) => Promise<Result<{ alreadyExists: boolean }>>;
  /**
   * Fetch a file's content + sha from a ref. The substrate uses this to
   * resolve the sha for changed files before update commits. Returns
   * `{ ok: false }` for new files (which is how the substrate distinguishes
   * "no sha needed" from "sha required but unavailable").
   */
  getFile: (path: string, ref: string) => Promise<Result<{ content: string; sha: string }>>;
  putFile: (args: {
    path: string;
    branch: string;
    content: string;
    message: string;
    sha?: string;
  }) => Promise<Result<{ blobSha: string; commitSha: string }>>;
  findOpenPrByBranch: (branch: string) => Promise<Result<{ number: number } | null>>;
  openPullRequest: (args: {
    title: string;
    body: string;
    head: string;
    base: string;
  }) => Promise<Result<{ number: number; html_url: string }>>;
};

export type CrosslinkRunner = (input: {
  mutation: Mutation;
  env: Env;
}) => Promise<CrosslinkResult>;

export type RunDeps = {
  github: GithubDeps;
  runCrosslink?: CrosslinkRunner;
};

export async function runPipeline(
  strategy: Strategy,
  options: RunOptions,
  env: Env,
  ctx: ExecutionContext,
  deps: RunDeps,
): Promise<RunResult> {
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

async function commitToPR(
  strategy: Strategy,
  mutation: Mutation,
  summary: Record<string, unknown> | undefined,
  options: RunOptions,
  env: Env,
  _ctx: ExecutionContext,
  deps: RunDeps,
): Promise<RunResult> {
  const branch = buildBranchName(strategy.branchPrefix);
  const head = await deps.github.getBranchSha("main");
  if (!head.ok) return { ok: false, status: 502, error: head.error };
  const created = await deps.github.createBranch(branch, head.data);
  if (!created.ok) return { ok: false, status: 502, error: created.error };

  const commitOutcome = await commitMutation(strategy.name, branch, mutation, deps.github);
  if (commitOutcome.failure) return commitOutcome.failure;

  let crosslink: CrosslinkResult | undefined;
  if (options.crosslink === "inline" && deps.runCrosslink) {
    crosslink = await deps.runCrosslink({ mutation, env });
    for (const f of crosslink.changedFiles) {
      const existing = await deps.github.getFile(f.path, "main");
      const sha = existing.ok ? existing.data.sha : undefined;
      const r = await deps.github.putFile({
        path: f.path,
        branch,
        content: f.after,
        message: `crosslink: ${f.path}`,
        ...(sha ? { sha } : {}),
      });
      if (!r.ok) return { ok: false, status: 502, error: r.error };
    }
  }

  const existing = await deps.github.findOpenPrByBranch(branch);
  if (!existing.ok) return { ok: false, status: 502, error: existing.error };

  const planOut: PlanOutput = { mutation, summary };
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
    if (!opened.ok) return { ok: false, status: 502, error: opened.error };
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

async function commitToMain(
  strategy: Strategy,
  mutation: Mutation,
  summary: Record<string, unknown> | undefined,
  options: RunOptions,
  env: Env,
  ctx: ExecutionContext,
  deps: RunDeps,
): Promise<RunResult> {
  const commitOutcome = await commitMutation(strategy.name, "main", mutation, deps.github);
  if (commitOutcome.failure) return commitOutcome.failure;

  if (options.crosslink === "followup" && deps.runCrosslink) {
    const runCrosslink = deps.runCrosslink;
    const github = deps.github;
    const strategyName = strategy.name;
    ctx.waitUntil(
      runCrosslinkFollowup({ runCrosslink, github, mutation, env, strategyName }),
    );
  }
  return { ok: true, summary, commit_sha: commitOutcome.lastCommitSha };
}

/**
 * Best-effort follow-up: runs the cross-link phase against the just-committed
 * mutation, and if the phase produced any insertions, opens a separate PR
 * carrying them. Failures are logged and swallowed — the synchronous /link
 * response was already returned to the share-sheet caller.
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
    for (const f of result.changedFiles) {
      const existing = await args.github.getFile(f.path, "main");
      const sha = existing.ok ? existing.data.sha : undefined;
      const put = await args.github.putFile({
        path: f.path,
        branch,
        content: f.after,
        message: `crosslink: ${f.path}`,
        ...(sha ? { sha } : {}),
      });
      if (!put.ok) {
        log.error("pipeline", "crosslink-followup", "put failed", {
          path: f.path,
          error: put.error,
        });
      }
    }
    const opened = await args.github.openPullRequest({
      title: `Cross-link suggestions (from ${args.strategyName}, ${result.changedFiles.length} file${result.changedFiles.length === 1 ? "" : "s"})`,
      body: buildFollowupPrBody(result, args.strategyName),
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

function buildFollowupPrBody(result: CrosslinkResult, strategyName: string): string {
  const lines: string[] = [
    `Follow-up cross-link suggestions for the recent ${strategyName} commit.`,
    "",
    `- Forward proposals: ${result.forward}`,
    `- Backward proposals: ${result.backward}`,
    `- Applied edits: ${result.applied.length}`,
    "",
    "## Insertions",
  ];
  for (const a of result.applied) {
    lines.push(`- \`${a.path}\` — \`${a.anchor}\` → ${a.target}`);
  }
  return lines.join("\n");
}

async function commitMutation(
  strategyName: string,
  branch: string,
  mutation: Mutation,
  github: GithubDeps,
): Promise<{ failure: RunResult | null; lastCommitSha: string | undefined }> {
  let lastCommitSha: string | undefined;
  for (const f of mutation.added) {
    const r = await github.putFile({
      path: f.path,
      branch,
      content: f.content,
      message: `${strategyName}: ${f.path}`,
    });
    if (!r.ok) return { failure: { ok: false, status: 502, error: r.error }, lastCommitSha };
    lastCommitSha = r.data.commitSha;
  }
  for (const f of mutation.changed) {
    // Update commits to an existing path require the file's sha. Look it up
    // on main rather than threading it through the strategy contract — keeps
    // Mutation simple and keeps strategies from having to know the layout
    // of the existing file system.
    const existing = await github.getFile(f.path, "main");
    const sha = existing.ok ? existing.data.sha : undefined;
    const r = await github.putFile({
      path: f.path,
      branch,
      content: f.after,
      message: `${strategyName}: update ${f.path}`,
      ...(sha ? { sha } : {}),
    });
    if (!r.ok) return { failure: { ok: false, status: 502, error: r.error }, lastCommitSha };
    lastCommitSha = r.data.commitSha;
  }
  return { failure: null, lastCommitSha };
}

function buildBranchName(prefix: string): string {
  const date = new Date().toISOString().slice(0, 10);
  const ts = Date.now().toString(36);
  return `${prefix}/${date}-${ts}`;
}

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

  const commitFailure = await commitMutation(strategy.name, branch, mutation, deps.github);
  if (commitFailure) return commitFailure;

  let crosslink: CrosslinkResult | undefined;
  if (options.crosslink === "inline" && deps.runCrosslink) {
    crosslink = await deps.runCrosslink({ mutation, env });
    for (const f of crosslink.changedFiles) {
      const r = await deps.github.putFile({
        path: f.path,
        branch,
        content: f.after,
        message: `crosslink: ${f.path}`,
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
  return { ok: true, pr_number, pr_url, branch, summary, crosslink };
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
  const failure = await commitMutation(strategy.name, "main", mutation, deps.github);
  if (failure) return failure;

  if (options.crosslink === "followup" && deps.runCrosslink) {
    const runCrosslink = deps.runCrosslink;
    ctx.waitUntil(
      runCrosslink({ mutation, env }).then(
        () => undefined,
        (err: unknown) => {
          // Best-effort: failure of the follow-up PR is logged but never
          // propagated back to the synchronous /link response.
          console.error(
            `[pipeline:${strategy.name}] crosslink followup failed: ${err instanceof Error ? err.message : String(err)}`,
          );
        },
      ),
    );
  }
  return { ok: true, summary };
}

async function commitMutation(
  strategyName: string,
  branch: string,
  mutation: Mutation,
  github: GithubDeps,
): Promise<RunResult | null> {
  for (const f of mutation.added) {
    const r = await github.putFile({
      path: f.path,
      branch,
      content: f.content,
      message: `${strategyName}: ${f.path}`,
    });
    if (!r.ok) return { ok: false, status: 502, error: r.error };
  }
  for (const f of mutation.changed) {
    const r = await github.putFile({
      path: f.path,
      branch,
      content: f.after,
      message: `${strategyName}: update ${f.path}`,
    });
    if (!r.ok) return { ok: false, status: 502, error: r.error };
  }
  return null;
}

function buildBranchName(prefix: string): string {
  const date = new Date().toISOString().slice(0, 10);
  const ts = Date.now().toString(36);
  return `${prefix}/${date}-${ts}`;
}

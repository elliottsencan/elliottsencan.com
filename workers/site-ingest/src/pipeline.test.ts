import { describe, expect, it, vi } from "vitest";
import { runPipeline } from "./pipeline.ts";
import type { GithubDeps, Strategy } from "./pipeline.ts";
import type { Env } from "./types.ts";

const fakeEnv = () =>
  ({
    GITHUB_TOKEN: "x",
    GITHUB_REPO: "owner/repo",
    ANTHROPIC_API_KEY: "x",
  }) as unknown as Env;

const fakeCtx = () => ({ waitUntil: vi.fn() }) as unknown as ExecutionContext;

const okGithubDeps = (): GithubDeps => ({
  getBranchSha: vi.fn().mockResolvedValue({ ok: true, data: "abc123" }),
  createBranch: vi.fn().mockResolvedValue({ ok: true, data: { alreadyExists: false } }),
  putFile: vi
    .fn()
    .mockResolvedValue({ ok: true, data: { blobSha: "blob", commitSha: "def456" } }),
  findOpenPrByBranch: vi.fn().mockResolvedValue({ ok: true, data: null }),
  openPullRequest: vi
    .fn()
    .mockResolvedValue({ ok: true, data: { number: 42, html_url: "https://github.com/owner/repo/pull/42" } }),
});

const fakeStrategy = (overrides: Partial<Strategy> = {}): Strategy => ({
  name: "fake",
  branchPrefix: "fake",
  plan: async () => ({
    ok: true,
    data: {
      mutation: { added: [{ path: "a.md", content: "A" }], changed: [] },
      summary: { count: 1 },
    },
  }),
  prTitle: () => "Fake PR",
  prBody: () => "body",
  ...overrides,
});

describe("runPipeline (PR target)", () => {
  it("creates branch, commits files, opens PR via injected github helpers", async () => {
    const github = okGithubDeps();
    const result = await runPipeline(
      fakeStrategy(),
      { commitTarget: "pr", crosslink: "skip" },
      fakeEnv(),
      fakeCtx(),
      { github },
    );
    expect(result.ok).toBe(true);
    expect(github.createBranch).toHaveBeenCalled();
    expect(github.putFile).toHaveBeenCalledTimes(1);
    expect(github.openPullRequest).toHaveBeenCalled();
    if (result.ok) {
      expect(result.pr_number).toBe(42);
      expect(result.pr_url).toContain("/pull/42");
    }
  });

  it("reuses an existing PR found by branch (idempotent re-run)", async () => {
    const github = okGithubDeps();
    github.findOpenPrByBranch = vi.fn().mockResolvedValue({ ok: true, data: { number: 7 } });
    const result = await runPipeline(
      fakeStrategy(),
      { commitTarget: "pr", crosslink: "skip" },
      fakeEnv(),
      fakeCtx(),
      { github },
    );
    expect(result.ok).toBe(true);
    expect(github.openPullRequest).not.toHaveBeenCalled();
    if (result.ok) {
      expect(result.pr_number).toBe(7);
      expect(result.pr_url).toBe("https://github.com/owner/repo/pull/7");
    }
  });

  it("commits both added and changed files", async () => {
    const github = okGithubDeps();
    const strategy = fakeStrategy({
      plan: async () => ({
        ok: true,
        data: {
          mutation: {
            added: [{ path: "a.md", content: "A" }],
            changed: [{ path: "b.md", before: "old", after: "new" }],
          },
        },
      }),
    });
    await runPipeline(
      strategy,
      { commitTarget: "pr", crosslink: "skip" },
      fakeEnv(),
      fakeCtx(),
      { github },
    );
    expect(github.putFile).toHaveBeenCalledTimes(2);
  });
});

describe("runPipeline (main target)", () => {
  it("commits to main without creating branch or PR", async () => {
    const github = okGithubDeps();
    const strategy = fakeStrategy({
      plan: async () => ({
        ok: true,
        data: { mutation: { added: [{ path: "r.md", content: "R" }], changed: [] } },
      }),
    });
    const result = await runPipeline(
      strategy,
      { commitTarget: "main", crosslink: "skip" },
      fakeEnv(),
      fakeCtx(),
      { github },
    );
    expect(result.ok).toBe(true);
    expect(github.putFile).toHaveBeenCalledWith(expect.objectContaining({ branch: "main" }));
    expect(github.createBranch).not.toHaveBeenCalled();
    expect(github.openPullRequest).not.toHaveBeenCalled();
  });
});

describe("runPipeline (abort propagation)", () => {
  it("propagates status from aborted plan()", async () => {
    const github = {} as unknown as GithubDeps;
    const strategy = fakeStrategy({
      plan: async () => ({ ok: false, error: "exists", status: 409 }),
    });
    const result = await runPipeline(
      strategy,
      { commitTarget: "pr", crosslink: "skip" },
      fakeEnv(),
      fakeCtx(),
      { github },
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(409);
  });

  it("returns 500 when plan() reports failure without status", async () => {
    const github = {} as unknown as GithubDeps;
    const strategy = fakeStrategy({
      plan: async () => ({ ok: false, error: "boom" }),
    });
    const result = await runPipeline(
      strategy,
      { commitTarget: "pr", crosslink: "skip" },
      fakeEnv(),
      fakeCtx(),
      { github },
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(500);
  });

  it("returns ok:true with no PR when mutation is empty", async () => {
    const github = okGithubDeps();
    const strategy = fakeStrategy({
      plan: async () => ({
        ok: true,
        data: { mutation: { added: [], changed: [] }, summary: { skipped: 3 } },
      }),
    });
    const result = await runPipeline(
      strategy,
      { commitTarget: "pr", crosslink: "skip" },
      fakeEnv(),
      fakeCtx(),
      { github },
    );
    expect(result.ok).toBe(true);
    expect(github.createBranch).not.toHaveBeenCalled();
    if (result.ok) expect(result.summary).toEqual({ skipped: 3 });
  });
});

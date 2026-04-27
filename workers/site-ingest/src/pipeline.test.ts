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
  // Default to "file does not exist" — `added` paths take this path. Tests
  // for `changed` mutations override to return a valid sha.
  getFile: vi.fn().mockResolvedValue({ ok: false, error: "404 not found" }),
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

  it("looks up sha from main and threads it to putFile for changed files", async () => {
    const github = okGithubDeps();
    github.getFile = vi
      .fn()
      .mockResolvedValue({ ok: true, data: { content: "old", sha: "main-sha" } });
    const strategy = fakeStrategy({
      plan: async () => ({
        ok: true,
        data: {
          mutation: {
            added: [],
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
    expect(github.getFile).toHaveBeenCalledWith("b.md", "main");
    expect(github.putFile).toHaveBeenCalledWith(
      expect.objectContaining({ path: "b.md", sha: "main-sha" }),
    );
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

  it("invokes injected runCrosslink on inline crosslink and commits changedFiles to the same branch", async () => {
    const github = okGithubDeps();
    const runCrosslink = vi.fn().mockResolvedValue({
      forward: 1,
      backward: 0,
      applied: [{ path: "src/content/wiki/x.md", anchor: "y", target: "/wiki/y" }],
      changedFiles: [
        { path: "src/content/wiki/x.md", before: "y", after: "[y](/wiki/y)" },
      ],
    });
    const result = await runPipeline(
      fakeStrategy(),
      { commitTarget: "pr", crosslink: "inline" },
      fakeEnv(),
      fakeCtx(),
      { github, runCrosslink },
    );
    expect(runCrosslink).toHaveBeenCalledTimes(1);
    expect(github.putFile).toHaveBeenCalledTimes(2); // 1 added + 1 from crosslink phase
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.crosslink?.applied.length).toBe(1);
  });

  it("fires runCrosslink via ctx.waitUntil for followup (commitTarget=main)", async () => {
    const ctx = { waitUntil: vi.fn() } as unknown as ExecutionContext;
    const github = okGithubDeps();
    const runCrosslink = vi.fn().mockResolvedValue({
      forward: 0,
      backward: 0,
      applied: [],
      changedFiles: [],
    });
    const strategy = fakeStrategy({
      plan: async () => ({
        ok: true,
        data: { mutation: { added: [{ path: "r.md", content: "R" }], changed: [] } },
      }),
    });
    await runPipeline(
      strategy,
      { commitTarget: "main", crosslink: "followup" },
      fakeEnv(),
      ctx,
      { github, runCrosslink },
    );
    expect(ctx.waitUntil).toHaveBeenCalled();
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

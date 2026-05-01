import { describe, expect, it, vi } from "vitest";
import type { GithubDeps, Strategy } from "./pipeline.ts";
import { runPipeline } from "./pipeline.ts";
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
  commitFiles: vi.fn().mockResolvedValue({ ok: true, data: { commitSha: "def456" } }),
  findOpenPrByBranch: vi.fn().mockResolvedValue({ ok: true, data: null }),
  openPullRequest: vi.fn().mockResolvedValue({
    ok: true,
    data: { number: 42, html_url: "https://github.com/owner/repo/pull/42" },
  }),
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
  it("creates branch, commits files in one call, opens PR via injected github helpers", async () => {
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
    // Single batched commit regardless of file count — the whole point of the
    // Trees-API substrate.
    expect(github.commitFiles).toHaveBeenCalledTimes(1);
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

  it("batches added and changed files into a single commit", async () => {
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
    await runPipeline(strategy, { commitTarget: "pr", crosslink: "skip" }, fakeEnv(), fakeCtx(), {
      github,
    });
    expect(github.commitFiles).toHaveBeenCalledTimes(1);
    const args = (github.commitFiles as ReturnType<typeof vi.fn>).mock.calls[0]?.[0];
    expect(args?.files).toEqual([
      { path: "a.md", content: "A" },
      { path: "b.md", content: "new" },
    ]);
  });

  it("uses the strategy commitMessage override when provided", async () => {
    const github = okGithubDeps();
    const strategy = fakeStrategy({
      commitMessage: ({ added, changed }) =>
        `custom: ${added.length} added, ${changed.length} changed`,
    });
    await runPipeline(strategy, { commitTarget: "pr", crosslink: "skip" }, fakeEnv(), fakeCtx(), {
      github,
    });
    const args = (github.commitFiles as ReturnType<typeof vi.fn>).mock.calls[0]?.[0];
    expect(args?.message).toBe("custom: 1 added, 0 changed");
  });

  it("falls back to a default message when commitMessage is not provided", async () => {
    const github = okGithubDeps();
    await runPipeline(
      fakeStrategy(),
      { commitTarget: "pr", crosslink: "skip" },
      fakeEnv(),
      fakeCtx(),
      { github },
    );
    const args = (github.commitFiles as ReturnType<typeof vi.fn>).mock.calls[0]?.[0];
    expect(args?.message).toBe("fake: 1 file");
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
    expect(github.commitFiles).toHaveBeenCalledWith(expect.objectContaining({ branch: "main" }));
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
    if (!result.ok) {
      expect(result.status).toBe(409);
    }
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
    if (!result.ok) {
      expect(result.status).toBe(500);
    }
  });

  it("invokes runCrosslink on inline crosslink and batches changedFiles into one extra commit", async () => {
    const github = okGithubDeps();
    const runCrosslink = vi.fn().mockResolvedValue({
      forward: 1,
      backward: 0,
      applied: [{ path: "src/content/wiki/x.md", anchor: "y", target: "/wiki/y" }],
      changedFiles: [
        {
          path: "src/content/wiki/x.md",
          before: "y",
          after: "[y](/wiki/y)",
          frontmatter: { title: "x", summary: "y", sources: ["a", "b"] },
        },
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
    // Two commits: the strategy mutation + the crosslink batch.
    expect(github.commitFiles).toHaveBeenCalledTimes(2);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.crosslink?.applied.length).toBe(1);
    }
  });

  it("commits a freshly-added file plus its crosslink edit cleanly (regression: synth-then-crosslink seam)", async () => {
    // Before the Trees-API substrate, the crosslink phase did getFile+putFile
    // per file. For a wiki article synthesize had just added (404 on main, exists
    // on the branch), the put failed with 422 "sha wasn't supplied". With the
    // batched commit there is no per-file sha to look up — both commits land
    // cleanly off the branch's current head.
    const github = okGithubDeps();
    const runCrosslink = vi.fn().mockResolvedValue({
      forward: 1,
      backward: 0,
      applied: [{ path: "src/content/wiki/ai-agents.md", anchor: "y", target: "/wiki/y" }],
      changedFiles: [
        {
          path: "src/content/wiki/ai-agents.md",
          before: "raw",
          after: "with-link",
          frontmatter: { title: "AI Agents", summary: "x", sources: ["a", "b"] },
        },
      ],
    });
    const strategy = fakeStrategy({
      plan: async () => ({
        ok: true,
        data: {
          mutation: {
            added: [{ path: "src/content/wiki/ai-agents.md", content: "raw" }],
            changed: [],
          },
        },
      }),
    });
    const result = await runPipeline(
      strategy,
      { commitTarget: "pr", crosslink: "inline" },
      fakeEnv(),
      fakeCtx(),
      { github, runCrosslink },
    );
    expect(result.ok).toBe(true);
    expect(github.commitFiles).toHaveBeenCalledTimes(2);
    const calls = (github.commitFiles as ReturnType<typeof vi.fn>).mock.calls;
    // First call is the synth mutation, second is the crosslink batch — both
    // address the same branch.
    const branches = calls.map(([arg]) => arg.branch);
    expect(new Set(branches).size).toBe(1);
    expect(branches[0]?.startsWith("fake/")).toBe(true);
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
    await runPipeline(strategy, { commitTarget: "main", crosslink: "followup" }, fakeEnv(), ctx, {
      github,
      runCrosslink,
    });
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
    expect(github.commitFiles).not.toHaveBeenCalled();
    if (result.ok) {
      expect(result.summary).toEqual({ skipped: 3 });
    }
  });
});

describe("runCrosslinkFollowup (honesty)", () => {
  it("does not open a PR when the crosslink batch commit fails", async () => {
    const github = okGithubDeps();
    let commitCallCount = 0;
    github.commitFiles = vi.fn().mockImplementation(async () => {
      commitCallCount++;
      if (commitCallCount === 1) {
        // strategy mutation succeeds
        return { ok: true, data: { commitSha: "main456" } };
      }
      return { ok: false, error: "github 502" };
    });
    const ctx = { waitUntil: vi.fn() } as unknown as ExecutionContext;
    const runCrosslink = vi.fn().mockResolvedValue({
      forward: 0,
      backward: 1,
      applied: [{ path: "src/content/wiki/x.md", anchor: "y", target: "/wiki/y" }],
      changedFiles: [
        {
          path: "src/content/wiki/x.md",
          before: "x",
          after: "[y](/wiki/y)",
          frontmatter: { title: "x", summary: "y", sources: ["a", "b"] },
        },
      ],
      skipped: { validationFailures: {}, missingSlug: 0, applyNoop: 0, apiFailures: 0 },
    });
    const strategy = fakeStrategy({
      plan: async () => ({
        ok: true,
        data: { mutation: { added: [{ path: "r.md", content: "R" }], changed: [] } },
      }),
    });
    await runPipeline(strategy, { commitTarget: "main", crosslink: "followup" }, fakeEnv(), ctx, {
      github,
      runCrosslink,
    });
    const waitFn = (ctx.waitUntil as ReturnType<typeof vi.fn>).mock.calls[0]?.[0];
    if (waitFn) {
      await waitFn;
    }
    expect(github.openPullRequest).not.toHaveBeenCalled();
  });
});

describe("runPipeline (frontmatter preservation on crosslink)", () => {
  it("commits crosslink edits with frontmatter recombined (regression: was committing body only)", async () => {
    const github = okGithubDeps();
    const runCrosslink = vi.fn().mockResolvedValue({
      forward: 1,
      backward: 0,
      applied: [{ path: "src/content/wiki/x.md", anchor: "y", target: "/wiki/y" }],
      changedFiles: [
        {
          path: "src/content/wiki/x.md",
          before: "Karpathy described an LLM Wiki pattern.",
          after: "Karpathy described an [LLM Wiki pattern](/wiki/y).",
          frontmatter: {
            title: "Karpathy",
            summary: "Single source for the wiki concept.",
            sources: ["a", "b"],
            compiled_at: "2026-04-01T00:00:00Z",
            compiled_with: "claude-test",
          },
        },
      ],
      skipped: { validationFailures: {}, missingSlug: 0, applyNoop: 0, apiFailures: 0 },
    });
    const result = await runPipeline(
      fakeStrategy(),
      { commitTarget: "pr", crosslink: "inline" },
      fakeEnv(),
      fakeCtx(),
      { github, runCrosslink },
    );
    expect(result.ok).toBe(true);
    const calls = (github.commitFiles as ReturnType<typeof vi.fn>).mock.calls;
    const crosslinkCall = calls.find(([arg]) =>
      arg.files.some((f: { path: string }) => f.path === "src/content/wiki/x.md"),
    );
    expect(crosslinkCall).toBeDefined();
    const committedFile = crosslinkCall?.[0].files.find(
      (f: { path: string }) => f.path === "src/content/wiki/x.md",
    );
    const committedContent = committedFile?.content as string;
    expect(committedContent.startsWith("---\n")).toBe(true);
    expect(committedContent).toContain("title: Karpathy");
    expect(committedContent).toContain("compiled_with: claude-test");
    expect(committedContent).toContain("[LLM Wiki pattern](/wiki/y)");
  });
});

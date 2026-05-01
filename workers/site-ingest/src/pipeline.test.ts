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
  // Default to "file does not exist" — `added` paths take this path. Tests
  // for `changed` mutations override to return a valid sha.
  getFile: vi.fn().mockResolvedValue({ ok: false, error: "404 not found" }),
  putFile: vi.fn().mockResolvedValue({ ok: true, data: { blobSha: "blob", commitSha: "def456" } }),
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
    await runPipeline(strategy, { commitTarget: "pr", crosslink: "skip" }, fakeEnv(), fakeCtx(), {
      github,
    });
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
    await runPipeline(strategy, { commitTarget: "pr", crosslink: "skip" }, fakeEnv(), fakeCtx(), {
      github,
    });
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

  it("invokes injected runCrosslink on inline crosslink and commits changedFiles to the same branch", async () => {
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
    expect(github.putFile).toHaveBeenCalledTimes(2); // 1 added + 1 from crosslink phase
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.crosslink?.applied.length).toBe(1);
    }
  });

  it("resolves crosslink sha against the synthesis branch, not main, so newly-added files commit cleanly", async () => {
    // Regression: when synthesize creates a new wiki article and the inline
    // crosslink phase modifies it, the sha lookup must hit the branch (where
    // the file now exists) and not main (where it 404s, leaving the sha
    // undefined and triggering a 422 "sha wasn't supplied" on put).
    const github = okGithubDeps();
    const refsSeen: string[] = [];
    github.getFile = vi.fn().mockImplementation(async (_path: string, ref: string) => {
      refsSeen.push(ref);
      if (ref === "main") {
        return { ok: false, error: "404 not found" };
      }
      return { ok: true, data: { content: "stub", sha: "branch-sha-1" } };
    });
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
    // commitMutation reads from main (added path) → 404 expected.
    // Crosslink commit MUST read from the synthesis branch.
    const crosslinkRef = refsSeen[refsSeen.length - 1];
    expect(crosslinkRef).not.toBe("main");
    expect(crosslinkRef?.startsWith("fake/")).toBe(true);
    // Put used the branch-resolved sha, not undefined.
    const putCalls = (github.putFile as unknown as { mock: { calls: Array<[Record<string, unknown>]> } }).mock.calls;
    const crosslinkPut = putCalls.find(([arg]) => arg.message === "crosslink: src/content/wiki/ai-agents.md");
    expect(crosslinkPut?.[0]?.sha).toBe("branch-sha-1");
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
    if (result.ok) {
      expect(result.summary).toEqual({ skipped: 3 });
    }
  });
});

describe("runCrosslinkFollowup (honesty)", () => {
  it("does not open a PR when every file commit fails", async () => {
    const github = okGithubDeps();
    // Make every putFile call fail except the strategy's own create.
    let putCallCount = 0;
    github.putFile = vi.fn().mockImplementation(async () => {
      putCallCount++;
      if (putCallCount === 1) {
        // strategy commit succeeds
        return { ok: true, data: { blobSha: "blob", commitSha: "main456" } };
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
    // Manually invoke the captured waitUntil function to trigger the followup.
    const waitFn = (ctx.waitUntil as ReturnType<typeof vi.fn>).mock.calls[0]?.[0];
    if (waitFn) {
      await waitFn;
    }
    // The followup should NOT have called openPullRequest because no files
    // committed successfully (all post-strategy putFile calls failed).
    expect(github.openPullRequest).not.toHaveBeenCalled();
  });
});

describe("runPipeline (frontmatter preservation on crosslink)", () => {
  it("commits crosslink edits with frontmatter recombined (regression: was committing body only)", async () => {
    const github = okGithubDeps();
    // The crosslink runner produces body-only `after`. The substrate must
    // re-stringify with the carried frontmatter before putFile.
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
    const calls = (github.putFile as ReturnType<typeof vi.fn>).mock.calls;
    const crosslinkCall = calls.find((c) => c[0].path === "src/content/wiki/x.md");
    expect(crosslinkCall).toBeDefined();
    const committedContent = crosslinkCall?.[0].content as string;
    // Frontmatter recombined (the bug: this used to be body-only):
    expect(committedContent.startsWith("---\n")).toBe(true);
    expect(committedContent).toContain("title: Karpathy");
    expect(committedContent).toContain("compiled_with: claude-test");
    expect(committedContent).toContain("[LLM Wiki pattern](/wiki/y)");
  });
});

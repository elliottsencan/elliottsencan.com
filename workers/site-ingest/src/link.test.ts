import matter from "gray-matter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as anthropicModule from "./anthropic.ts";
import { type LinkSummary, LinkSummarySchema } from "./anthropic.ts";
import * as githubModule from "./github.ts";
import {
  buildEntryMarkdown,
  buildOptOutStubMarkdown,
  countExistingTopicEntries,
  handle,
  makeLinkStrategy,
  OPT_OUT_STUB_SUMMARY,
  patchExistingWikiSources,
  selectThresholdTriggers,
  spawnThresholdSynthesis,
  validate,
  type WikiPatchOutcome,
} from "./link.ts";
import { __resetRobotsCacheForTests } from "./optout.ts";
import * as pipelineModule from "./pipeline.ts";
import type { Env, Result } from "./types.ts";

describe("link.validate", () => {
  it("rejects non-object bodies", () => {
    expect(validate(null)).toMatchObject({ ok: false });
    expect(validate(undefined)).toMatchObject({ ok: false });
    expect(validate("a string")).toMatchObject({ ok: false });
    expect(validate(42)).toMatchObject({ ok: false });
  });

  it("requires url to be a string", () => {
    const r = validate({ url: 123 });
    expect(r.ok).toBe(false);
  });

  it("rejects malformed URLs", () => {
    expect(validate({ url: "not a url" })).toMatchObject({ ok: false });
  });

  it("rejects file:// URLs", () => {
    expect(validate({ url: "file:///etc/passwd" })).toMatchObject({ ok: false });
  });

  it("rejects javascript: URLs", () => {
    expect(validate({ url: "javascript:alert(1)" })).toMatchObject({ ok: false });
  });

  it("accepts http and https URLs", () => {
    expect(validate({ url: "http://example.com/" })).toMatchObject({ ok: true });
    expect(validate({ url: "https://example.com/path?q=1" })).toMatchObject({ ok: true });
  });

  it("preserves optional title when supplied", () => {
    const r = validate({ url: "https://example.com/", title: "Hello" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.title).toBe("Hello");
    }
  });

  it("trims and truncates long titles", () => {
    const longTitle = `  ${"a".repeat(500)}  `;
    const r = validate({ url: "https://example.com/", title: longTitle });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.title).toBeDefined();
      expect((r.data.title ?? "").length).toBeLessThanOrEqual(200);
    }
  });

  it("drops empty-string title instead of failing", () => {
    const r = validate({ url: "https://example.com/", title: "" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.title).toBeUndefined();
    }
  });

  it("rejects non-string title", () => {
    expect(validate({ url: "https://example.com/", title: 42 })).toMatchObject({ ok: false });
  });

  it("preserves and truncates excerpt", () => {
    // Truncation cap matches MAX_EXCERPT_LENGTH in link.ts (16_000).
    const longExcerpt = "e".repeat(20_000);
    const r = validate({ url: "https://example.com/", excerpt: longExcerpt });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.excerpt).toBeDefined();
      expect((r.data.excerpt ?? "").length).toBeLessThanOrEqual(16_000);
    }
  });

  it("defaults topic_priors to true (production behavior)", () => {
    const r = validate({ url: "https://example.com/" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.topic_priors).toBe(true);
    }
  });

  it("preserves topic_priors=false so the A/B run can opt out of priors", () => {
    const r = validate({ url: "https://example.com/", topic_priors: false });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.topic_priors).toBe(false);
    }
  });

  it("rejects a non-boolean topic_priors", () => {
    expect(validate({ url: "https://example.com/", topic_priors: "yes" })).toMatchObject({
      ok: false,
    });
  });
});

// ---------- buildEntryMarkdown ----------

const baseSummary: LinkSummary = {
  title: "Hello World",
  summary: "A short summary.",
  category: "tech",
  topics: ["topic-a", "topic-b"],
  model: "claude-sonnet-4-6",
  cost: {
    usage: {
      input_tokens: 100,
      output_tokens: 50,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
    },
    model: "claude-sonnet-4-6",
    pricing: null,
    cost_usd: 0.001,
  },
};

const baseArgs = {
  title: "Hello World",
  titleSource: "model" as const,
  url: "https://example.com/post",
  summary: baseSummary,
  added: new Date("2026-05-01T00:00:00.000Z"),
};

function parseEntry(md: string): { data: Record<string, unknown> } {
  return { data: matter(md).data };
}

describe("buildEntryMarkdown", () => {
  it("persists compile_cost into frontmatter", () => {
    const { data } = parseEntry(buildEntryMarkdown(baseArgs));
    expect(data.compile_cost).toEqual({
      usage: {
        input_tokens: 100,
        output_tokens: 50,
        cache_creation_input_tokens: 0,
        cache_read_input_tokens: 0,
      },
      model: "claude-sonnet-4-6",
      pricing: null,
      cost_usd: 0.001,
    });
  });
});

// ---------- LinkSummarySchema ----------

describe("LinkSummarySchema", () => {
  const validBase = {
    title: "Some Article",
    summary: "Short summary.",
    category: "tech" as const,
    topics: ["mcp"],
  };

  it("accepts a payload without topic_rationale", () => {
    const r = LinkSummarySchema.safeParse(validBase);
    expect(r.success).toBe(true);
  });

  it("accepts a payload with topic_rationale populated", () => {
    const r = LinkSummarySchema.safeParse({
      ...validBase,
      topic_rationale: "No canonical fit; concept is novel.",
    });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.topic_rationale).toBe("No canonical fit; concept is novel.");
    }
  });

  it("rejects topic_rationale that isn't a string", () => {
    const r = LinkSummarySchema.safeParse({
      ...validBase,
      topic_rationale: 42,
    });
    expect(r.success).toBe(false);
  });
});

// ---------- copyright-posture: opt-out + host blocklist in strategy.plan ----------

const baseEnv = (overrides: Partial<Env> = {}) =>
  ({
    ANTHROPIC_API_KEY: "test",
    ANTHROPIC_MODEL: "",
    READING_DIR: "src/content/reading",
    GITHUB_TOKEN: "test",
    GITHUB_REPO: "owner/repo",
    EXCLUDED_HOSTS: "",
    ...overrides,
  }) as unknown as Env;

const fakeCtx = () => ({ waitUntil: vi.fn() }) as unknown as ExecutionContext;

function stubFetch(handler: (url: string) => Response | Promise<Response>): void {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      return handler(url);
    }),
  );
}

describe("makeLinkStrategy.plan — copyright-posture", () => {
  beforeEach(() => {
    __resetRobotsCacheForTests();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    __resetRobotsCacheForTests();
  });

  it("rejects when host matches EXCLUDED_HOSTS exactly", async () => {
    // No fetch should run — host blocklist short-circuits before any IO.
    stubFetch(() => {
      throw new Error("fetch should not be called for excluded host");
    });
    const strategy = makeLinkStrategy({
      url: "https://nyt.com/article",
      topic_priors: true,
    });
    const env = baseEnv({ EXCLUDED_HOSTS: "nyt.com" });
    const result = await strategy.plan({ env }, env);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/host_excluded/);
    }
  });

  it("rejects when host is a subdomain of an EXCLUDED_HOSTS entry", async () => {
    stubFetch(() => {
      throw new Error("fetch should not be called");
    });
    const strategy = makeLinkStrategy({
      url: "https://cooking.nyt.com/recipe/x",
      topic_priors: true,
    });
    const env = baseEnv({ EXCLUDED_HOSTS: "nyt.com,washingtonpost.com" });
    const result = await strategy.plan({ env }, env);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/host_excluded.*cooking\.nyt\.com/);
    }
  });

  it("writes a noindex stub (no Anthropic call) when X-Robots-Tag: noai is present", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response("<html><title>Hi</title></html>", {
        status: 200,
        headers: { "X-Robots-Tag": "noai" },
      });
    });
    const summarizeSpy = vi.spyOn(anthropicModule, "summarizeLink");
    const strategy = makeLinkStrategy({
      url: "https://example.com/post",
      topic_priors: false,
    });
    const env = baseEnv();
    const result = await strategy.plan({ env }, env);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(summarizeSpy).not.toHaveBeenCalled();
    expect(result.data.mutation.added.length).toBe(1);
    const written = result.data.mutation.added[0];
    expect(written?.path).toMatch(/^src\/content\/reading\/.+\.md$/);
    const fm = matter(written?.content ?? "").data as Record<string, unknown>;
    expect(fm.noindex).toBe(true);
    expect(fm.opted_out).toBe("x-robots-tag");
    expect(fm.summary).toBe(OPT_OUT_STUB_SUMMARY);
    expect(fm.category).toBe("other");
    expect(fm.compiled_with).toBe("manual:opt-out-stub");
    expect(result.data.summary?.opted_out).toBe("x-robots-tag");
    summarizeSpy.mockRestore();
  });

  it("aborts (hard block) when robots.txt has User-agent: * and Disallow: /", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("User-agent: *\nDisallow: /\n", { status: 200 });
      }
      return new Response("<html><title>Hi</title></html>", { status: 200 });
    });
    const summarizeSpy = vi.spyOn(anthropicModule, "summarizeLink");
    const strategy = makeLinkStrategy({
      url: "https://example.com/post",
      topic_priors: false,
    });
    const env = baseEnv();
    const result = await strategy.plan({ env }, env);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/robots\.txt/);
      expect(result.status).toBe(451);
    }
    expect(summarizeSpy).not.toHaveBeenCalled();
    summarizeSpy.mockRestore();
  });

  it('writes a noindex stub when HTML body has <meta name="robots" content="noai">', async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response(
        '<html><head><title>Article</title><meta name="robots" content="noai"></head><body>x</body></html>',
        { status: 200 },
      );
    });
    const summarizeSpy = vi.spyOn(anthropicModule, "summarizeLink");
    const strategy = makeLinkStrategy({
      url: "https://example.com/post",
      topic_priors: false,
    });
    const env = baseEnv();
    const result = await strategy.plan({ env }, env);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(summarizeSpy).not.toHaveBeenCalled();
    const written = result.data.mutation.added[0];
    const fm = matter(written?.content ?? "").data as Record<string, unknown>;
    expect(fm.noindex).toBe(true);
    expect(fm.opted_out).toBe("meta-robots");
    expect(fm.title).toBe("Article");
    expect(fm.title_source).toBe("fetched");
    summarizeSpy.mockRestore();
  });

  it("writes a noindex stub when <meta name='googlebot' content='noindex'> is present", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response('<html><head><meta name="googlebot" content="noindex"></head></html>', {
        status: 200,
      });
    });
    const summarizeSpy = vi.spyOn(anthropicModule, "summarizeLink");
    const strategy = makeLinkStrategy({
      url: "https://example.com/post",
      topic_priors: false,
    });
    const env = baseEnv();
    const result = await strategy.plan({ env }, env);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(summarizeSpy).not.toHaveBeenCalled();
    const written = result.data.mutation.added[0];
    const fm = matter(written?.content ?? "").data as Record<string, unknown>;
    expect(fm.noindex).toBe(true);
    expect(fm.opted_out).toBe("meta-robots");
    summarizeSpy.mockRestore();
  });

  it("stub falls back to hostname when no <title> tag and no caller-supplied title", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response("<html><body>x</body></html>", {
        status: 200,
        headers: { "X-Robots-Tag": "noai" },
      });
    });
    const strategy = makeLinkStrategy({
      url: "https://blog.example.com/post",
      topic_priors: false,
    });
    const env = baseEnv();
    const result = await strategy.plan({ env }, env);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    const written = result.data.mutation.added[0];
    const fm = matter(written?.content ?? "").data as Record<string, unknown>;
    expect(fm.title).toBe("blog.example.com");
    expect(fm.title_source).toBe("hostname");
  });

  // The fakeCtx import is only used to keep the test file structurally similar
  // to other strategy tests; reference it once so noUnusedVariables stays quiet.
  it("(housekeeping) fakeCtx() returns a stub ExecutionContext", () => {
    const ctx = fakeCtx();
    expect(ctx.waitUntil).toBeDefined();
  });
});

// ---------- buildOptOutStubMarkdown ----------

describe("buildOptOutStubMarkdown", () => {
  it("emits the canonical stub frontmatter shape", () => {
    const md = buildOptOutStubMarkdown({
      title: "Some Title",
      titleSource: "fetched",
      url: "https://example.com/post",
      reason: "x-robots-tag",
      added: new Date("2026-05-01T00:00:00.000Z"),
    });
    const fm = matter(md).data as Record<string, unknown>;
    expect(fm.title).toBe("Some Title");
    expect(fm.url).toBe("https://example.com/post");
    expect(fm.summary).toBe(OPT_OUT_STUB_SUMMARY);
    expect(fm.category).toBe("other");
    expect(fm.noindex).toBe(true);
    expect(fm.opted_out).toBe("x-robots-tag");
    expect(fm.compiled_with).toBe("manual:opt-out-stub");
    expect(fm.title_source).toBe("fetched");
    // Body must be empty — reading entries are citations, not articles.
    expect(matter(md).content.trim()).toBe("");
  });
});

// ---------- A1 + A3: patchExistingWikiSources ----------

/**
 * Build a fake getFile from an in-memory map of path → file content. Any
 * path not in the map returns a 404-shaped error so the helper's
 * "no wiki article exists" branch is exercised.
 */
function fakeGetFile(
  files: Record<string, string>,
): (path: string) => Promise<Result<{ content: string; sha: string }>> {
  return async (path: string) => {
    const content = files[path];
    if (content === undefined) {
      return { ok: false, error: "HTTP 404: Not Found" };
    }
    return { ok: true, data: { content, sha: "deadbeef" } };
  };
}

const ADDED_AT = new Date("2026-05-05T12:00:00.000Z");

const baseWikiArticle = (overrides: Record<string, unknown> = {}) =>
  matter.stringify("Body content unchanged.", {
    title: "AI-assisted coding",
    summary: "A brief summary.",
    sources: ["2026-04/2026-04-01t000000-some-source", "2026-04/2026-04-02t000000-other-source"],
    compiled_at: "2026-04-15T00:00:00.000Z",
    compiled_with: "claude-sonnet-4-6",
    ...overrides,
  });

describe("patchExistingWikiSources", () => {
  it("appends the new reading slug to a matching wiki article and stamps last_source_added", async () => {
    const files = {
      "src/content/wiki/ai-assisted-coding.md": baseWikiArticle(),
    };
    const { changed, outcomes } = await patchExistingWikiSources({
      topics: ["ai-assisted-coding"],
      readingSlug: "2026-05/2026-05-05t120000-new-entry",
      added: ADDED_AT,
      getFile: fakeGetFile(files),
      max: 5,
    });
    expect(changed).toHaveLength(1);
    expect(outcomes.get("ai-assisted-coding")).toBe("patched");
    const file = changed[0];
    expect(file?.path).toBe("src/content/wiki/ai-assisted-coding.md");
    const parsed = matter(file?.after ?? "");
    const data = parsed.data as Record<string, unknown>;
    expect(data.sources).toEqual([
      "2026-04/2026-04-01t000000-some-source",
      "2026-04/2026-04-02t000000-other-source",
      "2026-05/2026-05-05t120000-new-entry",
    ]);
    expect(data.last_source_added).toBe(ADDED_AT.toISOString());
    // Body untouched — frontmatter-only patch.
    expect(parsed.content.trim()).toBe("Body content unchanged.");
  });

  it("returns no changes when no topic matches an existing wiki article", async () => {
    const { changed, outcomes } = await patchExistingWikiSources({
      topics: ["topic-with-no-article"],
      readingSlug: "2026-05/2026-05-05t120000-x",
      added: ADDED_AT,
      getFile: fakeGetFile({}),
      max: 5,
    });
    expect(changed).toHaveLength(0);
    expect(outcomes.get("topic-with-no-article")).toBe("missing");
  });

  it("is idempotent: a slug already in sources[] produces no change", async () => {
    const slug = "2026-05/2026-05-05t120000-already-there";
    const files = {
      "src/content/wiki/ai-assisted-coding.md": baseWikiArticle({
        sources: ["2026-04/2026-04-01t000000-some-source", slug],
      }),
    };
    const { changed, outcomes } = await patchExistingWikiSources({
      topics: ["ai-assisted-coding"],
      readingSlug: slug,
      added: ADDED_AT,
      getFile: fakeGetFile(files),
      max: 5,
    });
    expect(changed).toHaveLength(0);
    expect(outcomes.get("ai-assisted-coding")).toBe("unchanged");
  });

  it("treats 404 as a no-op (no error, no throw)", async () => {
    const failingGetFile = async () => ({ ok: false as const, error: "HTTP 404: Not Found" });
    const { changed, outcomes } = await patchExistingWikiSources({
      topics: ["nonexistent-topic"],
      readingSlug: "2026-05/2026-05-05t120000-x",
      added: ADDED_AT,
      getFile: failingGetFile,
      max: 5,
    });
    expect(changed).toHaveLength(0);
    expect(outcomes.get("nonexistent-topic")).toBe("missing");
  });

  it("logs and skips a wiki article whose YAML frontmatter is malformed; later topics still patch", async () => {
    // First topic's article has malformed YAML; second topic's is well-formed.
    // gray-matter throws on bad YAML — the helper must catch and continue.
    const files = {
      "src/content/wiki/broken-topic.md": "---\ntitle: [unterminated\n---\nbody",
      "src/content/wiki/good-topic.md": baseWikiArticle(),
    };
    const { changed, outcomes } = await patchExistingWikiSources({
      topics: ["broken-topic", "good-topic"],
      readingSlug: "2026-05/2026-05-05t120000-x",
      added: ADDED_AT,
      getFile: fakeGetFile(files),
      max: 5,
    });
    // The good one still gets patched.
    expect(changed.map((c) => c.path)).toEqual(["src/content/wiki/good-topic.md"]);
    expect(outcomes.get("broken-topic")).toBe("error");
    expect(outcomes.get("good-topic")).toBe("patched");
  });

  it("treats other (non-404) GitHub errors as skip-this-article, not throw", async () => {
    const flakyGetFile = async () => ({ ok: false as const, error: "HTTP 500: Server Error" });
    const { changed, outcomes } = await patchExistingWikiSources({
      topics: ["some-topic"],
      readingSlug: "2026-05/2026-05-05t120000-x",
      added: ADDED_AT,
      getFile: flakyGetFile,
      max: 5,
    });
    expect(changed).toHaveLength(0);
    expect(outcomes.get("some-topic")).toBe("error");
  });

  it("caps the number of wiki articles inspected per call (max=N)", async () => {
    const files: Record<string, string> = {};
    const topics: string[] = [];
    for (let i = 0; i < 8; i++) {
      const t = `topic-${i}`;
      topics.push(t);
      files[`src/content/wiki/${t}.md`] = baseWikiArticle();
    }
    const { changed, outcomes } = await patchExistingWikiSources({
      topics,
      readingSlug: "2026-05/2026-05-05t120000-x",
      added: ADDED_AT,
      getFile: fakeGetFile(files),
      max: 3,
    });
    // Only the first 3 topics are inspected — the rest are capped out.
    expect(changed).toHaveLength(3);
    expect(changed.map((c) => c.path)).toEqual([
      "src/content/wiki/topic-0.md",
      "src/content/wiki/topic-1.md",
      "src/content/wiki/topic-2.md",
    ]);
    // Topics over the cap are absent from the outcomes map (never inspected).
    expect(outcomes.has("topic-3")).toBe(false);
    expect(outcomes.get("topic-0")).toBe("patched");
  });

  it("preserves existing frontmatter fields untouched (only sources[] and last_source_added change)", async () => {
    const files = {
      "src/content/wiki/ai-assisted-coding.md": baseWikiArticle({
        aliases: ["ai-coding-agents"],
        compile_cost: { foo: "bar" },
      }),
    };
    const { changed } = await patchExistingWikiSources({
      topics: ["ai-assisted-coding"],
      readingSlug: "2026-05/2026-05-05t120000-new",
      added: ADDED_AT,
      getFile: fakeGetFile(files),
      max: 5,
    });
    const data = matter(changed[0]?.after ?? "").data as Record<string, unknown>;
    expect(data.title).toBe("AI-assisted coding");
    expect(data.summary).toBe("A brief summary.");
    expect(data.aliases).toEqual(["ai-coding-agents"]);
    expect(data.compile_cost).toEqual({ foo: "bar" });
    expect(data.compiled_with).toBe("claude-sonnet-4-6");
  });
});

// ---------- A1 + A3: integration via makeLinkStrategy.plan ----------

describe("makeLinkStrategy.plan — wiki sources[] patch", () => {
  beforeEach(() => {
    __resetRobotsCacheForTests();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    __resetRobotsCacheForTests();
  });

  it("includes a matching wiki article in mutation.changed alongside the new reading entry", async () => {
    // Allow path: robots.txt 404, normal page response — drives the path
    // past the opt-out checks and into the Anthropic + wiki-patch flow.
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response("<html><title>Article</title></html>", { status: 200 });
    });
    vi.spyOn(anthropicModule, "summarizeLink").mockResolvedValue({
      ok: true,
      data: {
        title: "Article",
        summary: "Summary.",
        category: "tech",
        topics: ["ai-assisted-coding"],
        model: "claude-sonnet-4-6",
        cost: {
          usage: {
            input_tokens: 0,
            output_tokens: 0,
            cache_creation_input_tokens: 0,
            cache_read_input_tokens: 0,
          },
          model: "claude-sonnet-4-6",
          pricing: null,
          cost_usd: 0,
        },
      },
    });
    const wikiBody = baseWikiArticle();
    vi.spyOn(githubModule, "getFile").mockImplementation(async (path) => {
      if (path === "src/content/wiki/ai-assisted-coding.md") {
        return { ok: true, data: { content: wikiBody, sha: "deadbeef" } };
      }
      return { ok: false, error: "HTTP 404: Not Found" };
    });
    const strategy = makeLinkStrategy({
      url: "https://example.com/post",
      // topic_priors: false short-circuits the wiki.json fetch — we don't
      // need the canonical-vocabulary network round-trip in this test.
      topic_priors: false,
    });
    const env = baseEnv();
    const result = await strategy.plan({ env }, env);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.data.mutation.added).toHaveLength(1);
    expect(result.data.mutation.changed).toHaveLength(1);
    const wikiPatch = result.data.mutation.changed[0];
    expect(wikiPatch?.path).toBe("src/content/wiki/ai-assisted-coding.md");
    const data = matter(wikiPatch?.after ?? "").data as Record<string, unknown>;
    expect(Array.isArray(data.sources)).toBe(true);
    expect((data.sources as string[]).length).toBe(3);
    expect(data.last_source_added).toBeDefined();
    // wiki_patched surfaces in the summary so the operator sees the
    // cascading effect without inspecting the commit.
    expect(result.data.summary?.wiki_patched).toEqual(["ai-assisted-coding"]);
  });

  it("leaves mutation.changed empty when the topic does not match any wiki article", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response("<html><title>X</title></html>", { status: 200 });
    });
    vi.spyOn(anthropicModule, "summarizeLink").mockResolvedValue({
      ok: true,
      data: {
        title: "X",
        summary: "x.",
        category: "tech",
        topics: ["a-very-novel-topic"],
        model: "claude-sonnet-4-6",
        cost: {
          usage: {
            input_tokens: 0,
            output_tokens: 0,
            cache_creation_input_tokens: 0,
            cache_read_input_tokens: 0,
          },
          model: "claude-sonnet-4-6",
          pricing: null,
          cost_usd: 0,
        },
      },
    });
    // Every wiki getFile call returns 404 — no article matches.
    vi.spyOn(githubModule, "getFile").mockResolvedValue({
      ok: false,
      error: "HTTP 404: Not Found",
    });
    const strategy = makeLinkStrategy({
      url: "https://example.com/post",
      topic_priors: false,
    });
    const env = baseEnv();
    const result = await strategy.plan({ env }, env);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.data.mutation.added).toHaveLength(1);
    expect(result.data.mutation.changed).toHaveLength(0);
  });

  it("matches the canonical wiki article when the model returns an alias topic", async () => {
    // Stub fetch so:
    //  - robots.txt → 404 (no opt-out)
    //  - wiki.json → returns a single concept with one alias mapping
    //    "ai-coding-assistants" → canonical slug "ai-assisted-coding".
    //  - article URL → trivial 200
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      if (url.endsWith("/wiki.json")) {
        return new Response(
          JSON.stringify({
            concepts: [{ slug: "ai-assisted-coding", aliases: ["ai-coding-assistants"] }],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }
      return new Response("<html><title>Article</title></html>", { status: 200 });
    });
    // Model emits the alias slug; applyVocabulary should rewrite it to the
    // canonical, and the wiki-patch helper should fetch
    // `src/content/wiki/ai-assisted-coding.md` (not the alias file).
    vi.spyOn(anthropicModule, "summarizeLink").mockResolvedValue({
      ok: true,
      data: {
        title: "Article",
        summary: "x.",
        category: "tech",
        topics: ["ai-coding-assistants"],
        model: "claude-sonnet-4-6",
        cost: {
          usage: {
            input_tokens: 0,
            output_tokens: 0,
            cache_creation_input_tokens: 0,
            cache_read_input_tokens: 0,
          },
          model: "claude-sonnet-4-6",
          pricing: null,
          cost_usd: 0,
        },
      },
    });
    const wikiBody = baseWikiArticle();
    const getFileSpy = vi.spyOn(githubModule, "getFile").mockImplementation(async (path) => {
      if (path === "src/content/wiki/ai-assisted-coding.md") {
        return { ok: true, data: { content: wikiBody, sha: "deadbeef" } };
      }
      return { ok: false, error: "HTTP 404: Not Found" };
    });
    const strategy = makeLinkStrategy({
      url: "https://example.com/post",
      topic_priors: true,
    });
    const env = baseEnv();
    const result = await strategy.plan({ env }, env);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    // The helper was called with the canonical slug, not the alias.
    const calledPaths = getFileSpy.mock.calls.map((c) => c[0]);
    expect(calledPaths).toContain("src/content/wiki/ai-assisted-coding.md");
    expect(calledPaths).not.toContain("src/content/wiki/ai-coding-assistants.md");
    expect(result.data.mutation.changed).toHaveLength(1);
    expect(result.data.mutation.changed[0]?.path).toBe("src/content/wiki/ai-assisted-coding.md");
  });
});

// ---------- A2: threshold trigger ----------

/**
 * Reading-corpus listDir helper used by the A2 tests. Reading content is
 * two levels deep (year-month/file.md), so we walk one level — same shape
 * the real GitHub-backed listDir produces and what `enumerateReadingTopics`
 * expects.
 */
function thresholdReadingListDir(files: Record<string, string>) {
  return async (path: string) => {
    const direct = Object.keys(files)
      .filter((k) => k.startsWith(`${path}/`))
      .map((k) => k.slice(path.length + 1));
    const seen = new Set<string>();
    const entries: Array<{ type: "file" | "dir"; name: string; path: string; sha: string }> = [];
    for (const tail of direct) {
      const slash = tail.indexOf("/");
      if (slash === -1) {
        if (seen.has(tail)) {
          continue;
        }
        seen.add(tail);
        entries.push({ type: "file", name: tail, path: `${path}/${tail}`, sha: "x" });
      } else {
        const dir = tail.slice(0, slash);
        if (seen.has(dir)) {
          continue;
        }
        seen.add(dir);
        entries.push({ type: "dir", name: dir, path: `${path}/${dir}`, sha: "x" });
      }
    }
    if (entries.length === 0 && !Object.keys(files).some((k) => k.startsWith(`${path}/`))) {
      return { ok: false as const, error: "404 not found" };
    }
    return { ok: true as const, data: entries };
  };
}

/**
 * Reading-entry frontmatter generator for the threshold-trigger tests.
 * Mirrors the worker's actual frontmatter shape so ReadingFrontmatterSchema
 * accepts it (otherwise enumerateReadingTopics drops the entry as invalid
 * and the count shows 0).
 */
const readingEntryWithTopics = (topics: string[], extra: Record<string, unknown> = {}): string => {
  const fm: Record<string, unknown> = {
    title: "Some Title",
    url: "https://example.com/x",
    summary: "S.",
    category: "tech",
    added: "2026-04-01T00:00:00.000Z",
    topics,
    ...extra,
  };
  const lines = ["---"];
  for (const [k, v] of Object.entries(fm)) {
    if (Array.isArray(v)) {
      lines.push(`${k}: [${v.map((s) => JSON.stringify(s)).join(", ")}]`);
    } else if (typeof v === "boolean") {
      lines.push(`${k}: ${v}`);
    } else {
      lines.push(`${k}: ${JSON.stringify(v)}`);
    }
  }
  lines.push("---", "", "");
  return lines.join("\n");
};

/**
 * A fake GitHubClient — `selectThresholdTriggers` only consumes it via
 * `listDir`/`getFile` from the github module (which we spy on), so the
 * client is never deeply unwrapped. Any object reference works as long
 * as the spies don't introspect it.
 */
const fakeGh = {} as unknown as ReturnType<typeof githubModule.createGitHubClient>;

describe("countExistingTopicEntries", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("counts only the requested topics across the reading corpus", async () => {
    const files: Record<string, string> = {
      "src/content/reading/2026-04/2026-04-01t000000-a.md": readingEntryWithTopics(["foo", "bar"]),
      "src/content/reading/2026-04/2026-04-02t000000-b.md": readingEntryWithTopics(["foo"]),
      "src/content/reading/2026-04/2026-04-03t000000-c.md": readingEntryWithTopics(["baz"]),
    };
    vi.spyOn(githubModule, "listDir").mockImplementation(thresholdReadingListDir(files));
    vi.spyOn(githubModule, "getFile").mockImplementation(async (path: string) => {
      const content = files[path];
      if (content === undefined) {
        return { ok: false as const, error: "HTTP 404: Not Found" };
      }
      return { ok: true as const, data: { content, sha: "x" } };
    });
    const env = baseEnv();
    const counts = await countExistingTopicEntries({
      env,
      gh: fakeGh,
      topics: ["foo", "bar"],
    });
    expect(counts.get("foo")).toBe(2);
    expect(counts.get("bar")).toBe(1);
    expect(counts.has("baz")).toBe(false);
  });

  it("returns an empty map when topics is empty (no IO)", async () => {
    const listDirSpy = vi.spyOn(githubModule, "listDir");
    const env = baseEnv();
    const counts = await countExistingTopicEntries({ env, gh: fakeGh, topics: [] });
    expect(counts.size).toBe(0);
    expect(listDirSpy).not.toHaveBeenCalled();
  });

  it("excludes noindex'd entries (delegates to enumerateReadingTopics filter)", async () => {
    const files: Record<string, string> = {
      "src/content/reading/2026-04/2026-04-01t000000-public.md": readingEntryWithTopics(["foo"]),
      "src/content/reading/2026-04/2026-04-02t000000-private.md": readingEntryWithTopics(["foo"], {
        noindex: true,
        opted_out: "x-robots-tag",
      }),
    };
    vi.spyOn(githubModule, "listDir").mockImplementation(thresholdReadingListDir(files));
    vi.spyOn(githubModule, "getFile").mockImplementation(async (path: string) => {
      const content = files[path];
      if (content === undefined) {
        return { ok: false as const, error: "HTTP 404: Not Found" };
      }
      return { ok: true as const, data: { content, sha: "x" } };
    });
    const env = baseEnv();
    const counts = await countExistingTopicEntries({ env, gh: fakeGh, topics: ["foo"] });
    expect(counts.get("foo")).toBe(1);
  });
});

describe("selectThresholdTriggers", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * Helper: stage a reading corpus that gives `topic` exactly `count`
   * existing entries. Returns the spies for ergonomics in negative-path
   * tests. Each entry is ascii-named so the readingFrontmatter schema
   * accepts it.
   */
  const stageReadingCorpus = (entries: Array<{ slug: string; topics: string[] }>) => {
    const files: Record<string, string> = {};
    for (const e of entries) {
      files[`src/content/reading/2026-04/${e.slug}.md`] = readingEntryWithTopics(e.topics);
    }
    vi.spyOn(githubModule, "listDir").mockImplementation(thresholdReadingListDir(files));
    vi.spyOn(githubModule, "getFile").mockImplementation(async (path: string) => {
      const content = files[path];
      if (content === undefined) {
        return { ok: false as const, error: "HTTP 404: Not Found" };
      }
      return { ok: true as const, data: { content, sha: "x" } };
    });
  };

  it("returns empty when the topic is below threshold (1 existing + 1 new = 1, MIN=2)", async () => {
    // Zero existing entries; +1 for the new entry = 1; below MIN_WIKI_SOURCES=2.
    stageReadingCorpus([]);
    const outcomes = new Map<string, WikiPatchOutcome>([["lonely-topic", "missing"]]);
    const env = baseEnv();
    const out = await selectThresholdTriggers({
      env,
      gh: fakeGh,
      canonicalTopics: ["lonely-topic"],
      wikiOutcomes: outcomes,
    });
    expect(out).toEqual([]);
  });

  it("spawns when this entry brings the topic to MIN_WIKI_SOURCES with no existing wiki article", async () => {
    // 1 existing entry tagged with the topic; +1 for this entry = 2 = MIN_WIKI_SOURCES.
    stageReadingCorpus([{ slug: "2026-04-01t000000-a", topics: ["new-topic"] }]);
    const outcomes = new Map<string, WikiPatchOutcome>([["new-topic", "missing"]]);
    const env = baseEnv();
    const out = await selectThresholdTriggers({
      env,
      gh: fakeGh,
      canonicalTopics: ["new-topic"],
      wikiOutcomes: outcomes,
    });
    expect(out).toEqual(["new-topic"]);
  });

  it("does NOT spawn when an existing wiki article already covers the topic (handled by patch)", async () => {
    // Threshold is met (2 existing + 1 new = 3) but the wiki article exists,
    // so patchExistingWikiSources updates sources[] and the threshold trigger
    // stays out of the way.
    stageReadingCorpus([
      { slug: "2026-04-01t000000-a", topics: ["existing-topic"] },
      { slug: "2026-04-02t000000-b", topics: ["existing-topic"] },
    ]);
    const outcomes = new Map<string, WikiPatchOutcome>([["existing-topic", "patched"]]);
    const env = baseEnv();
    const out = await selectThresholdTriggers({
      env,
      gh: fakeGh,
      canonicalTopics: ["existing-topic"],
      wikiOutcomes: outcomes,
    });
    expect(out).toEqual([]);
  });

  it("batches multiple crossings into a single combined spawn list", async () => {
    // Two distinct topics, each at threshold-1 with this entry pushing them
    // both to MIN_WIKI_SOURCES, no wiki articles for either.
    stageReadingCorpus([
      { slug: "2026-04-01t000000-a", topics: ["alpha"] },
      { slug: "2026-04-02t000000-b", topics: ["bravo"] },
    ]);
    const outcomes = new Map<string, WikiPatchOutcome>([
      ["alpha", "missing"],
      ["bravo", "missing"],
    ]);
    const env = baseEnv();
    const out = await selectThresholdTriggers({
      env,
      gh: fakeGh,
      canonicalTopics: ["alpha", "bravo"],
      wikiOutcomes: outcomes,
    });
    expect(out).toEqual(["alpha", "bravo"]);
  });

  it("caps four simultaneous crossings to MAX_THRESHOLD_TRIGGERS_PER_LINK=3 and skips the rest", async () => {
    // Each of t1..t4 has 1 existing entry tagged; the new entry adds 1 each,
    // crossing all four to MIN_WIKI_SOURCES. With the cap at 3, only the
    // first three are returned.
    stageReadingCorpus([
      { slug: "2026-04-01t000000-a", topics: ["t1"] },
      { slug: "2026-04-02t000000-b", topics: ["t2"] },
      { slug: "2026-04-03t000000-c", topics: ["t3"] },
      { slug: "2026-04-04t000000-d", topics: ["t4"] },
    ]);
    const outcomes = new Map<string, WikiPatchOutcome>([
      ["t1", "missing"],
      ["t2", "missing"],
      ["t3", "missing"],
      ["t4", "missing"],
    ]);
    const env = baseEnv();
    const out = await selectThresholdTriggers({
      env,
      gh: fakeGh,
      canonicalTopics: ["t1", "t2", "t3", "t4"],
      wikiOutcomes: outcomes,
    });
    expect(out).toEqual(["t1", "t2", "t3"]);
  });

  it("skips topics with outcome=error (transient flake — don't risk a duplicate spawn)", async () => {
    stageReadingCorpus([{ slug: "2026-04-01t000000-a", topics: ["t-error"] }]);
    const outcomes = new Map<string, WikiPatchOutcome>([["t-error", "error"]]);
    const env = baseEnv();
    const out = await selectThresholdTriggers({
      env,
      gh: fakeGh,
      canonicalTopics: ["t-error"],
      wikiOutcomes: outcomes,
    });
    expect(out).toEqual([]);
  });
});

// ---------- A2: integration via makeLinkStrategy.plan ----------

describe("makeLinkStrategy.plan — threshold trigger surfaces in summary", () => {
  beforeEach(() => {
    __resetRobotsCacheForTests();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    __resetRobotsCacheForTests();
  });

  it("populates summary.triggered_synthesis when the new entry crosses MIN_WIKI_SOURCES", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response("<html><title>T</title></html>", { status: 200 });
    });
    vi.spyOn(anthropicModule, "summarizeLink").mockResolvedValue({
      ok: true,
      data: {
        title: "Article",
        summary: "x.",
        category: "tech",
        topics: ["new-concept"],
        model: "claude-sonnet-4-6",
        cost: {
          usage: {
            input_tokens: 0,
            output_tokens: 0,
            cache_creation_input_tokens: 0,
            cache_read_input_tokens: 0,
          },
          model: "claude-sonnet-4-6",
          pricing: null,
          cost_usd: 0,
        },
      },
    });
    const corpusFiles: Record<string, string> = {
      // One existing reading entry with the topic — this new ingest pushes
      // count to 2 = MIN_WIKI_SOURCES.
      "src/content/reading/2026-04/2026-04-01t000000-prior.md": readingEntryWithTopics([
        "new-concept",
      ]),
    };
    vi.spyOn(githubModule, "listDir").mockImplementation(thresholdReadingListDir(corpusFiles));
    vi.spyOn(githubModule, "getFile").mockImplementation(async (path: string) => {
      // No wiki article exists for the new topic.
      if (path.startsWith("src/content/wiki/")) {
        return { ok: false as const, error: "HTTP 404: Not Found" };
      }
      const content = corpusFiles[path];
      if (content === undefined) {
        return { ok: false as const, error: "HTTP 404: Not Found" };
      }
      return { ok: true as const, data: { content, sha: "x" } };
    });
    const strategy = makeLinkStrategy({
      url: "https://example.com/post",
      topic_priors: false,
    });
    const env = baseEnv();
    const result = await strategy.plan({ env }, env);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.data.summary?.triggered_synthesis).toEqual(["new-concept"]);
  });

  it("leaves triggered_synthesis empty when the wiki article for the topic already exists", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response("<html><title>T</title></html>", { status: 200 });
    });
    vi.spyOn(anthropicModule, "summarizeLink").mockResolvedValue({
      ok: true,
      data: {
        title: "Article",
        summary: "x.",
        category: "tech",
        topics: ["existing-concept"],
        model: "claude-sonnet-4-6",
        cost: {
          usage: {
            input_tokens: 0,
            output_tokens: 0,
            cache_creation_input_tokens: 0,
            cache_read_input_tokens: 0,
          },
          model: "claude-sonnet-4-6",
          pricing: null,
          cost_usd: 0,
        },
      },
    });
    const corpusFiles: Record<string, string> = {
      "src/content/reading/2026-04/2026-04-01t000000-a.md": readingEntryWithTopics([
        "existing-concept",
      ]),
      "src/content/reading/2026-04/2026-04-02t000000-b.md": readingEntryWithTopics([
        "existing-concept",
      ]),
    };
    vi.spyOn(githubModule, "listDir").mockImplementation(thresholdReadingListDir(corpusFiles));
    const wikiBody = baseWikiArticle();
    vi.spyOn(githubModule, "getFile").mockImplementation(async (path: string) => {
      if (path === "src/content/wiki/existing-concept.md") {
        return { ok: true as const, data: { content: wikiBody, sha: "x" } };
      }
      const content = corpusFiles[path];
      if (content === undefined) {
        return { ok: false as const, error: "HTTP 404: Not Found" };
      }
      return { ok: true as const, data: { content, sha: "x" } };
    });
    const strategy = makeLinkStrategy({
      url: "https://example.com/post",
      topic_priors: false,
    });
    const env = baseEnv();
    const result = await strategy.plan({ env }, env);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.data.summary?.triggered_synthesis).toEqual([]);
    // patchExistingWikiSources still ran and updated the article.
    expect(result.data.mutation.changed).toHaveLength(1);
  });
});

// ---------- A2: spawn integration via handle() and ctx.waitUntil ----------

describe("link.handle — threshold trigger spawn", () => {
  beforeEach(() => {
    __resetRobotsCacheForTests();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    __resetRobotsCacheForTests();
  });

  /**
   * Stages handle()'s pipeline run so the link mutation returns a
   * successful summary carrying `triggered`. We don't introspect what
   * the synthesis spawn was called with — only that ctx.waitUntil fired
   * — because runPipeline is mocked out and tracking topics through the
   * Strategy<S> type via the spy adds noise without coverage gain.
   */
  const stagePipeline = (triggered: string[]) => {
    vi.spyOn(pipelineModule, "runPipeline").mockImplementation(
      async (strategy: { name: string }) => {
        if (strategy.name === "link") {
          return {
            ok: true,
            commit_sha: "abc123",
            summary: {
              path: "src/content/reading/2026-05/2026-05-05t120000-x.md",
              category: "tech",
              topics_context_loaded: false,
              title_source: "model",
              topics_committed: triggered,
              topics_rewritten: [],
              topics_coined: [],
              topic_rationale: undefined,
              cost: {
                usage: {
                  input_tokens: 0,
                  output_tokens: 0,
                  cache_creation_input_tokens: 0,
                  cache_read_input_tokens: 0,
                },
                model: "claude-sonnet-4-6",
                pricing: null,
                cost_usd: 0,
              },
              triggered_synthesis: triggered,
            },
            // The Strategy generic is erased by the mock — cast at the
            // call site is the cleanest way to satisfy `RunResult<S>`.
          } as never;
        }
        // The synthesis spawn — pretend the PR opened so the spawn
        // resolves cleanly and ctx.waitUntil's promise settles.
        return { ok: true, pr_number: 42, pr_url: "https://example.com/pr/42" } as never;
      },
    );
  };

  it("calls ctx.waitUntil with a synthesis spawn when summary.triggered_synthesis is non-empty", async () => {
    stagePipeline(["new-concept"]);
    const env = baseEnv();
    const ctx = { waitUntil: vi.fn() } as unknown as ExecutionContext;
    const req = new Request("https://w.example.com/link", {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com/post" }),
    });
    const res = await handle(req, env, ctx);
    expect(res.status).toBe(200);
    expect((ctx.waitUntil as unknown as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(1);
    const body = (await res.json()) as { triggered_synthesis?: string[] };
    expect(body.triggered_synthesis).toEqual(["new-concept"]);
  });

  it("does NOT call ctx.waitUntil and omits triggered_synthesis when none triggered", async () => {
    stagePipeline([]);
    const env = baseEnv();
    const ctx = { waitUntil: vi.fn() } as unknown as ExecutionContext;
    const req = new Request("https://w.example.com/link", {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com/post" }),
    });
    const res = await handle(req, env, ctx);
    expect(res.status).toBe(200);
    expect((ctx.waitUntil as unknown as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(0);
    const body = (await res.json()) as Record<string, unknown>;
    expect("triggered_synthesis" in body).toBe(false);
  });
});

// ---------- A2: spawnThresholdSynthesis silent-failure logging ----------

describe("spawnThresholdSynthesis — silent-failure surfacing", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs a structured error with op=link:threshold-trigger when runPipeline rejects", async () => {
    vi.spyOn(pipelineModule, "runPipeline").mockRejectedValue(new Error("anthropic rate-limited"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const env = baseEnv();
    const ctx = { waitUntil: vi.fn() } as unknown as ExecutionContext;
    // The function MUST resolve (never reject) — that's the whole point of
    // wrapping it. If it rejected, /link's handler would propagate the
    // rejection through ctx.waitUntil and the silent-failure risk noted in
    // the plan would be live.
    await expect(
      spawnThresholdSynthesis({ topics: ["foo", "bar"], env, ctx }),
    ).resolves.toBeUndefined();
    // Find the log line: format is `[link:threshold-trigger] <message> ...`.
    const calls = errorSpy.mock.calls.flat().map(String);
    const line = calls.find((c) => c.includes("[link:threshold-trigger]"));
    expect(line).toBeDefined();
    expect(line).toContain("topics=foo,bar");
    expect(line).toContain("error_message=anthropic rate-limited");
  });

  it("logs an error with op=link:threshold-trigger when runPipeline returns ok=false", async () => {
    vi.spyOn(pipelineModule, "runPipeline").mockResolvedValue({
      ok: false,
      status: 502,
      error: "github 502",
    });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const env = baseEnv();
    const ctx = { waitUntil: vi.fn() } as unknown as ExecutionContext;
    await spawnThresholdSynthesis({ topics: ["alpha"], env, ctx });
    const calls = errorSpy.mock.calls.flat().map(String);
    const line = calls.find((c) => c.includes("[link:threshold-trigger]"));
    expect(line).toBeDefined();
    expect(line).toContain("error_message=github 502");
  });
});

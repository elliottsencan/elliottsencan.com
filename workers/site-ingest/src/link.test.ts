import matter from "gray-matter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as anthropicModule from "./anthropic.ts";
import { type LinkSummary, LinkSummarySchema } from "./anthropic.ts";
import * as githubModule from "./github.ts";
import {
  buildEntryMarkdown,
  buildOptOutStubMarkdown,
  makeLinkStrategy,
  OPT_OUT_STUB_SUMMARY,
  patchExistingWikiSources,
  validate,
} from "./link.ts";
import { __resetRobotsCacheForTests } from "./optout.ts";
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
    const changed = await patchExistingWikiSources({
      topics: ["ai-assisted-coding"],
      readingSlug: "2026-05/2026-05-05t120000-new-entry",
      added: ADDED_AT,
      getFile: fakeGetFile(files),
      max: 5,
    });
    expect(changed).toHaveLength(1);
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
    const changed = await patchExistingWikiSources({
      topics: ["topic-with-no-article"],
      readingSlug: "2026-05/2026-05-05t120000-x",
      added: ADDED_AT,
      getFile: fakeGetFile({}),
      max: 5,
    });
    expect(changed).toHaveLength(0);
  });

  it("is idempotent: a slug already in sources[] produces no change", async () => {
    const slug = "2026-05/2026-05-05t120000-already-there";
    const files = {
      "src/content/wiki/ai-assisted-coding.md": baseWikiArticle({
        sources: ["2026-04/2026-04-01t000000-some-source", slug],
      }),
    };
    const changed = await patchExistingWikiSources({
      topics: ["ai-assisted-coding"],
      readingSlug: slug,
      added: ADDED_AT,
      getFile: fakeGetFile(files),
      max: 5,
    });
    expect(changed).toHaveLength(0);
  });

  it("treats 404 as a no-op (no error, no throw)", async () => {
    const failingGetFile = async () => ({ ok: false as const, error: "HTTP 404: Not Found" });
    const changed = await patchExistingWikiSources({
      topics: ["nonexistent-topic"],
      readingSlug: "2026-05/2026-05-05t120000-x",
      added: ADDED_AT,
      getFile: failingGetFile,
      max: 5,
    });
    expect(changed).toHaveLength(0);
  });

  it("logs and skips a wiki article whose YAML frontmatter is malformed; later topics still patch", async () => {
    // First topic's article has malformed YAML; second topic's is well-formed.
    // gray-matter throws on bad YAML — the helper must catch and continue.
    const files = {
      "src/content/wiki/broken-topic.md": "---\ntitle: [unterminated\n---\nbody",
      "src/content/wiki/good-topic.md": baseWikiArticle(),
    };
    const changed = await patchExistingWikiSources({
      topics: ["broken-topic", "good-topic"],
      readingSlug: "2026-05/2026-05-05t120000-x",
      added: ADDED_AT,
      getFile: fakeGetFile(files),
      max: 5,
    });
    // The good one still gets patched.
    expect(changed.map((c) => c.path)).toEqual(["src/content/wiki/good-topic.md"]);
  });

  it("treats other (non-404) GitHub errors as skip-this-article, not throw", async () => {
    const flakyGetFile = async () => ({ ok: false as const, error: "HTTP 500: Server Error" });
    const changed = await patchExistingWikiSources({
      topics: ["some-topic"],
      readingSlug: "2026-05/2026-05-05t120000-x",
      added: ADDED_AT,
      getFile: flakyGetFile,
      max: 5,
    });
    expect(changed).toHaveLength(0);
  });

  it("caps the number of wiki articles inspected per call (max=N)", async () => {
    const files: Record<string, string> = {};
    const topics: string[] = [];
    for (let i = 0; i < 8; i++) {
      const t = `topic-${i}`;
      topics.push(t);
      files[`src/content/wiki/${t}.md`] = baseWikiArticle();
    }
    const changed = await patchExistingWikiSources({
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
  });

  it("preserves existing frontmatter fields untouched (only sources[] and last_source_added change)", async () => {
    const files = {
      "src/content/wiki/ai-assisted-coding.md": baseWikiArticle({
        aliases: ["ai-coding-agents"],
        compile_cost: { foo: "bar" },
      }),
    };
    const changed = await patchExistingWikiSources({
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

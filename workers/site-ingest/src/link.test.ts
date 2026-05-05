import matter from "gray-matter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as anthropicModule from "./anthropic.ts";
import { type LinkSummary, LinkSummarySchema } from "./anthropic.ts";
import {
  buildEntryMarkdown,
  buildOptOutStubMarkdown,
  makeLinkStrategy,
  OPT_OUT_STUB_SUMMARY,
  validate,
} from "./link.ts";
import { __resetRobotsCacheForTests } from "./optout.ts";
import type { Env } from "./types.ts";

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

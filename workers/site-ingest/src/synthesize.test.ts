/**
 * Tests for the pure-function pieces of synthesize.ts.
 *
 * Skips the handler itself (would require GitHub + Anthropic mocks that
 * don't exist in this codebase). Targets the four invariants that matter
 * for correctness: clustering threshold, idempotency comparison, slug
 * normalization, and the markdown writer's frontmatter shape.
 */

import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { WikiArticleSchema } from "./anthropic.ts";
import { aggregateCost } from "./cost.ts";
import {
  buildArticleMarkdown,
  buildDeferredCurlHint,
  buildPrBody,
  clusterByTopic,
  type EnumerateReadingDeps,
  enumerateReading,
  prioritizeByStaleness,
  setEquals,
} from "./synthesize.ts";
import type { WikiArticle } from "./types.ts";

// ---------- setEquals ----------

describe("setEquals", () => {
  it("returns true for identical arrays", () => {
    expect(setEquals(["a", "b", "c"], ["a", "b", "c"])).toBe(true);
  });

  it("is order-independent", () => {
    expect(setEquals(["a", "b", "c"], ["c", "a", "b"])).toBe(true);
  });

  it("returns false for different content of same length", () => {
    expect(setEquals(["a", "b"], ["a", "c"])).toBe(false);
  });

  it("returns false for different lengths", () => {
    expect(setEquals(["a", "b"], ["a", "b", "c"])).toBe(false);
  });

  it("returns true for two empty arrays (no sources removed = nothing to recompile)", () => {
    expect(setEquals([], [])).toBe(true);
  });

  it("treats duplicates as multiset elements (not set)", () => {
    // Distinguishes ["a", "a"] from ["a", "b"] — both have length 2.
    expect(setEquals(["a", "a"], ["a", "b"])).toBe(false);
    expect(setEquals(["a", "a"], ["a", "a"])).toBe(true);
  });
});

// ---------- clusterByTopic ----------

type ReadingSource = Parameters<typeof clusterByTopic>[0][number];

function source(slug: string, topics: string[]): ReadingSource {
  return {
    slug,
    path: `src/content/reading/2026-04/${slug}.md`,
    title: `Title ${slug}`,
    url: `https://example.com/${slug}`,
    summary: "Summary.",
    category: "tech",
    added: "2026-04-01T00:00:00.000Z",
    topics,
  };
}

describe("clusterByTopic", () => {
  it("filters out topics below the threshold", () => {
    const sources = [source("a", ["x"]), source("b", ["x", "y"]), source("c", ["y"])];
    const out = clusterByTopic(sources, 2);
    // x has 2, y has 2, both kept. No singletons.
    expect([...out.keys()].sort()).toEqual(["x", "y"]);
  });

  it("keeps a topic at exactly the threshold", () => {
    const sources = [source("a", ["x"]), source("b", ["x"])];
    const out = clusterByTopic(sources, 2);
    expect(out.has("x")).toBe(true);
    expect(out.get("x")).toHaveLength(2);
  });

  it("drops a topic one below the threshold", () => {
    const sources = [source("a", ["x"]), source("b", ["x"])];
    const out = clusterByTopic(sources, 3);
    expect(out.has("x")).toBe(false);
  });

  it("places a single source under each of its topics", () => {
    const sources = [source("a", ["x", "y"]), source("b", ["x", "y"])];
    const out = clusterByTopic(sources, 2);
    expect(
      out
        .get("x")
        ?.map((s) => s.slug)
        .sort(),
    ).toEqual(["a", "b"]);
    expect(
      out
        .get("y")
        ?.map((s) => s.slug)
        .sort(),
    ).toEqual(["a", "b"]);
  });

  it("ignores sources with no topics", () => {
    const sources = [source("a", []), source("b", ["x"]), source("c", ["x"])];
    const out = clusterByTopic(sources, 2);
    expect(out.size).toBe(1);
    expect(
      out
        .get("x")
        ?.map((s) => s.slug)
        .sort(),
    ).toEqual(["b", "c"]);
  });

  it("returns an empty map for empty input", () => {
    expect(clusterByTopic([], 2).size).toBe(0);
  });
});

// ---------- buildArticleMarkdown ----------

const baseArticle: WikiArticle = {
  title: "Responsive design",
  summary: "Lessons from two recent essays on responsive design without breakpoints.",
  body: "Body content with [a citation](/reading/2026-04/foo).",
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
    cost_usd: null,
  },
};

const baseArgs = {
  article: baseArticle,
  sources: ["2026-04/b", "2026-04/a"],
  compiledAt: new Date("2026-04-24T00:00:00.000Z"),
};

function parseEntry(md: string): { data: Record<string, unknown>; content: string } {
  const parsed = matter(md);
  return { data: parsed.data, content: parsed.content };
}

describe("buildArticleMarkdown", () => {
  it("emits frontmatter with all required fields plus a sorted sources list", () => {
    const { data, content } = parseEntry(buildArticleMarkdown(baseArgs));
    expect(data).toMatchObject({
      title: "Responsive design",
      summary: "Lessons from two recent essays on responsive design without breakpoints.",
      sources: ["2026-04/a", "2026-04/b"], // input was ["b", "a"], output sorted
      compiled_at: "2026-04-24T00:00:00.000Z",
      compiled_with: "claude-sonnet-4-6",
    });
    expect(content.trim()).toBe("Body content with [a citation](/reading/2026-04/foo).");
  });

  it("never emits related_concepts (derived at render time from the link graph)", () => {
    const { data } = parseEntry(buildArticleMarkdown(baseArgs));
    expect(data).not.toHaveProperty("related_concepts");
  });

  it("trims trailing whitespace from the body so re-runs don't produce diff churn", () => {
    const { content } = parseEntry(
      buildArticleMarkdown({
        ...baseArgs,
        article: { ...baseArticle, body: "Body\n\n\n\n" },
      }),
    );
    expect(content.endsWith("\n\n\n")).toBe(false);
  });

  it("persists compile_cost into frontmatter (snapshotted so git becomes the cost-over-time graph)", () => {
    const { data } = parseEntry(
      buildArticleMarkdown({
        ...baseArgs,
        article: {
          ...baseArticle,
          cost: {
            usage: {
              input_tokens: 12_345,
              output_tokens: 678,
              cache_creation_input_tokens: 0,
              cache_read_input_tokens: 0,
            },
            model: "claude-sonnet-4-6",
            pricing: null,
            cost_usd: 0.42,
          },
        },
      }),
    );
    expect(data.compile_cost).toEqual({
      usage: {
        input_tokens: 12_345,
        output_tokens: 678,
        cache_creation_input_tokens: 0,
        cache_read_input_tokens: 0,
      },
      model: "claude-sonnet-4-6",
      pricing: null,
      cost_usd: 0.42,
    });
  });
});

// ---------- WikiArticleSchema ----------

describe("WikiArticleSchema", () => {
  // Pin the contract: the schema dropped `related_concepts`, but Zod's default
  // strip behavior should silently ignore the field if a model still emits it
  // (e.g. via training inertia). Tightening to .strict() later would break
  // every wiki run; this test surfaces that as an intentional decision.
  it("silently ignores stray related_concepts on input (default strip)", () => {
    const result = WikiArticleSchema.safeParse({
      title: "Responsive design",
      summary: "ok",
      body: "ok",
      related_concepts: ["x"],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty("related_concepts");
    }
  });

  it("accepts an optional aliases array of kebab-case slugs", () => {
    const result = WikiArticleSchema.safeParse({
      title: "MCP",
      summary: "ok",
      body: "ok",
      aliases: ["model-context-protocol"],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.aliases).toEqual(["model-context-protocol"]);
    }
  });

  it("accepts a response with no aliases field at all", () => {
    const result = WikiArticleSchema.safeParse({
      title: "MCP",
      summary: "ok",
      body: "ok",
    });
    expect(result.success).toBe(true);
  });

  it("rejects non-kebab-case alias slugs", () => {
    const result = WikiArticleSchema.safeParse({
      title: "MCP",
      summary: "ok",
      body: "ok",
      aliases: ["NotKebab"],
    });
    expect(result.success).toBe(false);
  });
});

// ---------- buildArticleMarkdown with aliases ----------

describe("buildArticleMarkdown (aliases)", () => {
  it("writes a sorted aliases array into frontmatter when supplied", () => {
    const { data } = parseEntry(
      buildArticleMarkdown({
        ...baseArgs,
        aliases: ["zeta", "alpha", "mu"],
      }),
    );
    expect(data.aliases).toEqual(["alpha", "mu", "zeta"]);
  });

  it("omits aliases entirely when the array is empty", () => {
    const { data } = parseEntry(buildArticleMarkdown({ ...baseArgs, aliases: [] }));
    expect(data).not.toHaveProperty("aliases");
  });

  it("omits aliases entirely when the field is undefined", () => {
    const { data } = parseEntry(buildArticleMarkdown(baseArgs));
    expect(data).not.toHaveProperty("aliases");
  });
});

// ---------- enumerateReading: noindex filter ----------

/**
 * In-memory fake of `EnumerateReadingDeps`. Mirrors the layout the production
 * GitHub-backed listDir/getFile produce: a flat path keyspace where listDir
 * returns entries one level beneath `path`. Mirrors the helper in
 * enumerate.test.ts so the two tests stay shaped the same.
 */
function fakeReadingDeps(files: Record<string, string>): EnumerateReadingDeps {
  return {
    listDir: async (path: string) => {
      const direct = Object.keys(files)
        .filter((k) => k.startsWith(`${path}/`))
        .map((k) => k.slice(path.length + 1));
      const seen = new Set<string>();
      const entries: Array<{ type: "file" | "dir"; name: string; path: string }> = [];
      for (const tail of direct) {
        const slash = tail.indexOf("/");
        if (slash === -1) {
          if (seen.has(tail)) {
            continue;
          }
          seen.add(tail);
          entries.push({ type: "file", name: tail, path: `${path}/${tail}` });
        } else {
          const dir = tail.slice(0, slash);
          if (seen.has(dir)) {
            continue;
          }
          seen.add(dir);
          entries.push({ type: "dir", name: dir, path: `${path}/${dir}` });
        }
      }
      if (entries.length === 0 && !Object.keys(files).some((k) => k.startsWith(`${path}/`))) {
        return { ok: false, error: "404 not found" };
      }
      return { ok: true, data: entries };
    },
    getFile: async (path: string) => {
      const content = files[path];
      if (content == null) {
        return { ok: false, error: "not-found" };
      }
      return { ok: true, data: { content } };
    },
  };
}

const validReadingFm = (extra: Record<string, unknown> = {}) => {
  const fm: Record<string, unknown> = {
    title: "X",
    url: "https://example.com/x",
    summary: "S.",
    category: "tech",
    added: "2026-04-01T00:00:00.000Z",
    topics: ["foo"],
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

describe("enumerateReading: noindex filter", () => {
  it("excludes entries with noindex: true so they don't feed the wiki layer", async () => {
    const deps = fakeReadingDeps({
      "src/content/reading/2026-04/a-public.md": validReadingFm({ title: "Public" }),
      "src/content/reading/2026-04/b-optout.md": validReadingFm({
        title: "Opt-out",
        noindex: true,
        opted_out: "x-robots-tag",
      }),
      "src/content/reading/2026-04/c-public.md": validReadingFm({ title: "Public 2" }),
    });
    const result = await enumerateReading("src/content/reading", deps);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    const titles = result.data.map((s) => s.title).sort();
    expect(titles).toEqual(["Public", "Public 2"]);
  });

  it("includes entries that explicitly set noindex: false", async () => {
    const deps = fakeReadingDeps({
      "src/content/reading/2026-04/a.md": validReadingFm({ noindex: false }),
    });
    const result = await enumerateReading("src/content/reading", deps);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.data).toHaveLength(1);
  });

  it("includes entries when noindex is omitted (default)", async () => {
    const deps = fakeReadingDeps({
      "src/content/reading/2026-04/a.md": validReadingFm({}),
    });
    const result = await enumerateReading("src/content/reading", deps);
    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.data).toHaveLength(1);
  });
});

// ---------- prioritizeByStaleness ----------

type StaleTarget = Parameters<typeof prioritizeByStaleness>[0][number];

function target(topic: string, sources: string[], existingSources?: string[]): StaleTarget {
  return {
    topic,
    sources: sources.map((slug) => source(slug, [topic])),
    ...(existingSources !== undefined
      ? {
          existing: {
            topic,
            path: `src/content/wiki/${topic}.md`,
            sha: "deadbeef",
            sources: existingSources,
            compiled_with: "claude-sonnet-4-6",
          },
        }
      : {}),
  };
}

describe("prioritizeByStaleness", () => {
  it("places first-compile targets (no existing) ahead of refreshes", () => {
    const targets = [
      // existing matches everything except one slug -> staleness = 1
      target("alpha", ["a", "b"], ["a"]),
      // no existing -> infinite staleness
      target("beta", ["c", "d"]),
    ];
    const out = prioritizeByStaleness(targets);
    expect(out.map((t) => t.topic)).toEqual(["beta", "alpha"]);
  });

  it("sorts refreshes by symmetric-difference size, largest first", () => {
    const targets = [
      // small drift: 1 added
      target("a", ["x", "y"], ["x"]),
      // larger drift: 1 added + 1 removed = 2
      target("b", ["m", "n"], ["m", "z"]),
      // largest: full replacement = 4
      target("c", ["p", "q"], ["r", "s"]),
    ];
    const out = prioritizeByStaleness(targets);
    expect(out.map((t) => t.topic)).toEqual(["c", "b", "a"]);
  });

  it("breaks ties alphabetically by topic slug for deterministic dry-run output", () => {
    const targets = [
      target("zeta", ["a", "b"], ["a"]),
      target("alpha", ["a", "b"], ["a"]),
      target("mu", ["a", "b"], ["a"]),
    ];
    const out = prioritizeByStaleness(targets);
    expect(out.map((t) => t.topic)).toEqual(["alpha", "mu", "zeta"]);
  });

  it("breaks ties between first-compile targets alphabetically too", () => {
    const targets = [target("zeta", ["a", "b"]), target("alpha", ["a", "b"])];
    const out = prioritizeByStaleness(targets);
    expect(out.map((t) => t.topic)).toEqual(["alpha", "zeta"]);
  });

  it("does not mutate the input array", () => {
    const targets = [target("zeta", ["a", "b"], ["a"]), target("alpha", ["a", "b"], ["a"])];
    const original = targets.map((t) => t.topic);
    prioritizeByStaleness(targets);
    expect(targets.map((t) => t.topic)).toEqual(original);
  });
});

// ---------- buildDeferredCurlHint ----------

describe("buildDeferredCurlHint", () => {
  it("emits a copy-pasteable curl with the deferred topics as a JSON array", () => {
    const out = buildDeferredCurlHint(["alpha", "beta", "gamma"]);
    expect(out).toContain("/synthesize");
    expect(out).toContain('"topics":["alpha","beta","gamma"]');
    expect(out).toContain('"dry_run":false');
  });
});

// ---------- buildPrBody (deferred section) ----------

describe("buildPrBody (deferred section)", () => {
  function emptySummary() {
    return {
      active_topics: [],
      compiled: 0,
      failed: [],
      skipped: [],
      auto_repaired: [],
      alias_outcomes: [],
      deferred: [] as string[],
      run_cost: aggregateCost([]),
    };
  }

  it("renders a Deferred heading and curl hint when topics are deferred", () => {
    const body = buildPrBody({
      mutation: { added: [], changed: [] },
      summary: { ...emptySummary(), deferred: ["alpha", "beta"] },
    });
    expect(body).toContain("### Deferred");
    expect(body).toContain("alpha");
    expect(body).toContain("beta");
    expect(body).toContain("/synthesize");
    expect(body).toContain('"topics":["alpha","beta"]');
  });

  it("omits the Deferred heading when nothing was deferred", () => {
    const body = buildPrBody({
      mutation: { added: [], changed: [] },
      summary: emptySummary(),
    });
    expect(body).not.toContain("### Deferred");
  });
});

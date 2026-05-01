import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import {
  applyInsertion,
  augmentSnapshot,
  dedupeBatch,
  isAlreadyLinked,
  normalizeUrl,
  pathToPiece,
  scoreCandidate,
  selectCandidates,
  snapshotToRows,
  validateProposal,
} from "./crosslink-phase.ts";

const baseProposal = {
  source_slug: "s",
  source_passage: "Hello world.",
  anchor_phrase: "world",
  target_corpus: "wiki" as const,
  target_slug: "x",
  target_url: "/wiki/x",
  rationale: "",
  confidence: "high" as const,
};

describe("normalizeUrl", () => {
  it("strips trailing slash, fragment, query", () => {
    expect(normalizeUrl("/wiki/foo/")).toBe("/wiki/foo");
    expect(normalizeUrl("/wiki/foo#bar")).toBe("/wiki/foo");
    expect(normalizeUrl("/wiki/foo?utm=x")).toBe("/wiki/foo");
  });
  it("ensures leading slash", () => {
    expect(normalizeUrl("wiki/foo")).toBe("/wiki/foo");
  });
});

describe("isAlreadyLinked", () => {
  it("matches exact target", () => {
    expect(isAlreadyLinked("see [x](/wiki/foo)", "/wiki/foo")).toBe(true);
  });
  it("matches with trailing slash variation", () => {
    expect(isAlreadyLinked("see [x](/wiki/foo/)", "/wiki/foo")).toBe(true);
  });
  it("matches with fragment", () => {
    expect(isAlreadyLinked("see [x](/wiki/foo#section)", "/wiki/foo")).toBe(true);
  });
  it("matches with query", () => {
    expect(isAlreadyLinked("see [x](/wiki/foo?ref=y)", "/wiki/foo")).toBe(true);
  });
  it("does not match a different target", () => {
    expect(isAlreadyLinked("see [x](/wiki/bar)", "/wiki/foo")).toBe(false);
  });
  it("does not partial-match a longer slug", () => {
    expect(isAlreadyLinked("see [x](/wiki/foobar)", "/wiki/foo")).toBe(false);
  });
});

describe("validateProposal", () => {
  it("accepts a clean unique-substring anchor", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "The Karpathy wiki pattern is interesting.",
      anchor_phrase: "Karpathy wiki pattern",
      target_url: "/wiki/karpathy-wiki",
    });
    expect(r.ok).toBe(true);
  });

  it("rejects when anchor is not a substring of source_passage", () => {
    const r = validateProposal({ ...baseProposal, anchor_phrase: "missing" });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.reason).toBe("anchor-not-found");
    }
  });

  it("rejects when anchor occurs more than once", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "AI is AI.",
      anchor_phrase: "AI",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.reason).toBe("anchor-not-unique");
    }
  });

  it("rejects when anchor sits inside an existing markdown link", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "Read [the docs](/wiki/docs) for details.",
      anchor_phrase: "the docs",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.reason).toBe("already-link");
    }
  });

  it("rejects when anchor sits inside inline code", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "Use `npm install` to set up.",
      anchor_phrase: "npm install",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.reason).toBe("inline-code");
    }
  });

  it("rejects when anchor is image alt text", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "![the chart](/img/c.png) shows growth.",
      anchor_phrase: "the chart",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.reason).toBe("image-alt");
    }
  });

  it("rejects when anchor is inside a fenced code block", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "Here's an example.\n```\nuse the docs api\n```\nMore text.",
      anchor_phrase: "use the docs api",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.reason).toBe("code-fence");
    }
  });

  it("rejects when source already links to target elsewhere in the passage", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "Already linked [here](/wiki/x). Also mention world here.",
      anchor_phrase: "world",
      target_url: "/wiki/x",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.reason).toBe("already-linked-target");
    }
  });
});

describe("applyInsertion", () => {
  // ValidProposal can only be obtained through validateProposal, so the
  // tests round-trip through validation to mirror real usage.
  const insert = (body: string, anchor: string, target: string): string => {
    const v = validateProposal({
      source_slug: "s",
      source_passage: body,
      anchor_phrase: anchor,
      target_corpus: "wiki",
      target_slug: "x",
      target_url: target,
      rationale: "",
      confidence: "high",
    });
    if (!v.ok) {
      return body;
    }
    return applyInsertion(body, v.proposal);
  };

  it("replaces the unique anchor with a markdown link", () => {
    const out = insert(
      "The Karpathy wiki pattern is interesting.",
      "Karpathy wiki pattern",
      "/wiki/karpathy-wiki",
    );
    expect(out).toContain("[Karpathy wiki pattern](/wiki/karpathy-wiki)");
  });
  it("is a no-op when re-run on already-linked text", () => {
    const once = insert("Read the docs.", "docs", "/wiki/docs");
    const twice = insert(once, "docs", "/wiki/docs");
    expect(twice).toBe(once);
  });
  it("is a no-op when anchor does not exist", () => {
    const out = insert("Read the docs.", "missing", "/wiki/docs");
    expect(out).toBe("Read the docs.");
  });
  it("is a no-op when anchor occurs more than once", () => {
    const out = insert("AI is AI.", "AI", "/wiki/ai");
    expect(out).toBe("AI is AI.");
  });
});

describe("scoreCandidate", () => {
  it("returns 0 with no shared tags", () => {
    expect(scoreCandidate({ sharedTags: [], sharedSeries: false })).toBe(0);
  });
  it("returns higher score for shared series than shared tag alone", () => {
    const a = scoreCandidate({ sharedTags: ["x"], sharedSeries: false });
    const b = scoreCandidate({ sharedTags: ["x"], sharedSeries: true });
    expect(b).toBeGreaterThan(a);
  });
});

describe("selectCandidates", () => {
  it("filters by shared lowercase-normalized tags and caps", () => {
    const source = { slug: "s", tags: ["LLM-Inference", "Agents"], series: undefined };
    const pool = [
      { slug: "a", tags: ["llm-inference"], series: undefined },
      { slug: "b", tags: ["other"], series: undefined },
      { slug: "c", tags: ["AGENTS"], series: undefined },
    ];
    const out = selectCandidates(source, pool, 50);
    expect(out.map((c) => c.slug).sort()).toEqual(["a", "c"]);
  });
  it("respects max cap with descending score (series boost first)", () => {
    const source = { slug: "s", tags: ["x"], series: "y" };
    const pool = Array.from({ length: 100 }, (_, i) => ({
      slug: `c${i}`,
      tags: ["x"],
      series: i < 10 ? "y" : undefined,
    }));
    const out = selectCandidates(source, pool, 25);
    expect(out.length).toBe(25);
    expect(out.slice(0, 10).every((c) => c.series === "y")).toBe(true);
  });
});

describe("dedupeBatch", () => {
  it("removes duplicate (source, target, anchor) triples", () => {
    const ps = [
      { source_slug: "a", target_slug: "b", anchor_phrase: "x" },
      { source_slug: "a", target_slug: "b", anchor_phrase: "x" },
      { source_slug: "a", target_slug: "c", anchor_phrase: "x" },
    ];
    expect(dedupeBatch(ps).length).toBe(2);
  });
});

import type { CrosslinkProposal as CP, CrosslinkPhaseInput } from "./crosslink-phase.ts";
import { runCrosslinkPhase } from "./crosslink-phase.ts";

const wikiEntry = (slug: string, body: string, sources: string[] = ["a", "b"]) => ({
  slug,
  path: `src/content/wiki/${slug}.md`,
  frontmatter: {
    title: slug,
    summary: "s",
    sources,
    compiled_at: new Date("2026-04-01"),
    compiled_with: "m",
  },
  body,
});

describe("runCrosslinkPhase", () => {
  it("applies a valid backward proposal as a changed file", async () => {
    const input: CrosslinkPhaseInput = {
      newPieces: {
        added: [{ corpus: "reading", slug: "x", url: "/reading/x" }],
        changed: [],
      },
      corpusSnapshot: {
        wiki: [wikiEntry("karpathy", "Karpathy described an LLM Wiki pattern. Read more.")],
        blog: [],
      },
      proposeProposals: async () => ({
        forward: [],
        backward: [
          {
            source_slug: "karpathy",
            source_passage: "Karpathy described an LLM Wiki pattern. Read more.",
            anchor_phrase: "LLM Wiki pattern",
            target_corpus: "reading",
            target_slug: "x",
            target_url: "/reading/x",
            rationale: "",
            confidence: "high",
          },
        ],
      }),
    };
    const phase = await runCrosslinkPhase(input);
    expect(phase.applied.length).toBe(1);
    expect(phase.changedFiles.length).toBe(1);
    expect(phase.changedFiles[0]?.path).toBe("src/content/wiki/karpathy.md");
    expect(phase.changedFiles[0]?.after).toContain("[LLM Wiki pattern](/reading/x)");
  });

  it("drops invalid proposals silently (anchor not unique)", async () => {
    const input: CrosslinkPhaseInput = {
      newPieces: { added: [{ corpus: "wiki", slug: "x", url: "/wiki/x" }], changed: [] },
      corpusSnapshot: {
        wiki: [wikiEntry("a", "AI is AI is great.")],
        blog: [],
      },
      proposeProposals: async () => ({
        forward: [],
        backward: [
          {
            source_slug: "a",
            source_passage: "AI is AI is great.",
            anchor_phrase: "AI",
            target_corpus: "wiki",
            target_slug: "x",
            target_url: "/wiki/x",
            rationale: "",
            confidence: "high",
          } satisfies CP,
        ],
      }),
    };
    const phase = await runCrosslinkPhase(input);
    expect(phase.applied.length).toBe(0);
    expect(phase.changedFiles.length).toBe(0);
  });

  it("accumulates multiple proposals against the same source file into one changedFile", async () => {
    const input: CrosslinkPhaseInput = {
      newPieces: {
        added: [
          { corpus: "wiki", slug: "x", url: "/wiki/x" },
          { corpus: "wiki", slug: "y", url: "/wiki/y" },
        ],
        changed: [],
      },
      corpusSnapshot: {
        wiki: [wikiEntry("a", "Talk of cats and dogs and birds in passing.")],
        blog: [],
      },
      proposeProposals: async () => ({
        forward: [],
        backward: [
          {
            source_slug: "a",
            source_passage: "Talk of cats and dogs and birds in passing.",
            anchor_phrase: "cats",
            target_corpus: "wiki",
            target_slug: "x",
            target_url: "/wiki/x",
            rationale: "",
            confidence: "high",
          },
          {
            source_slug: "a",
            source_passage: "Talk of cats and dogs and birds in passing.",
            anchor_phrase: "dogs",
            target_corpus: "wiki",
            target_slug: "y",
            target_url: "/wiki/y",
            rationale: "",
            confidence: "high",
          },
        ],
      }),
    };
    const phase = await runCrosslinkPhase(input);
    expect(phase.changedFiles.length).toBe(1);
    expect(phase.changedFiles[0]?.after).toContain("[cats](/wiki/x)");
    expect(phase.changedFiles[0]?.after).toContain("[dogs](/wiki/y)");
    expect(phase.applied.length).toBe(2);
  });

  it("dedupes identical (source, target, anchor) proposals across passes", async () => {
    const proposal: CP = {
      source_slug: "a",
      source_passage: "Hello world here.",
      anchor_phrase: "world",
      target_corpus: "wiki",
      target_slug: "x",
      target_url: "/wiki/x",
      rationale: "",
      confidence: "high",
    };
    const input: CrosslinkPhaseInput = {
      newPieces: { added: [{ corpus: "wiki", slug: "x", url: "/wiki/x" }], changed: [] },
      corpusSnapshot: { wiki: [wikiEntry("a", "Hello world here.")], blog: [] },
      proposeProposals: async () => ({ forward: [proposal], backward: [proposal] }),
    };
    const phase = await runCrosslinkPhase(input);
    expect(phase.applied.length).toBe(1);
  });

  it("ignores proposals whose source slug is not in the snapshot", async () => {
    const input: CrosslinkPhaseInput = {
      newPieces: { added: [{ corpus: "wiki", slug: "x", url: "/wiki/x" }], changed: [] },
      corpusSnapshot: { wiki: [], blog: [] },
      proposeProposals: async () => ({
        forward: [],
        backward: [
          {
            source_slug: "ghost",
            source_passage: "Hello.",
            anchor_phrase: "Hello",
            target_corpus: "wiki",
            target_slug: "x",
            target_url: "/wiki/x",
            rationale: "",
            confidence: "high",
          },
        ],
      }),
    };
    const phase = await runCrosslinkPhase(input);
    expect(phase.applied.length).toBe(0);
    expect(phase.changedFiles.length).toBe(0);
  });

  it("inserts the anchor at the passage's location even when the anchor occurs elsewhere in the body (regression: body-wide vs passage uniqueness)", async () => {
    // Body has "agents" three times; only the source_passage's location
    // should receive the link insertion. Substring-based applyInsertion
    // would have bailed (3 occurrences); AST-based locator finds the unique
    // one inside the source_passage's paragraph.
    const body = [
      "Karpathy's agents prediction was prescient.",
      "",
      "The current generation of agents is reshaping how we ship software.",
      "",
      "Many agents still struggle with state.",
    ].join("\n");
    const input: CrosslinkPhaseInput = {
      newPieces: { added: [{ corpus: "wiki", slug: "agents", url: "/wiki/agents" }], changed: [] },
      corpusSnapshot: { wiki: [wikiEntry("karp", body)], blog: [] },
      proposeProposals: async () => ({
        forward: [],
        backward: [
          {
            source_slug: "karp",
            source_passage: "The current generation of agents is reshaping how we ship software.",
            anchor_phrase: "agents",
            target_corpus: "wiki",
            target_slug: "agents",
            target_url: "/wiki/agents",
            rationale: "",
            confidence: "high",
          } satisfies CP,
        ],
      }),
    };
    const phase = await runCrosslinkPhase(input);
    expect(phase.applied.length).toBe(1);
    expect(phase.changedFiles[0]?.after).toContain("[agents](/wiki/agents)");
    // The anchor in the first paragraph stays as plain text:
    expect(phase.changedFiles[0]?.after).toMatch(/Karpathy's agents prediction/);
    // The anchor in the third paragraph stays as plain text:
    expect(phase.changedFiles[0]?.after).toMatch(/Many agents still struggle/);
  });

  it("populates skip-reason counters for hallucinated and out-of-snapshot proposals", async () => {
    const input: CrosslinkPhaseInput = {
      newPieces: { added: [{ corpus: "wiki", slug: "x", url: "/wiki/x" }], changed: [] },
      corpusSnapshot: { wiki: [wikiEntry("a", "Real body.")], blog: [] },
      proposeProposals: async () => ({
        forward: [],
        backward: [
          // Anchor not in passage:
          {
            source_slug: "a",
            source_passage: "Real body.",
            anchor_phrase: "missing",
            target_corpus: "wiki",
            target_slug: "x",
            target_url: "/wiki/x",
            rationale: "",
            confidence: "high",
          },
          // Source slug not in snapshot:
          {
            source_slug: "ghost",
            source_passage: "Real body.",
            anchor_phrase: "Real",
            target_corpus: "wiki",
            target_slug: "x",
            target_url: "/wiki/x",
            rationale: "",
            confidence: "high",
          },
        ],
        apiFailures: 2,
      }),
    };
    const phase = await runCrosslinkPhase(input);
    expect(phase.skipped.validationFailures["anchor-not-found"]).toBe(1);
    expect(phase.skipped.missingSlug).toBe(1);
    expect(phase.skipped.apiFailures).toBe(2);
  });
});

describe("pathToPiece", () => {
  it("maps a wiki content path to a wiki piece", () => {
    const piece = pathToPiece("src/content/wiki/foo.md");
    expect(piece).toEqual({ corpus: "wiki", slug: "foo", url: "/wiki/foo" });
  });

  it("maps a blog content path to a blog piece", () => {
    const piece = pathToPiece("src/content/blog/my-post.md");
    expect(piece).toEqual({ corpus: "blog", slug: "my-post", url: "/writing/my-post" });
  });

  it("maps a reading content path to a reading piece (slug includes month)", () => {
    const piece = pathToPiece("src/content/reading/2026-04/abc.md");
    expect(piece).toEqual({
      corpus: "reading",
      slug: "2026-04/abc",
      url: "/reading/2026-04/abc",
    });
  });

  it("returns null for an unknown corpus prefix", () => {
    expect(pathToPiece("src/content/strange/x.md")).toBeNull();
  });

  it("returns null for a non-content path", () => {
    expect(pathToPiece("workers/site-ingest/src/index.ts")).toBeNull();
  });
});

describe("augmentSnapshot", () => {
  const baseWiki = {
    slug: "existing",
    path: "src/content/wiki/existing.md",
    frontmatter: {
      title: "Existing",
      summary: "x",
      sources: ["a", "b"],
      compiled_at: new Date("2026-01-01"),
      compiled_with: "claude-opus-4-7",
    },
    body: "before body",
  };

  const newArticle = matter.stringify("new body content", {
    title: "New",
    summary: "n",
    sources: ["a", "b"],
    compiled_at: new Date("2026-04-01").toISOString(),
    compiled_with: "claude-opus-4-7",
  });

  it("overlays an added wiki entry onto the snapshot", () => {
    const augmented = augmentSnapshot(
      { wiki: [baseWiki], blog: [] },
      {
        added: [{ path: "src/content/wiki/new.md", content: newArticle }],
        changed: [],
      },
    );
    const slugs = augmented.wiki.map((w) => w.slug).sort();
    expect(slugs).toEqual(["existing", "new"]);
    const added = augmented.wiki.find((w) => w.slug === "new");
    expect(added?.body).toBe("new body content");
  });

  it("overlays a changed wiki entry, replacing the base body", () => {
    const updated = matter.stringify("after body", {
      title: "Existing",
      summary: "x",
      sources: ["a", "b", "c"],
      compiled_at: new Date("2026-04-01").toISOString(),
      compiled_with: "claude-opus-4-7",
    });
    const augmented = augmentSnapshot(
      { wiki: [baseWiki], blog: [] },
      {
        added: [],
        changed: [{ path: "src/content/wiki/existing.md", before: "before body", after: updated }],
      },
    );
    expect(augmented.wiki).toHaveLength(1);
    expect(augmented.wiki[0]?.body).toBe("after body");
    expect(augmented.wiki[0]?.frontmatter.sources).toEqual(["a", "b", "c"]);
  });

  it("drops a mutation whose frontmatter fails the wiki schema", () => {
    const broken = matter.stringify("body", {
      title: "Broken",
      // missing summary, sources, compiled_at, compiled_with
    });
    const augmented = augmentSnapshot(
      { wiki: [baseWiki], blog: [] },
      {
        added: [{ path: "src/content/wiki/broken.md", content: broken }],
        changed: [],
      },
    );
    expect(augmented.wiki.map((w) => w.slug)).toEqual(["existing"]);
  });

  it("ignores a mutation under an unknown corpus path", () => {
    const augmented = augmentSnapshot(
      { wiki: [baseWiki], blog: [] },
      {
        added: [{ path: "src/content/strange/foo.md", content: newArticle }],
        changed: [],
      },
    );
    expect(augmented.wiki.map((w) => w.slug)).toEqual(["existing"]);
    expect(augmented.blog).toEqual([]);
  });

  it("changed-after-added: the changed body wins for the same path", () => {
    const initial = matter.stringify("initial body", {
      title: "Same",
      summary: "n",
      sources: ["a", "b"],
      compiled_at: new Date("2026-04-01").toISOString(),
      compiled_with: "claude-opus-4-7",
    });
    const updated = matter.stringify("updated body", {
      title: "Same",
      summary: "n",
      sources: ["a", "b"],
      compiled_at: new Date("2026-04-02").toISOString(),
      compiled_with: "claude-opus-4-7",
    });
    const augmented = augmentSnapshot(
      { wiki: [], blog: [] },
      {
        added: [{ path: "src/content/wiki/same.md", content: initial }],
        changed: [{ path: "src/content/wiki/same.md", before: "initial body", after: updated }],
      },
    );
    const piece = augmented.wiki.find((w) => w.slug === "same");
    expect(piece?.body).toBe("updated body");
  });
});

describe("snapshotToRows", () => {
  const wiki = (slug: string, sources: string[]) => ({
    slug,
    path: `src/content/wiki/${slug}.md`,
    frontmatter: {
      title: slug,
      summary: "x",
      sources,
      compiled_at: new Date("2026-04-01"),
      compiled_with: "claude-opus-4-7",
    },
    body: "",
  });

  it("falls back to slug-only tags when no reading-topics map is supplied", () => {
    const rows = snapshotToRows({ wiki: [wiki("a", ["2026-04/foo"])], blog: [] });
    expect(rows[0]?.tags).toEqual(["a"]);
  });

  it("inherits topic tags from contributing reading sources", () => {
    const readingTopics = new Map<string, string[]>([
      ["2026-04/foo", ["responsive-design", "fluid-typography"]],
      ["2026-04/bar", ["responsive-design"]],
    ]);
    const rows = snapshotToRows(
      { wiki: [wiki("a", ["2026-04/foo", "2026-04/bar"])], blog: [] },
      readingTopics,
    );
    expect(new Set(rows[0]?.tags)).toEqual(new Set(["a", "responsive-design", "fluid-typography"]));
  });

  it("dedupes shared topics across two wiki articles so they match each other", () => {
    const readingTopics = new Map<string, string[]>([
      ["2026-04/foo", ["responsive-design"]],
      ["2026-04/bar", ["responsive-design"]],
    ]);
    const rows = snapshotToRows(
      { wiki: [wiki("a", ["2026-04/foo"]), wiki("b", ["2026-04/bar"])], blog: [] },
      readingTopics,
    );
    const aTags = rows.find((r) => r.piece.slug === "a")?.tags ?? [];
    const bTags = rows.find((r) => r.piece.slug === "b")?.tags ?? [];
    expect(aTags).toContain("responsive-design");
    expect(bTags).toContain("responsive-design");
  });

  it("ignores sources missing from the reading-topics map", () => {
    const readingTopics = new Map<string, string[]>();
    const rows = snapshotToRows(
      { wiki: [wiki("a", ["2026-04/missing"])], blog: [] },
      readingTopics,
    );
    expect(rows[0]?.tags).toEqual(["a"]);
  });
});

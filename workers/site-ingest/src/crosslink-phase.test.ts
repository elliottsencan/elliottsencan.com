import { describe, expect, it } from "vitest";
import {
  applyInsertion,
  dedupeBatch,
  isAlreadyLinked,
  normalizeUrl,
  scoreCandidate,
  selectCandidates,
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
    if (!r.ok) expect(r.reason).toBe("anchor-not-found");
  });

  it("rejects when anchor occurs more than once", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "AI is AI.",
      anchor_phrase: "AI",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe("anchor-not-unique");
  });

  it("rejects when anchor sits inside an existing markdown link", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "Read [the docs](/wiki/docs) for details.",
      anchor_phrase: "the docs",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe("already-link");
  });

  it("rejects when anchor sits inside inline code", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "Use `npm install` to set up.",
      anchor_phrase: "npm install",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe("inline-code");
  });

  it("rejects when anchor is image alt text", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "![the chart](/img/c.png) shows growth.",
      anchor_phrase: "the chart",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe("image-alt");
  });

  it("rejects when anchor is inside a fenced code block", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "Here's an example.\n```\nuse the docs api\n```\nMore text.",
      anchor_phrase: "use the docs api",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe("code-fence");
  });

  it("rejects when source already links to target elsewhere in the passage", () => {
    const r = validateProposal({
      ...baseProposal,
      source_passage: "Already linked [here](/wiki/x). Also mention world here.",
      anchor_phrase: "world",
      target_url: "/wiki/x",
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe("already-linked-target");
  });
});

describe("applyInsertion", () => {
  it("replaces the unique anchor with a markdown link", () => {
    const out = applyInsertion(
      "The Karpathy wiki pattern is interesting.",
      "Karpathy wiki pattern",
      "/wiki/karpathy-wiki",
    );
    expect(out).toBe("The [Karpathy wiki pattern](/wiki/karpathy-wiki) is interesting.");
  });
  it("is a no-op when re-run on already-linked text", () => {
    const once = applyInsertion("Read the docs.", "docs", "/wiki/docs");
    const twice = applyInsertion(once, "docs", "/wiki/docs");
    expect(twice).toBe(once);
  });
  it("is a no-op when anchor does not exist", () => {
    const out = applyInsertion("Read the docs.", "missing", "/wiki/docs");
    expect(out).toBe("Read the docs.");
  });
  it("is a no-op when anchor occurs more than once", () => {
    const out = applyInsertion("AI is AI.", "AI", "/wiki/ai");
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

import { runCrosslinkPhase } from "./crosslink-phase.ts";
import type { CrosslinkPhaseInput, CrosslinkProposal as CP } from "./crosslink-phase.ts";

const wikiEntry = (slug: string, body: string, sources: string[] = ["a", "b"]) => ({
  slug,
  path: `src/content/wiki/${slug}.md`,
  frontmatter: { title: slug, summary: "s", sources },
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
    expect(phase.changedFiles[0]!.path).toBe("src/content/wiki/karpathy.md");
    expect(phase.changedFiles[0]!.after).toContain("[LLM Wiki pattern](/reading/x)");
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
    expect(phase.changedFiles[0]!.after).toContain("[cats](/wiki/x)");
    expect(phase.changedFiles[0]!.after).toContain("[dogs](/wiki/y)");
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
});


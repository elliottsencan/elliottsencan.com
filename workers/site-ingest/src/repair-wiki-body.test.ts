import { describe, expect, it } from "vitest";
import { repairWikiBodyLinks } from "./crosslink-mdast.ts";

const known = new Set(["2026-04/foo", "2026-04/bar"]);

describe("repairWikiBodyLinks", () => {
  it("keeps a /reading link whose slug is in the known set", () => {
    const body = "See [foo](/reading/2026-04/foo) for more.";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toBe(body);
    expect(out.dropped).toEqual([]);
  });

  it("unwraps a /reading link whose slug is unknown, preserving anchor text", () => {
    const body = "Compare [foo](/reading/2026-04/typo-slug) with bar.";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toBe("Compare foo with bar.");
    expect(out.dropped).toEqual([
      { url: "/reading/2026-04/typo-slug", anchor: "foo", reason: "unknown-reading-slug" },
    ]);
  });

  it("always unwraps /wiki links, even if the slug looks plausible", () => {
    const body = "Related: [model training](/wiki/model-training).";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toBe("Related: model training.");
    expect(out.dropped).toEqual([
      { url: "/wiki/model-training", anchor: "model training", reason: "wiki-link" },
    ]);
  });

  it("leaves external https links and other internal links alone", () => {
    const body = "Source [docs](https://example.com/docs) and [project](/projects/foo).";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toBe(body);
    expect(out.dropped).toEqual([]);
  });

  it("repairs an unknown reading link nested inside **bold** without losing emphasis", () => {
    const body = "**See [missing](/reading/2026-04/nope)** later.";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toContain("**See missing**");
    expect(out.dropped[0]?.reason).toBe("unknown-reading-slug");
  });

  it("repairs a /wiki link inside a table cell", () => {
    const body = "| col |\n| --- |\n| see [x](/wiki/x) |\n";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).not.toContain("/wiki/x");
    expect(out.body).toContain("see x");
    expect(out.dropped).toHaveLength(1);
  });

  it("preserves no-trailing-newline bodies", () => {
    const body = "Plain text [bad](/reading/2026-04/missing) end.";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body.endsWith("\n")).toBe(false);
  });

  it("preserves trailing-newline bodies", () => {
    const body = "Plain text [bad](/reading/2026-04/missing) end.\n";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body.endsWith("\n")).toBe(true);
  });

  it("handles multiple unwrap targets in the same paragraph", () => {
    const body = "Mix [a](/reading/2026-04/foo) [b](/wiki/b) [c](/reading/2026-04/missing).";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toBe("Mix [a](/reading/2026-04/foo) b c.");
    expect(out.dropped.map((d) => d.reason).sort()).toEqual(["unknown-reading-slug", "wiki-link"]);
  });

  it("strips trailing slash, query, and fragment when matching slugs", () => {
    const body =
      "[a](/reading/2026-04/foo/) [b](/reading/2026-04/foo?ref=x) [c](/reading/2026-04/foo#h).";
    const out = repairWikiBodyLinks(body, known);
    expect(out.dropped).toEqual([]);
  });

  it("returns the original body unchanged when nothing needs repair", () => {
    const body = "Source [foo](/reading/2026-04/foo).\n";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toBe(body);
    expect(out.dropped).toEqual([]);
  });

  it("preserves unicode anchor text when unwrapping", () => {
    const body = "概念 [模型訓練](/wiki/model-training) 解説.";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toContain("模型訓練");
    expect(out.body).not.toContain("/wiki/");
    expect(out.dropped[0]?.anchor).toBe("模型訓練");
    expect(out.dropped[0]?.reason).toBe("wiki-link");
  });

  // Known limitation: the walker only handles inline `link` nodes. Reference-
  // style links (`linkReference` + `definition`) survive the repair pass.
  // The synthesize prompt forbids /wiki links and reference syntax in the
  // same breath, so this is acceptable for now; surface here so a future
  // tightening makes a deliberate decision.
  it("does not touch reference-style /wiki links (known limitation)", () => {
    const body = "See [foo][1].\n\n[1]: /wiki/foo\n";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toContain("/wiki/foo");
    expect(out.dropped).toEqual([]);
  });

  it("normalizes a relative reading link with a known slug", () => {
    const body = "See [foo](reading/2026-04/foo) for more.";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toContain("[foo](/reading/2026-04/foo)");
    expect(out.body).not.toContain("[foo](reading/");
    expect(out.dropped).toEqual([]);
  });

  it("normalizes a relative reading link before applying unknown-slug repair, with normalized url in dropped record", () => {
    const body = "Compare [foo](reading/2026-04/typo-slug) with bar.";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toBe("Compare foo with bar.");
    expect(out.dropped).toEqual([
      { url: "/reading/2026-04/typo-slug", anchor: "foo", reason: "unknown-reading-slug" },
    ]);
  });

  it("leaves non-reading relative links alone", () => {
    const body = "See [thing](something/else) and [other](nope/path).";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toBe(body);
    expect(out.dropped).toEqual([]);
  });

  it("leaves an absolute /reading link unchanged (regression guard)", () => {
    const body = "See [foo](/reading/2026-04/foo) for more.";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toBe(body);
    expect(out.dropped).toEqual([]);
  });

  it("does not normalize a relative reading-like string inside inline code", () => {
    const body = "Use `reading/2026-04/foo` as the slug.";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toBe(body);
    expect(out.dropped).toEqual([]);
  });

  it("normalizes a relative reading link with a query string", () => {
    const body = "See [foo](reading/2026-04/foo?ref=x) for more.";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toContain("[foo](/reading/2026-04/foo?ref=x)");
    expect(out.dropped).toEqual([]);
  });

  it("normalizes a relative reading link with a fragment", () => {
    const body = "See [foo](reading/2026-04/foo#section) for more.";
    const out = repairWikiBodyLinks(body, known);
    expect(out.body).toContain("[foo](/reading/2026-04/foo#section)");
    expect(out.dropped).toEqual([]);
  });
});

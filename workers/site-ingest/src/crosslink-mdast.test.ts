import { describe, expect, it } from "vitest";
import {
  applyAnchorInsertion,
  findAnchorOccurrences,
  joinedText,
  locateAnchor,
  locateAnchorInPassage,
  parseMarkdown,
  spliceLinkAtTextNode,
  stringifyMarkdown,
} from "./crosslink-mdast.ts";

describe("findAnchorOccurrences", () => {
  it("returns empty for empty anchor", () => {
    const root = parseMarkdown("Hello world.");
    expect(findAnchorOccurrences(root, "")).toEqual([]);
  });

  it("finds a single eligible plain-text occurrence", () => {
    const root = parseMarkdown("Hello world.");
    const occs = findAnchorOccurrences(root, "world");
    expect(occs).toHaveLength(1);
    expect(occs[0]?.context).toBe("eligible");
  });

  it("finds an occurrence inside **bold** (emphasis is descended into)", () => {
    const root = parseMarkdown("Read about the **fluid grid** layout.");
    const occs = findAnchorOccurrences(root, "fluid grid");
    expect(occs).toHaveLength(1);
    expect(occs[0]?.context).toBe("eligible");
  });

  it("finds an occurrence inside _emphasis_", () => {
    const root = parseMarkdown("Notes on _intrinsic design_ patterns.");
    const occs = findAnchorOccurrences(root, "intrinsic design");
    expect(occs).toHaveLength(1);
    expect(occs[0]?.context).toBe("eligible");
  });

  it("flags an existing markdown link as in-link", () => {
    const root = parseMarkdown("See [the world](/wiki/world).");
    const occs = findAnchorOccurrences(root, "world");
    expect(occs.map((o) => o.context)).toEqual(["in-link"]);
  });

  it("flags a reference-style link as in-link via linkReference", () => {
    const root = parseMarkdown("See [the world][w].\n\n[w]: /wiki/world");
    const occs = findAnchorOccurrences(root, "world");
    expect(occs.map((o) => o.context)).toContain("in-link");
  });

  it("flags inline code as in-inline-code", () => {
    const root = parseMarkdown("Use `world` to render the globe.");
    const occs = findAnchorOccurrences(root, "world");
    expect(occs.map((o) => o.context)).toEqual(["in-inline-code"]);
  });

  it("flags a code fence as in-code", () => {
    const root = parseMarkdown("```\nhello world\n```");
    const occs = findAnchorOccurrences(root, "world");
    expect(occs.map((o) => o.context)).toEqual(["in-code"]);
  });

  it("flags image alt as in-image-alt", () => {
    const root = parseMarkdown("![the world map](/img.png)");
    const occs = findAnchorOccurrences(root, "world");
    expect(occs.map((o) => o.context)).toEqual(["in-image-alt"]);
  });

  it("locates a tableCell as the containing block", () => {
    const root = parseMarkdown("| header |\n| --- |\n| world cell |\n");
    const occs = findAnchorOccurrences(root, "world");
    expect(occs).toHaveLength(1);
    expect(occs[0]?.context).toBe("eligible");
    expect(occs[0]?.block?.type).toBe("tableCell");
  });

  it("returns multiple occurrences across distinct blocks", () => {
    const root = parseMarkdown("First world.\n\nSecond world.\n");
    const occs = findAnchorOccurrences(root, "world");
    expect(occs).toHaveLength(2);
    for (const o of occs) {
      expect(o.context).toBe("eligible");
      expect(o.block?.type).toBe("paragraph");
    }
  });
});

describe("locateAnchor", () => {
  it("ok when there is exactly one eligible occurrence", () => {
    const root = parseMarkdown("Hello world.");
    const r = locateAnchor(root, "world");
    expect(r.ok).toBe(true);
  });

  it("returns anchor-not-unique when more than one eligible occurrence exists", () => {
    const root = parseMarkdown("First world.\n\nSecond world.");
    const r = locateAnchor(root, "world");
    expect(r).toEqual({ ok: false, reason: "anchor-not-unique" });
  });

  it("returns anchor-not-found when missing", () => {
    const root = parseMarkdown("Hello there.");
    const r = locateAnchor(root, "world");
    expect(r).toEqual({ ok: false, reason: "anchor-not-found" });
  });

  it("returns already-link when only occurrence is inside a link", () => {
    const root = parseMarkdown("See [the world](/wiki/world).");
    const r = locateAnchor(root, "world");
    expect(r).toEqual({ ok: false, reason: "already-link" });
  });

  it("returns inline-code when only occurrence is in inline code", () => {
    const root = parseMarkdown("Use `world` here.");
    const r = locateAnchor(root, "world");
    expect(r).toEqual({ ok: false, reason: "inline-code" });
  });
});

describe("locateAnchorInPassage", () => {
  it("disambiguates a body-wide duplicate via passage scope", () => {
    const body = "First world here.\n\nSecond world there.";
    const root = parseMarkdown(body);
    const r = locateAnchorInPassage(root, "Second world there.", "world");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(joinedText(r.block)).toBe("Second world there.");
    }
  });

  it("matches when passage contains markdown markup that the body has rendered out", () => {
    // Passage from the model uses inline markup, body has plain text.
    const body = "Read here for context.";
    const root = parseMarkdown(body);
    const r = locateAnchorInPassage(root, "Read [here](/x) for context.", "here");
    expect(r.ok).toBe(true);
  });

  it("returns anchor-not-found when the anchor is absent from the body", () => {
    const root = parseMarkdown("Nothing matching.");
    const r = locateAnchorInPassage(root, "Something world here.", "world");
    expect(r).toEqual({ ok: false, reason: "anchor-not-found" });
  });

  it("falls through to the first occurrence's context reason when none match the passage", () => {
    const body = "See [the world](/wiki/world).";
    const root = parseMarkdown(body);
    const r = locateAnchorInPassage(root, "different passage", "world");
    expect(r).toEqual({ ok: false, reason: "already-link" });
  });

  it("treats empty rendered passage as no scope filter (any block matches)", () => {
    const body = "Just one world here.";
    const root = parseMarkdown(body);
    const r = locateAnchorInPassage(root, "", "world");
    expect(r.ok).toBe(true);
  });
});

describe("spliceLinkAtTextNode", () => {
  it("inserts a link in the middle of a plain paragraph", () => {
    const root = parseMarkdown("Hello world today.");
    const located = locateAnchor(root, "world");
    expect(located.ok).toBe(true);
    if (!located.ok) {
      return;
    }
    const ok = spliceLinkAtTextNode(root, located.textNode, located.offset, "world", "/wiki/world");
    expect(ok).toBe(true);
    expect(stringifyMarkdown(root).trim()).toBe("Hello [world](/wiki/world) today.");
  });

  it("inserts a link inside a **bold** wrapper without escaping the bold", () => {
    const root = parseMarkdown("Read **the world** carefully.");
    const located = locateAnchor(root, "world");
    expect(located.ok).toBe(true);
    if (!located.ok) {
      return;
    }
    const ok = spliceLinkAtTextNode(root, located.textNode, located.offset, "world", "/wiki/world");
    expect(ok).toBe(true);
    const out = stringifyMarkdown(root).trim();
    expect(out).toContain("[world](/wiki/world)");
    expect(out).toContain("**");
  });
});

describe("applyAnchorInsertion", () => {
  it("inserts a link and preserves a trailing newline", () => {
    const out = applyAnchorInsertion(
      "Hello world today.\n",
      "Hello world today.",
      "world",
      "/wiki/world",
    );
    expect(out).toBe("Hello [world](/wiki/world) today.\n");
  });

  it("inserts a link and preserves the absence of a trailing newline", () => {
    const out = applyAnchorInsertion(
      "Hello world today.",
      "Hello world today.",
      "world",
      "/wiki/world",
    );
    expect(out).toBe("Hello [world](/wiki/world) today.");
  });

  it("returns the body unchanged when the anchor is already inside a link", () => {
    const body = "See [the world](/wiki/old).";
    const out = applyAnchorInsertion(body, "See the world.", "world", "/wiki/world");
    expect(out).toBe(body);
  });

  it("returns the body unchanged when the anchor occurs only inside a code fence", () => {
    const body = "```\nhello world\n```";
    const out = applyAnchorInsertion(body, "hello world", "world", "/wiki/world");
    expect(out).toBe(body);
  });

  it("disambiguates body-wide duplicates by passage", () => {
    const body = "First world here.\n\nSecond world there.\n";
    const out = applyAnchorInsertion(body, "Second world there.", "world", "/wiki/world");
    expect(out).toBe("First world here.\n\nSecond [world](/wiki/world) there.\n");
  });
});

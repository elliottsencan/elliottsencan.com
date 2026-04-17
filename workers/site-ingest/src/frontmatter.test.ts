import { describe, expect, it } from "vitest";
import { parseSimpleFrontmatter, validateNowDraft } from "./frontmatter.ts";

describe("parseSimpleFrontmatter", () => {
  it("returns null when there's no frontmatter block", () => {
    expect(parseSimpleFrontmatter("no frontmatter here")).toBeNull();
    expect(parseSimpleFrontmatter("---\nnot closed")).toBeNull();
  });

  it("extracts bare and quoted values", () => {
    const result = parseSimpleFrontmatter(
      ["---", 'title: "Hello"', "updated: 2026-04-16", "count: 42", "---", "body"].join("\n"),
    );
    expect(result).toEqual({ title: "Hello", updated: "2026-04-16", count: "42" });
  });

  it("unescapes embedded quotes and backslashes in quoted values", () => {
    const result = parseSimpleFrontmatter(
      ["---", 'title: "say \\"hi\\" \\\\ here"', "---", "body"].join("\n"),
    );
    expect(result?.title).toBe('say "hi" \\ here');
  });

  it("returns null on malformed YAML (stray bare scalar mixed with mapping)", () => {
    // Under a real YAML parser this is a syntax error; the old regex
    // parser silently skipped unrecognised lines.
    const result = parseSimpleFrontmatter(
      ["---", "title: Ok", "# a comment line", "stray text", "---", "body"].join("\n"),
    );
    expect(result).toBeNull();
  });

  it("returns null when frontmatter is a bare scalar, not a mapping", () => {
    // `---\nnot closed` is parsed by js-yaml as a scalar string, not an
    // object. `parseSimpleFrontmatter` only accepts plain-object YAML.
    expect(parseSimpleFrontmatter(["---", "just a string", "---"].join("\n"))).toBeNull();
  });

  it("coerces bare YAML dates to ISO yyyy-mm-dd strings", () => {
    // js-yaml parses ISO-date-looking scalars into Date objects; ensure the
    // wrapper stringifies them back so downstream code keeps seeing strings.
    const result = parseSimpleFrontmatter(["---", "updated: 2026-04-16", "---"].join("\n"));
    expect(result).toEqual({ updated: "2026-04-16" });
  });

  it("handles multi-line YAML string values", () => {
    const input = ["---", "title: |", "  first line", "  second line", "---", "body"].join("\n");
    const result = parseSimpleFrontmatter(input);
    expect(result?.title).toBe("first line\nsecond line\n");
  });
});

function makeDraft(fields: Record<string, string>, body = "Some body text.\n"): string {
  const lines = ["---", ...Object.entries(fields).map(([k, v]) => `${k}: ${v}`), "---", body];
  return lines.join("\n");
}

describe("validateNowDraft", () => {
  const valid = {
    title: '"Now"',
    description: '"What I\'m working on right now."',
    updated: "2026-04-16",
    standfirst: '"Shipping the /now automation this week; reading a lot about control loops."',
  };

  it("accepts a well-formed draft", () => {
    const draft = makeDraft(valid);
    expect(validateNowDraft(draft)).toMatchObject({ ok: true });
  });

  it("rejects drafts with no frontmatter block", () => {
    expect(validateNowDraft("no frontmatter, just body")).toMatchObject({ ok: false });
  });

  it("rejects drafts missing standfirst", () => {
    const { standfirst: _drop, ...rest } = valid;
    const r = validateNowDraft(makeDraft(rest));
    expect(r.ok).toBe(false);
  });

  it("rejects drafts with standfirst over 180 chars", () => {
    const r = validateNowDraft(makeDraft({ ...valid, standfirst: `"${"x".repeat(200)}"` }));
    expect(r.ok).toBe(false);
  });

  it("rejects drafts with no body after frontmatter", () => {
    const draft = `---\n${Object.entries(valid)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}\n---\n   \n`;
    expect(validateNowDraft(draft)).toMatchObject({ ok: false });
  });

  it("rejects drafts with an unparseable `updated` date", () => {
    const r = validateNowDraft(makeDraft({ ...valid, updated: "yesterday" }));
    expect(r.ok).toBe(false);
  });
});

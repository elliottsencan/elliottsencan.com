import { describe, expect, it } from "vitest";
import { convertToArchiveFrontmatter } from "./archive.ts";

const currentMd = [
  "---",
  'title: "Now"',
  'description: "What I\'m working on right now."',
  "updated: 2026-04-16",
  'standfirst: "Shipping the /now automation this week."',
  "---",
  "",
  "## Building",
  "",
  "Some body text.",
  "",
].join("\n");

describe("convertToArchiveFrontmatter", () => {
  it("rewrites now frontmatter into the archive schema shape", () => {
    const out = convertToArchiveFrontmatter(currentMd, "2026-04-16") ?? "";
    // YAML may single-quote auto-detected date-like or em-dash-containing
    // values; assert the parseable content, not the surrounding quotes.
    expect(out).toMatch(/title:\s*['"]?Now — April 16, 2026['"]?/);
    expect(out).toMatch(/archivedDate:\s*['"]?2026-04-16['"]?/);
    expect(out).toContain("What I'm working on right now.");
    // Old fields are dropped.
    expect(out).not.toContain("standfirst:");
    expect(out).not.toMatch(/^updated:/m);
  });

  it("preserves the body verbatim after the new frontmatter", () => {
    const out = convertToArchiveFrontmatter(currentMd, "2026-04-16") ?? "";
    // Body starts at the first line after the closing `---` fence.
    const body = out.split(/\n---\n/, 2)[1] ?? "";
    expect(body).toContain("## Building");
    expect(body).toContain("Some body text.");
  });

  it("falls back to a stock description when the source has none", () => {
    const noDesc = currentMd.replace(/description: .*\n/, "");
    const out = convertToArchiveFrontmatter(noDesc, "2026-04-16") ?? "";
    expect(out).toContain("description: What I was working on.");
  });

  it("returns null when the source has no frontmatter block", () => {
    expect(
      convertToArchiveFrontmatter("# just a heading\n\nno frontmatter", "2026-04-16"),
    ).toBeNull();
  });
});

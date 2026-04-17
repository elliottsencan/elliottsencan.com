import { describe, expect, it } from "vitest";
import { currentAndPreviousMonth, parseReadingFrontmatter } from "./reading-context.ts";

describe("currentAndPreviousMonth (Pacific)", () => {
  it("returns [current, previous] month keys mid-month", () => {
    const d = new Date(Date.UTC(2026, 6, 15, 12, 0, 0));
    expect(currentAndPreviousMonth(d)).toEqual(["2026-07", "2026-06"]);
  });

  it("crosses a year boundary in January", () => {
    const d = new Date(Date.UTC(2026, 0, 15, 12, 0, 0));
    expect(currentAndPreviousMonth(d)).toEqual(["2026-01", "2025-12"]);
  });

  it("uses Pacific month when UTC has already tipped into the next month", () => {
    // 2026-04-01 02:00 UTC = 2026-03-31 19:00 PDT. Pacific month is March.
    const d = new Date(Date.UTC(2026, 3, 1, 2, 0, 0));
    expect(currentAndPreviousMonth(d)).toEqual(["2026-03", "2026-02"]);
  });

  it("handles leap-year February preceding March", () => {
    const d = new Date(Date.UTC(2028, 2, 5, 12, 0, 0));
    expect(currentAndPreviousMonth(d)).toEqual(["2028-03", "2028-02"]);
  });
});

describe("parseReadingFrontmatter", () => {
  const valid = [
    "---",
    'title: "Hello world"',
    "url: https://example.com/",
    'summary: "A short summary."',
    "category: tech",
    "added: 2026-04-16T09:30:00Z",
    "---",
    "body",
  ].join("\n");

  it("round-trips a well-formed reading entry", () => {
    const r = parseReadingFrontmatter(valid);
    expect(r).toEqual({
      title: "Hello world",
      url: "https://example.com/",
      summary: "A short summary.",
      category: "tech",
      added: "2026-04-16T09:30:00.000Z",
    });
  });

  it("returns null when a required field is missing", () => {
    const missingCategory = valid.replace("category: tech\n", "");
    expect(parseReadingFrontmatter(missingCategory)).toBeNull();
  });

  it("returns null when there is no frontmatter block", () => {
    expect(parseReadingFrontmatter("no frontmatter here")).toBeNull();
  });

  it("returns null on malformed YAML", () => {
    const malformed = ["---", "title: Ok", "stray text", "---", "body"].join("\n");
    expect(parseReadingFrontmatter(malformed)).toBeNull();
  });
});

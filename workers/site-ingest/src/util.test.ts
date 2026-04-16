import { describe, expect, it } from "vitest";
import {
  dateKey,
  fileTimestamp,
  monthKey,
  requireBearer,
  slugify,
  timingSafeEqual,
  yamlEscape,
} from "./util.ts";

describe("timingSafeEqual", () => {
  it("returns true for identical strings", () => {
    expect(timingSafeEqual("abc123", "abc123")).toBe(true);
  });

  it("returns false when lengths differ", () => {
    expect(timingSafeEqual("abc", "abcd")).toBe(false);
    expect(timingSafeEqual("", "a")).toBe(false);
  });

  it("returns false when content differs at same length", () => {
    expect(timingSafeEqual("abc", "abd")).toBe(false);
    expect(timingSafeEqual("abc", "xbc")).toBe(false);
  });

  it("returns true for two empty strings", () => {
    expect(timingSafeEqual("", "")).toBe(true);
  });
});

describe("requireBearer", () => {
  const token = "s3cret-token-value";

  function reqWith(headerValue: string | null): Request {
    const headers = new Headers();
    if (headerValue !== null) headers.set("Authorization", headerValue);
    return new Request("https://example.com/", { method: "POST", headers });
  }

  it("rejects requests without an Authorization header", () => {
    expect(requireBearer(reqWith(null), token)).toBe(false);
  });

  it("rejects non-Bearer authorization schemes", () => {
    expect(requireBearer(reqWith(`Basic ${token}`), token)).toBe(false);
    expect(requireBearer(reqWith(`bearer ${token}`), token)).toBe(false);
  });

  it("rejects Bearer header with wrong token", () => {
    expect(requireBearer(reqWith(`Bearer wrong-token-value`), token)).toBe(false);
  });

  it("accepts Bearer header with correct token", () => {
    expect(requireBearer(reqWith(`Bearer ${token}`), token)).toBe(true);
  });

  it("rejects Bearer header with empty token", () => {
    expect(requireBearer(reqWith("Bearer "), token)).toBe(false);
  });
});

describe("slugify", () => {
  it("lowercases + hyphenates basic text", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips non-alphanumeric characters", () => {
    expect(slugify("Foo, Bar & Baz!")).toBe("foo-bar-baz");
  });

  it("normalizes accents via NFKD", () => {
    expect(slugify("Café Résumé")).toBe("cafe-resume");
  });

  it("collapses repeated hyphens", () => {
    expect(slugify("a---b")).toBe("a-b");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("--foo--")).toBe("foo");
  });

  it("returns 'untitled' for empty or symbol-only input", () => {
    expect(slugify("")).toBe("untitled");
    expect(slugify("!!!")).toBe("untitled");
    expect(slugify("   ")).toBe("untitled");
  });

  it("truncates to the supplied max length", () => {
    const slug = slugify("one two three four five six seven eight", 20);
    expect(slug.length).toBeLessThanOrEqual(20);
    expect(slug.startsWith("one-two-three-four")).toBe(true);
  });
});

describe("yamlEscape", () => {
  it("passes plain strings through unchanged", () => {
    expect(yamlEscape("hello world")).toBe("hello world");
  });

  it("escapes double quotes", () => {
    expect(yamlEscape('say "hi"')).toBe('say \\"hi\\"');
  });

  it("escapes backslashes before quotes", () => {
    expect(yamlEscape("a\\b")).toBe("a\\\\b");
  });

  it("strips control characters", () => {
    expect(yamlEscape("a\x00b\x07c")).toBe("abc");
  });

  it("replaces newlines with spaces (prevents frontmatter injection)", () => {
    expect(yamlEscape("test\narchived: true")).toBe("test archived: true");
    expect(yamlEscape("a\r\nb")).toBe("a b");
  });

  it("truncates to the supplied max length", () => {
    expect(yamlEscape("x".repeat(20), 5)).toBe("xxxxx");
  });
});

describe("date helpers", () => {
  const d = new Date(Date.UTC(2026, 3, 16, 9, 30, 45));

  it("monthKey returns YYYY-MM", () => {
    expect(monthKey(d)).toBe("2026-04");
  });

  it("dateKey returns YYYY-MM-DD", () => {
    expect(dateKey(d)).toBe("2026-04-16");
  });

  it("fileTimestamp returns UTC YYYY-MM-DDTHHMMSS", () => {
    expect(fileTimestamp(d)).toBe("2026-04-16T093045");
  });
});

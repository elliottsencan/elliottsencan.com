import { describe, expect, it } from "vitest";
import {
  dateKey,
  fileTimestamp,
  jsonResponse,
  monthKey,
  readingSlugFromPath,
  requireBearer,
  slugify,
  textResponse,
  timingSafeEqual,
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
    if (headerValue !== null) {
      headers.set("Authorization", headerValue);
    }
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

  it("strips non-alphanumeric characters and expands symbols", () => {
    // `&` → "and" is the slugify library's default charmap; more
    // semantically meaningful than silently dropping the character.
    expect(slugify("Foo, Bar & Baz!")).toBe("foo-bar-and-baz");
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

describe("date helpers (Pacific / America/Los_Angeles)", () => {
  // April 16 2026 09:30:45 UTC = April 16 2026 02:30:45 PDT (UTC-7).
  const d = new Date(Date.UTC(2026, 3, 16, 9, 30, 45));

  it("monthKey returns YYYY-MM in Pacific", () => {
    expect(monthKey(d)).toBe("2026-04");
  });

  it("dateKey returns YYYY-MM-DD in Pacific", () => {
    expect(dateKey(d)).toBe("2026-04-16");
  });

  it("fileTimestamp returns Pacific YYYY-MM-DDTHHMMSS", () => {
    expect(fileTimestamp(d)).toBe("2026-04-16T023045");
  });

  it("dateKey rolls back when UTC is already next day but Pacific isn't", () => {
    // UTC 2026-04-01 02:00 = PDT 2026-03-31 19:00.
    const late = new Date(Date.UTC(2026, 3, 1, 2, 0, 0));
    expect(dateKey(late)).toBe("2026-03-31");
    expect(monthKey(late)).toBe("2026-03");
  });

  it("handles PST (winter) and PDT (summer) symmetrically", () => {
    // January 10 2026 08:00 UTC = PST (UTC-8), local 00:00 Jan 10.
    const pst = new Date(Date.UTC(2026, 0, 10, 8, 0, 0));
    expect(dateKey(pst)).toBe("2026-01-10");
    // July 15 2026 07:00 UTC = PDT (UTC-7), local 00:00 Jul 15.
    const pdt = new Date(Date.UTC(2026, 6, 15, 7, 0, 0));
    expect(dateKey(pdt)).toBe("2026-07-15");
  });

  it("does not throw on DST transition days", () => {
    // Spring forward: 2026-03-08. Fall back: 2026-11-01.
    const spring = new Date(Date.UTC(2026, 2, 8, 12, 0, 0));
    const fall = new Date(Date.UTC(2026, 10, 1, 12, 0, 0));
    expect(() => dateKey(spring)).not.toThrow();
    expect(() => fileTimestamp(spring)).not.toThrow();
    expect(() => dateKey(fall)).not.toThrow();
    expect(() => fileTimestamp(fall)).not.toThrow();
  });
});

describe("readingSlugFromPath", () => {
  it("returns <month>/<basename> lowercased for canonical reading paths", () => {
    expect(readingSlugFromPath("src/content/reading/2026-04/2026-04-24T093356-Unsloth.md")).toBe(
      "2026-04/2026-04-24t093356-unsloth",
    );
  });

  it("falls back to lowercased path-without-extension when no /reading/ prefix", () => {
    expect(readingSlugFromPath("/tmp/2026-04/Foo.md")).toBe("/tmp/2026-04/foo");
  });

  it("is idempotent on already-canonical slugs", () => {
    const canonical = "src/content/reading/2026-04/2026-04-24t093356-unsloth.md";
    expect(readingSlugFromPath(canonical)).toBe(readingSlugFromPath(`x${canonical}`.slice(1)));
  });
});

describe("response helpers", () => {
  it("jsonResponse serialises the body and sets JSON + no-store headers", async () => {
    const r = jsonResponse({ ok: true, n: 42 });
    expect(r.status).toBe(200);
    expect(r.headers.get("Content-Type")).toBe("application/json");
    expect(r.headers.get("Cache-Control")).toBe("no-store");
    await expect(r.text()).resolves.toBe('{"ok":true,"n":42}');
  });

  it("jsonResponse uses supplied status", () => {
    expect(jsonResponse({ ok: false }, 400).status).toBe(400);
  });

  it("textResponse returns plain-text with no-store headers", async () => {
    const r = textResponse("hello", 404);
    expect(r.status).toBe(404);
    expect(r.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
    expect(r.headers.get("Cache-Control")).toBe("no-store");
    await expect(r.text()).resolves.toBe("hello");
  });
});

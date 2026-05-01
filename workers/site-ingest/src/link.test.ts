import { describe, expect, it } from "vitest";
import { validate } from "./link.ts";

describe("link.validate", () => {
  it("rejects non-object bodies", () => {
    expect(validate(null)).toMatchObject({ ok: false });
    expect(validate(undefined)).toMatchObject({ ok: false });
    expect(validate("a string")).toMatchObject({ ok: false });
    expect(validate(42)).toMatchObject({ ok: false });
  });

  it("requires url to be a string", () => {
    const r = validate({ url: 123 });
    expect(r.ok).toBe(false);
  });

  it("rejects malformed URLs", () => {
    expect(validate({ url: "not a url" })).toMatchObject({ ok: false });
  });

  it("rejects file:// URLs", () => {
    expect(validate({ url: "file:///etc/passwd" })).toMatchObject({ ok: false });
  });

  it("rejects javascript: URLs", () => {
    expect(validate({ url: "javascript:alert(1)" })).toMatchObject({ ok: false });
  });

  it("accepts http and https URLs", () => {
    expect(validate({ url: "http://example.com/" })).toMatchObject({ ok: true });
    expect(validate({ url: "https://example.com/path?q=1" })).toMatchObject({ ok: true });
  });

  it("preserves optional title when supplied", () => {
    const r = validate({ url: "https://example.com/", title: "Hello" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.title).toBe("Hello");
    }
  });

  it("trims and truncates long titles", () => {
    const longTitle = `  ${"a".repeat(500)}  `;
    const r = validate({ url: "https://example.com/", title: longTitle });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.title).toBeDefined();
      expect((r.data.title ?? "").length).toBeLessThanOrEqual(200);
    }
  });

  it("drops empty-string title instead of failing", () => {
    const r = validate({ url: "https://example.com/", title: "" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.title).toBeUndefined();
    }
  });

  it("rejects non-string title", () => {
    expect(validate({ url: "https://example.com/", title: 42 })).toMatchObject({ ok: false });
  });

  it("preserves and truncates excerpt", () => {
    // Truncation cap matches MAX_EXCERPT_LENGTH in link.ts (16_000).
    const longExcerpt = "e".repeat(20_000);
    const r = validate({ url: "https://example.com/", excerpt: longExcerpt });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.excerpt).toBeDefined();
      expect((r.data.excerpt ?? "").length).toBeLessThanOrEqual(16_000);
    }
  });

  it("defaults topic_priors to true (production behavior)", () => {
    const r = validate({ url: "https://example.com/" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.topic_priors).toBe(true);
    }
  });

  it("preserves topic_priors=false so the A/B run can opt out of priors", () => {
    const r = validate({ url: "https://example.com/", topic_priors: false });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.topic_priors).toBe(false);
    }
  });

  it("rejects a non-boolean topic_priors", () => {
    expect(validate({ url: "https://example.com/", topic_priors: "yes" })).toMatchObject({
      ok: false,
    });
  });
});

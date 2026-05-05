/**
 * Tests for the copyright-posture opt-out helpers used by /link.
 *
 * Two surfaces:
 *  - `isHostExcluded(host, blocklistCsv)`: pure string check; matches exact
 *    hostname or any parent-domain entry.
 *  - `checkOptOutSignals({ url, fetch })`: HTTP-side check that inspects
 *    `X-Robots-Tag`, `<meta name="robots">`/`googlebot`, and `robots.txt`
 *    Disallow rules. Returns `{ ok: true }` or `{ ok: false, reason }`.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { __resetRobotsCacheForTests, checkOptOutSignals, isHostExcluded } from "./optout.ts";

// ---------- host blocklist ----------

describe("isHostExcluded", () => {
  it("returns false when blocklist is empty or undefined", () => {
    expect(isHostExcluded("nyt.com", "")).toBe(false);
    expect(isHostExcluded("nyt.com", undefined)).toBe(false);
  });

  it("matches exact hostname (case-insensitive)", () => {
    expect(isHostExcluded("nyt.com", "nyt.com")).toBe(true);
    expect(isHostExcluded("NYT.com", "nyt.com")).toBe(true);
    expect(isHostExcluded("nyt.com", "NYT.com")).toBe(true);
  });

  it("matches a parent-domain entry against subdomains", () => {
    expect(isHostExcluded("www.nyt.com", "nyt.com")).toBe(true);
    expect(isHostExcluded("cooking.nyt.com", "nyt.com")).toBe(true);
    expect(isHostExcluded("a.b.nyt.com", "nyt.com")).toBe(true);
  });

  it("does not match unrelated domains that contain the entry as substring", () => {
    expect(isHostExcluded("notnyt.com", "nyt.com")).toBe(false);
    expect(isHostExcluded("nyt.com.evil.example", "nyt.com")).toBe(false);
  });

  it("supports a comma-separated blocklist", () => {
    const list = "nyt.com, washingtonpost.com,wsj.com";
    expect(isHostExcluded("www.nyt.com", list)).toBe(true);
    expect(isHostExcluded("foo.washingtonpost.com", list)).toBe(true);
    expect(isHostExcluded("WSJ.com", list)).toBe(true);
    expect(isHostExcluded("example.com", list)).toBe(false);
  });

  it("ignores empty entries from sloppy CSV", () => {
    expect(isHostExcluded("nyt.com", " , ,nyt.com,, ")).toBe(true);
    expect(isHostExcluded("example.com", " , , ")).toBe(false);
  });
});

// ---------- opt-out signals ----------

describe("checkOptOutSignals", () => {
  beforeEach(() => {
    __resetRobotsCacheForTests();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    __resetRobotsCacheForTests();
  });

  function stubFetch(handler: (url: string) => Response | Promise<Response>): void {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = typeof input === "string" ? input : input.toString();
        return handler(url);
      }),
    );
  }

  it("aborts when the article URL responds with X-Robots-Tag: noai", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response("<html><title>Hi</title></html>", {
        status: 200,
        headers: { "X-Robots-Tag": "noai, noimageai" },
      });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toMatch(/x-robots-tag/i);
    }
  });

  it("aborts when X-Robots-Tag contains noindex (case-insensitive, comma-tokenized)", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response("<html></html>", {
        status: 200,
        headers: { "X-Robots-Tag": "googlebot: NoIndex" },
      });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.ok).toBe(false);
  });

  it("allows when X-Robots-Tag has unrelated tokens like 'index, follow'", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response("<html><title>Hi</title></html>", {
        status: 200,
        headers: { "X-Robots-Tag": "index, follow" },
      });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.ok).toBe(true);
  });

  it('aborts when <meta name="robots" content="noai"> appears in HTML body', async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response(
        '<html><head><meta name="robots" content="noai, follow"></head><body>x</body></html>',
        { status: 200 },
      );
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toMatch(/meta robots/i);
    }
  });

  it('aborts when <meta name="googlebot" content="noindex"> appears', async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response('<html><head><meta name="googlebot" content="noindex"></head></html>', {
        status: 200,
      });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.ok).toBe(false);
  });

  it("aborts when robots.txt has User-agent: * with Disallow: /", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("User-agent: *\nDisallow: /\n", { status: 200 });
      }
      return new Response("<html></html>", { status: 200 });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toMatch(/robots\.txt/i);
    }
  });

  it("aborts when robots.txt path-specific Disallow matches the URL", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("User-agent: *\nDisallow: /private\n", { status: 200 });
      }
      return new Response("<html></html>", { status: 200 });
    });
    const result = await checkOptOutSignals({
      url: "https://example.com/private/page",
    });
    expect(result.ok).toBe(false);
  });

  it("allows when robots.txt Disallow path does not match the URL", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("User-agent: *\nDisallow: /admin\n", { status: 200 });
      }
      return new Response("<html><title>Hi</title></html>", { status: 200 });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/public/page" });
    expect(result.ok).toBe(true);
  });

  it("allows when robots.txt is missing (404)", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("not found", { status: 404 });
      }
      return new Response("<html><title>Hi</title></html>", { status: 200 });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.ok).toBe(true);
  });

  it("caches robots.txt per host across calls", async () => {
    let robotsHits = 0;
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        robotsHits++;
        return new Response("User-agent: Googlebot\nDisallow: /\n", { status: 200 });
      }
      return new Response("<html></html>", { status: 200 });
    });
    await checkOptOutSignals({ url: "https://example.com/a" });
    await checkOptOutSignals({ url: "https://example.com/b" });
    await checkOptOutSignals({ url: "https://example.com/c" });
    expect(robotsHits).toBe(1);
  });

  it("allows when robots.txt only blocks an unrelated User-agent", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("User-agent: Googlebot\nDisallow: /\n", { status: 200 });
      }
      return new Response("<html><title>Hi</title></html>", { status: 200 });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.ok).toBe(true);
  });
});

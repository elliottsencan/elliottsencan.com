/**
 * Tests for the copyright-posture opt-out helpers used by /link.
 *
 * Two surfaces:
 *  - `isHostExcluded(host, blocklistCsv)`: pure string check; matches exact
 *    hostname or any parent-domain entry.
 *  - `checkOptOutSignals({ url })`: HTTP-side check that inspects
 *    `X-Robots-Tag`, `<meta name="robots">`/`googlebot`, and `robots.txt`
 *    Disallow rules. Returns a discriminated result:
 *      - `kind: "block"` for robots.txt Disallow (hard reject).
 *      - `kind: "stub"` for X-Robots-Tag / meta-robots opt-out tokens
 *        (caller writes a noindex stub entry, no Anthropic call).
 *      - `kind: "allow"` when no signal fires.
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

  it("returns kind=stub when X-Robots-Tag: noai is present (ingest-with-stub)", async () => {
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
    expect(result.kind).toBe("stub");
    if (result.kind === "stub") {
      expect(result.reason).toBe("x-robots-tag");
      expect(result.title).toBe("Hi");
    }
  });

  it("returns kind=stub when X-Robots-Tag contains noindex (case-insensitive, comma-tokenized)", async () => {
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
    expect(result.kind).toBe("stub");
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
    expect(result.kind).toBe("allow");
    if (result.kind === "allow") {
      expect(result.title).toBe("Hi");
    }
  });

  it('returns kind=stub with reason=meta-robots when <meta name="robots" content="noai">', async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response(
        '<html><head><title>X</title><meta name="robots" content="noai, follow"></head><body>x</body></html>',
        { status: 200 },
      );
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.kind).toBe("stub");
    if (result.kind === "stub") {
      expect(result.reason).toBe("meta-robots");
      expect(result.title).toBe("X");
    }
  });

  it('returns kind=stub when <meta name="googlebot" content="noindex"> appears', async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response('<html><head><meta name="googlebot" content="noindex"></head></html>', {
        status: 200,
      });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.kind).toBe("stub");
    if (result.kind === "stub") {
      expect(result.reason).toBe("meta-robots");
    }
  });

  it("returns kind=block when robots.txt has User-agent: * with Disallow: / (hard reject)", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("User-agent: *\nDisallow: /\n", { status: 200 });
      }
      return new Response("<html></html>", { status: 200 });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.kind).toBe("block");
    if (result.kind === "block") {
      expect(result.reason).toMatch(/robots\.txt/i);
    }
  });

  it("returns kind=block when robots.txt path-specific Disallow matches the URL", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("User-agent: *\nDisallow: /private\n", { status: 200 });
      }
      return new Response("<html></html>", { status: 200 });
    });
    const result = await checkOptOutSignals({
      url: "https://example.com/private/page",
    });
    expect(result.kind).toBe("block");
  });

  it("robots.txt Disallow wins over an X-Robots-Tag stub signal on the same URL", async () => {
    // If both signals fire, robots.txt is the higher-confidence (publisher-
    // wide) opt-out, so the caller should hard-reject rather than write a
    // stub. Lock in that precedence.
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("User-agent: *\nDisallow: /\n", { status: 200 });
      }
      return new Response("<html></html>", {
        status: 200,
        headers: { "X-Robots-Tag": "noai" },
      });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.kind).toBe("block");
  });

  it("allows when robots.txt Disallow path does not match the URL", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("User-agent: *\nDisallow: /admin\n", { status: 200 });
      }
      return new Response("<html><title>Hi</title></html>", { status: 200 });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/public/page" });
    expect(result.kind).toBe("allow");
  });

  it("allows when robots.txt is missing (404)", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("not found", { status: 404 });
      }
      return new Response("<html><title>Hi</title></html>", { status: 200 });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.kind).toBe("allow");
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
    expect(result.kind).toBe("allow");
  });

  it("returns title=undefined when allow path can't extract a <title> tag", async () => {
    stubFetch((url) => {
      if (url.endsWith("/robots.txt")) {
        return new Response("", { status: 404 });
      }
      return new Response("<html><body>no title here</body></html>", { status: 200 });
    });
    const result = await checkOptOutSignals({ url: "https://example.com/post" });
    expect(result.kind).toBe("allow");
    if (result.kind === "allow") {
      expect(result.title).toBeUndefined();
    }
  });
});

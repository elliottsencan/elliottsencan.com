/**
 * Copyright-posture opt-out helpers used by the /link strategy.
 *
 * Two surfaces:
 *
 *  - `isHostExcluded(host, blocklistCsv)`: pure CSV check; matches the host
 *    exactly OR any of its parent domains. Used to short-circuit /link
 *    before any network IO when the operator has explicitly blocklisted a
 *    publisher in `wrangler.toml [vars]` (`EXCLUDED_HOSTS`).
 *
 *  - `checkOptOutSignals({ url })`: one fetch of the article URL plus one
 *    fetch of `<host>/robots.txt`, racing both against a 5s timeout. Inspects
 *    the response `X-Robots-Tag` header, the HTML `<meta name="robots">` and
 *    `<meta name="googlebot">` tags, and the robots.txt User-agent: *
 *    block for `Disallow:` rules matching the URL. Returns
 *    `{ ok: false, reason }` if any signal is found, `{ ok: true }` otherwise.
 *
 *  The robots.txt body is cached in a module-level Map for the lifetime of
 *  the Worker isolate (no KV — cache eviction happens naturally when the
 *  isolate recycles).
 */

const ROBOTS_FETCH_TIMEOUT_MS = 5000;
const HTML_FETCH_TIMEOUT_MS = 5000;
const MAX_HTML_BYTES = 200_000;
const MAX_ROBOTS_BYTES = 64_000;

const OPT_OUT_TOKENS = ["noai", "noindex", "noimageai"] as const;

export type OptOutResult = { ok: true } | { ok: false; reason: string };

// ---------- host blocklist ----------

/**
 * Returns true if `host` matches any entry in the comma-separated
 * `blocklistCsv` exactly OR is a subdomain of any entry. Comparison is
 * case-insensitive; empty entries are ignored.
 */
export function isHostExcluded(host: string, blocklistCsv: string | undefined): boolean {
  if (!blocklistCsv) {
    return false;
  }
  const normalizedHost = host.trim().toLowerCase();
  if (!normalizedHost) {
    return false;
  }
  const entries = blocklistCsv
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  for (const entry of entries) {
    if (normalizedHost === entry || normalizedHost.endsWith(`.${entry}`)) {
      return true;
    }
  }
  return false;
}

// ---------- robots.txt cache ----------

// host -> robots.txt body (or empty string if 4xx/5xx/timeout). Lifetime is
// the Worker isolate's lifetime; no manual eviction.
const robotsTxtCache = new Map<string, string>();

/** @internal Test-only reset hook. */
export function __resetRobotsCacheForTests(): void {
  robotsTxtCache.clear();
}

async function fetchRobotsTxt(host: string): Promise<string> {
  const cached = robotsTxtCache.get(host);
  if (cached !== undefined) {
    return cached;
  }
  const url = `https://${host}/robots.txt`;
  const body = await fetchWithTimeout(url, ROBOTS_FETCH_TIMEOUT_MS, MAX_ROBOTS_BYTES).catch(
    () => "",
  );
  robotsTxtCache.set(host, body);
  return body;
}

// ---------- token detection ----------

function tokenize(headerValue: string): string[] {
  // X-Robots-Tag may include a bot prefix like "googlebot: noindex, nofollow".
  // Strip the prefix and split on commas.
  const colonIdx = headerValue.indexOf(":");
  const tail = colonIdx >= 0 ? headerValue.slice(colonIdx + 1) : headerValue;
  return tail
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function containsOptOutToken(value: string): boolean {
  const tokens = tokenize(value);
  return tokens.some((t) => (OPT_OUT_TOKENS as readonly string[]).includes(t));
}

function metaRobotsContent(html: string): string[] {
  // Find every <meta name="robots" ...> or <meta name="googlebot" ...> with a
  // content attribute. Tolerates attribute order and single/double quotes.
  const out: string[] = [];
  const re =
    /<meta[^>]*\bname\s*=\s*["'](robots|googlebot)["'][^>]*\bcontent\s*=\s*["']([^"']*)["'][^>]*>/gi;
  for (const m of html.matchAll(re)) {
    if (m[2]) {
      out.push(m[2]);
    }
  }
  // Some pages put `content=` before `name=`; handle that order too.
  const reAlt =
    /<meta[^>]*\bcontent\s*=\s*["']([^"']*)["'][^>]*\bname\s*=\s*["'](robots|googlebot)["'][^>]*>/gi;
  for (const m of html.matchAll(reAlt)) {
    if (m[1]) {
      out.push(m[1]);
    }
  }
  return out;
}

// ---------- robots.txt parsing ----------

/**
 * Minimal robots.txt parser. Looks for any `User-agent: *` block (or
 * unconstrained block before a different User-agent appears) and checks
 * `Disallow:` paths. Returns true if the URL's pathname is blocked.
 *
 * Not a full RFC parser — we only honor `User-agent: *`, ignore `Allow:`
 * overrides, and treat `Disallow: /` as "everything blocked". That's
 * sufficient for the opt-out posture this serves.
 */
export function isBlockedByRobotsTxt(robotsTxt: string, urlPathname: string): boolean {
  if (!robotsTxt.trim()) {
    return false;
  }
  const lines = robotsTxt.split(/\r?\n/);
  // Track which user-agent block we're inside. `null` = no block yet.
  // `"*"` = wildcard block (the only one we honor).
  let currentAgents: Set<string> | null = null;
  // Once a Disallow line follows a User-agent line, the agent block is
  // "closed" — a new User-agent starts a fresh block.
  let sawDirectiveInBlock = false;
  for (const rawLine of lines) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) {
      continue;
    }
    const colonIdx = line.indexOf(":");
    if (colonIdx < 0) {
      continue;
    }
    const directive = line.slice(0, colonIdx).trim().toLowerCase();
    const value = line.slice(colonIdx + 1).trim();
    if (directive === "user-agent") {
      // A consecutive run of User-agent lines all bind to the next directive
      // block. If we just saw a Disallow/Allow, this User-agent starts a
      // new block.
      if (sawDirectiveInBlock || currentAgents === null) {
        currentAgents = new Set<string>();
        sawDirectiveInBlock = false;
      }
      currentAgents.add(value.toLowerCase());
      continue;
    }
    if (directive === "disallow") {
      sawDirectiveInBlock = true;
      if (!currentAgents) {
        continue;
      }
      if (!currentAgents.has("*")) {
        continue;
      }
      const path = value;
      if (!path) {
        // `Disallow:` with empty value = allow all (per the de-facto spec).
        continue;
      }
      if (path === "/" || urlPathname.startsWith(path)) {
        return true;
      }
    } else if (directive === "allow") {
      sawDirectiveInBlock = true;
    }
  }
  return false;
}

// ---------- main entry point ----------

/**
 * Inspects opt-out signals for `url` before /link summarizes the body.
 * Returns `{ ok: false, reason }` on the first matching signal.
 */
export async function checkOptOutSignals(args: { url: string }): Promise<OptOutResult> {
  const parsed = new URL(args.url);
  const host = parsed.hostname.toLowerCase();

  // Run robots.txt fetch in parallel with the article fetch — both have
  // independent 5s timeouts and we cache robots.txt by host.
  const robotsPromise = fetchRobotsTxt(host);
  const articlePromise = fetchHeadersAndBody(args.url, HTML_FETCH_TIMEOUT_MS, MAX_HTML_BYTES);

  const article = await articlePromise.catch(() => null);
  if (article) {
    const xRobots = article.headers.get("x-robots-tag");
    if (xRobots && containsOptOutToken(xRobots)) {
      return { ok: false, reason: "site_opted_out: x-robots-tag" };
    }
    for (const content of metaRobotsContent(article.body)) {
      if (containsOptOutToken(content)) {
        return { ok: false, reason: "site_opted_out: meta robots" };
      }
    }
  }

  const robotsTxt = await robotsPromise.catch(() => "");
  if (robotsTxt && isBlockedByRobotsTxt(robotsTxt, parsed.pathname)) {
    return { ok: false, reason: "site_opted_out: robots.txt" };
  }

  return { ok: true };
}

// ---------- low-level fetch helpers ----------

type FetchedArticle = { headers: Headers; body: string };

async function fetchHeadersAndBody(
  url: string,
  timeoutMs: number,
  maxBytes: number,
): Promise<FetchedArticle> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "site-ingest-link-bot/0.1" },
    });
    if (!res.ok || !res.body) {
      // Return the headers anyway — some servers send 4xx with X-Robots-Tag.
      return { headers: res.headers, body: "" };
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let html = "";
    while (html.length < maxBytes) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      html += decoder.decode(value, { stream: true });
    }
    reader.cancel().catch(() => {
      // ignore — we already got what we needed.
    });
    return { headers: res.headers, body: html };
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithTimeout(url: string, timeoutMs: number, maxBytes: number): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "site-ingest-link-bot/0.1" },
    });
    if (!res.ok || !res.body) {
      return "";
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let body = "";
    while (body.length < maxBytes) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      body += decoder.decode(value, { stream: true });
    }
    reader.cancel().catch(() => {
      // ignore
    });
    return body;
  } finally {
    clearTimeout(timer);
  }
}

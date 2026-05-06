#!/usr/bin/env node
/**
 * worker — local CLI for the site-ingest Cloudflare Worker.
 *
 * Wraps every admin endpoint of the deployed worker so they can be exercised
 * from a terminal without crafting curl commands. Reads
 * SITE_INGEST_API_TOKEN from the environment (or .env at the repo root) and
 * defaults the base URL to the deployed worker; --local redirects to
 * http://localhost:8787 against `wrangler dev`.
 *
 * Subcommands:
 *   link <URL>            POST /link
 *   synthesize            POST /synthesize  (--topics, --force, --dry-run)
 *   recompile             POST /recompile   (--scope, --dry-run)
 *   lint                  POST /lint        (--json for raw)
 *   trigger               POST /trigger
 *   contribute --file=P   POST /contribute  (--dry-run)
 *   crosslink             POST /crosslink   (--scope, --dry-run)
 *
 * Top-level flags: --local, --json, --verbose, --help.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const DEFAULT_BASE_URL = "https://site-ingest.elliottsencan.workers.dev";
const LOCAL_BASE_URL = "http://localhost:8787";

const PARSE_OPTIONS = {
  options: {
    local: { type: "boolean" },
    json: { type: "boolean" },
    verbose: { type: "boolean" },
    help: { type: "boolean", short: "h" },
    // synthesize / contribute / recompile / crosslink
    "dry-run": { type: "boolean" },
    "no-dry-run": { type: "boolean" },
    // synthesize
    topics: { type: "string" },
    force: { type: "boolean" },
    // recompile / crosslink
    scope: { type: "string" },
    // contribute
    file: { type: "string" },
  },
  allowPositionals: true,
  strict: false,
};

function loadEnvFile() {
  // Match scripts/reading.mjs's "no new deps" posture: parse a minimal
  // KEY=VALUE .env at repo root. Quoted values and inline comments are
  // unwrapped; anything fancier (multi-line, expansion) belongs in dotenv.
  const here = dirname(fileURLToPath(import.meta.url));
  const envPath = resolve(here, "..", ".env");
  let raw;
  try {
    raw = readFileSync(envPath, "utf8");
  } catch {
    return;
  }
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function resolveBaseUrl(flags) {
  if (flags.local) {
    return LOCAL_BASE_URL;
  }
  return process.env.SITE_INGEST_BASE_URL || DEFAULT_BASE_URL;
}

function requireToken() {
  const token = process.env.SITE_INGEST_API_TOKEN;
  if (!token) {
    process.stderr.write("error: SITE_INGEST_API_TOKEN not set. Add to .env or export it.\n");
    process.exit(1);
  }
  return token;
}

async function callEndpoint({ baseUrl, token, path, body, verbose }) {
  const url = `${baseUrl}${path}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  if (verbose) {
    process.stderr.write(`POST ${url}\n`);
    for (const [k, v] of Object.entries(headers)) {
      const display = k === "Authorization" ? "Bearer <redacted>" : v;
      process.stderr.write(`  ${k}: ${display}\n`);
    }
    if (body !== undefined) {
      process.stderr.write(`  body: ${JSON.stringify(body)}\n`);
    }
  }
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: body === undefined ? "{}" : JSON.stringify(body),
  });
  const text = await res.text();
  let parsed = null;
  try {
    parsed = text.length > 0 ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }
  return { status: res.status, ok: res.ok, body: parsed, raw: text };
}

function emit(result, flags, prettyPrint) {
  if (!result.ok) {
    const msg =
      result.body && typeof result.body === "object" && "error" in result.body
        ? result.body.error
        : result.raw;
    process.stderr.write(`error: HTTP ${result.status}: ${msg}\n`);
    process.exit(1);
  }
  if (flags.json) {
    process.stdout.write(`${JSON.stringify(result.body, null, 2)}\n`);
    return;
  }
  prettyPrint(result.body);
}

// ---------- frontmatter parser (contribute --file) ----------

function parseSimpleFrontmatter(source) {
  // Minimal YAML subset: supports scalar strings (quoted or bare), flow
  // arrays `[a, b]`, and block arrays (`-` items). Sufficient for wiki
  // contribution drafts; richer frontmatter belongs in the worker proper.
  if (!source.startsWith("---\n")) {
    return { data: {}, content: source };
  }
  const end = source.indexOf("\n---", 4);
  if (end === -1) {
    return { data: {}, content: source };
  }
  const yaml = source.slice(4, end);
  const rest = source.slice(end + 4).replace(/^\r?\n/, "");
  const data = {};
  const lines = yaml.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trimStart().startsWith("#")) {
      i++;
      continue;
    }
    const m = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!m) {
      i++;
      continue;
    }
    const key = m[1];
    const rawValue = m[2];
    if (rawValue === "" || rawValue === undefined) {
      // Block array: collect subsequent `-` items.
      const items = [];
      let j = i + 1;
      while (j < lines.length && /^\s+-\s+/.test(lines[j])) {
        items.push(unquote(lines[j].replace(/^\s+-\s+/, "").trim()));
        j++;
      }
      data[key] = items;
      i = j;
      continue;
    }
    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      const inner = rawValue.slice(1, -1).trim();
      data[key] = inner === "" ? [] : inner.split(",").map((s) => unquote(s.trim()));
    } else if (rawValue === "true" || rawValue === "false") {
      data[key] = rawValue === "true";
    } else {
      data[key] = unquote(rawValue);
    }
    i++;
  }
  return { data, content: rest };
}

function unquote(s) {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

// ---------- pretty printers ----------

function printLink(body) {
  const lines = [
    `committed: ${body.path}`,
    `category:  ${body.category}`,
    `topics:    ${(body.topics_committed ?? []).join(", ") || "(none)"}`,
  ];
  if (body.cost?.cost_usd !== undefined) {
    lines.push(`cost:      $${Number(body.cost.cost_usd).toFixed(4)}`);
  }
  if (body.opted_out) {
    lines.push(`opted_out: ${body.opted_out}`);
  }
  if (Array.isArray(body.wiki_patched) && body.wiki_patched.length > 0) {
    lines.push(`wiki_patched: ${body.wiki_patched.join(", ")}`);
  }
  if (Array.isArray(body.triggered_synthesis) && body.triggered_synthesis.length > 0) {
    lines.push(`triggered_synthesis: ${body.triggered_synthesis.join(", ")}`);
  }
  if (body.commit) {
    lines.push(`commit:    ${body.commit}`);
  }
  process.stdout.write(`${lines.join("\n")}\n`);
}

function printSynthesize(body) {
  const lines = [
    `dry_run:   ${body.dry_run}`,
    `compiled:  ${body.compiled}`,
    `failed:    ${body.failed}`,
    `skipped:   ${body.skipped}`,
  ];
  if (Array.isArray(body.deferred) && body.deferred.length > 0) {
    const preview = body.deferred.slice(0, 3).join(", ");
    const more = body.deferred.length > 3 ? ", …" : "";
    lines.push(`deferred:  ${body.deferred.length} (${preview}${more})`);
  }
  if (body.dry_run && Array.isArray(body.would_compile) && body.would_compile.length > 0) {
    const preview = body.would_compile.slice(0, 5).join(", ");
    const more =
      body.would_compile.length > 5 ? `, … (+${body.would_compile.length - 5} more)` : "";
    lines.push(`would_compile: ${preview}${more}`);
  }
  if (body.run_cost?.cost_usd !== undefined) {
    lines.push(`cost:      $${Number(body.run_cost.cost_usd).toFixed(4)}`);
  }
  if (body.pr) {
    lines.push(`pr:        ${body.pr.url}`);
  } else if (body.branch) {
    lines.push(`branch:    ${body.branch}`);
  }
  process.stdout.write(`${lines.join("\n")}\n`);
}

function printRecompile(body) {
  const lines = [
    `dry_run:   ${body.dry_run}`,
    `matched:   ${body.matched}`,
    `${body.dry_run ? "processed" : "committed"}: ${body.dry_run ? body.processed : body.committed}`,
  ];
  if (body.run_cost?.cost_usd !== undefined) {
    lines.push(`cost:      $${Number(body.run_cost.cost_usd).toFixed(4)}`);
  }
  if (body.pr) {
    lines.push(`pr:        ${body.pr.url}`);
  } else if (body.branch) {
    lines.push(`branch:    ${body.branch}`);
  }
  process.stdout.write(`${lines.join("\n")}\n`);
}

function printLint(body) {
  const lines = [
    `reading:   ${body.counts.reading_entries}`,
    `wiki:      ${body.counts.wiki_articles}`,
    `issues:    ${body.counts.total_issues}`,
  ];
  for (const [name, info] of Object.entries(body.checks ?? {})) {
    if (info.count > 0) {
      lines.push(`  ${name}: ${info.count}`);
    }
  }
  process.stdout.write(`${lines.join("\n")}\n`);
}

function printTrigger(body) {
  if (body.skipped) {
    process.stdout.write(`skipped: ${body.skipped}\n`);
    if (body.prNumber) {
      process.stdout.write(`pr:      #${body.prNumber}\n`);
    }
    return;
  }
  const lines = [];
  if (body.branch) {
    lines.push(`branch:  ${body.branch}`);
  }
  if (body.prNumber) {
    lines.push(`pr:      #${body.prNumber}`);
  }
  process.stdout.write(`${lines.join("\n") || "ok"}\n`);
}

function printContribute(body) {
  const lines = [`dry_run:   ${body.dry_run ?? false}`, `path:      ${body.path}`];
  if (body.exists !== undefined) {
    lines.push(`exists:    ${body.exists}`);
  }
  if (body.bytes !== undefined) {
    lines.push(`bytes:     ${body.bytes}`);
  }
  if (body.pr) {
    lines.push(`pr:        ${body.pr.url}`);
  } else if (body.branch) {
    lines.push(`branch:    ${body.branch}`);
  }
  process.stdout.write(`${lines.join("\n")}\n`);
}

function printCrosslink(body) {
  const lines = [`forward:   ${body.forward ?? 0}`, `backward:  ${body.backward ?? 0}`];
  if (body.applied !== undefined) {
    lines.push(`applied:   ${body.applied}`);
  }
  if (body.message) {
    lines.push(`message:   ${body.message}`);
  }
  if (body.pr) {
    lines.push(`pr:        ${body.pr.url}`);
  } else if (body.branch) {
    lines.push(`branch:    ${body.branch}`);
  }
  process.stdout.write(`${lines.join("\n")}\n`);
}

// ---------- scope parser (recompile / crosslink) ----------

function parseScope(raw, kind) {
  // Accept human-friendly forms:
  //   all
  //   since:2024-01-01
  //   slugs:foo,bar
  //   model:claude-sonnet-4-6  (recompile only)
  //   slug:wiki/foo            (crosslink only)
  if (!raw || raw === "all") {
    return { kind: "all" };
  }
  if (raw.startsWith("since:")) {
    return { kind: "since", since: raw.slice(6) };
  }
  if (raw.startsWith("slugs:")) {
    const slugs = raw
      .slice(6)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (kind === "recompile") {
      return { kind: "slugs", slugs };
    }
    throw new Error("crosslink scope does not support slugs:; use slug:wiki/foo or slug:blog/bar");
  }
  if (raw.startsWith("model:")) {
    if (kind === "recompile") {
      return { kind: "compiled_before_model", model: raw.slice(6) };
    }
    throw new Error("crosslink scope does not support model:");
  }
  if (raw.startsWith("slug:")) {
    if (kind === "crosslink") {
      const value = raw.slice(5);
      const slash = value.indexOf("/");
      if (slash === -1) {
        throw new Error("slug: must be slug:<corpus>/<slug>, e.g. slug:wiki/foo");
      }
      const corpus = value.slice(0, slash);
      const slug = value.slice(slash + 1);
      if (corpus !== "wiki" && corpus !== "blog") {
        throw new Error("crosslink slug corpus must be wiki or blog");
      }
      return { kind: "slug", corpus, slug };
    }
    throw new Error("recompile scope does not support slug:; use slugs:a,b");
  }
  throw new Error(`unrecognized --scope value: ${raw}`);
}

function resolveDryRun(flags, defaultValue) {
  if (flags["no-dry-run"]) {
    return false;
  }
  if (flags["dry-run"]) {
    return true;
  }
  return defaultValue;
}

// ---------- main ----------

const HELP = `worker — CLI for the site-ingest worker

Usage: pnpm worker <command> [flags]

Commands:
  link <URL>                 POST /link (commits a reading entry)
  synthesize                 POST /synthesize (compile wiki concepts)
  recompile                  POST /recompile (rebuild reading entries)
  lint                       POST /lint (read-only health check)
  trigger                    POST /trigger (run /now draft pipeline)
  contribute --file=PATH     POST /contribute (file a wiki article)
  crosslink                  POST /crosslink (cross-link suggestions)

Flags:
  --local                    target http://localhost:8787 (wrangler dev)
  --json                     emit raw JSON response
  --verbose                  log request URL and headers to stderr
  --dry-run / --no-dry-run   override endpoint default (synth/recomp/contrib/xlink)
  --topics=a,b               (synthesize) restrict to listed topic slugs
  --force                    (synthesize/contribute) overwrite existing
  --scope=...                (recompile/crosslink) all | since:DATE | slugs:a,b |
                             model:STR | slug:wiki/foo | slug:blog/bar
  --file=PATH                (contribute) markdown file with frontmatter

Env:
  SITE_INGEST_API_TOKEN      required; loaded from .env if not exported
  SITE_INGEST_BASE_URL       optional; defaults to deployed worker

Piping note:
  pnpm prints a "> pkg@ver script ..." header to stdout for every script run,
  which trips downstream parsers (jq, etc). Place --silent BEFORE the
  subcommand to suppress it:
    pnpm --silent worker lint --json | jq ...
  Or invoke node directly:
    node scripts/worker.mjs lint --json | jq ...
`;

async function main() {
  loadEnvFile();
  const { values: flags, positionals } = parseArgs({
    args: process.argv.slice(2),
    ...PARSE_OPTIONS,
  });
  const [cmd, ...rest] = positionals;

  if (!cmd || flags.help || cmd === "help" || cmd === "--help" || cmd === "-h") {
    process.stdout.write(HELP);
    return;
  }

  const baseUrl = resolveBaseUrl(flags);
  const verbose = !!flags.verbose;

  switch (cmd) {
    case "link": {
      const url = rest[0];
      if (!url) {
        throw new Error("link requires a URL positional argument");
      }
      const token = requireToken();
      const result = await callEndpoint({
        baseUrl,
        token,
        path: "/link",
        body: { url },
        verbose,
      });
      emit(result, flags, printLink);
      return;
    }
    case "synthesize": {
      const token = requireToken();
      const body = { dry_run: resolveDryRun(flags, true) };
      if (flags.topics) {
        body.topics = flags.topics
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      if (flags.force) {
        body.force = true;
      }
      const result = await callEndpoint({
        baseUrl,
        token,
        path: "/synthesize",
        body,
        verbose,
      });
      emit(result, flags, printSynthesize);
      return;
    }
    case "recompile": {
      const token = requireToken();
      const scope = parseScope(flags.scope ?? "all", "recompile");
      const body = { scope, dry_run: resolveDryRun(flags, true) };
      const result = await callEndpoint({
        baseUrl,
        token,
        path: "/recompile",
        body,
        verbose,
      });
      emit(result, flags, printRecompile);
      return;
    }
    case "lint": {
      const token = requireToken();
      const result = await callEndpoint({
        baseUrl,
        token,
        path: "/lint",
        body: {},
        verbose,
      });
      emit(result, flags, printLint);
      return;
    }
    case "trigger": {
      const token = requireToken();
      const result = await callEndpoint({
        baseUrl,
        token,
        path: "/trigger",
        body: undefined,
        verbose,
      });
      emit(result, flags, printTrigger);
      return;
    }
    case "contribute": {
      const filePath = flags.file;
      if (!filePath) {
        throw new Error("contribute requires --file=PATH");
      }
      const raw = readFileSync(resolve(filePath), "utf8");
      const { data, content } = parseSimpleFrontmatter(raw);
      const body = {
        topic: data.topic,
        summary: data.summary,
        body: content.trim(),
        sources: data.sources ?? [],
        dry_run: resolveDryRun(flags, true),
      };
      if (data.title) {
        body.title = data.title;
      }
      if (data.related_concepts) {
        body.related_concepts = data.related_concepts;
      }
      if (flags.force || data.force === true) {
        body.force = true;
      }
      const token = requireToken();
      const result = await callEndpoint({
        baseUrl,
        token,
        path: "/contribute",
        body,
        verbose,
      });
      emit(result, flags, printContribute);
      return;
    }
    case "crosslink": {
      const token = requireToken();
      const scope = parseScope(flags.scope ?? "all", "crosslink");
      const body = { scope, dry_run: resolveDryRun(flags, false) };
      const result = await callEndpoint({
        baseUrl,
        token,
        path: "/crosslink",
        body,
        verbose,
      });
      emit(result, flags, printCrosslink);
      return;
    }
    default:
      process.stderr.write(`unknown command: ${cmd}\n`);
      process.stderr.write(HELP);
      process.exit(1);
  }
}

main().catch((err) => {
  process.stderr.write(`${err.message}\n`);
  process.exit(1);
});

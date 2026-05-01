#!/usr/bin/env node
/**
 * One-shot backfill: rewrite reading-entry `added` and `compiled_at` from
 * UTC ISO (`...Z`) to Pacific-offset ISO (`...-07:00`/`-08:00`).
 *
 * The same instant — just a representation change. After the migration the
 * canonical form is offset-ISO across every entry, so the visible YYYY-MM-DD
 * always agrees with the Pacific filename slug regardless of build-host TZ.
 * Entries already in offset form are skipped.
 *
 * Usage:
 *   node scripts/backfill-reading-dates.mjs           # dry-run (default)
 *   node scripts/backfill-reading-dates.mjs --write   # apply
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

const READING_DIR = "src/content/reading";
const SITE_TIMEZONE = "America/Los_Angeles";

function siteDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function isoWithSiteOffset(date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: SITE_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      hour12: false,
      timeZoneName: "longOffset",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  const offset = parts.timeZoneName.replace(/^GMT/, "") || "+00:00";
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}.${parts.fractionalSecond}${offset}`;
}

async function* walkMarkdown(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkMarkdown(full);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      yield full;
    }
  }
}

// Matches `added: 'value'` or `added: "value"` or `added: value` on its own
// line within the YAML frontmatter. Captures the value verbatim.
const FIELD_RE = (key) => new RegExp(`^(${key}:\\s*)(?:'([^']*)'|"([^"]*)"|(\\S+))\\s*$`, "m");

function readField(source, key) {
  const m = FIELD_RE(key).exec(source);
  if (!m) {
    return null;
  }
  return { match: m[0], prefix: m[1], value: m[2] ?? m[3] ?? m[4] };
}

function rewriteField(source, key, newValue) {
  const re = FIELD_RE(key);
  const next = source.replace(re, `$1'${newValue}'`);
  if (next === source) {
    throw new Error(`rewriteField: ${key} regex matched on read but produced no change on write`);
  }
  return next;
}

async function main() {
  const { values } = parseArgs({
    options: { write: { type: "boolean", default: false } },
    allowPositionals: false,
  });

  const touched = [];
  const skippedAlreadyAligned = [];
  const skippedNoAdded = [];

  for await (const file of walkMarkdown(READING_DIR)) {
    const source = await readFile(file, "utf8");
    const added = readField(source, "added");
    if (!added) {
      skippedNoAdded.push(file);
      continue;
    }
    const addedDate = new Date(added.value);
    if (Number.isNaN(addedDate.valueOf())) {
      throw new Error(`${file}: unparseable added=${added.value}`);
    }

    const slugPrefix = path.basename(file).slice(0, 10); // YYYY-MM-DD
    const pacificDate = siteDate(addedDate);

    // Sanity check: the slug was always written from the Pacific date of the
    // same instant the worker stamped, so these must agree on every entry.
    // If they ever don't, something is corrupt and we want a hard error.
    if (slugPrefix !== pacificDate) {
      throw new Error(
        `${file}: slug-prefix ${slugPrefix} disagrees with Pacific date of added (${pacificDate}); refusing to rewrite blindly`,
      );
    }

    if (!added.value.endsWith("Z")) {
      // Already in Pacific-offset form (or some other non-UTC form); leave
      // alone. The script's job is converting UTC `Z` → offset only.
      skippedAlreadyAligned.push(file);
      continue;
    }

    let next = source;
    const newAdded = isoWithSiteOffset(addedDate);
    next = rewriteField(next, "added", newAdded);

    let newCompiled = null;
    const compiled = readField(source, "compiled_at");
    if (compiled) {
      const compiledDate = new Date(compiled.value);
      if (Number.isNaN(compiledDate.valueOf())) {
        throw new Error(`${file}: unparseable compiled_at=${compiled.value}`);
      }
      newCompiled = isoWithSiteOffset(compiledDate);
      next = rewriteField(next, "compiled_at", newCompiled);
    }

    touched.push({
      file,
      slugPrefix,
      added: { from: added.value, to: newAdded },
      compiled_at: compiled ? { from: compiled.value, to: newCompiled } : null,
    });

    if (values.write) {
      await writeFile(file, next, "utf8");
    }
  }

  console.log(`Reading entries scanned: ${touched.length + skippedAlreadyAligned.length}`);
  console.log(`  already aligned: ${skippedAlreadyAligned.length}`);
  console.log(`  visible mismatch: ${touched.length}`);
  if (skippedNoAdded.length > 0) {
    console.log(`  skipped (no added field): ${skippedNoAdded.length}`);
  }
  console.log("");
  for (const t of touched) {
    console.log(`${values.write ? "✓" : "·"} ${t.file}`);
    console.log(`  slug:        ${t.slugPrefix}`);
    console.log(`  added:       ${t.added.from}  →  ${t.added.to}`);
    if (t.compiled_at) {
      console.log(`  compiled_at: ${t.compiled_at.from}  →  ${t.compiled_at.to}`);
    }
  }
  if (!values.write) {
    console.log("");
    console.log("Dry run. Re-run with --write to apply.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

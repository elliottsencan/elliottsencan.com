/**
 * Core /now update pipeline.
 *
 * Called by the weekly cron (`scheduled` in index.ts) and by ad-hoc POST
 * /trigger. Idempotent by design: re-running the same day short-circuits
 * on branch, PR, or byte-identical-draft guards.
 *
 * Failure contract: each external step either returns ok data or bails
 * without side-effects further down. KV inputs are only cleared after a
 * successful PR is opened.
 */

import { draftNow } from "./anthropic.ts";
import {
  createBranch,
  findOpenPrByBranch,
  getBranchSha,
  getFile,
  listDir,
  openPullRequest,
  putFile,
} from "./github.ts";
import { clearInputs, getInputs } from "./kv.ts";
import { fetchActiveProjects } from "./linear.ts";
import { nowSystemPrompt } from "./prompts.ts";
import type { Env, NowInput, ProjectSummary, ReadingContext } from "./types.ts";
import { dateKey, log } from "./util.ts";

export async function handle(env: Env, source: "scheduled" | "trigger"): Promise<Response> {
  const startedAt = new Date();
  log.info("now", "start", "update run starting", {
    source,
    date: dateKey(startedAt),
  });

  const deps = { token: env.GITHUB_TOKEN, repo: env.GITHUB_REPO };
  const today = dateKey(startedAt);
  const branch = `${env.GITHUB_BRANCH_PREFIX}/${today}`;

  // Early idempotency: if a PR already exists for this cycle's branch, bail.
  const existingPr = await findOpenPrByBranch(branch, deps);
  if (existingPr.ok && existingPr.data) {
    log.info("now", "idempotent", "PR already open — skipping", {
      number: existingPr.data.number,
    });
    return respond({ ok: true, skipped: "pr-exists", prNumber: existingPr.data.number });
  }

  // 1. Fetch the current /now page + voice reference + optional notes.
  const currentNow = await getFile(env.NOW_CONTENT_PATH, "main", deps);
  if (!currentNow.ok) {
    log.error("now", "fetch-current", "missing current.md — seed file first", {
      error: currentNow.error,
    });
    return respond({ ok: false, error: "current.md missing" }, 500);
  }

  const voiceRef = await getFile(env.VOICE_REFERENCE_PATH, "main", deps);
  const voiceReference = voiceRef.ok ? voiceRef.data.content : null;

  const notesResult = await getFile(env.NOW_NOTES_PATH, "main", deps);
  const notes = notesResult.ok ? notesResult.data.content : null;

  // 2. Linear projects.
  const projectsResult = await fetchActiveProjects(env.LINEAR_API_KEY);
  const projects: ProjectSummary[] = projectsResult.ok ? projectsResult.data : [];
  if (!projectsResult.ok) {
    log.warn("now", "linear", "continuing without projects", {
      error: projectsResult.error,
    });
  }

  // 3. KV inputs.
  const inputs = await getInputs(env.NOW_INPUTS);

  // 4. Recent reading entries from the repo.
  const recentReading = await fetchRecentReading(env, startedAt, deps);

  // Skip-guard: nothing to draft against.
  if (projects.length === 0 && inputs.length === 0 && recentReading.length === 0) {
    log.warn("now", "skip", "no data to draft — skipping run");
    return respond({ ok: true, skipped: "no-data" });
  }

  // 5. Draft.
  const userMessage = buildUserMessage({
    currentNowContent: currentNow.data.content,
    projects,
    inputs,
    recentReading,
    notes,
    today,
  });
  const systemPrompt = nowSystemPrompt(voiceReference);
  const draft = await draftNow({
    apiKey: env.ANTHROPIC_API_KEY,
    systemPrompt,
    userMessage,
  });
  if (!draft.ok) {
    log.error("now", "draft", "Anthropic failed — no PR opened", {
      error: draft.error,
    });
    return respond({ ok: false, error: `anthropic: ${draft.error}` }, 502);
  }

  const drafted = draft.data.trim();
  if (drafted === currentNow.data.content.trim()) {
    log.info("now", "no-change", "drafted content identical to current — skipping PR");
    return respond({ ok: true, skipped: "no-change" });
  }

  // 6. Create branch (idempotent — existing = fine, we'll update on it).
  const mainSha = await getBranchSha("main", deps);
  if (!mainSha.ok) {
    return respond({ ok: false, error: `get main sha: ${mainSha.error}` }, 502);
  }
  const branchResult = await createBranch(branch, mainSha.data, deps);
  if (!branchResult.ok) {
    return respond({ ok: false, error: `create branch: ${branchResult.error}` }, 502);
  }

  // 7. Archive step (best-effort). Skip silently if we can't or don't need to.
  await maybeWriteArchive({
    env,
    branch,
    today,
    currentContent: currentNow.data.content,
    deps,
  });

  // 8. Update current.md on the branch.
  // If the branch already existed from a prior partial run, the file may
  // have been updated there too — fetch the branch-specific SHA.
  const branchFile = await getFile(env.NOW_CONTENT_PATH, branch, deps);
  const fileSha = branchFile.ok ? branchFile.data.sha : currentNow.data.sha;
  const putResult = await putFile({
    path: env.NOW_CONTENT_PATH,
    branch,
    content: drafted,
    message: `now: update for ${today}`,
    sha: fileSha,
    deps,
  });
  if (!putResult.ok) {
    return respond({ ok: false, error: `put current: ${putResult.error}` }, 502);
  }

  // 9. Open PR.
  const prBody = buildPrBody({
    projects,
    inputs,
    recentReadingCount: recentReading.length,
    today,
  });
  const prTitle = `chore: update /now — ${new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(startedAt)}`;
  const pr = await openPullRequest({
    title: prTitle,
    body: prBody,
    head: branch,
    base: "main",
    deps,
  });
  if (!pr.ok) {
    return respond({ ok: false, error: `open PR: ${pr.error}` }, 502);
  }

  // 10. Clear KV inputs (only after successful PR).
  await clearInputs(env.NOW_INPUTS);

  log.info("now", "complete", "PR opened", { number: pr.data.number });
  return respond({ ok: true, prNumber: pr.data.number, branch });
}

// ---------- helpers ----------

async function fetchRecentReading(
  env: Env,
  now: Date,
  deps: { token: string; repo: string },
): Promise<ReadingContext[]> {
  const limit = Number.parseInt(env.READING_CONTEXT_LIMIT, 10) || 15;
  const months = currentAndPreviousMonth(now);
  const entries: ReadingContext[] = [];
  for (const month of months) {
    const dir = `${env.READING_DIR}/${month}`;
    const list = await listDir(dir, "main", deps);
    if (!list.ok) continue;
    for (const item of list.data) {
      if (item.type !== "file" || !item.name.endsWith(".md")) continue;
      const file = await getFile(item.path, "main", deps);
      if (!file.ok) continue;
      const parsed = parseReadingFrontmatter(file.data.content);
      if (parsed) entries.push(parsed);
    }
  }
  entries.sort((a, b) => b.added.localeCompare(a.added));
  return entries.slice(0, limit);
}

function currentAndPreviousMonth(date: Date): string[] {
  const current = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
  const prev = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, 1));
  const previous = `${prev.getUTCFullYear()}-${String(prev.getUTCMonth() + 1).padStart(2, "0")}`;
  return [current, previous];
}

function parseReadingFrontmatter(markdown: string): ReadingContext | null {
  const match = /^---\n([\s\S]*?)\n---/.exec(markdown);
  if (!match || !match[1]) return null;
  const block = match[1];
  const get = (key: string): string | null => {
    const re = new RegExp(`^${key}:\\s*(.+?)$`, "m");
    const m = re.exec(block);
    if (!m || !m[1]) return null;
    return m[1].trim().replace(/^"|"$/g, "");
  };
  const title = get("title");
  const url = get("url");
  const summary = get("summary");
  const category = get("category");
  const added = get("added");
  if (!title || !url || !summary || !category || !added) return null;
  return { title, url, summary, category, added };
}

async function maybeWriteArchive(args: {
  env: Env;
  branch: string;
  today: string;
  currentContent: string;
  deps: { token: string; repo: string };
}): Promise<void> {
  const archivePath = `${args.env.NOW_ARCHIVE_DIR}/${args.today}.md`;
  // Skip if the archive file already exists on this branch (prior partial run).
  const existing = await getFile(archivePath, args.branch, args.deps);
  if (existing.ok) {
    log.info("now", "archive", "archive entry already exists — skipping", {
      path: archivePath,
    });
    return;
  }
  const archiveContent = convertToArchiveFrontmatter(args.currentContent, args.today);
  if (!archiveContent) {
    log.warn("now", "archive", "could not rewrite frontmatter — skipping archive");
    return;
  }
  const put = await putFile({
    path: archivePath,
    branch: args.branch,
    content: archiveContent,
    message: `now: archive snapshot ${args.today}`,
    deps: args.deps,
  });
  if (!put.ok) {
    log.warn("now", "archive", "failed to write archive (non-fatal)", {
      error: put.error,
    });
  }
}

/**
 * Rewrite `src/content/now/current.md` frontmatter into the shape the
 * `nowArchive` collection expects: `title`, `description`, `archivedDate`.
 * Preserves the body verbatim. Returns null if the frontmatter block isn't
 * recognizable (malformed current.md).
 */
function convertToArchiveFrontmatter(source: string, today: string): string | null {
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(source);
  if (!match || !match[1] || match[2] === undefined) return null;

  const block = match[1];
  const body = match[2];
  const titleMatch = /^title:\s*(.+)$/m.exec(block);
  const descMatch = /^description:\s*(.+)$/m.exec(block);
  const title = titleMatch?.[1]?.trim() ?? '"Now"';
  const description = descMatch?.[1]?.trim() ?? '"What I was working on."';

  const archiveTitle = title.replace(/^"Now"$/, `"Now — ${formatDateLong(today)}"`);
  return `---
title: ${archiveTitle}
description: ${description}
archivedDate: ${today}
---
${body}`;
}

function formatDateLong(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return `${d.toLocaleString("en-US", { month: "long", day: "numeric", timeZone: "UTC" })}, ${d.getUTCFullYear()}`;
}

function buildUserMessage(args: {
  currentNowContent: string;
  projects: ProjectSummary[];
  inputs: NowInput[];
  recentReading: ReadingContext[];
  notes: string | null;
  today: string;
}): string {
  return [
    "Here is the current data for my /now page update.",
    "",
    "## Active projects from Linear",
    JSON.stringify(args.projects, null, 2),
    "",
    "## Current /now page content",
    args.currentNowContent,
    "",
    "## Notes (if any)",
    args.notes?.trim() ? args.notes : "No notes file found.",
    "",
    "## Phone inputs",
    args.inputs.length > 0 ? JSON.stringify(args.inputs, null, 2) : "No new inputs.",
    "",
    "## Recent reading entries (last 14 days, public)",
    args.recentReading.length > 0
      ? JSON.stringify(args.recentReading, null, 2)
      : "No recent entries.",
    "",
    `Today's date: ${args.today}`,
    "",
    "Draft an updated /now page. Only change sections where the data has meaningfully changed.",
  ].join("\n");
}

function buildPrBody(args: {
  projects: ProjectSummary[];
  inputs: NowInput[];
  recentReadingCount: number;
  today: string;
}): string {
  const staleProjects = args.projects.filter((p) => p.stale);
  const inputBreakdown = args.inputs.reduce<Record<string, number>>((acc, input) => {
    acc[input.type] = (acc[input.type] ?? 0) + 1;
    return acc;
  }, {});
  const breakdown =
    Object.entries(inputBreakdown)
      .map(([type, n]) => `${type}: ${n}`)
      .join(", ") || "none";

  const lines = [
    `Automated /now update for ${args.today}.`,
    "",
    `**Inputs consumed:** ${breakdown}`,
    `**Recent reading entries passed as context:** ${args.recentReadingCount}`,
    `**Linear projects (active):** ${args.projects.length - staleProjects.length} active, ${staleProjects.length} stale`,
  ];
  if (staleProjects.length > 0) {
    lines.push(
      "",
      "Stale projects excluded from the draft (add any that are actually still active during review):",
    );
    for (const p of staleProjects) {
      lines.push(`- ${p.name} — last activity ${p.lastActivityDate ?? "never"}`);
    }
  }
  lines.push("", "> Auto-generated by site-ingest. Review and merge when ready.");
  return lines.join("\n");
}

function respond(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

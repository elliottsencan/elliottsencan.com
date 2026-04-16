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
import { validateNowDraft } from "./frontmatter.ts";
import {
  createBranch,
  createGitHubClient,
  findOpenPrByBranch,
  type GitHubClient,
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

  const gh = createGitHubClient(env.GITHUB_TOKEN, env.GITHUB_REPO);
  const today = dateKey(startedAt);
  const branch = `${env.GITHUB_BRANCH_PREFIX}/${today}`;

  // Early idempotency: if a PR already exists for this cycle's branch, bail.
  const existingPr = await findOpenPrByBranch(branch, gh);
  if (existingPr.ok && existingPr.data) {
    log.info("now", "idempotent", "PR already open — skipping", {
      number: existingPr.data.number,
    });
    return respond({ ok: true, skipped: "pr-exists", prNumber: existingPr.data.number });
  }

  const currentNow = await getFile(env.NOW_CONTENT_PATH, "main", gh);
  if (!currentNow.ok) {
    log.error("now", "fetch-current", "missing current.md — seed file first", {
      error: currentNow.error,
    });
    return respond({ ok: false, error: "current.md missing" }, 500);
  }

  const voiceRef = await getFile(env.VOICE_REFERENCE_PATH, "main", gh);
  if (!voiceRef.ok) {
    log.warn("now", "fetch-voice", "voice reference unavailable — using base prompt only", {
      path: env.VOICE_REFERENCE_PATH,
      error: voiceRef.error,
    });
  }
  const voiceReference = voiceRef.ok ? voiceRef.data.content : null;

  const notesResult = await getFile(env.NOW_NOTES_PATH, "main", gh);
  if (!notesResult.ok) {
    log.warn("now", "fetch-notes", "notes file unavailable — continuing without", {
      path: env.NOW_NOTES_PATH,
      error: notesResult.error,
    });
  }
  const notes = notesResult.ok ? notesResult.data.content : null;

  const projectsResult = await fetchActiveProjects(env.LINEAR_API_KEY);
  const projects: ProjectSummary[] = projectsResult.ok ? projectsResult.data : [];
  if (!projectsResult.ok) {
    log.warn("now", "linear", "continuing without projects", {
      error: projectsResult.error,
    });
  }

  const inputs = await getInputs(env.NOW_INPUTS);

  const recentReading = await fetchRecentReading(env, startedAt, gh);

  // Skip-guard: nothing to draft against.
  if (projects.length === 0 && inputs.length === 0 && recentReading.length === 0) {
    log.warn("now", "skip", "no data to draft — skipping run");
    return respond({ ok: true, skipped: "no-data" });
  }

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
    model: env.ANTHROPIC_MODEL,
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
  // Byte-identical short-circuit: the model occasionally regenerates an
  // identical page. Skipping here keeps the git log clean (no churn PRs).
  if (drafted === currentNow.data.content.trim()) {
    log.info("now", "no-change", "drafted content identical to current — skipping PR");
    return respond({ ok: true, skipped: "no-change" });
  }

  // Gate: validate the draft against the shared `now` collection schema
  // before touching the repo. An LLM that drops `standfirst` or overruns
  // its 180-char cap would otherwise fail `astro build` in CI — here it
  // fails the worker run instead, and main stays buildable.
  const valid = validateNowDraft(drafted);
  if (!valid.ok) {
    log.error("now", "validate", "drafted content invalid — no PR opened", {
      error: valid.error,
    });
    return respond({ ok: false, error: `draft invalid: ${valid.error}` }, 502);
  }

  // Create branch — idempotent on "already exists" so same-day reruns update
  // the existing branch instead of failing.
  const mainSha = await getBranchSha("main", gh);
  if (!mainSha.ok) {
    return respond({ ok: false, error: `get main sha: ${mainSha.error}` }, 502);
  }
  const branchResult = await createBranch(branch, mainSha.data, gh);
  if (!branchResult.ok) {
    return respond({ ok: false, error: `create branch: ${branchResult.error}` }, 502);
  }

  // Best-effort archive of the previous /now snapshot. Failure is logged
  // but doesn't block the PR — archive entries are nice-to-have history.
  await maybeWriteArchive({
    env,
    branch,
    today,
    currentContent: currentNow.data.content,
    gh,
  });

  // If the branch already existed from a prior partial run, the file may
  // have been updated there too — fetch the branch-specific SHA.
  const branchFile = await getFile(env.NOW_CONTENT_PATH, branch, gh);
  const fileSha = branchFile.ok ? branchFile.data.sha : currentNow.data.sha;
  const putResult = await putFile({
    path: env.NOW_CONTENT_PATH,
    branch,
    content: drafted,
    message: `now: update for ${today}`,
    sha: fileSha,
    gh,
  });
  if (!putResult.ok) {
    return respond({ ok: false, error: `put current: ${putResult.error}` }, 502);
  }

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
    gh,
  });
  if (!pr.ok) {
    return respond({ ok: false, error: `open PR: ${pr.error}` }, 502);
  }

  // Clear KV inputs only after a successful PR — preserving them if the
  // pipeline fails earlier lets the next run consume the same batch.
  // Wrapped so a delete failure logs loudly instead of rejecting silently;
  // the PR has already been opened at this point.
  try {
    await clearInputs(env.NOW_INPUTS);
  } catch (err) {
    log.error(
      "now",
      "clear-inputs",
      "KV clear threw after PR opened — inputs may double-consume next run",
      {
        msg: err instanceof Error ? err.message : String(err),
        pr: pr.data.number,
      },
    );
  }

  log.info("now", "complete", "PR opened", { number: pr.data.number });
  return respond({ ok: true, prNumber: pr.data.number, branch });
}

// ---------- helpers ----------

async function fetchRecentReading(
  env: Env,
  now: Date,
  gh: GitHubClient,
): Promise<ReadingContext[]> {
  const limit = Number.parseInt(env.READING_CONTEXT_LIMIT, 10) || 25;
  const months = currentAndPreviousMonth(now);
  const entries: ReadingContext[] = [];
  for (const month of months) {
    const dir = `${env.READING_DIR}/${month}`;
    const list = await listDir(dir, "main", gh);
    if (!list.ok) continue;
    for (const item of list.data) {
      if (item.type !== "file" || !item.name.endsWith(".md")) continue;
      const file = await getFile(item.path, "main", gh);
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
  gh: GitHubClient;
}): Promise<void> {
  const archivePath = `${args.env.NOW_ARCHIVE_DIR}/${args.today}.md`;
  // Skip if the archive file already exists on this branch (prior partial run).
  const existing = await getFile(archivePath, args.branch, args.gh);
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
    gh: args.gh,
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
 *
 * The archive title is always constructed from scratch — the draft's
 * `title` field is prompt-locked to the literal `"Now"` (see prompts.ts),
 * so reusing it would produce archive entries indistinguishable on the
 * archive index. Dates live in the title, not the frontmatter `updated`.
 */
function convertToArchiveFrontmatter(source: string, today: string): string | null {
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(source);
  if (!match || !match[1] || match[2] === undefined) return null;

  const block = match[1];
  const body = match[2];
  const descMatch = /^description:\s*(.+)$/m.exec(block);
  const description = descMatch?.[1]?.trim() ?? '"What I was working on."';

  const archiveTitle = `"Now — ${formatDateLong(today)}"`;
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

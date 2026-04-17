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

import { formatInTimeZone } from "date-fns-tz";
import { draftNow } from "./anthropic.ts";
import { maybeWriteArchive } from "./archive.ts";
import { validateNowDraft } from "./frontmatter.ts";
import {
  createBranch,
  createGitHubClient,
  findOpenPrByBranch,
  getBranchSha,
  getFile,
  openPullRequest,
  putFile,
} from "./github.ts";
import { clearInputs, getInputs } from "./kv.ts";
import { fetchActiveProjects } from "./linear.ts";
import { nowSystemPrompt } from "./prompts.ts";
import { fetchRecentReading } from "./reading-context.ts";
import type { Env, NowInput, ProjectSummary, ReadingContext } from "./types.ts";
import { dateKey, jsonResponse, log, SITE_TIMEZONE } from "./util.ts";

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
    return jsonResponse({ ok: true, skipped: "pr-exists", prNumber: existingPr.data.number });
  }

  const currentNow = await getFile(env.NOW_CONTENT_PATH, "main", gh);
  if (!currentNow.ok) {
    log.error("now", "fetch-current", "missing current.md — seed file first", {
      error: currentNow.error,
    });
    return jsonResponse({ ok: false, error: "current.md missing" }, 500);
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
    return jsonResponse({ ok: true, skipped: "no-data" });
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
    return jsonResponse({ ok: false, error: `anthropic: ${draft.error}` }, 502);
  }

  const drafted = draft.data.trim();
  // Byte-identical short-circuit: the model occasionally regenerates an
  // identical page. Skipping here keeps the git log clean (no churn PRs).
  if (drafted === currentNow.data.content.trim()) {
    log.info("now", "no-change", "drafted content identical to current — skipping PR");
    return jsonResponse({ ok: true, skipped: "no-change" });
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
    return jsonResponse({ ok: false, error: `draft invalid: ${valid.error}` }, 502);
  }

  // Create branch — idempotent on "already exists" so same-day reruns update
  // the existing branch instead of failing.
  const mainSha = await getBranchSha("main", gh);
  if (!mainSha.ok) {
    return jsonResponse({ ok: false, error: `get main sha: ${mainSha.error}` }, 502);
  }
  const branchResult = await createBranch(branch, mainSha.data, gh);
  if (!branchResult.ok) {
    return jsonResponse({ ok: false, error: `create branch: ${branchResult.error}` }, 502);
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
    return jsonResponse({ ok: false, error: `put current: ${putResult.error}` }, 502);
  }

  const prBody = buildPrBody({
    projects,
    inputs,
    recentReadingCount: recentReading.length,
    today,
  });
  const prTitle = `chore: update /now — ${formatInTimeZone(startedAt, SITE_TIMEZONE, "MMMM yyyy")}`;
  const pr = await openPullRequest({
    title: prTitle,
    body: prBody,
    head: branch,
    base: "main",
    gh,
  });
  if (!pr.ok) {
    return jsonResponse({ ok: false, error: `open PR: ${pr.error}` }, 502);
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
  return jsonResponse({ ok: true, prNumber: pr.data.number, branch });
}

// ---------- prompt + PR body builders ----------

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

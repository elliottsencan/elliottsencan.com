/**
 * Linear GraphQL client via @linear/sdk.
 *
 * The SDK's generated types come from Linear's schema, so field drift on
 * Linear's side surfaces as a TypeScript error on SDK upgrade — not a
 * silent runtime failure. Trade-off: one initial `projects` query plus a
 * pair of lazy fetches per project (issues + milestones). For ~5-10 active
 * projects this is an acceptable N+1 on a weekly cron.
 */

import { LinearClient, type Project } from "@linear/sdk";
import type { ProjectSummary, Result } from "./types.ts";
import { log } from "./util.ts";

const STALE_AFTER_DAYS = 14;

export async function fetchActiveProjects(apiKey: string): Promise<Result<ProjectSummary[]>> {
  try {
    const client = new LinearClient({ apiKey });
    // Linear deprecated the plain `state` string filter in favour of the
    // `status` object. `status.type` is one of the built-in categories the
    // SDK recognises: backlog | planned | started | completed | canceled | paused.
    const { nodes: projects } = await client.projects({
      filter: { status: { type: { in: ["started", "planned"] } } },
      first: 50,
    });
    const summaries = await Promise.all(projects.map((p) => toSummary(p)));
    log.info("linear", "fetch", "projects summarized", {
      count: summaries.length,
      stale: summaries.filter((s) => s.stale).length,
    });
    return { ok: true, data: summaries };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log.error("linear", "fetch", "threw", { msg });
    return { ok: false, error: msg };
  }
}

/**
 * Summarize a single project. Uses `Promise.allSettled` so a single failed
 * sub-query (issues, milestones, or status) degrades that field to a
 * sensible default rather than rejecting the whole project. One bad project
 * shouldn't wipe the entire draft's context.
 */
async function toSummary(project: Project): Promise<ProjectSummary> {
  const [issuesRes, milestonesRes, statusRes] = await Promise.allSettled([
    project.issues({ first: 50 }),
    project.projectMilestones({ first: 10 }),
    project.status,
  ]);

  if (issuesRes.status === "rejected") {
    log.warn("linear", "summarize", "issues query failed", {
      id: project.id,
      msg: errMsg(issuesRes.reason),
    });
  }
  if (milestonesRes.status === "rejected") {
    log.warn("linear", "summarize", "milestones query failed", {
      id: project.id,
      msg: errMsg(milestonesRes.reason),
    });
  }
  if (statusRes.status === "rejected") {
    log.warn("linear", "summarize", "status query failed", {
      id: project.id,
      msg: errMsg(statusRes.reason),
    });
  }

  const issueNodes = issuesRes.status === "fulfilled" ? issuesRes.value.nodes : [];
  const milestoneNodes = milestonesRes.status === "fulfilled" ? milestonesRes.value.nodes : [];
  const status = statusRes.status === "fulfilled" ? statusRes.value : null;

  if (statusRes.status === "fulfilled" && !status) {
    log.warn("linear", "summarize", "status resolved null — using 'unknown'", {
      id: project.id,
    });
  }

  const now = Date.now();
  let lastActivityMs: number | null = null;
  let completed = 0;
  for (const issue of issueNodes) {
    const updated = issue.updatedAt.getTime();
    if (lastActivityMs === null || updated > lastActivityMs) {
      lastActivityMs = updated;
    }
    if (issue.completedAt) {
      completed += 1;
    }
  }
  const stale =
    lastActivityMs === null || now - lastActivityMs > STALE_AFTER_DAYS * 24 * 60 * 60 * 1000;

  const milestoneNode = milestoneNodes[0];
  const milestone = milestoneNode
    ? {
        name: milestoneNode.name,
        targetDate: milestoneNode.targetDate
          ? new Date(milestoneNode.targetDate).toISOString()
          : null,
      }
    : null;

  return {
    id: project.id,
    name: project.name,
    description: project.description,
    stateName: status?.name ?? "unknown",
    milestone,
    progress: { completed, total: issueNodes.length },
    lastActivityDate: lastActivityMs ? new Date(lastActivityMs).toISOString() : null,
    stale,
  };
}

function errMsg(reason: unknown): string {
  return reason instanceof Error ? reason.message : String(reason);
}

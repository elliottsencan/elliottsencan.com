/**
 * Linear GraphQL client — active-projects query + staleness computation.
 *
 * Scope: relies on the API token being scoped to the intended workspace. No
 * team filter: the plan explicitly says "do not hardcode project names or
 * filter by specific Linear project IDs". Use a read-only token.
 */

import type { ProjectSummary, Result } from "./types.ts";
import { log } from "./util.ts";

const ENDPOINT = "https://api.linear.app/graphql";
const STALE_AFTER_DAYS = 14;

const ACTIVE_PROJECTS_QUERY = `
  query ActiveProjects {
    projects(filter: { state: { type: { in: ["started", "planned"] } } }) {
      nodes {
        id
        name
        description
        state { name type }
        projectMilestones(first: 10) {
          nodes { id name description targetDate }
        }
        issues(first: 50, orderBy: updatedAt) {
          nodes { id completedAt updatedAt }
        }
      }
    }
  }
`;

interface LinearProjectNode {
  id: string;
  name: string;
  description: string | null;
  state: { name: string; type: string };
  projectMilestones: {
    nodes: Array<{
      id: string;
      name: string;
      description: string | null;
      targetDate: string | null;
    }>;
  };
  issues: {
    nodes: Array<{
      id: string;
      completedAt: string | null;
      updatedAt: string;
    }>;
  };
}

interface ActiveProjectsResponse {
  projects: { nodes: LinearProjectNode[] };
}

interface GraphQLEnvelope<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function fetchActiveProjects(apiKey: string): Promise<Result<ProjectSummary[]>> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: ACTIVE_PROJECTS_QUERY }),
    });
    if (!res.ok) {
      log.warn("linear", "fetch", "non-ok response", { status: res.status });
      return { ok: false, error: `HTTP ${res.status}` };
    }
    const payload = (await res.json()) as GraphQLEnvelope<ActiveProjectsResponse>;
    if (payload.errors && payload.errors.length > 0) {
      log.warn("linear", "graphql", "errors in response", {
        count: payload.errors.length,
      });
      return { ok: false, error: payload.errors.map((e) => e.message).join("; ") };
    }
    if (!payload.data) {
      return { ok: false, error: "missing data" };
    }
    const now = Date.now();
    const summaries: ProjectSummary[] = payload.data.projects.nodes.map((p) => toSummary(p, now));
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

function toSummary(project: LinearProjectNode, now: number): ProjectSummary {
  const issues = project.issues.nodes;
  let lastActivityMs: number | null = null;
  let completed = 0;
  for (const issue of issues) {
    const updated = Date.parse(issue.updatedAt);
    if (!Number.isNaN(updated)) {
      if (lastActivityMs === null || updated > lastActivityMs) lastActivityMs = updated;
    }
    if (issue.completedAt) completed += 1;
  }

  const stale =
    lastActivityMs === null || now - lastActivityMs > STALE_AFTER_DAYS * 24 * 60 * 60 * 1000;

  const milestoneNode = project.projectMilestones.nodes[0];
  const milestone = milestoneNode
    ? {
        name: milestoneNode.name,
        targetDate: milestoneNode.targetDate,
      }
    : null;

  return {
    id: project.id,
    name: project.name,
    description: project.description,
    stateName: project.state.name,
    milestone,
    progress: { completed, total: issues.length },
    lastActivityDate: lastActivityMs ? new Date(lastActivityMs).toISOString() : null,
    stale,
  };
}

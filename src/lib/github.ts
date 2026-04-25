/**
 * Build-time helpers for fetching GitHub data (contributions, profile, pinned
 * repos, recent public activity) via the GitHub GraphQL and REST APIs.
 *
 * Runs during Astro SSG (in component frontmatter). Results are baked into the
 * static build — every deploy refreshes the data, no client-side JS, no runtime
 * calls.
 *
 * Auth: reads GITHUB_TOKEN from the build environment. A classic PAT with
 *   `public_repo` + `read:user` (or a fine-grained token with metadata read +
 *   contents read on public repos) is sufficient for everything here.
 *
 * Failure mode: every exported function returns null on any error (missing
 * token, network failure, rate limit, malformed response). The build must
 * never fail because of this module; consumers should skip rendering when
 * null is returned so blocks degrade independently.
 */

export type DayContribution = {
  /** ISO date (YYYY-MM-DD) per GitHub's calendar. */
  date: string;
  /** Contribution count for the day. */
  count: number;
};

export type WeekContribution = {
  /** Total contributions during this ISO week. */
  total: number;
  /** ISO date (YYYY-MM-DD) of the first day of this week, per GitHub's calendar (Sunday). */
  startDate: string;
  /** Per-day breakdown, oldest first. Length 7 except possibly at the calendar boundary. */
  days: DayContribution[];
};

export type ContributionsSummary = {
  /** The last 52 complete weeks, oldest first. */
  weeks: WeekContribution[];
  /** Total contributions across the window returned by the API. */
  total: number;
};

export type Profile = {
  name: string | null;
  login: string;
  bio: string | null;
  avatarUrl: string;
  location: string | null;
  url: string;
  followers: number;
  following: number;
  publicRepos: number;
};

export type PinnedRepo = {
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: { name: string; color: string | null } | null;
};

export type ActivityEvent = {
  /** GitHub event type, e.g. "PushEvent", "PullRequestEvent". Preserved for consumers that want to style by type. */
  type: string;
  /** Short natural-language summary, e.g. "pushed 3 commits", "opened a pull request". No repo name — repo is a sibling field. */
  summary: string;
  /** ISO timestamp (UTC) of when the event occurred. */
  createdAt: string;
  repo: {
    nameWithOwner: string;
    url: string;
  };
};

// ---------- shared fetch helpers ------------------------------------------------

const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const REST_ROOT = "https://api.github.com";

type GitHubResult<T> = { ok: true; data: T } | { ok: false };

function getToken(): string | undefined {
  return import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
}

function userAgent(login: string): string {
  return `${login}-site-build`;
}

async function githubGraphQL<T>(
  query: string,
  variables: Record<string, unknown>,
  context: string,
  login: string,
): Promise<GitHubResult<T>> {
  const token = getToken();
  if (!token) {
    return { ok: false };
  }

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": userAgent(login),
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      console.warn(`[github:${context}] HTTP ${response.status} ${response.statusText}`);
      return { ok: false };
    }

    const payload = (await response.json()) as {
      data?: T;
      errors?: Array<{ message: string }>;
    };

    if (payload.errors && payload.errors.length > 0) {
      console.warn(
        `[github:${context}] GraphQL errors: ${payload.errors.map((e) => e.message).join("; ")}`,
      );
      return { ok: false };
    }

    if (!payload.data) {
      console.warn(`[github:${context}] missing data in response`);
      return { ok: false };
    }

    return { ok: true, data: payload.data };
  } catch (error) {
    console.warn(
      `[github:${context}] fetch threw: ${error instanceof Error ? error.message : String(error)}`,
    );
    return { ok: false };
  }
}

async function githubRest<T>(
  path: string,
  context: string,
  login: string,
): Promise<GitHubResult<T>> {
  const token = getToken();
  if (!token) {
    return { ok: false };
  }

  try {
    const response = await fetch(`${REST_ROOT}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": userAgent(login),
      },
    });

    if (!response.ok) {
      console.warn(`[github:${context}] HTTP ${response.status} ${response.statusText}`);
      return { ok: false };
    }

    return { ok: true, data: (await response.json()) as T };
  } catch (error) {
    console.warn(
      `[github:${context}] fetch threw: ${error instanceof Error ? error.message : String(error)}`,
    );
    return { ok: false };
  }
}

// ---------- contributions -------------------------------------------------------

const CONTRIBUTIONS_QUERY = `
  query ContributionsForUser($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

type ContributionsResponse = {
  user?: {
    contributionsCollection?: {
      contributionCalendar?: {
        totalContributions: number;
        weeks: Array<{
          contributionDays: Array<{ contributionCount: number; date: string }>;
        }>;
      };
    };
  };
};

// In-process cache so multiple imports during a single build share the same call.
let cachedContributions: Promise<ContributionsSummary | null> | null = null;

export function getContributions(login: string): Promise<ContributionsSummary | null> {
  if (cachedContributions) {
    return cachedContributions;
  }
  cachedContributions = fetchContributions(login);
  return cachedContributions;
}

async function fetchContributions(login: string): Promise<ContributionsSummary | null> {
  const result = await githubGraphQL<ContributionsResponse>(
    CONTRIBUTIONS_QUERY,
    { login },
    "contributions",
    login,
  );
  if (!result.ok) {
    return null;
  }

  const calendar = result.data.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    console.warn("[github:contributions] contributionCalendar missing from response");
    return null;
  }

  const weeks: WeekContribution[] = calendar.weeks.map((week) => {
    const days: DayContribution[] = week.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
    }));
    return {
      total: days.reduce((sum, d) => sum + d.count, 0),
      startDate: days[0]?.date ?? "",
      days,
    };
  });

  // The API typically returns 53 weeks; keep the last 52 so the rail is always the same length.
  const trimmed = weeks.slice(-52);

  return {
    weeks: trimmed,
    total: calendar.totalContributions,
  };
}

// ---------- profile + pinned (one GraphQL call, two exported views) -------------

const PROFILE_BUNDLE_QUERY = `
  query ProfileBundle($login: String!) {
    user(login: $login) {
      name
      login
      bio
      avatarUrl(size: 160)
      location
      url
      followers { totalCount }
      following { totalCount }
      repositories(privacy: PUBLIC) { totalCount }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            nameWithOwner
            description
            url
            stargazerCount
            primaryLanguage { name color }
          }
        }
      }
    }
  }
`;

type ProfileBundleResponse = {
  user?: {
    name: string | null;
    login: string;
    bio: string | null;
    avatarUrl: string;
    location: string | null;
    url: string;
    followers: { totalCount: number };
    following: { totalCount: number };
    repositories: { totalCount: number };
    pinnedItems: {
      nodes: Array<{
        name?: string;
        nameWithOwner?: string;
        description?: string | null;
        url?: string;
        stargazerCount?: number;
        primaryLanguage?: { name: string; color: string | null } | null;
      }>;
    };
  };
};

type ProfileBundle = {
  profile: Profile;
  pinned: PinnedRepo[];
};

// Profile and pinned are almost always rendered together, so we make one
// GraphQL call and cache the combined result. Each public getter pulls the
// slice it needs; a failure on the combined fetch nulls both, matching the
// "degrade independently per block" contract at the call site (a page that
// wants just one of them still does the right thing).
let cachedProfileBundle: Promise<ProfileBundle | null> | null = null;

function getProfileBundle(login: string): Promise<ProfileBundle | null> {
  if (cachedProfileBundle) {
    return cachedProfileBundle;
  }
  cachedProfileBundle = fetchProfileBundle(login);
  return cachedProfileBundle;
}

async function fetchProfileBundle(login: string): Promise<ProfileBundle | null> {
  const result = await githubGraphQL<ProfileBundleResponse>(
    PROFILE_BUNDLE_QUERY,
    { login },
    "profile",
    login,
  );
  if (!result.ok) {
    return null;
  }

  const user = result.data.user;
  if (!user) {
    console.warn("[github:profile] user missing from response");
    return null;
  }

  const profile: Profile = {
    name: user.name,
    login: user.login,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    location: user.location,
    url: user.url,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    publicRepos: user.repositories.totalCount,
  };

  // pinnedItems.nodes may contain non-Repository items in theory (GraphQL
  // union); filter those out defensively. In practice the types filter on
  // the query already restricts this to REPOSITORY.
  const pinned: PinnedRepo[] = user.pinnedItems.nodes
    .filter(
      (
        n,
      ): n is Required<Pick<typeof n, "name" | "nameWithOwner" | "url" | "stargazerCount">> &
        typeof n =>
        typeof n.name === "string" &&
        typeof n.nameWithOwner === "string" &&
        typeof n.url === "string" &&
        typeof n.stargazerCount === "number",
    )
    .map((n) => ({
      name: n.name,
      nameWithOwner: n.nameWithOwner,
      description: n.description ?? null,
      url: n.url,
      stargazerCount: n.stargazerCount,
      primaryLanguage: n.primaryLanguage ?? null,
    }));

  return { profile, pinned };
}

export async function getProfile(login: string): Promise<Profile | null> {
  const bundle = await getProfileBundle(login);
  return bundle?.profile ?? null;
}

export async function getPinnedRepos(login: string): Promise<PinnedRepo[] | null> {
  const bundle = await getProfileBundle(login);
  return bundle?.pinned ?? null;
}

/**
 * Pinned repos joined with editorial annotations from src/data/repoAnnotations.ts.
 * Repos without an entry get `annotation: null`, so /github can fall back to the
 * GitHub-provided description on render. Returns null only when the upstream
 * pinned-repo fetch failed — the join itself never fails.
 */
export async function getAnnotatedPinned(
  login: string,
): Promise<Array<PinnedRepo & { annotation: string | null }> | null> {
  const { REPO_ANNOTATIONS } = await import("@data/repoAnnotations");
  const pinned = await getPinnedRepos(login);
  if (!pinned) {
    return null;
  }
  return pinned.map((repo) => ({
    ...repo,
    annotation: REPO_ANNOTATIONS[repo.nameWithOwner]?.blurb ?? null,
  }));
}

// ---------- recent activity (REST events feed) ---------------------------------

// GraphQL doesn't expose the public events feed, so we reach for REST. The
// events endpoint is cheap, unauthenticated-friendly (though we send a token
// to dodge the 60/hr IP limit), and returns up to 30 events already sorted
// newest-first. We normalize into a small shape the page can render without
// knowing about GitHub payload internals.

type RawEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: Record<string, unknown>;
  public?: boolean;
};

let cachedActivity: Promise<ActivityEvent[] | null> | null = null;

export function getRecentActivity(login: string, limit = 10): Promise<ActivityEvent[] | null> {
  if (cachedActivity) {
    return cachedActivity;
  }
  cachedActivity = fetchRecentActivity(login, limit);
  return cachedActivity;
}

async function fetchRecentActivity(login: string, limit: number): Promise<ActivityEvent[] | null> {
  const result = await githubRest<RawEvent[]>(
    `/users/${encodeURIComponent(login)}/events/public?per_page=30`,
    "activity",
    login,
  );
  if (!result.ok) {
    return null;
  }

  const normalized: ActivityEvent[] = [];
  for (const raw of result.data) {
    // Star spam dominates otherwise; filter it out so the feed reflects
    // work, not taste. Forks and follows pass through.
    if (raw.type === "WatchEvent") {
      continue;
    }

    const summary = summarize(raw);
    if (!summary) {
      continue;
    }

    normalized.push({
      type: raw.type,
      summary,
      createdAt: raw.created_at,
      repo: {
        nameWithOwner: raw.repo.name,
        url: `https://github.com/${raw.repo.name}`,
      },
    });

    if (normalized.length >= limit) {
      break;
    }
  }

  return normalized;
}

function summarize(event: RawEvent): string | null {
  const p = event.payload as {
    action?: string;
    ref_type?: string;
    ref?: string;
    commits?: unknown[];
    pull_request?: { merged?: boolean };
  };

  switch (event.type) {
    case "PushEvent": {
      const count = Array.isArray(p.commits) ? p.commits.length : 0;
      if (count === 0) {
        return "pushed";
      }
      return `pushed ${count} ${count === 1 ? "commit" : "commits"}`;
    }
    case "PullRequestEvent": {
      if (p.action === "closed") {
        return p.pull_request?.merged ? "merged a pull request" : "closed a pull request";
      }
      if (p.action === "opened") {
        return "opened a pull request";
      }
      if (p.action === "reopened") {
        return "reopened a pull request";
      }
      return "updated a pull request";
    }
    case "PullRequestReviewEvent":
      return "reviewed a pull request";
    case "PullRequestReviewCommentEvent":
      return "commented on a pull request";
    case "IssuesEvent":
      if (p.action === "opened") {
        return "opened an issue";
      }
      if (p.action === "closed") {
        return "closed an issue";
      }
      if (p.action === "reopened") {
        return "reopened an issue";
      }
      return "updated an issue";
    case "IssueCommentEvent":
      return "commented on an issue";
    case "CreateEvent":
      if (p.ref_type === "repository") {
        return "created repository";
      }
      if (p.ref_type === "branch") {
        return `created branch ${p.ref ?? ""}`.trim();
      }
      if (p.ref_type === "tag") {
        return `created tag ${p.ref ?? ""}`.trim();
      }
      return "created";
    case "DeleteEvent":
      if (p.ref_type === "branch") {
        return `deleted branch ${p.ref ?? ""}`.trim();
      }
      if (p.ref_type === "tag") {
        return `deleted tag ${p.ref ?? ""}`.trim();
      }
      return "deleted";
    case "ForkEvent":
      return "forked";
    case "ReleaseEvent":
      return p.action === "published" ? "published a release" : "updated a release";
    case "PublicEvent":
      return "made public";
    case "MemberEvent":
      return "added a collaborator";
    case "GollumEvent":
      return "edited the wiki";
    default:
      // Unknown event types: skip rather than show cryptic type strings.
      return null;
  }
}

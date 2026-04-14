/**
 * Build-time helper for fetching GitHub contribution data via the GraphQL API.
 *
 * Runs during Astro SSG (in component frontmatter). The result is baked into the
 * static build — every deploy refreshes the data, no client-side JS, no runtime calls.
 *
 * Auth: reads GITHUB_TOKEN from the build environment. A classic PAT with
 *   `public_repo` + `read:user` (or fine-grained token with metadata read + contents
 *   read on public repos) is sufficient.
 *
 * Failure mode: returns null on any error (missing token, network failure, rate
 * limit, malformed response). The build must never fail because of this helper;
 * consumers should skip rendering when null is returned.
 */

export type WeekContribution = {
  /** Total contributions during this ISO week. */
  total: number;
  /** ISO date (YYYY-MM-DD) of the first day of this week, per GitHub's calendar (Sunday). */
  startDate: string;
};

export type ContributionsSummary = {
  /** The last 52 complete weeks, oldest first. */
  weeks: WeekContribution[];
  /** Total contributions across the window returned by the API. */
  total: number;
};

type GraphQLResponse = {
  data?: {
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
  errors?: Array<{ message: string }>;
};

const QUERY = `
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

// In-process cache so multiple imports during a single build share the same call.
let cached: Promise<ContributionsSummary | null> | null = null;

export function getContributions(login: string): Promise<ContributionsSummary | null> {
  if (cached) return cached;
  cached = fetchContributions(login);
  return cached;
}

async function fetchContributions(login: string): Promise<ContributionsSummary | null> {
  const token = import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
  if (!token) {
    // Local dev without a token, or missing build secret. Degrade silently.
    return null;
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": `${login}-site-build`,
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
    });

    if (!response.ok) {
      console.warn(
        `[github] contributions fetch failed: HTTP ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const payload = (await response.json()) as GraphQLResponse;

    if (payload.errors && payload.errors.length > 0) {
      console.warn(`[github] GraphQL errors: ${payload.errors.map((e) => e.message).join("; ")}`);
      return null;
    }

    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      console.warn("[github] contributionCalendar missing from response");
      return null;
    }

    const weeks: WeekContribution[] = calendar.weeks.map((week) => ({
      total: week.contributionDays.reduce((sum, day) => sum + day.contributionCount, 0),
      startDate: week.contributionDays[0]?.date ?? "",
    }));

    // The API typically returns 53 weeks; keep the last 52 so the rail is always the same length.
    const trimmed = weeks.slice(-52);

    return {
      weeks: trimmed,
      total: calendar.totalContributions,
    };
  } catch (error) {
    // Network error, JSON parse error, etc. Log and fall back — never break the build.
    console.warn(
      `[github] contributions fetch threw: ${error instanceof Error ? error.message : String(error)}`,
    );
    return null;
  }
}

/**
 * Hand-written one-liners for pinned GitHub repos. The /github page joins each
 * pinned repo (live, from the GitHub API) to its annotation here keyed by
 * `nameWithOwner`. Repos without an entry fall back to the GitHub-provided
 * description on render — so an empty map just degrades to the old behavior.
 *
 * Keep blurbs editorial and short (one sentence, ~10–18 words). The point is
 * to say *why* the repo matters, not what it does — the GitHub description
 * already covers that.
 */

export type RepoAnnotation = {
  blurb: string;
};

export const REPO_ANNOTATIONS: Record<string, RepoAnnotation> = {
  // Add entries keyed by `nameWithOwner`, e.g.:
  // "elliottsencan/elliottsencan.com": {
  //   blurb: "This site. Astro + Tailwind, hand-authored.",
  // },
};

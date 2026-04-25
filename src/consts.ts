import type { Metadata, Person, Repo, Site, Socials } from "@types";

// STANDFIRST is the site's one-line self-description. It's no longer rendered
// on-page (the homepage is a writing feed, not a hero) — it now only powers
// <meta name="description">, og:description, and the WebSite JSON-LD.
const STANDFIRST =
  "Engineer in San Diego writing about developer tools, complex systems, and building software at scale.";

export const SITE: Site = {
  TITLE: "Elliott Sencan",
  DESCRIPTION: STANDFIRST,
  EMAIL: "elliottsencan88@gmail.com",
  LOCATION: "San Diego, CA",
  STANDFIRST,
  GITHUB_LOGIN: "elliottsencan",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Writing",
  DESCRIPTION: STANDFIRST,
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Selected projects and case studies.",
};

export const SOCIALS: Socials = [
  // {
  //   NAME: "GitHub",
  //   HREF: "https://github.com/elliottsencan",
  // },
  {
    NAME: "LinkedIn",
    HREF: "https://linkedin.com/in/elliottsencan",
  },
  // {
  //   NAME: "X (formerly Twitter)",
  //   HREF: "https://twitter.com/elliottsencan",
  // },
];

/**
 * Identity for JSON-LD Person schema. `SAME_AS` lists every public profile —
 * including the ones the footer UI hides — because schema.org treats these as
 * disambiguation links for search engines, not user-facing nav.
 */
export const PERSON: Person = {
  NAME: "Elliott Sencan",
  JOB_TITLE: "Software Engineer",
  SAME_AS: [
    "https://github.com/elliottsencan",
    "https://linkedin.com/in/elliottsencan",
    "https://twitter.com/elliottsencan",
  ],
};

/** Used to build per-commit links for the inline RevisionHistory block. */
export const REPO: Repo = {
  OWNER: "elliottsencan",
  NAME: "elliottsencan.com",
};

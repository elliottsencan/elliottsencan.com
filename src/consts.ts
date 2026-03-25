import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Elliott Sencan",
  DESCRIPTION: "Software engineer. Building tools worth using.",
  EMAIL: "hello@elliottsencan.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Software engineer. Building tools worth using.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Writing about software engineering, architecture, and craft.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Selected projects and case studies.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/elliottsencan",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://linkedin.com/in/elliottsencan",
  },
  {
    NAME: "X (formerly Twitter)",
    HREF: "https://twitter.com/elliottsencan",
  },
];

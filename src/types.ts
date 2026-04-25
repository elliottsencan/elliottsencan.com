export type Site = {
  TITLE: string;
  DESCRIPTION: string;
  EMAIL: string;
  LOCATION: string;
  STANDFIRST: string;
  GITHUB_LOGIN: string;
  NUM_POSTS_ON_HOMEPAGE: number;
  NUM_PROJECTS_ON_HOMEPAGE: number;
  /**
   * Beehiiv publication ID for the inline subscribe embed. Empty string
   * means email signup is hidden and /subscribe falls back to RSS-only.
   */
  BEEHIIV_PUB_ID: string;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type Socials = {
  NAME: string;
  HREF: string;
}[];

/**
 * Identity data for JSON-LD `Person` schema. Distinct from the footer `Socials`
 * list because schema `sameAs` should include every public profile URL, even
 * ones the footer UI hides.
 */
export type Person = {
  NAME: string;
  JOB_TITLE: string;
  SAME_AS: string[];
};

/** GitHub repo coordinates for building per-commit URLs. */
export type Repo = {
  OWNER: string;
  NAME: string;
};

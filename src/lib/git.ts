/**
 * Build-time helper to read a file's commit history from the local git repo.
 *
 * Used by RevisionHistory.astro to render a post's edit trail inline on the
 * page, so readers can see when and why a piece changed without clicking out
 * to GitHub. Runs synchronously via `git log` in Astro component frontmatter
 * during SSG; each build captures the current state of the branch.
 *
 * Failure mode: returns an empty array on any error (file not tracked yet,
 * running outside a git repo, etc.). Builds must never fail because of this —
 * an empty revision list simply omits the section from render.
 */

import { execFileSync } from "node:child_process";

export type Revision = {
  /** Short commit SHA, e.g. `a3f2c9e`. */
  sha: string;
  /** Commit author date as a Date. */
  date: Date;
  /** First line of the commit message. */
  subject: string;
};

// Tab-separated format keeps parsing unambiguous even when messages contain commas or pipes.
// %h  = short SHA, %cI = committer date (ISO 8601), %s = subject line.
const FORMAT = "%h%x09%cI%x09%s";

export function getRevisions(projectRelativePath: string): Revision[] {
  try {
    const stdout = execFileSync(
      "git",
      [
        "log",
        `--format=${FORMAT}`,
        // Follow the file across renames so moving a post doesn't truncate its history.
        "--follow",
        "--",
        projectRelativePath,
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    );

    return stdout
      .split("\n")
      .filter((line) => line.length > 0)
      .map((line) => {
        const [sha, dateISO, subject] = line.split("\t");
        return {
          sha,
          date: new Date(dateISO),
          subject,
        };
      });
  } catch {
    // Not in a git repo, file not tracked, or git binary missing. Degrade silently —
    // callers render nothing rather than break the page.
    return [];
  }
}

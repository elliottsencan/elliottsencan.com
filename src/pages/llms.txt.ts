import { getCollection } from "astro:content";
import { SITE } from "@consts";

/**
 * /llms.txt — the agent-facing index for this site.
 *
 * Follows llmstxt.org: one H1 title, a blockquote summary, then H2 sections
 * containing bulleted link lists with one-line descriptions. Designed so any
 * agent can fetch this single URL and know what else on the site is worth
 * retrieving.
 */

const SITE_URL = "https://elliottsencan.com";

function dateLine(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function GET() {
  const [blog, reading] = await Promise.all([getCollection("blog"), getCollection("reading")]);

  const writing = blog
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const recentReading = reading
    .sort((a, b) => b.data.added.valueOf() - a.data.added.valueOf())
    .slice(0, 10);

  const lines: string[] = [];

  lines.push(`# ${SITE.TITLE}`);
  lines.push("");
  lines.push(`> ${SITE.STANDFIRST}`);
  lines.push("");
  lines.push("This file is a machine-readable index of the site. Each entry links to a");
  lines.push("canonical URL; agents should follow the links that are relevant.");
  lines.push("");

  lines.push("## Data");
  lines.push("");
  lines.push(
    `- [reading.json](${SITE_URL}/reading.json): Full structured dump of the reading log as JSON — every entry with summary, category, author, source, and metadata-graph \`related[]\` edges.`,
  );
  lines.push(
    `- [llms-full.txt](${SITE_URL}/llms-full.txt): The full corpus (writing + reading) concatenated as plain markdown for single-fetch ingestion.`,
  );
  lines.push("");

  lines.push("## Writing");
  lines.push("");
  for (const post of writing) {
    lines.push(
      `- [${post.data.title}](${SITE_URL}/writing/${post.id}/) (${dateLine(post.data.date)}): ${post.data.description}`,
    );
  }
  lines.push("");

  lines.push("## Now");
  lines.push("");
  lines.push(
    `- [What I'm working on now](${SITE_URL}/now): Weekly-updated snapshot of current focus, reading, and recent commits.`,
  );
  lines.push("");

  lines.push("## Reading (recent)");
  lines.push("");
  for (const entry of recentReading) {
    lines.push(
      `- [${entry.data.title}](${entry.data.url}) (${dateLine(entry.data.added)}, ${entry.data.category}): ${entry.data.summary}`,
    );
  }
  lines.push("");
  lines.push(`For the full reading log, fetch [reading.json](${SITE_URL}/reading.json).`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

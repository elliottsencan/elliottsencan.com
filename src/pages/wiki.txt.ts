import { getCollection } from "astro:content";
import { SITE } from "@consts";

/**
 * /wiki.txt — the wiki layer's own index, in markdown.
 *
 * Karpathy's pattern keeps the wiki index separate from any site-wide
 * index. We follow that here: /wiki.txt is the agent-facing navigator
 * for the wiki layer specifically, sized to fit in context as the wiki
 * grows. /llms.txt remains the site-wide entry point and points at
 * this file for full wiki retrieval.
 *
 * One line per concept: title, slug, summary. No bodies — agents that
 * want a body fetch /wiki.json or /wiki/<slug>/.
 */

const SITE_URL = "https://elliottsencan.com";

export async function GET() {
  const concepts = (await getCollection("wiki")).sort((a, b) => a.id.localeCompare(b.id));

  const lines: string[] = [];
  lines.push(`# ${SITE.TITLE} — Wiki`);
  lines.push("");
  lines.push(
    "> Concept-indexed synthesis articles. One article per concept, compiled across two or more reading-log citations.",
  );
  lines.push("");
  lines.push(`Structured dump: ${SITE_URL}/wiki.json. Site-wide index: ${SITE_URL}/llms.txt.`);
  lines.push("");

  if (concepts.length === 0) {
    lines.push("## Concepts");
    lines.push("");
    lines.push(
      "No concepts compiled yet. Wiki articles materialise when at least two reading-log entries share a topic and the /synthesize pipeline runs.",
    );
    lines.push("");
  } else {
    lines.push(`## Concepts (${concepts.length})`);
    lines.push("");
    for (const concept of concepts) {
      const aliases = concept.data.aliases ?? [];
      const meta = aliases.length
        ? ` _(sources: ${concept.data.sources.length} · aka: ${aliases.join(", ")})_`
        : ` _(sources: ${concept.data.sources.length})_`;
      lines.push(
        `- [${concept.data.title}](${SITE_URL}/wiki/${concept.id}/): ${concept.data.summary}${meta}`,
      );
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

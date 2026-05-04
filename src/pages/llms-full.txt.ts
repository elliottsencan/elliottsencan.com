import { getCollection } from "astro:content";
import { SITE } from "@consts";
import { buildVocabularyFromWiki, canonicalizeTopics } from "@lib/topics";
import { siteDate } from "@lib/utils";

/**
 * /llms-full.txt — the full corpus concatenated as markdown.
 *
 * Intended for agents that want to ingest everything in one fetch rather
 * than follow the index in /llms.txt. Writing entries come through as their
 * full body; reading entries come through as structured summary blocks
 * (the source text itself is at the `url`, we don't re-host it).
 *
 * Reading-entry topics are canonicalized through wiki-derived aliases at
 * emission, so synonym fragments don't reach agent consumers.
 */

const SITE_URL = "https://elliottsencan.com";
const SEP = "\n\n---\n\n";

export async function GET() {
  const [blog, reading, wiki] = await Promise.all([
    getCollection("blog"),
    getCollection("reading"),
    getCollection("wiki"),
  ]);
  const vocab = buildVocabularyFromWiki(wiki);

  const writing = blog
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const readingEntries = reading.sort((a, b) => b.data.added.valueOf() - a.data.added.valueOf());

  const concepts = wiki.sort((a, b) => a.id.localeCompare(b.id));

  const sections: string[] = [];

  sections.push(`# ${SITE.TITLE} — Full Corpus`);
  sections.push(`Generated ${new Date().toISOString()}. Index at ${SITE_URL}/llms.txt.`);

  if (concepts.length > 0) {
    sections.push("## Wiki");
    sections.push(
      `Each entry below is a concept-indexed synthesis article compiled from multiple reading-log citations. Cross-source by design; one article per concept.`,
    );
    for (const concept of concepts) {
      const meta = `*${SITE_URL}/wiki/${concept.id}/ — sources: ${concept.data.sources.join(", ")}*`;
      const lines = [`### ${concept.data.title}`, meta, "", concept.data.summary];
      if (concept.body?.trim()) {
        lines.push("", concept.body.trim());
      }
      sections.push(lines.join("\n"));
    }
  }

  sections.push("## Writing");
  for (const post of writing) {
    const { body } = post;
    const header = [
      `### ${post.data.title}`,
      `*${siteDate(post.data.date)} — ${SITE_URL}/writing/${post.id}/*`,
      "",
      post.data.description,
    ].join("\n");
    sections.push([header, body ?? ""].filter(Boolean).join("\n\n"));
  }

  sections.push("## Reading");
  sections.push(
    `Each entry below is an AI-compiled citation for a URL I've saved — title, summary, category, topics. Source text lives at the linked URL; cross-source synthesis lives in the Wiki section above.`,
  );
  for (const entry of readingEntries) {
    const meta = [entry.data.author, entry.data.source].filter(Boolean).join(", ");
    const canonicalTopics = canonicalizeTopics(entry.data.topics ?? [], vocab);
    const topics = canonicalTopics.length ? `\nTopics: ${canonicalTopics.join(", ")}` : "";
    const lines = [
      `### ${entry.data.title}`,
      `*${siteDate(entry.data.added)} — ${entry.data.category}${meta ? ` — ${meta}` : ""}*`,
      "",
      `Source: ${entry.data.url}${topics}`,
      "",
      entry.data.summary,
    ];
    sections.push(lines.join("\n"));
  }

  return new Response(sections.join(SEP), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

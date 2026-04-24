import { getCollection } from "astro:content";
import { SITE } from "@consts";

/**
 * /llms-full.txt — the full corpus concatenated as markdown.
 *
 * Intended for agents that want to ingest everything in one fetch rather
 * than follow the index in /llms.txt. Writing entries come through as their
 * full body; reading entries come through as structured summary blocks
 * (the source text itself is at the `url`, we don't re-host it).
 */

const SITE_URL = "https://elliottsencan.com";
const SEP = "\n\n---\n\n";

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function GET() {
  const [blog, reading] = await Promise.all([getCollection("blog"), getCollection("reading")]);

  const writing = blog
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const readingEntries = reading.sort((a, b) => b.data.added.valueOf() - a.data.added.valueOf());

  const sections: string[] = [];

  sections.push(`# ${SITE.TITLE} — Full Corpus`);
  sections.push(`Generated ${new Date().toISOString()}. Index at ${SITE_URL}/llms.txt.`);

  sections.push("## Writing");
  for (const post of writing) {
    const { body } = post;
    const header = [
      `### ${post.data.title}`,
      `*${isoDate(post.data.date)} — ${SITE_URL}/writing/${post.id}/*`,
      "",
      post.data.description,
    ].join("\n");
    sections.push([header, body ?? ""].filter(Boolean).join("\n\n"));
  }

  sections.push("## Reading");
  sections.push(
    `Each entry below is an AI-compiled summary of a URL I've saved. The source text lives at the linked URL.`,
  );
  for (const entry of readingEntries) {
    const meta = [entry.data.author, entry.data.source].filter(Boolean).join(", ");
    const lines = [
      `### ${entry.data.title}`,
      `*${isoDate(entry.data.added)} — ${entry.data.category}${meta ? ` — ${meta}` : ""}*`,
      "",
      `Source: ${entry.data.url}`,
      "",
      entry.data.summary,
    ];
    if (entry.body?.trim()) {
      lines.push("", entry.body.trim());
    }
    sections.push(lines.join("\n"));
  }

  return new Response(sections.join(SEP), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

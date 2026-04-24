import { getCollection } from "astro:content";

/**
 * Agent-queryable snapshot of the wiki concept layer.
 *
 * The wiki sits one level above the reading log: per-concept synthesis
 * articles compiled by /synthesize from clusters of source citations
 * (reading entries sharing a topic). This endpoint emits every concept
 * with its frontmatter and body for programmatic consumption.
 */

export async function GET() {
  const concepts = (await getCollection("wiki")).sort((a, b) => a.id.localeCompare(b.id));

  const payload = {
    generated_at: new Date().toISOString(),
    count: concepts.length,
    concepts: concepts.map((concept) => ({
      slug: concept.id,
      title: concept.data.title,
      summary: concept.data.summary,
      sources: concept.data.sources,
      related_concepts: concept.data.related_concepts ?? [],
      compiled_at: concept.data.compiled_at.toISOString(),
      compiled_with: concept.data.compiled_with,
      body: concept.body?.trim() ?? "",
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

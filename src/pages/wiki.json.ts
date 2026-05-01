import { getCollection } from "astro:content";

/**
 * Agent-queryable snapshot of the wiki concept layer.
 *
 * The wiki sits one level above the reading log: per-concept synthesis
 * articles compiled by /synthesize from clusters of source citations
 * (reading entries sharing a topic). This endpoint emits every concept
 * with its frontmatter and body for programmatic consumption.
 *
 * `related_concepts` is filtered to entries that resolve against the
 * current wiki collection — broken edges are dropped so downstream
 * consumers never see hallucinated targets. Drift is logged at build
 * time; `/lint` carries the canonical structural report.
 */

export async function GET() {
  const concepts = (await getCollection("wiki")).sort((a, b) => a.id.localeCompare(b.id));
  const wikiSlugs = new Set(concepts.map((c) => c.id));

  const hallucinated: Array<{ concept: string; missing: string }> = [];

  const payload = {
    generated_at: new Date().toISOString(),
    count: concepts.length,
    concepts: concepts.map((concept) => {
      const related = (concept.data.related_concepts ?? []).filter((slug) => {
        if (wikiSlugs.has(slug)) {
          return true;
        }
        hallucinated.push({ concept: concept.id, missing: slug });
        return false;
      });
      return {
        slug: concept.id,
        title: concept.data.title,
        summary: concept.data.summary,
        sources: concept.data.sources,
        related_concepts: related,
        compiled_at: concept.data.compiled_at.toISOString(),
        compiled_with: concept.data.compiled_with,
        body: concept.body?.trim() ?? "",
      };
    }),
  };

  if (hallucinated.length > 0) {
    console.warn(
      `[wiki.json] ${hallucinated.length} hallucinated related_concept(s):`,
      hallucinated.map((h) => `${h.concept} -> ${h.missing}`).join("; "),
    );
  }

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

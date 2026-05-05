import { getCollection } from "astro:content";
import { buildWikiLinkGraph, resolveRelatedConcepts } from "@lib/wiki-graph";

/**
 * Agent-queryable snapshot of the wiki concept layer.
 *
 * The wiki sits one level above the reading log: per-concept synthesis
 * articles compiled by /synthesize from clusters of source citations
 * (reading entries sharing a topic). This endpoint emits every concept
 * with its frontmatter and body for programmatic consumption.
 *
 * `related_concepts` is the union of (a) graph-derived edges from inline
 * `[…](/wiki/<slug>)` references in article bodies (inserted by the
 * validated crosslink phase) and (b) legacy frontmatter entries that still
 * resolve against the live collection. Hallucinated legacy entries are
 * dropped here and warned about at build time. `/lint` carries the
 * canonical structural drift report.
 */

export async function GET() {
  const concepts = (await getCollection("wiki")).sort((a, b) => a.id.localeCompare(b.id));
  const knownSlugs = new Set(concepts.map((c) => c.id));
  const graph = buildWikiLinkGraph(concepts.map((c) => ({ id: c.id, body: c.body ?? "" })));

  const hallucinated: Array<{ concept: string; missing: string }> = [];
  const payload = {
    generated_at: new Date().toISOString(),
    count: concepts.length,
    concepts: concepts.map((concept) => {
      const resolved = resolveRelatedConcepts(
        graph,
        concept.id,
        concept.data.related_concepts,
        knownSlugs,
      );
      for (const missing of resolved.hallucinated) {
        hallucinated.push({ concept: concept.id, missing });
      }
      return {
        slug: concept.id,
        title: concept.data.title,
        summary: concept.data.summary,
        sources: concept.data.sources,
        aliases: concept.data.aliases ?? [],
        related_concepts: resolved.related,
        compiled_at: concept.data.compiled_at.toISOString(),
        compiled_with: concept.data.compiled_with,
        compile_cost: concept.data.compile_cost,
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

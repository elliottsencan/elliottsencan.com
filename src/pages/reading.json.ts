import { getCollection } from "astro:content";
import { buildReadingGraph } from "@lib/reading-graph";
import { buildVocabularyFromWiki } from "@lib/topics";

/**
 * Agent-queryable snapshot of the reading collection.
 *
 * Reading entries are per-source citations produced by the /link ingest
 * pipeline. They are NOT wiki articles; cross-source synthesis lives at
 * /wiki.json (one article per concept, drawn from clusters of these
 * citations).
 *
 * The transform itself lives in `@lib/reading-graph` so it can be tested
 * without astro:content. This handler just fetches both collections,
 * builds the canonical vocabulary from wiki article aliases, runs the
 * transform, logs orphan citations, and serializes.
 */

export async function GET() {
  const [entries, wiki] = await Promise.all([getCollection("reading"), getCollection("wiki")]);
  const vocab = buildVocabularyFromWiki(wiki);
  const { payload, orphanCitations } = buildReadingGraph(entries, wiki, vocab);

  if (orphanCitations.length > 0) {
    console.warn(
      `[reading.json] ${orphanCitations.length} broken wiki citation(s):`,
      orphanCitations.map((o) => `${o.concept} -> ${o.missing}`).join("; "),
    );
  }

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

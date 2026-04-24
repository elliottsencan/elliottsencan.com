import { getCollection } from "astro:content";

/**
 * Agent-queryable snapshot of the reading collection.
 *
 * Each `/link` ingest compiles one URL into a structured summary article;
 * this endpoint exposes the whole set as JSON. `related[]` is computed at
 * build time from shared metadata (author, source, category+month) — no LLM
 * inference, just cheap graph edges over existing frontmatter.
 */

type Related = {
  slug: string;
  reason: "author" | "source" | "topic" | "category-month";
};

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function pushTo<K, V>(map: Map<K, V[]>, key: K, value: V): void {
  const existing = map.get(key);
  if (existing) {
    existing.push(value);
  } else {
    map.set(key, [value]);
  }
}

export async function GET() {
  const entries = (await getCollection("reading")).sort(
    (a, b) => b.data.added.valueOf() - a.data.added.valueOf(),
  );

  const byAuthor = new Map<string, string[]>();
  const bySource = new Map<string, string[]>();
  const byTopic = new Map<string, string[]>();
  const byCategoryMonth = new Map<string, string[]>();

  for (const entry of entries) {
    if (entry.data.author) {
      pushTo(byAuthor, entry.data.author.toLowerCase(), entry.id);
    }
    if (entry.data.source) {
      pushTo(bySource, entry.data.source.toLowerCase(), entry.id);
    }
    for (const topic of entry.data.topics ?? []) {
      pushTo(byTopic, topic.toLowerCase(), entry.id);
    }
    pushTo(byCategoryMonth, `${entry.data.category}:${monthKey(entry.data.added)}`, entry.id);
  }

  const payload = {
    generated_at: new Date().toISOString(),
    count: entries.length,
    categories: [...new Set(entries.map((e) => e.data.category))].sort(),
    entries: entries.map((entry) => {
      const related: Related[] = [];
      const seen = new Set<string>([entry.id]);

      const pushRelated = (slugs: string[], reason: Related["reason"]) => {
        for (const slug of slugs) {
          if (seen.has(slug)) {
            continue;
          }
          seen.add(slug);
          related.push({ slug, reason });
        }
      };

      // Topic overlap is the strongest semantic signal, surface it first.
      for (const topic of entry.data.topics ?? []) {
        pushRelated(byTopic.get(topic.toLowerCase()) ?? [], "topic");
      }
      if (entry.data.author) {
        pushRelated(byAuthor.get(entry.data.author.toLowerCase()) ?? [], "author");
      }
      if (entry.data.source) {
        pushRelated(bySource.get(entry.data.source.toLowerCase()) ?? [], "source");
      }
      pushRelated(
        byCategoryMonth.get(`${entry.data.category}:${monthKey(entry.data.added)}`) ?? [],
        "category-month",
      );

      return {
        slug: entry.id,
        title: entry.data.title,
        url: entry.data.url,
        summary: entry.data.summary,
        category: entry.data.category,
        added: entry.data.added.toISOString(),
        author: entry.data.author,
        source: entry.data.source,
        topics: entry.data.topics ?? [],
        compiled_at: entry.data.compiled_at?.toISOString(),
        compiled_with: entry.data.compiled_with,
        detail: entry.body?.trim() || undefined,
        related: related.slice(0, 8),
      };
    }),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

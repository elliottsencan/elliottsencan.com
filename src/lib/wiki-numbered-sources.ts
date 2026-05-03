/**
 * Number `/reading/<slug>` links in a rendered wiki body.
 *
 * The wiki body comes through Astro's markdown renderer as plain HTML —
 * sources show up as `<a href="/reading/<slug>">…</a>` anchors in document
 * order. We walk those anchors, assign each unique target a sequential
 * citation number (1, 2, 3 …), inject a `<sup>` after each link, and
 * return:
 *   - the modified HTML to render in the body
 *   - the citation order so the right-margin rail can render the same
 *     numbered cards in matching order
 *
 * Frontmatter sources that the body never cites still appear in the rail
 * — they're appended in their declared order with subsequent numbers.
 *
 * No DOM parsing: the link shape is stable (Astro emits exactly
 * `<a href="/reading/...">label</a>` with the href first), so a regex on
 * the rendered HTML is enough and avoids pulling in jsdom at build time.
 */

const READING_LINK_RE =
  /<a([^>]*?)\bhref="\/reading\/([a-z0-9-]+(?:\/[a-z0-9-]+)*)\/?(?:[#?][^"]*)?"([^>]*)>([\s\S]*?)<\/a>/gi;

export type CitationOrder = ReadonlyArray<{ slug: string; number: number }>;

export type ProcessedWikiBody = {
  html: string;
  order: CitationOrder;
};

export function numberWikiSources(
  rendered: string,
  frontmatterSources: readonly string[],
): ProcessedWikiBody {
  const numberBySlug = new Map<string, number>();
  const order: { slug: string; number: number }[] = [];

  const html = rendered.replace(
    READING_LINK_RE,
    (_match, before: string, slug: string, after: string, label: string) => {
      let n = numberBySlug.get(slug);
      if (n === undefined) {
        n = numberBySlug.size + 1;
        numberBySlug.set(slug, n);
        order.push({ slug, number: n });
      }
      return [
        `<a${before}href="/reading/${slug}/"${after} class="wlink-source" data-src="${slug}">${label}</a>`,
        `<sup class="wlink-num" data-src="${slug}">${n}</sup>`,
      ].join("");
    },
  );

  // Sources declared in frontmatter but not cited inline still belong in the
  // rail. Append them in declared order with continuing numbers.
  for (const slug of frontmatterSources) {
    if (!numberBySlug.has(slug)) {
      const n = numberBySlug.size + 1;
      numberBySlug.set(slug, n);
      order.push({ slug, number: n });
    }
  }

  return { html, order };
}

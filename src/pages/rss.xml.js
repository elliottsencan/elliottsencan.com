import { getCollection, render } from "astro:content";
import mdxRenderer from "@astrojs/mdx/server.js";
import rss from "@astrojs/rss";
import { SITE } from "@consts";
import { experimental_AstroContainer as AstroContainer } from "astro/container";

/**
 * RSS feed combining blog posts and project case studies.
 *
 * Renders full post HTML (including MDX components) into <content:encoded> via
 * Astro's container API so readers see the whole piece instead of just the
 * description. Categories include the collection name (`blog`/`projects`) so
 * feed readers that support filtering can split the two.
 *
 * `<atom:link rel="self">` is required for feed readers to distinguish this
 * URL as the canonical feed location, and matters for syndication services.
 *
 * Experiments are intentionally excluded: they update on re-run (lastRunDate
 * moves), and feed readers don't have semantics for "edited" entries —
 * subscribers would either see duplicate items every refresh or miss the
 * updates entirely. Net-new prose belongs in RSS; living experiments don't.
 */
export async function GET(context) {
  // Register the MDX renderer so .mdx entries' Content component resolves
  // inside the container. Without it, any MDX post breaks the whole feed
  // with `NoMatchingRenderer: Unable to render Content`.
  const container = await AstroContainer.create();
  container.addServerRenderer({ renderer: mdxRenderer });

  const blog = (await getCollection("blog")).filter((post) => !post.data.draft);
  const projects = (await getCollection("projects")).filter((project) => !project.data.draft);

  const entries = [...blog, ...projects].sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  );

  const items = await Promise.all(
    entries.map(async (entry) => {
      const { Content } = await render(entry);
      const contentHTML = await container.renderToString(Content);
      const tagCategories = entry.collection === "blog" ? (entry.data.tags ?? []) : [];
      // Blog collection entries are exposed at /writing/[id] — map the
      // internal collection name to its public URL prefix.
      const urlPrefix = entry.collection === "blog" ? "writing" : entry.collection;
      return {
        title: entry.data.title,
        description: entry.data.description,
        pubDate: entry.data.date,
        link: `/${urlPrefix}/${entry.id}/`,
        content: contentHTML,
        categories: [entry.collection, ...tagCategories],
      };
    }),
  );

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: `<language>en-us</language><atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    items,
  });
}

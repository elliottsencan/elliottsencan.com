/**
 * Dynamic OG image for blog posts: /og/blog/{post-id}.png
 *
 * Rendered at build time via `astro-og-canvas` (CanvasKit under the hood).
 * Fonts: currently the system sans-serif stack. The site's brand fonts ship
 * as WOFF2; CanvasKit needs TTF/OTF. Upgrading requires decompressing WOFF2
 * or sourcing TTF masters from the font vendor — tracked as a follow-up.
 */
import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const posts = await getCollection("blog", (post) => !post.data.draft);

const pages = Object.fromEntries(posts.map((post) => [post.id, post.data]));

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    // Emerald accent matches the GitHub contributions rail — ties OG card to site identity.
    border: { color: [52, 211, 153], width: 4, side: "inline-start" },
    // Neutral warm background close to the site's light-mode body (#fafafa).
    bgGradient: [
      [250, 250, 250],
      [235, 235, 235],
    ],
    padding: 80,
    font: {
      title: {
        families: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        weight: "Bold",
        color: [17, 17, 17],
        size: 72,
        lineHeight: 1.15,
      },
      description: {
        families: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        weight: "Normal",
        color: [90, 90, 90],
        size: 32,
        lineHeight: 1.35,
      },
    },
  }),
});

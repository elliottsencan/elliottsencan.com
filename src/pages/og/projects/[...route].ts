/**
 * Dynamic OG image for project / case-study pages: /og/projects/{project-id}.png
 *
 * Same template as blog OG but with a different accent color so blog and project
 * cards are visually distinguishable when skim-linked on social.
 */
import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const projects = await getCollection("projects", (project) => !project.data.draft);

const pages = Object.fromEntries(projects.map((project) => [project.id, project.data]));

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    // Amber accent distinguishes projects from blog posts at a glance.
    border: { color: [245, 158, 11], width: 4, side: "inline-start" },
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

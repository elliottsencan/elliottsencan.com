import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import pagefind from "astro-pagefind";

// Expressive Code replaces the default Shiki pipeline for both markdown code
// fences AND the <Code /> component (when imported from
// astro-expressive-code/components). It ships the editor-frame chrome,
// filename titlebar, copy button, and text markers.
//
// Options live in ec.config.mjs at the project root — the file-based config
// is required because the <Code /> component loads EC options separately at
// render time and the Astro config must be JSON-serializable (functions like
// `themeCssSelector` can't live there).

// https://astro.build/config
export default defineConfig({
  site: "https://elliottsencan.com",
  integrations: [sitemap(), expressiveCode(), mdx(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
});

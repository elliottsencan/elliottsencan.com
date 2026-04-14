# elliottsencan.com

Personal site and blog for Elliott Sencan. Built with Astro, self-hosted typography, and deployed to Cloudflare Pages.

## Stack

- **Framework:** [Astro](https://astro.build/) with type-safe content collections (MDX)
- **Styling:** [TailwindCSS](https://tailwindcss.com/) v4
- **Typography:** Neue Montreal (headings), Satoshi (body), JetBrains Mono (code) — all self-hosted as WOFF2
- **Search:** [Pagefind](https://pagefind.app/) — client-side, built into the output
- **Hosting:** Cloudflare Pages (config in `wrangler.jsonc`)
- **Tooling:** [Biome](https://biomejs.dev/) for lint + format, pnpm for packages

## Local development

```sh
pnpm install
pnpm dev            # http://localhost:4321
pnpm build          # runs astro check then astro build
pnpm preview        # serves the built site locally
pnpm check          # biome: lint + format --write
```

### Optional build-time env

The footer contributions rail fetches GitHub activity at build time via the GraphQL API. Set `GITHUB_TOKEN` in your build environment with a classic PAT (`public_repo` + `read:user`) or a fine-grained equivalent. Without the token the rail is omitted — the build still succeeds.

For local dev: create `.env` with `GITHUB_TOKEN=ghp_…` (gitignored).

## Content

Entries live under `src/content/{blog,projects,work}`. Schemas are defined in `src/content.config.ts`:

- **Blog post:** `src/content/blog/<slug>.{md,mdx}` — `title`, `description`, `date`, optional `draft`, `tags`, `image`, `canonical`, `updated`
- **Project:** `src/content/projects/<slug>.md` — `title`, `description`, `date`, `isCaseStudy`, `status`, optional `demoURL`, `repoURL`, `role`, `stack`, `impact`, `thumbnail`, `order`
- **Work:** `src/content/work/<slug>.md` — `company`, `role`, `dateStart`, optional `dateEnd`, `description`, `url`

Set `draft: true` to keep an entry out of production builds. Dates use ISO format (`YYYY-MM-DD`).

## Deploy

Cloudflare Pages, configured via `wrangler.jsonc`. Pushes to `main` trigger production deploys; PRs get preview deploys. `GITHUB_TOKEN` must be set in the Pages project's build-environment variables for the contributions rail to render.

## License

MIT — see [LICENSE](./LICENSE).

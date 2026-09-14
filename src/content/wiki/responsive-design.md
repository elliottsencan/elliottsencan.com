---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic, fluid, and container-aware CSS techniques that let components adapt
  to their own context rather than the page's overall dimensions.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp
  - 2026-04/2026-04-30t231909-the-great-css-expansion
  - 2026-04/2026-04-30t231931-50-best-font-combinations-for-graphic-design
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
  - 2026-05/2026-05-05t091632-building-websites-with-llms
  - 2026-05/2026-05-05t183935-type-scale-graphs
  - 2026-05/2026-05-06t163329-multi-stroke-text-effect-in-css
  - >-
    2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with
  - >-
    2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think
  - 2026-07/2026-07-16t052353-boundary-aware-styling-in-css
compiled_at: '2026-09-14T21:42:18.680Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 699
    cache_creation_input_tokens: 0
    cache_read_input_tokens: 0
  model: claude-sonnet-4-6
  pricing:
    model: claude-sonnet-4-6
    input_per_million: 3
    output_per_million: 15
    cache_read_per_million: 0.3
    cache_write_5m_per_million: 3.75
    priced_at: '2026-04-30'
  cost_usd: 0.02199
---
The traditional model of responsive design, media queries keyed to viewport widths, is increasingly seen as the wrong unit of measurement for component-first UIs. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case directly: intrinsic layouts, `clamp()` for fluid sizing, container units, and container queries should carry most of the adaptation work, with media queries reserved for device capabilities and user preferences rather than raw pixel thresholds.

Fluid typography is a significant part of this shift. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) details how `clamp()` lets a font size interpolate smoothly between a minimum and maximum across any viewport range, avoiding the stepped jumps of breakpoint-driven type. The math involves deriving a linear slope from two viewport/size pairs, and the article flags rem units as the accessible default to preserve user font preferences. [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends this with a visualization tool that plots an entire fluid modular scale across the min-to-max viewport range, making the relationships between steps legible at a glance.

Container queries push adaptation further inward. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) reached Baseline browser support, allowing components to respond to parent CSS custom properties as stateful design tokens, which removes many patterns that previously required Sass or build tooling. [Boundary-Aware Styling in CSS](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) demonstrates another frontier: repurposing the CSS `view()` scroll-driven animation function to style elements based on their proximity to a container's edges, with no JavaScript required.

The broader CSS platform is supplying more of the primitives that responsive UI previously delegated to JavaScript. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) catalogs native support for anchor positioning, popovers, scroll-driven animations, and view transitions, each of which previously required hundreds of kilobytes of library code. [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) notes that CSS cross-document view transitions can unify separate HTML pages into a coherent navigational experience, sidestepping JavaScript-heavy in-page state management entirely.

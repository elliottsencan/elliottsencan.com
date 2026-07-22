---
title: Responsive design
summary: >-
  Modern responsive design is shifting away from viewport breakpoints toward
  intrinsic layouts, fluid values, and container-aware CSS that lets components
  adapt to their own context rather than the page width.
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
compiled_at: '2026-07-22T05:58:19.393Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 672
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
  cost_usd: 0.021585
---
The dominant model of responsive design, viewport breakpoints and media queries that reflow layouts at fixed widths, is under sustained pressure from newer CSS capabilities. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case directly: component-first UIs should reach for intrinsic layout techniques, `clamp()` for fluid sizing, and container queries so that components respond to the space they actually occupy, not to the browser window. Media queries get reserved for device capabilities and user preferences like `prefers-reduced-motion`.

Fluid typography is one of the clearest applications of this shift. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) details the math behind deriving `clamp()` preferred values from a minimum and maximum font size across a viewport range, and flags that `rem`-based units matter for accessibility since users may override base font sizes. The [Utopia type scale graph](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends this by visualizing how fluid sizes relate across a modular scale, making it easier to reason about a whole typographic system rather than individual values.

Container queries gain more power still with CSS style queries, which [reached Baseline browser support](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) and let components react to parent CSS custom properties as stateful design tokens, removing the need for Sass or PostCSS for many common theming patterns. [Boundary-aware styling](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) pushes further, repurposing the `view()` scroll-driven animation function to style elements based on proximity to container edges, even without any scrolling involved.

The broader story is that the platform itself is absorbing complexity that previously required JavaScript or build tooling. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) catalogs how anchor positioning, popovers, view transitions, and scroll-driven animations are now native, replacing hundreds of kilobytes of library code. Jim Nielsen's argument for [many small HTML pages unified by CSS view transitions](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) fits the same pattern: lean on what the platform provides before reaching for JavaScript.

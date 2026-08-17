---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic layouts, container queries, fluid values, and CSS platform
  primitives that let components adapt to their own context rather than the
  screen size.
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
compiled_at: '2026-08-17T18:50:47.907Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 692
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
  cost_usd: 0.021885
---
The classic responsive design model centered on viewport-width breakpoints is losing ground to an approach where components adapt to their own available space. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case directly: intrinsic layouts, `clamp()` values, container units, and container queries do most of the work that media queries used to handle, with media queries reserved for device capabilities and user preferences rather than layout pivots.

Fluid typography is a specific win here. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math for deriving `clamp()` preferred values from a pair of breakpoints and target font sizes, and flags the accessibility concern of using `rem` units correctly so user font-size preferences are respected. The [Utopia type scale graph](/reading/2026-05/2026-05-05t183935-type-scale-graphs) adds a visual tool for understanding how a fluid modular scale behaves across the full viewport range, making it easier to audit relationships between steps before shipping.

Container queries extend this logic beyond typography. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) have reached Baseline support, letting components react to parent CSS custom properties as stateful design tokens without Sass or build tooling. [Boundary-aware styling](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) pushes further, repurposing the scroll-driven `view()` function to style elements based on proximity to container edges, covering grids and draggable elements without JavaScript.

The broader CSS platform is supplying more of what JavaScript libraries once handled. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents anchor positioning, popovers, scroll-driven animations, and view transitions arriving as native primitives, reducing dependency weight. [Jim Nielsen's argument](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) for separate HTML pages unified by CSS cross-document view transitions fits the same pattern: platform features replacing bespoke JS. The [CSS `::checkmark` pseudo-element](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) is a smaller instance of the same shift, though its browser support gaps still require progressive enhancement planning.

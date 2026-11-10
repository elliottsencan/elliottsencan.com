---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic, component-aware layouts using container queries, fluid values, and
  CSS primitives that adapt to context rather than screen size.
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
compiled_at: '2026-11-10T01:24:47.783Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 592
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
  cost_usd: 0.020385
---
The traditional responsive design model, built on viewport-width media queries and fixed breakpoints, is showing its age. [Amit Sheen argues](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) that component-first UIs should use intrinsic layout techniques, container queries, and `clamp()` values instead, reserving media queries for device capabilities and user preferences rather than raw dimensions. The shift in framing is significant: layout decisions belong to the component and its container, not to the viewport.

Fluid typography is a natural companion to this approach. [Adrian Bece's treatment of CSS `clamp()`](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math for deriving preferred values from two viewport and font-size anchors, and flags accessibility concerns when mixing `vw` units with `rem`. The [Utopia type scale graph](/reading/2026-05/2026-05-05t183935-type-scale-graphs) makes the relationships within a fluid modular scale visual, plotting sizes across min and max viewports so the full scale can be evaluated at once rather than at isolated breakpoints.

Underpinning all of this is a broader expansion of what CSS can handle natively. [Pavel Laptev documents](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) how anchor positioning, scroll-driven animations, and view transitions now replace large JavaScript libraries. [CSS style queries reaching Baseline](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) means components can respond to parent CSS variables as stateful design tokens, removing the need for Sass or build tooling for many common patterns. [Boundary-aware styling via the `view()` function](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) extends this further, letting elements style themselves based on proximity to container edges without JavaScript.

Together these techniques point toward a model of responsive design grounded in the component and its context, with the platform itself doing more of the adaptation work.

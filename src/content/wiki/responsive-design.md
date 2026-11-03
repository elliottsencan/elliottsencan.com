---
title: Responsive design
summary: >-
  Modern responsive design is shifting away from viewport breakpoints toward
  intrinsic layouts, fluid values, and container-aware CSS primitives that let
  components adapt to their own context rather than the screen.
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
compiled_at: '2026-11-03T00:44:24.151Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 715
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
  cost_usd: 0.02223
---
The classic responsive design model, defined by viewport-width media queries at discrete breakpoints, is increasingly treated as a workaround for what CSS now handles natively. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that component-first UIs should use intrinsic layout techniques, `clamp()`-based fluid values, and container queries instead, reserving media queries for device capabilities and user preferences rather than layout thresholds.

Fluid typography is one of the clearest expressions of this shift. CSS `clamp()` lets a font size interpolate smoothly between a minimum and maximum across a viewport range, rather than snapping at breakpoints. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math for deriving the preferred value from two size-viewport pairs and flags an accessibility concern: using `rem` units ensures the fluid scale respects user font-size preferences. The Utopia tooling described in [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends this further by plotting an entire fluid modular scale as a graph, making the relationships between steps legible across the min and max viewport bounds.

Container queries are the other structural shift. Where media queries key off the viewport, container queries let a component respond to the size of its own parent. Combined with CSS style queries, which reached Baseline support and allow components to react to parent CSS custom properties as stateful tokens, [Why CSS Style Queries Are a Bigger Deal Than You Think](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) notes this eliminates many patterns that previously required Sass or a build step. [Boundary-Aware Styling in CSS](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) pushes further still, showing how the `view()` scroll-driven animation function can style elements based on proximity to container edges, without any scrolling involved.

Beyond layout, [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, popovers, and view transitions are now platform primitives, replacing JavaScript libraries that once handled what CSS could not. Jim Nielsen's argument in [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) complements this: cross-document view transitions allow separate HTML pages to feel continuous, reducing the need for JavaScript-managed state to achieve smooth navigation.

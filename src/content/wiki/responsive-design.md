---
title: Responsive design
summary: >-
  Modern responsive design is shifting from viewport breakpoints toward
  intrinsic, container-aware CSS — fluid type, container queries, and platform
  primitives that let components adapt to their context rather than the screen.
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
compiled_at: '2026-07-20T19:47:43.884Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 604
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
  cost_usd: 0.020565
---
Responsive design originally meant adapting layouts to viewport sizes via media query breakpoints. The direction of current CSS practice runs against that model. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that component-first UIs should reach for intrinsic layout tools first: `clamp()` for fluid sizing, container units, and container queries that let a component respond to its own available space rather than the global viewport. Media queries are repositioned there as a tool for device capabilities and user preferences, not layout pivots.

Fluid typography is the clearest case study. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) works through the math for deriving `clamp()` preferred values from two breakpoint-and-size pairs, and flags the accessibility importance of using `rem` units so that user font-size preferences are respected. [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) adds a visual dimension, plotting fluid modular scales across min and max viewports so designers can see how size ratios behave across the range rather than only at the endpoints.

Container queries extend the same principle beyond type. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) reach further still: components can now react to parent CSS custom properties as stateful design tokens, removing Sass and build tooling from many theming patterns. [Boundary-Aware Styling in CSS](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) pushes the boundary further by repurposing scroll-driven animation functions to style elements based on their proximity to container edges, without any JavaScript.

The broader CSS platform expansion supports all of this. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, popovers, view transitions, and native custom selects now replace JavaScript libraries that once handled these concerns, reducing the surface area where layout logic escapes into scripts.

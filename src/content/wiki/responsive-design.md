---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic layouts, fluid values, and container-aware CSS — letting components
  respond to their own context rather than the global viewport.
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
compiled_at: '2026-10-05T23:58:10.237Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 680
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
  cost_usd: 0.021705
---
The dominant mental model for responsive design, fixed breakpoints at common viewport widths, is under sustained pressure from a generation of CSS features that make it largely unnecessary. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the clearest version of this case: intrinsic layouts, `clamp()` for fluid sizing, container units, and container queries let components adapt to their own available space rather than a global viewport state. Media queries survive, but their appropriate scope narrows to device capabilities and user preferences, not layout pivots.

Fluid typography is one of the more fully developed applications of this approach. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math for deriving `clamp()` preferred values from two known type sizes at two known viewport widths, along with the accessibility case for rem-based units. [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends that into visual tooling: Utopia's graph view plots each step in a fluid modular scale across the viewport range, making scale relationships legible at a glance.

Container queries and style queries push responsive logic further down the component tree. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) have reached Baseline, letting components react to parent CSS custom properties as stateful design tokens without Sass or build tooling. [Boundary-Aware Styling in CSS](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) takes this further, repurposing the `view()` scroll-driven animation function to style elements based on their proximity to container edges, with no scrolling required.

The broader CSS platform expansion provides the surrounding context. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how native CSS now handles anchor positioning, popovers, scroll animations, and view transitions, displacing JavaScript libraries that once filled those gaps. [Progressive enhancement for checkmarks](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) illustrates the same dynamic at a smaller scale: the `::checkmark` pseudo-element is the platform-native path, though browser support gaps still push some teams toward JavaScript fallbacks.

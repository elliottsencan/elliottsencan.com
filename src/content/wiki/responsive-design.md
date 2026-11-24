---
title: Responsive design
summary: >-
  Modern responsive design is shifting from viewport breakpoints toward
  intrinsic, component-aware layouts using container queries, fluid clamp()
  values, and CSS primitives that let components respond to their own context
  rather than the page's dimensions.
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
compiled_at: '2026-11-24T04:02:19.810Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 654
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
  cost_usd: 0.021315
---
The viewport-breakpoint model that dominated responsive design for over a decade is being displaced by a more component-centric approach. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that media queries should be reserved for device capabilities and user preferences, while layout and sizing decisions belong to intrinsic CSS — container queries, `min()`/`max()`/`clamp()`, and container units — so components adapt to whatever space they actually occupy.

Fluid typography sits at the center of this shift. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers how `clamp()` replaces stepped font-size breakpoints with a continuous scale between a minimum and maximum, and flags an accessibility concern: mixing `rem` with viewport units can override user browser font-size preferences. [Utopia's type scale graph view](/reading/2026-05/2026-05-05t183935-type-scale-graphs) makes the math more legible by plotting a fluid modular scale across the full viewport range, surfacing relationships that are hard to reason about in raw CSS.

Container queries extend the same thinking to components. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) have reached Baseline support, letting components respond to parent CSS custom properties as stateful design tokens — a pattern that previously required Sass or build tooling. [Boundary-aware styling](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) pushes further, repurposing the `view()` scroll-driven animation function to style elements based on their proximity to container edges without any JavaScript.

Broader CSS capability growth supports this direction. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, popovers, and view transitions now replace large JavaScript libraries, reducing the surface area where layout logic had to live outside CSS entirely. [Cross-document view transitions](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) similarly allow separate HTML pages to feel continuous without JavaScript-managed state, reinforcing that the platform itself is absorbing responsibilities that once required scripting.

---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic layouts, container queries, and fluid CSS values that let components
  adapt to their own context rather than the page dimensions.
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
compiled_at: '2026-08-29T20:21:41.460Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 505
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
  cost_usd: 0.01908
---
The classic responsive design pattern, media queries keyed to viewport widths, is under pressure from a more component-centered approach. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case directly: viewport breakpoints should be reserved for device capabilities and user preferences, while layout adaptation belongs to container queries, intrinsic sizing, and fluid `clamp()` values. The viewport never knew enough about a component's context to be the right trigger.

Fluid typography sits at the center of this shift. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) explains how `clamp()` interpolates type size between two breakpoint values, eliminating discrete jumps. The same approach, visualized as a graph of font sizes across the min and max viewport range, is what [Utopia's type scale tool](/reading/2026-05/2026-05-05t183935-type-scale-graphs) now exposes directly, making the relationships in a fluid modular scale easier to audit.

The broader CSS platform is expanding in ways that reduce the need for JavaScript to handle what was once layout logic. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) let components respond to parent CSS custom properties as stateful design tokens, without Sass or build tooling. [Boundary-aware styling](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) via the `view()` scroll-driven animation function allows elements to style themselves based on proximity to container edges. These capabilities push adaptation logic further into CSS and further away from the viewport-centered mental model that defined responsive design for a decade.

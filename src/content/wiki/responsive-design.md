---
title: Responsive design
summary: >-
  Responsive design is shifting away from viewport breakpoints toward intrinsic,
  component-aware CSS — fluid typography, container queries, and style queries
  that let layouts adapt based on available space rather than device size.
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
compiled_at: '2026-10-19T22:14:15.929Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 634
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
  cost_usd: 0.021015
---
The classic responsive design pattern, viewport breakpoints paired with media queries, is under sustained pressure from newer CSS capabilities. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case most directly: component-first UIs should use intrinsic layout techniques, container units, and container queries, reserving media queries for actual device capabilities and user preferences rather than viewport width thresholds.

Fluid typography sits at the center of this shift. CSS `clamp()` lets font sizes scale continuously between a minimum and maximum, eliminating the step-change behavior of breakpoint-based type. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math for deriving preferred values from target sizes at two viewport widths, and flags an accessibility concern: fluid values using `vw` can break user font-size preferences unless anchored with `rem` units. [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) from Utopia adds a visual layer, plotting a fluid modular scale across min and max viewports so the relationships between type sizes are legible at a glance.

Beyond sizing, CSS is absorbing responsibilities that previously required JavaScript. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) now have Baseline browser support, letting components respond to parent CSS custom properties as stateful design tokens without build tooling. [Boundary-Aware Styling in CSS](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) repurposes scroll-driven animation functions to style elements based on proximity to container edges. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) frames this broadly: anchor positioning, popovers, view transitions, and custom selects are all landing as zero-dependency platform primitives, displacing large JavaScript libraries.

The throughline is a move from layout defined by the viewport to layout defined by context: the container an element lives in, the custom properties it inherits, and its position relative to its boundaries. Breakpoints are not gone, but they are becoming a specialized tool rather than the primary mechanism.

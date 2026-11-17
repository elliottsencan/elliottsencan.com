---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic layouts, container queries, fluid values, and CSS primitives that
  let components adapt based on their own context rather than the page
  dimensions.
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
compiled_at: '2026-11-17T01:48:32.358Z'
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
The classical breakpoint model assumes a designer can anticipate the viewport sizes where a layout needs to change. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues this assumption breaks down in component-first systems, where a component may be placed in any context. The alternative is intrinsic layout: `clamp()` for fluid sizing, container units, and container queries so components respond to their containing element rather than the viewport. Media queries are reserved for device capabilities and user preferences, not arbitrary size thresholds.

Fluid typography is the clearest application of that shift. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math for deriving `clamp()` preferred values from a minimum and maximum font size across a viewport range, and flags an accessibility concern: mixing `px` and `rem` units incorrectly can break user font-size preferences. The [Utopia type scale graph](/reading/2026-05/2026-05-05t183935-type-scale-graphs) makes those relationships visual, plotting every step of a fluid modular scale across both viewport extremes so the proportions are legible at a glance.

Beyond layout and type, newer CSS features reduce the need for JavaScript to manage responsive state. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) reached Baseline, letting components react to parent CSS custom properties as stateful design tokens without build tooling. [Boundary-aware styling](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) repurposes the `view()` scroll-driven animation function to style elements based on proximity to container edges, covering grids and draggable elements without scroll involvement. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents the broader platform shift: anchor positioning, popovers, view transitions, and custom selects now land as zero-dependency CSS primitives, replacing substantial JavaScript libraries.

Taken together, these sources describe a consistent direction: responsiveness moves from page-level media queries and JavaScript state into the CSS cascade itself, with components that adapt through containment and fluid values rather than external size signals.

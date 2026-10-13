---
title: Responsive design
summary: >-
  Responsive design has shifted from viewport breakpoints toward intrinsic,
  container-aware layouts — using fluid values, container queries, and modern
  CSS primitives to make components adapt to their own context rather than the
  device.
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
compiled_at: '2026-10-13T00:22:00.336Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 699
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
  cost_usd: 0.02199
---
The older breakpoint model tied component layout to viewport dimensions, creating a mismatch once component-based design became standard. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues directly for replacing that model: intrinsic layouts, `clamp()` values for fluid sizing, container units, and container queries let components respond to the space they actually occupy. Media queries then serve a narrower role, signaling device capabilities or user preferences rather than driving layout decisions.

Fluid typography extends the same logic to type. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math for deriving `clamp()` preferred values from two viewport and font-size anchors, and flags accessibility considerations when mixing `rem` and `px` units. [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) adds a graphical layer to this reasoning, plotting font sizes across viewport ranges so the relationships within a fluid modular scale become immediately visible.

CSS itself has expanded to support these patterns without build tooling. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) have reached Baseline, letting components react to parent CSS variables as stateful design tokens. [Boundary-Aware Styling in CSS](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) repurposes the `view()` scroll-driven animation function to style elements based on proximity to container edges, with no scrolling involved. More broadly, [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, popovers, and view transitions now replace JavaScript libraries that once handled layout-adjacent behavior.

Responsiveness also touches interaction patterns. [Jim Nielsen's approach](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) of linking separate HTML pages unified by CSS cross-document view transitions treats navigation itself as a layout concern, sidstepping JavaScript-heavy in-page state. [Progressive enhancement for custom dropdowns](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) follows the same logic at the component level, preferring the native `::checkmark` pseudo-element over fragile JS solutions where browser support allows.

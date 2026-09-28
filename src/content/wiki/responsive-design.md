---
title: Responsive design
summary: >-
  Modern responsive design is shifting away from viewport breakpoints toward
  intrinsic, component-first layouts — using container queries, fluid clamp()
  values, and CSS primitives that let components adapt to their own context
  rather than the screen.
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
compiled_at: '2026-09-28T23:10:35.191Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 628
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
  cost_usd: 0.020925
---
The dominant model of responsive design, fixed breakpoints keyed to viewport widths, is increasingly treated as a legacy constraint. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the sharpest case for replacing them: intrinsic layouts, `clamp()`-based fluid values, container units, and container queries let components respond to the space they actually occupy rather than the size of the browser window. Media queries get reserved for device capabilities and user preferences, not layout pivots.

Fluid typography is the most mature expression of this approach. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math for deriving `clamp()` preferred values from min and max font sizes across a viewport range, along with accessibility concerns around `rem` units. [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends that by visualizing an entire modular fluid scale across viewport extremes, making the relationships within a type system legible at a glance.

CSS style queries add another layer. [Why CSS Style Queries Are a Bigger Deal Than You Think](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) notes that components can now react to parent CSS custom properties as stateful design tokens, removing the need for Sass or PostCSS for many patterns. [Boundary-Aware Styling in CSS](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) pushes further, repurposing the `view()` scroll-driven animation function to style elements based on proximity to container edges without JavaScript.

Taken together, these sources describe a CSS platform that has absorbed much of what JavaScript and build tooling previously handled. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) catalogs the scope of that shift: anchor positioning, popovers, scroll-driven animations, and view transitions now ship natively, displacing large dependency chains. Responsive design, in this framing, is less about breakpoints and more about components that know their own boundaries.

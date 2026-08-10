---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic layouts, container queries, and fluid CSS primitives that let
  components adapt to their own context rather than the page width.
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
compiled_at: '2026-08-10T19:05:57.041Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 713
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
  cost_usd: 0.0222
---
The dominant model of responsive design, fixed viewport breakpoints with media queries, is under pressure from multiple directions. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that component-first UIs should use intrinsic layouts, `clamp()` values, and container queries instead, reserving media queries for device capabilities and user preferences rather than layout pivots. The practical consequence is that a component becomes self-contained: it reacts to the space it occupies, not to the viewport width it happens to sit within.

Fluid typography is the clearest expression of this shift. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) walks through the math for deriving a `clamp()` preferred value from two size-and-viewport pairs, and raises an important accessibility note: using `rem` units in the calculation preserves user font-size preferences in a way that `vw`-only approaches do not. [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends this with a visual tool that plots a fluid modular scale across its min and max viewport extents, making the relationships between steps legible at a glance.

CSS itself has expanded to cover much of what previously required JavaScript or build tooling. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) catalogs native support for anchor positioning, scroll-driven animations, and view transitions, each of which previously required third-party libraries. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) adds another layer: components can now react to parent CSS custom properties as stateful design tokens, removing common reasons to reach for Sass or PostCSS. [Boundary-Aware Styling in CSS](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) pushes further, using the `view()` scroll-driven animation function without any scrolling to style elements based on proximity to container edges.

Progressive enhancement runs through several of these pieces as a shared value. Navigating the age-old problem of checkmarks in UI contrasts fragile JavaScript-driven custom dropdowns with the emerging CSS `::checkmark` pseudo-element, acknowledging that browser support gaps still require fallback thinking rather than wholesale adoption.

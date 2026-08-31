---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic layouts, container queries, and fluid CSS values that let components
  adapt based on their own context rather than the screen size.
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
compiled_at: '2026-08-31T22:40:27.111Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 571
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
  cost_usd: 0.02007
---
The classic responsive design model tied layout decisions to viewport width via media queries. A growing body of CSS practice now treats that model as insufficient for component-first UIs. [Amit Sheen's breakdown](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the clearest case: viewport breakpoints describe the screen, not the component, so they break down once a component appears in multiple layout contexts. The alternative is a combination of intrinsic layout techniques (CSS Grid with `auto-fill` and `minmax`), container queries, container units, and `clamp()` values, with media queries reserved strictly for device capabilities and user preferences.

Fluid typography is one of the most concrete expressions of this shift. [Adrian Bece's guide](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math behind `clamp()` for font sizes, letting type scale continuously between a minimum and maximum rather than snapping at breakpoints. [Utopia's graph view](/reading/2026-05/2026-05-05t183935-type-scale-graphs) makes the relationships within a fluid modular scale visible across the viewport range, which helps designers reason about the system as a whole rather than point sizes at fixed breakpoints.

Container queries extend the same logic to layout: a component responds to the width of its containing element, not the viewport. [CSS style queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) push further, letting components react to parent CSS custom properties as stateful design tokens, removing the need for preprocessors in many common theming patterns. [Boundary-aware styling via scroll-driven animation functions](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) extends this further, using the `view()` function without actual scrolling to style elements based on proximity to container edges.

The broader trend these sources reflect is CSS absorbing responsibilities that previously required JavaScript or build tooling, producing layouts and interactions that are more context-sensitive and require fewer explicit breakpoints.

---
title: Responsive design
summary: >-
  Responsive design is shifting from viewport breakpoints toward intrinsic,
  component-aware layouts — using container queries, fluid clamp() values, and
  modern CSS primitives that let components respond to their own context rather
  than the screen size.
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
compiled_at: '2026-07-04T21:26:56.640Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3679
    output_tokens: 656
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
  cost_usd: 0.020877
---
The traditional model of responsive design anchors layout changes to viewport widths via media queries. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues this model is increasingly a mismatch for component-first UIs, where a sidebar card has no idea what viewport it sits in. The proposed replacement combines intrinsic layout techniques, container queries, and container units so components respond to their own available space. Media queries are reserved for device capabilities and user preferences, not layout pivots.

Typography follows the same arc. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) shows how `clamp()` eliminates discrete type breakpoints by interpolating between a minimum and maximum size across a defined viewport range. The math is mechanical once you have the two endpoint sizes and viewport widths, but accessibility requires care: using `rem` units in `clamp()` lets users who have set a browser font size preference see the scale honored. [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) from Utopia extends this by visualizing an entire modular type scale across the min-to-max viewport range, making the relationships between steps legible at a glance rather than only checkable in code.

Beyond layout and typography, modern CSS is absorbing capabilities that previously required JavaScript libraries. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents anchor positioning, scroll-driven animations, and view transitions landing as platform primitives, cutting hundreds of kilobytes of dependency weight. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) extend container queries to CSS custom properties, letting a component change its own appearance when a parent sets a design token — a pattern that previously required preprocessors or build steps. Jim Nielsen's case for [separate HTML pages unified by CSS view transitions](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) is a parallel move: reach for the platform before reaching for JavaScript.

Taken together, these sources describe a consistent direction. Responsive design is decoupling from the viewport as the primary axis of control and distributing that intelligence into components, fluid values, and CSS primitives that respond to their immediate context.

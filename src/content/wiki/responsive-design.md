---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic layouts, fluid values, and container-aware CSS that lets components
  adapt to their own context rather than the page's dimensions.
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
compiled_at: '2026-08-13T21:18:47.076Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 625
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
  cost_usd: 0.02088
---
The dominant model of responsive design, built on viewport-width media queries and fixed breakpoints, is losing ground to a set of CSS primitives that let components respond to their own containers and content. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues this shift directly: breakpoints should be reserved for device capabilities and user preferences, while layout and sizing logic belongs in intrinsic CSS, container queries, and `clamp()` values.

Fluid typography is the clearest expression of this principle. Rather than jumping between font sizes at named breakpoints, `clamp()` interpolates smoothly between a minimum and maximum across any viewport range. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) details the math behind preferred values and flags accessibility concerns with `rem` units. The [Utopia type scale graph](/reading/2026-05/2026-05-05t183935-type-scale-graphs) makes the relationships within a fluid modular scale visible, plotting font sizes across min and max viewports so the scale's behavior can be evaluated at a glance.

Container queries extend the same logic to layout. A component styled with container units reacts to the space its parent gives it, not the total page width. CSS style queries go further still: [Why CSS Style Queries Are a Bigger Deal Than You Think](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) notes that now components can react to parent CSS variables as stateful design tokens, removing the need for Sass or PostCSS in many common theming patterns.

The platform itself is closing gaps that once required JavaScript. [Boundary-Aware Styling in CSS](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) shows how the `view()` scroll-driven animation function can style elements based on their proximity to container edges, covering grids and draggable interfaces without any script. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) catalogs the broader replacement: anchor positioning, popovers, modals, and scroll-driven animations now exist as zero-dependency platform primitives.

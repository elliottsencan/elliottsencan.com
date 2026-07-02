---
title: Responsive design
summary: >-
  Modern responsive design is shifting away from viewport breakpoints toward
  intrinsic, component-aware techniques: container queries, fluid clamp()
  values, and native CSS primitives that let layouts and typography adapt
  without explicit media query thresholds.
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
compiled_at: '2026-07-02T12:34:21.097Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3679
    output_tokens: 620
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
  cost_usd: 0.020337
---
The traditional responsive design model centers on viewport-width breakpoints: define a handful of screen sizes, write rules for each, and let the media query cascade do the rest. A growing body of CSS work challenges whether that model fits the component-first architecture most UIs now use.

[Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case directly: viewport breakpoints are a poor fit when a component can appear in a sidebar, a modal, or a full-width hero with no reliable relationship to the viewport width. Container queries and container units let a component respond to its own available space. Media queries are then reserved for device capabilities and user preferences, not layout thresholds.

Fluid typography is a parallel shift in the same direction. Rather than snapping font sizes at breakpoints, [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) walks through using `clamp()` to interpolate between a minimum and maximum size across any viewport range, with attention to the math for deriving the preferred value and the accessibility implications of choosing `rem` over `px` as the unit. [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) adds a visualization layer, plotting an entire fluid modular scale across min and max viewports so designers can see how size relationships hold across the range rather than only at the endpoints.

On the broader CSS side, [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how native platform features, including anchor positioning, scroll-driven animations, and view transitions, are eliminating the JavaScript dependencies that previously handled layout and interaction concerns. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) extends this further: components can now react to parent CSS custom properties as stateful design tokens, which removes some of the remaining need for preprocessors and build tooling in design systems.

Together these sources describe a coherent direction: responsive behavior increasingly lives in the component and in the CSS value itself, not in a list of viewport thresholds authored at the page level.

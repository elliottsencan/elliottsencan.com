---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic CSS layouts, container queries, fluid scaling, and platform
  primitives that let components adapt to their own context rather than the page
  width.
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
compiled_at: '2026-08-11T05:23:10.493Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 651
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
  cost_usd: 0.02127
---
The classic responsive design model, built on viewport-width media queries at a handful of breakpoints, is under sustained pressure from newer CSS capabilities. [Amit Sheen](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues the breakpoint model was always a workaround for layout primitives that didn't yet exist. With CSS Grid, Flexbox, container queries, and `clamp()` now broadly supported, components can respond to their own available space rather than the viewport, and most layout decisions can be made without any media query at all.

Fluid scaling sits at the center of this shift. `clamp()` lets a value interpolate smoothly between a minimum and maximum, eliminating the stepped jumps that breakpoints produce. [Adrian Bece](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math for deriving the preferred value from two known font-size and viewport pairs, and flags accessibility risks when viewport units displace `rem` — users who set a browser font size preference lose that control. [Utopia's graph view](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends this, letting designers see how every step of a fluid modular scale behaves across the full viewport range at once, making scale relationships legible before any code ships.

Beyond layout and type, the broader CSS platform has expanded in ways that reduce reliance on JavaScript-powered responsive patterns. [Pavel Laptev](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, scroll-driven animations, and view transitions now replace large JS libraries. [Mike Herchel](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) adds that CSS style queries, now at Baseline, let components react to parent CSS variable state without Sass or build tooling. [Preethi Sam](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) shows the `view()` function can style elements by their proximity to container edges, a capability that previously required JavaScript measurement.

Sheen's framing reserves media queries for genuine device capability and user preference signals, not layout pivots. That distinction matters: the sources collectively treat responsive design less as a grid of breakpoints and more as a system where each component knows its own constraints.

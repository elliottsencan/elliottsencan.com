---
title: Responsive design
summary: >-
  Responsive design is shifting away from viewport breakpoints toward intrinsic,
  component-aware CSS — using fluid clamp() values, container queries, and
  platform primitives to build layouts that adapt without explicit device
  targets.
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
compiled_at: '2026-07-06T00:20:27.263Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3679
    output_tokens: 807
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
  cost_usd: 0.023142
---
The traditional model of responsive design, viewport-width breakpoints triggering layout shifts at fixed thresholds, is being replaced by approaches that let components respond to their own available space. [Amit Sheen's breakdown](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) is the clearest statement of this shift: intrinsic layouts using `min()`, `max()`, `clamp()`, container units, and container queries can handle most adaptation without a single `@media (min-width: ...)` rule. Media queries survive, but their role narrows to signaling device capabilities or user preferences, not layout pivots.

Fluid typography is one of the most developed applications of this thinking. CSS `clamp()` lets a font size interpolate smoothly between a minimum and maximum across a viewport range, rather than snapping between discrete values at breakpoints. [Adrian Bece's guide](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) walks through the math for deriving the preferred slope value from target font sizes and viewport bounds, and flags an important accessibility concern: viewport-relative units in `clamp()` do not scale when a user increases their browser's base font size, so `rem`-based minimums and maximums need to be preserved. [Utopia's graph view](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends this into full modular scales, plotting every step across the viewport range so designers can see how the ratios between sizes hold as everything scales.

At the broader CSS layer, the platform is absorbing functionality that once required JavaScript or build-time preprocessing. [Pavel Laptev's survey](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents anchor positioning, scroll-driven animations, and view transitions landing natively, displacing large libraries. [Mike Herchel's piece on style queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) shows how components can now react to parent CSS custom properties as stateful design tokens, removing the need for Sass or PostCSS in many patterns. [Sunkanmi Fafowora's look at the `::checkmark` pseudo-element](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) illustrates the same dynamic at the component level, though browser support gaps still require progressive enhancement as a fallback.

Jim Nielsen's argument for [separate linked HTML pages unified by CSS view transitions](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) sits adjacent to this: when the platform handles transitions natively, the case for JavaScript-driven in-page state weakens, and simpler document structures become viable again. Taken together, these sources describe a design environment where the browser itself handles more of the adaptive work, and the designer's job shifts toward configuring fluid systems rather than specifying breakpoint-by-breakpoint rules.

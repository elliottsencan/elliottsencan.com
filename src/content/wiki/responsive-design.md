---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic layouts, container queries, fluid type scales, and CSS primitives
  that let components adapt to their own context rather than the screen.
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
compiled_at: '2026-08-24T18:54:04.304Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 684
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
  cost_usd: 0.021765
---
The traditional model of responsive design, anchored to viewport-width media queries and discrete breakpoints, is under pressure from two directions: more capable CSS and a shift toward component-first architecture. [Amit Sheen's breakdown](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that modern layouts should use intrinsic sizing, `clamp()` values, container units, and container queries, reserving media queries only for device capabilities and user preferences like `prefers-reduced-motion`.

Fluid typography is one of the clearest expressions of this shift. Rather than snapping between font sizes at breakpoints, `clamp()` interpolates continuously between a minimum and maximum, with the math derived from the target viewport range and desired sizes. [Adrian Bece's guide](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers both the calculation method and accessibility considerations, particularly around `rem` units and user font-size preferences. The Utopia project extends this further: [Trys Mudford's type scale graph](/reading/2026-05/2026-05-05t183935-type-scale-graphs) visualizes how an entire modular scale behaves across the viewport range, making it easier to reason about the relationships between steps rather than individual sizes in isolation.

Container queries expand the same logic from typography to layout. Instead of asking how wide the viewport is, a component asks how much space it has been given, making it genuinely portable across different page regions. CSS style queries go further still: [Mike Herchel notes](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) that they have reached Baseline support and allow components to react to parent CSS custom properties as stateful design tokens, replacing many patterns that previously required Sass or PostCSS.

Beyond layout, newer CSS capabilities continue to reduce the JavaScript surface area that responsive UIs once required. [Pavel Laptev documents](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) how anchor positioning, scroll-driven animations, view transitions, and native popovers now replace large JS libraries. [Preethi Sam's boundary-aware styling technique](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) shows the `view()` scroll-driven function being repurposed to style elements based on their proximity to container edges, a kind of spatial awareness that was previously only achievable with JavaScript observers. Taken together, these developments point toward a CSS layer capable of handling adaptation that once required scripting.

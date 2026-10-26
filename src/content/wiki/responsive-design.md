---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic layouts, container queries, and fluid CSS values that let components
  adapt to their own context rather than the screen size.
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
compiled_at: '2026-10-26T22:32:41.948Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 732
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
  cost_usd: 0.022485
---
The classic responsive design model, built around viewport-width media queries, is under pressure from multiple directions. [Amit Sheen at Frontend Masters](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that component-first UIs should abandon breakpoints almost entirely, using intrinsic layout techniques, `clamp()`-based fluid values, container units, and container queries instead. Media queries, on this view, belong only to device capability detection and user preference queries, not to layout decisions.

Fluid typography is one of the clearest expressions of this shift. [Adrian Bece at Smashing Magazine](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) lays out the math for deriving `clamp()` preferred values from a pair of breakpoints and target font sizes, while flagging accessibility implications of using `rem` units inside clamp. The Utopia project extends this further: its [type scale graph tool](/reading/2026-05/2026-05-05t183935-type-scale-graphs) plots fluid font sizes across viewport extremes, making the relationships within a modular scale visually legible before any code ships.

Container queries change the calculus most for component libraries. Where viewport media queries ask "how wide is the browser," container queries ask "how wide is the space this component occupies," which is the question that actually matters for reusable UI. CSS Style Queries push this further: [Mike Herchel at Dripyard](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) shows that components can now react to parent CSS custom properties as stateful design tokens, reaching Baseline support without Sass or build tooling.

[Preethi Sam at Master.dev](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) demonstrates another dimension: repurposing the `view()` scroll-driven animation function to style elements based on their proximity to container edges, handling cases like grid items near a boundary that no breakpoint could express cleanly.

The broader platform story is that CSS is absorbing responsibilities that once required JavaScript. [Pavel Laptev at Butler's Log](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) catalogs anchor positioning, popovers, view transitions, and custom selects as native CSS features that replace hundreds of kilobytes of library code. Jim Nielsen's argument for [replacing JS-driven in-page interactions with linked HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) unified by CSS cross-document view transitions fits the same pattern: the platform handles the adaptive behavior, and the component stays simple.

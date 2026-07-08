---
title: Responsive design
summary: >-
  Responsive design is shifting away from viewport breakpoints toward intrinsic,
  component-aware CSS — fluid type scales, container queries, and style queries
  that let layouts adapt without hardcoded thresholds.
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
compiled_at: '2026-07-08T00:20:49.226Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3679
    output_tokens: 676
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
  cost_usd: 0.021177
---
The dominant model of responsive design for over a decade was the media query breakpoint: pick a handful of viewport widths, write rules for each, and call it done. That model is under sustained pressure from a cluster of CSS capabilities that have reached broad browser support.

[Amit Sheen](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case most directly: modern component-first UIs should drop viewport breakpoints almost entirely, using intrinsic layout primitives, `clamp()` for fluid sizing, container units, and container queries instead. Media queries, in this framing, belong only to device capability and user preference detection, not to layout.

Fluid typography is a concrete instance of that shift. [Adrian Bece](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math behind `clamp()` values that interpolate smoothly between a minimum and maximum font size across a viewport range, and flags an accessibility concern: preferred values should use `rem` units so that user font-size preferences are respected. The Utopia project extends this further. [Trys Mudford](/reading/2026-05/2026-05-05t183935-type-scale-graphs) describes a graph view for Utopia's fluid type scale calculator, making the relationships within a modular scale visible across the full min-to-max viewport range, which helps designers reason about proportional consistency without manually checking each step.

Beyond sizing, [Mike Herchel](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) argues that CSS Style Queries, now at Baseline support, let components react to parent CSS custom properties as stateful design tokens. That removes a category of Sass and PostCSS tooling that previously handled conditional styling. [Pavel Laptev](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) situates this in a broader pattern: anchor positioning, scroll-driven animations, view transitions, and native popovers together displace hundreds of kilobytes of JavaScript that used to be required for adaptive UI behavior.

[Jim Nielsen's argument](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) connects to responsive design obliquely: replacing JavaScript-driven in-page interactions with separate linked HTML pages unified by CSS cross-document view transitions can be simpler to build and maintain, with platform layout primitives doing the heavy lifting rather than framework code.

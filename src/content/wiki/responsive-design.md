---
title: Responsive design
summary: >-
  Modern responsive design is shifting from viewport breakpoints toward
  intrinsic CSS primitives — fluid sizing, container queries, and
  component-level layouts — that adapt without explicit breakpoint declarations.
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
compiled_at: '2026-06-18T21:53:59.568Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3567
    output_tokens: 666
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
  cost_usd: 0.020691
last_source_added: '2026-07-01T04:39:59.931Z'
---
The dominant pattern in responsive design for over a decade has been viewport breakpoints: pick a handful of pixel thresholds, write media queries for each, and override layout and type sizes at those points. A cluster of recent CSS writing argues this model should become the exception rather than the rule.

[Amit Sheen](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case directly: intrinsic grid layouts, `clamp()` fluid values, container units, and container queries do the work that breakpoints used to do, more accurately and with less code. Media queries get reserved for genuine device-capability differences — pointer type, color scheme preferences — not for pixel counts.

Fluid typography is the clearest demonstration of the shift. [Adrian Bece](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) walks through the math behind `clamp()` preferred-value parameters, including the case for `rem`-based values to preserve accessibility when users scale their browser's default font size. [Utopia](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends this with a graph-based visualisation of fluid type scales, making it easier to reason about how modular scale steps behave across the full viewport range rather than at discrete breakpoints.

The broader CSS platform is catching up in ways that reinforce this direction. [Pavel Laptev](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, scroll-driven animations, and view transitions are now native CSS features, replacing JavaScript libraries that previously handled those concerns. [Jim Nielsen](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) approaches the same platform-native impulse from an architecture angle, arguing that CSS cross-document view transitions make separate linked HTML pages a viable and simpler alternative to JavaScript-powered navigation.

[Sunkanmi Fafowora](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) adds a progressive-enhancement note: the native CSS `::checkmark` pseudo-element can replace custom JavaScript dropdown implementations, though limited Safari and Firefox support means breakpoint-style fallback thinking still applies at the browser-capability level.

Taken together, the pattern is consistent: write CSS that responds to its content and container first, use platform primitives before reaching for scripting or explicit overrides, and treat media queries as a targeted tool for capability detection.

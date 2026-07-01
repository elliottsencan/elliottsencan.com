---
title: Responsive design
summary: >-
  Responsive design is shifting away from viewport breakpoints toward intrinsic,
  fluid, and component-aware CSS techniques that let layouts and typography
  adapt without hardcoded thresholds.
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
compiled_at: '2026-07-01T04:52:46.744Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3679
    output_tokens: 648
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
  cost_usd: 0.020757
---
The dominant model of responsive design, viewport breakpoints driving layout switches via media queries, is under active pressure from newer CSS capabilities. [Amit Sheen's case at Frontend Masters](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) puts the argument directly: component-first UIs should rely on intrinsic sizing, `clamp()` values, container units, and container queries instead, reserving media queries for device capabilities and user preferences rather than pixel thresholds.

Fluid typography is one of the clearest applications of this shift. [Adrian Bece in Smashing Magazine](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) explains how `clamp()` replaces discrete breakpoint-driven font sizes with a continuously scaling value calculated from minimum and maximum viewport widths and target font sizes. Accessibility is a constraint here: using `rem` units inside the clamp expression preserves user font-size overrides in a way that `px`-only values do not. [Utopia's graph view](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends this further, letting designers visualize an entire fluid modular type scale plotted across min and max viewports so the relationships between steps stay coherent.

Beyond typography, CSS is absorbing layout and interaction patterns that previously required JavaScript. [Pavel Laptev's overview of recent CSS additions](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents anchor positioning, scroll-driven animations, view transitions, and native popovers as platform primitives that displace libraries like Floating UI and GSAP. [Jim Nielsen makes a complementary point](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) at the architecture level: linked HTML pages unified by CSS cross-document view transitions can replace JavaScript-driven in-page interactions with less complexity. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) add another dimension, letting components react to parent CSS custom properties as stateful design tokens, which removes many use cases for Sass and build tooling.

The through-line is that responsiveness is becoming a property of components and type systems rather than a property of the page as a whole, expressed through fluid values and container-aware rules rather than global breakpoints.

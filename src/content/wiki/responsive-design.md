---
title: Responsive design
summary: >-
  Modern responsive design is shifting away from viewport breakpoints toward
  intrinsic, fluid layouts — using container queries, clamp(), and native CSS
  primitives to make components adapt to their context rather than the screen.
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
compiled_at: '2026-09-07T21:21:14.600Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 762
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
  cost_usd: 0.022935
---
The dominant responsive-design model of the 2010s centered on viewport-width media queries: define a set of breakpoints, write styles for each. That model is under serious pressure from two directions at once: the shift toward component-first architecture, and the rapid expansion of what CSS can do natively.

[Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the clearest case for retiring viewport breakpoints as the primary tool. The argument is that components don't know which viewport they'll land in, so they should respond to their container instead. Container queries and container units handle layout adaptation; `clamp()` handles fluid sizing; media queries get reserved for device capabilities and user preferences, not pixel widths.

Fluid typography is the most worked-out piece of this approach. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math for deriving `clamp()` preferred values from two known font-size and viewport-width pairs, and flags the accessibility risk of using `vw` units without a `rem`-based floor. [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) from Utopia adds a visual layer: plotting a fluid modular scale across min and max viewports makes the relationships between steps legible at a glance, which helps catch runaway size ratios before they hit production.

Beyond sizing, [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, scroll-driven animations, view transitions, and native popovers have moved from JavaScript libraries into the platform itself. [Boundary-Aware Styling in CSS](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) extends that pattern further, showing how the `view()` scroll-driven function can style elements based on proximity to container edges, with no scroll event required. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) add another layer: components can now read parent CSS custom properties as stateful design tokens, which eliminates many patterns that previously required Sass or a build step.

Progressive enhancement remains a complicating factor. Navigating checkmarks in UI illustrates the gap between what CSS can do in leading browsers and what ships safely across the full user base. The `::checkmark` pseudo-element is a cleaner solution than JavaScript-heavy alternatives, but browser support gaps mean the enhancement has to be layered carefully rather than assumed.

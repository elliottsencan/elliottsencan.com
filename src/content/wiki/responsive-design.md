---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic, component-aware CSS — fluid type scales, container queries, and
  platform primitives that adapt without explicit size thresholds.
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
compiled_at: '2026-07-09T14:19:13.775Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3679
    output_tokens: 865
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
  cost_usd: 0.024012
---
The classic breakpoint model of responsive design — defining layout shifts at fixed viewport widths — has been under sustained pressure as CSS has matured. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case directly: component-first UIs should use intrinsic layout techniques, `clamp()` for fluid values, and container queries so that components respond to their own available space rather than the viewport. Media queries are reserved for device capabilities and user preferences, not layout pivots.

Fluid typography is one concrete application of this shift. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) explains the math behind deriving `clamp()` preferred values from minimum and maximum font sizes across a viewport range, and flags the accessibility importance of using `rem` units so that browser font scaling is respected. [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends this by visualizing an entire fluid modular scale across viewports, making the relationships between type sizes legible at a glance rather than guessable from raw numbers.

Broader CSS capability growth supports the same direction. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, scroll-driven animations, and view transitions are now native platform features, removing large JavaScript dependencies. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) adds another layer: components can now react to parent CSS custom properties as stateful design tokens, enabling context-sensitive styling without Sass or build tooling. [Progressive enhancement for custom dropdowns](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) illustrates the pattern applied to UI components, trading fragile JavaScript for the CSS `::checkmark` pseudo-element where browser support allows.

Jim Nielsen's argument in [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) is adjacent: CSS cross-document view transitions can unify separate HTML pages into something that feels like a single-page app, reducing the JavaScript surface area that responsive behavior often depends on.

Not every source here is about responsiveness in the layout sense. [50 Best Font Combinations](/reading/2026-04/2026-04-30t231931-50-best-font-combinations-for-graphic-design) and [Micrographics Templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) are design reference materials; they inform visual decisions within responsive systems but do not address adaptation mechanics. [Multi-stroke text effects in CSS](/reading/2026-05/2026-05-06t163329-multi-stroke-text-effect-in-css) similarly sits at the decorative layer. The through-line across the more technical sources is consistent: modern CSS makes the viewport-breakpoint approach feel like a workaround, and the platform has grown capable enough that many responsive patterns no longer need JavaScript or preprocessors to express.

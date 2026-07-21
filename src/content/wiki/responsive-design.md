---
title: Responsive design
summary: >-
  Modern responsive design moves away from viewport breakpoints toward intrinsic
  layouts, fluid values, and container-aware CSS — letting components adapt to
  their context rather than to the screen.
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
compiled_at: '2026-07-21T05:05:59.006Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 735
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
  cost_usd: 0.02253
---
The classic breakpoint model of responsive design assumed a small set of known viewport widths and toggled layouts between them. That assumption has aged poorly. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that component-first UIs should reach for intrinsic layout tools instead: CSS Grid with `auto-fill`, `minmax`, and `fit-content`; container queries so a component responds to its own available space rather than the viewport; and `clamp()` for fluid sizing that interpolates continuously between bounds.

Fluid typography is the clearest case for this approach. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math behind deriving a `clamp()` preferred value from two known font-size and viewport-width pairs, and flags that `rem`-based min and max values preserve user font-size preferences in a way `px` values do not. The [Utopia type scale graph](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends this by plotting an entire modular scale across the viewport range, making the relationships between steps visible and letting designers catch unexpected crossings before they ship.

Container queries gain further capability through CSS Style Queries, which [have reached Baseline support](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) and allow components to branch on parent CSS custom properties as stateful design tokens, removing a class of Sass or build-time workarounds. Separately, [boundary-aware styling via scroll-driven animations](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) repurposes the `view()` function to apply styles based on an element's proximity to container edges, without any actual scrolling involved.

The broader CSS platform is expanding in parallel. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, popovers, view transitions, and scroll-driven animations now handle patterns that previously required substantial JavaScript. [Jim Nielsen's case for separate HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) makes a related point: CSS cross-document view transitions can unify navigation across pages that have no shared JavaScript at all.

Both [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) and the style queries piece agree that media queries still have a place, but a narrower one: device capability detection and user preference queries like `prefers-reduced-motion`, not layout switching.

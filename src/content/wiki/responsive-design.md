---
title: Responsive design
summary: >-
  Responsive design is shifting from viewport breakpoints toward intrinsic,
  component-aware layouts — using fluid values, container queries, and
  CSS-native primitives that let components respond to their own context rather
  than the page width.
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
compiled_at: '2026-08-03T19:39:18.363Z'
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
The core argument running through recent writing on this topic is that viewport breakpoints are the wrong unit of control for component-first UIs. [Amit Sheen](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes this case directly: intrinsic layout techniques, `clamp()` for fluid values, container units, and container queries handle the vast majority of layout decisions without a single media query. Media queries, in this framing, are reserved for genuine device capability and user preference concerns, not layout math.

Fluid typography is one of the most concrete applications. [Adrian Bece](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) walks through using `clamp()` to interpolate font sizes between two viewport bounds, with attention to the math for deriving the preferred slope value and to accessibility concerns around using `rem` units so user font-size preferences are respected. [Utopia](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends this with a graph view that plots an entire fluid modular scale across the min-to-max viewport range, making the relationships between steps visible at a glance.

CSS-native primitives are closing the gap that previously required JavaScript or build tooling. [Pavel Laptev](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) surveys how anchor positioning, scroll-driven animations, view transitions, and native popovers now replace large JS libraries. [Mike Herchel](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) notes that CSS Style Queries have reached Baseline support, letting components react to parent CSS variables as stateful design tokens without Sass or PostCSS. [Preethi Sam](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) shows the `view()` scroll-driven animation function being repurposed to style elements by their proximity to container edges, a kind of spatial awareness that has no breakpoint equivalent.

Progressive enhancement sits adjacent to this. [Sunkanmi Fafowora](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) contrasts JavaScript-heavy custom dropdowns with the CSS `::checkmark` pseudo-element, which handles the same pattern natively where supported, falling back gracefully elsewhere. [Jim Nielsen](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) argues that separate linked HTML pages unified by CSS cross-document view transitions are simpler and more maintainable than JavaScript-driven in-page state, a structural choice that sidesteps many responsive complexity problems entirely.

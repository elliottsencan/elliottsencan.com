---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic layouts, container queries, fluid values, and CSS primitives that
  let components adapt to their own context rather than the page width.
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
compiled_at: '2026-08-11T08:01:49.563Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 667
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
  cost_usd: 0.02151
---
The classic responsive design model -- media queries keyed to viewport widths -- is under sustained pressure from a set of newer CSS capabilities that shift adaptation from the page level to the component level. [Amit Sheen's case against breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) is the clearest statement of this shift: intrinsic layouts, `clamp()` for fluid sizing, container units, and container queries can handle the vast majority of layout adaptation, leaving media queries for genuine device-capability concerns like pointer type or user preference.

Fluid typography sits at the center of this approach. `clamp()` interpolates a font size between a minimum and maximum across a viewport range, removing the stepped jumps that breakpoint-based type scaling produces. [Adrian Bece's treatment of the math](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers how to derive the preferred value from two breakpoint/size pairs, and flags a real accessibility concern: viewport-relative units inside `clamp()` can override a user's browser font-size preference, making `rem`-anchored minimum and maximum values important. [Utopia's graph view](/reading/2026-05/2026-05-05t183935-type-scale-graphs) extends this by plotting an entire fluid modular scale across its min and max viewport extents, making the relationships between steps visible at a glance.

Beyond typography, the broader CSS platform now covers a range of interaction and layout problems that previously required JavaScript. [Pavel Laptev's survey of modern CSS](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) catalogues anchor positioning, scroll-driven animations, view transitions, and native popovers as capabilities that displace large JS libraries. [CSS style queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) add another layer: components can now react to parent CSS custom properties as stateful design tokens, a pattern that previously needed Sass or build tooling. [Boundary-aware styling via the `view()` function](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) pushes further, using scroll-driven animation infrastructure to style elements based on proximity to container edges without any scrolling involved.

Responsive design increasingly means designing systems -- fluid scales, container-relative units, intrinsic grids -- rather than writing rules for discrete breakpoints.

---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward
  intrinsic CSS primitives — fluid sizing, container queries, and native
  platform features — that let layouts and typography adapt without discrete
  breakpoints.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp
  - 2026-04/2026-04-30t231909-the-great-css-expansion
  - 2026-04/2026-04-30t231931-50-best-font-combinations-for-graphic-design
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
compiled_at: 2026-05-03T19:05:58.881Z
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 1818
    output_tokens: 551
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
  cost_usd: 0.013719
---
The classic responsive-design approach relies on viewport breakpoints: pick a set of pixel widths, write different rules for each. Two recent sources argue that default should change. [Amit Sheen's piece on breakpoint-free UI](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case that CSS grid with `auto-fill`/`minmax`, `clamp()`, container units, and container queries handle the vast majority of layout adaptation intrinsically, leaving media queries for genuine device-capability or user-preference concerns like `prefers-reduced-motion` or `hover`. The shift is conceptual: instead of asking "how wide is the viewport," you ask "how much space does this component have."

Typography follows the same arc. [Adrian Bece's walkthrough of `clamp()`](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) covers the math behind setting minimum, preferred, and maximum font sizes in a single declaration. The accessibility wrinkle matters here: viewport-unit-based preferred values break when users increase their browser default font size, so rem-anchored calculations are necessary to keep [fluid type accessible](/wiki/fluid-typography).

Both sources sit inside a broader CSS capability expansion. [Pavel Laptev's overview of modern CSS](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, scroll-driven animations, and view transitions now arrive as platform primitives, reducing dependence on JavaScript libraries that previously patched layout and interaction gaps. Responsive design, in that framing, is one part of CSS reclaiming ground it historically ceded.

The remaining sources here -- [font pairing references](/reading/2026-04/2026-04-30t231931-50-best-font-combinations-for-graphic-design) and [modular Figma layout templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) -- touch adjacent design concerns around visual hierarchy and composition, but don't directly address responsive adaptation mechanics.

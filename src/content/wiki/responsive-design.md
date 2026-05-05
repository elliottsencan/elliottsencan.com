---
title: Responsive design
summary: >-
  Modern responsive design is moving away from viewport breakpoints toward CSS
  intrinsic layout primitives, fluid sizing with clamp(), and container queries
  that let components adapt to their own context rather than the viewport.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp
  - 2026-04/2026-04-30t231909-the-great-css-expansion
  - 2026-04/2026-04-30t231931-50-best-font-combinations-for-graphic-design
  - 2026-05/2026-05-02t145719-micrographics-templates-design-layouts
aliases:
  - css-layout
compiled_at: 2026-05-04T03:36:37.485Z
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2882
    output_tokens: 602
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
  cost_usd: 0.017676
---
Responsive design has traditionally meant adding media query breakpoints that reorganize a layout when the viewport crosses defined thresholds. The approach works but couples layout logic to a global viewport measurement, which breaks down when components are reused in different containers at different sizes.

[Amit Sheen's breakdown of intrinsic CSS](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case that modern CSS primitives, specifically `grid` with `auto-fill`/`auto-fit`, `clamp()` for fluid sizing, container units, and container queries, should be the default responsive engine. Media queries get demoted to signaling device capability and user preference rather than controlling layout at size thresholds. The distinction matters: a component should respond to how much space its parent gives it, not to how wide the browser window happens to be.

[Fluid typography](/wiki/fluid-typography) is one of the clearest wins from this shift. [Adrian Bece's guide to CSS clamp()](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) details how the function accepts a minimum, a preferred viewport-relative value, and a maximum, producing type that scales continuously rather than jumping at breakpoints. Bece also covers the accessibility fix: preferred values should be expressed in `rem` so that browser font-size preferences are respected, not overridden by viewport calculations.

[Pavel Laptev's survey of modern CSS](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) situates these layout primitives inside a broader platform expansion. Features like anchor positioning, view transitions, and scroll-driven animations now handle what JavaScript libraries previously required, reducing dependency weight while keeping the implementation in the same layer as the rest of responsive behavior.

Font choice and visual composition sit adjacent to layout adaptability. [Design Your Way's font pairing collection](/reading/2026-04/2026-04-30t231931-50-best-font-combinations-for-graphic-design) and [Zachary Winterton's micrographic layout templates](/reading/2026-05/2026-05-02t145719-micrographics-templates-design-layouts) address typographic and compositional decisions that apply across breakpoints regardless of the layout method chosen.

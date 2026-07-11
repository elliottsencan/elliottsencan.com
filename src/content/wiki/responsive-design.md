---
title: Responsive design
summary: >-
  Responsive design is shifting away from viewport breakpoints toward intrinsic,
  component-aware CSS — fluid sizing, container queries, and platform primitives
  that let layouts and typography adapt without media-query thresholds.
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
compiled_at: '2026-07-09T23:28:32.511Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3679
    output_tokens: 658
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
  cost_usd: 0.020907
---
The classic responsive design model, built on viewport-width breakpoints and media queries, is under pressure from a more capable CSS platform. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues the breakpoint model was always a workaround: modern CSS gives authors intrinsic layout tools, container queries, and container units so that components adapt to their own available space rather than the viewport's. Media queries survive in this picture, but their scope narrows to genuine device capabilities and user preferences, not layout thresholds.

Typography is a central case. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) details how `clamp()` produces font sizes that scale continuously between two viewport widths, replacing the stepped jumps of breakpoint-keyed type rules. The math maps minimum and maximum font sizes to viewport bounds, and the piece flags an accessibility concern: using `rem`-based clamp values preserves user font-size preferences in a way that `px`-based equivalents do not. [Utopia's type scale graph](/reading/2026-05/2026-05-05t183935-type-scale-graphs) makes this fluid scale legible by plotting every step across the viewport range, revealing whether the relationships within a modular scale hold at all sizes.

The broader CSS platform expansion reinforces the trend. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, scroll-driven animations, view transitions, and native popovers now replace JavaScript libraries that previously handled layout and interaction work. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) extend this further: components can now react to parent CSS custom properties as stateful design tokens, removing the need for preprocessor logic to manage theming and state. Taken together, these features push responsive behavior into the component and property layers rather than the document-width layer.

Structurally, [Jim Nielsen's case for linked HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) touches responsive design obliquely: using CSS cross-document view transitions to stitch separate pages together avoids the JavaScript complexity that often complicates responsive progressive enhancement, keeping each page simple and self-contained.

---
title: Web accessibility
summary: >-
  Web accessibility concerns how design and implementation choices affect users
  across devices, abilities, and preferences, with fluid typography, CSS-native
  controls, and progressive enhancement each carrying distinct accessibility
  implications.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp
  - 2026-04/2026-04-30t230919-dmytro-mezhenskyi-udmezhenskyi-on-reddit
  - 2026-04/2026-04-30t231412-form-model-design-angular-signal-forms
  - 2026-04/2026-04-30t231909-the-great-css-expansion
  - 2026-04/2026-04-30t231931-50-best-font-combinations-for-graphic-design
  - 2026-05/2026-05-05t091632-building-websites-with-llms
  - 2026-05/2026-05-05t183935-type-scale-graphs
  - 2026-05/2026-05-06t163329-multi-stroke-text-effect-in-css
  - >-
    2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with
  - 2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown
  - 2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm
compiled_at: '2026-06-20T12:46:42.710Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4351
    output_tokens: 569
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
  cost_usd: 0.021588
---
Accessibility surfaces repeatedly as a constraint that CSS and typography decisions must account for, not an afterthought layered on after visual design is settled.

Fluid typography is a clear case. Using `clamp()` with `rem`-based values preserves the user's browser font-size preferences, because `rem` is relative to the root font size the user may have configured. [Adrian Bece's guide to fluid typography](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags this explicitly: using `px` in the clamp expression breaks user font-size scaling, making `rem` the accessible choice even when the math is slightly more involved.

At the layout level, [Amit Sheen's argument for breakpoint-free UIs](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reserves media queries specifically for device capabilities and user preferences, including `prefers-reduced-motion` and similar accessibility-relevant preference queries, rather than using them solely for viewport width thresholds. This reframes media queries as primarily an accessibility and capability tool.

On the controls side, [Sunkanmi Fafowora's piece on checkmark UI](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) contrasts the fragile JavaScript-heavy approach to custom dropdowns with the CSS `::checkmark` pseudo-element. The JavaScript approach is not only brittle; it frequently breaks assistive technology because custom interactions implemented in script diverge from native browser semantics. The CSS-native path, where browser support allows, inherits correct semantics automatically, though current support gaps mean progressive enhancement is still required.

Progressive enhancement itself is an accessibility strategy: building on HTML fundamentals before layering JavaScript. [Jim Nielsen's case for separate HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) argues that linked HTML pages unified by CSS view transitions are simpler and more maintainable than JS-powered in-page interactions, and the accessibility implication is that native navigation and browser history semantics come for free.

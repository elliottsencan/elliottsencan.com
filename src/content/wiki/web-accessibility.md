---
title: Web accessibility
summary: >-
  Web accessibility concerns how UI design and implementation choices affect
  users with differing abilities, surfacing in decisions about typography units,
  semantic HTML, progressive enhancement, and platform-native controls.
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
compiled_at: '2026-06-22T02:37:47.044Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4351
    output_tokens: 533
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
  cost_usd: 0.021048
---
Web accessibility is less a discrete checklist than a constraint that runs through ordinary front-end decisions. The clearest recurring example in recent writing is the choice of CSS unit for fluid typography. [Adrian Bece's treatment of CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) makes the case that font sizes should use `rem` rather than `px` as the base unit, because `rem` respects a user's browser font-size preference. A pixel-locked clamp scale silently overrides that preference, making the site illegible to users who have explicitly increased their default text size.

Progressive enhancement is the other axis where accessibility appears. [Sunkanmi Fafowora's piece on checkmarks in custom dropdowns](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) contrasts a JavaScript-heavy approach, which breaks when scripts fail or run slowly, with the CSS `::checkmark` pseudo-element, which layers on top of a functional native control. The argument is structural: building on platform primitives means the baseline experience works for everyone, including assistive technologies, before any enhancement applies.

[Jim Nielsen's case for separate HTML pages over in-page JS interactions](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) runs in the same direction. Native anchor navigation carries accessibility semantics for free; reconstructing that behavior in JavaScript requires explicit ARIA work that is easy to get wrong.

Responsive layout choices intersect here too. [Amit Sheen's argument for intrinsic, container-query-based layouts](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reserves media queries for user preferences such as `prefers-reduced-motion` and `prefers-contrast`, treating those signals as first-class inputs rather than afterthoughts bolted onto a breakpoint system.

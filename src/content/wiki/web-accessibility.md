---
title: Web accessibility
summary: >-
  Web accessibility in CSS and UI contexts concerns how design and
  implementation choices affect users with varying needs, covering font sizing,
  color contrast, user preference media queries, and platform-native semantics.
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
compiled_at: '2026-06-21T20:18:41.395Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4351
    output_tokens: 547
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
  cost_usd: 0.021258
---
Among the sources tagged here, accessibility surfaces most concretely around CSS typography choices. Adrian Bece's piece on fluid typography [fluid clamp implementation](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags a specific concern: when using `clamp()` for font sizes, authors must use `rem` units rather than `px` for the min and max values. Users who increase their default browser font size to compensate for vision difficulties will see no effect if those bounds are hardcoded in pixels. The math for fluid type is otherwise appealing, but ignoring this breaks a core accessibility contract.

Amit Sheen's argument for intrinsic, breakpoint-free layouts [building without breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) touches accessibility through a different angle: media queries should be reserved for device capabilities and user preferences, not layout switching. That framing positions `prefers-reduced-motion`, `prefers-contrast`, and similar preference queries as the appropriate domain of media queries rather than an afterthought bolted onto viewport-based logic.

Sunkanmi Fafowora's look at the CSS `::checkmark` pseudo-element [checkmarks and progressive enhancement](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) makes the accessibility case for progressive enhancement directly: JavaScript-heavy custom dropdowns are fragile and often break assistive technology, whereas native platform elements carry semantic meaning that screen readers understand by default. The newer CSS primitive keeps that semantic baseline intact while still allowing visual customization.

Font loading strategy in Linear's architecture [how Linear achieves speed](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) is adjacent: preloading variable fonts and avoiding layout shift has a readability dimension for users who rely on stable text rendering. The accessibility angle is implicit there, but text stability is part of a usable interface for everyone.

---
title: Web accessibility
summary: >-
  Web accessibility spans technical decisions across CSS, typography, and HTML
  structure that determine whether interfaces remain usable for all people,
  regardless of device, ability, or preference.
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
  - >-
    2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you
compiled_at: '2026-06-22T07:23:15.859Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4351
    output_tokens: 549
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
  cost_usd: 0.021288
last_source_added: '2026-07-15T04:00:58.131Z'
---
Accessibility in web interfaces is not a single feature to bolt on but a consequence of many smaller technical decisions. Two areas where it surfaces repeatedly in CSS and typography work are unit choices and the handling of user preferences.

Fluid typography is a useful example. Using `clamp()` to scale font sizes across viewport widths produces smoother layouts, but the choice of unit matters for accessibility. [Adrian Bece's breakdown of CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) explains that viewport units in the preferred value of `clamp()` do not respond to the browser's base font size setting. Users who increase their default font size in browser preferences to improve readability will see no effect if sizes are expressed purely in `vw`. Using `rem`-based calculations, or mixing `rem` into the fluid formula, preserves that user control. This is not a minor edge case; it is the mechanism by which fluid typography either respects or silently overrides a user's explicit accessibility configuration.

At a layout level, [Amit Sheen's argument for breakpoint-free UIs](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reframes media queries as the appropriate tool for device capabilities and user preferences, such as `prefers-reduced-motion` or `prefers-contrast`, rather than for viewport widths. Reserving media queries for capability and preference queries makes accessibility accommodations more intentional and less likely to be accidentally overridden by layout breakpoints.

Progressive enhancement connects these concerns. [Sunkanmi Fafowora's comparison of custom dropdown checkmarks](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) shows how JavaScript-heavy custom components often degrade badly when scripting is unavailable or slow, while the newer CSS `::checkmark` pseudo-element keeps interactive semantics in the platform layer. The tradeoff is browser support gaps, which makes the case for progressive enhancement as a strategy: deliver accessible baseline behavior first and enhance where supported.

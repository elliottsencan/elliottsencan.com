---
title: Web accessibility
summary: >-
  Web accessibility in CSS and UI design concerns how technical choices — unit
  selection, layout strategy, progressive enhancement — affect users across
  devices, abilities, and preferences.
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
compiled_at: '2026-06-21T18:34:49.627Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4351
    output_tokens: 581
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
  cost_usd: 0.021768
---
Accessibility in frontend work often surfaces as a constraint on otherwise appealing techniques. The clearest example is unit selection in fluid typography: [Adrian Bece's analysis of CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags that using `px` inside `clamp()` breaks browser zoom for users who set a default font size in their preferences, while `rem`-based values respect those settings. The math for deriving preferred values is more complex with `rem`, but the tradeoff is non-negotiable for users who depend on that control.

Progressive enhancement is a closely related axis. [Sunkanmi Fafowora's piece on CSS `::checkmark`](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) frames the choice between JavaScript-heavy custom dropdowns and the emerging CSS pseudo-element explicitly in terms of resilience: the CSS approach degrades gracefully when unsupported, whereas JavaScript-driven solutions tend to break entirely when something goes wrong. The caveat is that `::checkmark` browser support remains incomplete, so the progressive enhancement argument is partly aspirational.

Layout strategy intersects with accessibility too. [Amit Sheen's argument for intrinsic, breakpoint-free layouts](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reserves media queries specifically for device capabilities and user preferences — reduced motion, color scheme, pointer type — rather than viewport size. That framing treats user-preference queries as first-class concerns rather than afterthoughts bolted onto a size-first layout system.

Performance overlaps with accessibility when font loading is involved. [Dennis Brotzky's breakdown of Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) notes font-loading best practices as part of the perceived-performance stack; delayed or layout-shifting fonts create friction that disproportionately affects users on slower connections or older devices.

Across these sources, the pattern is consistent: accessibility is not a separate checklist but an outcome of unit choices, enhancement strategies, and how platform primitives are sequenced.

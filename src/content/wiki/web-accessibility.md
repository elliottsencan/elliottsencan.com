---
title: Web accessibility
summary: >-
  Web accessibility concerns making interfaces usable across a wide range of
  users, devices, and preferences — a concern that cuts through typography,
  layout, CSS architecture, and the fundamental choice of HTML over native apps.
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
  - 2026-07/2026-07-16t052353-boundary-aware-styling-in-css
  - >-
    2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent
compiled_at: '2026-11-10T01:26:53.313Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 781
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
  cost_usd: 0.026346
---
Accessibility in web interfaces is not a checklist appended after design is complete. It surfaces at every layer: the units chosen for typography, the structure of the HTML, how layout responds to context, and whether the platform's native capabilities are used instead of scripted substitutes.

Fluid typography is a clear example. [Adrian Bece's breakdown of CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) highlights a specific accessibility requirement: the preferred value and size limits in `clamp()` must be expressed in `rem` units, not `px`, so that browser font-size preferences set by users are respected. Scaling font size with viewport width in pixels ignores the user's system settings entirely. The [Utopia type scale graph](/reading/2026-05/2026-05-05t183935-type-scale-graphs) makes the relationships in a fluid scale visible, which helps designers catch cases where sizes collapse too close together at small viewports.

Layout decisions carry similar stakes. [Amit Sheen's argument for breakpoint-free UIs](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reserves media queries for device capabilities and user preferences — things like `prefers-reduced-motion` or `prefers-color-scheme` — rather than arbitrary viewport widths. That reframing puts accessibility preferences at the center of what media queries are for.

At the HTML level, the choice of using platform primitives instead of JavaScript-driven alternatives has direct accessibility implications. Pavel Laptev's survey of modern CSS capabilities notes that native popovers, modals, and custom selects carry built-in semantics and keyboard behavior that scripted equivalents must painstakingly reconstruct. [Sunkanmi Fafowora's piece on the CSS `::checkmark` pseudo-element](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) makes this concrete: JavaScript-heavy custom dropdowns are fragile and commonly fail assistive technology, while the native pseudo-element approach enables progressive enhancement — though current browser support gaps mean the tradeoff is not yet fully resolved.

The case for HTML-first architecture connects to accessibility as well. [Jim Nielsen's argument for separate HTML pages over in-page JS interactions](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) and [Dan Q's demonstration of replacing an Android app with a plain webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) both point toward the same principle: the browser's native document model handles focus management, back-button behavior, and screen reader navigation in ways that single-page applications and native apps frequently break and must re-implement. Using the platform as intended is itself an accessibility strategy.

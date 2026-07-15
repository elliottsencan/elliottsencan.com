---
title: Web accessibility
summary: >-
  Web accessibility spans visual, typographic, and structural concerns; recent
  CSS work on fluid type, native form controls, and multi-page architectures
  shows how platform primitives increasingly carry accessibility
  responsibilities that JavaScript once handled poorly.
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
compiled_at: '2026-07-15T10:09:30.405Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4528
    output_tokens: 653
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
  cost_usd: 0.023379
---
Accessibility in web interfaces is not a single discipline but a property that surfaces across layout choices, typographic decisions, form controls, and architectural patterns. Several recent sources treat it as a side-effect of other technical decisions rather than a standalone checklist.

Fluid typography is the clearest case. [Adrian Bece's fluid typography guide](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) warns explicitly that using `px` instead of `rem` in `clamp()` values breaks user-defined browser font size preferences. A reader who has set their default to 20px will not benefit from fluid scaling if the author's values are fixed in pixels. The fix is straightforward but requires deliberate awareness: preferred and boundary values must be expressed in `rem` so the cascade respects user settings.

Structural accessibility connects to layout strategy. [Amit Sheen's breakpoint-free UI argument](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reserves media queries specifically for device capabilities and user preferences such as `prefers-reduced-motion` and `prefers-color-scheme`, treating them as signals about the person rather than about the viewport. That framing positions accessibility features as first-class uses of the media query mechanism.

At the component level, Sunkanmi Fafowora's piece on CSS `::checkmark` frames native form control styling as a progressive enhancement question. JavaScript-driven custom dropdowns have historically broken keyboard navigation and screen reader announcements; the `::checkmark` pseudo-element lets the browser handle the semantics natively, though current support gaps mean the JavaScript fallback cannot yet be dropped.

Architecturally, both [Jim Nielsen's HTML-page-first approach](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) and [Dan Q's app-versus-webpage critique](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) argue that reducing JavaScript in favor of plain HTML reduces the surface area for accessibility failures. Declarative HTML elements carry built-in semantics; replacing them with JavaScript-managed state machines requires re-implementing that semantics manually, and it is rarely done completely.

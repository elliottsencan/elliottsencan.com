---
title: Web accessibility
summary: >-
  Web accessibility covers the design and implementation decisions that make web
  content usable for the widest range of people, with the cited sources touching
  it primarily through fluid typography, progressive enhancement, and semantic
  HTML choices.
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
compiled_at: '2026-10-06T00:00:03.416Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 715
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
  cost_usd: 0.025356
---
Web accessibility in practice is less often a single discipline and more often a constraint that surfaces across decisions about typography, markup, interaction patterns, and layout. The sources here approach it from several angles rather than as a dedicated subject.

The most direct treatment comes from [Adrian Bece's piece on fluid typography](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp), which flags a concrete accessibility hazard: using `px` units in `clamp()` calculations breaks user-initiated browser zoom and text size preferences, because pixel values do not scale with the browser's root font size. The fix is to derive all size values from `rem`, ensuring that users who have set a larger base font size in their browser settings actually get larger text. This is a clear example of an implementation detail that looks cosmetic but carries real accessibility weight.

Progressive enhancement is the other accessibility-adjacent thread. [Sunkanmi Fafowora's piece on CSS `::checkmark`](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) argues that replacing fragile JavaScript-driven custom dropdowns with native CSS pseudo-elements is a progressive enhancement win: browsers that support `::checkmark` get the styled experience, and browsers that do not fall back gracefully rather than breaking. The underlying principle is that leaning on platform primitives reduces the surface area where custom code can produce inaccessible results.

Semantic HTML as a foundation for accessibility runs implicitly through [Jim Nielsen's argument](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) for replacing JS-powered in-page interactions with separate linked HTML pages, and through [Dan Q's observation](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) that an Android app wrapping plain HTML was strictly worse than just serving that HTML as a webpage. Both cases point to the same pattern: JavaScript-heavy or app-wrapped delivery layers add complexity without adding accessibility value, and often subtract it by obscuring the underlying document structure from assistive technology.

[Pavel Laptev's survey of modern CSS capabilities](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) is relevant in the same vein: replacing JavaScript libraries for popovers, modals, and anchor positioning with native CSS and HTML primitives means those components inherit built-in browser accessibility behaviors rather than requiring custom ARIA management.

None of these sources address accessibility as their primary subject. What they collectively illustrate is that many accessibility outcomes are downstream of architectural and implementation choices, and that the platform's native primitives tend to be more accessible by default than the custom abstractions built on top of them.

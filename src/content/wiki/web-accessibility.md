---
title: Web accessibility
summary: >-
  Web accessibility spans semantic HTML, progressive enhancement, and CSS
  techniques that ensure interfaces remain usable regardless of browser
  capability, assistive technology, or network condition.
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
compiled_at: '2026-09-21T21:58:25.508Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 769
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
  cost_usd: 0.026166
---
Web accessibility is less a checklist than a disposition toward robustness: build with the platform first, layer enhancements carefully, and never assume the user's environment matches the development environment.

The progressive enhancement thread runs through several sources here. [Sunkanmi Fafowora at Piccalilli](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) makes the case explicitly in the context of custom dropdown checkmarks: the JavaScript-heavy approach is fragile, while the CSS `::checkmark` pseudo-element enables a progressively enhanced solution that degrades gracefully when browser support is absent. The same logic appears in [Jim Nielsen's argument](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) that separate linked HTML pages, unified by CSS cross-document view transitions, are simpler and more maintainable than JS-powered in-page interactions — native navigation semantics come for free.

Font sizing is a concrete accessibility concern that fluid typography surfaces. [Adrian Bece at Smashing Magazine](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) notes that using `rem` units inside `clamp()` is essential: when a user has set a larger browser default font size, `rem`-based fluid values respect that preference, while `px`-based values do not. This is not a minor implementation detail — it is the difference between a fluid scale that accommodates user preferences and one that overrides them.

Broader layout decisions also carry accessibility implications. [Amit Sheen's piece on breakpoint-free UIs](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that media queries should be reserved for device capabilities and user preferences — reduced motion, contrast preferences, pointer type — rather than overloaded as layout triggers. Separating capability queries from layout queries makes it easier to honor accessibility preferences without those rules being swamped by layout concerns.

[Dan Q's reverse-engineering of a travel app](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) demonstrates what ignoring the platform costs: an Android app wrapping plain HTML over HTTP imposed tracking, ads, and installation friction where a lightweight webpage would have served every user — including those on older devices or limited data connections — without any of that overhead. The web's default accessibility comes from HTML; stripping it away to ship a native wrapper is a regression, not progress.

Performance is part of accessibility too. [Dennis Brotzky's breakdown of Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) covers font-loading best practices alongside service worker precaching and local-first sync — all of which reduce the time before content is readable, which matters most to users on slow connections or low-powered devices.

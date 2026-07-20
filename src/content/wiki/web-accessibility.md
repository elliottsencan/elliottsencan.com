---
title: Web accessibility
summary: >-
  Web accessibility covers the design and technical practices that ensure UIs
  work for all users, appearing across sources on fluid typography, progressive
  enhancement, semantic HTML, and font-loading performance.
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
compiled_at: '2026-07-20T19:49:33.131Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 751
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
  cost_usd: 0.025896
---
Web accessibility rarely appears as a standalone subject in the cited sources; instead it surfaces as a constraint that disciplines other design and engineering decisions.

The clearest direct treatment comes from fluid typography. Adrian Bece's examination of CSS `clamp()` [warns explicitly](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) that mixing `px` and `rem` units in clamp expressions breaks user-configured font scaling. Browser default font sizes are a primary accessibility lever for users with low vision; if the preferred value of a clamp expression is expressed in `px`, scaling the browser's base size has no effect. The recommendation is to calculate preferred values in `rem` or use unit-consistent formulas so that user preferences propagate through the scale.

Progressive enhancement is a second thread. Sunkanmi Fafowora's piece on custom dropdown checkmarks [frames the CSS `::checkmark` pseudo-element](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) as a progressively enhanced alternative to brittle JavaScript implementations, which carry implicit accessibility risks around focus management and keyboard interaction. The tension is that the native CSS path is more accessible in principle but still has incomplete browser support, so the fragile JS approach remains necessary as a fallback.

Font loading intersects accessibility through readability and performance. The Linear performance breakdown [notes](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) that Inter is served as a variable woff2 with `font-display: optional`, a strategy that prevents invisible or flash-of-unstyled text, both of which degrade readability for users with cognitive or perceptual differences.

The broader case for HTML-first architecture carries implicit accessibility weight. Jim Nielsen argues that replacing JS-powered in-page interactions with [separate linked HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) reduces complexity, and plain HTML navigation is inherently more accessible than custom JS routing. Dan Q's reversal of an Android app into a lightweight webpage [makes a parallel point](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you): the app wrapper imposed tracking and friction without functional gain, and the simpler HTML version is easier for all users, including those on assistive technology.

Amit Sheen's argument for intrinsic layouts [also touches accessibility indirectly](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints): reserving media queries for device capabilities and user preferences, rather than using them purely for visual breakpoints, keeps preference-based queries, such as `prefers-reduced-motion` or `prefers-contrast`, as first-class concerns rather than afterthoughts.

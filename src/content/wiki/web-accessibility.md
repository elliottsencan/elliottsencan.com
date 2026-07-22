---
title: Web accessibility
summary: >-
  Web accessibility encompasses design and engineering practices that ensure
  interfaces work for all users, surfacing through concerns about fluid
  typography units, progressive enhancement, semantic HTML, and platform-native
  controls.
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
compiled_at: '2026-07-22T06:00:14.965Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 758
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
  cost_usd: 0.026001
---
Web accessibility is less a discrete feature than a baseline constraint that shapes decisions across typography, layout, interaction, and architecture. It surfaces across multiple concerns in CSS and HTML practice, often quietly.

Fluid typography is a clear example. Using `vw`-based or viewport-relative values for font sizes can break accessibility because users who increase their browser's base font size (a common assistive adjustment) see no effect when sizes are hardcoded in viewport units. [Adrian Bece's breakdown of CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) addresses this directly: the preferred value inside `clamp()` should use `rem`-relative math rather than raw viewport units, so that user font preferences are respected while still achieving fluid scaling between breakpoints. The Utopia type scale tooling [discussed by Trys Mudford](/reading/2026-05/2026-05-05t183935-type-scale-graphs) builds on the same principle, visualizing fluid scales that can be constructed with accessible units.

At the interaction level, progressive enhancement is the practice of building baseline functionality in HTML and CSS, then layering behavior where the platform supports it. [Sunkanmi Fafowora's piece on checkmarks in UI](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) frames the modern CSS `::checkmark` pseudo-element as an accessibility win over JavaScript-driven custom controls, which are fragile and often fail to communicate state to assistive technologies. The caveat is browser support gaps, which is precisely where progressive enhancement disciplines the approach: the JavaScript fallback must work before the CSS enhancement is added, not the other way around.

Semantic HTML is the substrate underneath both. [Dan Q's reversal of an Android app back into a webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) and [Jim Nielsen's argument for separate linked HTML pages over JS-driven in-page state](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) both point toward the same accessibility implication: plain HTML, correctly structured, ships with keyboard navigation, link semantics, and screen reader compatibility by default. Wrapping equivalent content in a native app or a JavaScript-rendered single-page shell strips those affordances and requires deliberate re-implementation.

Responsive layout choices also carry accessibility implications. [Amit Sheen's case for intrinsic layouts without breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) treats media queries for user preferences (reduced motion, contrast, pointer type) as the appropriate scope for media queries, distinct from layout queries. That framing is relevant to accessibility because preference-based media queries are a primary mechanism for honoring user needs declared at the OS or browser level.

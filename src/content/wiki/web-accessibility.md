---
title: Web accessibility
summary: >-
  Web accessibility spans semantic HTML, progressive enhancement, and CSS
  techniques that ensure interfaces remain usable regardless of browser support,
  device capability, or user preference.
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
compiled_at: '2026-11-17T01:50:38.045Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 827
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
  cost_usd: 0.027036
---
Accessibility in web interfaces is less a checklist than a consequence of design decisions made at every layer of the stack. Several recurring themes emerge across sources: preferring platform primitives over JavaScript abstractions, using CSS units that respect user settings, and building with progressive enhancement so degraded environments still work.

Fluid typography is a concrete area where accessibility concerns shape implementation choices. [Adrian Bece's guide to CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags that fluid type must use `rem`-based minimum and maximum values rather than `px`, so that users who have increased their browser's default font size see that preference honored. Clamp calculations that anchor to `px` silently override that setting. [Trys Mudford's Utopia graph view](/reading/2026-05/2026-05-05t183935-type-scale-graphs) makes the cross-viewport behavior of a fluid scale visible, which helps designers catch cases where sizes collapse too small at narrow widths.

Progressive enhancement surfaces as a structural accessibility strategy. [Sunkanmi Fafowora's piece on custom dropdown checkmarks](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) contrasts the brittle JavaScript approach to custom UI controls with the CSS `::checkmark` pseudo-element, which layers capability on top of native semantics rather than replacing them. The tradeoff is current browser support gaps, but the native-first path fails more gracefully. [Jim Nielsen's argument for separate HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) makes a related point: linked documents with CSS view transitions are simpler and more resilient than JS-managed in-page state, with fewer failure modes for users on constrained browsers.

Replacing JavaScript with CSS primitives has accessibility implications beyond performance. [Pavel Laptev's survey of modern CSS capabilities](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) notes that platform-native elements for popovers, modals, and anchor positioning carry built-in focus management and ARIA semantics that custom JS solutions must laboriously reconstruct. Dropping those libraries removes hundreds of kilobytes but also removes the gap between the control and its native accessibility model.

Layout decisions also affect accessibility. [Amit Sheen's case for intrinsic layouts over breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) explicitly frames media queries for user preferences, such as `prefers-reduced-motion` and `prefers-contrast`, as the remaining appropriate use for media queries once layout concerns move to container queries and fluid values. That framing positions accessibility preferences as a first-class concern rather than an afterthought layered on top of a viewport-based system.

[Dennis Brotzky's breakdown of Linear's architecture](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) touches on font-loading practices that intersect with accessibility, noting that variable fonts served with correct preloading prevent flash-of-invisible-text states that can disorient users relying on consistent page rendering.

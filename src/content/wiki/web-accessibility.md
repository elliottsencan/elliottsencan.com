---
title: Web accessibility
summary: >-
  Web accessibility concerns how design and implementation choices affect users
  across devices, abilities, and contexts, with modern CSS and semantic HTML
  increasingly providing accessible foundations without additional JavaScript
  overhead.
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
compiled_at: '2026-11-24T04:04:18.796Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 756
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
  cost_usd: 0.025971
---
Web accessibility sits at the intersection of technical decisions and user impact. The sources here approach it obliquely rather than head-on, but several converge on a common argument: the platform itself, used correctly, tends to be more accessible than the abstractions layered on top of it.

Fluid typography is a concrete example. [Adrian Bece's guide to CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags a critical accessibility concern with fluid sizing: using `px` units instead of `rem` for the minimum and maximum values in a `clamp()` expression breaks browser text-scaling for users who have changed their default font size. `rem`-based bounds respect user preferences; `px`-based bounds ignore them. This is a low-visibility bug that only surfaces for users who rely on font scaling as an accommodation.

At the layout level, [Amit Sheen argues](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) that reserving media queries for device capabilities and user preferences, rather than arbitrary viewport widths, produces UIs that respond correctly to accessibility preferences like `prefers-reduced-motion` or `prefers-contrast`. Container queries and intrinsic layouts shift the concern to the component, which also makes accessible behavior more predictable across contexts.

The case for semantic HTML and progressive enhancement appears directly in [Sunkanmi Fafowora's piece on custom dropdown checkmarks](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with). The JavaScript-heavy approach to custom `<select>` checkmarks introduces fragility and accessibility gaps; the native CSS `::checkmark` pseudo-element builds on existing browser semantics, avoiding the ARIA scaffolding required to make a JavaScript-driven equivalent accessible. The tradeoff is current browser support, but the direction is clear.

[Jim Nielsen's argument for separate linked HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) over JS-powered in-page interactions is accessibility-adjacent: standard navigation, back-button behavior, and focus management all work correctly with plain HTML in ways that require deliberate effort to replicate in JavaScript-heavy single-page applications. Similarly, [Dan Q's deconstruction of an Android app](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) that served plain HTML over HTTP illustrates the access cost of unnecessary app wrappers: users without compatible Android versions, storage space, or willingness to install an app are simply excluded.

The through-line across these sources is that accessibility is frequently a downstream consequence of earlier architectural choices, not a checklist appended at the end. Using `rem` units, semantic HTML, platform-native controls, and standard navigation patterns builds in correct behavior for more users by default.

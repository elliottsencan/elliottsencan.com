---
title: Web accessibility
summary: >-
  Web accessibility concerns how design and implementation choices affect
  usability across devices, abilities, and preferences — a thread running
  through fluid typography, progressive enhancement, semantic HTML, and
  font-loading strategy.
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
compiled_at: '2026-08-13T21:20:43.047Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 720
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
  cost_usd: 0.025431
---
Accessibility in web development is rarely a single checkbox. It surfaces across layout decisions, typography choices, how JavaScript is loaded, and whether a UI degrades gracefully when a feature is unsupported.

Fluid typography is one area where accessibility constraints are concrete and technical. [Adrian Bece's treatment of CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags a specific trap: using `px` units in `clamp()` expressions overrides user-defined font size preferences in the browser, because pixel values are absolute. Switching to `rem` preserves those preferences. The math for converting breakpoint-based sizes to fluid `clamp()` values is straightforward, but the unit choice determines whether the result respects user settings at all.

Progressive enhancement is a closely related concern. [Sunkanmi Fafowora on the CSS `::checkmark` pseudo-element](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) argues that the modern CSS-native approach to custom dropdown checkmarks is preferable to fragile JavaScript implementations, partly because it enables the browser to handle the feature natively and degrade predictably where support is absent. The caveat is current browser support gaps, which means progressive enhancement remains the safe strategy rather than full reliance on the new pseudo-element.

Semantic, minimal HTML also has a role. [Jim Nielsen's argument](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) for separate linked HTML pages over JavaScript-powered in-page interactions points, implicitly, to accessibility: standard page navigation, browser history, and focus management all work by default when you use actual links and page loads rather than client-side routing.

Font loading affects perceived performance, but also readability during load. [Linear's technical breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) covers font-loading best practices as part of its performance architecture. Minimizing flash-of-unstyled or invisible text reduces the window in which content is either unreadable or layout-shifted, both of which affect users with cognitive or visual sensitivities.

The broader frontend complexity problem has accessibility implications too. [David Poblador's historical walkthrough](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent) of how the frontend stack grew from plain HTML to 44 layers implicitly tracks how each abstraction layer can distance developers from the platform primitives that accessibility depends on. When CSS or HTML handles something natively, assistive technologies typically get it for free. When JavaScript reimplements it, that guarantee disappears.

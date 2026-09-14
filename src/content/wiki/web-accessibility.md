---
title: Web accessibility
summary: >-
  Web accessibility concerns how interfaces remain usable across the full range
  of human ability, device capability, and context — touching typography,
  layout, progressive enhancement, and the platform primitives that underpin
  each.
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
compiled_at: '2026-09-14T21:44:21.147Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 873
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
  cost_usd: 0.027726
---
Web accessibility is less a single checklist than a set of intersecting concerns: legible text at any viewport size, controls that work without JavaScript, and layouts that don't assume a particular device or pointer type.

Fluid typography is one concrete intersection. When font sizes scale continuously with viewport width using `clamp()`, they can violate accessibility expectations if the minimum or maximum values are set too small — and critically, if viewport-relative units (`vw`) are used instead of `rem`, user browser font-size preferences are ignored entirely. [Adrian Bece's treatment of CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) addresses this directly, recommending rem-based calculations so that OS and browser font-size settings are respected. The Utopia type scale tooling [documented by Trys Mudford](/reading/2026-05/2026-05-05t183935-type-scale-graphs) makes those fluid scale relationships visible, which helps designers spot when minimum sizes fall below readable thresholds.

Layout accessibility connects to the same principle. [Amit Sheen's breakpoint-free UI argument](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reserves media queries specifically for device capabilities and user preferences — `prefers-reduced-motion`, `prefers-color-scheme`, and similar — rather than treating them purely as viewport-width switches. That framing keeps accessibility-relevant signals in the layer designed to carry them.

Progressive enhancement is the structural principle underneath much of this. [Sunkanmi Fafowora's piece on dropdown checkmarks](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) shows how relying on JavaScript for a UI affordance as basic as a checkmark creates fragility; the CSS `::checkmark` pseudo-element offers a platform-native path, though browser support remains incomplete. Jim Nielsen's argument for [separate linked HTML pages over JS-driven in-page transitions](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) extends the same logic: native browser navigation is inherently more accessible than reconstructed navigation in JavaScript, and view transitions can provide the visual continuity without sacrificing the baseline.

Platform primitives matter here because they carry built-in accessibility semantics. [Pavel Laptev's survey of modern CSS](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) notes that native popovers, modals, and anchor positioning replace JavaScript libraries that frequently shipped without proper ARIA roles or keyboard handling. Replacing those libraries with browser-native elements recovers the accessibility behavior the platform provides for free.

Font loading also has an accessibility dimension, though it is often framed as a performance concern. [Dennis Brotzky's Linear breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) notes font-loading best practices as part of perceived performance; invisible or shifting text during load is a real usability problem, particularly for users with cognitive load sensitivities.

Taken together, the recurring pattern is that accessibility is most durable when it rests on platform defaults — semantic HTML, CSS-native controls, rem units, user-preference media queries — rather than on JavaScript layers that must independently reimplement what the browser already knows how to do.

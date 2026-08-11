---
title: Web accessibility
summary: >-
  Web accessibility encompasses design and engineering practices that keep
  interfaces usable regardless of device, input method, or browser capability —
  spanning fluid layouts, progressive enhancement, and platform-native HTML
  semantics.
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
compiled_at: '2026-08-11T05:25:11.250Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 858
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
  cost_usd: 0.027501
---
Web accessibility is less a checklist than a design orientation: build interfaces that work for the widest range of users and contexts without requiring JavaScript to be present, a specific viewport size to be assumed, or a particular browser feature to be available.

Fluid typography is one concrete expression of this. Using `clamp()` to interpolate font sizes between two viewport extremes avoids the step-changes of breakpoint-based scaling, but the implementation carries an accessibility caveat [Adrian Bece](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags directly: preferred values must use `rem`-based units so that users who have set a browser font size preference see their choice respected. Pixel values inside `clamp()` override that preference and break the contract. The Utopia type scale graph [Trys Mudford](/reading/2026-05/2026-05-05t183935-type-scale-graphs) illustrates how visualizing the full fluid scale helps designers catch outliers before they ship.

Layout follows the same logic. Amit Sheen [argues](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) that viewport breakpoints should be reserved for device capabilities and user preferences — media queries for `prefers-reduced-motion`, `prefers-color-scheme`, and similar — while intrinsic sizing and container queries handle component-level adaptation. That framing treats accessibility preferences as the primary use for media queries, not viewport width.

Progressive enhancement is the architectural form of the same idea. Sunkanmi Fafowora [contrasts](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) the fragile JavaScript approach to custom dropdown checkmarks with the CSS `::checkmark` pseudo-element, noting that the native path degrades more gracefully even where browser support is incomplete. Jim Nielsen [makes the broader point](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) that replacing JS-driven in-page interactions with plain linked HTML pages is often simpler and inherently more accessible, since the platform handles navigation state, focus management, and back-button behavior without custom code.

The CSS platform itself has expanded to the point where many previously JavaScript-dependent patterns — popovers, modals, anchor positioning, scroll-driven animations — now have native implementations [Pavel Laptev](/reading/2026-04/2026-04-30t231909-the-great-css-expansion). Native implementations tend to carry built-in accessibility semantics that custom JavaScript solutions have to reconstruct manually, so this shift has compounding benefits. Dan Q's reverse-engineering of a travel app [underscores](/reading/2026-07/2026-07-16t052353-boundary-aware-styling-in-css) the cost when developers choose app delivery over the web: users inherit tracking, friction, and platform lock-in that a lightweight HTML page avoids entirely.

Performance is part of accessibility too. Linear's architecture [described by Dennis Brotzky](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) includes font-loading best practices alongside IndexedDB sync and service worker precaching — font loading directly affects perceived responsiveness and text readability during load, especially on slower connections.

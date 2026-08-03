---
title: Web accessibility
summary: >-
  Web accessibility concerns how well interfaces serve all users regardless of
  ability or context, touching font sizing, semantic HTML, progressive
  enhancement, and platform-native primitives that reduce fragile JavaScript
  dependencies.
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
compiled_at: '2026-08-03T19:41:21.485Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 834
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
  cost_usd: 0.027141
---
Web accessibility surfaces across front-end concerns that might look unrelated until you trace what they share: every decision about typography sizing, markup structure, CSS primitives, or JavaScript dependency either broadens or narrows who can use an interface.

Fluid typography is a concrete example. Using `clamp()` with `rem` units rather than `px` is not purely aesthetic; [Adrian Bece's treatment of CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) calls out that basing minimum and preferred font sizes on `rem` respects the user's browser font-size preference, while `px`-based values silently override it. A user who has set their browser default to 20px gets that preference honored in a `rem` system and ignored in a `px` one. The Utopia graph tool [discussed by Trys Mudford](/reading/2026-05/2026-05-05t183935-type-scale-graphs) helps designers see at a glance whether their fluid scale remains readable at both ends of the viewport range.

Progressive enhancement is a related thread. [Sunkanmi Fafowora on the CSS `::checkmark` pseudo-element](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) frames the entire argument around accessibility risk: JavaScript-heavy custom dropdowns frequently break for keyboard and assistive-technology users when the script fails or hasn't loaded. The CSS-native approach layers a visual enhancement on top of a functional, accessible base element, so the fallback is already correct.

Reducing JavaScript surface area is itself an accessibility strategy, because JavaScript is the layer most likely to fail, block rendering, or produce focus-management bugs. [Jim Nielsen's argument for separate HTML pages over in-page JS interactions](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) and [Dan Q's observation that a travel app was simply serving HTML over HTTP](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) both land on the same point: the lightest delivery mechanism is also the most reliably navigable by screen readers, keyboard users, and low-powered devices.

On the CSS side, [Pavel Laptev's survey of modern CSS capabilities](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, popovers, and native modals now ship in browsers without JavaScript. Native modal and popover implementations come with built-in focus trapping and ARIA semantics that JavaScript polyfills historically got wrong or omitted. Replacing those libraries is therefore an accessibility improvement, not just a performance one.

Media queries for user preferences, as [Amit Sheen describes in the breakpoint-free layout article](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints), are the appropriate remaining use for media queries once layout is handled intrinsically. `prefers-reduced-motion`, `prefers-color-scheme`, and `prefers-contrast` are user accessibility signals that CSS can honor directly, without JavaScript reading them at runtime.

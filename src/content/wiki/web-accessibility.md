---
title: Web accessibility
summary: >-
  Web accessibility covers the design and implementation practices that make UIs
  usable across devices, input methods, and user needs, with modern CSS reducing
  the JavaScript-heavy patterns that historically created accessibility gaps.
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
compiled_at: '2026-08-30T06:01:03.854Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 790
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
  cost_usd: 0.026481
---
Web accessibility is the practice of building UIs that work for the widest possible range of users and contexts. Several converging trends in modern CSS and HTML make this easier to achieve without the fragile JavaScript workarounds that historically introduced accessibility failures.

Fluid typography is one concrete area. Using `clamp()` to scale type between minimum and maximum sizes respects user preferences when implemented with `rem` units rather than `px` [Adrian Bece](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp). A viewport-based `px` approach breaks user agent font-size overrides, which is a direct accessibility violation; the `rem`-based fluid approach preserves that control. Utopia's type scale graph tools help designers reason about these fluid scales across viewports [Trys Mudford](/reading/2026-05/2026-05-05t183935-type-scale-graphs).

Layout decisions carry similar weight. Moving from fixed breakpoints to intrinsic layouts using container queries and container units means components respond to their own available space rather than the viewport [Amit Sheen](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints). This approach also keeps media queries free for device-capability and user-preference queries, the place where accessibility-relevant preferences like `prefers-reduced-motion` or `prefers-contrast` live.

On the interaction side, the shift from JavaScript-heavy UI patterns to CSS-native primitives closes several accessibility gaps. Native HTML elements carry implicit ARIA roles and keyboard behavior that custom JavaScript components must laboriously reimplement and maintain. Pavel Laptev documents how modern CSS now handles anchor positioning, popovers, modals, and custom selects natively [Pavel Laptev](/reading/2026-04/2026-04-30t231909-the-great-css-expansion). Sunkanmi Fafowora makes the progressive-enhancement argument explicit for custom dropdown checkmarks: the CSS `::checkmark` pseudo-element, once browser support matures, removes the need for JavaScript that breaks when scripting is unavailable or slow [Sunkanmi Fafowora](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with).

The broader architectural case connects here. Jim Nielsen argues that replacing JavaScript-driven in-page state with separate HTML pages linked by CSS view transitions produces UIs that are simpler and more resilient [Jim Nielsen](/reading/2026-05/2026-05-05t091632-building-websites-with-llms). Dan Q reinforces this from a different angle: a travel app delivering plain HTML over HTTP was replaced by a lightweight webpage with no tracking and better performance [Dan Q](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you). Both examples point to the same pattern — HTML-first approaches tend to inherit platform accessibility behaviors for free, while JavaScript-heavy equivalents must reconstruct them deliberately and imperfectly.

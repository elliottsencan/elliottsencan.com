---
title: Web accessibility
summary: >-
  Web accessibility covers how design and implementation choices determine
  whether interfaces work for all users, touching fluid typography, progressive
  enhancement, semantic HTML, and platform primitives.
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
compiled_at: '2026-08-03T10:13:38.635Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 788
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
  cost_usd: 0.026451
---
Web accessibility is not a discrete feature layer added after design is complete. It runs through decisions about typography, layout, interaction patterns, and how much of an interface depends on JavaScript to function at all.

Fluid typography is one area where accessibility stakes are concrete. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) notes that using `rem`-based min and max values inside `clamp()` is essential for respecting user font-size preferences set in the browser. Pixel values bypass those preferences entirely, meaning a user who has configured larger text in their OS or browser settings gets overridden. The article distinguishes this from a stylistic concern: it is a functional barrier for users with low vision.

Progressive enhancement is a closely related principle. [Navigating the age-old problem of checkmarks in UI with progressive enhancement](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) argues that the JavaScript-heavy approach to custom dropdown checkmarks is fragile for users whose environments do not execute JS reliably, and that the CSS `::checkmark` pseudo-element represents a platform-native path that degrades more gracefully, even if its browser support is currently incomplete.

Semantic HTML and minimal JavaScript surface elsewhere. [Jim Nielsen](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) argues that separate linked HTML pages unified by CSS view transitions are simpler to build and maintain than in-page JavaScript interactions, and the accessibility implication is direct: standard anchor navigation works with screen readers and keyboard users without additional instrumentation. [Dan Q](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) makes the same argument from a different angle, showing that replacing an Android app with a plain webpage removed tracking and reduced friction for all users, not just those with assistive needs.

Layout decisions carry accessibility weight too. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reserves media queries for device capabilities and user preferences specifically, rather than viewport width. That framing positions `prefers-reduced-motion`, `prefers-contrast`, and similar media features as first-class layout inputs rather than afterthoughts, which is structurally an accessibility argument about respecting user-declared preferences.

Font loading affects perceived accessibility as well. [How Linear achieves its speed](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) notes font-loading best practices as part of a performance architecture; invisible or flashing text during font swap is a usability issue that disproportionately affects users on slower connections or lower-powered devices.

The thread across these sources is that accessibility outcomes follow from the choice of primitives. Platform HTML, CSS custom properties, and fluid units tend to preserve user preferences automatically. JavaScript-dependent or pixel-fixed implementations tend to override them, often silently.

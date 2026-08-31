---
title: Web accessibility
summary: >-
  Web accessibility concerns how design and technical decisions affect users
  across different abilities, devices, and preferences, with modern CSS and HTML
  techniques increasingly enabling inclusive defaults without extra engineering
  effort.
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
compiled_at: '2026-08-31T22:42:24.728Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 731
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
  cost_usd: 0.025596
---
Web accessibility sits at the intersection of design choices and technical implementation. Several of the tagged sources approach it indirectly, through choices that affect readability, usability, and device compatibility rather than through explicit accessibility auditing.

Fluid typography is one area where accessibility implications are concrete. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) specifically flags that using `rem` units inside `clamp()` is critical for honoring user-defined browser font size settings. Swapping `rem` for `px` in the preferred value breaks this: text no longer scales when a user increases their default font size, which fails a basic accessibility contract. The same source notes that fluid type can reduce cognitive load around breakpoints while staying within WCAG-compatible size ranges when the math is done carefully.

Layout strategy carries its own accessibility surface. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that media queries should be reserved for device capabilities and user preferences, not viewport width alone. This framing puts accessibility-oriented queries, such as `prefers-reduced-motion` or `prefers-contrast`, back into their proper role as first-class layout signals rather than afterthoughts tacked onto a breakpoint system.

At the HTML level, [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) and [Your App Could Have Been a Webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) both point toward the same principle: leaning on plain linked HTML pages rather than JavaScript-heavy single-page interactions tends to produce documents that are more navigable by assistive technologies and more resilient across device capabilities. The second source makes this concrete by stripping a travel app down to a static webpage, shedding tracking and ads in the process.

Progressive enhancement is the explicit frame in Navigating the age-old problem of checkmarks in UI, which contrasts fragile JavaScript-driven custom dropdowns with the CSS `::checkmark` pseudo-element. The CSS approach degrades gracefully where browser support is absent, whereas the JavaScript path often creates components that are opaque to screen readers and keyboard navigation. Current browser support gaps mean neither approach is complete yet, but the trajectory favors the platform primitive.

Taken together, these sources suggest that many accessibility wins come not from bolt-on remediation but from defaulting to semantic HTML, respecting user preferences through CSS media features, and sizing text in units that honor browser-level font scaling.

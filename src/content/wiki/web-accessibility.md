---
title: Web accessibility
summary: >-
  Web accessibility spans semantic HTML, progressive enhancement, and inclusive
  design choices that ensure interfaces remain usable regardless of browser
  capability, assistive technology, or network condition.
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
compiled_at: '2026-09-28T23:12:30.269Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 668
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
  cost_usd: 0.024651
---
Web accessibility in frontend practice is less a checklist than a consequence of how decisions compound. The sources here touch it from several angles: typography legibility, progressive enhancement, platform-native HTML, and the cost of JavaScript-heavy approaches.

Fluid typography raises a concrete accessibility concern: using `px` units inside `clamp()` overrides user font-size preferences set at the browser or OS level. [Adrian Bece's treatment of CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) argues that `rem`-based minimum and maximum values are necessary to respect those preferences, since `rem` scales with the user's root font size while `px` does not. This is one of the clearest cases where a typographic implementation choice has a direct accessibility consequence.

Progressive enhancement is another thread. [Sunkanmi Fafowora's piece on dropdown checkmarks](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) contrasts a brittle JavaScript-driven approach with the CSS `::checkmark` pseudo-element, noting that the platform-native path enables progressive enhancement but carries current browser support gaps. The argument is that starting from what the browser offers natively, and layering enhancement on top, produces more resilient interfaces than patching behavior with JavaScript.

That same logic underpins [Jim Nielsen's case for separate linked HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) over JS-powered in-page interactions. Plain HTML pages connected by links are inherently accessible to crawlers, screen readers, and low-capability browsers; JavaScript interactions are not. CSS view transitions can supply the progressive enhancement layer without making the base experience dependent on script execution.

[Dan Q's reverse-engineering of a travel itinerary app](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) makes a related point from a different direction: wrapping plain HTML content in a native app imposes download cost, tracking, and ads on users who would be equally served by a webpage. The accessibility framing here is about reach and friction rather than assistive technology specifically.

Taken together, the pattern across these sources is that accessibility tends to improve when developers reach for platform primitives first. Semantic HTML, `rem`-based fluid type, native form controls, and multi-page navigation are each more accessible by default than their JavaScript-heavy counterparts, and each requires deliberate effort to make less accessible.

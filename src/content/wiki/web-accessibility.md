---
title: Web accessibility
summary: >-
  Web accessibility spans semantic HTML, progressive enhancement, and CSS-native
  patterns that ensure interfaces work for all users regardless of device,
  capability, or assistive technology.
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
compiled_at: '2026-10-19T22:16:11.610Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 701
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
  cost_usd: 0.025146
---
Accessibility in web interfaces is less a checklist than a consequence of architectural choices made earlier in the stack. Several sources here converge on a shared principle: when you lean on platform primitives rather than JavaScript abstractions, accessibility often follows without extra effort.

[The Descent](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent) traces how the accretion of frameworks and build tools pulled developers away from native HTML and CSS, each layer adding indirection that makes accessible outcomes harder to guarantee. The corrective impulse appears in multiple places. [Dan Q](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) reverse-engineered an Android app serving plain HTML and replaced it with a static webpage, stripping tracking and unnecessary complexity; the result is inherently more accessible because it relies on browser-native rendering rather than a custom app shell. [Jim Nielsen](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) makes a related point: replacing JavaScript-driven in-page interactions with separate linked HTML pages reduces the surface area where accessibility can break.

CSS-native solutions carry the same implication. [The Great CSS Expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents how anchor positioning, native popovers, and custom selects are now platform primitives, replacing JavaScript libraries that frequently shipped inaccessible implementations. The checkmark problem illustrates this concretely: [Sunkanmi Fafowora](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) contrasts the fragile, JavaScript-heavy approach to dropdown checkmarks with the CSS `::checkmark` pseudo-element, which enables progressive enhancement but currently has limited browser support, a tension the article names rather than papers over.

Fluid typography introduces its own accessibility dimension. [Adrian Bece](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) notes that using `px` units inside `clamp()` breaks user font-size preferences set in the browser, because pixel values do not scale with the root font size. Using `rem`-based values preserves that user control. This is one of the cleaner examples of how implementation details in otherwise aesthetic decisions carry real accessibility consequences.

Progressive enhancement runs through most of these sources as a method rather than a philosophy: build on what the platform gives you, add complexity only where needed, and the baseline experience remains functional for the widest range of users and devices.

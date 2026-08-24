---
title: Web accessibility
summary: >-
  Web accessibility concerns how design and implementation choices affect
  whether UIs work for everyone — covering semantic structure, user preference
  support, font sizing, progressive enhancement, and platform-native elements
  over custom JavaScript.
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
compiled_at: '2026-08-24T18:55:59.663Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 712
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
  cost_usd: 0.025311
---
Web accessibility cuts across visual design, markup choices, and interaction patterns. Several of the sources here treat it as a constraint that shapes how CSS features should be used rather than a separate checklist to satisfy after the fact.

Fluid typography is the clearest example. Using `clamp()` with `rem` units matters because users who increase their browser's default font size expect that preference to be respected. [Adrian Bece's breakdown of CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags that `px`-based clamp values ignore those user settings entirely, making rem the correct unit for accessible fluid type. The [Utopia graph view](/reading/2026-05/2026-05-05t183935-type-scale-graphs) reinforces this by giving designers a way to see how sizes behave across the full viewport range, making it easier to catch scales that collapse too small at narrow widths.

Progressive enhancement is another throughline. [Sunkanmi Fafowora's piece on custom checkmarks](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) argues that the new CSS `::checkmark` pseudo-element is the accessible path forward for dropdown UI, because it keeps semantics in the platform rather than rebuilding them in JavaScript. The trade-off is current browser support gaps, so progressive enhancement means the baseline still needs to work.

The broader push toward platform primitives connects here too. [Pavel Laptev's survey of modern CSS capabilities](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) notes that native popovers, modals, and anchor positioning carry built-in accessibility behaviors that JavaScript-based equivalents have to reconstruct manually, often imperfectly. Similarly, [Dan Q's reversal of an app back into a webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) and [Jim Nielsen's argument for separate HTML pages over JS-powered interactions](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) both point to semantic, navigable HTML as the more accessible default, with JavaScript added only where it genuinely improves the experience.

[Amit Sheen's case for intrinsic layouts](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reserves media queries for device capabilities and user preferences specifically, which includes prefers-reduced-motion and other accessibility-relevant signals. Treating those queries as the right place for preference-driven styling, rather than viewport hacks, is a structural accessibility decision.

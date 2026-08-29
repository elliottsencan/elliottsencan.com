---
title: Web accessibility
summary: >-
  Web accessibility covers the design and technical practices that make the web
  usable by everyone, touching fluid typography, progressive enhancement,
  semantic HTML, and the growing role of native CSS and platform primitives in
  reducing unnecessary complexity.
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
compiled_at: '2026-08-29T20:23:39.195Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 771
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
  cost_usd: 0.026196
---
Web accessibility is not a single technique but a set of overlapping concerns that run through typography, interaction design, markup structure, and the architectural choices that determine how much JavaScript ends up between a user and their content.

Fluid typography is one of the more concrete accessibility touchpoints. [Bece's guide to CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags a specific hazard: using `px` units in `clamp()` instead of `rem` breaks user-configured font size preferences in the browser, because pixel values ignore the root font size the user has set. Rem-based clamp values respect those preferences. The [Utopia type scale graph](/reading/2026-05/2026-05-05t183935-type-scale-graphs) reinforces this by making the relationships between fluid sizes visible, helping designers catch scales that compress too aggressively at small viewports.

Progressive enhancement is another axis. [Fafowora's piece on checkmarks](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) contrasts a brittle JavaScript-heavy approach to custom dropdown UI with the CSS `::checkmark` pseudo-element, arguing that leaning on platform primitives produces more resilient interfaces, though browser support gaps still require fallbacks. The same instinct toward platform primitives appears in [Laptev's overview of modern CSS capabilities](/reading/2026-04/2026-04-30t231909-the-great-css-expansion), where native anchor positioning, popovers, and modals replace JavaScript libraries that often carry accessibility bugs or require additional ARIA wiring to work correctly.

Semantic HTML and reduced JavaScript dependency intersect with accessibility more broadly. [Jim Nielsen's argument](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) for replacing in-page JS interactions with separate linked HTML pages notes that this approach is simpler to build and maintain, and the same structural simplicity tends to produce better baseline accessibility. [Dan Q's dissection of an Android app](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) that was just serving plain HTML over HTTP makes the point from another angle: wrapping web content in an app layer adds friction without adding capability, and often strips accessibility features the browser would have provided for free.

Layout practices also carry accessibility implications. [Sheen's case for intrinsic layouts without breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that reserving media queries for user preferences, such as `prefers-reduced-motion` or `prefers-contrast`, is a more principled use of the feature than using them purely for viewport sizing. That framing positions accessibility media queries as a first-class use of the mechanism rather than an afterthought.

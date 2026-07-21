---
title: Web accessibility
summary: >-
  Web accessibility spans HTML semantics, progressive enhancement, and CSS
  techniques that ensure interfaces work for the widest range of users and
  devices, with several sources touching it indirectly through fluid layout,
  progressive enhancement, and platform-native patterns.
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
compiled_at: '2026-07-21T05:08:01.783Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 806
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
  cost_usd: 0.026721
---
Web accessibility in frontend practice is less a single technique than a set of constraints that shape decisions across typography, interaction design, and markup structure. The sources here address it primarily through two lenses: the choice of CSS units in fluid typography, and the progressive-enhancement argument for platform-native HTML over JavaScript-heavy components.

On the typography side, [Adrian Bece's deep-dive on CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) makes the accessibility case explicit: fluid type values built with `clamp()` should use `rem` units rather than `px` for the min and max bounds, because `rem` respects the user's browser font-size preference. A user who has set their base font size to 20px will get proportionally larger text throughout the scale; `px`-based clamp values ignore that setting entirely. The [Utopia type scale graph](/reading/2026-05/2026-05-05t183935-type-scale-graphs) reinforces this by visualizing how fluid scales behave across viewport ranges, making it easier to catch cases where a scale collapses too aggressively at small sizes.

The progressive-enhancement thread runs through several sources. [Sunkanmi Fafowora on the CSS `::checkmark` pseudo-element](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) frames the comparison between JavaScript-driven custom dropdowns and the emerging CSS-native approach explicitly as an accessibility and resilience question: the JavaScript path is fragile and often breaks keyboard and screen-reader interaction, while the CSS pseudo-element approach degrades gracefully where unsupported. [Jim Nielsen's case for linked HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) and [Dan Q's reversal of a native app back to a webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) both argue that reducing JavaScript dependency produces interfaces that are lighter, more linkable, and more compatible with assistive technologies by default.

[Amit Sheen's argument against breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) touches accessibility through the user-preferences angle: media queries are best reserved not for viewport width but for device capabilities and user preferences such as `prefers-reduced-motion` and `prefers-color-scheme`, which are accessibility-relevant signals. Similarly, [Pavel Laptev's survey of modern CSS primitives](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) notes that replacing JavaScript libraries with native browser features like popovers and the `<dialog>` element tends to restore built-in keyboard and focus management that custom implementations frequently omit.

Taken together, the pattern is consistent: accessibility is most often compromised when custom JavaScript replaces platform behavior, and most naturally preserved when implementations stay close to the HTML and CSS layer.

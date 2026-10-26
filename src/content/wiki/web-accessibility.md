---
title: Web accessibility
summary: >-
  Web accessibility spans semantic HTML, progressive enhancement, and
  user-preference media queries — practices that appear across CSS layout,
  typography, and component design discussions as constraints shaping
  technically sound frontend work.
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
compiled_at: '2026-10-26T22:34:32.189Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 816
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
  cost_usd: 0.026871
---
Web accessibility rarely appears as a standalone subject in the sources tagged here. Instead it surfaces as a recurring constraint woven into articles primarily about CSS, typography, and component architecture. That pattern is itself informative: accessibility is most durable when treated as a design requirement from the start rather than a retrofit.

The clearest direct treatment comes from fluid typography. [Adrian Bece's guide to CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags a specific risk: using `px` units in clamp expressions breaks browser text-scaling for users who adjust their default font size. Rem-based values respect those preferences, making the choice of unit an accessibility decision, not just a stylistic one. [Trys Mudford's type scale graph tool](/reading/2026-05/2026-05-05t183935-type-scale-graphs) visualizes fluid scales across viewport sizes, which indirectly supports accessible design by making it easier to verify that no size in the scale collapses to an unreadable value.

Progressive enhancement is the other axis. [Sunkanmi Fafowora's piece on checkmarks in custom dropdowns](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) frames the CSS `::checkmark` pseudo-element explicitly as a progressive enhancement win: it lets browsers with support render accessible custom controls natively, while older browsers fall back gracefully rather than breaking. The cost is current browser support gaps, which the article names directly.

[Amit Sheen's argument against breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reserves media queries for device capabilities and user preferences — reduced motion, color scheme, contrast — rather than using them purely for layout. That framing positions accessibility preferences as first-class inputs to responsive design, not edge cases.

[Jim Nielsen's case for separate HTML pages over JS-driven in-page interactions](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) and [Dan Q's observation that a travel app was just plain HTML over HTTP](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) both point toward the same principle: native browser behavior is accessible by default. JavaScript-heavy single-page patterns require deliberate work to restore what the platform provides for free — focus management, history, readable text — whereas simple linked pages inherit those behaviors without effort.

[Dennis Brotzky's Linear performance breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) touches accessibility only obliquely, noting font-loading best practices that prevent invisible text during load — a condition that affects all users but is more acute for those on assistive technology or slow connections.

Across these sources, accessibility is less a checklist and more a consequence of platform-aligned decisions: semantic elements, rem units, user-preference queries, and progressive enhancement produce accessible output as a byproduct of doing the underlying technique correctly.

---
title: Web accessibility
summary: >-
  Web accessibility concerns how design and technical choices affect usability
  for all users, surfacing across decisions about typography, layout, HTML
  semantics, and progressive enhancement.
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
compiled_at: '2026-10-13T00:23:59.925Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 695
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
  cost_usd: 0.025056
---
Web accessibility is not a single feature to bolt on but a consequence of accumulated decisions across typography, layout, markup, and interaction patterns. Several sources here touch it from different angles without making it their primary subject, which is itself instructive: accessibility concerns tend to surface as side conditions on other design choices.

Fluid typography is a clear example. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags that using `px` units inside `clamp()` expressions breaks browser zoom behavior for users who rely on increased base font sizes. The fix is to express minimum and maximum values in `rem`, so that user-defined font preferences cascade correctly. This is a technical detail with real consequences: a visually appealing fluid scale can silently override a user's accessibility settings if the units are wrong.

Progressive enhancement is a related pressure point. [Navigating the age-old problem of checkmarks in UI with progressive enhancement](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) contrasts a fragile JavaScript-driven custom dropdown implementation against the emerging CSS `::checkmark` pseudo-element. The argument is that CSS-native solutions are more amenable to progressive enhancement, meaning the interface degrades gracefully when a feature is unsupported rather than breaking entirely. Browser support gaps make this a live tradeoff rather than a settled question.

Semantic HTML is another thread. [Your 'App' Could Have Been a Webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) and [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) both argue, from different starting points, that replacing JavaScript-heavy interactions with plain HTML and CSS produces simpler, more maintainable results. Plain HTML carries semantic meaning that assistive technologies can consume directly; JavaScript-constructed UIs routinely strip that meaning out and must re-add it manually through ARIA, which is error-prone.

Media queries for user preferences represent a fourth dimension. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) distinguishes between viewport breakpoints, which should be replaced by intrinsic layouts, and preference queries like `prefers-reduced-motion` or `prefers-contrast`, which remain the appropriate mechanism for responding to user accessibility settings. The distinction matters: collapsing all media queries into "legacy" thinking discards a tool that accessibility specifically depends on.

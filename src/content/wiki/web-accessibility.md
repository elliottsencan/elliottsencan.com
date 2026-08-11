---
title: Web accessibility
summary: >-
  Web accessibility concerns how design and implementation choices affect
  usability for all people, with several sources touching on progressive
  enhancement, semantic HTML, font rendering, and user preference media queries
  as foundational concerns.
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
compiled_at: '2026-08-11T08:03:52.533Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 708
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
  cost_usd: 0.025251
---
Web accessibility rarely arrives as the central subject of a piece; it surfaces as a constraint that shapes other decisions. Several sources in this set treat it that way, weaving accessibility concerns into discussions of typography, CSS primitives, and HTML-first architecture.

Fluid typography is a case where accessibility is a hard technical constraint, not an afterthought. [Bece's deep-dive on CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags that using `px` units in `clamp()` values breaks browser font scaling for users who set a larger default text size in their preferences. The fix is to calculate values in `rem`, preserving the user's root font-size choice. This is a subtle failure mode: a fluid scale that looks correct in every viewport can still be inaccessible if the units are wrong.

User preference media queries are a recurring theme. [Sheen's argument against breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reserves `@media` for exactly this purpose: detecting device capabilities and user preferences like `prefers-reduced-motion` or `prefers-color-scheme`, rather than viewport width. That framing positions accessibility features as the legitimate core use case for media queries, while layout concerns shift to container queries and intrinsic sizing.

Progressive enhancement is another axis. [Fafowora's piece on CSS `::checkmark`](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) frames the case against JavaScript-heavy custom dropdowns partly in accessibility terms: native elements carry built-in semantics and keyboard behavior that custom implementations routinely break or must laboriously replicate. The CSS-native path is more accessible by default, though browser support gaps currently require fallbacks.

At a structural level, [Jim Nielsen's case for separate HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) and [Dan Q's reversal of an app back into a webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) both touch on the idea that native HTML navigation is inherently more accessible than JavaScript-managed routing. Links, page loads, and browser history are understood by assistive technologies in ways that in-page JS transitions are not, and the simpler architecture is also the more accessible one.

Taken together, the pattern across these sources is consistent: accessibility aligns with platform defaults. Rem units, semantic HTML, native form controls, and media queries for user preferences all lean on what browsers already know how to do for users who need it.

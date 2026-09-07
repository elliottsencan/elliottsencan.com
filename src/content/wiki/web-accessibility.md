---
title: Web accessibility
summary: >-
  Web accessibility spans semantic HTML, progressive enhancement,
  user-preference media queries, and platform primitives — concerns surfacing
  across modern CSS, typography, and UI design practice.
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
compiled_at: '2026-09-07T21:23:20.308Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 734
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
  cost_usd: 0.025641
---
Web accessibility rarely appears as a standalone subject in the contributing sources here; it surfaces as a constraint or consideration threaded through broader discussions of CSS, typography, and UI architecture. The pattern is consistent: decisions made for aesthetics or performance can silently harm users who rely on specific platform behaviors, assistive technology, or user-configured preferences.

The most direct treatment comes from fluid typography. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags a concrete accessibility concern: using `px` units inside `clamp()` expressions breaks browser text-zoom for users who increase their default font size, because pixel values do not scale with the user's preference. The fix is to work in `rem` units so the operating system and browser font settings propagate correctly into the fluid scale. [Type Scale Graphs](/reading/2026-05/2026-05-05t183935-type-scale-graphs) reinforces this by making the relationships within a fluid modular scale visible, which helps designers catch cases where sizes compress too aggressively at small viewports.

Progressive enhancement is a second thread. [Navigating the age-old problem of checkmarks in UI](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) argues directly that the JavaScript-heavy approach to custom dropdown indicators is fragile and harder to make accessible, while the CSS `::checkmark` pseudo-element enables a layered, platform-native path — though current browser support gaps mean the enhancement must be genuinely progressive rather than assumed. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) treats user-preference media queries (`prefers-reduced-motion`, `prefers-color-scheme`) as the appropriate remaining scope for media queries once layout work moves to intrinsic and container-based approaches.

The broader architecture discussion in [Your 'App' Could Have Been a Webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) and [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) both touch accessibility indirectly: native HTML pages carry semantic structure, back-button behavior, and zoom support that JavaScript-rendered app shells frequently discard. The argument for simpler, HTML-first architectures is partly a performance argument and partly an accessibility one.

Taken together, these sources treat accessibility less as a checklist and more as a consequence of choosing platform-native primitives over custom JavaScript — using `rem` units, semantic HTML, CSS pseudo-elements, and user-preference queries rather than scripted workarounds.

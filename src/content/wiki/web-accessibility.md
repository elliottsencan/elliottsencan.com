---
title: Web accessibility
summary: >-
  Web accessibility spans semantic HTML, progressive enhancement, and CSS
  practices that ensure interfaces remain usable regardless of browser
  capability, assistive technology, or user preference.
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
compiled_at: '2026-11-03T00:46:22.331Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 699
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
  cost_usd: 0.025116
---
Web accessibility is not a single technique but a set of interlocking decisions made across HTML structure, CSS, and JavaScript. The sources here touch it from several angles, and the common thread is that platform-native approaches tend to serve accessibility better than JavaScript-heavy workarounds.

Progressive enhancement is the clearest expression of this. [Sunkanmi Fafowora's piece on checkmarks](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) argues that the CSS `::checkmark` pseudo-element, despite patchy browser support, represents the right direction: a declarative, progressively enhanced alternative to fragile JavaScript-driven custom dropdowns that often break screen readers and keyboard navigation. The article is candid that browser support gaps mean the JavaScript path persists for now, but it frames that as a temporary cost.

Fluid typography introduces its own accessibility surface. [Adrian Bece's guide to CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags that using px units inside clamp() breaks user font-size preferences set in the browser. Rem units preserve those preferences; px units override them. This is a concrete failure mode that fluid-type implementations can introduce without deliberate attention, and it is one reason Bece recommends rem-based calculations throughout.

Semantic HTML itself is an accessibility foundation. [Jim Nielsen](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) and [Dan Q](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) both argue from different angles that over-engineering interfaces with JavaScript imposes costs on users, and one of those costs is degraded accessibility: JavaScript-dependent interactions can fail for users with assistive technologies or constrained environments. Dan Q's case is especially pointed, having reverse-engineered an app that wrapped plain HTML in an Android shell, reintroducing the page as a lightweight webpage stripped of the app's tracking overhead.

Media queries for user preferences are another access-layer concern. [Amit Sheen's breakpoints piece](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) recommends reserving media queries not for viewport widths but for device capabilities and user preferences such as prefers-reduced-motion and prefers-color-scheme. This framing positions those queries as accessibility hooks rather than layout tools.

The broader pattern across these sources: accessibility is most durable when it follows platform primitives, uses units that respect user settings, and avoids JavaScript paths that can silently degrade.

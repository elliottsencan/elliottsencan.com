---
title: Web accessibility
summary: >-
  Web accessibility covers how design and implementation choices affect users
  across devices, abilities, and preferences — a concern that surfaces across
  fluid typography, progressive enhancement, semantic HTML, and platform-native
  CSS features.
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
compiled_at: '2026-08-17T18:52:51.363Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 932
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
  cost_usd: 0.028611
---
Web accessibility is not a checklist appended to finished work. It is a property that emerges from decisions made at every layer of a UI: how type scales, how layout adapts, how interactions are built, and whether the platform's own capabilities are trusted.

Fluid typography is one of the more concrete accessibility intersections. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) makes the point explicitly: using `rem`-based values inside `clamp()` respects the user's browser font-size preferences, whereas `px`-based min and max values override them. The difference is invisible to sighted users on a standard display and significant to users who have increased their default font size. The [Utopia type scale graph](/reading/2026-05/2026-05-05t183935-type-scale-graphs) adds a visual dimension to this, letting designers audit how sizes relate across the viewport range before shipping.

Layout decisions carry similar stakes. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that reserving media queries for device capabilities and user preferences — rather than viewport pixel thresholds — naturally aligns layout logic with accessibility signals like `prefers-reduced-motion` or `prefers-contrast`. Container queries and intrinsic sizing serve the same end: components that adapt to their context without requiring authors to enumerate every possible screen size.

At the interaction layer, progressive enhancement is the recurring pattern. [Navigating the age-old problem of checkmarks in UI](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) demonstrates this directly: a JavaScript-heavy custom dropdown is fragile across assistive technologies, while the CSS `::checkmark` pseudo-element, where supported, produces the same visual result through a platform-native path that browsers and screen readers already understand. The tradeoff named there is honest — browser support is incomplete, so progressive enhancement fills the gap.

The broader argument that native HTML outperforms JavaScript-assembled equivalents on accessibility grounds appears in several sources. [Jim Nielsen's case for separate linked HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) and [Dan Q's reversal of an Android app back to a webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) both observe that the platform's default behavior — links, navigation, focus management — is free and correct by default. The Great CSS Expansion extends this to components like popovers and modals: replacing custom JavaScript implementations with native HTML and CSS removes not just kilobytes but entire categories of accessibility bugs that arise when focus trapping, ARIA roles, and keyboard navigation are reimplemented by hand.

Font loading also touches accessibility. [Linear's architecture breakdown](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown) notes font-loading best practices as part of perceived performance, and perceived performance matters for users on slower connections or lower-powered devices — groups that overlap substantially with users who rely on accessibility accommodations.

The throughline across these sources is that accessibility is most durable when it follows from platform conventions rather than working against them. Fluid units that respect user preferences, layouts that respond to capability rather than pixel width, and interactions built on native elements all reduce the surface area where something can go wrong for users who depend on predictable behavior.

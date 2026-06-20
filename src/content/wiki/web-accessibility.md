---
title: Web accessibility
summary: >-
  Web accessibility concerns how UI choices — typography scaling, layout
  strategies, semantic HTML, and CSS primitives — affect users across devices,
  preferences, and assistive technology contexts.
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
compiled_at: '2026-06-20T22:11:31.792Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4351
    output_tokens: 641
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
  cost_usd: 0.022668
---
Accessibility surfaces across CSS and layout decisions more often than it gets its own dedicated treatment. The sources here touch it obliquely but consistently, each revealing how a particular technique either supports or risks breaking the experience for users who depend on certain browser behaviors.

Fluid typography is the clearest case. [Adrian Bece's breakdown of CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags that using `px` inside `clamp()` instead of `rem` will ignore a user's browser font-size preference, since `px` values don't scale with the root font size. That's a concrete failure mode: a user who has set their browser to a larger base size gets no benefit from that preference if the CSS ignores `rem`. The fluid scale tools at [Utopia](/reading/2026-05/2026-05-05t183935-type-scale-graphs) visualize how sizes shift across viewports, which helps designers catch relationships that might compress too far at small sizes — another accessibility-adjacent concern about minimum readable sizes.

[Amit Sheen's argument for breakpoint-free layouts](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) reserves media queries specifically for device capabilities and user preferences, which positions them as the right tool for `prefers-reduced-motion`, `prefers-color-scheme`, and similar preference queries. That framing keeps accessibility features in the correct layer rather than buried inside component-specific breakpoints.

On the HTML side, [Jim Nielsen's case for linked HTML pages over JS-driven interactions](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) carries an implicit accessibility argument: plain HTML with native navigation is inherently more compatible with screen readers and keyboard navigation than JavaScript-managed state transitions, even when view transitions are layered on top.

The [Piccalilli piece on the CSS `::checkmark` pseudo-element](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) makes the progressive-enhancement case directly: custom dropdowns built in JavaScript are fragile and often inaccessible, while a CSS-native solution built on the `<select>` element preserves the semantic role the browser and assistive technology already understand. Browser support gaps mean the JavaScript fallback still matters, but the direction is toward platform semantics rather than away from them.

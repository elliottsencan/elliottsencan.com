---
title: Web accessibility
summary: >-
  Web accessibility in modern front-end practice surfaces through typography,
  layout, and interaction decisions — fluid type units, progressive enhancement,
  and platform-native HTML patterns each carry accessibility consequences that
  visual-only thinking misses.
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
compiled_at: '2026-07-15T04:06:21.104Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4528
    output_tokens: 629
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
  cost_usd: 0.023019
---
Accessibility rarely appears in these sources as a primary subject, but it surfaces as a constraint that shapes several technical decisions in CSS and HTML authoring.

The clearest treatment comes from fluid typography. [Adrian Bece's guide to CSS clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) flags a specific hazard: using viewport units (`vw`) directly in `clamp()` expressions can break text scaling for users who adjust their browser's base font size. The fix is to express the preferred value as a calculation relative to `rem`, preserving the user's declared preference while still interpolating fluidly across viewport widths. This is not a minor edge case; it affects users with low vision who depend on font-size overrides.

Progressive enhancement is the accessibility posture implicit in Sunkanmi Fafowora's comparison of custom dropdown checkmarks. A JavaScript-heavy custom implementation is fragile and often inaccessible; the CSS `::checkmark` pseudo-element, where supported, lets the browser handle semantics natively. The trade-off is current browser support gaps, which the piece acknowledges without resolving.

The same instinct runs through [Jim Nielsen's argument for separate HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) and [Dan Q's case against unnecessary app wrappers](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you). Both prefer plain HTML over JavaScript-mediated interactions, and plain HTML carries built-in accessibility semantics that custom JS components must replicate manually. Neither piece argues from accessibility directly, but the preference for the platform's native primitives converges on the same outcome.

[Pavel Laptev's overview of modern CSS capabilities](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) makes a related point structurally: replacing JavaScript libraries for popovers, modals, and custom selects with CSS-native and HTML-native equivalents reduces the surface area where accessibility can be accidentally broken. Browser-implemented components carry ARIA roles and keyboard behavior by default.

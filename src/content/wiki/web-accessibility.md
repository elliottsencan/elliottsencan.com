---
title: Web accessibility
summary: >-
  Web accessibility in CSS and frontend development encompasses how layout,
  typography, and progressive enhancement choices affect users across devices,
  preferences, and browser capabilities.
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
compiled_at: '2026-07-19T14:41:44.615Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4877
    output_tokens: 854
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
  cost_usd: 0.027441
---
Web accessibility sits at the intersection of technical implementation and inclusive design. In modern CSS and frontend practice, it surfaces in several concrete ways: how type scales behave across viewports, how component layout adapts without relying on fixed breakpoints, and how new platform primitives can replace fragile JavaScript patterns that historically created barriers.

Fluid typography is one of the clearest accessibility touchpoints. Using `clamp()` with `rem`-based units matters because rem respects the user's browser font-size preference; switching to viewport units or pixel values silently overrides that preference [Adrian Bece](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp). The same source notes that fluid scales should be audited at minimum and maximum bounds to ensure no size falls below readable thresholds. Utopia's graph view for type scales [Trys Mudford](/reading/2026-05/2026-05-05t183935-type-scale-graphs) makes those bounds easier to reason about visually, catching relationships that arithmetic alone can obscure.

Layout decisions carry similar stakes. Intrinsic layouts built with container queries and container units adapt to the component's own space rather than the viewport, which means a component works correctly whether it is placed in a narrow sidebar or a wide main column [Amit Sheen](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints). Reserving media queries for device capabilities and user preferences, rather than viewport width, directly enables respecting `prefers-reduced-motion` and similar accessibility preferences at the layout level.

Progressive enhancement is the thread connecting several sources. The CSS `::checkmark` pseudo-element offers a path to custom-styled dropdowns without JavaScript, though current browser support requires careful fallback planning [Sunkanmi Fafowora](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with). Native platform primitives for popovers, modals, and anchor positioning similarly reduce the risk of broken keyboard navigation and focus management that JavaScript-heavy widgets frequently introduce [Pavel Laptev](/reading/2026-04/2026-04-30t231909-the-great-css-expansion). Replacing in-page JavaScript interactions with linked HTML pages unified by CSS view transitions is another angle on the same principle: the HTML is navigable and functional before any enhancement layer is applied [Jim Nielsen](/reading/2026-05/2026-05-05t091632-building-websites-with-llms).

Font loading also intersects with accessibility. Linear's architecture uses `font-display: optional` to avoid layout shift and invisible text during load [Dennis Brotzky](/reading/2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown), a practice that prevents the disorienting reflow that affects users with cognitive or visual sensitivities.

The broader historical arc described in [David Poblador i Garcia](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent) is relevant context: each layer of tooling added to frontend stacks was solving a real pain, but the cumulative weight has made it harder to ship accessible defaults. The simpler the delivery mechanism, the easier it is to rely on browser-native accessibility semantics rather than rebuilding them in JavaScript.

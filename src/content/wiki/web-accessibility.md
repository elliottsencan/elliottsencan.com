---
title: Web accessibility
summary: >-
  Web accessibility surfaces across testing strategy, CSS primitives, and HTML
  structure, with modern platform features increasingly enabling accessible
  patterns without JavaScript overhead.
sources:
  - 2026-04/2026-04-30t230919-dmytro-mezhenskyi-udmezhenskyi-on-reddit
  - 2026-04/2026-04-30t231909-the-great-css-expansion
  - 2026-04/2026-04-30t231931-50-best-font-combinations-for-graphic-design
  - 2026-05/2026-05-05t091632-building-websites-with-llms
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-05t183935-type-scale-graphs
  - >-
    2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with
  - 2026-06/2026-06-11t111011-hows-linear-so-fast-a-technical-breakdown
  - 2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm
aliases:
  - accessibility
compiled_at: '2026-06-18T21:57:27.366Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3969
    output_tokens: 437
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
  cost_usd: 0.018462
---
Accessibility in web development is less a separate discipline than a property that emerges from how HTML, CSS, and interaction patterns are constructed. Several sources touch on it from different angles without making it their primary subject.

The Playwright testing piece from [Currents.dev](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) makes the clearest structural argument: test suites that couple to CSS classes and DOM hierarchy break during refactors, while selectors grounded in semantic roles and ARIA labels stay stable. The same attributes that make tests resilient, semantic markup and explicit labels, are what make interfaces accessible to assistive technology. The two goals are not parallel concerns; they converge on the same underlying practice.

On the CSS side, [Piccalilli](/reading/2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with) examines the `::checkmark` pseudo-element as a progressive enhancement path for custom dropdown controls. Native form controls carry built-in accessibility semantics that JavaScript-heavy custom implementations routinely discard or must laboriously reconstruct. The argument for the platform primitive is partly about code weight, but it is also about not fighting the browser's accessibility tree.

Jim Nielsen's "Lots of Little HTML pages" approach [makes a related point](/reading/2026-05/2026-05-05t091632-building-websites-with-llms): separate linked HTML pages with CSS view transitions restore standard browser navigation behavior, including history, focus management, and the address bar, which JavaScript-routed SPAs commonly break for keyboard and screen-reader users.

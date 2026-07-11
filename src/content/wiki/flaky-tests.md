---
title: Flaky tests
summary: >-
  Flaky tests fail intermittently without code changes, and eliminating them
  requires tracing root causes across environment inconsistencies, brittle
  selectors, AI-generated anti-patterns, and test coupling to implementation
  details.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-07-09T23:22:09.646Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 578
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
  cost_usd: 0.017115
---
A flaky test is one that produces inconsistent results across identical runs, making CI signal unreliable and eroding trust in the test suite itself. At scale the problem compounds quickly: [Mendral's CI agent](https://www.mendral.com/blog/ci-at-scale) handles 33 million test executions per week at PostHog and spends significant effort tracing flaky tests to root causes before opening fix PRs automatically, because at that volume manual triage is untenable.

Much of the flakiness in frontend suites comes from how tests are written. [Currents on UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break not primarily because selectors are fragile, but because they couple to implementation details: CSS classes, DOM structure, positional relationships. Selectors anchored to semantic roles, accessible names, and ARIA labels survive UI changes because those attributes travel with intent rather than structure.

AI-generated tests introduce their own class of flakiness sources. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns such as over-mocking, testing only happy paths, and writing assertions that match a buggy implementation rather than intended behavior. Tests like that may pass consistently while catching nothing, which is a different failure mode than intermittent failures but contributes to the same loss of confidence in the suite.

Tooling has moved to address detection and categorization. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes failures into bugs, flaky tests, and UI changes, reducing the time engineers spend classifying failures before they can act on them. Environment mismatch also contributes: [Currents on staging vs production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that certain failure modes only appear in production, meaning tests that pass in staging may flake or fail in ways attributable to environment rather than code, complicating root-cause analysis.

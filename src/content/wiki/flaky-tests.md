---
title: Flaky tests
summary: >-
  Tests that fail intermittently without code changes, caused by environment
  sensitivity, implementation coupling, or fragile selectors; increasingly
  managed through automated triage, AI categorization, and stable-selector
  discipline.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
  - >-
    2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs
  - >-
    2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test
compiled_at: '2026-09-07T21:15:26.802Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 585
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
  cost_usd: 0.018186
---
A flaky test is one that produces inconsistent results across runs on the same code. The failure mode is expensive: engineers either re-run CI hoping for green or spend hours bisecting a non-deterministic failure. At PostHog's scale, [Mendral's CI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests billions of log lines across 33 million weekly test executions and automatically distinguishes flaky failures from genuine regressions, opening fix PRs when it identifies a root cause.

The causes split into two broad categories. The first is environment sensitivity: timing issues, network variance, or differences between staging and production. The second is structural coupling to implementation details. [Currents' refactor-survival guide](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break not just from bad selector choices but from coupling to CSS classes, DOM structure, and element position rather than semantic roles, labels, and accessible names. Tests built on stable semantics survive refactors; tests built on structure become flaky the moment a designer reorganizes a component.

AI-generated tests introduce a related failure mode. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and tests written to match a buggy implementation rather than intended behavior, which can create tests that pass reliably but verify the wrong thing, or fail unpredictably when mocked boundaries drift from real behavior.

On the tooling side, [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes Playwright failures into bugs, flaky tests, and UI changes, which reduces the manual triage cost. [Currents' staging-vs-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that environment mismatch between staging and production is a common flakiness source, with some flows only exhibiting instability in production conditions.

---
title: Flaky tests
summary: >-
  Tests that fail intermittently without code changes, caused by environment
  sensitivity, implementation coupling, or AI-generated patterns that obscure
  real behaviour from genuine bugs.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-07-06T00:14:16.863Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 659
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
  cost_usd: 0.01833
---
A flaky test is one that passes or fails non-deterministically across runs of the same code. At scale, flakiness becomes an infrastructure problem: [PostHog's CI pipeline](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575K jobs and 33M test executions weekly, and a significant share of engineering time goes to triaging failures that are not real regressions. Mendral's AI agent addresses this by tracing flaky failures to root causes in log data and opening fix PRs automatically.

Flakiness has multiple origins. One common source is coupling to implementation details rather than stable semantics. [Currents' guide on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that Playwright suites break not because of selector style alone, but because tests bind to CSS classes, DOM position, or internal structure rather than accessible names and semantic roles that remain stable across refactors. A test that passes today because a button sits at a specific DOM index is a latent flaky test waiting for a layout change.

Environment differences compound the problem. [Currents' staging-vs-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that tests can behave differently depending on which environment they run against, and that mismatched configuration between staging and production is a routine source of intermittent failures.

AI-generated tests introduce a distinct class of flakiness risk. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking, happy-path-only coverage, and tests written to match a buggy implementation rather than intended behaviour. Tests that only verify the current broken state will flip when the bug is fixed, producing spurious failures indistinguishable from genuine regressions.

[TestDino](/reading/2026-04/2026-04-30t231348-testdino) represents one tooling response: an analytics layer that auto-categorizes failures as bugs, flaky tests, or UI changes, aiming to reduce the manual triage burden. The common thread across all these sources is that flaky tests are a signal of coupling, environment mismatch, or structural weakness in the test suite, and that automated categorization or AI-assisted triage treats the symptom while addressing root causes requires writing tests against stable contracts.

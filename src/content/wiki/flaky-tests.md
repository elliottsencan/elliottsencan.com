---
title: Flaky tests
summary: >-
  Tests that produce inconsistent results across runs without code changes,
  causing CI noise, wasted triage time, and eroded trust in test suites.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-06-24T04:36:29.637Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 580
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
  cost_usd: 0.017145
---
A flaky test passes sometimes and fails other times on identical code. The inconsistency can come from timing issues, environment differences, or tests that couple too tightly to implementation details rather than stable semantics.

At scale, flakiness becomes an operational problem. [PostHog via Mendral](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 33 million test executions weekly and uses an AI triage agent to trace flaky failures to root causes and open fix PRs automatically. Without that layer, engineers would spend significant time distinguishing genuine regressions from noise.

[TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a similar angle for Playwright suites: auto-categorizing failures as bugs, flaky tests, or UI changes, and claiming to recover 6-8 engineering hours per week through that classification alone.

One structural cause of flakiness in UI tests is selector strategy. [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues tests break frequently not because of bad selectors per se, but because they bind to CSS classes, DOM position, or internal structure rather than accessible names and semantic roles that remain stable across refactors. Tests written against implementation details are flaky by construction.

AI-generated tests introduce their own flakiness surface. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and writing tests to match a buggy implementation rather than intended behavior, both of which produce tests that pass or fail for the wrong reasons.

Environment mismatch is another vector. [Currents on staging vs production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that tests run against staging can fail for reasons unrelated to the code under test, such as stale data or environment configuration drift, producing results that look flaky but are really environment failures in disguise.

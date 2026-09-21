---
title: Flaky tests
summary: >-
  Tests that produce inconsistent pass/fail results across identical code,
  flakiness stems from implementation coupling, environment drift, and
  AI-generated antipatterns, and is increasingly managed through automated
  triage and smarter test design.
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
compiled_at: '2026-09-21T21:50:38.058Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 677
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
  cost_usd: 0.019566
---
A flaky test is one that fails intermittently without any change to the code under test. The failure mode is particularly costly in CI because it erodes trust in the test suite: engineers start ignoring red builds, which is how real regressions slip through.

One structural cause is coupling tests to implementation details rather than observable behavior. [Designing Playwright tests against semantic roles, accessible names, and labels](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) rather than CSS classes or DOM position produces selectors that survive UI refactors and reduces the churn that masquerades as flakiness. A related source of false failures is environment inconsistency: [running tests against staging versus production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) introduces different data states, network latency, and third-party behavior, each of which can cause non-deterministic results.

AI-generated tests add a newer vector. [Common antipatterns include over-mocking, testing only happy paths, and writing assertions that match a buggy implementation rather than intended behavior](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). Tests written this way appear green until something real changes, then fail unpredictably.

At scale the problem becomes a triage problem. [PostHog's CI runs 575K weekly jobs and 33M test executions](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team); Mendral's AI agent ingests the resulting log volume, traces flaky tests to root causes, and opens fix PRs automatically. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a lighter-weight approach, auto-categorizing failures as bugs, flaky tests, or UI changes and claiming to save engineers 6-8 hours weekly. Both tools treat flakiness detection as a classification and observability problem rather than something developers should debug manually each time.

Fast feedback loops help too. [Caching browser binaries and tuning parallelism in GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) cuts total run time, which reduces the window in which environment drift can affect results. Shorter runs also make it practical to rerun suspected flakes immediately rather than deferring investigation.

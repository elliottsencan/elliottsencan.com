---
title: Flaky tests
summary: >-
  Tests that pass and fail non-deterministically, wasting CI time and eroding
  trust in test suites, with root causes ranging from environment sensitivity to
  implementation coupling and AI-generated anti-patterns.
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
compiled_at: '2026-10-05T23:52:30.297Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 791
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
  cost_usd: 0.021276
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. The problem compounds at scale: at PostHog, Mendral's CI agent processes 575K weekly jobs and 33M test executions, and a significant part of its work is tracing flaky tests to root causes and opening fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). At that volume, manual triage is impractical, which is why tooling like TestDino categorizes failures as bugs, flaky tests, or UI changes automatically and claims to save engineers 6-8 hours weekly [TestDino](/reading/2026-04/2026-04-30t231348-testdino).

One structural cause of flakiness in Playwright suites is coupling tests to implementation details rather than stable semantic anchors. CSS classes, DOM position, and internal structure change during refactors; accessible names, ARIA roles, and visible labels tend not to [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Tests written against the wrong layer of the UI become flaky the moment a designer or developer reshuffles the DOM.

Environment differences between staging and production are another source. A test that passes reliably in staging can fail intermittently against production due to data variability, authentication flows, or third-party service behavior [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production).

AI-generated tests introduce their own flakiness risks. Common patterns include over-mocking, testing only happy paths, and writing assertions that match a buggy implementation rather than intended behavior [Code Smells when you get AI to write your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). These tests pass until reality diverges from the mock, at which point they either fail unexpectedly or continue passing while masking real bugs.

Infrastructure tuning can reduce a category of environmental flakiness caused by resource contention. Caching browser binaries and tuning worker parallelism on GitHub Actions, for instance, cuts run times and reduces the window in which timing-sensitive tests can mis-fire [Playwright on GitHub Actions: The setup that actually runs fast](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs). Agentic AI approaches go further, positioning autonomous agents to handle regression detection and debugging tasks that surface flaky behavior across runs [Agentic AI testing: What it means for your Playwright test suite](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test).

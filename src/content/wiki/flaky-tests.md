---
title: Flaky tests
summary: >-
  Flaky tests are test failures that reflect environmental instability,
  implementation coupling, or poor authoring rather than real bugs, and managing
  them at scale increasingly involves automated triage, smarter selectors, and
  environment-aware design.
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
compiled_at: '2026-08-10T19:00:58.597Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 617
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
  cost_usd: 0.018165
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. At small scale this is an annoyance; at scale it becomes a reliability crisis. PostHog's CI pipeline runs 575K jobs and 33M test executions weekly, and Mendral's AI triage agent was built specifically to trace flaky failures to root causes and open fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). TestDino takes a similar automated-categorization approach for Playwright suites, distinguishing flaky tests from genuine bugs and UI regressions before an engineer ever looks at the output [TestDino](/reading/2026-04/2026-04-30t231348-testdino).

A significant source of flakiness is coupling to implementation details rather than stable semantics. Tests that select elements by CSS class, DOM position, or internal structure break whenever the UI is refactored, even when behavior is unchanged [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). The same problem appears in AI-generated tests: tools tend to anchor assertions to visible markup rather than accessible roles and labels, producing tests that describe how the UI currently looks rather than what it should do [Code Smells when you get AI to write your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests).

Environment mismatch is another driver. Tests that pass in staging can fail in production because of data state, network conditions, or third-party service behavior [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Infrastructure choices matter too: untuned worker parallelism and missing browser binary caches can cause timing-sensitive tests to fail on slower CI runners [Playwright on GitHub Actions: The setup that actually runs fast](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs).

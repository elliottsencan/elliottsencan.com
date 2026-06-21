---
title: Flaky tests
summary: >-
  Tests that produce inconsistent pass/fail results without code changes,
  causing CI noise, wasted triage time, and eroded trust in automated test
  suites.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
compiled_at: '2026-06-21T18:38:20.083Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2648
    output_tokens: 521
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
  cost_usd: 0.015759
---
A flaky test is one that fails intermittently without any corresponding change to the code under test. At sufficient scale the problem compounds quickly. PostHog's CI pipeline processes 575,000 weekly jobs and 33 million test executions [CI at scale](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team); at that volume, even a small flakiness rate produces constant noise that engineers learn to ignore, which erodes the value of the entire test suite.

The root causes split into two categories. Environmental flakiness comes from timing issues, race conditions, or differences between staging and production that cause a test to behave differently on each run [staging vs production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Structural flakiness comes from tests that couple to implementation details: CSS classes, DOM position, or component internals that change during routine refactors even when behavior stays the same [surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Selecting by semantic roles, accessible names, and stable labels rather than structural selectors reduces this second category considerably.

On the tooling side, both AI-assisted triage and dedicated analytics platforms are emerging responses. Mendral's agent traces flaky tests to root causes across billions of log lines and opens fix PRs automatically [CI at scale](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). TestDino takes a reporting approach, auto-categorizing Playwright failures as bugs, flaky tests, or UI changes and claiming 6-8 hours of weekly savings per engineer [TestDino](/reading/2026-04/2026-04-30t231348-testdino). The two approaches are complementary: analytics surfaces the pattern, agentic pipelines act on it.

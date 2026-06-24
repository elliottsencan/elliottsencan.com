---
title: Flaky tests
summary: >-
  Tests that produce inconsistent results across identical runs, caused by
  coupling to implementation details, environmental variance, or AI-generated
  patterns that prioritize passing over correctness.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-06-24T06:31:34.665Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 579
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
  cost_usd: 0.01713
---
A flaky test is one that passes or fails non-deterministically across identical code states. The causes tend to cluster into two categories: structural problems in how the test is written, and environmental or infrastructure factors that introduce noise at scale.

On the structural side, [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that Playwright tests become brittle when they couple to CSS classes, DOM position, or internal structure rather than semantic roles and accessible names. A test written against a class name will fail the moment a developer renames that class during a refactor, even if the underlying behavior is unchanged. That's not a true regression, but it registers as one. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) adds a compounding factor: AI-generated tests frequently exhibit the same pattern, over-mocking internals and testing implementation rather than intent, which means they fail on legitimate refactors and pass on real bugs.

At scale, flakiness becomes an infrastructure problem. [Mendral's CI analysis](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes PostHog running 33 million test executions weekly, where flaky tests generate enough noise that manual triage becomes impractical. Their AI agent ingests log data to trace failures to root causes and open fix PRs automatically. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a similar reporting angle, auto-categorizing failures as bugs, flakiness, or UI changes so engineers can stop triaging by hand.

Environment also matters. [Currents' staging-vs-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that tests which pass in staging can fail in production due to real data variance, third-party integrations, or timing differences, adding another class of non-deterministic failures that aren't strictly the test's fault but still need operational handling.

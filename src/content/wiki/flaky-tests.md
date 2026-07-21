---
title: Flaky tests
summary: >-
  Flaky tests fail intermittently without code changes, costing teams time
  through manual triage, false CI signal, and compounding trust erosion in the
  test suite.
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
compiled_at: '2026-07-21T05:03:37.842Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 672
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
  cost_usd: 0.01899
---
A flaky test is one that produces inconsistent results across identical runs. The failure mode ranges from timing-sensitive race conditions to environment differences to tests that couple too tightly to implementation details and break whenever the UI shifts.

At sufficient scale the problem becomes an operational burden. [Mendral's CI agent at PostHog](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processes 575K weekly CI jobs and 33M test executions; a significant part of its value is tracing flaky failures to root causes automatically and opening fix PRs, because manual triage at that volume is not viable. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a similar angle at smaller scale, auto-categorizing Playwright failures into bugs, flaky tests, and UI changes to reclaim the 6-8 engineering hours typically lost weekly to manual investigation.

One structural cause of flakiness is test design. The [Currents Team on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that coupling selectors to CSS classes, DOM position, or internal structure makes tests brittle by nature; semantic roles, accessible labels, and stable text are less likely to shift under refactors. The same pattern appears in AI-generated tests: [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents over 20 code smells AI tools introduce, including selectors that target implementation details and tests written to match a buggy implementation rather than intended behavior, both of which produce tests that flip results across runs or environments.

Environment is a second axis. [Playwright testing in staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that environment mismatch is a real source of inconsistent results; a test that passes in staging may fail against production data or configuration, which reads as flakiness even when the test logic is sound.

Infrastructure tuning can reduce incidental flakiness without changing test logic. [Jakob Norlin's GitHub Actions setup](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) shows that caching browser binaries and tuning worker parallelism removes the resource contention and cold-start variance that cause timing-dependent tests to flip.

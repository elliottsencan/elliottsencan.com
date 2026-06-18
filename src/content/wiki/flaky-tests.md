---
title: Flaky tests
summary: >-
  Flaky tests fail non-deterministically, wasting CI time and eroding trust in
  test suites; sources here cover root-cause detection, automated triage,
  selector stability, and environment-level contributors.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
compiled_at: '2026-06-18T23:04:33.113Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2818
    output_tokens: 477
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
  cost_usd: 0.015609
---
A flaky test is one that produces inconsistent results across identical runs, failing without a code change and passing without a fix. At scale the problem compounds fast. PostHog's CI pipeline runs 575K jobs and 33M test executions weekly, and [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) traces flaky failures to root causes by ingesting billions of log lines and opening fix PRs automatically, because at that volume human triage is not viable.

Not all flakiness originates in the test runner or timing. [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests coupled to CSS classes, DOM position, or implementation structure fail during routine UI refactors even when the behavior is unchanged. Tests anchored to semantic roles, accessible names, and visible labels survive those changes, reducing a major class of false negatives that masquerades as flakiness.

Environment choice also matters. [Playwright in staging vs production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that environment-specific state, data drift, and external dependencies each contribute to non-deterministic outcomes, so which tests run where shapes how much flakiness a team will encounter in practice.

[TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the categorization layer: its analytics automatically sorts failures into bugs, flaky tests, or UI changes, which is a prerequisite for acting on flakiness data rather than just observing it.

---
title: Flaky tests
summary: >-
  Flaky tests produce inconsistent results across identical runs, wasting
  engineer time and eroding trust in CI; the sources converge on causes rooted
  in implementation coupling and offer both tooling and design-level remedies.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-07-01T04:47:01.801Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 589
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
  cost_usd: 0.01728
---
A flaky test is one that passes and fails on the same code without any change to the codebase, making its signal unreliable. At scale the problem becomes acute: [PostHog's CI pipeline](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 33 million test executions weekly, and tracing flakiness to a root cause by hand across billions of log lines is not feasible, which is why Mendral's AI agent now opens fix PRs automatically after tracing failures to their source.

One structural cause is implementation coupling. [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) argues that tests break, and flap, when they anchor to CSS classes, DOM position, or internal component structure rather than semantic roles, labels, and accessible names that remain stable across refactors. AI-generated tests compound this: [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and testing only happy paths, which produce suites that pass against a buggy implementation but fail unexpectedly in production conditions.

Environment mismatch is a separate driver. [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that tests written for staging can behave differently in production due to data state, network conditions, and third-party dependencies, so categorizing failures requires knowing which environment produced them.

[TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the classification problem directly, auto-categorizing failures as bugs, flaky tests, or UI changes and claiming to recover 6-8 engineer hours per week. The tooling trend across all sources points the same direction: automated triage is becoming necessary infrastructure rather than a nice-to-have, because at any meaningful scale the cost of manually auditing flaky results exceeds the cost of the failures themselves.

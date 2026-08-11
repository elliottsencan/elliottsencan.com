---
title: Flaky tests
summary: >-
  Flaky tests are test failures that don't reflect real bugs, caused by
  environmental instability, implementation coupling, or poor test authorship;
  multiple sources converge on detection, root-cause analysis, and prevention as
  the core challenges.
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
compiled_at: '2026-08-11T05:17:58.657Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 577
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
  cost_usd: 0.017565
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. The failure modes vary: a test might depend on timing, external state, or DOM structure that shifts between runs or environments. At sufficient scale the problem becomes an operational burden rather than a minor nuisance. PostHog's CI setup, as described by [Mendral](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), runs 33 million test executions weekly, and an AI triage agent is required just to trace flaky failures to root causes and open fix PRs automatically.

One structural cause of flakiness is coupling tests to implementation details. The [Currents Team](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests tied to CSS classes, DOM position, or internal structure will break on any UI refactor even when behavior is unchanged. Tests that select elements by semantic role, accessible name, or label survive those changes because they bind to stable user-facing contracts.

AI-generated tests introduce their own flakiness risks. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and writing tests to match a buggy implementation rather than intended behavior, both of which produce tests that pass inconsistently or for the wrong reasons.

Detection tooling addresses the classification problem. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes Playwright failures as bugs, flaky tests, or UI changes, claiming to save engineers several hours per week by separating noise from signal. Environment parity also matters: the [Currents Team](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that tests run against staging versus production can yield different failure patterns, meaning environment choice affects which failures appear flaky and which reflect real regressions.

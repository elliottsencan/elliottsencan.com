---
title: Flaky tests
summary: >-
  Flaky tests are non-deterministic test failures that signal environment
  coupling, fragile selectors, or implementation-tied assertions; modern tooling
  increasingly automates their detection, classification, and remediation.
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
compiled_at: '2026-07-19T14:37:20.672Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 654
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
  cost_usd: 0.01872
---
A flaky test is one that fails intermittently without a corresponding change in the code under test. The failure mode matters because it erodes trust in CI: when engineers learn to re-run rather than investigate, real regressions start slipping through.

The causes cluster around a few patterns. [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that the deeper problem is coupling to implementation details, CSS classes, DOM structure, and element position, rather than to semantic roles and accessible names that stay stable across refactors. That coupling produces tests that break on any visual change regardless of whether behavior changed. [Code Smells when you get AI to write your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) adds that AI-generated tests compound this by over-mocking and by asserting against a buggy implementation rather than intended behavior, generating a class of tests that pass when they should fail and fail when the scaffolding shifts.

Environment instability is a separate axis. [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that staging environments introduce their own non-determinism, and that some flakiness attributed to test design is really environmental drift between where tests run and where code runs.

At scale, manual triage becomes untenable. [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes PostHog running 33 million test executions weekly, with an AI agent ingesting the resulting log volume to trace flaky failures to root causes and open fix PRs automatically. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a similar angle for Playwright specifically, auto-categorizing failures into bugs, flaky tests, and UI changes to reduce the triage burden. [Playwright on GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) addresses a contributing factor at a lower level: slow, poorly parallelized CI runs create timing pressure that surfaces flakiness that faster, properly cached runs would suppress.

---
title: Flaky tests
summary: >-
  Flaky tests produce inconsistent results across identical runs, undermining CI
  reliability; sources across tooling, test design, and AI-assisted workflows
  converge on root causes and mitigation strategies.
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
compiled_at: '2026-10-26T22:26:44.389Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 612
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
  cost_usd: 0.018591
---
A flaky test is one that passes or fails non-deterministically without any code change. At scale, the problem compounds fast. [Mendral's CI work at PostHog](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) illustrates the ceiling: 575,000 weekly CI jobs and 33 million test executions, where distinguishing real failures from flakiness requires ingesting billions of log lines and tracing each failure to a root cause before any human triage begins.

The most common structural source of flakiness in browser tests is coupling to implementation details. [Currents on Playwright test resilience](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during UI refactors not primarily because of selector strategy, but because they target CSS classes, DOM position, or internal structure rather than semantic roles, labels, and accessible names that remain stable across refactors.

AI-generated tests introduce their own flakiness vectors. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and testing only happy paths, which produce tests that pass against a broken implementation. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses this at the reporting layer by auto-categorizing failures into bugs, flaky tests, and UI changes, reducing the manual triage cost.

Environment inconsistency is a separate axis. [Currents on staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that tests pass in staging and fail in production, or vice versa, based on data state and network conditions, which means environment selection is itself a flakiness variable. Infrastructure tuning also matters: [Jakob Norlin on GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) shows that misconfigured parallelism and uncached browser binaries introduce timing variance that mimics flakiness.

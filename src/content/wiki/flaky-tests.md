---
title: Flaky tests
summary: >-
  Tests that produce inconsistent results across runs without code changes,
  caused by environment coupling, implementation-detail selectors, or
  AI-generated patterns that mirror bugs rather than intended behavior.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-07-04T21:20:53.185Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 637
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
  cost_usd: 0.018
---
A flaky test is one that passes and fails non-deterministically. The failure is real in the sense that it consumes engineering time, but the signal is corrupted because the failure does not reliably correspond to a broken product.

At scale, flakiness becomes a triage problem as much as an authorship problem. [PostHog's CI setup](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575,000 weekly jobs and 33 million test executions; at that volume, distinguishing a genuine regression from a flaky run requires ingesting billions of log lines. Mendral's AI agent handles this by tracing failures to root causes and opening fix PRs automatically. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a similar analytics-layer approach for Playwright suites, auto-categorizing failures as bugs, flaky tests, or UI changes, and claiming to recover 6-8 engineering hours per week.

The more durable fix is authorship discipline. [Currents on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that flakiness during refactors is rarely about selector syntax alone; it comes from coupling tests to CSS classes, DOM position, or implementation structure rather than semantic roles, accessible names, and labels that persist across redesigns. Tests written against stable contracts break less often.

Environment mismatch is a separate flakiness vector. [Currents on staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames the staging-versus-production decision partly around which environment reduces non-determinism for a given test type. Some flows fail in staging for reasons that have nothing to do with the application.

AI-generated tests introduce a newer source of flakiness. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and writing assertions that match a buggy implementation rather than intended behavior. A test calibrated to a bug will flip from passing to failing once the bug is fixed, producing exactly the kind of unreliable signal flakiness is known for, except in reverse.

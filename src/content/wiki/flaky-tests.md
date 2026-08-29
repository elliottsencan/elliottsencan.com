---
title: Flaky tests
summary: >-
  Flaky tests are test failures that occur non-deterministically, caused by
  environment coupling, unstable selectors, or timing issues; addressing them
  requires both structural test design choices and tooling that can identify and
  triage them automatically.
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
compiled_at: '2026-08-29T20:15:59.810Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 596
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
  cost_usd: 0.018351
---
A flaky test is one that fails intermittently without a corresponding change in application behavior. The failure is a signal about the test, not the code under test, and that distinction matters for how teams respond.

The most common structural cause is coupling to implementation details. [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during refactors because they target CSS classes, DOM position, or element structure rather than semantic roles, accessible names, and labels that remain stable across visual changes. The same logic applies to flakiness: a selector tied to a transient CSS class becomes unreliable the moment a designer renames it.

AI-generated tests compound this problem. [Code Smells when you get AI to write your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and testing the current (possibly broken) implementation rather than intended behavior, both of which produce tests that pass inconsistently depending on environment state.

At scale, flakiness becomes an operational cost. [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes 33 million weekly test executions at PostHog, where an AI triage agent ingests log output, traces flaky failures to root causes, and opens fix PRs automatically. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a lighter-weight approach, auto-categorizing failures as bugs, flaky tests, or UI changes to help teams decide which failures merit investigation versus retry.

Environment parity is a contributing factor too. [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that test reliability varies significantly depending on which environment tests run in, and that some failures categorized as flaky in staging reflect genuine environment drift rather than test quality issues.

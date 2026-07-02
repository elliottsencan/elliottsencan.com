---
title: Flaky tests
summary: >-
  Tests that fail intermittently without code changes, caused by environment
  coupling, implementation-detail selectors, or AI-generated patterns that paper
  over intended behavior rather than testing it.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-07-02T12:28:24.672Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 622
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
  cost_usd: 0.017775
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. The failure mode is expensive: engineers must decide on each red build whether something broke or the test is lying. At scale the cost compounds fast. PostHog runs 575,000 CI jobs and 33 million test executions weekly, and Mendral's AI triage agent exists largely because flaky tests are hard to diagnose manually at that volume [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team).

Flakiness in browser tests often comes from how tests locate elements. Tests that couple to CSS classes, DOM position, or implementation-specific structure will fail whenever those details change, even when user-facing behavior is unchanged. Using semantic roles, accessible names, and labels as selectors produces tests that survive UI refactors because those attributes track intent, not structure [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Environment mismatch introduces a separate class of flakiness: a test that passes reliably in staging may fail intermittently in production because of data state, network conditions, or third-party dependencies [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production).

AI-generated tests introduce their own flakiness vectors. Common patterns include over-mocking, testing only happy paths, and writing assertions that match a buggy implementation rather than intended behavior [Code Smells when you get AI to write your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). Tests written to match current output will pass until the bug is fixed, then fail, producing the appearance of a regression. Tools like TestDino attempt to reduce the diagnostic burden by auto-categorizing failures as bugs, flaky tests, or UI changes, claiming to recover 6-8 engineer hours per week [TestDino](/reading/2026-04/2026-04-30t231348-testdino). The tooling addresses symptoms; the structural fixes are in selector strategy, environment parity, and review discipline over AI-generated test code.

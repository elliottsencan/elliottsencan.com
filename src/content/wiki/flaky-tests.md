---
title: Flaky tests
summary: >-
  Tests that fail intermittently without code changes, driven by environment
  sensitivity, implementation coupling, or poor test design — a persistent cost
  that teams at scale are increasingly routing through automated triage.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-07-08T00:14:27.412Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 748
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
  cost_usd: 0.019665
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. The failure mode is expensive: engineers must decide on each failure whether something real broke, and that judgment call burns time that compounds across large suites.

At PostHog's scale — 575K weekly CI jobs and 33 million test executions — Mendral's AI agent handles triage automatically, tracing flaky tests to root causes and opening fix PRs without human intervention [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). TestDino approaches the same problem by auto-categorizing failures as bugs, flaky tests, or UI changes, claiming this saves engineers 6–8 hours per week [TestDino](/reading/2026-04/2026-04-30t231348-testdino). Both tools treat classification as the first lever: you cannot fix what you cannot reliably identify.

On the design side, the Currents team argues that many failures labeled "flaky" are actually deterministic failures waiting for the right conditions. Tests coupled to CSS classes, DOM position, or internal component structure will break predictably when the UI is refactored, even though they appear intermittent if refactors are infrequent [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Anchoring selectors to semantic roles, accessible names, and visible labels makes tests sensitive to behavior rather than implementation, which removes a large class of apparent flakiness.

Environment mismatch is a separate source. The Currents team notes that tests running in staging against seeded data can fail in production because state assumptions do not hold — what looks like a flaky test may be a genuine environment-configuration problem [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production).

AI-generated tests introduce a newer vector. Patterns documented by How To Test Frontend — over-mocking, testing only happy paths, and writing assertions to match a buggy implementation rather than intended behavior — produce tests that pass consistently but miss real failures, or that fail consistently in environments where the mock does not reflect actual dependencies [Code Smells when you get AI to write your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). These are not flaky in the classic sense, but they occupy the same remediation space: the suite is telling you something unreliable.

The through-line across sources is that flakiness is a symptom with multiple causes. Automated classification tools address the detection layer. Selector discipline and environment hygiene address root causes in test design and infrastructure. Neither layer substitutes for the other.

---
title: Flaky tests
summary: >-
  Flaky tests produce inconsistent results across identical runs, wasting
  engineering time and eroding trust in CI pipelines; recent tooling applies AI
  triage, semantic selectors, and environment-aware strategies to reduce their
  cost.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
compiled_at: '2026-06-21T20:21:48.780Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2648
    output_tokens: 547
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
  cost_usd: 0.016149
---
A flaky test is one that passes or fails non-deterministically without any change to the code under test. At scale the problem compounds fast. PostHog's CI pipeline runs 575,000 jobs and 33 million test executions per week, and Mendral's AI agent exists primarily to triage the resulting noise, ingesting billions of log lines to trace flaky failures to root causes and open fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team).

One structural cause of flakiness in UI tests is coupling selectors to implementation details. Tests that target CSS classes, DOM position, or internal component structure break whenever the UI is refactored, even when behavior is unchanged. The Currents team argues that binding to semantic roles, accessible names, and user-visible labels produces selectors that survive refactors and generate fewer false failures [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors).

Environment mismatch is a separate source of flakiness. Running tests against staging can mask production-only failures, while running them in production introduces risks around real data and user impact. Splitting tests by risk profile, reserving destructive or edge-case flows for staging and critical-path smoke tests for production, reduces environment-driven non-determinism [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production).

Tooling like TestDino addresses the classification problem directly, auto-categorizing failures as bugs, flaky tests, or UI changes rather than dumping all failures into a single queue [TestDino](/reading/2026-04/2026-04-30t231348-testdino). Whether that classification is accurate enough to act on without human review is a question none of these sources fully settle.

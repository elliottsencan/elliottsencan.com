---
title: Flaky tests
summary: >-
  Flaky tests are non-deterministic test failures that obscure real bugs and
  waste engineering time; sources address detection, root causes, and mitigation
  across CI pipelines and Playwright suites.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
compiled_at: '2026-06-22T02:40:51.221Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2648
    output_tokens: 553
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
  cost_usd: 0.016239
---
A flaky test is one that passes and fails across runs without any change to the code under test. At scale, the problem compounds fast. PostHog runs 33 million test executions per week, and at that volume flaky tests become a primary source of CI noise, burying legitimate failures and eroding trust in the pipeline [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team).

Two overlapping causes recur across the sources. First, tests that couple to unstable implementation details, CSS classes, DOM position, internal component structure, will flip whenever the UI is refactored even if behavior is unchanged [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Targeting semantic roles, accessible names, and labels instead ties assertions to what the user sees, not how the code is structured. Second, environment differences between staging and production introduce their own non-determinism; a test that passes in a controlled staging environment may fail intermittently against live data or real network conditions [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production).

Detection and triage are increasingly handled by tooling. TestDino auto-categorizes Playwright failures into bugs, flaky tests, or UI changes, claiming to save engineers 6-8 hours weekly [TestDino](/reading/2026-04/2026-04-30t231348-testdino). Mendral's CI agent goes further, ingesting log data at scale to trace flaky tests to root causes and open fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). Both approaches treat flaky-test triage as an automation problem rather than a manual debugging task.

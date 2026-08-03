---
title: Flaky tests
summary: >-
  Tests that fail inconsistently undermine CI reliability and waste engineering
  time; modern tooling addresses them through automated triage, stable selector
  strategies, and environment-aware test design.
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
compiled_at: '2026-08-03T10:06:52.736Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 643
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
  cost_usd: 0.018555
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. At scale, the problem compounds quickly. At PostHog, [Mendral's CI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processes 575K weekly CI jobs and 33M test executions, and a significant part of its job is distinguishing genuine failures from noise, tracing flaky tests to root causes, and opening fix PRs automatically. Without that triage layer, engineers drown in alerts they can't trust.

The causes of flakiness often trace back to how tests are written. [Currents on Playwright resilience](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that staging environments introduce their own instability, so tests that pass locally may fail in CI for environmental rather than code reasons. More structurally, [the Currents team on UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests coupled to CSS classes, DOM position, or implementation details are inherently fragile, and that selectors anchored to semantic roles and accessible names hold up far better across refactors.

AI-generated tests introduce a related pattern. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents over 20 recurring code smells in AI-written test suites, including over-mocking and tests written to match a buggy implementation rather than intended behavior. Tests like that may appear stable while actually masking real failures, a subtler form of unreliability.

On the tooling side, [TestDino](/reading/2026-04/2026-04-30t231348-testdino) offers an analytics layer for Playwright that auto-categorizes failures into bugs, flaky tests, or UI changes, claiming 6-8 hours of weekly savings per engineer. [Jakob Norlin on GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) approaches the problem from the infrastructure angle, cutting run times significantly through caching and parallelism, which reduces the window in which timing-sensitive flakiness can surface.

---
title: Flaky tests
summary: >-
  Flaky tests are test suite failures that stem from non-deterministic behavior,
  implementation coupling, or environment inconsistency rather than real bugs,
  and managing them is a growing focus at both the tooling and infrastructure
  level.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
compiled_at: '2026-06-20T12:50:05.423Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2648
    output_tokens: 496
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
  cost_usd: 0.015384
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. At scale, this becomes a significant drain: [Mendral's CI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) reports handling 575K weekly CI jobs and 33M test executions at PostHog, where tracing flaky tests to root causes and opening fix PRs automatically is one of the agent's core tasks. That volume makes manual triage impractical, which is why AI-assisted classification and remediation are appearing at this layer.

At a lower level, [Currents on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that a common source of brittleness is coupling tests to implementation details like CSS classes, DOM structure, or element position, rather than to semantic roles, accessible names, and labels that remain stable across refactors. This is a structural cause of flakiness distinct from timing or network non-determinism: the test was written against the wrong abstraction.

[TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the classification problem directly, auto-categorizing Playwright failures into bugs, flaky tests, or UI changes. The distinction matters operationally: a flaky failure should trigger a retry and investigation, not an incident. [Currents on staging vs production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) adds another axis, noting that environment inconsistency between staging and production is itself a source of unreliable results, making environment choice part of the flakiness problem rather than separate from it.

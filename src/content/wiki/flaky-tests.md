---
title: Flaky tests
summary: >-
  Tests that fail intermittently without code changes, driven by environment
  instability, implementation coupling, or poor test authorship — a recurring
  friction point across CI pipelines, Playwright suites, and AI-generated test
  code.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-06-26T02:56:55.473Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 772
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
  cost_usd: 0.020025
---
A flaky test is one that produces inconsistent results across runs on the same code. The failure mode matters because it erodes trust in the test suite: engineers start ignoring red builds, which is exactly when real regressions go unnoticed.

At scale, flakiness becomes an operational problem. [PostHog's CI setup via Mendral](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575K weekly jobs and 33M test executions. At that volume, even a small flakiness rate produces constant noise. Mendral's AI agent ingests the resulting log data, traces flaky failures to root causes, and opens fix PRs automatically — treating flakiness as a triage and repair problem rather than something engineers should chase manually.

[TestDino](/reading/2026-04/2026-04-30t231348-testdino) approaches the same problem at the reporting layer, auto-categorizing Playwright failures into bugs, flaky tests, or UI changes. The categorization step is the key insight: not all red tests mean the same thing, and collapsing them into a single failure bucket forces engineers to re-investigate context every time.

One structural cause of flakiness in UI tests is coupling to implementation details. [Currents on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break not primarily from bad selector choices but from binding to CSS classes, DOM structure, or element position rather than semantic roles, accessible names, and labels. When the UI is refactored, those bindings break even when behavior is unchanged — producing failures that are technically correct but signal nothing meaningful about the product.

Environment choice compounds this. [Currents on staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that tests run against staging face data inconsistency and environment drift that production tests avoid, while production tests introduce their own operational costs. The instability of the environment is a direct source of non-determinism in results.

AI-generated tests introduce a distinct failure mode. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking, happy-path bias, and tests written to match a buggy implementation rather than intended behavior. Tests that only exercise a narrow slice of state, or that mock away the parts most likely to change, are structurally prone to either false passes or brittle failures when the system evolves.

The through-line across these sources is that flakiness is rarely random. It has causes: implementation coupling, environment instability, narrow test scope, and poor categorization that hides the signal. Addressing it requires both better authorship practices and tooling that can distinguish a flaky failure from a real one at the point of triage.

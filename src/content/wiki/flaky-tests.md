---
title: Flaky tests
summary: >-
  Tests that pass and fail non-deterministically, distinct from genuine bugs or
  expected UI changes, representing a category of noise that tools, practices,
  and AI triage pipelines increasingly treat as a first-class CI problem.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-07-09T14:12:43.362Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 653
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
  cost_usd: 0.01824
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. The term covers a spectrum: timing-dependent assertions, environment-sensitive setups, tests that couple to DOM structure or CSS classes rather than stable semantic attributes, and AI-generated tests written to match a buggy implementation rather than intended behavior.

At scale the problem becomes a CI throughput issue. [Mendral's CI agent at PostHog](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processes 575K weekly jobs and 33M test executions; a meaningful portion of its work is tracing flaky failures to root causes and opening fix PRs automatically, treating flakiness as a signal worth routing rather than noise worth ignoring.

Design choices at the test-authoring stage determine how much flakiness accumulates over time. [Currents on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break not primarily from bad selector choices but from coupling to implementation details like CSS classes and DOM position, rather than semantic roles, labels, and accessible names that remain stable across refactors. Separately, [Currents on staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that environment mismatches between staging and production introduce another category of non-determinism, where a test may reliably pass in one context and fail in another for reasons unrelated to the code.

AI-generated tests introduce their own flakiness vectors. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking, testing only happy paths, and writing assertions against a buggy implementation rather than intended behavior. These tests may appear stable until the underlying bug is fixed, at which point they begin failing for the right reason at the wrong moment.

Tools like [TestDino](/reading/2026-04/2026-04-30t231348-testdino) approach flakiness from the reporting side, auto-categorizing failures as bugs, flaky tests, or UI changes to reduce the manual triage burden that otherwise consumes engineering time. The claimed savings of 6-8 hours weekly per engineer reflects how significant that triage cost is in practice.

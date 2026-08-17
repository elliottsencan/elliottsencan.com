---
title: Flaky tests
summary: >-
  Flaky tests produce inconsistent results across identical code, and the
  sources collected here treat them as a solvable infrastructure problem
  requiring better selectors, smarter tooling, and automated triage.
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
compiled_at: '2026-08-17T18:45:00.651Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 662
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
  cost_usd: 0.019341
---
A flaky test is one that fails intermittently without any change to the code under test. The causes are varied but fall into recognizable categories: environment-dependent timing, fragile selectors that break on DOM restructuring, over-coupling to implementation details, and inconsistent test data. Across the sources here, the through-line is that flakiness is less a testing philosophy problem and more an engineering infrastructure one.

On the selector side, [Currents](https://currents.dev) argues that Playwright suites break during UI refactors primarily because tests couple to CSS classes, DOM position, or internal structure rather than semantic roles, accessible names, and visible labels [designing-playwright-tests-that-survive-ui-refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Selectors tied to stable, user-visible attributes survive refactors; those tied to implementation details do not. AI-generated tests make this worse: they tend to encode the DOM structure at generation time, baking in the same brittle assumptions [code-smells-when-you-get-ai-to-write-your-frontend-tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests).

At scale, flakiness becomes a triage bottleneck. PostHog runs 33 million test executions per week; Mendral's AI agent ingests the resulting log data, traces failures to root causes, and opens fix PRs automatically [what-ci-actually-looks-like-at-a-100-person-team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). TestDino takes a similar approach for Playwright specifically, auto-categorizing failures as bugs, flaky tests, or UI changes to cut the manual triage load [testdino](/reading/2026-04/2026-04-30t231348-testdino).

Environment choice also contributes to flakiness. Running tests in staging exposes them to configuration drift and synthetic data inconsistency; running in production introduces its own risks. Splitting test suites by environment and matching each flow to where its dependencies are actually stable reduces a class of false negatives that read as flakiness playwright-testing-in-staging-vs-production.

---
title: Flaky tests
summary: >-
  Tests that pass or fail non-deterministically, flakiness stems from
  environment coupling, implementation-detail selectors, and AI-generated
  anti-patterns, and resolving it at scale increasingly involves automated
  triage and classification.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-07-01T00:37:39.976Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 754
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
  cost_usd: 0.019755
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. At small scales this is a nuisance; at scale it becomes a systemic reliability problem that erodes trust in CI pipelines entirely.

PostHog's CI setup, described in [Mendral's piece on CI at scale](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), illustrates the operational weight: 575K weekly jobs and 33M test executions generate enough noise that manual triage is not viable. Their approach delegates flaky-test root-cause analysis to an AI agent that ingests billions of log lines and opens fix PRs automatically. The classification step matters here because not all failures are flakiness, and confusing a genuine regression with a flaky test delays real fixes.

[TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses that classification problem directly for Playwright suites, auto-categorizing failures into bugs, flaky tests, or UI changes. The distinction between "flaky" and "UI change" is itself meaningful: a test that breaks because the interface legitimately changed is not flaky, it is outdated, and treating it as noise hides real information.

Most flakiness in browser tests traces to selector strategy. [Currents on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues the root cause is coupling to implementation details: CSS classes, DOM position, and structural hierarchy that shift during routine refactors. Tests anchored to semantic roles, accessible names, and labels survive refactors because those attributes reflect user-facing intent rather than internal structure. The fix is not just better selectors; it is writing tests that ask what the user sees rather than how the DOM is arranged.

Environment mismatch is a separate flakiness source. [Currents on staging vs. production testing](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that tests passing in staging can fail in production due to environment-specific data, third-party dependencies, or configuration drift. Deciding which tests run where is part of controlling flakiness, not just a deployment concern.

AI-generated tests introduce their own flakiness vectors. [How To Test Frontend's code smells survey](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and testing only happy paths, which can produce tests that pass reliably but fail to catch real bugs, or tests that are brittle to any deviation from the narrow path the AI was shown. Writing tests to match a buggy implementation rather than intended behavior is a related failure mode that makes tests pass consistently while capturing the wrong thing entirely.

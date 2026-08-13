---
title: Flaky tests
summary: >-
  Tests that pass and fail non-deterministically, explored across sources
  covering root causes, detection tooling, AI-driven triage, and
  environment-specific strategies for Playwright suites.
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
compiled_at: '2026-08-13T21:13:11.379Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 585
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
  cost_usd: 0.018186
---
A flaky test is one that produces inconsistent results across identical runs without any code change. The failure modes are varied: timing issues, environment differences, implementation coupling, or tests written to match a buggy implementation rather than intended behavior.

Environment is a significant variable. [Playwright testing across staging and production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames flakiness partly as an artifact of where tests run, since production data, network conditions, and third-party integrations introduce non-determinism that staging masks. Running tests in the wrong environment can make genuinely stable tests appear flaky, or hide real instability.

Selector and coupling choices are the other dominant cause. [Designing Playwright tests that survive UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests tied to CSS classes, DOM position, or internal structure break whenever implementation changes, even when behavior stays the same. Tests anchored to semantic roles and accessible names are more stable because those identifiers track user-facing intent, not structure. AI-generated tests compound this: [code smells from AI-written frontend tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and testing against buggy implementations, both of which contribute to tests that are unreliable by construction.

At scale, flakiness becomes an operational problem requiring dedicated tooling. [Mendral's CI agent at PostHog](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processes 575K weekly CI jobs and 33M test executions, ingesting log data to trace flaky tests to root causes and open fix PRs automatically. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) targets the same problem from a reporting angle, auto-categorizing failures as bugs, flaky tests, or UI changes to cut triage time. These tools treat flakiness as a signal to classify and route, not just noise to suppress.

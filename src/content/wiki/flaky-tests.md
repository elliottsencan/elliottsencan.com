---
title: Flaky tests
summary: >-
  Flaky tests produce inconsistent results across identical runs, wasting
  engineering time and eroding trust in CI pipelines; multiple sources converge
  on categorization, root-cause tracing, and authorship discipline as the main
  remedies.
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
compiled_at: '2026-10-19T22:08:32.262Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 647
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
  cost_usd: 0.019116
---
A flaky test is one that passes and fails on the same code without any change to the codebase. The inconsistency can come from timing, environment differences, selector fragility, or tests that were written against implementation details rather than stable behavior.

At scale the problem compounds fast. PostHog's CI pipeline runs 575K jobs and 33M test executions weekly, and [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) exists almost entirely to absorb that noise, tracing flaky failures to root causes and opening fix PRs automatically. Without something doing that triage work, engineers burn hours re-running jobs hoping for a green result.

[TestDino](/reading/2026-04/2026-04-30t231348-testdino) approaches the same problem at the reporting layer, auto-categorizing Playwright failures as bugs, flaky tests, or UI changes. The claim is 6-8 hours saved weekly per engineer, which signals how much time manual triage was consuming before categorization was automated.

A significant portion of flakiness is authored in. [AI-generated frontend tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) frequently couple assertions to implementation details, test only happy paths, or mirror a buggy implementation rather than intended behavior. [Tests that break on UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) exhibit the same underlying pattern: selectors tied to CSS classes, DOM position, or structure rather than semantic roles and accessible names. Both sources point to the same fix, write tests against what the interface means, not how it is built.

Environment is another axis. [Splitting tests between staging and production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) reduces a category of flakiness caused by mismatches between test assumptions and runtime conditions. Infrastructure choices matter too: [caching Playwright browser binaries and tuning worker parallelism](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) cuts run time and reduces the window for timing-dependent failures.

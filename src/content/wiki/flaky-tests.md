---
title: Flaky tests
summary: >-
  Flaky tests produce inconsistent results across identical runs, wasting CI
  time and eroding trust in test suites; the sources trace causes to coupling,
  environment differences, and AI-generated test patterns, and propose tooling
  and structural fixes.
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
compiled_at: '2026-08-03T19:34:47.258Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 641
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
  cost_usd: 0.018525
---
A flaky test is one that passes sometimes and fails other times without any change to the code under test. At scale, the cost compounds quickly. [PostHog's CI pipeline](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575K weekly jobs and 33M test executions; Mendral's AI agent exists partly because manually triaging which failures are real bugs versus noise is untenable at that volume.

The structural causes tend to cluster. [Currents on refactor-resistant tests](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues the main culprit is coupling to implementation details, CSS classes, DOM position, and internal structure rather than semantic roles, accessible names, and labels that stay stable across refactors. A test that breaks every time a class is renamed is not catching a real regression. [AI-generated test code smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) adds a related problem: AI tools frequently write tests that match a buggy implementation rather than intended behavior, and over-mock dependencies in ways that let tests pass even when the real integration is broken.

Environment differences are a separate flakiness vector. [Playwright staging vs production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that tests sensitive to data state or third-party availability behave differently across environments, which produces failures that look flaky but are actually environmental. Tuning where tests run and what they depend on is part of controlling that surface.

On the tooling side, [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes Playwright failures as bugs, flaky tests, or UI changes, claiming to recover 6-8 engineer-hours weekly that would otherwise go to manual triage. [GitHub Actions setup](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) addresses a contributing factor: slow feedback loops that make engineers distrust CI and re-run jobs hoping for a green result, a behavior that masks flakiness rather than fixing it.

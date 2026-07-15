---
title: Flaky tests
summary: >-
  Tests that fail intermittently without code changes, caused by environment
  sensitivity, implementation coupling, or AI-generated antipatterns, and
  increasingly managed through automated triage and smarter authoring practices.
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
compiled_at: '2026-07-15T04:04:19.765Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 685
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
  cost_usd: 0.019185
---
A flaky test is one that produces inconsistent results across runs on the same code. The failure mode is distinct from a genuine regression: the test itself is the problem, not the product. At scale this distinction becomes operationally urgent. [Mendral's CI work at PostHog](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 33 million test executions per week, and a meaningful portion of CI triage effort goes to separating real failures from noise. Their AI agent traces flaky tests to root causes and opens fix PRs automatically, treating flakiness as a first-class signal rather than background noise.

One structural source of flakiness is coupling tests to implementation details. [Currents on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that Playwright suites break not primarily because of selector strategy but because tests anchor to CSS classes, DOM position, and structure rather than semantic roles and accessible names. Those surface details change frequently; behavior-level anchors do not. A related authoring failure comes from AI-generated tests: [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and writing tests that match a buggy implementation rather than intended behavior, both of which produce tests that pass reliably but for the wrong reasons, or fail whenever the implementation shifts.

Environment mismatch is another driver. [Currents on staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that tests behaving differently across environments is a known cost of production testing, and that deciding which flows belong in staging versus production is itself a flakiness-management decision. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the categorization problem directly, auto-classifying failures as bugs, flaky tests, or UI changes to reduce the manual work of interpreting run results.

Infrastructure tuning also bears on perceived flakiness. [Jakob Norlin on Playwright and GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) shows that caching browser binaries and tuning parallelism cuts run time significantly; slow or resource-starved runners introduce timing sensitivity that makes tests appear flaky when the real issue is contention.

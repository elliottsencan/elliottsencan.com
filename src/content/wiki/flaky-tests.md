---
title: Flaky tests
summary: >-
  Flaky tests produce inconsistent results across identical runs, eroding trust
  in CI and wasting engineering time; multiple tooling and design approaches aim
  to detect, categorize, and prevent them.
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
compiled_at: '2026-07-20T19:45:22.189Z'
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
A flaky test is one that fails intermittently without a corresponding change in the code under test. At scale, the problem compounds quickly. [Mendral's CI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processes 33 million weekly test executions at PostHog and traces flaky failures to root causes automatically, opening fix PRs rather than leaving engineers to manually bisect log output across billions of lines.

Flakiness often originates in test design rather than infrastructure. [Currents on Playwright and UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break not primarily because of selector brittleness but because they couple to CSS classes, DOM structure, and positional details instead of semantic roles and accessible names. That coupling produces failures that look flaky when the real cause is an implementation-detail dependency. Similarly, [AI-generated test code smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and testing against a buggy implementation rather than intended behavior, both of which produce tests that pass or fail for reasons unrelated to real regressions.

[TestDino](/reading/2026-04/2026-04-30t231348-testdino) sits at the categorization layer, automatically classifying failures as bugs, flaky tests, or UI changes across Playwright runs and claiming to recover 6-8 hours of weekly engineering time spent triaging ambiguous failures.

Environment mismatch between staging and production is another flakiness source. [Currents on staging vs. production testing](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames the staging-vs-production split as a deliberate architectural choice: some flows are too risky or too variable to run in production, but staging environments introduce their own inconsistencies that can make a test's pass/fail status environment-dependent rather than behavior-dependent.

Infrastructure choices also affect apparent flakiness. [Jakob Norlin's GitHub Actions setup](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) notes that misconfigured parallelism and stale browser binaries introduce timing and state issues; caching binaries and tuning worker counts reduces the surface area where transient infrastructure failures masquerade as test failures.

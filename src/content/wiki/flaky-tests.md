---
title: Flaky tests
summary: >-
  Flaky tests are non-deterministic test failures that undermine CI reliability;
  sources across tooling, test design, and AI-assisted workflows converge on
  causes rooted in environment variance, poor selector choices, and over-coupled
  test logic.
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
compiled_at: '2026-11-17T01:42:45.808Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 778
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
  cost_usd: 0.021081
---
A flaky test is one that fails intermittently without any change to the code under test. At scale, the problem compounds quickly. [PostHog's CI pipeline](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575K weekly jobs and 33M test executions; Mendral's AI triage agent was built specifically because flaky tests at that volume produce enough noise to make failure signals meaningless without automated root-cause tracing.

One structural cause is test coupling to implementation details rather than stable semantics. Currents on surviving UI refactors argues that tests break not because of poor selector choices alone, but because they bind to CSS classes, DOM structure, and element position rather than semantic roles, accessible names, and labels. Those surface-level anchors shift during refactors, turning valid test logic into false failures.

AI-generated tests introduce a related pattern. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents over-mocking and tests written to match a buggy implementation rather than intended behavior, both of which manufacture flakiness by encoding accidental state into assertions.

Environment variance is a separate axis. [Playwright on GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) notes that uncached browser binaries and mistuned worker parallelism introduce timing instability; the same test suite that passes locally can produce intermittent failures under a cold CI runner. [Staging vs production testing](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) adds that environment mismatch between staging and production is itself a flakiness source when tests are written against assumptions that only hold in one context.

[TestDino](/reading/2026-04/2026-04-30t231348-testdino) and [Mendral](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) both treat flaky-test categorization as a first-class product feature, auto-labeling failures as bugs, flakiness, or UI drift. That classification step is what makes remediation tractable; without it, every red build requires manual triage. [Agentic AI testing](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test) positions debugging and exploration workflows as a natural fit for AI agents precisely because flaky failures often require iterative hypothesis testing that is expensive for humans to do at volume.

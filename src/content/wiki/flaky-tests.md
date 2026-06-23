---
title: Flaky tests
summary: >-
  Flaky tests produce non-deterministic results that erode trust in CI
  pipelines; the causes range from environment coupling and bad selectors to
  AI-generated code patterns, and tooling is increasingly used to detect and
  triage them automatically.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-06-23T23:20:08.977Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 633
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
  cost_usd: 0.01794
---
A flaky test is one that passes or fails inconsistently without any change to the code under test. At scale, the damage compounds quickly. [PostHog's CI pipeline](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575,000 jobs and 33 million test executions weekly; Mendral's AI agent was built specifically to trace flaky failures to root causes and open fix PRs automatically, because manual triage at that volume is not feasible.

Many flaky Playwright tests stem from coupling to implementation details rather than stable semantics. [Currents' guide on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues the real problem is selectors tied to CSS classes, DOM structure, or position rather than accessible names and semantic roles. Those attributes change freely during refactors; ARIA labels and visible text generally do not. A test written against the wrong layer will fail on a refactor that changed nothing behaviorally.

Environment instability is a separate but related source. [Currents on staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that some failures only reproduce in specific environments, which means a test can appear flaky when it is actually exposing a real environmental difference rather than a nondeterminism bug.

AI-generated tests introduce their own failure modes. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and writing tests that match a buggy implementation rather than intended behavior; both produce tests that pass in CI but give false confidence, a subtler form of the same trust erosion that flakiness causes.

[TestDino](/reading/2026-04/2026-04-30t231348-testdino) represents the reporting-layer response: auto-categorizing failures into bugs, flaky tests, and UI changes so engineers can act on results without spending hours in logs. The tooling approach and the design approach are complementary rather than competing. Better selectors reduce the rate of flakiness; better observability reduces the cost of diagnosing what remains.

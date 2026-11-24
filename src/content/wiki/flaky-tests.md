---
title: Flaky tests
summary: >-
  Tests that produce inconsistent results across identical runs, flaky tests
  waste engineering time, erode trust in CI pipelines, and stem from causes
  ranging from selector fragility to environment differences to AI-generated
  code patterns.
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
compiled_at: '2026-11-24T03:56:32.623Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 721
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
  cost_usd: 0.020226
---
A flaky test is one that passes or fails non-deterministically without any change to the code under test. At scale the problem compounds quickly: PostHog's CI pipeline runs 33 million test executions per week, and [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) exists specifically because flaky tests generate enough noise that manual investigation at that volume is impractical. The agent ingests billions of log lines, traces failures to root causes, and opens fix PRs automatically.

One structural cause of flakiness is coupling tests to implementation details rather than stable semantics. The [Currents team's guide on surviving UI refactors](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) and their [article on selector strategy](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) both point at CSS classes, DOM position, and internal component structure as fragile anchors. Tests built against accessible roles and labels are far less likely to break when the UI is restructured without changing its behavior.

Environment differences are another source. [Running Playwright tests against staging versus production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) introduces different failure modes: staging may have seeding or timing inconsistencies that production does not, while production carries risks around live data and external side effects. Matching the test to the right environment reduces spurious failures.

AI-generated tests introduce their own flakiness vectors. [How To Test Frontend's catalog of AI code smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking, testing only happy paths, and writing assertions that match a buggy implementation rather than intended behavior. Tests shaped this way can pass consistently while covering nothing real, or fail intermittently when mocks drift from reality.

On the tooling side, [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes failures into bugs, flaky tests, and UI changes, reducing the manual work of distinguishing a genuine regression from a transient environment blip. Infrastructure tuning also matters: [caching browser binaries and scoping which browsers run per CI event](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) reduces total run time, which in turn limits the window in which timing-related flakiness can occur.

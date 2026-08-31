---
title: Flaky tests
summary: >-
  Flaky tests are test-suite failures that appear non-deterministically, caused
  by environment sensitivity, implementation coupling, or unstable selectors,
  and increasingly managed through AI-assisted triage and categorization.
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
compiled_at: '2026-08-31T22:34:47.326Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 743
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
  cost_usd: 0.020556
---
A flaky test is one that fails intermittently without a change in the code under test. The failure mode matters because it erodes trust in CI signals: when engineers learn to ignore red builds, real regressions slip through.

At scale, the problem is logistical as much as technical. [Mendral's CI agent at PostHog](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processes 575K weekly jobs and 33M test executions, and a core part of its value is tracing flaky failures to root causes and opening fix PRs automatically. Manual triage at that volume is not viable. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a similar angle at the reporting layer, auto-categorizing failures as bugs, flaky tests, or UI changes before an engineer looks at them.

At the test-authoring level, flakiness often starts with how tests are written. [Currents on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues the root cause is coupling to implementation details like CSS classes and DOM position rather than semantic roles and accessible names. A test anchored to a class name will fail the moment a designer renames it, even though user-visible behavior did not change. AI-generated tests make this worse: [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns where AI tools write tests that match a buggy implementation rather than intended behavior, compounding the selector problem with fragile assumptions baked in at generation time.

Environment mismatch is another source. [Currents on staging vs production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that tests behave differently depending on which environment they run in, and assigning the wrong flows to staging can produce failures that never reproduce locally or in production. Infrastructure choices compound this: [Jakob Norlin on Playwright and GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) shows that worker parallelism and caching configuration directly affect run stability, not just speed.

The emerging response is agent-assisted triage rather than purely preventive authoring rules. [Endform on agentic AI testing](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test) frames AI agents as best suited to debugging and exploration workflows where flakiness investigation is the goal, distinct from regression runs where stable, fully-specified tests remain the standard.

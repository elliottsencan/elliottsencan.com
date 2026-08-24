---
title: Flaky tests
summary: >-
  Flaky tests are test failures that reflect environmental or structural
  instability rather than real defects, and the sources here address how to
  detect, categorize, and prevent them across Playwright-based CI workflows.
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
compiled_at: '2026-08-24T18:46:36.150Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 682
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
  cost_usd: 0.019641
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. At scale, the problem compounds quickly. [Mendral's CI analysis](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) of PostHog's 33 million weekly test executions shows that flakiness becomes a primary CI triage burden at team size, requiring automated root-cause tracing just to keep the signal-to-noise ratio usable.

The root cause is usually structural. [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that most brittleness comes from tests coupling to implementation details like CSS classes or DOM position rather than semantic roles and accessible names. When selectors depend on structure that changes during refactors, tests break for reasons unrelated to behavior, which is the definitional pattern of flakiness.

Environment is the other major axis. [Currents on staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that environment mismatches between staging and production introduce their own instability; tests that pass locally or in staging may fail in production against live data or network conditions.

AI-generated tests introduce a specific flakiness vector. [How To Test Frontend's code smells catalog](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and happy-path-only coverage, where tests are written to match a buggy implementation rather than intended behavior. Tests tuned to current implementation details are flaky by design once the implementation moves.

Detection tooling is maturing around this problem. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes failures as bugs, flaky tests, or UI changes, separating signal from noise without manual triage. The value of that classification depends on how reliably the categories map to actionable causes, which the tooling itself does not guarantee.

Runtime configuration also contributes. [Jakob Norlin's GitHub Actions setup guide](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) shows that worker count and caching choices affect whether timing-sensitive tests pass or fail, meaning the same test can be flaky or stable depending purely on runner configuration.

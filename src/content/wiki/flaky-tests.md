---
title: Flaky tests
summary: >-
  Flaky tests are test suite failures that stem from environmental instability,
  implementation coupling, or poor test design rather than genuine code defects,
  and managing them at scale increasingly involves automated triage and tooling.
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
compiled_at: '2026-07-24T05:00:24.205Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 655
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
  cost_usd: 0.018735
---
A flaky test is one that fails intermittently without a corresponding change in production code. At sufficient scale, the problem becomes systemic. [Mendral's CI agent at PostHog](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processes 575K weekly CI jobs and 33M test executions, and a core part of its job is tracing flaky tests to root causes and opening fix PRs automatically. Without that automation, flakiness at that volume would consume engineering time faster than it could be addressed manually.

Flakiness often originates in how tests couple to implementation details rather than user-visible behavior. The [Currents team on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during UI refactors because they target CSS classes, DOM structure, and element position rather than semantic roles, accessible names, and labels. Those surface-level selectors are inherently fragile; tests bound to stable semantics survive refactors without becoming noise. Similarly, [AI-generated test code smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) include patterns like over-mocking and testing a buggy implementation rather than intended behavior, which can produce tests that pass when they should fail or fail when the code is correct.

Environment mismatch is another source. [Playwright testing across staging and production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) surfaces the operational cost of each: staging environments diverge from production state, producing false failures; production runs introduce risk to real data. Deciding which flows belong where is itself part of controlling flakiness.

On the tooling side, [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes failures as bugs, flaky tests, or UI changes, positioning failure classification as a time-saving layer on top of Playwright runs. [Optimizing Playwright on GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) addresses a related problem: slow feedback loops that make it harder to distinguish real failures from timing-sensitive ones, with caching and parallelism cutting run time substantially.

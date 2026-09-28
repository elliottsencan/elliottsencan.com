---
title: Flaky tests
summary: >-
  Tests that produce inconsistent pass/fail results across identical runs,
  driven by timing issues, environment coupling, or unstable selectors, and
  increasingly addressed through automated triage, smarter authoring, and AI
  tooling.
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
compiled_at: '2026-09-28T23:04:53.463Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 744
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
  cost_usd: 0.020571
---
A flaky test is one that passes or fails non-deterministically without any change to the code under test. The failure modes cluster around a few recurring causes: selectors tied to DOM position or CSS class names rather than semantic roles, timing assumptions that break under load, and environment differences between staging and production.

[Designing Playwright tests that survive UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) puts the primary blame on implementation coupling rather than selector choice alone. A test that targets an accessible name or ARIA role stays stable across visual redesigns; one that targets a CSS class or DOM index does not. The same principle shows up in AI-generated test code: [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and implementation-matching that make tests pass for the wrong reasons and fail for spurious ones.

At scale, distinguishing a genuine regression from a flaky test becomes an operational problem. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes failures as bugs, flaky tests, or UI changes to reduce the triage burden engineers face after each run. [Mendral's CI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) operates at a larger order of magnitude, ingesting billions of log lines across 33 million weekly test executions at PostHog and opening fix PRs when it traces a flake to a root cause.

Environment configuration also introduces flakiness. [Playwright testing in staging vs production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that staging and production differ in data state, network latency, and third-party integrations, so a test suite that runs cleanly in one may fail intermittently in the other without any code change. Scoping which tests run where, as [Jakob Norlin's GitHub Actions setup](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) argues for with per-event browser targeting, limits the surface area where timing and resource contention can introduce non-determinism.

AI agents trained specifically for test debugging represent the emerging response to flakiness at volume. [Endform's agentic testing framework](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test) distinguishes bounded from fully adaptive agents; debugging flaky tests sits in the bounded category, where the agent has a clear success condition and limited blast radius if it errs.

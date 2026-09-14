---
title: Flaky tests
summary: >-
  Flaky tests — those that pass or fail non-deterministically — drain CI
  reliability and engineer time; multiple sources treat their detection, root
  causes, and automated triage as a central challenge in modern test
  infrastructure.
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
compiled_at: '2026-09-14T21:36:32.929Z'
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
A flaky test is one whose result cannot be trusted across runs without changing the underlying code. The failure mode is expensive: engineers discount red builds, retry pipelines reflexively, and lose the signal that CI exists to provide.

Root causes split into two broad categories. The first is environmental: timing issues, network dependencies, shared state between tests, and differences between staging and production configurations. [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames environment mismatch as a structural problem — tests that pass in staging can fail in production for reasons unrelated to the code under test, and vice versa. The second category is structural coupling inside the tests themselves. [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break non-deterministically when they bind to CSS classes, DOM position, or implementation details rather than semantic roles and accessible names. AI-generated tests compound this: [Code Smells when you get AI to write your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) catalogs patterns like over-mocking and happy-path bias that make suites brittle by design.

At scale, manual triage becomes untenable. [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes Mendral's agent processing 33 million weekly test executions at PostHog, ingesting log lines to trace flaky failures to root causes and open fix PRs automatically. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a narrower approach: an analytics layer for Playwright that auto-categorizes failures as bugs, flaky tests, or UI changes, claiming 6-8 hours of weekly savings per engineer.

Prevention overlaps with general CI hygiene. [Playwright on GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) notes that worker parallelism tuning and browser binary caching reduce run times, which limits the window in which environmental drift can introduce non-determinism. [Agentic AI testing](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test) positions AI agents as useful for debugging and exploratory coverage but stops short of claiming they eliminate flakiness — the bounded and fully adaptive autonomy levels it describes are as likely to surface flaky tests as to fix them.

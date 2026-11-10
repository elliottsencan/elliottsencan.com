---
title: Flaky tests
summary: >-
  Tests that pass and fail non-deterministically, flaky tests erode CI trust,
  slow triage, and compound at scale — with causes ranging from implementation
  coupling to environment variance to AI-generated anti-patterns.
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
compiled_at: '2026-11-10T01:18:58.181Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 647
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
  cost_usd: 0.019116
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. At low volumes this is a nuisance; at scale it becomes a structural problem. PostHog runs 575K CI jobs and 33 million test executions weekly, and [Mendral's CI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) exists specifically because flaky failures drown engineers in noise — the agent traces failures to root causes and opens fix PRs automatically rather than leaving teams to sift through billions of log lines.

One common source is selector brittleness. The [Currents team](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during refactors not primarily because of bad selector choices but because they couple to implementation details like CSS classes, DOM structure, and position rather than semantic roles, labels, and accessible names. Tests anchored to structure fail whenever that structure changes, even when behavior is unchanged.

AI-generated tests introduce their own failure modes. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and tests written to match a buggy implementation rather than intended behavior — both of which produce tests that pass confidently while covering nothing real, or fail once the bug is fixed.

Environment variance is a separate axis. [Currents](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that which environment a test runs in affects reliability: staging offers control, while production introduces real network conditions, third-party dependencies, and state that can make otherwise stable tests intermittent.

Tooling is catching up. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes failures as bugs, flaky tests, or UI changes, surfacing patterns across runs. [Endform's agentic testing framework](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test) positions AI agents as useful for debugging and exploration — tasks where flakiness signals something worth investigating rather than something to retry away.

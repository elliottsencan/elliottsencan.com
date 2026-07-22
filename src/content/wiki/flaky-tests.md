---
title: Flaky tests
summary: >-
  Flaky tests produce inconsistent results across runs without code changes, and
  taming them requires stable selectors, environment parity, smart
  categorization, and increasingly automated triage.
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
compiled_at: '2026-07-22T05:54:38.366Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 606
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
  cost_usd: 0.018
---
A flaky test fails on some runs and passes on others without any change to the code under test. At scale this becomes a serious operational problem. PostHog runs 575,000 CI jobs and 33 million test executions weekly, and [Mendral's AI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) exists specifically to trace flaky tests to root causes and open fix PRs automatically, because human triage at that volume is not viable.

Many flaky tests originate in how tests are written. The [Currents team](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that coupling to CSS classes, DOM position, or structural details makes tests brittle by design; semantic roles, labels, and accessible names survive refactors far better. AI-generated tests compound this: [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and implementation-matching that produce tests which pass against buggy code and fail against correct code, exactly the profile of a flaky suite.

Environment mismatch is another source. [Currents' staging-vs-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that tests behave differently across environments, and routing the right flows to the right environment reduces spurious failures. Infrastructure tuning matters too: [Jakob Norlin](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) shows that caching browser binaries and tuning worker parallelism on GitHub Actions cuts run time significantly, reducing the window in which timing-sensitive tests can flake.

Categorization is an underrated piece of the problem. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-classifies failures into bugs, flaky tests, or UI changes, treating flakiness as a distinct failure mode that deserves its own signal rather than noise in a shared failure queue.

---
title: Flaky tests
summary: >-
  Tests that produce inconsistent pass/fail results across identical runs,
  causing CI noise, eroded trust, and engineering time spent triaging failures
  that reveal no real bugs.
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
compiled_at: '2026-11-03T00:38:26.291Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 697
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
  cost_usd: 0.019866
---
A flaky test is one that passes or fails non-deterministically without any change to the code under test. The practical damage is cumulative: teams begin ignoring red builds, CI pipelines lose their signal value, and engineers burn time on failures that turn out to be test infrastructure problems rather than product bugs.

The causes cluster into a few categories. Tests that couple to implementation details, such as CSS classes, DOM structure, or element position, break whenever the UI is refactored even when behavior is unchanged [Currents Team](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Coupling to semantic roles, accessible names, and labels instead produces tests that stay valid across visual rework. AI-generated tests introduce a related problem: they often over-mock, test only happy paths, or encode a buggy implementation as the expected behavior, producing tests that pass without verifying anything meaningful [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests).

Environment inconsistency is another source. Flakiness that appears in staging but not production, or vice versa, often traces to data state, network latency, or authentication flows that differ between environments [Currents Team](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Misconfigured parallelism compounds this: running too many workers on a single runner can introduce race conditions that look like test bugs [Jakob Norlin](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs).

At scale, manual flakiness triage becomes its own bottleneck. PostHog runs 33 million test executions per week; Mendral's CI agent ingests the resulting log volume, traces flaky failures to root causes, and opens fix PRs automatically [Sam Alba](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). TestDino takes a reporting-layer approach, auto-categorizing failures as bugs, flakiness, or UI changes so engineers can act without reading raw logs [TestDino](/reading/2026-04/2026-04-30t231348-testdino). Agentic debugging frameworks offer a third angle: bounded AI agents that reproduce a failing test, inspect state, and propose a fix without requiring full autonomy over the suite [Oliver Stenbom](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test).

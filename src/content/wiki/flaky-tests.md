---
title: Flaky tests
summary: >-
  Flaky tests — those that pass or fail non-deterministically without code
  changes — impose real costs on CI pipelines and engineering teams, and
  multiple sources point to both structural causes and emerging automated
  remedies.
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
compiled_at: '2026-10-13T00:16:20.597Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 819
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
  cost_usd: 0.021696
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. The problem shows up at every scale, but the costs compound quickly. At PostHog's scale of 575K weekly CI jobs and 33 million test executions, [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests billions of log lines specifically to trace flaky tests to root causes and open fix PRs automatically, treating flakiness as a first-class operational problem rather than an annoyance engineers should investigate by hand.

Structural causes matter more than selector choice alone. [Currents on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break non-deterministically during refactors because they couple to CSS classes, DOM structure, or element position rather than semantic roles and accessible names. When the implementation shifts, tests that were nominally passing start failing for reasons unrelated to behavior. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses this categorically by auto-classifying failures as bugs, flaky tests, or UI changes, which at least separates the signal from the noise before an engineer has to look.

AI-generated tests introduce their own flakiness vectors. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and testing only happy paths, both of which tend to produce tests that pass against a green environment but fail unpredictably against real conditions. Tests written to match a buggy implementation are a related failure mode: they appear stable until the bug is fixed, then they fail, which looks like flakiness from a CI perspective.

Environment configuration contributes as well. [Currents on staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that certain flows produce flaky results in staging due to environment drift, and that routing those flows to production testing, while operationally costly, can eliminate a category of non-determinism. [Jakob Norlin's GitHub Actions setup](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) points to worker parallelism tuning as another lever: misconfigured concurrency can produce race conditions that read as flaky failures.

Looking forward, [Endform's agentic AI testing framework](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test) positions AI agents partly as a debugging tool for flakiness, with bounded autonomy modes suited to identifying why tests fail intermittently. Whether automated triage or better test authorship discipline is the more durable solution is an open question across these sources; they converge on the diagnosis but differ in emphasis on remediation.

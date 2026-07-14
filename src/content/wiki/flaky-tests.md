---
title: Flaky tests
summary: >-
  Tests that fail inconsistently rather than deterministically, caused by
  environment coupling, implementation-detail selectors, or timing issues, and
  increasingly managed through automated triage and analytics tooling.
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
compiled_at: '2026-07-14T06:38:00.563Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 700
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
  cost_usd: 0.01941
---
A flaky test is one that can pass and fail on the same code without any change to the logic under test. The failure mode is expensive: engineers learn to re-run rather than investigate, which erodes trust in the entire suite and slows CI feedback loops.

At sufficient scale the cost becomes concrete. [PostHog's CI setup](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575K weekly jobs and 33M test executions; Mendral's AI triage agent exists specifically because manually tracing flaky failures through billions of log lines is not viable. The agent identifies root causes and opens fix PRs automatically, treating flakiness as a first-class operational problem rather than background noise.

At smaller scale, [TestDino](/reading/2026-04/2026-04-30t231348-testdino) offers a lighter version of the same idea: an analytics layer for Playwright that auto-categorizes failures as bugs, flaky tests, or UI changes, claiming to recover 6-8 hours of engineer time weekly.

Prevention is the other half. The [Currents team's analysis of Playwright suite fragility](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) and their [guide to surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) both point to the same root cause: tests coupled to implementation details like CSS classes, DOM structure, or element position will break whenever the UI shifts, even when behavior is unchanged. Selectors anchored to semantic roles, accessible names, and ARIA labels are structurally more stable.

AI-generated tests introduce a related failure mode. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and tests written to match a buggy implementation, both of which produce suites that pass when they should fail or fail when the implementation is correct. That is flakiness in a broader sense: the test result does not reliably track the behavior it claims to cover.

Infrastructure choices also contribute. [Norlin's GitHub Actions writeup](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) addresses timing and parallelism, two common sources of environment-dependent failures. Misconfigured worker counts and uncached browser binaries introduce variability that looks like flakiness but is really resource contention.

---
title: Flaky tests
summary: >-
  Tests that pass and fail non-deterministically, flaky tests erode CI trust and
  waste engineering time; the sources approach them through automated triage,
  better selector strategy, and environment discipline.
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
compiled_at: '2026-07-16T11:36:03.092Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 602
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
  cost_usd: 0.01794
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. At scale the problem compounds fast. [Mendral's CI writeup](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes PostHog running 575K CI jobs and 33M test executions weekly, where an AI triage agent ingests billions of log lines specifically to trace flaky failures to root causes and open fix PRs automatically. Without that kind of tooling, engineers spend their time manually bisecting failures that may have nothing to do with their own changes.

A structural cause of flakiness in UI tests is coupling to implementation details. [Designing Playwright tests that survive UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that CSS classes, DOM position, and internal component structure shift constantly during normal development, so tests built on those selectors fail even when behavior is correct. Semantic roles, accessible names, and visible labels are more stable anchors.

AI-generated tests introduce their own flakiness vectors. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and writing tests to match a buggy implementation rather than intended behavior, both of which produce suites that pass consistently but for the wrong reasons, or that flip on unrelated changes.

Environment mismatch is another source. [Playwright testing in staging vs production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames staging and production as serving different needs, with staging better suited for tests that would be destructive or noisy in production, and production required for flows that depend on real data and integrations. Misconfiguring which tests run where produces failures that look flaky but are actually environmental. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses this categorization problem directly by auto-classifying failures as bugs, flaky tests, or UI changes, claiming that triage alone recovers 6-8 engineer hours per week.

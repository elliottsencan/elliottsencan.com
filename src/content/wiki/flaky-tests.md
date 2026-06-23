---
title: Flaky tests
summary: >-
  Tests that pass or fail non-deterministically, caused by environment
  sensitivity, coupling to implementation details, or AI-generated patterns that
  encode bugs rather than intended behaviour.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-06-23T01:58:40.387Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 571
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
  cost_usd: 0.01701
---
A flaky test is one whose result varies across runs without any change to the code under test. At scale, flakiness stops being a minor annoyance and becomes a serious operational problem. [PostHog's CI pipeline](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575K jobs and 33M test executions per week; Mendral's AI triage agent was built specifically because flaky failures at that volume make manual investigation impractical. The agent ingests billions of log lines, traces flakiness to root causes, and opens fix PRs automatically.

At smaller scales, tooling like [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the same problem by auto-categorising Playwright failures as bugs, flaky tests, or UI changes, claiming to save engineers 6-8 hours per week that would otherwise go to manual triage.

A common structural cause of flakiness is coupling tests to implementation details rather than stable semantics. [Currents' guide to surviving UI refactors](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) and their [selector strategy piece](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) both point to CSS classes, DOM position, and internal component structure as fragile anchors. Tests built around accessible names, ARIA roles, and semantic labels survive refactors because those attributes are tied to user-facing intent, not implementation choices.

AI-generated tests introduce their own flakiness vectors. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking, narrow happy-path coverage, and tests written to match a buggy implementation rather than the intended behaviour. A test that encodes a bug will flip from passing to failing the moment the bug is fixed, which is a form of flakiness rooted in intent rather than environment.

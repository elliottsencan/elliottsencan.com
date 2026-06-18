---
title: Flaky tests
summary: >-
  Tests that produce inconsistent results across identical runs, flakiness stems
  from environmental coupling and poor selector strategies as much as code bugs,
  and modern tooling increasingly applies AI classification and automated fixes
  to manage it at scale.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
compiled_at: '2026-06-18T21:46:44.037Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2915
    output_tokens: 679
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
  cost_usd: 0.01893
---
A flaky test is one that passes or fails non-deterministically across identical code. The problem has two distinct roots: environmental and structural.

On the structural side, [Currents.dev](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that most Playwright suite breakage during UI refactors is not bad luck but a design flaw. Tests coupled to CSS classes, DOM structure, or raw text content will fail whenever the interface changes, even when the underlying behavior is unchanged. The fix is a tiered selector hierarchy that prefers semantic roles, ARIA labels, and explicit test attributes over structural selectors. That distinction matters because a test that breaks on a refactor is not the same as a flaky test, but both produce the same CI noise and erode trust in the suite.

Environmental flakiness is a scale problem. At PostHog's monorepo, Mendral's AI agent processed 33 million weekly test executions [and found](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) that log ingestion speed and smart alert routing mattered more than the AI diagnosis itself. The agent auto-categorized failures, opened fix PRs, and routed alerts, but the infrastructure to handle that volume of signal was the harder engineering problem.

TestDino [takes a similar triage approach](/reading/2026-04/2026-04-30t231348-testdino) for Playwright specifically: centralizing test runs and auto-classifying failures as bugs, flaky tests, or UI changes. The claimed 6-8 hours of weekly savings reflects how much engineer time goes into manually sorting test noise.

Flakiness also interacts with merge infrastructure. A [Trunk post on GitHub's merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows that when temporary branches are constructed from stale divergence points rather than HEAD, tests may pass or fail based on the wrong commit state entirely. That is a different failure mode from test design, but the symptom is the same: results you cannot trust.

Environment choice adds another layer. Running Playwright against staging versus production [introduces different reliability profiles](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production): staging environments drift from production state and can produce false failures; production carries operational risk. Neither solves flakiness, but the choice affects which category of noise dominates.

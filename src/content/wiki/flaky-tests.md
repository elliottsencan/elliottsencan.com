---
title: Flaky tests
summary: >-
  Tests that pass or fail non-deterministically, flaky tests erode CI trust,
  waste engineering time, and require both tooling and authoring discipline to
  contain.
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
compiled_at: '2026-07-15T10:06:16.721Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 618
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
  cost_usd: 0.01818
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. The damage is practical: when tests fail randomly, engineers learn to ignore failures, which defeats the purpose of a test suite.

At scale the problem compounds. [PostHog's CI infrastructure](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 33 million test executions weekly, and flaky tests are a primary triage target for their AI agent, which traces failures to root causes and opens fix PRs automatically. That workflow only exists because manual triage at that volume is untenable.

Tooling like [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the same problem at smaller scale by auto-categorizing failures as bugs, flaky tests, or UI changes, claiming to reclaim 6-8 hours of engineering time weekly. Both approaches treat flakiness as something to be detected and classified, not just retried.

Many flaky frontend tests trace back to how tests are written. [Currents Team on Playwright test design](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that production environment differences introduce non-determinism that staging cannot reproduce. More fundamentally, [tests that couple to CSS classes, DOM position, or implementation details](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) break on refactors that change nothing about behavior, which can look like flakiness even when the failure is deterministic. AI-generated tests make this worse: [common patterns include over-mocking and writing assertions against a buggy implementation](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) rather than intended behavior, producing tests that are simultaneously brittle and misleading.

Infrastructure choices also matter. [Slow test suites push teams toward shortcuts](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) like skipping or retrying rather than investigating, so reducing overall run time reduces the conditions that let flakiness go unaddressed.

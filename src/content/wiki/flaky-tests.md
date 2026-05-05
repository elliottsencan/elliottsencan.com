---
title: Flaky tests
summary: >-
  Tests that pass or fail non-deterministically, flaky tests create false signal
  in CI pipelines and consume disproportionate engineering time to diagnose and
  fix.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
aliases:
  - software-quality
compiled_at: '2026-05-04T03:39:16.652Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2495
    output_tokens: 469
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
  cost_usd: 0.01452
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. The cost is not just the failed build; it is the engineering time spent determining whether a failure signals a real regression or noise.

At scale, the problem compounds quickly. [Mendral's CI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processed 33 million weekly test executions on PostHog's monorepo and found that auto-diagnosing flaky tests, opening fix PRs, and routing alerts intelligently was more valuable than the AI diagnosis layer itself. The bottleneck was log ingestion speed and smart routing, not clever inference.

[TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a reporting-layer approach for Playwright users: centralizing runs and auto-categorizing failures into bugs, flaky tests, or UI changes. The claimed payoff is 6-8 hours saved per engineer per week, though that figure comes from the vendor.

Flaky tests also interact badly with merge queue architectures. [Trunk's post-mortem on a GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates how unreliable test signal can mask deeper infrastructure failures; when the queue builds on a stale divergence point, a flaky pass becomes indistinguishable from a legitimate one, silently corrupting the branch.

The pattern across all three sources is the same: flaky tests degrade trust in CI, and the fix is categorization and routing before it is eradication.

---
title: Continuous integration
summary: >-
  Continuous integration has grown from a simple merge discipline into a layered
  system of test reliability, merge safety, orchestration architecture, and
  automated triage — each layer representing a distinct failure mode at scale.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-10t205349-github-is-sinking
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - 2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
  - >-
    2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs
  - >-
    2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters
compiled_at: '2026-08-03T10:03:35.898Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1215
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
  cost_usd: 0.030894
---
At small scale, continuous integration is straightforward: merge often, run tests, catch regressions. At 100-person team scale, the system fractures into a set of distinct sub-problems that each need separate tooling.

The volume problem is the most visible. [Mendral's write-up on PostHog's CI pipeline](https://www.mendral.com/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes 575,000 weekly jobs and 33 million test executions — a scale where manual triage of failures is not viable and an AI agent that reads log lines, identifies flaky test root causes, and opens fix PRs becomes load-bearing infrastructure.

Flaky tests are a recurring theme across sources. [TestDino](https://www.mendral.com/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes failures as bugs, flaky tests, or UI changes. [Currents' Playwright refactor guide](https://www.mendral.com/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues flakiness often traces to coupling tests to CSS classes and DOM structure rather than semantic roles and accessible names. [Playwright on GitHub Actions](https://www.mendral.com/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) addresses the speed side — caching browser binaries and tuning parallelism to keep runs under five minutes.

Merge safety is a separate problem. [Trunk's post-mortem on GitHub's merge queue bug](https://www.mendral.com/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows that building off the wrong base commit can silently delete thousands of lines from main. The architectural implication is that merge queues must be careful about which commit they actually verify against.

Orchestration architecture is a third dimension. [Depot's write-up on Lambda durable functions](https://www.mendral.com/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) describes a stateful, checkpointed scheduler built on AWS Lambda without a long-lived process, using a two-layer Run/Workflow hierarchy and callback-driven coordination. This is infrastructure design, not test design.

Security is increasingly a CI concern. [The SAP npm supply chain attack](https://www.mendral.com/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) used poisoned packages to harvest cloud secrets from developer environments, with VS Code configs as a persistence vector — a reminder that CI pipelines pull in third-party packages and are exposed to the same supply chain risks as production systems. [MarkdownLM's Lun tool](https://www.mendral.com/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer before merge, and [AST-based linting for database layer ownership](https://www.mendral.com/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) extends that enforcement pattern to architectural rules.

AI code generation adds another failure mode. [Vet](https://www.mendral.com/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) catches agent mistakes — silently skipped tests, swapped-in fake data — that a standard diff review misses, by reading the agent's conversation history alongside the change. [Currents' staging vs. production testing framework](https://www.mendral.com/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) is adjacent: deciding which tests run where is itself a design decision with operational cost implications.

The platform underneath all of this is also in question. [David Bushell's critique of GitHub](https://www.mendral.com/reading/2026-05/2026-05-10t205349-github-is-sinking) and [Mat Duggan's forge wishlist](https://www.mendral.com/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) — which includes pre-commit remote CI, stacked PRs as first-class citizens, and signed Actions — point to the forge itself as a CI bottleneck that mainstream tooling has not resolved.

---
title: Continuous integration
summary: >-
  CI pipelines have grown from simple build gates into layered systems managing
  test reliability, merge safety, infrastructure orchestration, and policy
  enforcement — with AI tooling increasingly embedded at each layer.
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
compiled_at: '2026-10-19T22:05:21.234Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 912
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
  cost_usd: 0.026349
---
Continuous integration at scale is not a single system; it is a stack of overlapping concerns that break down independently. PostHog's CI infrastructure, [profiled by Mendral](https://www.mendral.com/blog/ci-at-scale), processes 575K jobs and 33M test executions weekly. At that volume, human triage of failures becomes impossible, and Mendral's AI agent takes over: ingesting log lines, tracing flaky tests to root causes, and opening fix PRs automatically. That scale makes visible what smaller pipelines paper over — flaky tests, slow feedback loops, and failure categorization that no one has time to do manually.

[TestDino](https://testdino.com/) addresses the same categorization problem for Playwright suites, auto-labeling failures as bugs, flaky tests, or UI changes and claiming 6–8 hours of weekly savings. Flakiness is a persistent enough problem that it warrants dedicated tooling, and the [Currents team's guide to Playwright test design](https://currents.dev/posts/designing-playwright-tests-that-survive-ui-refactors) argues the root cause is coupling tests to implementation details rather than semantic roles and accessible names. A test that survives UI refactors is one that doesn't need to be triaged after them.

Merge queues are another layer with their own failure modes. [Trunk's postmortem](https://trunk.io/blog/what-happens-if-a-merge-queue-builds-on-the-wrong-commit) documents a GitHub merge queue bug that silently deleted thousands of lines by building temporary branches off the wrong base commit. Trunk's architecture avoided the incident by never pushing temp branches to main. The bug illustrates how CI infrastructure safety depends on architectural choices made long before any specific failure occurs.

On the infrastructure side, [Depot's approach](https://depot.dev/blog/building-ci-with-durable-lambda) uses AWS Lambda durable functions to run a stateful, checkpointed CI scheduler without a persistent process, using a two-layer Lambda hierarchy and callback-driven coordination. It is a practical answer to the operational cost of keeping CI orchestrators alive.

Policy enforcement is moving closer to the merge gate. [MarkdownLM's Lun tool](https://markdownlm.com/) blocks non-compliant code at the Git layer before it merges by querying a living knowledge base of architectural rules and security policies in real time. A related approach in [droppedasbaby's post on DB layer enforcement](https://www.droppedasbaby.com/posts/db-commits/) uses AST analysis, linters, and LLM-assisted CI checks to ban manual commits and DB model leakage outright.

Security is also entering the pipeline directly. The [SAP npm supply chain attack](https://thehackernews.com/2026/04/sap-npm-packages-compromised-by-mini.html) used poisoned packages to harvest cloud secrets and persist via CI-adjacent configs including VS Code and Claude Code. CI environments are credential-rich targets, and any package pulled during a build is a potential vector.

Platform reliability underpins all of it. [David Bushell's critique of GitHub](https://dbushell.com/2026/04/29/github-is-sinking/) and [Mat Duggan's forge wishlist](https://matduggan.com/if-i-could-make-my-own-github/) both surface dissatisfaction with the reliability and design of the dominant CI host. Duggan's wishlist includes pre-commit remote CI and signed, offline-usable Actions — features that reflect how much teams now depend on the forge itself as CI infrastructure.

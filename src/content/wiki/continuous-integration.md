---
title: Continuous integration
summary: >-
  CI pipelines sit at the convergence of test reliability, infrastructure
  design, security, and tooling — sources here collectively stress that the hard
  problems are flakiness, orchestration correctness, and trust in what actually
  merges.
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
compiled_at: '2026-08-10T18:57:48.159Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1124
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
  cost_usd: 0.029529
---
Continuous integration has long been treated as a solved problem — set up a pipeline, run tests on push, merge green builds. The sources collected here push back on that comfort by showing how much can go wrong at each layer, and how teams are rethinking CI architecture as codebases and org sizes scale.

At PostHog's scale, 575K weekly jobs and 33 million test executions, the sheer volume of CI output makes manual triage impossible. [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) handles this by ingesting billions of log lines, tracing flaky tests to root causes, and opening fix PRs automatically. That pattern, delegating CI interpretation to an agent rather than surfacing raw failures to humans, represents a meaningful shift in how CI feedback loops work.

Flakiness is a recurring pressure point. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes Playwright failures as bugs, flaky tests, or UI changes, claiming to reclaim six to eight engineer-hours per week. The [Currents team on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that most flakiness and breakage during UI refactors stems not from poor selector choices alone but from coupling tests to implementation details — CSS classes, DOM structure, position — rather than semantic roles and accessible names.

Orchestration correctness matters as much as test quality. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building temp branches off the wrong base commit. Trunk avoided the incident by never pushing temp branches to main. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) takes a different architectural angle, using AWS Lambda durable functions and a two-layer Run/Workflow hierarchy to run stateful, checkpointed workflows without keeping a long-lived process alive.

Pre-merge enforcement is another frontier. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer before it merges by querying a living knowledge base of architectural rules and security policies. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) approaches this from the AI-agent angle, reading an agent's conversation history alongside the diff to catch mistakes like silently skipped tests or swapped-in fake data that standard code review misses. [AST-based linting](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) can enforce structural constraints, like banning manual DB commits, through CI checks rather than convention.

Security surfaces in CI pipelines directly. The [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) shows that compromised packages can harvest cloud secrets and browser passwords mid-pipeline and exfiltrate them through the same GitHub infrastructure that runs CI. The reliability of GitHub itself is contested: [David Bushell documents](/reading/2026-05/2026-05-10t205349-github-is-sinking) a pattern of declining reliability and quality, while [Mat Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) argues for pre-commit remote CI, nuanced approvals, and self-hostable units as table-stakes features.

Even at the runner level, performance decisions compound. [Tuning Playwright on GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) through browser binary caching, worker parallelism, and scoping browser targets by CI event can cut runs from over three minutes to under five on a single runner, a reminder that CI ergonomics depend on mundane configuration choices accumulating correctly.

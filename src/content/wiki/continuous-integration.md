---
title: Continuous integration
summary: >-
  Continuous integration spans test suite design, pipeline architecture, merge
  queue correctness, supply chain security, and AI-assisted triage — a surface
  area that grows as teams and codebases scale.
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
compiled_at: '2026-10-05T23:49:17.471Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1100
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
  cost_usd: 0.029169
---
Continuous integration is the practice of automatically building and verifying every code change before it reaches a shared branch. At scale, the discipline expands well beyond running tests: it involves orchestrating thousands of parallel jobs, managing flaky test detection, securing the dependency graph, and keeping the pipeline fast enough that developers don't route around it.

At PostHog's scale, 575,000 weekly CI jobs and 33 million test executions, the triage burden alone outgrows human capacity. [Mendral's AI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests billions of log lines, traces flaky tests to root causes, and opens fix PRs automatically. A complementary direction appears in [TestDino](/reading/2026-04/2026-04-30t231348-testdino), which adds an analytics layer on top of Playwright runs to auto-categorize failures as bugs, flakiness, or UI changes, claiming 6–8 hours saved per engineer weekly.

Test suite durability is its own sub-problem. [Currents argues](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) that Playwright suites break during UI refactors not because of poor selector choice alone but because tests couple to CSS classes and DOM structure rather than semantic roles and accessible names. Where tests run is a separate decision: [staging versus production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) involves different risk profiles and operational costs, and not every flow belongs in both environments. Speed is also configurable: caching browser binaries and scoping browser targets by CI event [can cut GitHub Actions runs from over three minutes to under five on a single runner](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs).

Pipeline infrastructure choices carry correctness consequences. A GitHub merge queue bug [silently deleted thousands of lines from main branches](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) by building temp branches off the wrong base commit. Depot's orchestrator takes a different approach entirely, [using AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) to run a stateful, checkpointed scheduler without keeping a long-lived process alive.

Security enters at the dependency layer. The TeamPCP attack [poisoned four SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) with a credential-stealing payload that harvested cloud secrets and exfiltrated them via GitHub, treating CI environments as a high-value target. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) approaches policy enforcement differently, blocking non-compliant code at the Git layer before it merges by querying a living architectural knowledge base.

AI-generated code introduces a verification gap that standard code review does not close. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an AI agent's conversation history alongside the diff to catch silently skipped tests or swapped-in fake data. Database-layer discipline is enforceable at CI time too: [AST-based linters and flake8 plugins](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) can ban manual commits and model leakage before they reach shared branches.

The forge layer is under pressure as well. [David Bushell](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues GitHub's reliability has declined enough to warrant migration, while [Mat Duggan](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) describes pre-commit remote CI and signed offline-usable Actions as features a well-designed forge would offer from the start.

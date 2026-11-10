---
title: Continuous integration
summary: >-
  Continuous integration is the practice of merging, validating, and testing
  code changes automatically and frequently; recent sources show it evolving
  toward AI-assisted triage, serverless orchestration, policy enforcement at the
  Git layer, and hardened supply chain defenses.
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
compiled_at: '2026-11-10T01:15:51.131Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1076
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
  cost_usd: 0.028809
---
At its core, continuous integration is about keeping a shared codebase in a known-good state by running builds and tests automatically on every change. The practical reality at scale looks different from the textbook description. At PostHog, [Mendral's AI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests billions of log lines across 575K weekly CI jobs, traces flaky tests to root causes, and opens fix PRs automatically. That is less "run tests on merge" and more a full triage layer operating on top of the pipeline.

The infrastructure underneath CI is also changing. [Depot](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) replaced long-lived orchestrator processes with AWS Lambda durable functions, using a two-layer Run/Workflow hierarchy and callback-driven job coordination to schedule stateful CI workflows without a persistent server. It is a meaningful architectural bet: serverless primitives absorbing work previously requiring dedicated compute.

Test reliability is a recurring pressure point. [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that Playwright suites break during refactors not because of selector choices alone, but because tests couple to implementation details rather than semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an analytics layer that auto-categorizes failures as bugs, flaky tests, or UI changes. Separately, [Currents on staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames environment selection as an operational cost question, not just a technical one.

Policy enforcement is moving earlier in the pipeline. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer before merge using a tool called Lun. A post on [AST-based linting](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) advocates banning manual DB commits via flake8 plugins and LLM-assisted CI checks. Both treat the CI gate as a policy surface, not just a correctness check.

Supply chain risk cuts across all of this. [Compromised SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) show that CI environments are high-value targets: cloud secrets and browser passwords harvested during builds, with VS Code configs used as persistence vectors. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) addresses a related gap, reviewing AI agent diffs for silently skipped tests or swapped-in fake data that standard code review misses.

Platform reliability matters too. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) documents declining reliability under Microsoft; a [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building off the wrong base commit. Trunk avoided the incident because their design never pushes temp branches to main. [Mat Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) includes pre-commit remote CI and signed, offline-usable Actions as first-class requirements. Performance optimization remains practical: [caching Playwright browser binaries and tuning worker parallelism](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) cut GitHub Actions runs from over three minutes to under five on a single runner.

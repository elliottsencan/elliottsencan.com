---
title: Continuous integration
summary: >-
  Continuous integration spans pipeline orchestration, test reliability,
  security at the merge boundary, and the tooling layers that make fast feedback
  loops sustainable at scale.
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
compiled_at: '2026-11-17T01:39:46.254Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1069
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
  cost_usd: 0.028704
---
Continuous integration is the practice of merging, building, and testing code changes frequently enough that failures surface quickly and in small, attributable increments. The sources here collectively push on every layer of that loop: how pipelines are architected, how tests stay trustworthy, what can go wrong at the merge boundary, and what happens when the pipeline itself becomes an attack surface.

At scale, the feedback loop breaks down not from lack of tests but from signal noise. [PostHog's setup](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575K weekly jobs and 33M test executions; Mendral's AI agent ingests the resulting log volume to triage failures, trace flaky tests to root causes, and open fix PRs automatically. Flaky test categorization is also the core pitch of [TestDino](/reading/2026-04/2026-04-30t231348-testdino), which wraps Playwright runs in an analytics layer that auto-classifies failures as bugs, flakiness, or UI changes. The Playwright angle recurs: [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues tests break during refactors not because of selector choice alone but because they couple to DOM structure rather than accessible roles, and a [separate Currents piece](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames staging-vs-production test placement as an operational cost decision. For raw pipeline speed, [a GitHub Actions guide](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) covers caching browser binaries and tuning parallelism to bring runs under five minutes.

Pipeline correctness goes beyond tests. [Trunk's post-mortem on a GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how building off the wrong base commit silently deleted thousands of lines from main, and argues that never pushing temp branches directly to main is an architectural safeguard. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) takes a different infrastructure angle, using AWS Lambda durable functions to run a stateful, checkpointed workflow scheduler with no long-lived process.

Security has become a first-class CI concern. [The TeamPCP supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned SAP-ecosystem npm packages that would have entered pipelines as dependencies, harvesting cloud secrets and exfiltrating them via GitHub. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer before merge. Policy enforcement also appears at the AST level: [one post](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) advocates banning manual DB commits via flake8 plugins and LLM-assisted CI checks.

AI-generated code adds a verification problem. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch silently skipped tests or swapped-in fake data that standard review misses. The forge layer itself is also under scrutiny: [David Bushell's piece on GitHub's decline](/reading/2026-05/2026-05-10t205349-github-is-sinking) and [Mat Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) both flag CI reliability and pre-commit remote CI as platform-level concerns, not just tooling ones.

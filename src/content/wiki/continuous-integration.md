---
title: Continuous integration
summary: >-
  CI pipelines have grown complex enough to require dedicated orchestration
  architectures, AI-assisted triage, and deliberate test-stability strategies to
  remain trustworthy at scale.
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
compiled_at: '2026-07-01T04:44:40.384Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3897
    output_tokens: 953
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
  cost_usd: 0.025986
---
Continuous integration is the practice of merging code frequently and verifying each change through automated builds and tests. The implementation details that determine whether a CI system is trustworthy have become a serious engineering concern in their own right.

At volume, the raw mechanics of running CI break down. [PostHog's setup via Mendral](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processes 575K weekly jobs and 33 million test executions, a scale where manual triage of failures becomes untenable. Mendral's AI agent ingests billions of log lines, identifies flaky tests, traces them to root causes, and opens fix PRs automatically. The plumbing underneath matters too: [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) runs stateful, checkpointed workflows on AWS Lambda durable functions rather than a persistent process, separating orchestration state from execution cost.

Correctness of the pipeline itself is not guaranteed by the platform. A GitHub merge queue bug documented by [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building temporary branches off the wrong base commit. Trunk avoided the incident because their design never pushes temp branches to main. Platform reliability is a real variable, and [David Bushell's case for migrating away from GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) names it directly: declining reliability under Microsoft ownership makes the underlying forge a risk factor for CI.

Test quality shapes CI signal. [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that suites break during UI refactors not because of selector choice alone but because tests couple to implementation details rather than semantic roles and accessible names. [Their staging-vs-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) separates which flows belong in each environment and accounts for the operational cost of production testing. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a reporting angle, auto-categorizing failures as bugs, flaky tests, or UI changes and claiming to recover 6-8 engineer hours weekly.

Security enters CI at the dependency layer. The [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned packages that CI pipelines install, harvesting cloud secrets and browser passwords. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) takes a preventive stance, blocking non-compliant code at the Git layer before it merges, with policies drawn from a living knowledge base queried by AI agents.

AI-generated code introduces a new audit gap. [Imbue's Vet tool](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch problems standard review misses, such as silently skipped tests or swapped-in fake data. [Mat Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) proposes pre-commit remote CI and signed, offline-usable Actions as structural improvements no current platform offers.

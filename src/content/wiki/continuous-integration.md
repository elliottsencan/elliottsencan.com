---
title: Continuous integration
summary: >-
  Continuous integration pipelines are under pressure from scale, flakiness,
  security threats, and infrastructure complexity, with emerging tooling
  addressing each failure mode in different ways.
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
compiled_at: '2026-07-09T14:10:00.794Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3897
    output_tokens: 941
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
  cost_usd: 0.025806
---
At the infrastructure level, CI is increasingly built on architectures that avoid long-lived orchestration processes. Depot's approach uses AWS Lambda durable functions arranged in a two-layer hierarchy, where a top-level Workflow Lambda coordinates child Run Lambdas via callbacks and checkpointing [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). The design trades process simplicity for resilience, tolerating Lambda's execution limits without holding state in memory.

At scale, the volume of test execution turns flakiness management into its own engineering problem. PostHog's 575K weekly CI jobs and 33M test executions are handled partly by Mendral's AI triage agent, which ingests log output, traces flaky tests to root causes, and opens fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). Tools like TestDino take a lighter approach, using classification layers to sort Playwright failures into bugs, flakiness, or UI drift [TestDino](/reading/2026-04/2026-04-30t231348-testdino). On the authoring side, tests that couple to CSS classes or DOM structure break during refactors not because selectors are wrong but because the tests encode implementation details rather than semantic roles [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors).

Merge queue integrity is a separate concern. A GitHub bug caused temp branches to build off the wrong base commit, silently deleting lines from main; Trunk avoided this by never pushing temp branches to the main ref at all [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). The incident illustrates how architectural choices in queue implementation carry real correctness consequences.

Security surfaces have expanded as CI pipelines consume more third-party packages and run more autonomous agents. A supply chain attack poisoned SAP-ecosystem npm packages with credential-stealing payloads that targeted cloud secrets and abused VS Code and Claude Code configs as persistence vectors [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Upstream of the pipeline, MarkdownLM's Lun tool blocks non-compliant code at the Git layer before merge by querying a live policy knowledge base [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm). Vet approaches the problem differently, reviewing AI agent diffs alongside conversation history to catch silently skipped tests or substituted fake data [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

Platform reliability itself is contested. GitHub's declining quality has prompted calls to migrate to Codeberg, Forgejo, or self-hosted forges [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), while a developer wishlist for a better forge includes pre-commit remote CI and signed, offline-usable Actions as baseline features [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github).

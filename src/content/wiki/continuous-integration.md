---
title: Continuous integration
summary: >-
  Continuous integration pipelines are under pressure from scale, flakiness,
  infrastructure complexity, and supply-chain threats, with AI tooling and
  architectural discipline emerging as the primary responses.
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
compiled_at: '2026-07-15T10:03:44.285Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 996
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
  cost_usd: 0.027609
---
At a team running 575K CI jobs per week, the bottleneck is no longer whether to run tests automatically but how to make sense of the results. [Mendral's CI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests billions of log lines, identifies flaky tests, and opens fix PRs without human intervention. That same problem — distinguishing genuine failures from noise — is what [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses with an analytics layer for Playwright that auto-categorizes failures as bugs, flakiness, or UI changes.

Flaky tests are a CI problem as much as a testing problem. [Currents' guide on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that suites break during UI refactors because tests couple to CSS classes and DOM structure rather than semantic roles and accessible names. The fix is architectural: write tests against stable contracts, not implementation details. [Playwright environment strategy](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) and [runner optimization](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) compound those gains — caching browser binaries and scoping browser targets by CI event can cut run times from over three minutes to under five seconds on a single runner.

Infrastructure design shapes reliability in less visible ways. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions to run a stateful, checkpointed scheduler without a long-lived process, trading conventional server uptime for callback-driven coordination. [Trunk's merge queue analysis](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows what happens when that infrastructure is wrong: a GitHub bug silently deleted thousands of lines from main by building temp branches off the wrong base commit.

CI is also a security boundary. A compromised npm package in the SAP ecosystem [harvested cloud secrets and browser passwords](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) and used GitHub itself as an exfiltration channel. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) approaches the gatekeeping problem differently, blocking non-compliant code at the Git layer before it merges. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) addresses the newer problem of AI-generated code slipping through review by reading the agent's conversation history alongside the diff.

The forge layer itself is contested. [David Bushell's case for leaving GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) and [Mat Duggan's wishlist for a reimagined forge](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) both point at the same gap: pre-commit remote CI, stacked PRs as first-class citizens, and signed offline-usable Actions are things teams want but existing platforms don't deliver well. AST-based enforcement of DB layer ownership, [proposed as a CI check](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters), is one example of how teams fill that gap with custom gates.

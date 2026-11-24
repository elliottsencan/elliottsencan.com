---
title: Continuous integration
summary: >-
  The practice of merging, validating, and gating code changes automatically —
  spanning test design, pipeline infrastructure, merge queue correctness,
  security at the dependency layer, and AI-assisted triage.
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
compiled_at: '2026-11-24T03:53:41.751Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1056
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
  cost_usd: 0.028509
---
Continuous integration has expanded well beyond the original idea of frequent merges and a green build gate. The sources here collectively show a system with at least five distinct pressure points: test reliability, pipeline infrastructure, merge correctness, supply chain exposure, and the growing role of AI tooling inside the pipeline.

Test suites are only as useful as their signal quality. Flaky tests are a primary source of noise, and at PostHog's scale (575K weekly CI jobs), [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) handles root-cause analysis and opens fix PRs automatically. At a smaller scale, [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes Playwright failures as bugs, flaky tests, or UI changes to surface the same signal without manual triage. The underlying cause of many Playwright failures is coupling to implementation details rather than semantic roles; [Currents' guide on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that accessible names and labels outlast CSS classes and DOM structure. Where tests run also matters: [a decision framework from Currents](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) separates which flows belong in staging versus production and what the operational cost of each is.

Pipeline infrastructure choices have correctness consequences. A GitHub merge queue bug [silently deleted thousands of lines from main branches](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) by building temp branches off the wrong base commit. Trunk avoided the incident by never pushing temp branches to main. Separately, [Depot's orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions to run a stateful, checkpointed workflow scheduler without a long-lived process, a design choice that trades simplicity for resilience. On the execution side, [caching Playwright browser binaries and scoping browser targets by CI event](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) can cut GitHub Actions runs from over three minutes to under five on a single runner.

Gating code quality before merge is a recurring theme. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer by querying a living knowledge base of architectural and security rules. [AST-based linters and flake8 plugins](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) enforce DB layer ownership by banning manual commits and model leakage in CI. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) adds a layer specifically for AI-generated diffs, reading agent conversation history alongside the diff to catch silently skipped tests or swapped-in fake data.

Security enters CI through the dependency layer. [Compromised SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) harvested cloud secrets and exfiltrated them via GitHub, with CI environments as a primary exposure surface. Platform reliability is a related concern: [GitHub's declining reliability](/reading/2026-05/2026-05-10t205349-github-is-sinking) has pushed some developers toward alternatives, and a wishlist for a reimagined forge [explicitly asks for pre-commit remote CI and signed, offline-usable Actions](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github).

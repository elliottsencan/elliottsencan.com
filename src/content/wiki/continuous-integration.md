---
title: Continuous integration
summary: >-
  Continuous integration pipelines have grown into complex, multi-layered
  systems where test reliability, orchestration architecture, security hygiene,
  and AI-assisted triage each shape whether a team's main branch stays
  trustworthy.
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
compiled_at: '2026-09-28T23:01:35.216Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 997
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
  cost_usd: 0.027624
---
At a 100-person team running 575,000 CI jobs weekly, the practical challenge shifts from "does CI exist" to "can anyone understand what it's telling us." [Mendral's write-up on PostHog's pipeline](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes an AI agent that ingests billions of log lines, traces flaky tests to root causes, and opens fix PRs automatically — a sign that triage itself has become a first-class engineering problem.

Test suite design directly determines how much of that triage burden exists. [Currents on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that breakage during refactors comes from coupling tests to CSS classes and DOM structure rather than semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a tooling angle, auto-categorizing Playwright failures as bugs, flaky tests, or UI changes. Separately, [Playwright on GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) shows that caching browser binaries and scoping browser targets by CI event can cut run times from over three minutes to under five on a single runner.

Orchestration architecture matters too. [Depot's post on Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) describes a two-layer scheduler that runs stateful, checkpointed CI workflows without a long-lived process, trading server costs for complexity in callback coordination. The merge queue is another architectural surface: [Trunk's analysis of a GitHub bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows that building temp branches off the wrong base commit silently deleted thousands of lines from main — an incident their design avoided by never pushing temp branches to the main ref.

Security is a CI concern as much as a dependency concern. [The SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) used poisoned packages to harvest cloud secrets that CI pipelines routinely hold, and abused editor configs as persistence vectors. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) takes a preventive angle, blocking non-compliant code at the Git layer before it merges. AST-based enforcement appears in another form in [a post on banning raw DB commits](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters), which uses flake8 plugins and LLM-assisted CI checks to enforce layer ownership.

AI-generated code introduces a verification gap that standard review misses. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch silently skipped tests or swapped-in fake data. Platform reliability sits underneath all of this: [David Bushell's case that GitHub is declining](/reading/2026-05/2026-05-10t205349-github-is-sinking) and [Mat Duggan's wishlist for a reimagined forge](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) — which includes pre-commit remote CI and signed offline-usable Actions — reflect real frustration with the infrastructure CI depends on.

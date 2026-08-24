---
title: Continuous integration
summary: >-
  Continuous integration spans test design, pipeline architecture, merge safety,
  and supply chain security — sources here cover AI-assisted triage, flake
  detection, serverless orchestration, and the reliability of the platforms CI
  runs on.
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
compiled_at: '2026-08-24T18:41:21.114Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1117
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
  cost_usd: 0.029424
---
CI is often reduced to "run tests on every push," but the sources here collectively treat it as a system with multiple failure surfaces: test design, pipeline architecture, platform reliability, and the security of the dependencies flowing through it.

At scale, the sheer volume of CI output becomes its own problem. PostHog runs 575K weekly jobs and 33M test executions, and [Mendral's agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests the resulting log data to triage failures, trace flaky tests to root causes, and open fix PRs automatically. That kind of AI-assisted triage is one response to pipelines that produce more signal than engineers can manually parse. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a similar approach at the Playwright layer, auto-categorizing failures as bugs, flaky tests, or UI changes and claiming 6-8 hours of weekly savings per engineer.

Test stability is a recurring pressure point. [Currents argues](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) that Playwright suites break during UI refactors not primarily because of bad selectors but because tests couple to implementation details rather than semantic roles and accessible names. A companion piece covers [staging versus production test splitting](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) as a distinct architectural decision. [Jakob Norlin](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) addresses the operational side: caching browser binaries and scoping targets by CI event to bring runs under five minutes on a single runner.

Pipeline architecture has its own complexity. [Depot's post](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) describes using AWS Lambda durable functions to run a stateful, checkpointed CI scheduler without a long-lived process, using a two-layer Run/Workflow Lambda hierarchy. The merge queue layer carries its own risk: [Trunk documents](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) a GitHub bug that silently deleted thousands of lines from main by building temp branches off the wrong base commit, an incident their architecture avoided by never pushing temp branches to main.

Platform reliability is not a given. [David Bushell](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues GitHub's quality has declined under Microsoft and recommends migration to Codeberg, Forgejo, or self-hosted forges. [Mat Duggan's wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) independently identifies pre-commit remote CI and signed, offline-usable Actions as missing primitives in current forges.

Security enters CI at the dependency layer. The [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned packages that CI pipelines would install, harvesting cloud secrets and browser passwords. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) attempts a different kind of gate: blocking non-compliant code at the Git layer before merge by querying a living knowledge base of architectural and security rules. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) targets the AI-agent workflow specifically, reviewing diffs alongside conversation history to catch silently skipped tests or swapped-in fake data that standard review misses. Enforcing structural constraints via AST analysis, as [droppedasbaby describes](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) for database commit ownership, is another pre-merge gate that belongs in the same category of CI-layer policy enforcement.

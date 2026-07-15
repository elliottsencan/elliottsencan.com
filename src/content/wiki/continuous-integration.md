---
title: Continuous integration
summary: >-
  Continuous integration spans pipeline architecture, test suite design, merge
  queue correctness, and supply chain security — a discipline where
  infrastructure choices and tooling quality directly determine how reliably
  software ships.
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
compiled_at: '2026-07-15T04:02:35.586Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4052
    output_tokens: 1090
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
  cost_usd: 0.028506
---
At its core, continuous integration is the practice of automatically building and validating code changes as they arrive, but the real complexity lives in every layer beneath that description.

Pipeline infrastructure is a first-class engineering problem. Depot built its CI orchestrator on AWS Lambda durable functions to run a stateful, checkpointed scheduler without a long-lived process [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). That architecture trades simplicity for resilience, which is the kind of tradeoff that only surfaces at scale. PostHog's experience illustrates the scale side: 575,000 weekly CI jobs and 33 million test executions, managed by an AI triage agent that ingests log lines, traces flaky tests to root causes, and opens fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team).

Merge queues add their own failure modes. A GitHub bug caused merge queues to build temp branches off the wrong base commit, silently deleting thousands of lines from main [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). Trunk avoided the incident because their design never pushes temp branches to main. The lesson is that merge queue correctness is not a given, and architectural choices made early become consequential later.

Test suites are where CI pipelines succeed or fail day to day. Playwright tests break during UI refactors when they couple to CSS classes and DOM structure rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Splitting tests between staging and production environments adds another decision layer, requiring explicit choices about which flows belong where and what the operational cost of production testing is [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Caching browser binaries and tuning worker parallelism can cut GitHub Actions runs from over three minutes to under five on a single runner [Playwright on GitHub Actions: The setup that actually runs fast](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs).

Security is a CI concern, not just an application concern. The TeamPCP supply chain attack poisoned SAP-ecosystem npm packages with a credential-stealing payload that abused CI-adjacent tooling as a persistence vector [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). MarkdownLM's approach of blocking non-compliant code at the Git layer before it merges is one pattern for hardening the merge boundary [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm). AI-generated code adds a related risk: Vet addresses the gap by reading an agent's conversation history alongside the diff to catch silently skipped tests or swapped-in fake data before they land in main [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

Platform reliability underpins all of it. GitHub's declining quality has prompted calls to migrate to alternatives like Codeberg or self-hosted forges [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), and a developer wishlist for a reimagined forge puts pre-commit remote CI and signed, offline-usable Actions near the top [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github). When the platform itself is unreliable, every pipeline running on it inherits that risk.

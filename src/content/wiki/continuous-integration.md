---
title: Continuous integration
summary: >-
  Continuous integration at scale involves far more than merging frequently: it
  requires reliable test infrastructure, safe queue semantics, supply chain
  vigilance, and increasingly AI-driven triage to keep pipelines meaningful.
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
compiled_at: '2026-07-06T00:11:26.636Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3897
    output_tokens: 1010
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
  cost_usd: 0.026841
---
Continuous integration is the practice of merging code changes into a shared branch frequently and verifying each change automatically. At scale, the operational surface area expands well beyond the merge button.

PostHog's CI pipeline runs 575K jobs and 33 million test executions per week [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). At that volume, manual triage of failures becomes impractical; Mendral's AI agent ingests the resulting log data, traces flaky tests to root causes, and opens fix PRs automatically. The flaky test problem is a recurring theme: TestDino [TestDino](/reading/2026-04/2026-04-30t231348-testdino) and Currents [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) both address it from different angles. Currents argues that Playwright suites break during refactors not because of poor selector choices but because tests couple to CSS classes and DOM structure rather than semantic roles and accessible names. TestDino layers an analytics dashboard on top of test runs to auto-categorize failures and surface patterns.

The infrastructure that runs CI pipelines carries its own engineering complexity. Depot's orchestrator [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions with a two-layer Run/Workflow hierarchy and callback-driven job coordination to run a stateful scheduler without a long-lived process. A GitHub merge queue bug [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows the consequence of architectural choices at the queue layer: building temp branches off the wrong base commit silently deleted thousands of lines from main, an incident Trunk avoided by never pushing temp branches to the primary branch at all.

Security is a direct concern for CI environments. The TeamPCP supply chain attack [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned SAP-ecosystem npm packages to harvest cloud secrets and browser passwords, exfiltrating them via GitHub and abusing VS Code configs as persistence vectors. CI pipelines install dependencies and run code from external registries by design, making them a natural target. MarkdownLM's Lun tool [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) takes a complementary enforcement approach, blocking non-compliant code at the Git layer before merge by querying a living knowledge base of architectural and security policies.

The platform layer matters too. David Bushell [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues GitHub's reliability has declined enough to warrant migration to Codeberg, Forgejo, or self-hosted forges, while Mat Duggan [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) sketches a wishlist that includes pre-commit remote CI and signed, offline-usable Actions. As AI agents write more code, CI also needs to verify agent behavior: Vet [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch silently skipped tests or swapped-in fake data that normal code review misses.

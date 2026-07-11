---
title: Continuous integration
summary: >-
  CI pipelines face compounding pressures from scale, flaky tests, merge queue
  correctness, supply chain attacks, and AI-generated code — each demanding
  stricter architecture at the point where code enters the main branch.
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
compiled_at: '2026-07-09T23:19:17.482Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3897
    output_tokens: 1039
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
  cost_usd: 0.027276
---
Continuous integration is the practice of merging code changes frequently and verifying each merge automatically. The shape of that verification layer has grown considerably more complex as teams scale, as AI agents write more of the code, and as the infrastructure itself becomes an attack surface.

At PostHog's scale, 575K weekly CI jobs and 33 million test executions, the volume of failures exceeds what humans can triage manually. Mendral's AI agent addresses this by ingesting log data, tracing flaky tests to root causes, and opening fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). Flakiness at this scale is not an edge case; it is a primary cost center.

Test stability is a design problem as much as a tooling one. Playwright suites break during UI refactors when tests couple to CSS classes, DOM structure, or element position rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Where you run those tests also matters: staging catches regressions cheaply but cannot reproduce production-only conditions, so some flows warrant splitting between environments [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production).

The merge queue layer introduces its own failure modes. A GitHub bug built temporary branches off the wrong base commit and silently deleted thousands of lines from main; Trunk's architectural choice to avoid pushing temp branches to the main ref sidestepped the incident entirely [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). Correctness at the gate matters more than throughput.

Below the workflow layer, the orchestration infrastructure itself is an engineering problem. Depot CI's scheduler uses AWS Lambda durable functions with a two-layer Run/Workflow hierarchy and callback-driven coordination, keeping the system stateful and checkpointed without a long-lived process [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Security enters CI from multiple directions. The TeamPCP supply chain attack poisoned four SAP-ecosystem npm packages with a credential-stealing payload that targeted cloud secrets and used VS Code configs as persistence vectors [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). MarkdownLM addresses the policy enforcement side differently, centralizing engineering standards into a knowledge base and blocking non-compliant code at the Git layer before it merges [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm).

AI-generated code adds a review problem that standard diffs do not surface. Vet reads an agent's conversation history alongside the diff to catch mistakes like silently skipped tests or swapped-in fake data [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes). The platform hosting all of this also comes under scrutiny: GitHub's reliability decline has prompted calls to migrate to alternatives like Codeberg or self-hosted forges [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), and one developer wishlist explicitly asks for pre-commit remote CI and signed, offline-usable Actions as first-class forge features [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github).

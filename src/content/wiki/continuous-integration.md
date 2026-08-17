---
title: Continuous integration
summary: >-
  CI pipelines face mounting pressure from scale, flakiness, supply chain risk,
  and AI-generated code, with teams responding through smarter orchestration,
  test design discipline, and automated triage.
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
compiled_at: '2026-08-17T18:41:52.422Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1190
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
  cost_usd: 0.030519
---
At its core, continuous integration is the practice of merging code frequently and verifying it automatically. The engineering surface area around that simple idea has grown substantially: at PostHog's scale, CI means 575,000 weekly jobs and 33 million test executions, a workload where manual triage is impossible and Mendral's AI agent takes over, tracing flaky tests to root causes and opening fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team).

The infrastructure underneath pipelines matters more than it appears. Depot's CI orchestrator uses AWS Lambda durable functions to run a stateful, checkpointed scheduler without keeping a long-lived process alive [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). A GitHub merge queue bug showed the consequences of infrastructure choices at a smaller scale: building temp branches off the wrong base commit silently deleted thousands of lines from main, and Trunk's architectural decision to never push temp branches to main avoided the incident entirely [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

Test quality is a recurring pressure point. Playwright suites break during UI refactors when they couple to CSS classes and DOM structure rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Where tests run matters too: staging and production serve different verification purposes, with production testing carrying real operational cost [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Tooling like TestDino adds an analytics layer on top of Playwright runs, auto-categorizing failures as bugs, flaky tests, or UI changes and claiming to save engineers 6-8 hours weekly [TestDino](/reading/2026-04/2026-04-30t231348-testdino). Simpler optimizations also compound: caching browser binaries and scoping which browsers run per CI event can cut GitHub Actions runs from over three minutes to under five on a single runner [Playwright on GitHub Actions: The setup that actually runs fast](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs).

Security pressure has arrived at the CI layer too. The TeamPCP supply chain attack poisoned SAP-ecosystem npm packages with a credential-stealing payload that exfiltrates cloud secrets via GitHub and abuses VS Code configs as persistence vectors [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). MarkdownLM's Lun tool responds to a related problem by blocking non-compliant code at the Git layer before it merges, enforcing architectural and security rules that CI alone may not catch [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm). AST-based linting and LLM-assisted CI checks offer another enforcement angle: banning manual DB commits and model leakage at the code analysis level rather than relying on review [Ban commits/transactions using AST analysis and linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters).

As AI-generated code enters pipelines, new review gaps appear. Vet reads an AI agent's conversation history alongside the diff to catch mistakes that standard code review misses, like silently skipped tests or swapped-in fake data [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes). Platform reliability itself is not guaranteed: GitHub's degradation has prompted calls to migrate to Codeberg, Forgejo, or self-hosted forges [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), and one developer wishlist for a reimagined forge puts pre-commit remote CI and signed, offline-usable Actions near the top [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github).

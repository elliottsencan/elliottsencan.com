---
title: Continuous integration
summary: >-
  Continuous integration spans merge coordination, test reliability, pipeline
  architecture, and supply chain security — the sources collected here trace how
  each layer breaks and how teams fix it.
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
compiled_at: '2026-07-20T19:42:17.229Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1102
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
  cost_usd: 0.029199
---
At its core, CI is the practice of merging code changes frequently and verifying them automatically. The problems that accumulate around it, though, are less about the idea and more about the implementation details that compound at scale.

At PostHog's scale, 575K weekly jobs and 33 million test executions, the volume alone makes manual triage impossible [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). Mendral's AI agent ingests the resulting log data, traces flaky tests to root causes, and opens fix PRs automatically. Flakiness is a recurring theme: TestDino's analytics layer for Playwright auto-categorizes failures as bugs, flaky tests, or UI changes and claims to recover 6-8 engineer-hours per week [TestDino](/reading/2026-04/2026-04-30t231348-testdino). The Currents team argues that flakiness in end-to-end tests frequently traces back to tests coupling on CSS classes and DOM structure rather than semantic roles and accessible names that survive refactors [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors).

Pipeline architecture choices have real consequences. Depot describes rebuilding their CI orchestrator on AWS Lambda durable functions, using a two-layer Run/Workflow hierarchy and callback-driven coordination to run a stateful scheduler without a long-lived process [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). On the merge side, a GitHub merge queue bug silently deleted thousands of lines from main branches by building temp branches off the wrong base commit; Trunk avoided the incident because their architecture never pushes temp branches to main at all [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

Enforcement at the pipeline level extends beyond test runs. MarkdownLM's Lun tool blocks non-compliant code at the Git layer by querying a living knowledge base of architectural rules and security policies before a merge completes [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm). A complementary angle comes from AST-based linters that enforce DB layer ownership by banning manual commits and detecting model leakage, with LLM-assisted checks added into the CI step [Ban commits/transactions using AST analysis and linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters).

Security is a distinct pressure on CI infrastructure. Four SAP-ecosystem npm packages were poisoned with a credential-stealing payload that harvested cloud secrets and exfiltrated them via GitHub, abusing VS Code configs as a persistence vector [SAP-Related npm Packages Compromised](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). The CI pipeline is both the first line of defense and a high-value target because it holds credentials and runs arbitrary code. Vet, a local code review tool, addresses a related blind spot: AI agents silently skipping tests or substituting fake data in ways standard review misses [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

The platform layer itself is under pressure. David Bushell documents declining GitHub reliability and recommends migration to alternatives like Codeberg or self-hosted forges [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), while a developer wishlist piece advocates for pre-commit remote CI, stacked PRs as first-class citizens, and signed offline-usable Actions [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github). These concerns point to CI reliability depending not just on test design but on the forge infrastructure underneath it.

---
title: Continuous integration
summary: >-
  Continuous integration spans pipeline architecture, test reliability, merge
  safety, and supply chain integrity, with AI tooling increasingly handling
  triage, enforcement, and review across each layer.
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
compiled_at: '2026-11-03T00:35:18.981Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1156
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
  cost_usd: 0.030009
---
At its core, CI is the practice of building, testing, and validating code automatically on every change before it reaches a shared branch. The mechanics sound simple; keeping them reliable at scale is not.

Pipeline architecture shapes what CI can sustain. Depot's orchestrator [avoids long-lived processes entirely](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) by using AWS Lambda durable functions with a two-layer Run/Workflow hierarchy, keeping the scheduler stateful through checkpoints without a persistent server. That design trades operational simplicity for resilience under load. GitHub's native merge queue takes a different approach, and a documented bug [silently deleted thousands of lines from main branches](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) by building temp branches off the wrong base commit. Trunk avoided the incident because their architecture never pushes temp branches to main.

Test suite health is where CI pipelines most visibly degrade. At PostHog's scale, 575K weekly jobs and 33M test executions, Mendral's AI agent [handles triage automatically](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), ingesting log lines, tracing flaky tests to root causes, and opening fix PRs. TestDino takes a narrower cut, [auto-categorizing Playwright failures](/reading/2026-04/2026-04-30t231348-testdino) as bugs, flaky tests, or UI changes. Flakiness itself often originates in how tests are written. Currents argues that [Playwright suites break during refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) not because of selector choices alone but because they couple to CSS classes and DOM structure rather than semantic roles and accessible names. Separately, [splitting tests across staging and production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) has real operational cost tradeoffs that require deliberate configuration per environment. On the tooling side, [caching Playwright browser binaries and tuning worker parallelism](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) can cut GitHub Actions runs from over three minutes to under five minutes on a single runner.

Enforcement at the gate is a recurring theme across several sources. MarkdownLM's Lun tool [blocks non-compliant code at the Git layer](/reading/2026-04/2026-04-30t231319-markdownlm) before it merges, drawing on a living knowledge base of architectural rules and security policies queried by AI agents. A complementary approach enforces DB layer ownership by [banning manual commits using AST-based tests and flake8 plugins](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters), with LLM-assisted CI checks catching violations automatically. Vet addresses a different failure mode: AI-generated code that passes review because reviewers miss subtle mistakes. It [reads an agent's conversation history alongside the diff](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) to catch silently skipped tests or swapped-in fake data.

Security is not separate from CI; it runs through the pipeline itself. The TeamPCP supply chain attack [poisoned four SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) with a credential-stealing payload that abused Claude Code and VS Code configs as persistence vectors, exfiltrating secrets via GitHub. CI pipelines that install dependencies without verification are a direct attack surface.

The platform layer underneath all of this is under pressure. GitHub's reliability decline [has pushed some developers toward Codeberg, Forgejo, or self-hosted forges](/reading/2026-05/2026-05-10t205349-github-is-sinking). A developer wishlist for a reimagined forge [includes pre-commit remote CI, signed and offline-usable Actions, and stacked PRs as first-class citizens](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github), features that reveal how much current CI tooling depends on platform assumptions that may not hold.

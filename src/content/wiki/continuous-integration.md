---
title: Continuous integration
summary: >-
  Continuous integration is the practice of merging, building, and testing code
  frequently; sources here cover CI infrastructure design, test suite health,
  merge queue correctness, and AI-assisted triage at scale.
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
compiled_at: '2026-08-03T19:31:46.328Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1099
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
  cost_usd: 0.029154
---
At its core, continuous integration asks every change to prove itself before landing. The mechanics have grown considerably more complex than a simple build-and-test loop, and the sources here cover that complexity from several angles.

Infrastructure design shapes what CI can guarantee. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) replaces a long-lived scheduler process with AWS Lambda durable functions, using a two-layer Run/Workflow hierarchy and callback-driven job coordination to achieve stateful, checkpointed pipelines without persistent servers. Correctness at the merge layer matters too: [Trunk's post-mortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) on a GitHub merge queue bug shows how building a temp branch off the wrong base commit silently deleted thousands of lines from main; Trunk avoided the incident by never pushing temp branches to the canonical branch.

Test suite health is a recurring pressure point. [Mendral's Mendral Blog](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes running 575K weekly jobs and 33M test executions at PostHog's scale, where an AI agent ingests billions of log lines, traces flaky tests to root causes, and opens fix PRs automatically. At a lower level, [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that suites break during UI refactors not because of bad selector choices but because tests couple to CSS classes and DOM structure instead of semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the reporting side, auto-categorizing failures as bugs, flaky tests, or UI changes. Splitting tests between environments also matters: [Currents on staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) offers a decision framework for which flows belong where and what the operational costs of production testing look like. Practically, [a GitHub Actions tuning guide](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) covers caching browser binaries and scoping browser targets by CI event to cut runs from over three minutes to under five on a single runner.

CI is also a policy enforcement surface. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer before it merges by querying a living knowledge base of architectural rules and security policies. [A post on AST-based linting](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) applies the same principle to database ownership, banning manual commits and model leakage through flake8 plugins and LLM-assisted CI checks.

Security and trust run through all of it. [The SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) shows how poisoned dependencies can reach CI environments, harvesting cloud secrets through the same pipelines meant to validate code. [Imbue's Vet tool](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) addresses a newer vector: AI agents that silently skip tests or swap in fake data in ways standard code review misses. Platform reliability is a background concern too; [David Bushell's critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) and [Mat Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github), which includes pre-commit remote CI and signed offline-usable Actions, both reflect how much teams depend on the underlying forge being trustworthy and well-designed.

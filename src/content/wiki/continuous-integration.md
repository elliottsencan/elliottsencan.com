---
title: Continuous integration
summary: >-
  CI infrastructure spans test reliability, merge safety, scheduling
  architecture, and supply chain security — a discipline where tooling choices
  compound quickly at scale.
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
compiled_at: '2026-10-26T22:23:38.998Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1075
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
  cost_usd: 0.028794
---
Continuous integration is the practice of merging, building, and validating code changes automatically and frequently. The sources here cover CI from several angles: test suite design, queue architecture, serverless orchestration, AI-assisted triage, and the security risks that enter through the pipeline.

At scale, the volume problem dominates everything else. PostHog's setup processes 575K weekly jobs and 33M test executions, and [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) handles the resulting noise by ingesting billions of log lines, tracing flaky tests to root causes, and opening fix PRs automatically. Manual triage at that volume is not feasible.

Flaky tests are a recurring theme. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) classifies failures automatically as bugs, flaky tests, or UI changes. [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues the root cause is coupling tests to implementation details like CSS classes and DOM structure rather than semantic roles and accessible names. Separately, [optimizing GitHub Actions for Playwright](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) through caching browser binaries and tuning parallelism can cut run times from over three minutes to under five on a single runner.

Merge queue correctness matters as much as test correctness. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building temp branches off the wrong base commit. Trunk's architectural choice to avoid pushing temp branches to main protected their users from the incident.

Orchestration architecture is non-trivial even before you reach PostHog's scale. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions to run a stateful, checkpointed workflow scheduler without a long-lived process, separating run-level and workflow-level Lambda concerns and using callback-driven job coordination.

Security is another CI-layer concern. [Compromised SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) harvested cloud secrets and browser passwords, exfiltrating them via GitHub and using VS Code configs as persistence vectors. What enters the dependency graph enters the CI environment. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) takes a complementary approach: blocking non-compliant code at the Git layer before it merges by querying a centralized knowledge base of architectural rules and security policies.

AI-generated code introduces its own verification gap. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch mistakes like silently skipped tests or swapped-in fake data that standard code review misses. [Enforcing DB layer ownership through AST-based CI checks](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) follows similar logic: codify structural constraints in the pipeline rather than relying on review.

The platform hosting all of this is not neutral infrastructure. [Concerns about GitHub's reliability](/reading/2026-05/2026-05-10t205349-github-is-sinking) under Microsoft and a [developer wishlist for a reimagined forge](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) — pre-commit remote CI, signed offline-usable Actions, stacked PRs as first-class citizens — point to CI as an area where the host platform's architectural choices constrain what teams can build.

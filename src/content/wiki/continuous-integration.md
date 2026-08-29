---
title: Continuous integration
summary: >-
  Continuous integration spans test suite design, pipeline architecture, merge
  safety, and supply chain security, with AI tooling increasingly absorbing the
  triage and enforcement work that once fell to engineers manually.
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
compiled_at: '2026-08-29T20:12:58.884Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1103
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
  cost_usd: 0.029214
---
Continuous integration is the practice of merging code frequently and verifying each change through automated builds and tests. The sources here cover the full stack of concerns that practice implies: how pipelines are architected, how test suites are kept reliable, how merge safety is enforced, and what happens when the infrastructure underneath breaks.

At scale, the volume of CI work becomes its own engineering problem. [PostHog's setup](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575K weekly jobs and 33M test executions; Mendral's AI agent ingests the resulting log data to trace flaky tests to root causes and open fix PRs automatically. That pattern, where an AI layer absorbs triage rather than humans reading failure logs, recurs in [TestDino](/reading/2026-04/2026-04-30t231348-testdino), which auto-categorizes Playwright failures as bugs, flaky tests, or UI changes and claims to recover 6-8 engineer-hours weekly.

Test reliability is a persistent thread. [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues failures during refactors stem from coupling to implementation details like CSS classes and DOM structure rather than semantic roles and accessible names. Where tests run matters too: [the staging-vs-production decision](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames which flows belong in each environment and what the operational cost of production testing is. For pure execution speed, [caching browser binaries and tuning parallelism on GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) can cut a 3-minute run to under one minute on a single runner.

Pipeline architecture choices have correctness consequences. [Depot's use of AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows how a stateful, checkpointed scheduler can run without a long-lived process. Merge queue design carries its own risks: a [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines by building temp branches off the wrong base commit; Trunk's architectural choice to never push temp branches to main sidestepped the incident entirely.

Security is not separate from CI. [Compromised SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) used CI execution paths to harvest cloud secrets, exfiltrate via GitHub, and persist through VS Code and Claude Code configs. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) takes a preventive angle, blocking non-compliant code at the Git layer before it merges. [AST-based linting and LLM-assisted CI checks](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) extend enforcement further into domain-specific constraints like database layer ownership.

AI-generated code adds a review gap that standard CI does not close. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to surface mistakes like silently skipped tests or swapped-in fake data. And the platform layer itself is not guaranteed stable: [David Bushell's critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) and [Mat Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github), which includes pre-commit remote CI and signed offline-usable Actions, both treat CI capability as a first-order reason to care about which platform hosts the code.

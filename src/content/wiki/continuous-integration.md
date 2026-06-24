---
title: Continuous integration
summary: >-
  CI pipelines have grown into layered systems spanning test reliability, merge
  safety, infrastructure architecture, security hygiene, and AI-assisted triage
  — each layer a distinct failure surface.
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
compiled_at: '2026-06-24T06:29:44.781Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3897
    output_tokens: 979
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
  cost_usd: 0.026376
---
Continuous integration began as a discipline for merging code frequently and validating each change automatically. The sources collected here show how much surface area that simple idea now covers.

At scale, the core problem shifts from running tests to understanding them. [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) handles 575K weekly jobs and 33M test executions at PostHog, ingesting billions of log lines to trace flaky tests to root causes and open fix PRs automatically. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a narrower cut of the same problem for Playwright suites, auto-categorizing failures as bugs, flaky tests, or UI changes. Both approaches treat the CI result stream as data worth analyzing rather than a pass/fail gate to click through.

Test design affects how much triage work is needed in the first place. [Currents on surviving UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that suites break not from bad selectors alone but from coupling to DOM structure and CSS classes rather than semantic roles and accessible names. A separate Currents piece on [staging versus production testing](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames where in the pipeline different test classes belong.

The infrastructure underneath CI pipelines is its own design space. [Depot's orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions to run a stateful, checkpointed workflow scheduler without a long-lived process, using a two-layer Run/Workflow Lambda hierarchy. That architectural choice trades operational simplicity for the ability to survive partial failures.

Merge queues sit at the boundary between CI and version control. [Trunk's post-mortem on a GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how building temp branches off the wrong base commit silently deleted thousands of lines from main; Trunk avoided the incident by never pushing temp branches to main at all. [David Bushell's broader critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) treats this as part of a pattern of platform reliability degradation.

Security enters CI through the dependency graph. [The SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned packages that CI pipelines install, harvesting cloud secrets and browser credentials. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) addresses a different entry point, blocking non-compliant code at the Git layer before merge by querying a living policy knowledge base. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) targets AI-generated code specifically, reading an agent's conversation history alongside the diff to catch silently skipped tests or swapped-in fake data that standard review misses.

[Mat Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) pulls several threads together: pre-commit remote CI, signed and offline-usable Actions, and stacked PRs as first-class citizens — features that treat CI as integral to the code review contract rather than a separate system bolted on afterward.

---
title: Continuous integration
summary: >-
  CI at scale surfaces problems in infrastructure architecture, test design, and
  security posture — sources here cover merge queue correctness, flaky-test
  triage, supply chain risk, and orchestrator design.
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
compiled_at: '2026-06-22T02:40:40.025Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3578
    output_tokens: 875
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
  cost_usd: 0.023859
---
Continuous integration is the practice of merging developer work frequently and validating each change with automated builds and tests. At small scale the mechanics are almost invisible; at large scale the infrastructure choices become load-bearing.

The clearest illustration of scale pressure is PostHog's pipeline: [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests 575K weekly jobs and 33M test executions, traces flaky tests to root causes, and opens fix PRs automatically. That volume makes human triage economically impractical, so the agent becomes part of the CI loop itself.

Orchestrator architecture shapes correctness before a single test runs. [Depot's Lambda-based scheduler](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) replaces a long-lived process with stateful, checkpointed durable functions, trading a persistent server for a two-layer Run/Workflow Lambda hierarchy with callback-driven coordination. The tradeoff matters because long-lived orchestrators are a failure surface. A different failure surface appeared in GitHub's merge queue: [Trunk documents a bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) where temp branches were built off the wrong base commit, silently deleting thousands of lines from main. Their architectural choice — never push temp branches to main — avoided the incident.

Test quality is the other axis. [Currents argues](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) that Playwright suites break during refactors not because of selector choices alone, but because tests couple to implementation details — CSS classes, DOM structure, position — rather than semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the reporting side, auto-categorizing failures as bugs, flaky tests, or UI changes. [Currents also covers](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) where tests run: staging vs. production is a decision about which failure modes you can tolerate discovering where.

Security enters CI through dependency ingestion. The [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned four packages with a credential-stealing payload that harvests cloud secrets and exfiltrates them via GitHub. CI pipelines that install npm packages without verification are the attack surface. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) takes a pre-merge enforcement angle, blocking non-compliant code at the Git layer by querying a centralized knowledge base of security policies.

Platform reliability underlies all of this. [David Bushell's critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) notes declining reliability under Microsoft and suggests migrating to Codeberg, Forgejo, or self-hosted forges. CI pipelines that depend on a single platform inherit that platform's failure modes.

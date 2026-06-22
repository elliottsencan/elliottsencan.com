---
title: Continuous integration
summary: >-
  CI pipelines have grown complex enough to require dedicated orchestration,
  AI-assisted triage, and architectural safeguards against flaky tests, bad
  merges, and supply-chain compromise.
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
compiled_at: '2026-06-22T07:26:04.271Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3578
    output_tokens: 868
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
  cost_usd: 0.023754
---
Continuous integration sits at the intersection of infrastructure decisions, test reliability, and security posture. The sources here collectively show that CI at scale is not a solved problem; it generates its own operational surface area that teams must actively manage.

At high volumes the sheer quantity of test output makes manual triage impractical. PostHog runs 575,000 weekly CI jobs and 33 million test executions, a scale at which Mendral's AI agent ingests log lines, traces flaky tests to root causes, and opens fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). TestDino approaches the same problem from the reporting layer, auto-categorizing Playwright failures as bugs, flaky tests, or UI changes [TestDino](/reading/2026-04/2026-04-30t231348-testdino).

Flakiness is partly a test-authoring problem. Tests that couple to CSS classes, DOM structure, or element position break on UI refactors regardless of CI configuration; using semantic roles and accessible names produces suites that stay stable across those changes [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Where tests run also matters: staging and production serve different verification needs, and treating them interchangeably creates false confidence [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production).

On the infrastructure side, merge queues introduce their own failure modes. A GitHub bug built temp branches off the wrong base commit and silently deleted thousands of lines from main; Trunk's architecture, which avoids pushing temp branches to main at all, was unaffected [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). Depot CI takes a different architectural angle, using AWS Lambda durable functions for a stateful, checkpointed workflow scheduler that requires no long-lived orchestrator process [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Security is a growing concern at the pipeline layer. Compromised npm packages in the SAP ecosystem carried credential-stealing payloads that harvested cloud secrets and used CI-adjacent tooling as persistence vectors [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). MarkdownLM addresses the policy-enforcement side by blocking non-compliant code at the Git layer before it merges [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm), though that targets standards conformance more than active compromise. Platform reliability is also a variable: declining GitHub stability [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) means CI pipelines built entirely on hosted platforms inherit that platform's risk profile.

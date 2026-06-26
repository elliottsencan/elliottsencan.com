---
title: Continuous integration
summary: >-
  CI infrastructure spans orchestration, test quality, merge safety, and
  supply-chain security — a set of sources that collectively show how teams at
  scale diagnose what breaks and why.
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
compiled_at: '2026-06-26T02:54:59.980Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3897
    output_tokens: 947
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
  cost_usd: 0.025896
---
Continuous integration is the practice of merging and validating code changes frequently, with automated pipelines that catch regressions before they reach production. At sufficient scale the mechanics become their own engineering problem.

PostHog's pipeline processes 575K weekly jobs and 33M test executions. Mendral's AI agent handles triage at that volume by ingesting billions of log lines, tracing flaky tests to root causes, and opening fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). The infrastructure layer matters too: Depot's orchestrator runs a stateful, checkpointed workflow scheduler on AWS Lambda durable functions, avoiding a long-lived process entirely through a two-layer Run/Workflow Lambda hierarchy [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Test quality shapes how much CI can be trusted. Playwright suites degrade during UI refactors not because of poor selector choices alone, but because tests couple to implementation details like CSS classes and DOM position rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Where to run tests also matters: staging and production serve different purposes, and splitting Playwright runs across environments requires deliberate decisions about which flows belong where and what the operational costs are [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). AI-generated code introduces another failure mode: agents can silently skip tests or swap in fake data, and tools like Vet read the agent's conversation history alongside the diff to catch what standard review misses Vet: Catch your coding agent's mistakes.

Merge queues are a point of structural risk. A GitHub bug caused temp branches built off the wrong base commit to silently delete thousands of lines from main; Trunk's architecture avoided the incident by never pushing temp branches to main at all [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). That incident sits alongside broader concerns about GitHub's reliability [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), and wishlist-level thinking about what better forges would offer: pre-commit remote CI, stacked PRs as first-class citizens, and signed offline-usable Actions [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github).

Security intersects CI at the dependency layer. Poisoned npm packages in the SAP ecosystem harvested cloud secrets and browser passwords by abusing VS Code configs as persistence vectors [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Policy enforcement before merge is one mitigation: MarkdownLM's Lun tool blocks non-compliant code at the Git layer by querying a living knowledge base of architectural and security standards [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm).

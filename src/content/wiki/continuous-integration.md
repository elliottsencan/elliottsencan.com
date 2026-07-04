---
title: Continuous integration
summary: >-
  CI pipelines connect code authorship to production confidence — and the
  sources here show pressure from every direction: infrastructure reliability,
  test quality, supply chain attacks, and AI agents that both help and
  complicate the picture.
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
compiled_at: '2026-07-04T21:18:30.256Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3897
    output_tokens: 946
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
  cost_usd: 0.025881
---
Continuous integration is the practice of merging code frequently into a shared branch and running automated verification on every change. The goal is catching breakage early, before it compounds. That simple premise hides a lot of operational complexity, and the sources here illuminate it from several angles.

At scale, the sheer volume of CI work becomes its own problem. PostHog runs 575K weekly jobs and 33M test executions; Mendral's AI agent handles triage by ingesting billions of log lines, tracing flaky tests to root causes, and opening fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). Flaky tests are a chronic tax on that throughput. TestDino approaches the same problem with an analytics layer that auto-categorizes failures as bugs, flaky tests, or UI changes [TestDino](/reading/2026-04/2026-04-30t231348-testdino), while Currents argues the root cause is tests coupled to implementation details rather than stable semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors).

Infrastructure choices matter at the pipeline level too. Depot CI's orchestrator uses AWS Lambda durable functions to run a stateful, checkpointed workflow scheduler without a long-lived process [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). Merge queue correctness is another axis: a GitHub bug silently deleted thousands of lines by building temp branches off the wrong base commit, something Trunk avoided by never pushing temp branches to main [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

The pipeline is also a security boundary. Compromised SAP-ecosystem npm packages demonstrated how a supply chain attack can use CI-adjacent tooling, harvesting cloud secrets and abusing VS Code and Claude Code configs as persistence vectors [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). MarkdownLM addresses the enforcement side: blocking non-compliant code at the Git layer before it merges, based on a centralized policy knowledge base that AI agents query in real time [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm).

AI agents complicate the CI story in a specific way: they can silently skip tests or swap in fake data, and standard code review misses it. Vet reads an agent's conversation history alongside the diff specifically to catch those mistakes [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes). The platform layer underneath all of this is also under pressure. David Bushell argues GitHub's reliability has declined enough to warrant migration [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), and Mat Duggan's forge wishlist includes pre-commit remote CI and signed, offline-usable Actions as baseline expectations [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github).

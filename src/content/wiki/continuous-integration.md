---
title: Continuous integration
summary: >-
  CI pipelines today span test orchestration, merge safety, environment
  strategy, supply-chain security, and AI-assisted triage — a set of concerns
  that extends well beyond the original commit-and-build loop.
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
compiled_at: '2026-06-24T04:34:42.403Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3728
    output_tokens: 901
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
  cost_usd: 0.024699
---
Continuous integration was conceived as a tight feedback loop: merge code frequently, build it, run tests, catch breakage early. The sources here collectively show how far that original loop has grown in surface area.

At scale, the test suite itself becomes the first problem. [PostHog's setup via Mendral](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575,000 jobs and 33 million test executions weekly. At that volume, human triage of failures is impractical; an AI agent ingests the log output, traces flaky tests to root causes, and opens fix PRs automatically. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) targets a similar pain point at smaller scale, auto-categorizing Playwright failures as bugs, flakiness, or UI drift.

Flakiness and fragile selectors are a persistent drain. [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues the root cause is tests coupled to implementation details like CSS classes and DOM structure rather than semantic roles and accessible names that survive refactors. Where to run those tests is a separate question: [staging versus production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) carry different fidelity and operational cost tradeoffs that require an explicit strategy per flow type.

The infrastructure underneath CI matters too. [Depot](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) built their orchestrator on AWS Lambda durable functions, using a two-layer Run/Workflow hierarchy and callback-driven coordination to run stateful pipelines without a long-lived process. The merge queue layer introduces its own failure modes: [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) documented a GitHub bug that silently deleted thousands of lines from main branches when temp branches were built off the wrong base commit, an incident their architecture avoided by never pushing temp branches to main.

Policy enforcement is moving into the pipeline as well. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer before merge, treating architectural rules and security policies as live constraints rather than documentation. That enforcement layer matters especially given supply-chain risk: [compromised SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) harvested cloud secrets and browser passwords from developer machines, with CI environments as a natural exposure point.

AI-generated code adds a review gap that standard diffs miss. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch issues like silently skipped tests or substituted fake data. Finally, the platform itself is a dependency: [David Bushell's critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) raises the point that CI workflows tightly coupled to GitHub Actions inherit the reliability risks of the platform.

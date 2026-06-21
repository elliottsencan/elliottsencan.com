---
title: Continuous integration
summary: >-
  CI at scale demands more than automated builds: flaky test management, merge
  queue correctness, secure dependency chains, and increasingly AI-driven triage
  are all now part of keeping a pipeline trustworthy.
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
compiled_at: '2026-06-21T20:21:36.838Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3578
    output_tokens: 855
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
  cost_usd: 0.023559
---
Continuous integration is the practice of merging code frequently and verifying each change with automated builds and tests. The operational reality at scale diverges sharply from the textbook description.

At PostHog's scale, 575K weekly jobs and 33 million test executions, the volume of CI output is too large for engineers to triage manually. [Mendral's AI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests billions of log lines, traces flaky tests to root causes, and opens fix PRs automatically. That pattern, AI handling the signal-to-noise problem inside CI, represents a genuine shift in how pipeline health is maintained rather than a marginal productivity gain.

Test reliability is its own sub-discipline. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes Playwright failures as bugs, flaky tests, or UI changes, and claims to recover 6 to 8 engineering hours weekly. Separately, [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during UI refactors not because of selector hygiene alone but because they couple to CSS classes and DOM structure instead of semantic roles and accessible names. The two sources agree that flakiness and refactor-fragility are distinct problems requiring distinct solutions.

Merge queue correctness matters too. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines by building temp branches off the wrong base commit; Trunk avoided it by never pushing temp branches to main. Architectural choices at the queue layer have real data-integrity consequences.

CI infrastructure itself is a design space. [Depot](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) runs its orchestrator on AWS Lambda durable functions, using a two-layer Run/Workflow hierarchy and callback-driven job coordination to achieve stateful scheduling without a long-lived process. The approach trades conventional server complexity for the cold-start and state-management constraints of serverless.

Security intersects with CI through the dependency chain. [Poisoned SAP npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) harvested cloud secrets and browser passwords from developer machines, exfiltrating via GitHub and using VS Code configs as persistence vectors. Supply chain attacks arrive through the same package install steps that CI pipelines run on every build. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) takes a complementary stance, blocking non-compliant code at the Git layer before it merges by querying a centralized policy knowledge base at commit time.

Platform reliability underpins all of this. [Concerns about GitHub's declining reliability](/reading/2026-05/2026-05-10t205349-github-is-sinking) under Microsoft add weight to the architectural argument for not coupling CI correctness too tightly to any single platform's internals.

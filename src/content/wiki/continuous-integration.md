---
title: Continuous integration
summary: >-
  Continuous integration at scale surfaces challenges in test reliability,
  pipeline architecture, merge safety, and supply chain security that simple
  commit-and-build definitions obscure.
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
aliases:
  - tdd
compiled_at: '2026-06-18T23:04:21.296Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3748
    output_tokens: 794
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
  cost_usd: 0.023154
---
Continuous integration means running automated checks on every code change before it reaches a shared branch. At modest scale that is straightforward; at production scale the operational surface grows considerably. [PostHog's pipeline](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575,000 weekly jobs and 33 million test executions, a volume where manual failure triage becomes untenable and an AI agent is used to trace flaky tests to root causes and open fix PRs automatically.

Flaky tests are a recurring pressure point. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes failures as bugs, flaky tests, or UI changes, claiming to recover 6-8 hours of engineer time weekly. The upstream cause of fragile tests is often design rather than tooling: [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that Playwright suites break during refactors because they couple to CSS classes and DOM structure instead of semantic roles and accessible names that remain stable across rewrites. Where those tests run matters too; [staging versus production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) involves real tradeoffs in coverage fidelity and operational cost.

Pipeline architecture shapes correctness guarantees. [Depot](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions to run a stateful, checkpointed scheduler without a long-lived process, separating orchestration from execution. Merge queue integrity is a related concern: a [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building temp branches off the wrong base commit, an incident Trunk avoided by never pushing temp branches to main at all.

Security enters at the dependency layer. The [TeamPCP supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned SAP-ecosystem npm packages with a credential-stealing payload that harvests cloud secrets available inside CI environments. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) addresses a different gate, blocking non-compliant code at the Git layer before merge by querying a centralized policy knowledge base in real time.

Underpinning all of this is platform reliability. [David Bushell's critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) points to declining reliability under Microsoft as a reason to consider alternatives, a concern that lands differently when CI pipelines depend on GitHub Actions and merge queues for every deploy.

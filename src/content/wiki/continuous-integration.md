---
title: Continuous integration
summary: >-
  CI pipelines at scale surface tradeoffs in orchestration architecture, test
  reliability, security exposure, and AI-assisted triage — each pulling on the
  same question of what it means to ship code safely and quickly.
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
compiled_at: '2026-06-20T12:49:54.563Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3578
    output_tokens: 806
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
  cost_usd: 0.022824
---
Continuous integration is the practice of merging code frequently and verifying each change automatically. At small scale, a few jobs and a green/red badge suffice. At scale, the system develops failure modes that require deliberate architectural choices.

Orchestration is one such choice. [Depot's CI scheduler](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions to run a stateful, checkpointed workflow without a long-lived process, using a two-layer Run/Workflow Lambda hierarchy. This sidesteps the cold-start fragility that plagues naive serverless CI designs. A related failure surface is the merge queue itself: [Trunk's post-mortem on a GitHub bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how building temp branches off the wrong base commit silently deleted thousands of lines from main — an incident Trunk avoided by never pushing temp branches to main at all.

Test reliability compounds as pipelines grow. [PostHog's setup, as described by Mendral](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), runs 575K CI jobs and 33M test executions per week. At that volume, flaky tests become signal-to-noise problems; Mendral's AI agent ingests billions of log lines, traces root causes, and opens fix PRs automatically. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the same problem for Playwright suites by auto-categorizing failures as bugs, flaky tests, or UI changes. [Currents' guide on test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues the flakiness problem is partly architectural: tests that couple to CSS classes or DOM structure break during refactors, while tests anchored to semantic roles and accessible names stay stable.

Security is a layer most CI discussions underweight. [The SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned four ecosystem packages with a credential-stealing payload that harvested cloud secrets and exfiltrated them via GitHub — exactly the kind of dependency a CI environment installs and trusts. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) takes a different angle, blocking non-compliant code at the Git layer before it merges, enforcing architectural rules and security policies in real time.

Platform reliability itself is a dependency. [David Bushell's critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) notes that the platform underpinning most CI workflows has degraded under Microsoft, making the case for alternatives before a team's pipeline becomes hostage to a platform in decline.

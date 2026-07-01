---
title: Continuous integration
summary: >-
  CI at scale surfaces challenges in pipeline architecture, test reliability,
  security at the merge boundary, and tooling for the AI-assisted development
  era.
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
compiled_at: '2026-07-01T00:35:25.383Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3897
    output_tokens: 906
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
  cost_usd: 0.025281
---
Continuous integration is the practice of merging code changes frequently and verifying each merge automatically. At small scale, this mostly means running tests on every pull request. At scale, the shape of the problems shifts considerably.

PostHog's pipeline, described in [the Mendral case study](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), runs 575,000 weekly jobs and 33 million test executions. The dominant operational problem at that volume is not writing tests but triaging failures — distinguishing flaky infrastructure from real regressions. Mendral's AI agent ingests billions of log lines, traces failures to root causes, and opens fix PRs automatically. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the same triage problem for Playwright suites specifically, auto-categorizing failures as bugs, flaky tests, or UI changes.

Test durability is a prerequisite for any reliable pipeline. [Currents on UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues failures during refactors are caused by coupling tests to CSS classes and DOM structure rather than semantic roles and accessible names. [Playwright staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) adds environment discipline: splitting which flows run where matters as much as how tests are written.

Pipeline infrastructure correctness has its own failure modes. A GitHub merge queue bug documented by [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main by building temp branches off the wrong base commit. Trunk avoided the incident by never pushing temp branches to main — an architectural decision, not a configuration tweak. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) takes a different infrastructure angle, using AWS Lambda durable functions to run a stateful, checkpointed scheduler without a long-lived process, avoiding a class of availability problems endemic to always-on orchestrators.

Security at the merge boundary is a growing concern. The [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned packages that CI pipelines consume, harvesting cloud secrets during builds. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) positions itself at the Git layer to block non-compliant code before merge, and [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reviews AI agent diffs for silent test skips and swapped-in fake data before they land.

Platform trust is an underrated CI variable. [David Bushell's critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) and [Mat Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) — which calls for pre-commit remote CI, stacked PRs, and signed offline-usable Actions — reflect a broader dissatisfaction with the platform layer that CI pipelines depend on.

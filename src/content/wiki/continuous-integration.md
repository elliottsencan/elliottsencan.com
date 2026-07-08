---
title: Continuous integration
summary: >-
  CI pipelines connect code commits to production confidence; the sources
  collectively map how test reliability, merge queue correctness, orchestration
  architecture, and supply-chain security all shape whether that connection
  holds.
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
compiled_at: '2026-07-08T00:11:39.350Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3897
    output_tokens: 951
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
  cost_usd: 0.025956
---
Continuous integration is the practice of automatically building and testing code on every commit so that the gap between "it works on my machine" and "it works in production" stays small. What the cited sources show is that the problems teams actually face are rarely about whether to run CI, but about the reliability of what runs inside it and the trustworthiness of the infrastructure running it.

Test suite health sits at the center of those concerns. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes failures as bugs, flaky tests, or UI changes, claiming to save engineers hours of triage weekly. That triage cost is real at scale: [Mendral's AI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) handles 575,000 weekly CI jobs and 33 million test executions at PostHog, ingesting billions of log lines to trace flaky tests to root causes and open fix PRs automatically. Playwright-specific sources point to why flakiness accumulates: [Currents on selector stability](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues tests break during refactors because they couple to CSS classes and DOM structure rather than accessible names and semantic roles. [Their staging-vs-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) adds that where a test runs matters as much as how it is written.

Orchestration correctness is a separate failure mode. [Depot's write-up](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) describes using AWS Lambda durable functions to run a stateful, checkpointed CI workflow scheduler without keeping a long-lived process alive. [Trunk's post-mortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) on a GitHub merge queue bug shows the cost of getting this wrong: temp branches built off the wrong base commit silently deleted thousands of lines from main, a failure Trunk avoided by never pushing temp branches to main at all.

The platform itself is not neutral ground. [David Bushell](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues GitHub's reliability has declined sharply and developers should consider alternatives. [Mat Duggan's wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) imagines pre-commit remote CI, signed and offline-usable Actions, and stacked PRs as first-class citizens as features a healthier forge would offer.

Supply chain risk cuts across all of it. [The SAP npm compromise](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) shows a threat actor poisoning packages that CI pipelines install, harvesting cloud secrets and exfiltrating them via GitHub. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) and [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) represent responses at the gate: blocking non-compliant code at the Git layer before it merges, and reviewing AI-generated diffs for silently skipped tests or swapped-in fake data before they ever hit CI.

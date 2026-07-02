---
title: Continuous integration
summary: >-
  Continuous integration keeps codebases shippable by verifying every change
  before it lands; at scale, that requires reliable infrastructure, stable test
  suites, and tooling that surfaces failures fast enough to stay actionable.
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
compiled_at: '2026-07-02T12:25:56.693Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3897
    output_tokens: 911
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
  cost_usd: 0.025356
---
CI is easy to describe and hard to run well. At small scale a green pipeline is a green pipeline. At PostHog's scale — 575,000 weekly jobs and 33 million test executions — the signal-to-noise problem becomes its own engineering challenge. [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests billions of log lines to separate real failures from flaky noise and opens fix PRs automatically, which is one answer to that problem. Another is preventing bad code from entering the pipeline at all: [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer before a merge happens.

The integrity of what CI actually builds matters as much as the speed of feedback. [Trunk's post-mortem on a GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how building a temp branch off the wrong base silently deleted thousands of lines from main — an architectural decision about where temp branches live turned out to be load-bearing. [David Bushell's critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) and [Mat Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) — which asks for pre-commit remote CI and signed, offline-usable Actions — both treat platform reliability as a CI correctness concern, not just a convenience one.

Test quality is the other axis. [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that suites break during refactors because they couple to DOM structure rather than semantic roles. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the downstream problem: auto-categorizing failures as bugs, flaky tests, or UI changes so engineers spend less time triaging. Where tests run also matters; [Currents' staging-vs-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) treats environment selection as a deliberate architectural choice rather than a default.

Infrastructure design shapes what CI can guarantee. [Depot's use of AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) replaces a long-lived orchestrator process with a checkpointed, callback-driven scheduler — trading operational simplicity for better fault tolerance. Security is part of this picture too: [the SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) used CI environments as a harvest point for cloud secrets, a reminder that dependency resolution inside a pipeline is an attack surface. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) extends this concern to AI-generated code, catching failures like silently skipped tests that standard review misses before a diff lands in CI at all.

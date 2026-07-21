---
title: Continuous integration
summary: >-
  Continuous integration spans pipeline architecture, test reliability, merge
  safety, and supply chain security — the sources here trace how CI systems are
  built, broken, and hardened at scale.
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
  - >-
    2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs
  - >-
    2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters
compiled_at: '2026-07-21T05:00:34.573Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1008
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
  cost_usd: 0.027789
---
CI is rarely one thing. At large scale, it is a pipeline orchestration problem: [Depot's approach](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) replaces long-lived orchestrator processes with AWS Lambda durable functions that checkpoint workflow state and coordinate jobs through callbacks, making the scheduler itself stateless and fault-tolerant. At PostHog's scale — 575K weekly jobs and 33M test executions — [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests billions of log lines, classifies failures, traces flaky tests to root causes, and opens fix PRs automatically, shifting CI triage from a human tax to an automated loop.

Test quality shapes whether any of that pipeline throughput means anything. [Playwright tests that couple to CSS classes and DOM structure](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) break on every refactor; tests written against semantic roles and accessible names survive them. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) and [Currents's staging-versus-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) each address how to categorize and route failures once they surface. Speeding up test runs without sacrificing coverage is its own problem: [caching browser binaries and scoping Playwright targets by CI event type](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) can cut GitHub Actions runs from three minutes to under five on a single runner.

Merge safety is a distinct failure mode. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building off the wrong base commit; Trunk's architecture avoided the incident by never pushing temp branches to main. That kind of silent corruption is hard to catch after the fact, which is part of why [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads agent conversation history alongside diffs to catch mistakes like silently skipped tests before they merge.

Policy enforcement at the Git layer is another strand. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code before it merges by having AI agents query a live knowledge base of architectural and security rules. [AST-based linters and flake8 plugins](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) can enforce DB layer ownership rules the same way, banning manual commits and model leakage at CI time rather than in code review.

Supply chain risk cuts across all of this. [Compromised SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) harvested cloud credentials and browser passwords while abusing CI tool configs as persistence vectors, a reminder that the dependency graph is part of the attack surface. Platform reliability is also not a given: [GitHub's declining quality](/reading/2026-05/2026-05-10t205349-github-is-sinking) and the [wishlist for a reimagined forge](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) — pre-commit remote CI, stacked PRs, signed offline-usable Actions — point to unmet infrastructure needs that teams are working around rather than through.

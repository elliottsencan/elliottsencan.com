---
title: Continuous integration
summary: >-
  Continuous integration spans test reliability, pipeline architecture, merge
  safety, and supply-chain security — a practice whose complexity grows sharply
  with team and codebase scale.
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
compiled_at: '2026-08-31T22:31:41.942Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1042
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
  cost_usd: 0.028299
---
At a 100-person engineering team running 575,000 CI jobs and 33 million test executions weekly, CI stops being a simple green/red gate and becomes an infrastructure problem in its own right. [Mendral's writeup on PostHog](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes an AI triage agent that ingests billions of log lines, traces flaky tests to root causes, and opens fix PRs automatically — a sign that at scale, human triage of CI failures is simply not viable.

Flaky tests are a recurring thread across sources. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes failures as bugs, flaky tests, or UI changes. [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues flakiness often comes from tests coupled to CSS classes and DOM structure rather than semantic roles and accessible names. [Playwright on GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) addresses the runtime side: caching browser binaries and tuning parallelism can cut test runs from over three minutes to under five on a single runner.

Pipeline architecture choices have real correctness consequences. [Depot's writeup on Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows one approach to stateful CI orchestration without long-lived processes. The merge queue problem is more acute: [Trunk's analysis](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) documents a GitHub bug where temp branches built off the wrong base commit silently deleted thousands of lines from main, an incident Trunk avoided by never pushing temp branches to the main branch at all.

CI is also a security surface. [The SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned packages that CI pipelines would install, harvesting cloud secrets and exfiltrating them via GitHub. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) takes a different angle, blocking non-compliant code at the Git layer before it merges by querying a live knowledge base of security policies.

Policy enforcement in CI goes beyond security. [AST-based linters and LLM-assisted checks](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) can ban manual DB commits and enforce strict layer ownership — rules too subtle for standard static analysis but expressible as AST patterns or prompted checks. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) extends review to AI-generated diffs, reading the agent's conversation history alongside the code to catch silently skipped tests or swapped-in fake data.

The platform running CI matters too. [David Bushell's critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) documents reliability and quality decline, while [Mat Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) calls for pre-commit remote CI, stacked PRs as first-class citizens, and signed offline-usable Actions — features the current GitHub CI model does not support cleanly. Where to run tests is its own question: [Currents on staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames it as a decision with real operational costs on both sides.

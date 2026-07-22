---
title: Continuous integration
summary: >-
  CI pipelines now span test reliability, merge correctness, supply-chain
  security, and AI-assisted triage — a growing surface area that demands both
  architectural care and tooling choices that compose well under scale.
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
compiled_at: '2026-07-22T05:51:44.288Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1046
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
  cost_usd: 0.028359
---
Continuous integration is the practice of merging code changes frequently and verifying each merge automatically. The interesting design space lies not in the definition but in everything that can go wrong at scale, and how teams patch those gaps.

At PostHog's scale, 575K weekly jobs and 33 million test executions, the bottleneck shifts from running CI to understanding it. [Mendral's agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests billions of log lines, traces flaky tests to root causes, and opens fix PRs automatically — which suggests that CI triage is itself becoming an agentic workflow. Test tooling like [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a similar angle from the reporting side, auto-categorizing failures as bugs, flaky tests, or UI changes to avoid engineers re-investigating the same class of noise repeatedly.

Test stability compounds the problem. [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that Playwright suites break during UI refactors not because of poor selector choices alone, but because tests couple to implementation details rather than semantic roles and accessible names. Their [staging-versus-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) further splits the problem: not every test belongs in the same environment, and misconfigured environments inflate flakiness artificially. Concretely, [caching Playwright browser binaries and scoping worker parallelism by CI event](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) can cut a three-minute run to under five minutes without any architecture changes.

Merge correctness is a separate failure mode. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building temp branches off the wrong base commit. Trunk's architectural decision to never push temp branches to main avoided the incident entirely, which illustrates how CI infrastructure choices encode risk assumptions that aren't visible until something goes wrong.

Security is another underweighted surface. [Poisoned SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) harvested cloud secrets and browser passwords, using CI-adjacent tooling as persistence vectors. Enforcement at the Git layer, as [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) demonstrates by blocking non-compliant code before it merges, is one way to close the gap between policy and practice. AST-based CI checks, like [banning manual DB commits via flake8 plugins and LLM-assisted linting](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters), apply the same principle to architectural constraints.

At the infrastructure level, [Depot's use of AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows one approach to stateful CI orchestration without a long-lived process: a two-layer Lambda hierarchy with callback-driven job coordination. Platform reliability matters too. [David Bushell's critique of GitHub's decline](/reading/2026-05/2026-05-10t205349-github-is-sinking) and [Mat Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github), which includes pre-commit remote CI and signed offline-usable Actions, both point to CI's dependency on platform trustworthiness as a risk that teams rarely budget for explicitly.

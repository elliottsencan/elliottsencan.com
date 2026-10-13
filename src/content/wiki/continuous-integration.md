---
title: Continuous integration
summary: >-
  CI pipelines that verify code on every commit span a wide surface area: test
  reliability, queue correctness, orchestration architecture, supply-chain
  security, and the tooling that keeps all of it honest at scale.
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
compiled_at: '2026-10-13T00:13:16.171Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1038
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
  cost_usd: 0.028239
---
Continuous integration means every pushed commit triggers an automated build and test pass before code reaches a shared branch. In practice that simple contract hides a stack of hard problems.

Test reliability is the most visible one. Flaky tests corrupt CI signal: a suite that fails randomly teaches engineers to ignore failures. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) attacks this by auto-categorizing Playwright failures as bugs, flakiness, or UI changes, and [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues the root cause is usually tests coupled to CSS classes and DOM position rather than stable accessible roles. Fixing selectors alone is not enough if the underlying assertion strategy couples to implementation detail.

At scale the failure volume becomes its own problem. [Mendral](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes an AI agent that ingests billions of log lines across 575K weekly CI jobs at PostHog, traces flaky tests to root causes, and opens fix PRs automatically. That kind of triage is unavoidable when 33 million test executions run per week.

Queue and orchestration correctness matters just as much as the tests themselves. A GitHub merge queue bug silently deleted thousands of lines from main by building temp branches off the wrong base commit; [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) explains their architecture avoids the failure mode entirely by never pushing temp branches to main. [Depot](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) takes orchestration further, running a stateful checkpointed scheduler on AWS Lambda durable functions so no long-lived process is needed to coordinate jobs.

Security is a CI concern that often gets separated from the test conversation, but the [SAP npm supply-chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) is a reminder that compromised dependencies run inside CI pipelines, where cloud secrets and credentials are abundant. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) addresses policy enforcement by blocking non-compliant code at the Git layer before merge, keeping compliance decisions out of post-merge CI where fixing them is more expensive.

AI-generated code introduces another verification gap. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) surfaces mistakes that diffs alone miss, such as silently skipped tests or swapped-in fake data, by reading the agent's conversation history alongside the diff. Linters and AST-based checks fill adjacent gaps: [ban commits and DB model leakage](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) with flake8 plugins and LLM-assisted CI checks before they reach review.

Platform choice underpins all of it. [GitHub's reliability decline](/reading/2026-05/2026-05-10t205349-github-is-sinking) and the [wishlist for a reimagined forge](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) point toward the same gap: pre-commit remote CI, signed offline-usable Actions, and stacked PRs as first-class citizens are features existing platforms handle poorly. Execution speed is also a platform-level variable: [caching Playwright binaries and tuning worker parallelism](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) cut GitHub Actions runs from over three minutes to under five on a single runner.

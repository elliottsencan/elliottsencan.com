---
title: Continuous integration
summary: >-
  CI pipelines are under pressure from scale, flakiness, security threats, and
  platform reliability, with AI tooling, architectural rigor, and better test
  design emerging as the primary responses.
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
compiled_at: '2026-08-30T05:50:01.090Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1266
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
  cost_usd: 0.031659
---
At its core, continuous integration is the practice of merging code frequently and verifying each merge automatically. The sources here collectively show that the interesting problems in CI today are not conceptual but operational: scale, noise, trust, and infrastructure resilience.

At PostHog's scale, 575K weekly CI jobs and 33M test executions, the signal-to-noise problem becomes severe enough that a human triage process cannot keep up [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). Mendral's AI agent addresses this by ingesting billions of log lines, tracing flaky tests to their root causes, and opening fix PRs automatically. Flakiness is treated not as an inevitable artifact but as a traceable fault. TestDino approaches the same problem from the reporting layer, auto-categorizing Playwright failures as bugs, flaky tests, or UI changes, and claiming to save engineers 6 to 8 hours weekly [TestDino](/reading/2026-04/2026-04-30t231348-testdino).

Test stability and environment strategy matter as much as failure classification. Playwright tests break during UI refactors when they couple to CSS classes or DOM structure rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Separately, the question of whether to run tests against staging or production is a decision framework question with real operational costs on either side [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). CI performance on GitHub Actions can be improved substantially through browser binary caching, worker parallelism tuning, and scoping browser targets by event type [Playwright on GitHub Actions: The setup that actually runs fast](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs).

Infrastructure design choices have correctness consequences. A GitHub merge queue bug caused thousands of lines to be silently deleted from main branches by building temporary branches off the wrong base commit [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). The architectural decision to avoid pushing temp branches to main at all was what protected Trunk's users. Depot CI's orchestrator takes a different angle on infrastructure resilience, using AWS Lambda durable functions to run a stateful, checkpointed scheduler without a long-lived process [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Security is an underweighted CI concern. Compromised npm packages in the SAP ecosystem carried credential-stealing payloads that harvested cloud secrets and exfiltrated them via GitHub, using Claude Code and VS Code configs as persistence vectors [SAP-Related npm Packages Compromised](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). MarkdownLM's Lun tool addresses a related enforcement problem by blocking non-compliant code at the Git layer before it can merge, with architectural rules and security policies stored in a queryable knowledge base [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm). AST-based linting and LLM-assisted CI checks extend this further, enabling enforcement of DB layer ownership rules that would be impractical to catch in code review alone [Ban commits/transactions using AST analysis and linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters).

Platform dependence is a latent risk. GitHub's reliability has declined noticeably, with the merge queue incident as one concrete example, and the case for alternatives like Codeberg, Forgejo, or self-hosted forges grows as trust erodes [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking). A developer wishlist for a reimagined forge names pre-commit remote CI, stacked PRs as first-class citizens, and signed offline-usable Actions as missing primitives [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github). AI agents introduce their own trust problem: tools like Vet read an agent's conversation history alongside the diff to catch mistakes, like silently skipped tests or swapped-in fake data, that standard code review misses [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

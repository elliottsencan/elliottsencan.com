---
title: Continuous integration
summary: >-
  Continuous integration encompasses the pipelines, tooling, and practices that
  validate code before it merges — covering test reliability, infrastructure
  architecture, security exposure, and the growing role of AI in triage and
  enforcement.
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
compiled_at: '2026-07-16T11:33:24.118Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1049
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
  cost_usd: 0.028404
---
CI is no longer just a green check on a pull request. At scale, it becomes infrastructure in its own right, with architectural decisions that carry real consequences. Depot's orchestrator, for instance, uses AWS Lambda durable functions to run a stateful, checkpointed scheduler without keeping a long-lived process alive [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). That design choice — avoiding persistent processes — mirrors the kind of reasoning Trunk applied to merge queues: by never pushing temp branches to main, they sidestepped a GitHub bug that silently deleted thousands of lines from affected repositories [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

Test reliability is a recurring pressure point. At PostHog's scale — 575K weekly jobs and 33M test executions — Mendral's AI agent ingests billions of log lines to trace flaky tests to root causes and open fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). TestDino takes a similar analytics-first stance, auto-categorizing Playwright failures as bugs, flaky tests, or UI changes [TestDino](/reading/2026-04/2026-04-30t231348-testdino). On the test-authoring side, Playwright suites that couple to CSS classes or DOM structure break during refactors; tests anchored to semantic roles and accessible names stay stable across them [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Choosing where tests run — staging vs. production — adds another layer of operational cost that teams often underestimate [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production).

CI is also an enforcement surface. MarkdownLM's Lun tool blocks non-compliant code at the Git layer before it merges [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm), and AST-based linters can enforce DB layer ownership by banning manual commits via flake8 plugins and LLM-assisted CI checks [Ban commits/transactions using AST analysis and linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters). Imbue's Vet tool extends this to AI-generated code, reading an agent's conversation history alongside the diff to catch silently skipped tests or swapped-in fake data [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

The platform CI runs on matters too. GitHub's declining reliability has pushed some developers toward alternatives like Codeberg or self-hosted forges [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), and a developer wishlist for a reimagined forge puts pre-commit remote CI and signed, offline-usable Actions near the top [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github). Supply chain risk is the sharpest platform-level concern: the TeamPCP attack poisoned SAP-ecosystem npm packages with a credential-stealing payload that used GitHub itself as an exfiltration channel [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing), making dependency hygiene a CI concern as much as a security one.

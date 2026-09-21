---
title: Continuous integration
summary: >-
  Continuous integration is the practice of merging, validating, and testing
  code changes automatically and frequently; recent sources show it evolving
  across orchestration architecture, AI-assisted triage, test stability, supply
  chain risk, and forge reliability.
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
compiled_at: '2026-09-21T21:47:38.747Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1198
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
  cost_usd: 0.030639
---
Continuous integration sits at the center of a cluster of problems: how do you merge code quickly without breaking things, keep test results meaningful, and trust the infrastructure running it all?

Orchestration is one axis of active experimentation. Depot rebuilt its CI scheduler on AWS Lambda durable functions, using a two-layer Run/Workflow hierarchy and callback-driven job coordination to run stateful workflows without keeping a long-lived process alive [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). Merge queue correctness is a related concern: a GitHub bug silently deleted thousands of lines from main by building temp branches off the wrong base commit, an incident Trunk avoided because their architecture never pushes temp branches directly to main [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

At scale, CI produces so much signal that triage becomes its own problem. PostHog runs 575K CI jobs and 33M test executions weekly; Mendral's AI agent ingests the resulting log volume, traces flaky tests to root causes, and opens fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). TestDino takes a narrower cut, auto-categorizing Playwright failures as bugs, flaky tests, or UI changes [TestDino](/reading/2026-04/2026-04-30t231348-testdino). Flakiness is a recurring thread: Playwright tests break during refactors when they couple to CSS classes and DOM structure rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors), and tuning runner parallelism and browser binary caching can cut GitHub Actions runs from over three minutes to under five on a single runner [Playwright on GitHub Actions: The setup that actually runs fast](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs).

CI is also an enforcement layer, not just a test runner. MarkdownLM's Lun tool blocks non-compliant code at the Git layer before merge by querying a living policy knowledge base [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm). AST-based linters and flake8 plugins can enforce DB layer ownership, banning manual commits and model leakage at CI time [Ban commits/transactions using AST analysis and linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters). AI agent output itself needs checking: Vet reads an agent's conversation history alongside the diff to catch silently skipped tests or swapped-in fake data before merge [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

Security is a live concern at the pipeline boundary. A supply chain attack poisoned four SAP-ecosystem npm packages with a self-propagating payload that harvested cloud secrets and browser passwords, using VS Code and AI coding tool configs as persistence vectors, meaning CI environments that install these packages were exposed [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing).

Underlying all of this is forge reliability. GitHub's stability has declined noticeably, and some developers are evaluating Codeberg, Forgejo, or self-hosted alternatives [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking); one developer wishlist imagines pre-commit remote CI and signed, offline-usable Actions as baseline requirements for a trustworthy forge [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github). Where tests run matters too: staging catches integration issues cheaply, while production testing surfaces real-environment failures, and splitting Playwright suites across both requires deliberate configuration and clear ownership [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production).

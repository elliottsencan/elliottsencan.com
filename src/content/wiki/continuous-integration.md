---
title: Continuous integration
summary: >-
  CI pipelines have grown complex enough to require dedicated orchestration, AI
  triage, and policy enforcement layers — while still demanding that the test
  suites and merge mechanics underneath them actually work.
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
compiled_at: '2026-07-19T14:34:24.718Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1171
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
  cost_usd: 0.030234
---
Continuous integration is the practice of merging code frequently into a shared branch, validating each change with automated builds and tests before it lands. At small scale that means a basic test runner triggered on push. At larger scale the machinery becomes its own engineering problem.

PostHog's CI footprint illustrates that growth: 575,000 weekly jobs and 33 million test executions, described in [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), where Mendral's AI agent ingests billions of log lines to triage failures, trace flaky tests to root causes, and open fix PRs automatically. Flakiness is a persistent tax on CI confidence, and tools like [TestDino](/reading/2026-04/2026-04-30t231348-testdino) aim to absorb that cost by auto-categorizing Playwright failures as bugs, flaky tests, or UI changes rather than leaving engineers to sort failures manually.

Test design is as important as test tooling. [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that suites break during refactors because tests couple to implementation details like CSS classes and DOM structure rather than semantic roles and accessible names that remain stable. A related question is where tests run at all: [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames the staging-versus-production split as a deliberate decision with real operational costs on both sides.

The infrastructure running those tests has gotten more sophisticated too. [Building CI with Lambda Durable Functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows Depot CI replacing a long-lived orchestration process with a two-layer AWS Lambda hierarchy that checkpoints state between job steps, a pattern that trades operational simplicity for fault tolerance. Optimizing within existing infrastructure is also possible: [Playwright on GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) cuts multi-minute runs under five minutes by caching browser binaries and scoping browser targets by CI event.

Merge mechanics introduce their own failure modes. [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) documents a GitHub merge queue bug that silently deleted thousands of lines by building from the wrong base commit, an incident Trunk avoided by never pushing temp branches to main. That kind of platform reliability concern underlies [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), which argues GitHub's quality has declined enough to consider migration, and [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github), which proposes pre-commit remote CI and signed, offline-usable Actions as baseline features a forge should offer.

Policy enforcement is moving earlier in the pipeline. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer before merge by giving AI agents a queryable knowledge base of architectural rules and security policies. [Banning manual DB commits via AST analysis](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) applies the same principle to database layer discipline, using flake8 plugins and LLM-assisted CI checks to enforce ownership boundaries statically. Security is a direct concern too: [the SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) shows how compromised packages can reach secrets through CI environments, since cloud credentials and browser passwords exposed during builds become exfiltration targets.

AI-generated code adds a verification layer. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch mistakes that standard review misses, like silently skipped tests or swapped-in fake data, treating agent output as something that requires its own class of CI-adjacent scrutiny.

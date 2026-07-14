---
title: Continuous integration
summary: >-
  CI pipelines today span merge queues, test analytics, AI-assisted triage, and
  supply-chain security, each layer adding new failure modes that teams must
  design around deliberately.
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
compiled_at: '2026-07-14T06:36:33.394Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4052
    output_tokens: 1081
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
  cost_usd: 0.028371
---
Continuous integration has moved well past "run tests on push." The sources here cover the full stack: infrastructure choices, test design, failure analysis, security exposure, and tooling quality at the platform level.

At scale, the test volume alone becomes its own problem. PostHog runs 575K weekly CI jobs and 33M test executions; Mendral's AI triage agent ingests those logs, traces flaky failures to root causes, and opens fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). TestDino addresses the same problem from a reporting angle: auto-categorizing Playwright failures as bugs, flaky tests, or UI changes and claiming 6-8 hours saved weekly [TestDino](/reading/2026-04/2026-04-30t231348-testdino).

Test durability is a separate concern from failure volume. Playwright suites break during UI refactors when tests couple to CSS classes or DOM structure rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Where to run those tests also matters: staging catches regressions cheaply, but production testing is necessary for flows that depend on live state [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Caching browser binaries and scoping which browsers run per CI event can cut GitHub Actions Playwright runs from over three minutes to under five on a single runner [Playwright on GitHub Actions: The setup that actually runs fast](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs).

The orchestration layer carries real risk. A GitHub merge queue bug built temp branches off the wrong base commit, silently deleting thousands of lines from main; Trunk's architectural decision to never push temp branches to main avoided the incident entirely [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). Depot's approach to orchestration uses AWS Lambda durable functions, a two-layer Run/Workflow Lambda hierarchy that runs stateful, checkpointed scheduling without a long-lived process [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions).

Security intersects CI at the dependency and tooling layers. Compromised SAP-ecosystem npm packages carried a credential-stealing, self-propagating payload that exfiltrated cloud secrets and abused VS Code configs as persistence vectors [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). MarkdownLM addresses a related problem upstream, blocking non-compliant code at the Git layer before it merges [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm). Vet approaches it from the AI-agent side, reading an agent's conversation history alongside the diff to catch silently skipped tests or swapped-in fake data [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

Platform reliability is a quiet dependency underneath all of this. GitHub's declining quality under Microsoft is a recurring complaint [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), and one developer's wishlist for a reimagined forge puts pre-commit remote CI and signed, offline-usable Actions near the top [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github), signaling that the platform layer is now a design constraint, not just infrastructure.

---
title: Continuous integration
summary: >-
  Continuous integration connects code merging, test execution, and policy
  enforcement into a single automated feedback loop — a system whose failure
  modes, scaling costs, and architectural choices shape how quickly teams can
  ship with confidence.
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
compiled_at: '2026-07-24T04:57:29.110Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1139
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
  cost_usd: 0.029754
---
At scale, CI stops being a simple pass/fail gate and becomes infrastructure unto itself. PostHog's pipeline runs 575,000 jobs weekly and 33 million test executions, a volume that makes manual triage economically impossible — Mendral's AI agent handles it by ingesting billions of log lines, tracing flaky tests to root causes, and opening fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team).

The orchestration layer matters as much as the tests themselves. Depot CI replaces long-lived orchestrator processes with AWS Lambda durable functions: a two-layer Run/Workflow hierarchy that checkpoints state and resumes on callback, keeping coordination stateful without a persistent server [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). On the GitHub Actions side, caching Playwright browser binaries and tuning worker parallelism can cut runs from over three minutes to under five on a single runner [Playwright on GitHub Actions: The setup that actually runs fast](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs).

Merge queues add a subtler class of failure. A GitHub bug built temporary branches off the wrong base commit and silently deleted thousands of lines from main; Trunk's architecture avoided the incident by never pushing temp branches to main at all [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). That incident feeds a broader critique of GitHub's declining reliability, with some developers treating migration to Codeberg or self-hosted forges as a practical near-term decision [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking).

Test quality is a recurring pressure point. Playwright suites break during UI refactors when tests couple to CSS classes or DOM position rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Flaky test analytics tools like TestDino claim to auto-categorize failures and recover 6-8 engineer hours weekly [TestDino](/reading/2026-04/2026-04-30t231348-testdino), while the decision of which tests run in staging versus production carries real operational cost [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production).

CI is also a policy enforcement surface. MarkdownLM's Lun tool blocks non-compliant code at the Git layer by querying a living knowledge base of architectural and security rules before merge [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm). AST-based linters and LLM-assisted checks can similarly enforce DB layer ownership by banning raw commits outside the sanctioned abstraction [Ban commits/transactions using AST analysis and linters](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters). The security angle is not theoretical: poisoned npm packages in the SAP ecosystem used CI environment access to harvest cloud credentials and browser passwords, exfiltrating via GitHub [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). AI agent output introduces its own review gap; Vet reads an agent's conversation history alongside the diff to catch silently skipped tests or swapped-in fake data before they reach main [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes). A developer wishlist for a reimagined forge points toward pre-commit remote CI and signed, offline-usable Actions as features current platforms still lack [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github).

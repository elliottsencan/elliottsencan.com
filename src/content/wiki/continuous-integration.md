---
title: Continuous integration
summary: >-
  CI pipelines today face compounding pressures: flaky tests, supply chain
  attacks through dependencies, orchestration reliability, and merge queue
  correctness, with AI tooling increasingly embedded at each layer.
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
compiled_at: '2026-08-13T21:10:03.389Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1153
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
  cost_usd: 0.029964
---
Continuous integration is the practice of merging code changes frequently and verifying each merge automatically through a shared pipeline of builds and tests. The sources here cut across nearly every layer of that pipeline, from infrastructure choices through test design to security exposure.

At scale, CI is less a single pipeline than a distributed systems problem. Depot's orchestrator [illustrates this concretely](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions): it replaces a long-lived scheduler process with AWS Lambda durable functions, using a two-layer Run/Workflow hierarchy and callback-driven coordination so state survives across cold starts without keeping a persistent server alive. Merge queue correctness is a related infrastructure concern. A GitHub merge queue bug described by Trunk [silently deleted thousands of lines](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) from main branches by building temp branches off the wrong base commit. Trunk avoided the incident because their architecture never pushes temp branches to main.

Test reliability sits inside every CI pipeline. Playwright suites in particular [break during UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) not primarily because of bad selectors but because tests couple to implementation details like CSS classes and DOM structure rather than semantic roles and accessible names. Running those tests fast matters too: caching browser binaries and scoping browser targets by CI event [can cut GitHub Actions runs from over three minutes to under five](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) on a single runner. Where to run tests is itself a decision: the Currents team outlines [a staging-versus-production split](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) for Playwright, with some flows belonging only in production where live data and integrations make staging verification insufficient.

AI is now embedded at multiple CI layers. Mendral's agent [ingests billions of log lines across 575K weekly jobs at PostHog](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), traces flaky tests to root causes, and opens fix PRs automatically. TestDino [auto-categorizes failures as bugs, flaky tests, or UI changes](/reading/2026-04/2026-04-30t231348-testdino) inside Playwright reporting. MarkdownLM's Lun tool [blocks non-compliant code at the Git layer](/reading/2026-04/2026-04-30t231319-markdownlm) by querying a living knowledge base of architectural rules before a merge completes. For AI-generated code specifically, Vet [reads an agent's conversation history alongside the diff](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) to surface mistakes that standard review misses, like silently skipped tests or swapped-in fake data. AST-based linting can enforce architectural rules automatically as well: banning manual database commits and model leakage [through flake8 plugins and LLM-assisted CI checks](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) keeps DB layer ownership enforced without relying on code review attention.

Security pressure hits CI directly through the dependency graph. The TeamPCP attack [poisoned four SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) with a credential-stealing payload that harvests cloud secrets during CI runs and exfiltrates them via GitHub. CI environments hold privileged credentials by design, making them high-value targets for supply chain attacks.

The platform itself is also in question. GitHub reliability has declined enough that David Bushell [argues developers should migrate to Codeberg, Forgejo, or self-hosted forges](/reading/2026-05/2026-05-10t205349-github-is-sinking), while Mat Duggan [sketches what a better forge would look like](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) from first principles: pre-commit remote CI, stacked PRs as a first-class feature, and signed Actions that work offline.

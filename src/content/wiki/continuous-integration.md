---
title: Continuous integration
summary: >-
  Continuous integration spans test reliability, pipeline architecture, merge
  safety, and supply chain security — a surface area that grows as teams scale
  and AI agents enter the build loop.
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
compiled_at: '2026-09-07T21:12:19.828Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1069
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
  cost_usd: 0.028704
---
At its core, continuous integration is the practice of merging code frequently and verifying each change automatically. What the sources here collectively show is that the interesting problems are rarely about the concept itself but about the failure modes that appear when CI operates at scale or under adversarial conditions.

The infrastructure layer has real engineering depth. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions to run a stateful, checkpointed workflow scheduler without a long-lived process, relying on a two-layer Run/Workflow Lambda hierarchy and callback-driven job coordination. Separately, [Trunk's analysis of a GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how building temp branches off the wrong base commit silently deleted thousands of lines from main, and how their architectural choice to never push temp branches to main avoided the incident entirely.

Test reliability is a recurring pressure point. [PostHog's CI setup](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575K weekly jobs and 33M test executions, with an AI agent ingesting billions of log lines to triage failures, trace flaky tests to root causes, and open fix PRs. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a similar analytics-first approach for Playwright, auto-categorizing failures as bugs, flaky tests, or UI changes. [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that flakiness in UI tests often comes from coupling to implementation details like CSS classes and DOM structure rather than semantic roles and accessible names. Their follow-up [on staging vs. production testing](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames environment choice as a genuine cost-benefit decision rather than a default.

The gate layer, where CI enforces standards before merge, is expanding. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) blocks non-compliant code at the Git layer by querying a living knowledge base of architectural rules and security policies. A post on [AST-based linting](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) advocates banning manual DB commits and model leakage through flake8 plugins and LLM-assisted CI checks. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) adds a layer specifically for AI-generated code, reading an agent's conversation history alongside the diff to catch silently skipped tests or swapped-in fake data.

Security is an underappreciated surface. The [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned packages that CI pipelines pull as dependencies, harvesting cloud secrets and browser passwords. CI systems that fetch packages without verification are a direct attack vector, not just an abstract risk.

Platform reliability matters too. [David Bushell's critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) and [Mat Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github), which includes pre-commit remote CI and signed offline-usable Actions, both point to CI infrastructure being hostage to platform decisions teams don't control. [Optimizing Playwright on GitHub Actions](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) is a practical response to that dependency: cache browser binaries, tune worker parallelism, scope browser targets by CI event.

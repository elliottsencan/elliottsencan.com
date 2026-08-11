---
title: Continuous integration
summary: >-
  Continuous integration spans pipeline architecture, test reliability, security
  at the merge boundary, and the emerging layer of AI agents that triage,
  enforce, and review what lands in main.
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
compiled_at: '2026-08-11T07:52:54.345Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 997
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
  cost_usd: 0.027624
---
At its core, continuous integration is the practice of merging code frequently and validating each change automatically before it reaches a shared branch. In practice, the concerns that surface around CI are as much about reliability, security, and scale as about the basic merge-and-test loop.

Scale changes the math quickly. At PostHog's volume, 575K weekly jobs and 33M test executions, manual triage of failures is not viable, and [Mendral's AI agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) handles that layer instead, ingesting billions of log lines, tracing flaky tests to root causes, and opening fix PRs automatically.

The merge boundary itself carries architectural weight. A GitHub merge queue bug silently deleted thousands of lines from production branches by building temporary branches off the wrong base commit; [Trunk's post-mortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) argues their decision to never push temp branches to main is what avoided the same incident. That kind of structural choice, not just tooling configuration, determines what failures are even possible.

Test quality is a recurring theme. [Currents on Playwright](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during refactors not from poor selector hygiene alone but from coupling to implementation details rather than semantic roles and accessible names. Separately, [Currents on staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames environment placement as a deliberate architectural decision about which flows belong where. On the performance side, [Norlin's GitHub Actions guide](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) shows that caching browser binaries and scoping targets by CI event can cut run times significantly without infrastructure changes.

Security enters CI through the dependency and tooling layer. The [TeamPCP supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned SAP-ecosystem npm packages with credential-stealing payloads that exfiltrated cloud secrets and browser passwords, using CI-adjacent tools like VS Code configs as persistence vectors. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) takes a different angle, blocking non-compliant code at the Git layer before merge by querying a centralized policy knowledge base.

AI-generated code adds a review problem that standard diff review misses. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch things like silently skipped tests or swapped-in fake data. Enforcement can also live earlier: [AST-based linting](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) is proposed as a way to ban manual DB commits and enforce layer ownership in CI checks.

Underpinning all of this is platform reliability. [Bushell's critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) and [Duggan's forge wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github), which includes pre-commit remote CI and signed offline-usable Actions, reflect a recognition that CI quality depends on the forge it runs on, and that dependency is itself a risk.

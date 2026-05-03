---
title: Continuous integration
summary: >-
  CI pipelines at scale surface three compounding problems: test noise from
  flaky failures, slow feedback loops, and supply-chain exposure in the
  dependency graph that feeds every build.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
compiled_at: '2026-05-03T19:08:41.825Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 1468
    output_tokens: 499
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
  cost_usd: 0.011889
---
At a 100-person engineering team running a monorepo, the sheer volume of CI output becomes the primary problem. PostHog's pipeline, analyzed by Mendral's AI agent, processed 1.18 billion log lines and 33 million weekly test executions [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). The finding was that log ingestion speed and alert routing mattered more than the sophistication of any diagnostic model. Fast, correctly-routed failure signals let engineers act; slow or misdirected ones produce alert fatigue and ignored pipelines.

Flaky tests are the most common source of noise. They consume review time without representing real regressions. Tools like [TestDino](/reading/2026-04/2026-04-30t231348-testdino) address this by auto-categorizing failures as bugs, flaky tests, or UI changes, and centralizing run history across Playwright suites. The claimed savings of 6 to 8 engineer hours weekly reflect how much time currently goes to manual triage that categorization can absorb.

A less discussed CI risk sits in the dependency graph itself. Every build that resolves npm packages is a potential ingestion point for malicious code. The TeamPCP attack poisoned four SAP-ecosystem npm packages with a payload that harvested cloud credentials and browser passwords, exfiltrating them via GitHub [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). CI environments are high-value targets because they hold deployment credentials, cloud tokens, and often run with elevated permissions. Lockfiles, dependency pinning, and integrity verification are pipeline hygiene questions, not just developer-environment ones.

---
title: Continuous integration
summary: >-
  Continuous integration at scale surfaces problems across test reliability,
  infrastructure architecture, merge queue correctness, supply chain security,
  and environment strategy, each demanding different mitigations.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
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
aliases:
  - software-quality
compiled_at: '2026-06-18T21:42:51.233Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3501
    output_tokens: 872
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
  cost_usd: 0.023583
---
CI pipelines are no longer just about running tests on every commit. At sufficient scale, the problems compound: flaky tests drown signal in noise, merge queue bugs corrupt history silently, compromised dependencies inject malware before code ships, and test environments multiply configuration drift.

Flaky tests are probably the most chronic friction point. Mendral's AI agent, operating against PostHog's monorepo, processed 1.18 billion log lines weekly and found that auto-diagnosing flakiness and routing alerts mattered more than the diagnostic model itself [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). TestDino approaches the same problem from the reporting layer, auto-categorizing Playwright failures as bugs, flaky tests, or UI changes and claiming 6-8 hours saved weekly [TestDino](/reading/2026-04/2026-04-30t231348-testdino). Playwright suites themselves become fragile when selectors couple to CSS classes and DOM structure rather than semantic roles and explicit test attributes; page-object patterns and a tiered selector hierarchy reduce churn during UI refactors [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors).

Merge queue correctness is a separate class of problem. A GitHub merge queue bug built temp branches from stale divergence points rather than HEAD, silently rewriting main. Trunk's architecture avoided the failure entirely because it never pushes temp branches to main [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). That incident is a concrete argument for understanding the architectural assumptions behind whatever merge infrastructure you adopt.

CI infrastructure itself can be a security vector. The TeamPCP actor poisoned four SAP-ecosystem npm packages with a self-propagating, credential-stealing payload that exfiltrated cloud secrets via GitHub and used editor configs as persistence vectors [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). CI environments have broad secret access, which makes dependency hygiene higher stakes there than elsewhere.

On the infrastructure side, Depot's orchestrator runs CI workflows on AWS Lambda durable functions, checkpointing state without keeping a long-lived process alive [Building CI with Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions). That trades some operational simplicity for resilience and cost efficiency at scale.

Environment strategy adds another decision layer. Splitting Playwright runs between staging and production depends on risk profile, operational overhead, and what each environment can realistically validate [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). GitHub's reliability issues have pushed some teams to evaluate alternatives like Codeberg or self-hosted forges [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), which changes the calculus for where CI lives.

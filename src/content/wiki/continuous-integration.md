---
title: Continuous integration
summary: >-
  Continuous integration spans test reliability, merge safety, pipeline
  architecture, and supply-chain security — a discipline where tooling choices
  at every layer determine whether automated feedback stays trustworthy.
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
compiled_at: '2026-06-21T18:38:09.637Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3578
    output_tokens: 970
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
  cost_usd: 0.025284
---
Continuous integration is the practice of merging code frequently against an automated test-and-build pipeline, with the assumption that fast, reliable feedback prevents integration drift. The sources here stress four distinct pressure points: test reliability, merge correctness, pipeline infrastructure, and security at the dependency layer.

Test reliability is the most recurring theme. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes Playwright failures into bugs, flaky tests, and UI changes, claiming that manual triage of this volume costs engineers six to eight hours weekly. The flakiness problem is partly a test-design problem: [Currents on UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that suites break during refactors not because of selector choices alone, but because tests couple to implementation details like CSS classes and DOM structure rather than to semantic roles and accessible names. Where you run tests matters too; [Currents on staging vs production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) offers a decision framework for splitting test runs across environments, covering which flows belong where and what the operational costs of production testing look like.

At PostHog's scale, triage itself becomes a CI workload. [Mendral's piece on CI at 100 people](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes 575K weekly jobs and 33M test executions, with an AI agent ingesting billions of log lines to trace flaky tests to root causes and open fix PRs automatically. That is not a luxury; at that volume, human triage cannot keep up.

Merge correctness is a separate failure mode. [Trunk's postmortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) describes a GitHub merge queue bug that silently deleted thousands of lines from main branches by building temp branches off the wrong base commit. Trunk avoided the incident by never pushing temp branches to main, an architectural choice that contained the blast radius. [GitHub's reliability decline](/reading/2026-05/2026-05-10t205349-github-is-sinking) is a related concern; David Bushell argues that the platform has degraded enough under Microsoft that migrating to Codeberg, Forgejo, or self-hosted Git forges warrants serious consideration.

Pipeline infrastructure has its own tradeoffs. [Depot's post on Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) shows how to run a stateful, checkpointed CI workflow scheduler without keeping a long-lived process alive, using a two-layer Run/Workflow Lambda hierarchy and callback-driven job coordination. It is a concrete example of how CI orchestrators can trade operational complexity for cost and elasticity.

Finally, the pipeline is only as trustworthy as its dependencies. [The SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) shows how poisoned packages can harvest cloud secrets and browser passwords, exfiltrate them via GitHub, and abuse editor configs as persistence vectors. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) addresses a related surface by blocking non-compliant code at the Git layer before it merges, enforcing architectural and security policies through a knowledge base that AI agents query at merge time. Neither approach eliminates supply-chain risk, but both sit at the boundary where CI can act as a control point rather than just a build runner.

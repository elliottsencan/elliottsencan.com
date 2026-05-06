---
title: Continuous integration
summary: >-
  CI at scale is less about the pipeline itself and more about what surrounds
  it: flaky-test management, merge-queue correctness, selector stability, and
  supply-chain integrity in the dependencies that pipelines install.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
aliases:
  - software-verification
compiled_at: '2026-05-06T04:25:22.632Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2986
    output_tokens: 702
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
  cost_usd: 0.019488
---
The mechanics of running builds and tests on every commit are well understood. What the sources here illuminate is the operational surface that grows once a CI system is under real load.

At scale, the dominant cost is noise. [Mendral's analysis of PostHog's monorepo](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) processed 1.18 billion log lines and 33 million weekly test executions, and the finding was that log ingestion speed and smart failure routing mattered more than the AI diagnosis layer on top. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) approaches the same problem from a product angle, auto-categorizing failures as bugs, flaky tests, or UI changes and claiming 6-8 hours of weekly savings per engineer. Both converge on the same premise: unclassified test failures are the bottleneck, not the raw execution.

Flaky tests and brittle selectors are related failure modes. [Currents.dev argues](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) that Playwright suites break during UI refactors because tests couple to CSS classes and DOM structure rather than semantic roles and explicit test attributes. A tiered selector hierarchy and page-object patterns reduce churn when the UI changes underneath. This is essentially the same problem Mendral's agent is diagnosing after the fact, surfaced earlier through test design.

Merge queues introduce a different category of correctness risk. [Trunk's post-mortem on a GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) describes how GitHub's implementation silently rewrote main by constructing temporary branches from stale divergence points rather than HEAD. Trunk's own architecture avoided the failure by never pushing temp branches directly to main. The episode is a reminder that the queue layer itself can be a source of silent corruption, not just the tests it runs.

Finally, CI pipelines are an attack surface. The [SAP npm supply chain compromise](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) involved poisoned packages that harvested cloud secrets and browser passwords, with exfiltration routed through GitHub. Any CI environment that installs dependencies during a build is exposed to this class of attack. Credential isolation and dependency pinning are not optional hardening; they are baseline hygiene given how reliably pipelines run with elevated access to production secrets.

---
title: Continuous integration
summary: >-
  Continuous integration connects test reliability, merge correctness, and
  supply-chain security into one surface; current tooling pushes toward
  AI-assisted triage, smarter queue architectures, and selector discipline to
  keep pipelines trustworthy at scale.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
compiled_at: '2026-05-06T04:03:52.310Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2986
    output_tokens: 739
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
  cost_usd: 0.020043
---
CI is the practice of merging code frequently and running automated tests on every change, but the real engineering challenge sits in what happens when those tests fail, misfire, or pass against the wrong commit.

At scale, the failure-classification problem dominates. Mendral's AI agent, running against PostHog's monorepo, processed 1.18 billion log lines and 33 million weekly test executions to auto-diagnose flaky tests, open fix PRs, and route failure alerts [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). The takeaway from that experiment was that log ingestion speed and routing precision mattered more than the diagnostic model itself. TestDino attacks the same problem from a reporting angle, auto-categorizing Playwright failures as bugs, flaky tests, or UI changes and claiming 6-8 hours of saved engineering time weekly [TestDino](/reading/2026-04/2026-04-30t231348-testdino).

Flaky tests are only one source of noise. Selector coupling is another. Playwright suites break during UI refactors when tests bind to CSS classes, DOM structure, or text content rather than semantic roles and explicit test attributes [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Better selector discipline and page-object patterns reduce churn that looks like CI instability but originates in test authoring.

Merge queues introduce a different failure mode: correctness at the commit level. A GitHub merge queue bug silently rewrote main branches by constructing temp branches from stale divergence points rather than HEAD [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). Trunk's architecture avoided the same failure by never pushing temp branches to main. The incident underscores that CI correctness depends on the queue implementation, not just on the tests themselves.

Security is a third dimension that CI pipelines expose directly. Four SAP-ecosystem npm packages were poisoned with a credential-stealing, self-propagating payload that harvested cloud secrets and browser passwords and exfiltrated them via GitHub [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). CI environments, which install dependencies automatically on every run, are a natural vector for such attacks. Supply-chain hygiene and dependency pinning are therefore a CI concern, not just a package-management one.

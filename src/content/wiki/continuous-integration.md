---
title: Continuous integration
summary: >-
  The practice of merging and validating code changes continuously, where the
  real challenges are flaky test management, merge queue correctness, and
  securing the dependency supply chain that CI pipelines consume.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
compiled_at: 2026-05-04T03:39:07.342Z
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2735
    output_tokens: 610
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
  cost_usd: 0.017355
---
Continuous integration is the practice of automatically building and testing code as changes are proposed or merged. The concept is straightforward; the operational reality at scale is not.

At a team of roughly 100 engineers, CI infrastructure can process staggering volumes. Mendral's AI agent running on PostHog's monorepo handled 1.18 billion log lines and 33 million weekly test executions [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). The lesson from that scale is that the bottleneck is rarely the diagnostic intelligence layered on top; log ingestion speed and alert routing matter more than the AI doing the diagnosing.

[Flaky tests are a chronic CI problem](/wiki/flaky-tests). The Mendral piece describes auto-diagnosing and opening fix PRs for flaky tests, while TestDino approaches the same problem from a reporting angle, claiming to save 6 to 8 hours weekly by auto-categorizing failures as bugs, flaky tests, or UI changes [TestDino](/reading/2026-04/2026-04-30t231348-testdino). Both treat flakiness as a classification and routing problem rather than purely a code quality problem.

Merge queues address a different failure mode: ensuring that what gets merged is actually what was tested. A GitHub merge queue bug silently rewrote main branches by building from stale divergence points instead of HEAD [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). The architectural implication is that never pushing temporary branches to main is a meaningful safety property, not just a style preference.

CI pipelines also expand the attack surface for supply chain compromises. The TeamPCP threat actor poisoned four SAP-ecosystem npm packages with a credential-stealing payload that exfiltrated cloud secrets via GitHub [SAP-Related npm Packages Compromised in Credential-Stealing Supply Chain Attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). CI environments routinely install npm packages and hold cloud credentials, making them a high-value target for exactly this kind of attack.

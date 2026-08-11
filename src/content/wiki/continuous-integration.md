---
title: Continuous integration
summary: >-
  Continuous integration spans test reliability, pipeline architecture, merge
  safety, and security exposure; sources collectively show that CI at scale
  demands tooling, architectural discipline, and explicit threat modeling to
  function as intended.
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
compiled_at: '2026-08-11T05:14:47.646Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4223
    output_tokens: 1026
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
  cost_usd: 0.028059
---
At scale, CI stops being a simple build-and-test step and becomes a distributed system with its own failure modes. Mendral's account of PostHog's pipeline [illustrates this directly](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team): 575K weekly jobs and 33M test executions generate enough log volume that human triage is impractical, and the team delegates root-cause analysis and fix PRs to an AI agent. That shift from reactive human review to automated remediation marks a real change in what CI infrastructure looks like in practice.

The reliability of CI pipelines depends partly on the correctness of merge tooling. A GitHub merge queue bug documented by Trunk [silently deleted thousands of lines from main branches](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) by building temp branches off the wrong base commit. Trunk avoided the incident by never pushing temp branches to main at all — an architectural decision that had nothing to do with test quality and everything to do with how the queue interacts with the Git graph.

Test suite design compounds or alleviates these pipeline pressures. Playwright tests that couple to CSS classes or DOM structure break on every UI refactor [even when the underlying behavior is unchanged](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Semantic selectors tied to accessible names stay stable across refactors. TestDino [auto-categorizes failures as bugs, flaky tests, or UI changes](/reading/2026-04/2026-04-30t231348-testdino) to reduce the classification overhead that slow teams down. Separately, tuning GitHub Actions runs by caching browser binaries and scoping browser targets to CI event type can cut run time from over three minutes to under five on a single runner.

CI pipelines are also an attack surface. The SAP-ecosystem npm supply chain incident [shows a self-propagating payload that harvested cloud secrets and exfiltrated them via GitHub](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing), exploiting the ambient trust that CI environments grant to installed packages. MarkdownLM's Lun tool takes a preventive stance, [blocking non-compliant code at the Git layer before it merges](/reading/2026-04/2026-04-30t231319-markdownlm) by querying a live knowledge base of security policies.

Beyond security, CI pipelines need stable host infrastructure. David Bushell's critique of GitHub's declining reliability [argues that deteriorating platform quality is a structural risk](/reading/2026-05/2026-05-10t205349-github-is-sinking) for teams whose pipelines run there, and Mat Duggan's forge wishlist [calls for pre-commit remote CI and signed, offline-usable Actions](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) as baseline features that current platforms handle poorly. Depot's orchestration approach avoids long-lived processes entirely by [using AWS Lambda durable functions with checkpointed state](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions), a design choice that sidesteps a whole class of host-process reliability failures.

Finally, as AI agents write more of the code that CI validates, the loop closes back on itself. Vet [reads an agent's conversation history alongside the diff](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) to catch mistakes that standard review misses, like silently skipped tests, filling a gap that emerges specifically when the author is not a human who remembers what they changed.

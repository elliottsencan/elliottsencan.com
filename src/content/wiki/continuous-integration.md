---
title: Continuous integration
summary: >-
  CI has grown from a simple merge-and-build loop into an infrastructure layer
  with its own reliability, security, and architectural concerns, as AI tooling,
  merge queue correctness, and supply chain threats reshape how teams think
  about the pipeline.
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
compiled_at: '2026-07-01T01:57:05.563Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3897
    output_tokens: 938
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
  cost_usd: 0.025761
---
At most teams, CI is invisible until it breaks. The sources here collectively surface how much engineering thinking now goes into making it reliable, fast, auditable, and safe.

Scale changes the nature of the problem. At PostHog, [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) ingests billions of log lines across 575K weekly jobs to classify failures, trace flaky tests to root causes, and open fix PRs automatically. That pattern, delegating CI noise reduction to an AI layer, only becomes necessary once the test volume outpaces human triage bandwidth. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) makes a similar bet at smaller scale, auto-categorizing Playwright failures as bugs, flaky tests, or UI changes.

Test durability is its own design concern. [Currents argues](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) that test suites break during UI refactors primarily because they couple to CSS classes and DOM structure rather than semantic roles and accessible names. Where tests run matters too: [their staging-vs-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) is essentially a risk allocation exercise about which failures are acceptable to discover in production.

Merge queue correctness is underappreciated. [Trunk documents a GitHub bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) where temp branches were cut from the wrong base commit, silently deleting thousands of lines from main. Their architectural choice to never push temp branches to main avoided the incident. [Mat Duggan's wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) extends this: pre-commit remote CI, stacked PRs as first-class citizens, and signed portable Actions address the same category of pipeline-integrity concerns.

CI infrastructure itself is now a meaningful engineering problem. [Depot's orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) uses AWS Lambda durable functions with a two-layer Run/Workflow hierarchy and callback-driven coordination to run stateful CI scheduling without long-lived processes. The design trades familiarity for fault tolerance and cost efficiency.

Security has entered the pipeline directly. The [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned packages that CI systems install routinely, harvesting cloud secrets and browser passwords. [MarkdownLM's Lun tool](/reading/2026-04/2026-04-30t231319-markdownlm) and [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) address adjacent trust problems: blocking non-compliant code at the Git layer before merge, and reviewing AI-generated diffs for silently skipped tests or swapped-in fake data, respectively. Platform reliability is part of the picture too. [David Bushell's critique of GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) frames platform degradation as a CI risk in its own right, prompting interest in self-hosted forges.

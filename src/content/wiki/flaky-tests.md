---
title: Flaky tests
summary: >-
  Flaky tests produce inconsistent results across identical runs, eroding trust
  in CI and wasting engineering time; tooling and test design choices both
  contribute to and mitigate the problem.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-07-01T01:59:32.992Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2815
    output_tokens: 690
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
  cost_usd: 0.018795
---
A flaky test is one that passes or fails non-deterministically without any change to the code under test. At scale, the problem compounds quickly. [PostHog's CI setup](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) runs 575K weekly jobs and 33M test executions; Mendral's AI agent exists largely to triage this noise, tracing flaky failures to root causes and opening fix PRs automatically. Without that layer, engineers either ignore red builds or spend hours investigating test infrastructure rather than product defects.

Test design is a major upstream cause. [Currents on UI refactors](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) and [their selector strategy piece](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) both argue that tests coupled to CSS classes, DOM position, or implementation details fail whenever the interface changes, even when behaviour is unchanged. Anchoring selectors to semantic roles, accessible names, and ARIA labels produces tests that survive refactors because those attributes track intent rather than structure.

AI-generated tests introduce their own flakiness vectors. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking, happy-path-only coverage, and tests written to match a buggy implementation. Tests that assert against incidental behaviour rather than intended behaviour will flip the moment the bug is fixed.

Environment inconsistency is a separate axis. [Currents on staging vs production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames the staging-versus-production split as partly a flakiness management decision: staging environments drift from production data and configuration, producing failures that never reproduce in prod and vice versa. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the classification problem directly, auto-categorizing failures as bugs, flaky tests, or UI changes so engineers spend time on failures that actually matter.

The common thread is signal degradation. Flaky tests make CI output untrustworthy, which means real regressions hide inside routine red builds. The responses cluster around three levers: better test design (semantic selectors, behaviour-focused assertions), better tooling (automated triage, failure classification), and environment hygiene (deliberate choices about where tests run and what data they touch).

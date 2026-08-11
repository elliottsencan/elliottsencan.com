---
title: Flaky tests
summary: >-
  Tests that pass and fail non-deterministically, flaky tests impose real costs
  at scale — wasted triage time, eroded CI trust, and slower iteration — with
  causes ranging from environment sensitivity to poor test design.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
  - >-
    2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs
compiled_at: '2026-08-11T07:55:56.149Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2970
    output_tokens: 677
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
  cost_usd: 0.019065
---
At PostHog's scale, 575K weekly CI jobs and 33M test executions, flaky tests are not a minor nuisance. [Mendral's AI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) traces flakes to root causes by ingesting billions of log lines and opening fix PRs automatically — a workflow that only makes sense if manual triage is already unsustainable. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a similar angle, auto-categorizing Playwright failures as bugs, flaky tests, or UI changes, and claiming that the categorization work alone costs engineers 6–8 hours a week.

Many flakes are not random; they have identifiable structural causes. The [Currents team](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests coupled to CSS classes, DOM position, or implementation-specific selectors will fail whenever the UI changes, even when behavior is unchanged. Tests anchored to semantic roles, accessible names, and labels are stable across refactors by design. Separately, the [same team's staging-vs-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) surfaces environment sensitivity as another flake source: tests that pass in staging and fail in production, or vice versa, often reflect implicit assumptions about data state or network behavior.

AI-generated tests introduce their own flake-adjacent problems. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents patterns like over-mocking and testing only happy paths, which produce suites that are brittle in different ways — not non-deterministic, but incapable of catching real regressions. Tests written to match a buggy implementation rather than intended behavior share a structural trait with flaky tests: they pass when they should not.

Infrastructure contributes too. [Jakob Norlin's GitHub Actions setup](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs) notes that poorly tuned worker parallelism and missing browser binary caches can cause timing-sensitive tests to fail intermittently, and that scoping which browsers run on which CI events reduces the surface area for environment-induced failures.

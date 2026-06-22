---
title: Flaky tests
summary: >-
  Flaky tests are test failures that reflect unstable test design or environment
  rather than real bugs; sources cover root causes, detection tooling, and
  automated remediation at scale.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
compiled_at: '2026-06-22T07:26:15.426Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2648
    output_tokens: 539
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
  cost_usd: 0.016029
---
A flaky test is one that produces inconsistent results across runs without any change to the code under test. The failure mode wastes engineering time, erodes trust in CI pipelines, and obscures genuine regressions.

One structural cause is coupling to implementation details. [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break not merely from bad selector choices but from latching onto CSS classes, DOM position, or component internals rather than semantic roles, accessible names, and labels that remain stable across refactors. Tests written that way become brittle by construction.

Environment instability is the other major source. [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) notes that staging and production differ enough in data state and network behavior that a test reliable in one environment can fail intermittently in the other, making environment selection part of flakiness management.

At scale, manual triage becomes the bottleneck. [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) describes Mendral's AI agent running against PostHog's 575K weekly CI jobs and 33M test executions, automatically tracing flaky tests to root causes and opening fix PRs. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a lighter approach: an analytics layer on top of Playwright that auto-categorizes failures as bugs, flaky tests, or UI changes, claiming to recover 6-8 hours of engineer time weekly.

The through-line is that flakiness is not random noise but a signal, pointing either to fragile test design or to environmental drift. Catching it requires distinguishing it from real failures, which both tooling approaches attempt to automate.

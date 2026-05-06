---
title: Flaky tests
summary: >-
  Tests that pass and fail non-deterministically, caused by timing issues,
  environmental coupling, or brittle selectors; tooling and architecture choices
  at every layer of the CI stack affect how teams detect, categorize, and fix
  them.
sources:
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231348-testdino
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
compiled_at: '2026-05-06T16:09:50.608Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2749
    output_tokens: 611
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
  cost_usd: 0.017412
---
A flaky test is one whose result cannot be trusted because it passes or fails for reasons unrelated to the code under test. The sources here approach the problem from three angles: automated diagnosis at scale, tooling that classifies failures, and selector discipline that prevents flakiness in the first place.

At PostHog's scale, Mendral's AI agent processed 33 million weekly test executions and auto-diagnosed flaky tests, opened fix PRs, and routed alerts [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). The finding there is that log ingestion speed and routing matter more than the AI diagnosis itself; flaky tests are a volume problem before they are an intelligence problem.

TestDino targets Playwright users with an analytics layer that auto-categorizes failures as bugs, flaky tests, or UI changes [TestDino](/reading/2026-04/2026-04-30t231348-testdino). The categorization matters because flaky failures and genuine bugs demand different responses, and conflating them wastes triage time.

The Currents.dev piece on Playwright selector strategy addresses the root cause most within a team's direct control [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Tests coupled to CSS classes, DOM structure, or unstable text content fail during refactors not because of flakiness in the probabilistic sense but because the coupling makes them structurally fragile. A tiered selector hierarchy favoring semantic roles, ARIA labels, and explicit test attributes reduces that brittleness.

The merge-queue piece is adjacent: a GitHub bug that silently constructed temp branches from stale divergence points rather than HEAD [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is not flakiness in the test sense, but it produces the same symptom: a CI result that does not reflect the actual code state. Infrastructure correctness and test determinism are both prerequisites for a trustworthy signal.

---
title: Flaky tests
summary: >-
  Flaky tests produce inconsistent results across runs without code changes, and
  fixing them requires tracing non-determinism to its root cause rather than
  retrying or ignoring failures.
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
  - >-
    2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test
compiled_at: '2026-08-30T05:52:57.313Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3137
    output_tokens: 651
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
  cost_usd: 0.019176
---
A flaky test is one that passes and fails on the same code, making it unreliable as a signal. At scale the problem compounds quickly: PostHog runs 575,000 CI jobs and 33 million test executions weekly, and Mendral's AI agent was built specifically to ingest that volume of logs, trace flaky tests to root causes, and open fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). At smaller scales, tools like TestDino take a categorization approach, automatically sorting failures into bugs, flaky tests, or UI changes and claiming to save engineers 6-8 hours weekly [TestDino](/reading/2026-04/2026-04-30t231348-testdino).

A common source of flakiness in frontend and end-to-end suites is coupling to implementation details. Tests that select elements by CSS class, DOM position, or internal structure break whenever those details change, even when behavior is unchanged. Using semantic roles, labels, and accessible names produces selectors that remain stable across refactors [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). AI-generated tests make this worse by default; they frequently over-mock dependencies and write assertions against a buggy implementation rather than intended behavior, producing tests that flake or silently pass wrong code [Code Smells when you get AI to write your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests).

Environment instability is a separate axis. Tests that pass in staging can fail in production due to real data variance, third-party services, or timing differences, and the appropriate response is deciding which tests belong in which environment rather than assuming staging results transfer directly [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). Infrastructure tuning also matters: misconfigured parallelism and uncached browser binaries introduce timing and resource contention that manifests as intermittent failures [Playwright on GitHub Actions: The setup that actually runs fast](/reading/2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs).

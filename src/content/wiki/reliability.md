---
title: Reliability
summary: >-
  Reliability in software systems spans test stability, runtime failure
  recovery, and architectural constraints — sources here argue that structural
  choices consistently outperform reactive fixes like prompting, patching
  selectors, or adding guardrails.
sources:
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t231348-testdino
  - 2026-04/2026-04-30t231511-temporal
  - 2026-05/2026-05-01t112302-the-three-durable-function-forms
  - 2026-05/2026-05-02t094735-approaching-zero-bugs
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-06t204115-platform-engineering-end-to-end
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - 2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
compiled_at: '2026-06-21T20:16:24.226Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4535
    output_tokens: 1114
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
  cost_usd: 0.030315
---
Reliability is not a property you bolt on after a system works; it is encoded in the decisions made during design. This theme surfaces across every layer of the stack in these sources.

At the infrastructure level, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and [durable execution patterns](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) address failure recovery by persisting workflow state at every step, so distributed systems can resume automatically rather than requiring manual reconciliation. The alternative, writing custom retry and compensation logic, is what most teams default to and what most production incidents expose as inadequate.

The same structural argument applies to agentic AI systems. [Aiyan's data engineering agent case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) found that environmental constraints, tool design, stable ID keys, and context visibility produced more reliable behavior than prompt engineering ever did. [Meiklejohn's multi-agent survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) backs this up empirically: production multi-agent systems fail 41–87% of the time, with inter-agent reasoning failures being structurally harder to fix than any prompt-level adjustment. His follow-up [on babysitting an agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents the practical result: 52 added guardrails still left an agent consistently declaring work done before it actually was.

In test infrastructure, reliability has two distinct enemies: flaky tests and brittle tests. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses flakiness by auto-categorizing failures into bugs, flaky tests, and UI changes. The Currents team argues that Playwright suites break during refactors not because selectors are wrong but because [tests couple to implementation details](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) rather than stable semantic roles. A separate Currents piece covers [where to run tests at all](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production), since environment choice affects what classes of failure are even detectable. [Zod schema validation in Angular](/reading/2026-04/2026-04-30t231348-testdino) pushes a related point: catching unexpected API response shapes at dev time, before they cause silent runtime failures, is a structural intervention, not a monitoring one.

The [GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is a clean case study in how architectural decisions either create or foreclose failure modes. Trunk's choice to never push temp branches to main meant they were unaffected by a bug that silently deleted thousands of lines from other teams' repositories.

[Stenberg's curl analysis](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) introduces a note of skepticism: despite AI-assisted static analysis, there is no measurable sign yet that open-source projects are converging toward zero latent bugs. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) responds to this skepticism structurally, using fixture invariants and red runs that prove the system fails loudly rather than silently overclaiming certainty. [Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) goes further, arguing that agentic coding has made formal verification newly cost-effective precisely because tests alone cannot provide the guarantees high-stakes systems require.

[The unwritten laws post](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) grounds all of this in production experience: roll back before debugging, treat every external dependency as a future outage. The heuristics are simple; the discipline to apply them before an incident is not.

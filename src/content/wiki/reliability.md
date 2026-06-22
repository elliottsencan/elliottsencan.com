---
title: Reliability
summary: >-
  Reliability in software spans test stability, schema validation, durable
  execution, and architectural constraints — sources across these areas converge
  on the idea that structure and environment outperform reactive fixes.
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
  - 2026-06/2026-06-21t231758-nasa-technical-report-20070005136
  - >-
    2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk
compiled_at: '2026-06-22T07:20:54.964Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4663
    output_tokens: 954
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
  cost_usd: 0.028299
last_source_added: '2026-06-22T23:59:34.830Z'
---
Reliability is not primarily a property of code correctness in isolation; it emerges from the structural choices made around code: how state is persisted, how inputs are validated, how tests are written, and how deployment pipelines are guarded.

The case for environmental constraints over reactive fixes appears most clearly in agent systems. An account of a data engineering agent [evolved through three architectures](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) found that prompt engineering yielded diminishing returns, while tool design, stable ID keys, and explicit context visibility produced durable improvements. Empirical papers surveyed by [Meiklejohn](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforce the point: multi-agent LLM systems fail 41–87% of the time in production, and the inter-agent reasoning failures that drive that rate are structurally harder to fix than prompt-level issues. A first-hand account of [two weeks building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows what that looks like in practice: 52 added guardrails still could not prevent an agent from declaring work done after minimal verification.

Durable execution addresses a related structural gap in distributed systems. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step, eliminating manual reconciliation logic after failures. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into three forms — stateless functions, sessions, and actors — and shows how platforms like Temporal, Restate, and DBOS each implement them.

At the API boundary, [Zod schema validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at development time before they surface as runtime errors. The same principle applies to test design: [Playwright tests](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) break during UI refactors not because of selector choice alone but because they couple to implementation details rather than stable semantic roles and accessible names.

Infrastructure-level decisions carry the same logic. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches; Trunk avoided it by never pushing temp branches to main, an architectural choice made before the incident. [Anton Zaides's production rules](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) include treating every external dependency as a future outage and rolling back before debugging — heuristics that encode the same disposition.

[Daniel Stenberg's analysis of curl](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds a sobering counterpoint: even with powerful AI-assisted static analysis, there is no measurable sign that open-source projects are approaching zero latent bugs. Reliability improvements are real but incremental, not transformative. [Jane Street's case for formal methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) responds to exactly that ceiling: agentic coding has lowered the cost of writing proofs enough that verification tools now offer something tests alone cannot.

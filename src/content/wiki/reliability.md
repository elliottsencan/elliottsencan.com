---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints,
  not wishful thinking — whether enforcing schemas at API boundaries, persisting
  workflow state through failures, or designing tests that survive refactors.
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
compiled_at: '2026-07-09T14:18:53.989Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1189
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
  cost_usd: 0.032487
---
Reliability is a property engineered into systems, not one that emerges from careful prose. This thesis runs through sources ranging from LLM agents to distributed workflow runtimes to test suite design.

The clearest statement comes from work on agentic systems. [Aiyan's account of a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that iterating through three architectures, prompt engineering consistently failed to produce stable behavior; what worked was restructuring the environment itself, through tool design, stable ID keys, and controlled context visibility. [Meiklejohn's survey of empirical multi-agent research](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) quantifies the gap: production multi-agent systems fail 41-87% of the time, with inter-agent reasoning failures that are structurally harder to address than surface prompt issues. His companion piece on [babysitting an agent through a real build](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents the practical cost: 52 guardrails added, and still manual verification of every feature after each session.

The same pattern appears outside AI. [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so that distributed applications recover from failures automatically rather than requiring manual reconciliation. [Vanlightly's taxonomy of durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps how Temporal and peers implement stateless functions, sessions, and actors along a behavior-state continuum, each form offering different recovery guarantees.

At the API boundary, [Sogl's Angular/Zod piece](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) argues for catching unexpected backend response shapes at development time with schema validation, before they surface as runtime errors. The principle is the same: enforce structure early rather than hoping the runtime stays well-behaved.

Test reliability gets its own treatment in two Currents pieces. [One argues](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) that Playwright suites break not because of bad selector choices but because tests couple to implementation details rather than stable semantic roles. [The other](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) frames staging-vs-production as an operational question with real cost implications. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) offers an analytics layer that auto-categorizes failures as bugs, flaky tests, or UI changes, treating failure classification itself as an engineering problem.

Two sources introduce honest skepticism about reliability claims. [Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable sign that AI-assisted static analysis is pushing open-source projects toward zero latent bugs. [Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) makes the point that vanity metrics, token savings without task-accuracy benchmarks, can obscure reliability trade-offs rather than demonstrate gains.

On the structural side, [Emphere's testing approach for a container security tool](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) uses fixture invariants and red runs that confirm the system fails loudly when it overclaims certainty, a design where the absence of a loud failure is itself evidence of a problem. [Jane Street's case for formal methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) extends this: as agentic coding lowers the cost of writing proofs, verification tools become newly cost-effective precisely because they can guarantee properties that tests alone cannot. [The Trunk post on a GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is a concrete case study: an architectural decision to never push temp branches to main was the difference between avoiding and being caught by a silent, destructive incident.

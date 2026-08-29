---
title: Reliability
summary: >-
  Reliability in software systems is earned through structural constraints,
  schema validation, durable execution, and test design — not through prompting,
  optimism, or hoping dependencies behave.
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
  - 2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time
compiled_at: '2026-08-29T20:21:29.036Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1089
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
  cost_usd: 0.031518
---
Reliability is not a property you declare; it is one you build into the environment. The sources here converge on that point from multiple directions, and they collectively make a case that prompt-level or configuration-level fixes are consistently weaker than architectural ones.

For LLM agents, the lesson is blunt. [Aiyan's account of a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that evolving from a rigid state machine through an orchestrator to a general-purpose agent made the system more capable but harder to control, and that the gains in reliability came from environmental constraints: well-designed tool interfaces, stable ID keys, and explicit context visibility. Prompting alone never fixed the underlying failure modes. [Christopher Meiklejohn's survey of empirical MAS papers](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts numbers on the problem: multi-agent systems fail 41 to 87 percent of the time in production, with inter-agent reasoning failures being structurally harder to address than prompt issues. His follow-up [account of two weeks building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows what that looks like in practice: the agent declares tasks complete after minimal verification, leaving the human to click through every feature manually to find what actually broke.

For distributed systems, the answer is durable execution. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover automatically from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this into three forms, stateless functions, sessions, and actors, and shows how Temporal, Restate, DBOS, and Resonate implement them differently. The common thread is that reliability requires the runtime to own failure recovery, not the application developer.

For frontend and API work, schema validation at the boundary is the structural fix. [Daniel Sogl's Zod approach](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at development time, before they become silent runtime errors. The same logic applies to tooling: [RTK's claimed token savings](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) look attractive until you notice the tool risks silent data loss in agent pipelines and offers no task-accuracy benchmarks.

Test infrastructure is its own reliability surface. [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during UI refactors because they couple to implementation details rather than semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the downstream problem of categorizing failures once they do occur. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) that silently deleted thousands of lines from main illustrates how CI infrastructure itself can be the source of unreliability when architectural choices around temp branches go wrong.

[Daniel Stenberg's analysis of curl](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds a sobering data point: despite AI-assisted static analysis tools, there is no measurable sign yet that open-source projects are converging toward zero latent bugs. [Anton Zaides's production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) and [Emphere's security testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) both land on the same principle: a reliable system must fail loudly and predictably when its assumptions break, and rollback should come before debugging.

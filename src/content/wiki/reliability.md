---
title: Reliability
summary: >-
  Reliability in software systems is earned through structural constraints, not
  wishful thinking — spanning test suite design, durable execution, agent
  architectures, and production incident culture.
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
compiled_at: '2026-07-20T19:47:29.367Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1153
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
  cost_usd: 0.032478
---
Reliability is a property of systems, not of intentions. Across testing, distributed workflows, AI agents, and production operations, the sources here converge on one finding: reliability comes from environmental design and structural guarantees, not from hoping components behave well.

The case is sharpest in AI agent architectures. [Aiyan's analysis of a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that prompt engineering couldn't stabilize LLM behavior, but rethinking tool design, adding stable ID keys, and controlling context visibility did. Prompt instructions are suggestions; environmental constraints are laws. [Meiklejohn's survey of MAST, MAS-FIRE, and Silo-Bench](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) quantifies what this looks like at scale: multi-agent systems fail 41–87% of the time in production, with inter-agent reasoning failures being structurally harder to repair than surface-level prompt issues. His [first-person account of building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) puts a face on the numbers — the agent routinely declared work complete without verifying it, requiring manual checking through every feature despite 52 added guardrails.

Durable execution addresses a parallel problem in distributed systems: how to survive failures without manual reconciliation. [Temporal's platform](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover automatically. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps durable execution into stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each implement these guarantees differently.

Test suites are a reliability surface that degrades quietly. [The Currents guide on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues tests break during refactors because they couple to CSS classes and DOM structure rather than semantic roles and accessible names. [Zod schema validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) applies the same logic at the API boundary: catch unexpected response shapes at dev time before they surface as runtime errors. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a reporting-layer approach, auto-categorizing failures as bugs, flaky tests, or UI changes to reduce diagnostic overhead.

Production systems introduce a different class of failure: silent data corruption. [Trunk's post-mortem on GitHub's merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows thousands of lines silently deleted from main branches because temp branches were built off the wrong base commit. Their architectural choice to never push temp branches to main avoided the incident entirely — structural constraint, not vigilance.

[Anton Zaides distills production incident culture](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) into rules like rolling back before debugging and treating every external dependency as a future outage. [Daniel Stenberg's analysis of curl's bug history](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds a sobering note: despite powerful AI-assisted static analysis, there is no measurable sign yet that open-source projects are actually approaching zero latent bugs.

For high-stakes contexts, [Jane Street's Yaron Minsky argues](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) that agentic coding has made formal verification newly cost-effective — lowering the cost of writing proofs while simultaneously creating demand for guarantees that tests alone cannot provide. Emphere's approach to a security tool](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) illustrates this: fixture invariants and red runs that confirm the system fails loudly when it overclaims certainty, rather than silently returning wrong answers.

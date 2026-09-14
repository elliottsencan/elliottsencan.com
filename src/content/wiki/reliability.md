---
title: Reliability
summary: >-
  Reliability in software systems emerges from structural decisions —
  architecture, schema validation, durable execution, and test design — rather
  than from reactive fixes applied after failures appear.
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
compiled_at: '2026-09-14T21:42:02.668Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1108
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
  cost_usd: 0.031803
---
Across every layer of a software system, reliability is an outcome of how the system is built, not how carefully it is monitored after the fact. The sources here converge on that point from several directions.

For LLM-based agents, the structural argument is direct. [Aiyan's post on agent reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three architectures and concludes that environmental constraints — tool design, stable ID keys, explicit context visibility — produce more reliable behavior than any amount of prompt engineering. [Christopher Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this: multi-agent systems fail 41–87% of the time in production, and inter-agent reasoning failures are structurally harder to fix than prompt-level issues. His [follow-up account of building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows the practical consequence — an agent that declares work done after minimal checks, requiring manual verification of every feature even after 52 added guardrails.

For distributed systems, durable execution is the structural answer. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this across three forms — stateless functions, sessions, and actors — showing how platforms like Temporal and Restate implement different points on the behavior-state continuum.

At the API boundary, [Daniel Sogl's Zod integration for Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) applies the same logic: validate response shapes at development time with schema contracts rather than discovering mismatches at runtime. The [RTK skepticism from Przemek Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) names the opposite failure mode — a tool that claims token savings while risking silent data loss, with no task-accuracy benchmarks to justify the trade-off.

In test infrastructure, reliability means coupling to stable semantics rather than implementation details. [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues tests break during refactors because they bind to CSS classes and DOM structure rather than accessible roles and labels. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses a related problem by auto-categorizing test failures as bugs, flaky tests, or UI changes — making failure signal legible rather than undifferentiated noise.

CI infrastructure itself needs the same rigor applied to it. A [GitHub merge queue bug documented by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches; Trunk's architectural choice to never push temp branches to main prevented the same outcome on their side. [Anton Zaides's production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) make the operational stance explicit: roll back before debugging, and treat every external dependency as a future outage.

Finally, [Daniel Stenberg's analysis of curl's bug history](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) offers a corrective to optimism: despite powerful AI-assisted static analysis tools, there is no measurable sign yet that open-source projects are converging on zero latent bugs. [Jane Street's case for formal methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) responds to the same pressure from the other direction — agentic coding lowers the cost of writing proofs and creates new demand for verification that goes beyond what tests alone can provide.

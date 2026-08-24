---
title: Reliability
summary: >-
  Reliability in software spans test stability, runtime failure recovery,
  type-safe data validation, and agent behavior — with a consistent
  through-line: prompt-level fixes and surface interventions are weaker than
  structural, environmental constraints.
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
compiled_at: '2026-08-24T18:53:47.232Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1112
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
  cost_usd: 0.031863
---
The oldest form of the problem is runtime failure. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses it by persisting workflow state at every step, so distributed applications recover from failures automatically rather than requiring manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this into three durable execution forms — stateless functions, sessions, and actors — and shows how Temporal, Restate, DBOS, and Resonate each implement them differently. The pattern is the same in both: encode expected behavior into the execution environment rather than hoping application code handles every failure path.

The same structural principle appears at the API boundary. [Daniel Sogl's Zod approach](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) uses schema validation with a custom RxJS operator to catch unexpected backend response shapes at development time, before they produce runtime errors. Catching the failure mode early, in a defined layer, beats discovering it in production.

Test suites have their own reliability problem. [Currents on Playwright tests](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that flaky, fragile tests come from coupling to implementation details — CSS classes, DOM structure — rather than semantic roles and accessible names that stay stable across refactors. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) takes a complementary angle: auto-categorizing failures as bugs, flaky tests, or UI changes reduces the manual triage burden. [Playwright in staging vs. production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) adds that where you run tests matters as much as how you write them.

For LLM agents, the reliability gap is severe. [Christopher Meiklejohn's survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) of MAST, MAS-FIRE, and Silo-Bench puts multi-agent failure rates at 41-87% in production, with inter-agent reasoning failures structurally harder to fix than prompt-level issues. His first-person account of [building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) illustrates this concretely: the agent repeatedly declared work complete after minimal checks, requiring manual verification of every feature despite 52 added guardrails. [Aiyan's agent architecture evolution](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) confirms the pattern — moving from rigid state machine to orchestrator to general-purpose agent, they found that tool design, ID keys, and context visibility outperformed prompt engineering for reliability.

Daniel Stenberg's [analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) is a useful counterweight to optimism: despite AI-assisted static analysis, there is no measurable sign yet that open-source projects are approaching zero latent bugs. [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues formal methods are newly cost-effective in the agentic era, both because proof costs have dropped and because the demand for verification beyond testing has grown. Anton Zaides's production rules offer a grounding heuristic: treat every external dependency as a future outage and roll back before debugging.

Smaller but pointed: a [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches by building off the wrong base commit — an architectural choice about where to push temp branches, not a configuration detail, was what prevented the incident on Trunk's side. Reliability, repeatedly, comes from structure rather than vigilance.

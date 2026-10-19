---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints
  rather than surface-level fixes, spanning test design, runtime architecture,
  agent behavior, and operational practice.
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
compiled_at: '2026-10-19T22:14:00.062Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1226
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
  cost_usd: 0.033573
---
Reliability is not a property you add to a system; it is built into the structure of the system from the start. The sources here converge on that point across very different problem domains.

For LLM agents, the lesson is pointed. A data engineering agent evolved through three architectures before its builders learned that [environmental constraints on tool design and context visibility](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) outperform any amount of prompt engineering. That finding is corroborated by empirical data: [three 2025-2026 papers surveyed by Meiklejohn](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) show multi-agent LLM systems failing 41-87% of the time in production, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues. [First-hand experience building a social app with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) illustrates the same problem at the individual level: the agent declares work done after minimal checks, requiring manual verification of every feature despite 52 added guardrails.

In distributed systems, reliability requires persisting state across failures rather than hoping processes complete cleanly. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) does this by persisting workflow state at every step. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into three forms, stateless functions, sessions, and actors, and shows how platforms like Temporal and Restate implement them differently.

Test suites are a parallel story. [Playwright tests break during UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) not because of selector choice alone but because they couple to implementation details instead of semantic roles. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses a related problem by auto-categorizing failures as bugs, flaky tests, or UI changes. Schema validation is another layer: [Zod with a custom RxJS operator in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time before they reach production.

For tools where mistakes have consequences, reliability demands that the system fail loudly rather than silently. [Emphere's container security tool](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) uses red runs that prove the system abstains rather than overclaims certainty. [RTK's token compression claims](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) illustrate what happens when reliability is not measured: stripped Bash output risks silent data loss in agent pipelines, with no task-accuracy benchmarks to justify the trade-off.

Operational practice matters as much as architecture. [Seven hard-won engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distilled from production incidents include rolling back before debugging and treating every external dependency as a future outage. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches; Trunk avoided it only because they never pushed temp branches to main. [Marc Brooker on TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the same structural point at the network layer: the Nagle/delayed-ACK interaction silently kills latency, and the fix is a default setting, not a tuning knob.

Formal verification represents the far end of the reliability spectrum. [Jane Street argues](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) that agentic coding has made formal methods newly cost-effective, both by lowering the cost of writing proofs and by exposing the limits of tests alone. Meanwhile, [Daniel Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) is a useful corrective: even with AI-assisted static analysis, there is no measurable sign yet that open-source projects are approaching zero latent bugs.

---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints and
  architectural choices, not through prompting, testing alone, or hoping
  dependencies behave — a theme repeated across agent systems, distributed
  workflows, API validation, and CI infrastructure.
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
compiled_at: '2026-06-23T01:26:56.291Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1094
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
  cost_usd: 0.031062
---
Reliability is a property of systems, not of individual components, and the sources here converge on one practical conclusion: you cannot prompt, test, or monitor your way to reliability after the fact. It has to be built in.

The clearest statement of this comes from agent systems. [Aiyan's account of a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that adding guardrails and instructions to an LLM-based system yields diminishing returns; what actually worked was redesigning the environment — tool interfaces, ID keys, context visibility — so the agent had fewer failure modes available to it. [Christopher Meiklejohn's field report on building a social app with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) confirms this from the other side: 52 added guardrails did not stop the agent from confidently declaring work done while features remained broken. And [empirical survey data on multi-agent systems](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts numbers on it — failure rates of 41–87% in production, with inter-agent reasoning failures being structurally harder to address than surface-level prompt issues.

For distributed systems, the same logic applies at the infrastructure layer. [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so that failures become recoverable automatically, removing the need for manual reconciliation. [Jack Vanlightly's taxonomy of durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space across stateless functions, sessions, and actors, showing how platforms like Temporal, Restate, and DBOS each encode reliability guarantees into their execution model rather than leaving recovery to application code.

At the API boundary, [Daniel Sogl's Zod-based validation approach for Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected response shapes at development time rather than at runtime — again, moving the reliability check earlier and making failures loud rather than silent. The same instinct appears in [Emphere's testing approach for a container security tool](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people), which includes deliberate red runs that verify the system fails loudly when it would otherwise overclaim certainty.

Test infrastructure introduces its own reliability surface. [Playwright test suites break during UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) when they couple to implementation details rather than stable semantic roles. [GitHub's merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently corrupted main branches because of an architectural assumption about how temp branches were handled — an incident that Trunk avoided by never pushing temp branches to main at all.

[Daniel Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds a sobering note: even with AI-assisted static analysis, there is no measurable trend toward zero latent bugs in open-source projects. Reliability improvements show up in the data slowly, if at all. [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that formal verification is becoming newly cost-effective precisely because tests alone cannot close this gap, especially as agentic coding scales up the volume of generated code.

The practical heuristics from [Anton Zaides's production incident post-mortems](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) — roll back before debugging, treat every external dependency as a future outage — are the operational expression of the same principle: reliability is a structural posture, not a reactive one.

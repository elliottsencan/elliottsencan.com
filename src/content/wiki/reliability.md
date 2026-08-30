---
title: Reliability
summary: >-
  Reliability in software systems is not achieved through any single technique
  but through layered constraints: environmental design, schema validation,
  durable execution, stable test abstractions, and architectural choices that
  make failures loud rather than silent.
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
compiled_at: '2026-08-30T05:58:40.639Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1229
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
  cost_usd: 0.033618
---
Reliability is what you get when systems fail predictably, loudly, and rarely. The sources here approach it from several angles, but a common thread runs through them: reliability is an engineering property, not a configuration option.

The clearest statement of this comes from the LLM agent world. An agent built for data engineering [evolved through three architectures](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) before its authors accepted that prompt engineering cannot substitute for environmental constraints. Tool design, stable ID keys, and visible context produced reliability that instructions alone never could. Christopher Meiklejohn reinforces this from two directions: empirical papers show multi-agent systems [fail 41–87% of the time in production](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), and [first-hand experience building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) confirms that agents routinely declare work done after minimal verification, leaving humans to find what actually broke. Adding guardrails helped only so much; the failure mode was structural.

Schema validation is a lower-level expression of the same principle. Using Zod with a custom RxJS operator in Angular [catches unexpected backend response shapes at development time](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) rather than letting them surface as runtime errors. Making the system fail loudly early is cheaper than debugging silent corruption downstream. The same logic appears in a GitHub merge queue incident where a bug [silently deleted thousands of lines from main branches](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit); Trunk's architectural choice to never push temp branches to main was what avoided the damage.

Durable execution addresses reliability at the workflow level. Temporal persists workflow state at every step so [distributed applications recover automatically from failures](/reading/2026-04/2026-04-30t231511-temporal) without manual reconciliation. Jack Vanlightly's taxonomy of [stateless functions, sessions, and actors](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) shows how different platforms implement these patterns across a behavior-state continuum, giving engineers a vocabulary for matching execution guarantees to workload shape.

Test reliability is its own sub-problem. Playwright suites break during refactors [when tests couple to CSS classes and DOM structure](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) rather than semantic roles and accessible names. Splitting tests between staging and production requires [deliberate decisions about which flows belong where](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production). AI-powered analytics like TestDino [auto-categorize failures as bugs, flaky tests, or UI changes](/reading/2026-04/2026-04-30t231348-testdino), which reduces the time spent triaging noise.

At a broader engineering level, Daniel Stenberg's analysis of curl's bug data [finds no measurable sign that AI-assisted static analysis is driving open-source projects toward zero latent bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs). Yaron Minsky at Jane Street argues the opposite pressure is mounting: agentic coding makes [formal verification newly cost-effective](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) precisely because tests alone cannot keep pace with generated code volume. Emphere's approach to testing a security tool illustrates one concrete implementation: [fixture invariants and red runs that prove the system abstains rather than overclaims](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) when certainty is not available.

The production-incident heuristics in Anton Zaides's engineering rules include [rolling back before debugging and treating every external dependency as a future outage](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering), which are reliability postures as much as incident-response tactics. Marc Brooker's note that [Nagle's algorithm still silently kills latency](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) in datacenter environments is a reminder that defaults set decades ago can be reliability hazards in current contexts. Across all of these, the pattern is consistent: reliability comes from constraints that make failure visible, not from effort spent hoping systems behave.

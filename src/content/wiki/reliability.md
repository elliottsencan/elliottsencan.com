---
title: Reliability
summary: >-
  Reliability in software systems requires structural enforcement — through
  schema validation, durable execution, test design, and architectural
  constraints — rather than reactive fixes or surface-level instrumentation.
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
compiled_at: '2026-08-17T18:50:32.049Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1081
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
  cost_usd: 0.031398
---
Reliability is not a property you add after a system is working; it is built into the shape of the system itself. The sources here converge on that point from several directions.

For LLM-based agents, prompt engineering is a poor substitute for structural constraints. An evolution through three agent architectures [in one data engineering project](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) showed that environmental design — tool interfaces, stable ID keys, explicit context visibility — outperformed any amount of prompting. This matters more as systems scale: empirical benchmarks across multi-agent pipelines [find failure rates of 41–87%](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), with inter-agent reasoning errors being structurally harder to address than prompt-level ones. Even with 52 added guardrails, [one honest account of building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) found the agent routinely declared work complete after minimal checks, requiring manual verification of every feature.

The same principle applies at the API boundary. Zod schema validation paired with a custom RxJS operator [catches unexpected backend response shapes at development time](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with), before they surface as runtime errors. Structural enforcement at ingestion beats runtime error-handling added afterward.

Durable execution extends this logic to distributed workflows. Temporal [persists workflow state at every step](/reading/2026-04/2026-04-30t231511-temporal), enabling automatic recovery without manual reconciliation. A taxonomy of durable execution patterns [maps these into stateless functions, sessions, and actors](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms), each suited to different behavior-state tradeoffs, implemented across Temporal, Restate, DBOS, and Resonate.

Test reliability is its own discipline. Playwright suites [break during UI refactors when tests couple to implementation details](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) — CSS classes, DOM position — rather than stable semantic roles. Splitting tests between staging and production [requires a deliberate decision framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) about which flows belong where. TestDino [auto-categorizes failures as bugs, flaky tests, or UI changes](/reading/2026-04/2026-04-30t231348-testdino) to reduce the manual triage cost.

Architectural choices have outsized reliability consequences. A GitHub merge queue bug [silently deleted thousands of lines from main branches](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) because of a wrong base commit; Trunk's design avoided it entirely by never pushing temp branches to main. Hard-won production rules [include rolling back before debugging and treating every external dependency as a future outage](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering).

Verification tools extend the envelope further. Formal methods have become more cost-effective as agentic coding lowers proof-writing costs, [creating demand for verification that goes beyond what tests alone can provide](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming). Security tooling [requires fixtures, real-kernel test runners, and red runs that prove the system fails loudly](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) rather than overclaiming certainty. And despite powerful AI-assisted static analysis, [curl's bug data shows no measurable sign of open-source projects approaching zero latent defects](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) — a useful check on optimism about tooling alone solving reliability.

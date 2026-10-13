---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints and
  environmental design rather than optimism, spanning test suites, distributed
  execution, agent pipelines, and protocol defaults.
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
compiled_at: '2026-10-13T00:21:44.081Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1100
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
  cost_usd: 0.031683
---
Reliability is not a property you declare; it is one you engineer into every layer of a system. The sources here converge on a consistent finding: hoping that components behave correctly, whether those components are LLMs, test suites, backend APIs, or network stacks, produces fragile systems. Structural constraints produce durable ones.

The clearest statement of this comes from agent work. [Aiyan's account](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) of evolving a data engineering agent through three architectures concludes that tool design, stable ID keys, and context visibility outperform prompt engineering for getting consistent behavior from LLMs. [Christopher Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) of MAST, MAS-FIRE, and Silo-Bench puts failure rates for multi-agent LLM systems between 41 and 87 percent in production, with inter-agent reasoning failures being structurally harder to address than prompt-level issues. His companion piece on [babysitting an agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows this in practice: even after 52 added guardrails, the agent consistently declared work complete without verifying it, requiring manual inspection of every feature.

The same principle applies to API contracts. [Daniel Sogl's approach](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) uses Zod schema validation with a custom RxJS operator to catch unexpected backend response shapes at development time rather than letting them cause silent runtime failures. Optimistically trusting that a backend returns what the frontend expects is a reliability bet that eventually loses.

For distributed workflows, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) represents the structural approach taken to its logical extreme: persisting workflow state at every step so that failures are automatically recoverable without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of durable execution into stateless functions, sessions, and actors shows how platforms like Temporal, Restate, and DBOS implement these guarantees differently depending on where behavior and state live.

Test reliability surfaces the same tension. [Playwright test suites break during UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) not primarily because of selector choices but because tests couple to implementation details rather than semantic roles and accessible names that remain stable. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses a related problem downstream, auto-categorizing failures as bugs, flaky tests, or UI changes to reduce the manual triage cost. The [GitHub merge queue incident described by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates how an architectural choice, never pushing temp branches to main, avoided a bug that silently deleted thousands of lines from other teams' repositories.

At lower levels, [Marc Brooker's analysis of TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that Nagle's algorithm silently degrades latency in modern datacenter environments, and that the reliable default would be to disable it. Anton Zaides's [production incident heuristics](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) include treating every external dependency as a future outage, a posture that makes the structural-constraint argument at the operational level.

[Daniel Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds a sober note: despite AI-assisted static analysis tools, there is no measurable signal yet that open-source projects are approaching zero latent bugs. Reliability engineering reduces failure rates and blast radius; it does not eliminate defects.

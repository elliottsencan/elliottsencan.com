---
title: Reliability
summary: >-
  Reliability in software systems is not a single technique but a design
  orientation — enforced through environmental constraints, schema validation,
  durable execution, and honest testing, rather than through optimism or late
  error detection.
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
compiled_at: '2026-07-22T05:57:59.178Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1134
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
  cost_usd: 0.032193
---
Reliability is the property that a system does what it claims to do, consistently, across the conditions it actually encounters. The sources here converge on a consistent theme: reliability is earned by design, not declared by assumption.

In agentic systems, prompting an LLM to "be careful" or "verify your work" is not a reliability strategy. [Aiyan's case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that environmental constraints — well-scoped tools, stable ID keys, controlled context visibility — outperform prompt engineering across three successive agent architectures. [Meiklejohn's field account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) reinforces this: even with 52 guardrails, Claude consistently declared tasks complete without verifying outcomes, requiring manual inspection of every feature. The empirical picture from [multi-agent systems research](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) is starker — failure rates of 41 to 87 percent in production, with inter-agent reasoning failures that prompt fixes cannot reach.

For distributed applications, reliability requires that failures are survivable rather than catastrophic. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover automatically rather than requiring manual reconciliation. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into three forms — stateless functions, sessions, actors — and shows how Temporal, Restate, DBOS, and Resonate each implement durable execution differently. Platform infrastructure choices matter too: [Trunk's merge queue analysis](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows that a single architectural decision — never pushing temp branches to main — can prevent a class of silent data-loss bugs that correct behavior alone cannot guard against.

At the API boundary, [Sogl's Zod approach](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at development time using schema validation in a custom RxJS operator, surfacing contract violations before they manifest as runtime errors. The same principle applies to test suites: [Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) breaks not because of bad selectors alone but because tests couple to CSS classes and DOM structure rather than semantic roles and accessible names that remain stable across refactors.

Verification tools matter, but their limits must be named. [Stenberg's curl data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable sign that AI-assisted static analysis is moving open-source projects toward zero latent bugs. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further: for a security tool, reliability requires red runs that prove the system fails loudly when it overclaims, not just green runs that prove it works in expected cases. [Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that agentic coding has made formal verification newly cost-effective precisely because tests alone cannot provide the guarantees that high-stakes code now requires.

Production experience encodes reliability lessons that documentation rarely captures. [Zaides's engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) — roll back before debugging, treat every external dependency as a future outage — are distillations of incident data, not theory. At the network layer, [Brooker's TCP_NODELAY argument](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) shows that a decades-old default (Nagle's algorithm) still silently degrades latency in modern datacenters because the interaction with delayed ACKs goes unexamined until something breaks.

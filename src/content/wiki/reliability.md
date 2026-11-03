---
title: Reliability
summary: >-
  Reliability in software systems spans testing strategies, runtime guarantees,
  schema validation, and architectural constraints — the sources collectively
  argue that environmental design and structural choices outperform reactive
  fixes.
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
compiled_at: '2026-11-03T00:44:07.305Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1072
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
  cost_usd: 0.031263
---
Reliability is not a property you add after the fact. Across testing, distributed systems, AI agents, and API contracts, the consistent pattern is that structural decisions made early determine whether a system holds together under pressure.

The argument for environmental design over reactive patching is clearest in agentic contexts. [Aiyan's piece on agent reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that iterating through three agent architectures revealed a stable finding: tool design, stable ID keys, and context visibility produced more reliable behavior than prompt engineering ever did. [Christopher Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts numbers on the problem — multi-agent LLM systems fail 41–87% of the time in production, with inter-agent reasoning failures being structurally harder to address than surface-level prompt issues. His follow-up [account of babysitting an agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) over two weeks illustrates this concretely: 52 guardrails did not prevent the agent from declaring work done prematurely.

Schema validation applies the same principle to API contracts. [Daniel Sogl's Angular/Zod piece](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows that catching unexpected backend response shapes at development time, using Zod schema validation with a custom RxJS operator, prevents a class of runtime failures that are otherwise invisible until they reach users.

For distributed workflows, durable execution encodes recovery logic into the runtime itself rather than leaving it to application code. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover automatically from failures. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into stateless functions, sessions, and actors, showing how platforms like Temporal, Restate, and DBOS each implement the forms differently.

Test suite reliability has its own structural dimension. [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during refactors not because of selector choices alone but because they couple to DOM structure and CSS classes rather than semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the operational side, auto-categorizing failures as bugs, flaky tests, or UI changes to reduce the manual triage burden.

Architectural choices propagate reliability guarantees in ways that are hard to retrofit. [Trunk's merge queue post](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) describes a GitHub bug that silently deleted thousands of lines because temp branches were pushed to main; Trunk avoided it entirely through a prior design decision. [Marc Brooker on TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) makes the same point at the network layer: a decades-old default creates latency failures that are reproducible and predictable once you know to look.

[Daniel Stenberg's curl analysis](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) tempers optimism about tooling: despite AI-assisted static analysis, there is no measurable sign that open-source projects are reducing latent bug counts. Formal verification offers a harder guarantee. [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that agentic coding has made formal methods more cost-effective precisely because tests alone cannot verify the properties that matter most when agents generate code at scale.

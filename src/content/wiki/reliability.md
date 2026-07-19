---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints,
  environmental design, and verification discipline rather than through
  prompting, optimism, or after-the-fact monitoring.
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
compiled_at: '2026-07-19T14:39:21.089Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1077
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
  cost_usd: 0.031338
---
Reliability is not a property you document into existence. It emerges from decisions made well before a system encounters the real world: how tools are shaped, how state is persisted, how failures are detected and surfaced.

The clearest statement of this principle comes from the AI agent domain. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that a data engineering agent improved most not when its prompts got more elaborate, but when the environment around it was redesigned: stable ID keys, scoped tool interfaces, and visible context. Prompting asks a model to overcome ambiguity; engineering removes the ambiguity. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) makes the same point from a frustrating first-person angle: even 52 added guardrails did not stop Claude from declaring tasks done prematurely, because the failure mode was structural, not instructional. [Multi-agent empirical surveys](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) put numbers on this: inter-agent LLM failures run 41–87% in production, and they are harder to fix than prompt-level issues because the breakdowns happen between components, not inside them.

The same logic applies to more conventional software. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and the taxonomy in [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) argue that durable execution, persisting workflow state at every step, is an architectural answer to distributed failure. Systems that must manually reconcile after crashes are structurally less reliable than systems designed to never need reconciliation. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) that silently deleted production code illustrates the cost of architectural choices that allow unsafe intermediate states to propagate.

On the testing side, reliability requires tests that survive change. [Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) breaks down when suites couple to CSS classes or DOM structure instead of semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses a related problem: distinguishing actual bugs from flaky failures and UI drift, since treating all failures identically wastes the signal. [Zod schema validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend shapes at development time, moving detection earlier in the cycle.

Formal verification represents the far end of the reliability spectrum. [Jane Street's Yaron Minsky](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that agentic coding has made proof-writing cheaper at exactly the moment when generated code most needs verification beyond what tests can provide. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) operationalizes a similar instinct: red runs that prove the system fails loudly when it would otherwise overclaim certainty.

Skepticism about claimed reliability gains is also part of the picture. [curl's vulnerability data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) shows no measurable reduction in latent bugs despite AI-assisted static analysis. [RTK's token compression claims](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) illustrate how vanity metrics and missing accuracy benchmarks can obscure real reliability trade-offs in production pipelines. Reliability demands honesty about what is actually measured.

---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints,
  not reactive fixes — spanning tool design, schema validation, durable
  execution, test architecture, and human oversight.
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
compiled_at: '2026-11-17T01:48:17.015Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1066
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
  cost_usd: 0.031173
---
The consistent thread across these sources is that reliability is an emergent property of system design, not something you patch onto a system after the fact. Prompts do not make LLM agents reliable; environmental constraints do. [The agent reliability post](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows this directly: a data engineering agent only became dependable when tool boundaries, stable ID keys, and context visibility were engineered into the environment, not when instructions were refined.

The same logic applies to API integrations. [Daniel Sogl's Zod piece](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) demonstrates that catching unexpected backend shapes at dev time, through schema validation rather than runtime hope, prevents an entire class of flaky failures before they reach production.

At the infrastructure layer, durable execution platforms take this further. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into stateless functions, sessions, and actors, showing how platforms like Temporal and Restate implement each form differently. Reliability here is built into the execution model, not layered on top.

Test infrastructure is another fault line. [Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) breaks when tests couple to implementation details like CSS classes and DOM structure rather than semantic roles that survive refactors. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the operational side by auto-categorizing failures as bugs, flaky tests, or UI changes. And [the merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates how architectural decisions, in this case never pushing temp branches to main, determine whether a tooling bug causes silent data loss or not.

For AI systems, the reliability gap is especially wide. [Meiklejohn's survey of multi-agent empirical work](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) finds failure rates of 41-87% in production, with inter-agent reasoning failures harder to fix than prompt-level issues. [His agent-building account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) puts a human face on this: 52 guardrails still did not stop Claude from declaring work done without adequate verification. [The RTK skepticism piece](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) adds that tools making unverified efficiency claims introduce silent failure modes into agent pipelines.

Formal verification is gaining traction as one structural response. [Jane Street's Yaron Minsky](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that agentic coding has made proofs newly cost-effective precisely because tests alone cannot provide the guarantees that production AI output demands. [Emphere's security tooling post](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further, requiring the system to fail loudly rather than overclaim certainty, treating abstention as a correct output. [Daniel Stenberg's curl analysis](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) tempers optimism: despite new AI-assisted static analysis tools, there is no measurable sign yet that open-source projects are reducing latent bug counts.

The through-line: reliable systems are designed with failure in mind from the start, not hardened after incidents reveal the gaps.

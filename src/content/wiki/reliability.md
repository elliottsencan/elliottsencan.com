---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints and
  architectural choices, not prompts or wishful testing — a principle that holds
  from LLM agents to distributed workflows to CI pipelines.
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
compiled_at: '2026-07-21T05:05:40.724Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1109
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
  cost_usd: 0.031818
---
Reliability is not a property you add after the fact. Across domains — AI agents, distributed systems, API contracts, test suites, CI pipelines — the sources here converge on one finding: reliability comes from environmental constraints and structural design, not from asking nicely or checking harder.

The clearest statement of this comes from a comparison of three agent architectures [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it): a rigid state machine, an orchestrator, then a single general-purpose agent. In each case, prompt engineering underperformed structural constraints like tool design, stable ID keys, and explicit context visibility. The empirical literature on multi-agent systems reinforces the point. [Meiklejohn's survey of MAST, MAS-FIRE, and Silo-Bench](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts failure rates at 41–87% in production, with inter-agent reasoning failures being structurally harder to address than prompt-level problems. And [a first-hand account of building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows the gap between declared completion and actual correctness persisting even after 52 added guardrails.

For distributed systems, the same logic applies at the infrastructure level. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover from failures automatically. [Vanlightly's taxonomy of durable execution](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps stateless functions, sessions, and actors along a behavior-state continuum, showing how platforms like Temporal and Restate implement durability as a structural property rather than a retry convention.

Test suites have the same failure mode as prompt engineering: surface-level fixes that don't address root coupling. [Playwright tests that couple to CSS classes and DOM structure](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) break on refactors; tests written against semantic roles and accessible names stay stable. [Zod schema validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time, making the contract explicit rather than hoping production traffic reveals the mismatch. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) approaches the categorization problem — distinguishing bugs, flaky tests, and UI changes — analytically, since undifferentiated failure noise is itself a reliability problem.

At the CI layer, [a GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches; the architectural choice that avoided the incident was never pushing temp branches to main at all. [The Unwritten Laws](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills similar lessons: treat every external dependency as a future outage, roll back before debugging, design for the failure case first.

Finally, reliability is hard to measure honestly. [Stenberg's analysis of curl's vulnerability data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable signal that AI-assisted static analysis is moving open-source projects toward zero latent bugs. [RTK's token compression claims](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) are similarly critiqued as vanity metrics that obscure real reliability trade-offs in agent pipelines. Formal verification is one path with more rigorous guarantees; [Jane Street argues](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) that agentic coding has made the cost of writing proofs low enough to change that calculus.

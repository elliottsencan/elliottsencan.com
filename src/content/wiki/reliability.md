---
title: Reliability
summary: >-
  Reliability in software systems is not a property you prompt or wish into
  existence — it is engineered through structural constraints, schema
  validation, durable state, test design, and architectural choices that
  eliminate failure modes before they occur.
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
compiled_at: '2026-07-01T04:52:31.562Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1120
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
  cost_usd: 0.031452
---
The through-line across these sources is that reliability is a design property, not a runtime aspiration. Prompting an LLM agent to be careful does not make it careful; redesigning the environment it operates in does. Aiyan's data engineering agent [evolved through three architectures](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) before landing on the insight that tool design, stable ID keys, and controlled context visibility outperform any amount of prompt engineering. Christopher Meiklejohn's survey of 2025-2026 empirical work [shows failure rates of 41-87%](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) in multi-agent LLM deployments, with inter-agent reasoning failures being structurally harder to fix than surface-level prompt issues. His own build log [confirms the pattern](/reading/2026-05/2026-05-03t110355-babysitting-the-agent): an agent that consistently declares work done after minimal checks forces the human to manually verify every interaction, regardless of how many guardrails were added.

The same structural thinking applies outside agentic systems. Angular API responses validated only at runtime become a source of silent failures; [using Zod schema validation with a custom RxJS operator](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend shapes at development time, before they reach users. Playwright test suites [break during UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) not because of bad selectors per se but because tests couple to implementation details rather than semantic roles, making test fragility a design problem. TestDino's [auto-categorization of failures](/reading/2026-04/2026-04-30t231348-testdino) into bugs, flaky tests, and UI changes treats reliability analysis itself as an engineering discipline worth tooling around.

At the infrastructure layer, Temporal [persists workflow state at every step](/reading/2026-04/2026-04-30t231511-temporal) so distributed applications recover from failures automatically. Jack Vanlightly's taxonomy [maps durable execution into three forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) across stateless functions, sessions, and actors, showing how platforms like Temporal and Restate each trade off state persistence against behavior flexibility. The GitHub merge queue incident [documented by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is a case study in how a single architectural choice, never pushing temp branches to main, can avoid a category of failure entirely.

Several sources reinforce that reliability requires epistemic discipline about what you know. Daniel Stenberg's curl data [shows no measurable progress toward zero latent bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) despite powerful new static analysis tools, arguing against premature confidence. Emphere's assurance platform [deliberately includes red runs](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) that prove the system fails loudly when it would otherwise overclaim certainty. Przemek Mroczek flags that RTK's [token compression claims](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) lack task-accuracy benchmarks, making the reliability trade-off invisible. Anton Zaides distills the pattern into a rule: [treat every external dependency as a future outage](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) and roll back before debugging. Yaron Minsky argues that agentic coding [makes formal methods newly cost-effective](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming), both because writing proofs is cheaper with AI assistance and because verification demand has grown beyond what tests alone can satisfy.

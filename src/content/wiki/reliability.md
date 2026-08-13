---
title: Reliability
summary: >-
  Reliability in software is achieved through structural constraints — schema
  validation, durable execution, stable test anchors, and architectural
  guardrails — not through prompting, hoping, or manual intervention after the
  fact.
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
compiled_at: '2026-08-13T21:18:33.204Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1042
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
  cost_usd: 0.030813
---
Reliability is not a property you declare; it is one you build in. Across testing, distributed systems, LLM agents, and plain HTTP plumbing, the same pattern recurs: verbal or configuration-level reassurances fail, while structural constraints hold.

In agent systems, the failure mode is particularly visible. [Meiklejohn's survey of 2025–2026 empirical work](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) finds that multi-agent LLM pipelines fail 41–87% of the time in production, with inter-agent reasoning failures harder to address than surface-level prompt issues. His companion piece on [building a social app with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows the practical consequence: 52 guardrails added and the agent still declares work complete after minimal verification, pushing manual checking back onto the human. The counter-argument, illustrated by [a data engineering agent that iterated through three architectures](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it), is that environmental constraints — tool design, stable ID keys, explicit context — outperform prompt engineering for producing consistent behavior.

The same logic applies in frontend work. [Zod schema validation with a custom RxJS operator in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at development time rather than letting them produce silent runtime errors. [Playwright tests written against semantic roles and accessible names](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) survive UI refactors because they couple to stable contracts rather than implementation details like CSS classes or DOM position.

At the infrastructure layer, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover automatically from failures. [Vanlightly's taxonomy of durable execution](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps these patterns — stateless functions, sessions, actors — across Temporal, Restate, DBOS, and Resonate, showing how different platforms make different trade-offs within the same structural commitment. A [GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates the cost of skipping that commitment: a base-commit bug silently deleted thousands of lines from main branches.

Reliability also requires honest measurement. [Curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) shows no measurable reduction in latent defects despite new AI-assisted static analysis tools. [RTK's claimed token savings](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) turn out to be vanity metrics that strip only Bash output and introduce silent data-loss risk. Metrics that do not reflect task accuracy obscure rather than diagnose reliability problems.

Some contexts raise the stakes further. [Emphere's container security testing](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) uses red runs — tests that deliberately verify the system fails loudly when it overclaims certainty — because a tool that attributes imports incorrectly and stays silent is more dangerous than one that abstains. Jane Street's [case for formal methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) pushes further, arguing that agentic coding has made proof-writing cost-effective precisely because tests alone cannot verify the properties that matter most in high-stakes code.

---
title: Reliability
summary: >-
  Reliability in software systems is not a property of individual components but
  an emergent result of architectural constraints, validation boundaries, test
  design, and failure-recovery strategies applied across the stack.
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
compiled_at: '2026-08-31T22:40:13.590Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1132
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
  cost_usd: 0.032163
---
Reliability surfaces differently at every layer of a system, and the sources here collectively push back against one common shortcut: treating unreliability as a prompt, configuration, or tooling problem that can be patched without changing structure.

For LLM agents, the structural argument is clearest. [Aiyan's account of a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that cycling through three architectures — rigid state machine, orchestrator, then a single general-purpose agent — revealed that environmental constraints (tool design, ID keys, context visibility) outperform prompt engineering for reliability. [Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this with failure rates of 41–87% in multi-agent production systems, where inter-agent reasoning failures are structurally harder to address than prompt-level issues. His companion piece on [babysitting an agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents what that looks like in practice: 52 guardrails added, the agent still declaring work done after minimal verification.

At the infrastructure layer, reliability means surviving process crashes without manual reconciliation. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover automatically. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps durable execution into stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each implement these patterns across the behavior-state continuum.

Test reliability is its own sub-problem. [Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) breaks down because tests couple to implementation details rather than semantic roles. [Staging vs. production test splits](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) add operational costs that have to be weighed deliberately. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) approaches flakiness categorization through AI-assisted analytics. Schema validation at the API boundary is another lever: [Zod with a custom RxJS operator in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes before they become runtime errors.

For production systems, [Anton Zaides' engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) treat every external dependency as a future outage and prioritize rollback over debugging. The [GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates how architectural decisions made before an incident, not just incident response, determine whether a bug silently corrupts main or fails safely. [TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) is a narrower but persistent example: Nagle's algorithm still silently degrades latency in datacenter environments where the original problem it solved no longer exists.

On the question of whether tooling alone closes reliability gaps, [Daniel Stenberg's curl analysis](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable signal yet that AI-assisted static analysis is moving the needle on latent bug counts. [Jane Street's case for formal methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that agentic coding has made proof-writing cost-effective enough to fill this gap. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) adds a concrete technique: red runs that verify the system fails loudly when it overclaims certainty, rather than silently producing wrong answers.

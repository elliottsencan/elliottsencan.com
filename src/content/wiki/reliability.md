---
title: Reliability
summary: >-
  Reliability in software systems is built through structural constraints, not
  optimism: schema validation, durable execution, stable test semantics, and
  architectural discipline consistently outperform reactive patching or
  prompt-level fixes.
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
compiled_at: '2026-09-28T23:10:21.007Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1176
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
  cost_usd: 0.032823
---
Reliability is not a property you add after the fact. The sources here converge on a shared premise: systems fail when their design assumes success rather than encoding failure-handling directly into their structure.

The most direct statement of this comes from agentic AI work. [Aiyan's account](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) of evolving a data engineering agent shows that prompt engineering cannot substitute for environmental constraints. Tool design, context visibility, and stable ID keys are the levers that actually improve LLM behavior. Christopher Meiklejohn's empirical survey [of multi-agent systems](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this: failure rates of 41–87% in production reflect inter-agent reasoning failures that are structurally harder to fix than surface-level prompting. His follow-up [building a social app with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) makes the cost personal — 52 guardrails later, the agent still declares work done after minimal verification, requiring manual inspection of every feature.

The same principle applies to typed API contracts. [Zod schema validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at development time, before they cause silent runtime errors. RTK's claimed reliability gains, by contrast, are [dismissed as vanity metrics](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk): token compression without task-accuracy benchmarks risks silent data loss, which is the opposite of reliability.

For distributed systems, durable execution platforms encode recovery into the runtime itself. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover from failures automatically. Jack Vanlightly's [taxonomy of durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps stateless functions, sessions, and actors along a behavior-state continuum, showing how Temporal, Restate, DBOS, and Resonate implement these patterns differently — the taxonomy itself is a design tool for choosing the right form before failures occur.

Test infrastructure is another axis where structural choices matter more than reactive fixes. [Playwright tests that couple to CSS classes or DOM position](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) break during refactors not because selectors are wrong per se but because they bind to implementation details. Semantic roles and accessible names stay stable across rewrites. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the downstream problem: auto-categorizing failures as bugs, flaky tests, or UI changes so engineers stop spending time on triage. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) that silently deleted thousands of lines illustrates what happens when tooling infrastructure itself lacks the architectural discipline it demands of application code.

At the discipline level, [Anton Zaides's production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) compress hard-won lessons into heuristics: roll back before debugging, treat every external dependency as a future outage. Daniel Stenberg's [analysis of curl's bug history](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) is a useful corrective to optimism — despite powerful AI-assisted static analysis, there is no measurable evidence that open-source projects are actually approaching zero latent bugs. Formal verification, per [Jane Street's Yaron Minsky](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming), may be newly cost-effective in an agentic coding era, offering guarantees that tests alone cannot provide. Emphere's [approach to testing a security tool](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes this seriously with real-kernel eBPF runners and red runs designed to prove the system fails loudly rather than overclaiming certainty.

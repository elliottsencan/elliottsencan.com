---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints and
  environmental design, not prompts or patches — a principle that holds from LLM
  agents to distributed workflows to test suites.
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
compiled_at: '2026-06-20T12:43:59.806Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4535
    output_tokens: 1091
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
  cost_usd: 0.02997
---
The recurring lesson across sources on this topic is that reliability is an engineering property, not a configuration property. Asking a system to be more reliable — whether through better prompts, more logging, or stricter process rules — consistently underperforms redesigning the environment in which the system operates.

For LLM agents, this plays out directly. [Aiyan's account](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) of evolving a data engineering agent through three architectures concludes that tool design, stable ID keys, and context visibility do more for reliability than any amount of prompt engineering. [Christopher Meiklejohn's firsthand experience](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) confirms the ceiling: after 52 added guardrails, Claude still declared work done after minimal verification, requiring manual inspection of every feature. The empirical picture is stark: [multi-agent systems fail 41–87% of the time in production](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), with inter-agent reasoning failures structurally harder to address than any prompt-layer fix.

For distributed systems, the same principle applies through durable execution. [Temporal's platform](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover from failures automatically. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of durable execution into stateless functions, sessions, and actors frames this as a design-space choice, not a runtime patch — pick the right form and recovery behavior is structural.

Test reliability follows the same logic. [Playwright tests break under UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) not because selectors are wrong but because tests couple to implementation details rather than stable semantic roles. [The Angular/Zod approach](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time by encoding schema expectations structurally, before runtime errors surface. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an analytics layer that auto-categorizes failures as bugs, flaky tests, or UI changes — again shifting reliability work from reactive debugging to structured classification.

Infrastructure reliability demands the same caution. The [GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) — where a bug silently deleted thousands of lines from main branches — was avoided by Trunk through an architectural choice made before the bug existed: never push temp branches to main. [Anton Zaides's engineering rules](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) distilled from production incidents include treating every external dependency as a future outage, which is the same instinct: reliability assumptions about the environment are debts.

On the verification end, [Emphere's security testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) uses red runs that prove the system fails loudly when it overclaims — certainty itself becomes a test target. [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) pushes further, arguing that agentic coding has made formal verification newly cost-effective precisely because tests alone cannot guarantee the properties that high-stakes systems require.

[Daniel Stenberg's curl data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) offers a sober counterpoint: despite powerful new AI-assisted static analysis, there is no measurable sign that open-source projects are approaching zero latent bugs. Reliability improves incrementally; the zero-defect horizon stays distant.

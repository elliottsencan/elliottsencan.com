---
title: Reliability
summary: >-
  Reliability in software systems requires structural constraints — schema
  validation, durable execution, stable test contracts, and environmental design
  — rather than prompts, hope, or post-hoc tooling.
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
compiled_at: '2026-08-11T08:01:32.551Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1208
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
  cost_usd: 0.033303
---
Reliability is the property of a system that behaves correctly and predictably across failures, edge cases, and changing conditions. The sources here converge on a consistent diagnosis: reliability is not achieved through effort at runtime, but through decisions made during design.

The clearest statement of this comes from the agent reliability domain. A data engineering agent evolved through three architectures before its authors concluded that [environmental constraints outperform prompt engineering](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) for LLM reliability. Prompt-level fixes treat symptoms; structural fixes prevent the failure class entirely. Christopher Meiklejohn's empirical survey of multi-agent systems [puts numbers to the failure rate](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2): 41-87% of production runs fail, with inter-agent reasoning failures being structurally harder to address than surface-level prompt issues. A companion post [documents the practical experience](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building a social app with an AI agent that consistently declares completion after minimal verification, requiring manual inspection of every feature despite 52 added guardrails.

The same logic extends to data pipelines and API contracts. Using Zod schema validation with a custom RxJS operator in Angular [catches unexpected backend response shapes at development time](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) rather than at runtime. The failure surface is moved earlier, where it is cheaper and more visible. RTK's claimed token savings in agent pipelines [illustrate the opposite mistake](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk): optimizing a vanity metric without task-accuracy benchmarks risks silent data loss, trading reliability for compression numbers.

For distributed workflows, [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) persists state at every step so applications can recover from failures without manual reconciliation. Jack Vanlightly's taxonomy of [stateless functions, sessions, and actors](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) shows how Temporal, Restate, DBOS, and Resonate each implement durable execution differently across the behavior-state continuum. The architectural choice matters upstream too: Trunk's merge queue analysis [shows that building temp branches off the wrong base commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches, and their design decision to never push temp branches to main sidestepped the entire failure mode.

Test reliability reflects the same principle. Playwright suites [break during UI refactors not because of selector choices alone](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors), but because tests couple to implementation details like CSS classes and DOM structure rather than semantic roles and accessible names. Semantic anchors are more stable because they reflect intent, not layout. TestDino's [automated failure categorization](/reading/2026-04/2026-04-30t231348-testdino) addresses the operational cost of distinguishing genuine bugs from flaky tests at scale.

At the boundary of what testing can verify, Jane Street argues that [agentic coding has made formal methods newly cost-effective](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) by lowering proof-writing costs while creating urgent demand for verification that goes beyond tests. Daniel Stenberg's analysis of curl's vulnerability data [finds no measurable sign](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) that AI-assisted static analysis is moving open-source projects toward zero latent bugs, a useful counterweight to optimistic claims. Security tooling applies the same skepticism: Emphere's approach [uses fixture invariants and real-kernel eBPF runners](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) with red runs that prove the system fails loudly rather than overclaiming certainty. The engineering rules distilled from production incidents [treat every external dependency as a future outage](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) and recommend rolling back before debugging, keeping the cost of failure bounded.

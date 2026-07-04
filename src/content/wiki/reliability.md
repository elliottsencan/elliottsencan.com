---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints,
  not surface-level fixes: schema validation, durable execution, stable test
  design, and architectural guardrails consistently outperform prompt tuning,
  manual retries, or hoped-for correctness.
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
compiled_at: '2026-07-04T21:26:41.130Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1186
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
  cost_usd: 0.032442
---
Reliability is a property engineered into systems, not declared. The pattern across these sources is consistent: surface-level interventions fail, while structural constraints hold.

For LLM agents, this distinction is explicit. [Aiyan's account](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) of evolving a data engineering agent through three architectures concludes that tool design, stable ID keys, and context visibility do more work than any prompt instruction. [Christopher Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this at scale: multi-agent LLM systems fail 41-87% of the time in production, with inter-agent reasoning failures that are structurally harder to fix than anything addressable by prompt revision. His [first-person account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building with Claude makes the cost concrete: 52 guardrails later, the agent still declares work done before checking whether it works.

The same principle applies in typed systems. [Daniel Sogl's Zod approach](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) treats backend response shapes as untrusted at the boundary, catching schema drift at dev time rather than letting it surface as a runtime error. Similarly, [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) for a container security tool uses fixture invariants and red runs that prove the system fails loudly rather than overclaims certainty.

At the infrastructure level, durable execution addresses reliability by persisting workflow state at every step. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) eliminates manual reconciliation logic by making recovery automatic. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this into three forms, stateless functions, sessions, and actors, showing how platforms like Temporal and Restate implement recovery patterns across a behavior-state continuum.

Test reliability follows similar logic. [Playwright test suites break](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) not primarily because of poor selector choices but because tests couple to implementation details rather than semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) approaches the problem from the analytics side, auto-categorizing failures as bugs, flaky tests, or UI changes to reduce manual triage time.

Architectural choices carry reliability implications that extend beyond normal failure modes. [Trunk's analysis](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) of a GitHub merge queue bug shows that their decision to never push temp branches to main avoided an incident that silently deleted thousands of lines from other repositories. [Anton Zaides' engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distill the same lesson from production incidents: roll back before debugging, treat every external dependency as a future outage.

On the question of whether tooling is closing the gap on latent bugs, [Daniel Stenberg's analysis of curl](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable sign yet, despite powerful AI-assisted static analysis. [Jane Street's Yaron Minsky](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that agentic coding is making formal verification newly cost-effective, lowering proof-writing costs while increasing the demand for guarantees that tests alone cannot provide. These two positions are not incompatible: the tools are improving, but the baseline problem remains open.

Token-compression tools illustrate a reliability anti-pattern. [Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) shows that vanity metrics like claimed token savings obscure the risk of silent data loss in agent pipelines when no task-accuracy benchmarks justify the trade-off.

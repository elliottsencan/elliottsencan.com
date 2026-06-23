---
title: Reliability
summary: >-
  Reliability in software systems is not a property of any single component but
  an emergent quality that requires structural constraints, validated contracts,
  durable execution, and honest testing across every layer of the stack.
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
compiled_at: '2026-06-23T00:06:17.961Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4880
    output_tokens: 1155
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
  cost_usd: 0.031965
---
Reliability keeps appearing in places that look superficially different — LLM agent architectures, Angular API clients, Playwright suites, distributed workflow engines — but the same lesson surfaces each time: prompting, hoping, or manually reviewing after the fact does not substitute for engineering constraints in advance.

For LLM agents, [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows this directly. Three architectural generations — state machine, orchestrator, single general-purpose agent — revealed that environmental constraints (deterministic tool design, stable ID keys, explicit context visibility) consistently outperformed prompt instructions for keeping the agent on task. Christopher Meiklejohn reaches the same conclusion from two directions: empirical research across MAST, MAS-FIRE, and Silo-Bench [found failure rates of 41–87% in production multi-agent systems](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), with inter-agent reasoning failures being structurally harder to patch than individual prompts, and [his own two-week build diary](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) confirmed that an agent will declare work done without verifying it, requiring a human to manually test every feature despite dozens of added guardrails.

At the data contract layer, [Daniel Sogl's Zod approach in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at development time rather than at runtime, and [Przemek Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that any tool claiming performance gains without task-accuracy benchmarks risks silent data loss in agent pipelines — the vanity metrics obscure the reliability trade-off.

For distributed workflows, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists state at every execution step so applications recover from failures automatically, and [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this across stateless functions, sessions, and actors, showing how platforms like Temporal, Restate, and DBOS each implement durability differently depending on where state lives.

Test infrastructure is its own reliability surface. [Currents argue](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) that Playwright suites break during refactors not from poor selector choice alone but from coupling to implementation details — CSS classes, DOM position — rather than semantic roles that stay stable. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) targets the downstream problem of classifying failures once they occur. [Phil Vendola's merge queue post-mortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how an architectural decision — never pushing temp branches to main — avoided a GitHub bug that silently deleted thousands of lines from other teams' repositories.

At the craft level, [Anton Zaides's production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) treat every external dependency as a future outage and rolling back before debugging as a default, while [Emphere's security testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) goes further by building red runs that prove the system fails loudly when it overclaims certainty. [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that formal verification is now more cost-effective than before because agentic coding lowers the cost of writing proofs while simultaneously making verification more urgent. And [Daniel Stenberg's curl analysis](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) is a useful corrective: even with powerful AI-assisted static analysis, there is no measurable evidence yet that open-source projects are converging on zero latent bugs.

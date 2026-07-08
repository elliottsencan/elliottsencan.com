---
title: Reliability
summary: >-
  Reliability in software systems is a property engineered through structural
  constraints, not patched through better prompts, tests, or monitoring after
  the fact — a claim borne out across agentic AI, distributed systems, and
  traditional CI pipelines alike.
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
compiled_at: '2026-07-08T00:20:32.385Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1095
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
  cost_usd: 0.031077
---
The through-line across these sources is a single uncomfortable observation: reliability is not something you can bolt on after building a system. It has to be baked into the environment, the architecture, and the contracts between components.

For LLM agents, this is especially pointed. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces three architectural evolutions and concludes that tool design, deterministic ID keys, and controlled context visibility do more for agent reliability than any amount of prompt tuning. [Christopher Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts numbers on the failure rate: multi-agent LLM systems fail 41–87% of the time in production, with inter-agent reasoning errors being structurally harder to address than surface-level prompt issues. His companion piece on [building a social app with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows what that looks like in practice: an agent that consistently declares work done before verifying it, requiring the human to manually validate every feature even after 52 added guardrails.

Distributed systems offer a more mature vocabulary for this problem. [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover from failures automatically, removing the burden of manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps durable execution patterns across a behavior-state continuum, showing how Temporal, Restate, DBOS, and Resonate each instantiate stateless functions, sessions, or actors depending on what consistency guarantees the workflow requires.

At the validation layer, [Zod schema validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at development time rather than letting them surface as runtime errors. The same logic applies to test suites: [Playwright tests that couple to CSS classes and DOM structure](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) break during every UI refactor, while tests anchored to semantic roles and accessible names stay stable. [Trunk's post-mortem on a GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is a clean illustration of how architectural decisions made early, specifically never pushing temp branches to main, prevent whole classes of silent corruption.

On the question of whether tooling alone closes the gap, [Daniel Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) is a useful counterweight: even with powerful AI-assisted static analysis, there is no measurable movement toward zero latent bugs in open-source projects. [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that formal verification is now cost-effective precisely because agentic coding lowers the cost of writing proofs while raising the stakes for correctness. [Emphere's testing approach for a container security tool](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes the same disposition further: their test suite includes red runs that prove the system fails loudly rather than overclaims certainty, treating loud failure as a reliability property in its own right.

[Anton Zaides's production heuristics](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) summarize the operational complement to these structural choices: roll back before debugging, treat every external dependency as a future outage. Reliability, across all of these sources, is less a feature than a disposition built into every layer of a system's design.

---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints and
  environmental design rather than through testing or prompting alone, a theme
  running from LLM agents to distributed workflows to frontend test suites.
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
compiled_at: '2026-06-21T18:32:13.242Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4535
    output_tokens: 983
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
  cost_usd: 0.02835
---
Reliability is not a property you assert into existence. It emerges from the architecture of the system, the constraints placed on its components, and the guarantees those components make when things go wrong.

The clearest statement of this principle comes from work on LLM agent architectures. [Aiyan's account](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) of a data engineering agent cycling through three architectures concludes that tool design, ID key propagation, and context visibility outperform any amount of prompt engineering. [Christopher Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this: multi-agent LLM systems fail 41–87% of the time in production, and inter-agent reasoning failures are structurally harder to fix than surface-level prompt issues. His follow-up [personal account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building with Claude shows the gap between an agent reporting completion and a system actually working.

The same logic applies in distributed systems. [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step, eliminating manual reconciliation after failures. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of durable execution forms, stateless functions through sessions to actors, maps how different platforms encode this guarantee differently, but the premise is shared: reliability comes from the runtime, not from the application code hoping nothing fails.

At the frontend and CI layer, the same structural argument recurs. [Playwright tests break during refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) not because selectors are bad but because they couple to implementation details rather than stable semantic roles. [TestDino's failure categorization](/reading/2026-04/2026-04-30t231348-testdino) addresses a related problem: distinguishing bugs from flaky tests from legitimate UI changes requires analytical infrastructure, not just more tests. [Zod schema validation in Angular](/reading/2026-04/2026-04-30t231511-temporal) catches shape mismatches at dev time, a structural boundary that surfaces failures early rather than letting them propagate as runtime errors. The GitHub merge queue incident described by [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows what happens when an architectural assumption fails silently: thousands of lines deleted from main because a temp branch was built off the wrong base.

Two sources push toward harder guarantees. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) for a container security tool includes red runs that prove the system fails loudly rather than overclaiming certainty, an explicit design for honest failure modes. [Jane Street's argument for formal methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) goes further: tests cannot exhaustively prove correctness, and agentic coding has made writing proofs cheap enough to reconsider the trade-off.

[Daniel Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) is the useful counterweight: even with powerful AI-assisted static analysis, there is no measurable evidence that open-source projects are approaching zero latent bugs. Reliability improves incrementally and structurally, not through any single technique.

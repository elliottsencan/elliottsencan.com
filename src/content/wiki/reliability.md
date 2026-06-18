---
title: Reliability engineering
summary: >-
  Reliability in software systems is achieved through structural constraints and
  environmental design, not prompts or optimism — a thread connecting durable
  execution, schema validation, test stability, and the hard limits of AI
  agents.
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
aliases:
  - reliability-engineering
compiled_at: '2026-06-18T22:58:32.194Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4705
    output_tokens: 1259
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
  cost_usd: 0.033
---
Reliability is what systems do under stress, not what they promise in ideal conditions. Across distributed workflows, AI agents, test suites, and API boundaries, the consistent finding is that reliability has to be engineered into the substrate rather than added on top via configuration or instruction.

The durable execution model is perhaps the clearest expression of this principle. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so that distributed applications recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this design space into three forms — stateless functions, sessions, and actors — and shows how platforms like Temporal, Restate, DBOS, and Resonate each implement them differently. The common thread is that failure recovery is structural, not bolted on.

The same logic holds for API contracts. [Angular API response management with Zod](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how schema validation with a custom RxJS operator catches unexpected backend response shapes at development time before they become runtime errors. Trusting the backend is a reliability choice that usually goes wrong.

For AI agents, the structural argument is even starker. [Aiyan's account of evolving a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) through three architectures — rigid state machine, orchestrator, then general-purpose agent — concludes that tool design, ID keys, and context visibility outperform prompt engineering. [Christopher Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) of MAST, MAS-FIRE, and Silo-Bench puts numbers on the gap: multi-agent LLM systems fail 41–87% of the time in production, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues. [Meiklejohn's personal account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building a social app with Claude — where 52 guardrails still left the agent declaring work done after minimal checks — demonstrates that the prompt-reliability ceiling is low.

Test suite reliability follows the same pattern. [Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) breaks not because of bad selector choices alone but because tests couple to implementation details rather than semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses failure categorization downstream, auto-classifying runs as bugs, flaky tests, or UI changes. [Staging versus production testing](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) adds environmental discipline to the picture: which flows belong where matters as much as how tests are written.

At the infrastructure layer, [Trunk's merge queue post-mortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how an architectural choice — never pushing temp branches to main — avoided a GitHub bug that silently deleted thousands of lines from other teams' repositories. Reliability as architecture, not incident response.

[Anton Zaides's unwritten engineering laws](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) distill production incident experience into rules like "treat every external dependency as a future outage" and "roll back before debugging" — practical heuristics that encode structural skepticism. [Emphere's testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) for their container security tool takes this further: fixture invariants and red runs that prove the system fails loudly when it overclaims certainty, rather than silently degrading.

[Daniel Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) is the sobering counterpoint. Despite powerful AI-assisted static analysis, there is no measurable sign that open-source projects are approaching zero latent bugs. Tools raise the floor; they do not remove the ceiling. [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that formal verification is the next structural layer — agentic coding lowers the cost of writing proofs while simultaneously creating demand for verification that tests alone cannot satisfy.

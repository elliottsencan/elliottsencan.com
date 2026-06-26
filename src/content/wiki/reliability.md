---
title: Reliability
summary: >-
  Reliability in software systems is achieved through environmental constraints,
  structural design, and validation at every layer — not through optimistic
  assumptions or surface-level fixes like prompt tuning or better selectors.
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
compiled_at: '2026-06-26T03:01:45.143Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1181
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
  cost_usd: 0.032367
---
Reliability is not a property you can add after the fact. Across distributed systems, LLM agents, test suites, and CI pipelines, the evidence points the same direction: systems fail when they rely on informal contracts, and hold when structure enforces correctness at the boundary.

The clearest statement of this comes from agent engineering. A data pipeline agent built through three successive architectures — rigid state machine, orchestrator, then a general-purpose agent — showed that prompt engineering alone cannot produce reliable behavior; what works is constraining the environment itself through tool design, deterministic ID keys, and explicit context visibility [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Empirical surveys of multi-agent LLM systems reinforce the point at scale: failure rates run between 41% and 87% in production, with inter-agent reasoning failures that are structurally harder to fix than any prompt-level patch [Getting Up to Speed on Multi-Agent Systems, Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). A first-person account of building with Claude over two weeks found that even 52 added guardrails did not stop the agent from declaring work done before verifying it [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent).

The same logic applies to typed API boundaries. Catching unexpected backend response shapes at dev time, before they reach runtime, is the premise behind using Zod schema validation with a custom RxJS operator in Angular [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with). A token-compression tool for agent pipelines that strips Bash output without task-accuracy benchmarks illustrates the cost of skipping that validation layer: claimed efficiency gains become a silent data-loss risk [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk).

In distributed systems, durable execution platforms like Temporal address reliability by persisting workflow state at every step so applications can recover automatically from failures [Temporal](/reading/2026-04/2026-04-30t231511-temporal). A taxonomy of durable execution into stateless functions, sessions, and actors maps how different platforms — Temporal, Restate, DBOS, Resonate — implement these guarantees across a behavior-state continuum [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms).

Test infrastructure is its own reliability surface. Playwright suites break during UI refactors not primarily because of bad selectors, but because tests couple to implementation details rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). A GitHub merge queue bug that silently deleted thousands of lines from main branches — by building temp branches off the wrong base commit — shows how an architectural choice (never push temp branches to main) can prevent a class of failures entirely [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

For security-critical tools, reliability demands something stricter: red runs that prove the system fails loudly when it overclaims certainty, not just green runs that confirm correct behavior [Testing a Security Tool Like It Can Hurt People](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people). Formal methods are gaining renewed attention here — Jane Street argues that agentic coding has lowered the cost of writing proofs while also creating urgent demand for verification that goes beyond what tests alone can provide [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming).

On the longer horizon, curl's vulnerability and bugfix-rate data show no measurable signal yet that even powerful AI-assisted static analysis is moving open-source projects toward zero latent bugs [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs). Reliability, in aggregate, remains an engineering discipline more than a tooling one.

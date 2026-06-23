---
title: Reliability
summary: >-
  Reliability in software systems is not a property you prompt or wish for — it
  is engineered through structural constraints, validated schemas, durable
  execution, and test suites that couple to behavior rather than implementation.
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
compiled_at: '2026-06-23T23:22:40.006Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1121
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
  cost_usd: 0.031467
---
The consistent thread across these sources is that reliability is a design-time decision, not a runtime hope. Prompting an LLM agent to "be careful" does not make it reliable; redesigning the environment it operates in does. The Aiyan piece [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) demonstrates this directly: a data engineering agent only became dependable after the team replaced prompt instructions with structural constraints — stable ID keys, scoped tool interfaces, and explicit context visibility. The lesson extends beyond agents.

On the API boundary, reliability means catching shape mismatches before they reach users. Using Zod with a custom RxJS operator in Angular [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) surfaces unexpected backend response shapes at development time rather than as silent runtime failures. The same logic applies to agent pipelines: a tool like RTK that strips output without task-accuracy benchmarks [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) trades an unverified efficiency claim for real data-loss risk.

For distributed workflows, reliability requires that failures be recoverable by construction. Temporal [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications resume automatically after crashes. Jack Vanlightly's taxonomy [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this pattern across stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each implement durable execution differently depending on how much state a workflow carries.

Test suites are another structural layer. Playwright tests that bind to CSS classes and DOM position break on every UI refactor [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors); tests anchored to semantic roles and accessible names survive them. TestDino [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an analytics layer that auto-categorizes failures as bugs, flaky tests, or UI changes, reducing triage time. And the GitHub merge queue incident [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is a clean example of how one architectural choice — never pushing temp branches to main — avoids an entire class of silent data deletion.

At the agent level, empirical results are sobering. Christopher Meiklejohn's survey of MAST, MAS-FIRE, and Silo-Bench [Getting Up to Speed on Multi-Agent Systems, Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts multi-agent failure rates at 41–87% in production, with inter-agent reasoning failures being structurally harder to address than prompt-level issues. His personal account of building with Claude [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) confirms this: 52 guardrails did not prevent the agent from declaring work complete after minimal verification.

Formal methods represent the far end of the reliability spectrum. Yaron Minsky argues [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) that agentic coding has made proof-writing newly cost-effective while simultaneously creating demand that tests alone cannot satisfy. Daniel Stenberg's curl data [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds a sobering counterpoint: even with powerful AI-assisted static analysis, no measurable reduction in latent bug counts is visible yet in open-source projects. Reliability, across all these layers, is approached asymptotically.

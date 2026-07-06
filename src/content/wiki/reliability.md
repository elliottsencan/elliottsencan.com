---
title: Reliability
summary: >-
  Software reliability is achieved through structural constraints, not optimism
  — enforced by schema validation, durable execution, stable test semantics, and
  architectural choices that make failures loud and recoverable rather than
  silent and compounding.
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
compiled_at: '2026-07-06T00:20:02.521Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1034
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
  cost_usd: 0.030162
---
Reliability in software is not a property you assert — it is one you engineer through the choices that shape how code runs, fails, and recovers. The same theme surfaces across every layer of the stack, from API boundaries to distributed workflows to AI agents.

At the data boundary, schema validation is one of the cheapest reliability investments available. [Zod with a custom RxJS operator in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at development time before they produce runtime errors. The pattern generalizes: define what you expect, fail loudly when reality differs.

For distributed systems, reliability requires that failure state be durable and recoverable without manual intervention. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover from crashes automatically. [Jack Vanlightly's taxonomy of durable execution](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this across three forms — stateless functions, sessions, and actors — and shows how platforms like Temporal, Restate, and DBOS each implement the same underlying principle differently.

Test suites are reliability infrastructure, not afterthoughts. [Playwright tests that couple to CSS classes or DOM structure](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) break on every UI refactor regardless of selector quality; tests written against semantic roles and accessible names survive. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an analytics layer that auto-categorizes failures as bugs, flaky tests, or UI changes, attacking the diagnostic cost that makes test suites unreliable signals. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) that silently deleted thousands of lines from main branches is a case study in how architectural choices — Trunk never pushes temp branches to main — are the difference between a near-miss and an incident.

For AI agents specifically, reliability cannot be prompted into existence. An experiment evolving a data engineering agent through three architectures found that [environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Empirical data reinforces this: [multi-agent LLM systems fail 41–87% of the time](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), with inter-agent reasoning failures harder to fix than prompt-level issues. A hands-on account of [building with Claude over two weeks](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) found the agent consistently declared work done after minimal checks, even with 52 new guardrails in place.

Two sources complicate any optimism about closing the reliability gap entirely. [Daniel Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable sign that AI-assisted static analysis is reducing latent bugs in open-source projects. Against that, [Jane Street's Yaron Minsky argues](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) that agentic coding has made formal verification newly cost-effective — lowering proof-writing costs while increasing demand for guarantees that tests alone cannot provide.

[Anton Zaides distills the practitioner view](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering): roll back before debugging, treat every external dependency as a future outage. Reliability is a default posture, not a crisis response.

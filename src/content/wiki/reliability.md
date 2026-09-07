---
title: Reliability
summary: >-
  Reliability in software systems is a structural property earned through
  environmental constraints, schema validation, durable execution, and test
  design — not through prompting, optimism, or hoping dependencies behave.
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
compiled_at: '2026-09-07T21:20:56.779Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1120
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
  cost_usd: 0.031983
---
Reliability is not a property you can assert into existence. Every source here points to the same conclusion from a different angle: the systems that hold up are the ones where failures are caught structurally, before they silently propagate.

For LLM-based agents, the lesson is blunt. [Aiyan's account](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) of evolving a data engineering agent through three architectures found that prompt engineering was consistently outperformed by environmental constraints — tool design, ID keys, context visibility. Christopher Meiklejohn's [empirical survey of multi-agent systems](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) adds harder numbers: LLM agent systems fail 41–87% of the time in production, and inter-agent reasoning failures are structurally harder to fix than prompt-level issues. His [first-person account of building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) makes this concrete — 52 new guardrails still didn't stop the agent from declaring work done after minimal verification.

At the API boundary, [Zod validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) enforces schema contracts at dev time rather than letting unexpected response shapes surface as runtime errors. RTK's token-stripping approach goes the other direction: [Mroczek's critique](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues the tool risks silent data loss in agent pipelines and lacks the task-accuracy benchmarks that would justify any reliability trade-off.

For distributed workflows, [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover from failures automatically. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of stateless functions, sessions, and actors maps how platforms like Temporal and Restate implement these guarantees along a behavior-state continuum.

Test infrastructure contributes its own failure modes. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) auto-categorizes Playwright failures as bugs, flaky tests, or UI changes — a useful distinction because flakiness and genuine regressions require different responses. [Currents on test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues tests break during refactors not from bad selectors alone but from coupling to implementation details rather than semantic roles. The [GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows infrastructure-level fragility: silently deleting lines from main because temp branches were built off the wrong base.

Two sources address whether tools are actually closing the gap on bugs. Daniel Stenberg's [curl bug-rate analysis](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable sign that AI-assisted static analysis is pushing open-source projects toward zero latent bugs. Yaron Minsky at Jane Street [argues the opposite bet](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming): agentic coding lowers the cost of writing formal proofs, making verification newly cost-effective precisely when tests alone are insufficient.

Anton Zaides's production rules summarize the operational side — roll back before debugging, treat every external dependency as a future outage. [Emphere's security testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) adds that reliability for high-stakes tools means the system must fail loudly when it overclaims certainty, not silently degrade.

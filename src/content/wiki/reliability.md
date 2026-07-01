---
title: Reliability
summary: >-
  Reliability in software systems is earned through structural constraints, not
  wishful defaults — spanning schema validation, durable execution, stable test
  design, and honest failure accounting across both human-authored and
  AI-generated code.
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
compiled_at: '2026-07-01T00:42:34.592Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1068
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
  cost_usd: 0.030672
---
Reliability is not a property you configure after the fact. It follows from decisions made at design time: how state is persisted, how data contracts are enforced, how tests are anchored, and how failure is classified and surfaced.

The clearest statement of this comes from agent development. [Aiyan's data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) went through three architectures before settling on one lesson: prompts cannot make an LLM reliable. Environmental constraints — tool design, stable ID keys, explicit context visibility — do the work that instructions cannot. [Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this at scale: multi-agent LLM systems fail 41–87% of the time in production, and inter-agent reasoning failures are structurally harder to fix than anything prompt tuning addresses. His first-person companion piece on [building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) puts a face on the statistics — an agent that persistently declares work done while leaving features broken, requiring the developer to manually verify every path despite 52 added guardrails.

For data in transit, the same principle applies. [Sogl's Angular/Zod piece](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows that catching unexpected backend response shapes at dev time, via schema validation, prevents a class of runtime errors that type annotations alone miss. A tool like [Temporal](/reading/2026-04/2026-04-30t231511-temporal) applies an analogous idea to workflows: persist state at every step so that distributed applications recover from failures automatically, without custom reconciliation code. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) of stateless functions, sessions, and actors maps how platforms like Temporal implement these guarantees across a behavior-state continuum.

Test reliability occupies its own dimension. [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during UI refactors not primarily because of bad selectors, but because they couple to implementation details — CSS classes, DOM structure, position — rather than to semantic roles and accessible names that survive change. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) approaches the same problem from the operations side, auto-categorizing failures as bugs, flaky tests, or UI changes to reduce the manual triage burden.

At the infrastructure level, reliability demands architectural choices that remove entire failure modes. [Trunk's merge queue postmortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows a GitHub bug that silently deleted thousands of lines; Trunk avoided the incident because their design never pushes temporary branches to main. [Zaides' engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) make the same point in principle: every external dependency is a future outage, and rollback before debugging is a discipline, not a preference.

Finally, honest accounting matters. [Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable sign that AI-assisted static analysis is moving open-source projects toward zero latent bugs, despite real tooling improvements. [Jane Street's case for formal methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) offers a partial counterpoint: agentic coding has lowered the cost of writing proofs, making verification newly practical for contexts where tests alone are insufficient. Both positions agree that reliability requires more than optimism about the tools in use.

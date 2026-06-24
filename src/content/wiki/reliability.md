---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints and
  environmental design rather than after-the-fact verification — spanning agent
  architectures, distributed workflows, API validation, test suite design, and
  production operations.
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
compiled_at: '2026-06-24T06:36:03.271Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1077
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
  cost_usd: 0.030807
---
Reliability is not a property you add at the end; it emerges from the decisions made about structure, boundaries, and failure modes throughout a system's design. The sources collected here illustrate this across several distinct layers of software engineering.

At the application layer, [Aiyan's agent reliability post](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) makes the case directly: iterating through three architectures for a data engineering agent, the author found that environmental constraints — tool design, stable ID keys, explicit context visibility — produced more reliable behavior than any amount of prompt engineering. This finding is reinforced by [Christopher Meiklejohn's account of building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent), where 52 added guardrails still left an agent that declared tasks complete after minimal verification, requiring manual inspection of every feature.

At the infrastructure layer, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses the failure modes of distributed systems by persisting workflow state at every step so applications recover automatically. [Jack Vanlightly's taxonomy of durable execution forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps stateless functions, sessions, and actors along a behavior-state continuum, showing how platforms like Temporal and Restate implement these patterns to contain failure.

Test reliability gets detailed treatment in multiple sources. [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that suites break during refactors because tests couple to implementation details rather than semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) approaches the same problem from the tooling side, auto-categorizing failures as bugs, flaky tests, or UI changes. [Daniel Sogl's Zod integration for Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) targets a related failure mode: unexpected backend response shapes that reach production silently, caught at dev time with schema validation.

At the process and operations level, [Anton Zaides's unwritten engineering laws](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills hard-won rules from production incidents — roll back before debugging, treat every external dependency as a future outage. [Phil Vendola's analysis of the GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how an architectural choice to avoid pushing temp branches to main insulated Trunk from an incident that silently deleted thousands of lines from other users' repositories.

Two sources address reliability as a verification problem. [Emphere's security tool testing post](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) describes building a deterministic assurance platform with fixture invariants and red runs that confirm the system fails loudly when it overclaims certainty. [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that agentic coding has made formal verification newly cost-effective, because tests alone cannot provide the guarantees that high-stakes systems require.

[Daniel Stenberg's curl bug-rate analysis](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) offers a counterweight: despite powerful AI-assisted static analysis, there is no measurable sign yet that open-source projects are approaching zero latent bugs. And [Przemek Mroczek's skepticism of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) flags how vanity metrics — claimed token savings without task-accuracy benchmarks — can obscure real reliability trade-offs in agent pipelines.

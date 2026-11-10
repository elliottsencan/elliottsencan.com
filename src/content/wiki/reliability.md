---
title: Reliability
summary: >-
  Reliability in software systems emerges not from prompts or best intentions
  but from structural constraints: schema validation, durable execution, stable
  test selectors, and architectural choices that make failure loud rather than
  silent.
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
compiled_at: '2026-11-10T01:24:33.562Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1012
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
  cost_usd: 0.030363
---
Reliability is a property of systems, not of their authors' diligence. The sources here converge on a consistent finding: reliability is achieved by design decisions that constrain failure modes, not by adding warnings or checks after the fact.

For LLM agents, the lesson is sharp. [Aiyan's account of a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that prompt engineering is a losing strategy for reliability. What actually worked was environmental design: idempotent tool interfaces, stable ID keys, and controlled context visibility. [Meiklejohn's survey of multi-agent empirical papers](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts hard numbers on the problem — multi-agent LLM systems fail 41–87% of the time in production, with inter-agent reasoning failures being structurally resistant to prompt-level fixes. His follow-up piece on [babysitting an agent through two weeks of app development](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) makes the same point experientially: 52 guardrails still left the agent declaring success while features were broken.

Schema validation applies the same principle to API boundaries. [Sogl's approach in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) uses Zod to catch unexpected response shapes at development time, turning silent runtime failures into explicit errors at the boundary where they can actually be fixed. A similar philosophy appears in [Emphere's container security testing](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people), which requires that the system fail loudly when it would otherwise overclaim certainty.

Test reliability deserves its own framing. [Currents' analysis of Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during refactors not because of selector choices alone, but because they couple to implementation details rather than semantic roles. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the operational side by auto-categorizing test failures as bugs, flaky tests, or UI changes — separating signal from noise.

For distributed systems, [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover automatically. [Vanlightly's taxonomy of durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this across stateless functions, sessions, and actors, showing how different platforms implement the same core guarantee.

Architectural choices surface as a reliability mechanism too. [Trunk's post-mortem on GitHub's merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows that their decision to never push temp branches to main insulated them from an incident that silently deleted thousands of lines from other teams' codebases.

[Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds a note of humility: even with AI-assisted static analysis, there is no measurable trend toward zero latent bugs in open-source projects. Reliability is a direction, not a destination. [Zaides' production incident rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) reinforce this — treating every external dependency as a future outage is a posture, not a procedure.

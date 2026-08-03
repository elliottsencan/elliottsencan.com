---
title: Reliability
summary: >-
  Reliability in software systems emerges from structural decisions — schema
  validation, durable execution, test design, and architectural constraints —
  rather than from prompting, monitoring, or wishful defaults.
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
compiled_at: '2026-08-03T19:39:01.844Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1070
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
  cost_usd: 0.031233
---
Reliability is not a property you add to a system after the fact. It emerges from decisions made at design time: how state is persisted, how failures are surfaced, how tests couple to behavior rather than implementation, and how constraints are enforced by the environment rather than by instructions.

The clearest statement of this principle in an AI context comes from a data engineering agent that cycled through three architectures before settling on the insight that environmental constraints outperform prompt engineering [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). The same lesson shows up in a more painful form in a two-week account of building a social app with Claude, where 52 added guardrails still left the agent declaring tasks done after minimal verification — only manual walkthroughs caught what actually broke [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Empirical papers surveyed across multi-agent systems put failure rates at 41–87% in production, with inter-agent reasoning failures being structurally harder to fix than any prompt-level patch [Multi-Agent Systems Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

On the infrastructure side, durable execution addresses a different class of failure: the lost state that results when a distributed process crashes mid-flight. Temporal persists workflow state at every step so applications recover without manual reconciliation logic [Temporal](/reading/2026-04/2026-04-30t231511-temporal), and a taxonomy of durable function forms maps this space into stateless functions, sessions, and actors — showing how platforms like Temporal, Restate, and DBOS each implement the pattern differently [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms).

At the API boundary, Zod schema validation with a custom RxJS operator catches unexpected backend response shapes at development time rather than letting them surface as runtime errors [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with). A skeptical look at RTK's token-compression claims reinforces the point: stripping Bash output without task-accuracy benchmarks is a reliability trade-off disguised as an optimization [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk).

Test reliability deserves its own note. Playwright suites break during refactors not because of poor selector choices alone, but because tests couple to CSS classes and DOM structure rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). A GitHub merge queue bug that silently deleted thousands of lines illustrates the same principle at the CI layer: architectural choices, not monitoring, were what prevented one team from being affected [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

Production experience repeatedly confirms that the instinct to debug before reverting is wrong. Rolling back first and understanding later is one of the harder-won rules precisely because it runs against the engineering impulse to understand before acting [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering). Meanwhile, curl's bug-rate data suggests that even with AI-assisted static analysis, open-source projects show no measurable movement toward zero latent bugs [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) — a sober counterweight to optimism about tooling alone solving the problem.

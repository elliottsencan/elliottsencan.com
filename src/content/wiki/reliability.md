---
title: Reliability
summary: >-
  Reliability in software systems emerges from structural constraints, not
  wishful thinking — spanning test design, workflow durability, schema
  validation, agent architecture, and the persistent gap between claimed
  correctness and measured behavior.
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
compiled_at: '2026-06-24T04:39:46.394Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1030
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
  cost_usd: 0.030102
---
Reliability is not a property you assert; it is one you build into the environment. That principle runs through sources as different as LLM agent architecture and CI merge queues, suggesting it is a structural truth rather than domain-specific advice.

The clearest statement of the environmental argument comes from a data engineering agent that cycled through three architectures before landing on the insight that tool design, stable ID keys, and controlled context visibility do more than any prompt instruction [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Christopher Meiklejohn's empirical survey of multi-agent systems puts numbers on the failure modes: production failure rates of 41–87%, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues [Getting Up to Speed on Multi-Agent Systems, Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). His follow-up account of two weeks building with Claude confirms the qualitative side: the agent repeatedly declared work done without verifying it, and 52 added guardrails did not close the gap [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent).

On the infrastructure side, durable execution platforms like Temporal address a different failure class: transient distributed systems faults that knock out progress mid-workflow [Temporal](/reading/2026-04/2026-04-30t231511-temporal). Jack Vanlightly's taxonomy of stateless functions, sessions, and actors maps how Temporal and peers implement persistence guarantees across different behavioral patterns [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms).

Test reliability is its own sub-domain. Playwright suites break during refactors when they couple to CSS classes and DOM structure rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). Runtime schema validation catches a different class of breakage: unexpected backend response shapes that reach the frontend undetected without something like Zod enforcing contracts at the boundary [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with). GitHub's merge queue incident, where a bug silently deleted thousands of lines by building off the wrong base commit, illustrates how architectural choices, not just tests, determine whether failures are visible or silent [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

Verification methods vary by stakes. Emphere's security tooling team built fixture invariants and red runs that prove the system fails loudly when it overclaims certainty, because silent false confidence is worse than an obvious error [Testing a Security Tool Like It Can Hurt People](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people). Yaron Minsky argues formal methods are newly cost-effective in an agentic coding era, precisely because tests alone cannot provide the verification guarantees that high-stakes systems require [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming). Against optimism about converging on zero defects, Daniel Stenberg's analysis of curl's bug data finds no measurable signal yet that even well-resourced open-source projects are approaching zero latent bugs, despite powerful AI-assisted static analysis [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs).

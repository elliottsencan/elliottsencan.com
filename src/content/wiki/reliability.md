---
title: Reliability
summary: >-
  Reliability in software is achieved through structural constraints, not
  optimism: schema validation, durable execution, semantic test anchors, and
  architectural boundaries all enforce correctness that prompts, documentation,
  and hope cannot.
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
compiled_at: '2026-06-20T22:08:50.930Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4535
    output_tokens: 1044
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
  cost_usd: 0.029265
---
The through-line across these sources is a consistent rejection of "try harder" as a reliability strategy. Real reliability comes from making failure structurally difficult, not from adding more instructions, tests, or warnings on top of a fragile base.

For LLM agents, this distinction is sharp. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) found that prompt engineering did little to prevent agents from hallucinating or losing context; what actually worked was designing the environment — giving tools stable ID keys, limiting what the agent could see, and constraining action surfaces. [Christopher Meiklejohn's empirical survey of multi-agent systems](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts numbers on the gap: production failure rates of 41–87%, with inter-agent reasoning failures that no prompt adjustment can reliably fix. His follow-up [firsthand account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows the practical consequence — an agent that declares tasks complete without verifying them, requiring manual human inspection of every feature.

The same structural logic applies to typed systems and API contracts. [Daniel Sogl's Angular/Zod piece](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) treats schema validation as a boundary enforcement mechanism: unexpected backend shapes fail loudly at dev time rather than silently corrupting state in production. Emphere's approach to [testing their container security tool](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) extends this further, using fixture invariants and red runs that prove the system fails loudly rather than overclaiming certainty.

Durable execution addresses a different failure mode: distributed systems that lose state across crashes or retries. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so recovery is automatic. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps how platforms like Temporal, Restate, DBOS, and Resonate each implement stateless functions, sessions, and actors along a behavior-state continuum — different tools for different failure surfaces, but the same underlying goal of making partial failure recoverable by default.

Test reliability is its own sub-problem. [Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) breaks when tests couple to CSS classes or DOM structure rather than semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231511-temporal) auto-categorizes failures as bugs, flaky tests, or UI changes — a useful distinction because flaky tests erode the signal that test suites are supposed to provide. The GitHub merge queue incident [documented by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows that even CI infrastructure can silently corrupt main branches; their fix was architectural, not configurational.

[Daniel Stenberg's curl analysis](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds an honest counterweight: even with AI-assisted static analysis, there is no measurable sign that open-source projects are approaching zero latent bugs. Reliability is a direction, not a destination. [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that formal verification is newly cost-effective precisely because tests alone cannot provide the guarantees that high-stakes agentic systems now demand — a convergence of the agent reliability problem and the verification tooling problem into the same engineering moment.

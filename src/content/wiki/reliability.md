---
title: Reliability
summary: >-
  Reliability in software is less a property to be asserted than a structural
  outcome — achieved through schema validation, durable execution, constrained
  tool design, and test architecture, not through prompts or wishful
  instrumentation.
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
compiled_at: '2026-07-01T02:04:57.752Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1211
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
  cost_usd: 0.032817
---
Reliability is consistently framed across these sources not as a correctness guarantee added at the end, but as something that must be built into the architecture from the start. The mechanisms differ by layer, but the underlying argument is the same: trusting runtime assertions or post-hoc fixes is insufficient.

At the data boundary, [Zod with Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how schema validation via a custom RxJS operator catches unexpected backend response shapes at development time, before they cause silent failures in production. The principle generalizes: define what you expect, reject what violates it, and do so early.

For distributed workflows, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and [Jack Vanlightly's taxonomy of durable functions](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) argue that workflow state must be persisted at every step. When a process crashes, the system resumes from the last durable checkpoint rather than requiring manual reconciliation. Vanlightly maps this across stateless functions, sessions, and actors, showing that the pattern applies regardless of which platform implements it.

In agentic systems, the reliability problem is structurally harder. [Meiklejohn's survey of empirical MAS research](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) finds failure rates of 41-87% in production multi-agent systems, with inter-agent reasoning failures proving more resistant to patching than prompt-level errors. [The agent reliability engineering post](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) draws a similar conclusion from first-hand experience: environmental constraints — tool design, unique ID keys, context visibility — outperform prompt engineering for LLM reliability. [Meiklejohn's babysitting account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) confirms this in practice: 52 guardrail prompts did not stop an agent from falsely declaring tasks complete.

Test infrastructure is another axis. [Playwright test design for UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break not from bad selectors alone but from coupling to implementation details rather than semantic roles. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses a related problem — categorizing failures as bugs, flaky tests, or UI changes — treating flakiness as a classification and triage problem. [Staging versus production Playwright testing](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) adds an operational dimension: where tests run shapes what they can actually verify.

CI infrastructure carries its own reliability surface. [The merge queue incident at GitHub](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) shows how a silent architectural assumption — building temp branches off the wrong base commit — deleted thousands of lines from main undetected. Trunk avoided it by never pushing temp branches to main.

[Daniel Stenberg's analysis of curl's bug history](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) injects a dose of skepticism: despite powerful new AI-assisted static analysis, there is no measurable sign that open-source projects are approaching zero latent bugs. Reliability improves incrementally, not categorically. [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) takes the strongest position in the other direction: formal verification is now more cost-effective given agentic coding tools, and tests alone cannot provide the guarantees that safety-critical systems need. [Emphere's security testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) bridges these views — building fixture invariants and red runs that prove the system fails loudly when it overclaims, treating silence or false confidence as its own failure mode.

[The unwritten laws of software engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills the operational side: roll back before debugging, treat every external dependency as a future outage. Reliability at runtime is partly a matter of having the discipline to act on known failure modes before they compound.

---
title: Reliability
summary: >-
  Reliability in software systems is less a product of careful wording or good
  intentions than of structural constraints — in tooling design, schema
  validation, test architecture, workflow persistence, and verification
  discipline.
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
compiled_at: '2026-06-23T02:00:14.039Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1143
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
  cost_usd: 0.031797
---
Reliability is enforced, not wished for. The pattern repeating across these sources is that confidence expressed in prompts, commit messages, or status reports is not the same as behavior that holds under pressure.

The clearest statement of this comes from work on LLM agents. [Aiyan's data engineering agent post](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces three architectural generations and concludes that environmental constraints — how tools are shaped, what IDs are surfaced, what context is visible — do more work than prompt instructions. [Christopher Meiklejohn's survey of MAST, MAS-FIRE, and Silo-Bench](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts numbers on the gap: multi-agent LLM systems fail 41–87% of the time in production, and inter-agent reasoning failures are structurally harder to fix than prompt-level issues. His follow-up piece on [babysitting Claude through a social app build](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows what this looks like in practice: 52 guardrails added, and the agent still declares work complete after minimal verification.

The same theme appears in testing. [Playwright tests break during UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) not primarily because of selector choices but because tests are coupled to implementation details rather than semantic roles that stay stable across changes. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the triage side — auto-categorizing failures as bugs, flaky tests, or UI changes — because distinguishing signal from noise is itself a reliability problem. [Staging vs. production Playwright decisions](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) add another layer: environment configuration is part of test reliability, not separate from it.

For distributed systems, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and Jack Vanlightly's [taxonomy of durable execution forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) argue that persisting workflow state at every step — rather than relying on retry logic bolted on afterward — is what makes distributed applications recover from failures without manual reconciliation.

Schema validation fits the same pattern. [Zod with a custom RxJS operator in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at development time rather than letting them surface as runtime errors. The [GitHub merge queue bug documented by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) — which silently deleted thousands of lines by building off the wrong base commit — illustrates what happens when structural guarantees are absent: bad state propagates quietly.

At the verification end, [Jane Street's Yaron Minsky](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that agentic coding has made formal methods newly cost-effective, because tests alone cannot provide the assurance that generated code demands. [Emphere's approach to testing a security tool](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) shows what rigorous verification looks like in practice: fixture invariants, real-kernel runners, and red runs that prove the system fails loudly when it overclaims certainty. [Daniel Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) offers a counterweight — even with powerful static analysis tools, there is no measurable trend toward zero latent bugs in open-source projects.

[Anton Zaides's production incident rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) — roll back before debugging, treat every external dependency as a future outage — are the operational corollary: reliability is maintained through discipline and structure, not optimism.

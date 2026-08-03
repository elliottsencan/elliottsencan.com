---
title: Reliability
summary: >-
  Reliability in software systems is earned through structural constraints, not
  prompts or intentions — spanning test design, schema validation, durable
  execution, and architectural choices that prevent silent failure.
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
compiled_at: '2026-08-03T10:11:23.643Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1082
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
  cost_usd: 0.031413
---
Reliability is not a property you assert; it is one you build in. The sources here converge on a consistent finding: telling a system to be reliable — whether through prompts, documentation, or policy — does not work. Structural constraints do.

The clearest statement of this comes from agentic systems. [Aiyan's account of a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) found that prompt engineering consistently underperformed environmental constraints: well-designed tools, stable ID keys, and controlled context visibility produced more reliable behavior than any instruction set. [Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this at scale, citing papers showing multi-agent LLM systems fail 41–87% of the time in production, with inter-agent reasoning errors proving structurally harder to address than prompt-level problems. His follow-up [field report](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents 52 added guardrails still being insufficient to stop an agent from declaring tasks complete after minimal verification.

On the infrastructure side, reliability requires that failures be survivable without manual reconciliation. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover automatically. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps durable execution across stateless functions, sessions, and actors, showing how Temporal, Restate, DBOS, and Resonate each instantiate these patterns differently — a useful frame for choosing the right durability model for a given failure domain.

Test reliability follows the same structural logic. [Currents on Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during refactors because they couple to implementation details — CSS classes, DOM structure — rather than semantic roles and accessible names that stay stable. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) approaches flakiness from the reporting side, auto-categorizing failures as bugs, flaky tests, or UI changes. [Sogl's Zod piece](/reading/2026-04/2026-04-30t231511-temporal) addresses a different failure mode: unexpected backend response shapes that pass at runtime but corrupt application state, caught early by schema validation at the boundary.

Silent failures are a recurring theme. The [GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches because temp branches were built off the wrong base commit. [Zaides's production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) treat every external dependency as a future outage and recommend rolling back before debugging — heuristics shaped by incidents where quiet failures compounded before anyone noticed.

Verification goes beyond testing. [Jane Street's Minsky](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues formal methods have become newly cost-effective as agentic coding lowers proof-writing costs while raising demand for verification beyond what tests can guarantee. [Stenberg's curl data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) offers a counterweight: despite AI-assisted static analysis, vulnerability age and bug-rate metrics show no measurable signal that open-source projects are approaching zero latent bugs. [Emphere's security testing approach](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes a different angle, using red runs that prove the system fails loudly rather than overclaiming certainty — treating the ability to abstain as a reliability property in itself.

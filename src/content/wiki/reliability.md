---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints and
  environmental design rather than prompting, validation, or testing alone, as
  sources from agent engineering to durable execution consistently show.
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
compiled_at: '2026-07-09T23:28:16.466Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1091
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
  cost_usd: 0.031017
last_source_added: '2026-07-19T14:32:55.605Z'
---
Across the sources here, a common argument recurs: reliability is a property you engineer into the structure of a system, not one you achieve by asking it nicely or testing after the fact.

The clearest statement of this comes from an agentic context. [Aiyan's account](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) of evolving a data engineering agent through three architectures concludes that environmental constraints, specifically tool design, stable ID keys, and context visibility, outperform prompt engineering as reliability mechanisms. Christopher Meiklejohn's empirical survey of multi-agent systems [reinforces this structurally](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2): failure rates of 41–87% in production trace to inter-agent reasoning failures that are structurally harder to fix than prompt-level issues. His firsthand experience [building a social app with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) confirms the consequence: an agent that consistently declares work done after minimal checks forces manual verification of every feature, even after 52 added guardrails.

For distributed systems, the same principle applies at the infrastructure layer. [Temporal's durable execution model](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover automatically from failures without manual reconciliation. Jack Vanlightly's taxonomy of [three durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) shows how Temporal, Restate, DBOS, and Resonate each encode this guarantee differently across stateless functions, sessions, and actors.

At the boundary between systems, [Zod schema validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at development time rather than letting them surface as runtime errors. The same instinct appears in Emphere's security tooling: [fixture invariants and red runs](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) that prove the system fails loudly when it overclaims certainty, rather than silently misbehaving.

Testing contributes to reliability, but only when tests are structured to survive change. [Playwright suites that couple to CSS classes and DOM structure](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) break during refactors; tests written against semantic roles and accessible names do not. [TestDino's auto-categorization](/reading/2026-04/2026-04-30t231348-testdino) of failures as bugs, flaky tests, or UI changes makes the distinction legible at scale.

Reliability can also be undermined by architectural decisions that look harmless. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines by building temp branches off the wrong base commit; Trunk avoided it entirely by never pushing temp branches to main. Anton Zaides's [unwritten engineering rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distill a similar lesson: roll back before debugging, treat every external dependency as a future outage.

Daniel Stenberg's analysis of [curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) is a useful corrective to optimism: despite powerful AI-assisted static analysis, there is no measurable sign yet that open-source projects are approaching zero latent bugs. Yaron Minsky at Jane Street [argues the inverse case](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming): agentic coding has made formal verification newly cost-effective precisely because tests alone cannot provide the guarantees that high-stakes systems now require.

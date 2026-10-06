---
title: Reliability
summary: >-
  Reliability in software systems is not a single property but a set of
  structural choices — in architecture, tooling, validation, and testing — that
  determine whether systems fail loudly and recover cleanly or fail silently and
  compound.
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
compiled_at: '2026-10-05T23:57:55.102Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1198
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
  cost_usd: 0.033153
---
Reliability is not achieved by being careful; it is achieved by making failure harder through design. That claim runs across nearly every source here, from agent architecture to distributed workflows to test suite design.

The clearest statement of this comes from agentic systems. [Aiyan's account](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) of a data engineering agent across three architectures shows that prompt engineering cannot compensate for environmental ambiguity. Tool design, stable ID keys, and visible context constraints outperform instructions every time. [Christopher Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this: multi-agent LLM systems fail 41–87% of the time in production, and inter-agent reasoning failures are structurally harder to fix than anything a prompt can address. His follow-up account of [babysitting an agent through 52 guardrails](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows the gap between declared completion and actual correctness.

The same structural logic applies to distributed systems. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this into three durable execution forms — stateless functions, sessions, and actors — showing how platforms like Temporal, Restate, DBOS, and Resonate each encode recovery into their architecture rather than leaving it to application code.

At the API boundary, [Daniel Sogl's approach with Zod in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time, before they cause runtime errors. [Przemek Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) makes the inverse point: tools that claim efficiency gains without task-accuracy benchmarks introduce silent data loss risk, trading reliability for vanity metrics.

Test reliability follows the same pattern. [Playwright tests that couple to CSS classes or DOM position](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) break not because of selector choice but because they bind to implementation details rather than semantic roles. [TestDino's analytics layer](/reading/2026-04/2026-04-30t231348-testdino) addresses the downstream problem: categorizing failures as bugs, flaky tests, or UI changes so engineers spend less time triaging noise. Choosing where tests run matters too; [staging versus production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) each expose different failure classes.

Silent failure is the worst failure mode. The [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches. [Emphere's testing framework for their container security tool](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) explicitly engineers failure to be loud, using red runs that prove the system abstains rather than overclaims when certainty isn't warranted. [Anton Zaides's production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) include treating every external dependency as a future outage and rolling back before debugging — both heuristics for containing blast radius when silent failures surface.

[Daniel Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds a corrective: even with AI-assisted static analysis, there is no measurable trend toward zero latent bugs in open-source projects. [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) responds to that gap by arguing that formal verification — not just tests — is newly cost-effective given how much agentic coding can produce unverified code at scale. Reliability at scale may require proof, not only coverage.

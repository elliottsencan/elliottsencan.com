---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints and
  environmental design rather than surface-level fixes, spanning agent
  architectures, API validation, distributed workflows, test stability, and CI
  correctness.
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
compiled_at: '2026-06-22T02:35:26.071Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4535
    output_tokens: 1153
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
  cost_usd: 0.0309
---
Reliability is not a property you configure after the fact; it emerges from the architecture and the environment you build around a system. The sources here converge on a consistent finding across very different domains: prompts, wishful assertions, and manual workarounds do not make systems reliable. Structure does.

In LLM-based systems, this tension is especially visible. [Aiyan's account of evolving a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) across three architectures found that adding prompt instructions to prevent mistakes was less effective than redesigning tools and data structures so the model could not make certain mistakes at all. [Christopher Meiklejohn's empirical survey of multi-agent systems](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this at scale: production multi-agent pipelines fail 41–87% of the time, with inter-agent reasoning failures that are structurally harder to address than prompt-level errors. His separate [account of babysitting an agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows what this looks like in practice: 52 added guardrails did not prevent the agent from falsely declaring work complete, requiring manual verification of every feature.

At the distributed systems layer, reliability depends on durable execution. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover from failures without manual reconciliation. [Jack Vanlightly's taxonomy of durable function forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this into three patterns — stateless functions, sessions, and actors — showing how Temporal, Restate, DBOS, and Resonate each implement them differently. The common thread is that failures become recoverable by construction rather than by exception handling added later.

Test reliability follows the same logic. [Playwright tests that break during UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) do so because they couple to DOM structure and CSS classes rather than semantic roles and accessible names. Stable selectors are a structural choice made early. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the downstream problem by auto-categorizing test failures as bugs, flaky tests, or UI changes, but that triage layer still depends on tests being meaningfully authored. [Angular API validation with Zod](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) takes a similar structural approach to backend contracts: catching unexpected response shapes at development time rather than letting them surface as runtime errors in production. And the [GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is a clear case where an architectural decision — never pushing temp branches to main — avoided silently corrupting repositories when the base commit logic failed.

The limits of reliability work appear in [Daniel Stenberg's analysis of curl's bug history](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs): despite powerful AI-assisted static analysis, there is no measurable sign that open-source projects are approaching zero latent bugs. Reliability improvements are real but asymptotic. [Emphere's testing approach for a container security tool](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) addresses a related problem: when a tool's failures can cause harm, the test suite itself must include red runs that prove the system fails loudly rather than overclaims certainty. [Yaron Minsky's case for formal methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) points further in this direction: agentic coding lowers the cost of writing proofs, and verification tools can provide guarantees that tests alone cannot. [Anton Zaides's production incident heuristics](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) summarize the practitioner version of the same instinct: roll back before debugging, treat every external dependency as a future outage.

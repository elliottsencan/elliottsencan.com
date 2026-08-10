---
title: Reliability
summary: >-
  Reliability in software systems is a structural property, not a configuration
  — achieved through schema validation, durable execution, stable test design,
  environmental constraints, and architectural choices that prevent silent
  failures.
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
compiled_at: '2026-08-10T19:05:41.105Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1148
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
  cost_usd: 0.032403
---
Reliability is what separates systems that fail loudly and recover cleanly from those that silently corrupt state, declare success prematurely, or degrade in ways no one notices until the damage is done. Across many domains of software engineering, the consistent finding is that reliability must be designed in at the architectural level, not patched in through configuration or instruction.

For LLM agents, prompting is the wrong lever. [Aiyan's account](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) of a data engineering agent evolved through three architectures concludes that environmental constraints, including tool design, stable ID keys, and context visibility, outperform prompt engineering at every stage. [Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) of multi-agent systems finds failure rates between 41 and 87 percent in production, with inter-agent reasoning failures being structurally harder to address than prompt-level issues. His follow-up [account of building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) puts the problem concretely: the agent declares work done after minimal checks, and 52 guardrails changed nothing fundamental about that behavior.

For distributed systems, durable execution is the structural answer to transient failure. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications recover automatically without manual reconciliation. [Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this space into stateless functions, sessions, and actors, showing how platforms like Temporal, Restate, and DBOS each address the behavior-state continuum differently.

At the API boundary, [Daniel Sogl's approach](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) uses Zod schema validation with a custom RxJS operator to catch unexpected backend response shapes at development time, before they produce runtime errors. In agent pipelines, [Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) points to the same risk from the other direction: tools that silently drop or transform data introduce reliability trade-offs that vanity metrics like token savings cannot justify.

Test reliability follows the same structural logic. [Currents on Playwright](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that tests break during refactors not because of poor selector choice alone, but because they couple to implementation details rather than stable semantic roles and accessible names. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) addresses the operational side, auto-categorizing failures as bugs, flaky tests, or UI changes to reduce the manual triage burden.

Architectural decisions can prevent entire classes of failure. [Trunk's analysis](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) of a GitHub merge queue bug, where thousands of lines were silently deleted from main branches, attributes the incident to a structural choice their own system avoided by design. [Zaides's production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) generalize this: treat every external dependency as a future outage and roll back before debugging.

Formal verification represents the far end of the reliability spectrum. [Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that agentic coding has made proofs newly cost-effective, both by lowering the cost of writing them and by creating demand for verification that tests alone cannot satisfy. [Stenberg's analysis of curl](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) is a useful corrective: despite powerful AI-assisted static analysis, vulnerability age and bugfix-rate data show no measurable sign that open-source projects are approaching zero latent bugs. Reliability improves incrementally through structural discipline, not through any single tool.

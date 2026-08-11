---
title: Reliability
summary: >-
  Reliability in software systems is achieved through structural constraints and
  environmental design rather than through testing, prompting, or optimism — a
  theme that runs across testing practices, distributed systems, agent
  architectures, and production operations.
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
compiled_at: '2026-08-11T05:22:53.316Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1155
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
  cost_usd: 0.032508
---
The recurring lesson across these sources is that reliability is a property of how a system is built, not a property claimed after the fact. Asking an LLM agent to be more careful via prompting [does not work](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it); what works is constraining the environment through tool design, deterministic ID keys, and context visibility so that the agent cannot easily do the wrong thing. Christopher Meiklejohn's empirical survey of multi-agent systems [finds failure rates of 41–87%](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) and his own hands-on experience confirms that even 52 guardrails don't stop an agent from [declaring work done prematurely](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). The problem is structural, not promptable.

The same principle applies to runtime data. Using Zod schema validation with a custom RxJS operator in Angular [catches unexpected backend response shapes at development time](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) rather than letting malformed data surface as runtime errors. RTK's claimed token savings in agent pipelines [risk silent data loss](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) — exactly the kind of quiet failure that structural constraints are meant to prevent.

For distributed workflows, Temporal [persists state at every step](/reading/2026-04/2026-04-30t231511-temporal) so applications recover automatically from failures. Jack Vanlightly's taxonomy of durable execution [maps stateless functions, sessions, and actors](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) along a behavior-state continuum, showing how platforms like Temporal and Restate implement these patterns to keep long-running processes recoverable without manual reconciliation.

Test reliability has its own structural dimension. Playwright tests break during UI refactors not because of poor selector choices alone, but because they [couple to implementation details](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) rather than semantic roles and accessible names. TestDino [auto-categorizes failures](/reading/2026-04/2026-04-30t231348-testdino) as bugs, flaky tests, or UI changes, which reflects the same idea: failure types are structurally distinct and should be treated differently. Testing in staging versus production [requires a deliberate split](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) based on what each environment can actually validate.

At the infrastructure level, Trunk's merge queue architecture [avoided a GitHub incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) that silently deleted thousands of lines by never pushing temp branches to main. Anton Zaides distills the same instinct into a rule: [roll back before debugging](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people), and treat every external dependency as a future outage. Emphere's security tool testing shows what this looks like in practice: [red runs that prove the system fails loudly](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) when it would otherwise overclaim certainty.

Daniel Stenberg's analysis of curl's bug data [finds no measurable sign](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) that AI-assisted static analysis is moving open-source projects toward zero latent bugs. Yaron Minsky at Jane Street [argues that formal methods are now more cost-effective](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) because agentic coding lowers the cost of writing proofs and creates demand for verification that tests alone cannot supply. Together these suggest that reliability at scale requires verification mechanisms beyond testing — and that the honest position is to build systems that fail loudly rather than ones claimed to be bug-free.

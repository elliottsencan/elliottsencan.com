---
title: Reliability
summary: >-
  Reliability in software systems requires structural constraints rather than
  reactive fixes, spanning test design, runtime guarantees, schema validation,
  and architectural choices that make failures visible and recoverable.
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
compiled_at: '2026-10-26T22:32:23.071Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1257
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
  cost_usd: 0.034038
---
Reliability is a property you engineer into a system, not one you patch in after the fact. The sources collected here converge on that principle from several directions: LLM agent design, distributed systems, test suite construction, schema validation, and production incident culture.

The most direct statement comes from an analysis of a data engineering agent [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it): prompt engineering failed to fix agent errors; environmental constraints, such as stable ID keys and scoped tool designs, succeeded. That finding echoes a broader pattern in multi-agent systems. Empirical papers surveyed by Christopher Meiklejohn [Getting Up to Speed on Multi-Agent Systems, Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) show failure rates of 41-87% in production, with inter-agent reasoning failures being structurally harder to correct than surface-level prompt issues. His field account of building with Claude [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) confirms the pattern experientially: the agent repeatedly declared work done without verifying it, and no accumulation of guardrails substituted for systematic checking.

At the infrastructure layer, durable execution platforms address the related problem of workflow failures in distributed systems. Temporal persists state at every step so applications recover from failures without manual reconciliation [Temporal](/reading/2026-04/2026-04-30t231511-temporal), and a taxonomy by Jack Vanlightly [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps how Temporal, Restate, DBOS, and Resonate each implement stateless functions, sessions, and actors along a behavior-state continuum.

Test reliability surfaces repeatedly as its own concern. Playwright suites break during UI refactors not because of selector choices alone but because tests couple to implementation details rather than stable semantic roles [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). TestDino approaches the same problem from the analytics side, auto-categorizing failures as bugs, flaky tests, or UI changes [TestDino](/reading/2026-04/2026-04-30t231511-temporal). A decision framework for staging vs. production splits test placement by risk and environment fidelity [Playwright Testing in Staging vs Production](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production).

Schema validation is a cheaper form of structural reliability. Using Zod with a custom RxJS operator in Angular catches unexpected backend response shapes at development time rather than as runtime failures [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with). A similar principle appears in Emphere's approach to security tooling: fixture invariants and red runs that confirm the system fails loudly when it overclaims certainty [Testing a Security Tool Like It Can Hurt People](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people).

For production systems, the unwritten rules that matter most are architectural. A GitHub merge queue bug silently deleted thousands of lines from main because it built temp branches off the wrong base commit; Trunk avoided the incident by never pushing temp branches to main in the first place [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). The culture side appears in Anton Zaides's rules, particularly treating every external dependency as a future outage and rolling back before debugging [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering).

Daniel Stenberg's analysis of curl's bug data is a useful corrective to optimism: despite powerful AI-assisted static analysis tools, there is no measurable sign yet that open-source projects are approaching zero latent bugs [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs). Yaron Minsky at Jane Street takes a longer view, arguing that agentic coding has made formal methods newly cost-effective by both lowering proof costs and creating demand for verification that tests alone cannot satisfy [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming). Both positions are compatible: current tools have not closed the gap, and stronger verification methods are the direction worth investing in.

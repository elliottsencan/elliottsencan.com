---
title: Reliability
summary: >-
  Reliability in software systems requires structural constraints — in
  architecture, tooling, and validation — not wishful thinking via configuration
  or prompting.
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
compiled_at: '2026-09-21T21:56:11.818Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1160
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
  cost_usd: 0.032583
---
Reliability is not a property you configure into a system after the fact; it emerges from decisions made at the architectural level, in how tools are designed, how failures are surfaced, and how state is managed across time.

The clearest statement of this comes from an agent engineering retrospective [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it): iterating through three architectures, the author found that environmental constraints — stable ID keys, scoped tool design, explicit context visibility — produced more reliable behavior than any amount of prompt refinement. Empirical research on multi-agent systems sharpens the point: [Getting Up to Speed on Multi-Agent Systems, Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) surveyed papers showing 41–87% failure rates in production, with inter-agent reasoning failures being structurally harder to address than prompt-level mistakes. A complementary firsthand account [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) describes an agent that consistently declared tasks complete after minimal verification, requiring the author to manually test every feature despite adding 52 guardrails.

For distributed systems, reliability requires that failures be recoverable by design rather than by heroic manual intervention. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses this by persisting workflow state at every step, enabling automatic recovery. [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps durable execution into a taxonomy — stateless functions, sessions, actors — showing how different platforms implement this continuum differently but share the same underlying goal: making failure a recoverable event rather than a catastrophic one.

At the boundary where external data enters a system, reliability depends on catching shape mismatches early. [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) shows how Zod schema validation in Angular can catch unexpected backend response shapes at development time. The [GitHub merge queue incident](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates what happens without such guards — a silent architectural flaw deleted thousands of lines from production branches before anyone noticed.

Test suites are supposed to be a reliability signal, but they fail at this when they couple to implementation details. [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues for anchoring tests to semantic roles and accessible names rather than CSS classes or DOM position. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) approaches the same problem from the analytics side, auto-categorizing failures to separate genuine bugs from flaky tests. For security-critical tooling, [Testing a Security Tool Like It Can Hurt People](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes the argument further: tests must prove the system fails loudly when it overclaims certainty, not just that it passes nominal cases.

On a longer time horizon, [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) uses curl's vulnerability data to argue there is no measurable sign yet that AI-assisted static analysis is pushing open-source projects toward zero latent bugs. [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) counters that agentic coding has made formal verification newly cost-effective, creating demand for proof-level guarantees that go beyond what tests alone provide. These two views are not incompatible: static analysis and testing catch known failure modes; formal methods address the structural correctness that neither fully covers.

Finally, [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills operational experience into practices like rolling back before debugging and treating every external dependency as a future outage — a reminder that reliability is as much a cultural discipline as a technical one.

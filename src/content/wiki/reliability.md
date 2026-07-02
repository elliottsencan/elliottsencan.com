---
title: Reliability
summary: >-
  Reliability in software systems is not a single practice but a property that
  emerges from architectural constraints, test design, schema validation, and
  durable execution — and one that prompt engineering, good intentions, or AI
  tooling alone cannot substitute for.
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
compiled_at: '2026-07-02T12:34:05.549Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4884
    output_tokens: 1066
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
  cost_usd: 0.030642
---
Reliability is something systems have or lack structurally. The sources here converge on one consistent finding: attempts to patch unreliability at the surface level — through prompts, selector tweaks, or better logging — fail when the underlying architecture still permits silent failure.

The clearest statement of this comes from agentic systems. An experiment building a data engineering agent across three architectures found that environmental constraints, such as tool design and stable ID keys, produced more reliable behavior than any prompt adjustment [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). The same theme appears at scale: empirical benchmarks across multi-agent LLM systems show 41–87% failure rates, with inter-agent reasoning failures being structurally harder to address than prompt-level issues [Getting Up to Speed on Multi-Agent Systems, Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). A hands-on account of building with Claude confirmed this: even after 52 guardrails, the agent declared work done after minimal verification, forcing manual spot-checking of every feature [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent).

For distributed systems more broadly, durable execution addresses the same problem at the infrastructure layer. Temporal persists workflow state at every step so applications recover from failures automatically, without manual reconciliation [Temporal](/reading/2026-04/2026-04-30t231511-temporal). A taxonomy of durable function forms — stateless functions, sessions, and actors — maps how platforms like Temporal and Restate implement this across a behavior-state continuum [The Three Durable Function Forms](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms).

Test reliability has its own structural dimension. Playwright suites break during UI refactors not because of poor selector choices but because tests couple to implementation details — CSS classes and DOM position — rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). A merge queue bug at GitHub that silently deleted thousands of lines from main branches illustrates what happens when architectural choices are not made defensively from the start [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit).

Schema validation is one concrete enforcement point. Using Zod with a custom RxJS operator in Angular catches unexpected backend response shapes at development time rather than at runtime [From Flaky to Flawless](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with). Emphere's approach to testing a security tool adds another requirement: the test suite must prove the system fails loudly when it overclaims certainty, not just that it passes under normal conditions [Testing a Security Tool Like It Can Hurt People](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people).

On the pessimistic side, curl's bug-rate data shows no measurable sign that AI-assisted static analysis is moving open-source projects toward zero latent bugs [Approaching Zero Bugs?](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs). Jane Street's counter-argument is that formal methods become cost-effective precisely when agentic coding creates demand for verification that tests alone cannot satisfy [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming). Both can be true: current tooling has not moved the needle, but the economic case for proof-based verification is strengthening.

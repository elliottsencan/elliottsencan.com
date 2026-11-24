---
title: Reliability
summary: >-
  Reliability in software engineering spans test design, schema validation,
  durable execution, and architectural constraints — a property built into
  systems through structure, not patched in through instructions or tooling
  overlays.
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
compiled_at: '2026-11-24T04:02:04.288Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5061
    output_tokens: 1106
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
  cost_usd: 0.031773
---
Reliability is not a single technique but a property that emerges at every layer of a software system. The sources here converge on one consistent point: reliability cannot be bolted on after the fact. It has to be built into the structure.

The most direct statement of this comes from the agent engineering space. [Aiyan's post on LLM agent reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) argues that prompting an agent to be careful is far less effective than constraining the environment it operates in — through tool design, stable ID keys, and controlled context visibility. [Christopher Meiklejohn's empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) supports this: multi-agent LLM systems fail 41–87% of the time in production, and inter-agent reasoning failures are structurally harder to address than prompt-level tweaks. His [firsthand account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building with Claude confirms the pattern — the agent consistently declared work complete after minimal verification, requiring manual inspection of every feature.

The same structural logic applies to data pipelines and distributed systems. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so applications can recover from failures automatically. [Jack Vanlightly's taxonomy](/reading/2026-05/2026-05-01t112302-the-three-durable-function-forms) maps this into three durable execution forms — stateless functions, sessions, and actors — showing how platforms like Temporal and Restate encode reliability guarantees at the execution layer rather than leaving recovery logic to application code.

At the API boundary, [Daniel Sogl's Zod article](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) makes the same argument for frontend reliability: catching unexpected backend response shapes at development time, not at runtime, through schema validation wired into RxJS operators.

Test reliability shows the tension between structure and coverage. [Currents' Playwright guide](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) shows that tests break during UI refactors not because of selector syntax but because they couple to implementation details instead of stable semantic roles. Running those tests in the right environment matters too — [their staging-vs-production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) addresses the operational cost of that choice. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an analytics layer that auto-categorizes failures, aiming to reduce the diagnostic overhead that flaky tests create.

Some reliability problems are architectural surprises. [Phil Vendola's merge queue post](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) describes a GitHub bug that silently deleted thousands of lines from main branches; Trunk avoided the incident because of a deliberate architectural constraint. [Marc Brooker's TCP_NODELAY piece](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) is a narrower case — a default that made sense decades ago now silently kills latency because application-layer protocols have solved the problem the default was designed for.

[Anton Zaides' production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distill this across incidents: treat every external dependency as a future outage, roll back before debugging. Reliability thinking, in that framing, is a disposition as much as a technique — one that [Daniel Stenberg's curl data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) complicates usefully: even with AI-assisted static analysis, there is no measurable sign yet that open-source projects are approaching zero latent bugs. Zero bugs remains a horizon, not a destination.

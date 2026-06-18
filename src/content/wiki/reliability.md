---
title: Reliability
summary: >-
  Reliability in software spans runtime validation, durable execution, test
  infrastructure, and human verification loops, with sources converging on the
  idea that systems fail in predictable ways that engineering practices can
  anticipate.
sources:
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t231348-testdino
  - 2026-04/2026-04-30t231511-temporal
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - 2026-05/2026-05-06t204115-platform-engineering-end-to-end
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - 2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people
compiled_at: '2026-06-18T21:53:42.486Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3319
    output_tokens: 744
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
  cost_usd: 0.021117
---
Reliability is not a single property but a cluster of concerns that each source here addresses from a different layer of the stack.

At the data boundary, [Zod schema validation in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected API response shapes before they propagate into application state. The approach pairs Zod with a custom RxJS operator so that a schema mismatch surfaces at development time rather than as a silent runtime failure in production. This reflects a broader principle: push failure detection as early as possible in the execution path.

At the workflow layer, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) takes a different approach by persisting state at every step of a distributed workflow. Rather than writing reconciliation logic by hand, engineers model their process as durable execution and let the platform handle retries and recovery automatically.

Test infrastructure is its own reliability surface. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) categorizes Playwright failures into bugs, flaky tests, and UI changes, reflecting a real distinction: a flaky test is not a failing test, and conflating them erodes trust in the suite. [Currents.dev](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) extends this by arguing that staging and production require different test strategies, since production carries real consequences that staging cannot fully simulate.

[Emphere Engineering](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes the highest-stakes version of this argument: a security tool that overclaims certainty is worse than one that fails loudly, so their test suite includes deliberate red runs that verify the system surfaces false confidence as an error.

Two sources address operational heuristics. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) argues that every external dependency should be treated as a future outage, and that rollback should precede debugging when production is affected. [Luca Cavallin](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) frames on-call operations as a core platform engineering responsibility, not an afterthought.

Finally, [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents a reliability gap specific to AI-assisted development: agents consistently declare tasks complete before the outcome is verified, requiring a human to manually validate every ship. Tooling and guardrails reduce the friction but do not close the loop. This is a different class of reliability problem, one where the failure mode is false confidence rather than a thrown exception.

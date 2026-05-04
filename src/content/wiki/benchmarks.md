---
title: Benchmarks
summary: >-
  Benchmarks in AI agent research are the empirical datasets and task suites
  used to measure system capability, but their scope shapes which claims
  practitioners can actually make about real-world performance.
sources:
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
aliases:
  - benchmarking
compiled_at: 2026-05-04T04:10:03.644Z
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2559
    output_tokens: 464
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
  cost_usd: 0.014637
---
In [multi-agent systems research](/wiki/multi-agent-systems), benchmarks do more than measure performance; they define what counts as success and, in doing so, narrow or widen what researchers claim their systems can do. Christopher Meiklejohn's survey of the field notes that agentic coding benchmarks like SWE-bench effectively constrained the scope of multi-agent claims, since systems like SWE-agent were optimized for a specific, well-defined task class [Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the).

The vocabulary work that accompanies that survey underscores how benchmark framing shapes the taxonomy readers use to compare papers [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the). Without shared definitions for agent types and coordination structures, benchmark results across papers become difficult to interpret against each other.

The practical stakes of benchmark choice become concrete in the single-versus-multi-agent comparison. Stanford and Google/MIT research cited by Ben Dickson found that [multi-agent orchestration](/wiki/llm-orchestration) can amplify errors up to 17x and reduce tool-handling efficiency by 2 to 6x relative to single-agent baselines [How to Choose](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Those numbers only hold meaning relative to the benchmarks on which they were measured, which is exactly the kind of scope limitation Meiklejohn's retrospective flags. A benchmark that rewards coordination complexity will produce different comparative conclusions than one that penalizes error propagation.

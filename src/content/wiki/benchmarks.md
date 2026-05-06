---
title: Benchmarks
summary: >-
  Benchmarks in multi-agent AI research measure coordination overhead, error
  propagation, and task performance, exposing how architectural choices
  translate into real costs across single- and multi-agent systems.
sources:
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-04t235011-plurai
compiled_at: '2026-05-06T04:24:11.812Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2761
    output_tokens: 436
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
  cost_usd: 0.014823
---
In multi-agent systems research, benchmarks serve as the primary mechanism for comparing architectural choices against concrete performance metrics. Christopher Meiklejohn's survey of the field [identifies two waves of MAS research](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the): 2023 coordination papers and 2025 reliability work, with benchmarks like SWE-bench helping narrow what "agentic" actually means in practice by grounding claims in measurable coding task outcomes.

The coordination tax that multi-agent architectures impose is quantified by benchmarks cited in [Ben Dickson's analysis](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions): Stanford and Google/MIT research found error amplification up to 17x and tool-handling efficiency reductions of 2-6x compared to single-agent baselines. Those numbers make the case that benchmarks are not just academic scorecards but decision tools for practitioners choosing between architectures.

[Plurai](/reading/2026-05/2026-05-04t235011-plurai) takes a different angle, using multi-agent debate as a validation mechanism inside its own eval pipeline rather than as a subject of benchmarking. The distinction matters: benchmarks can measure systems, but they can also be embedded within systems to generate and validate synthetic training data. Plurai's claim of sub-100ms latency and 8x cost reduction over LLM-as-judge approaches are themselves benchmark-style figures used to justify the product's design.

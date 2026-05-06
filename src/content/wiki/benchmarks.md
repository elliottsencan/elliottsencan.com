---
title: Benchmarks
summary: >-
  Benchmarks in AI agent research measure coordination overhead, tool-handling
  efficiency, and reliability, but the metrics often reflect a system's
  architecture more than its raw capability.
sources:
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-04t235011-plurai
compiled_at: '2026-05-06T04:11:40.272Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2761
    output_tokens: 416
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
  cost_usd: 0.014523
---
In multi-agent systems research, benchmarks do a lot of quiet work shaping what counts as progress. Christopher Meiklejohn's survey of the field [Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) notes that systems like SWE-agent achieved strong scores on coding benchmarks while operating as single-agent loops, which narrowed what the multi-agent label could credibly claim. A high benchmark number, in other words, does not confirm the architectural story a paper tells.

The coordination tax that benchmarks sometimes obscure is quantified in AlphaSignal's synthesis of Stanford and Google/MIT research [single vs. multi-agent](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions): multi-agent orchestration can amplify errors up to 17x and reduce tool-handling efficiency by 2 to 6x relative to single-agent baselines. Those numbers come from benchmarks, but the lesson is that the benchmark must measure the right failure mode to be useful.

On the evaluation tooling side, Plurai [Plurai](/reading/2026-05/2026-05-04t235011-plurai) replaces LLM-as-judge scoring with a multi-agent debate process for validating synthetic training data, targeting sub-100ms latency and claiming 8x cost reduction. That framing treats benchmark infrastructure itself as a product problem, not just a research methodology.

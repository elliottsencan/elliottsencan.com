---
title: Multi-agent systems
summary: >-
  LLM-based multi-agent systems coordinate multiple AI agents on decomposed
  tasks, but empirical work shows failure rates of 41–87%, with information
  synthesis rather than coordination being the core bottleneck.
sources:
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - >-
    2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
compiled_at: '2026-05-04T04:09:53.805Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3601
    output_tokens: 848
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
  cost_usd: 0.023523
---
Multi-agent systems (MAS) in the LLM era involve networks of AI agents assigned specialized roles, communicating to complete tasks too large or complex for a single model context. Christopher Meiklejohn's eight-part series maps the field's development across two waves [Getting Up to Speed, Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the).

The first wave, centered on 2023 papers like CAMEL, ChatDev, MetaGPT, AutoGen, and Generative Agents, asked whether agents could coordinate at all [Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). These systems established role-based agent types, coordination structures (hierarchical, peer-to-peer, pipeline), and basic message-passing patterns [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the). A shared failure mode across Wave 1 was treating errors as termination conditions rather than as recoverable system state.

The second wave turned empirical. MAST catalogued 14 failure modes across 1,600 traces; MAS-FIRE introduced fault injection; Silo-Bench tested isolation. Together they found failure rates ranging from 41% to 87%, with information synthesis across agents identified as the core bottleneck, not coordination mechanics [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

Work on coordination structure argues that topology must match task structure. The CALM theorem, convergent and adversarial debate patterns, and shared-notebook state models each address different consistency requirements, and Meiklejohn argues the field is reinventing distributed systems theory rather than borrowing it [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Verification research adds that checking work in a different representation than it was produced in (modality shift) is what separates structural verification gates from weak self-critique [Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6).

Benchmarking remains a structural problem. Most MAS benchmarks were designed for single agents and cannot measure coordination quality or communication overhead, which is why ChatDev and MetaGPT report contradictory results on ostensibly the same tasks. Multi-agent overhead only pays off on breadth-first, parallel-decomposable work [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). Open problems include topology-to-reliability mapping, CRDTs for shared agent state, and graceful failure recovery [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

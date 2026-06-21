---
title: Agent coordination
summary: >-
  How multiple LLM agents divide work, communicate, and recover from failure — a
  problem the field has approached empirically before developing the formal
  vocabulary to describe it.
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
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
compiled_at: '2026-06-21T18:32:30.148Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3653
    output_tokens: 788
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
  cost_usd: 0.022779
---
Agent coordination is the set of mechanisms that determine how autonomous LLM agents split tasks, pass state, resolve conflicts, and handle failures when operating together. Christopher Meiklejohn's eight-part series on multi-agent systems treats coordination as the central unsolved problem of the field, tracing it across two waves of research.

The 2023 wave — covering systems like CAMEL, ChatDev, MetaGPT, and AutoGen — demonstrated that agents could coordinate at all [Getting Up to Speed, Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). These systems established role-playing, pipeline, and hierarchical coordination patterns, but shared critical gaps: no concurrency control, no escalation paths when agents disagreed, and no formal treatment of shared state.

The 2025 empirical wave measured what those gaps cost. MAST, MAS-FIRE, and Silo-Bench found failure rates between 41 and 87 percent in production deployments, with inter-agent reasoning failures proving structurally harder to fix than prompt-level issues [Part 4: Wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). A separate analysis found that multi-agent orchestration can amplify errors up to 17x and reduce tool-handling efficiency by 2 to 6x compared to single-agent baselines, which is why single-agent systems should be the default unless the task genuinely requires parallelism [How to Choose](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions).

Coordination structure must match task structure. The CALM theorem and work on convergent versus adversarial debate patterns show that the wrong coordination topology for a given task does not merely underperform — it introduces systematic failure modes [Part 5: Debate, State, and Coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Shared-notebook state models address some consistency problems but leave open questions around concurrent writes and merge semantics.

Benchmarks have not kept pace. HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery [Part 7: Benchmarks](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). The open questions remaining include topology-to-reliability mapping, CRDTs for shared state, backpressure protocols, and failure recovery — problems that distributed systems research has addressed formally, but which the MAS field is largely rediscovering without that vocabulary [Part 8: Open Questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

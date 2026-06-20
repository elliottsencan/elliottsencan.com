---
title: Agent coordination
summary: >-
  How multiple LLM agents divide work, share state, and handle failures — a
  problem the field is solving empirically before it has solved it
  theoretically, with failure rates of 41–87% in production systems.
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
compiled_at: '2026-06-20T12:44:19.848Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3653
    output_tokens: 816
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
  cost_usd: 0.023199
---
Agent coordination is the set of mechanisms that determine how multiple LLM-based agents divide tasks, communicate results, manage shared state, and recover from failures. Christopher Meiklejohn's eight-part series on multi-agent systems treats coordination not as a feature to add but as the central engineering problem the field has yet to crack.

The 2023 wave of MAS research — covering systems like CAMEL, ChatDev, MetaGPT, and AutoGen — demonstrated that agents could coordinate at all, but the proofs-of-concept shared structural gaps: no concurrency control, no escalation paths when an agent failed or disagreed, and no durable shared state [Getting Up to Speed, Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). The 2025 empirical turn measured what those gaps cost in practice. MAST, MAS-FIRE, and Silo-Bench found that multi-agent systems fail 41–87% of the time in production, and that inter-agent reasoning failures are structurally harder to fix than prompt-level issues [Wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

Coordination structure must match task structure. Part 5 of the series surveys convergent debate, adversarial debate, shared-notebook state, and the CALM theorem, arguing that the choice of coordination pattern is not cosmetic — it determines whether agents converge or amplify disagreement [Debate, State, and Coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). The open-questions post extends this further, naming CRDTs for shared state, backpressure protocols, and topology-to-reliability mappings as unsolved problems — observing that the field is quietly rediscovering distributed systems without the vocabulary to name it [Open Questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

A practical counterweight: Stanford and Google/MIT research surveyed by Ben Dickson finds that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2–6x, suggesting single-agent systems should remain the default unless a task genuinely requires parallelism [How to Choose](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Benchmarks complicate this picture further — HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery, so headline numbers do not distinguish a well-coordinated system from a lucky one [Benchmarks and What They Miss](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).

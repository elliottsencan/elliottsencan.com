---
title: Agent coordination
summary: >-
  How multiple LLM agents divide work, communicate, and manage shared state —
  and why the coordination overhead frequently outweighs the benefits the
  architecture promises.
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
compiled_at: '2026-06-21T20:16:37.285Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3653
    output_tokens: 737
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
  cost_usd: 0.022014
---
Agent coordination is the set of mechanisms by which multiple LLM-based agents exchange information, divide tasks, and reconcile outputs. Christopher Meiklejohn's eight-part series traces the problem from its origins in 2023 proof-of-concept systems to the reliability crisis documented in 2025 empirical work.

The first wave of systems — CAMEL, ChatDev, MetaGPT, AutoGen, and Generative Agents — demonstrated that agents could coordinate at all, but each relied on brittle conventions: fixed role assignments, sequential message passing, no concurrency control, and no escalation paths when an agent produced bad output [Getting Up to Speed, Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). The second wave measured what that brittleness costs. MAST, MAS-FIRE, and Silo-Bench found failure rates between 41% and 87% in production scenarios, with inter-agent reasoning failures structurally harder to fix than prompt-level issues [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

The coordination structure itself matters. Convergent debate, adversarial debate, shared-notebook state, and the CALM theorem each suit different task shapes, and choosing the wrong topology degrades reliability systematically [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Ben Dickson's synthesis of Stanford and Google/MIT research puts a number on the penalty: multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2–6x compared to a single-agent baseline, making single-agent systems the correct default for most tasks [How to Choose](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions).

Benchmarks compound the confusion. HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery — the properties that distinguish multi-agent architectures in practice [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). Open problems include mapping topology choices to reliability guarantees, applying CRDTs to shared agent state, and defining backpressure protocols — problems the field is quietly rediscovering from distributed systems without yet having the vocabulary to name them [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

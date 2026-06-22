---
title: Agent coordination
summary: >-
  How multiple LLM agents divide work, share state, and handle failures, with
  research showing that coordination structure must match task structure and
  that poor coordination causes the majority of multi-agent system failures.
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
compiled_at: '2026-06-22T07:21:09.298Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3653
    output_tokens: 811
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
  cost_usd: 0.023124
---
Agent coordination is the set of mechanisms by which multiple autonomous LLM agents exchange information, delegate subtasks, and maintain consistent shared state. The first wave of multi-agent systems research, surveyed by Christopher Meiklejohn in his series, treated coordination primarily as a proof-of-concept. Papers like CAMEL, MetaGPT, and AutoGen demonstrated that agents could be made to collaborate, but shipped without concurrency control or escalation paths [Getting Up to Speed, Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1).

The second wave turned empirical and found that failure is the norm. MAST, MAS-FIRE, and Silo-Bench measured production failure rates between 41 and 87 percent, with inter-agent reasoning failures proving structurally harder to fix than prompt-level issues [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). These are not edge cases; they are the dominant outcome when coordination is left undesigned.

Coordination structure matters as much as model quality. Research on debate, shared-notebook state, and the CALM theorem each points to the same finding: the right interaction pattern depends on the task. Convergent debate suits tasks that need consensus; adversarial debate suits tasks that need error correction; shared mutable state suits tasks that need continuity across agents [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). The CALM theorem, borrowed from distributed systems, formalizes when coordination is even necessary, a formalism the MAS field has been slow to adopt.

There is also a coordination tax. Stanford and Google/MIT research cited by Ben Dickson found that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x compared with single-agent baselines, making single-agent systems the rational default for most tasks [How to Choose](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Meiklejohn's open questions post identifies backpressure protocols, CRDTs for shared state, and topology-to-reliability mappings as the unsolved problems that would close this gap, arguing the field is rediscovering distributed systems without the vocabulary to name it [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

Benchmarks have not caught up. HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery, which means published numbers systematically overstate how well multi-agent systems actually work [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).

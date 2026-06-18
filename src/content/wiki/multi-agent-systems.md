---
title: Multi-agent systems
summary: >-
  Multi-agent systems coordinate multiple LLM-powered agents toward shared
  tasks; two research waves established that coordination is achievable but
  reliability remains the central unsolved problem, with failure rates between
  41% and 87% across empirical studies.
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
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
  - 2026-06/2026-06-14t094245-agentswarms
compiled_at: '2026-06-18T21:51:34.704Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4638
    output_tokens: 1079
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
  cost_usd: 0.030099
---
Multi-agent systems (MAS) assign distinct roles or subtasks to separate LLM-powered agents that must coordinate to produce a joint result. Christopher Meiklejohn's eight-part survey maps the field across two research waves [Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the): a 2023 wave asking whether coordination was possible at all, and a 2025 wave asking why it keeps failing.

The five canonical 2023 papers, CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen, demonstrated that agents could divide labor and exchange messages, but shared a common failure pattern: treating errors as terminal events rather than recoverable system state [Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). The second wave produced harder numbers. MAST catalogued 14 failure modes across 1,600 traces; observed failure rates range from 41% to 87%, and information synthesis, not coordination overhead, is the primary bottleneck [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

The shared vocabulary across MAS research covers agent types, coordination topologies, and internal components [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the). Coordination structure must match task structure: convergent debate, adversarial debate, shared-notebook state, and the CALM theorem each address different consistency requirements, and Meiklejohn argues distributed systems theory provides a ready vocabulary the field underuses [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Verification adds another layer: modality shift, checking work in a different representation than it was produced in, separates weak self-verification from stronger structural gates [Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). Most existing benchmarks were designed for single agents and cannot measure coordination quality or failure recovery, which explains contradictory results between ChatDev and MetaGPT and the general difficulty comparing papers [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).

Open engineering problems include topology-to-reliability mapping, CRDTs for shared agent state, and graceful failure recovery [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). Practical implementations are already addressing these at smaller scope: Zerostack spawns parallel read-only child agents for codebase exploration, using strict tool constraints to prevent race conditions [Zerostack](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack), while Anthropic's Managed Agents service decouples the reasoning harness from sandboxes and session state to enable multi-brain, multi-sandbox architectures, cutting p50 time-to-first-token by 60% [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). Claude Code's dynamic workflows extend this further, spawning tens to hundreds of parallel subagents automatically for large-scale engineering tasks [Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Memory architecture is a crosscutting concern: a comparison of 71 agent memory systems shows the design space spans tiny MCP servers to full research libraries [Memory Systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison).

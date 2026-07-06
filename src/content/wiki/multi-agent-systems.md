---
title: Multi-agent systems
summary: >-
  Architectures where multiple LLM agents coordinate, delegate, and verify work
  across shared tasks; the field has moved from 2023 coordination
  proofs-of-concept to 2025–2026 reliability measurement, exposing failure rates
  of 41–87% in production.
sources:
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - >-
    2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your
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
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-21t112220-agentic-engineering
  - 2026-07/2026-07-02t052125-jangles-bytepythia
compiled_at: '2026-07-06T00:17:47.123Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5431
    output_tokens: 1120
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
  cost_usd: 0.033093
---
Multi-agent systems (MAS) compose several LLM-backed agents into pipelines or networks where each agent handles a portion of a larger task. The field passed through two recognizable waves. The first, around 2023, produced coordination proofs-of-concept — CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen — that demonstrated agents could divide roles and pass outputs to one another [wave-1 survey](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). The second wave, 2025–2026, moved to empirical measurement and found that these systems fail 41–87% of the time in production, with inter-agent reasoning failures structurally harder to fix than prompt-level issues [wave-2 survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

The shared vocabulary for describing MAS includes Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model, and Chen et al.'s challenge levels — a taxonomy that also exposes gaps like unevolved agents and absent benchmarks [MAS vocabulary](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the). Coordination structure itself matters: convergent debate, adversarial debate, shared-notebook state, and the CALM theorem each suit different task shapes, and mismatch between coordination and task topology is a root cause of failures [debate and coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate).

Verification is a recurring solution pattern. Modality shift — checking work in a different representation than it was produced — is identified as the key variable; Cursor's visual feedback loop is the strongest real-world example [verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). Cloudflare's Project Glasswing applied the same logic to security: parallel hunter agents, adversarial validators, and cross-repo tracers improved vulnerability discovery over single-agent approaches [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us).

On the infrastructure side, Anthropic's Managed Agents service decouples the agent harness, session log, and sandbox into stable, swappable interfaces — cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox topologies [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). Claude Code's dynamic workflows push further: Claude writes its own orchestration scripts and spins up hundreds of parallel subagents for tasks like codebase-wide migrations [Claude Code dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Zerostack's subagent design takes a narrower approach, spawning read-only parallel child agents for multi-file exploration to avoid bloating the main agent's context [Zerostack subagents](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack).

Benchmarks remain a structural problem. HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery [benchmarks critique](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). The open questions are largely borrowed from distributed systems: topology-to-reliability mappings, CRDTs for shared state, backpressure protocols, and failure escalation paths — problems the field is rediscovering without the vocabulary to name them [open questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

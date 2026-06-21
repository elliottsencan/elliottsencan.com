---
title: Multi-agent systems
summary: >-
  Multi-agent systems coordinate multiple LLM-powered agents to split,
  parallelize, and verify work — a rapidly evolving architecture whose
  coordination patterns, failure modes, and benchmark gaps are still being
  worked out.
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
compiled_at: '2026-06-21T18:34:12.558Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5296
    output_tokens: 1143
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
  cost_usd: 0.033033
---
A multi-agent system (MAS) deploys more than one LLM-powered agent, each with its own role, context, or toolset, to accomplish tasks that a single agent would handle poorly. The core premise is division of labor: one agent plans, others execute, and still others verify [Getting Up to Speed, Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the).

The taxonomy of these systems is still being standardized. Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model, and Chen et al.'s challenge levels are surveyed in [Part 2 of the series](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the), which notes gaps like unevolved agents and missing benchmarks as persistent blind spots. The 2023 wave of canonical systems — CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen — established that coordination was possible but left problems like missing concurrency control and no escalation paths unresolved [Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1).

Empirical work from 2025-2026 shows failure rates of 41-87% in production, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). Coordination structure must match task structure: convergent debate, adversarial debate, shared-notebook state, and the CALM theorem each suit different problem shapes, and distributed systems theory offers formalisms the field has largely ignored [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Verification is another axis: checking work in a different representation than it was produced — modality shift — is argued to be the key variable for catching errors [Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). Benchmarks built for single agents cannot measure coordination quality, communication overhead, or failure recovery, so published MAS numbers are often misleading [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).

On the production side, Anthropic's Managed Agents service decouples the agent harness, session log, and sandbox into stable interfaces, enabling multi-brain and multi-sandbox configurations while cutting p50 time-to-first-token by roughly 60% [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). Claude Code's dynamic workflows take this further, letting Claude write orchestration scripts that spin up hundreds of parallel subagents for codebase-wide tasks [Dynamic Workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Cloudflare's Project Glasswing used parallel hunters, adversarial validators, and cross-repo tracers to substantially improve vulnerability discovery over single-agent approaches [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us). Multi-agent debate is also applied to data generation: the BARRED framework uses agent debate to produce synthetic training data for fine-tuning small classifiers [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your).

Open questions catalogued in [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) include topology-to-reliability mapping, CRDTs for shared agent state, failure recovery protocols, and backpressure — problems the field is rediscovering from distributed systems without always having the vocabulary to name them.

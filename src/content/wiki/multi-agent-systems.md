---
title: Multi-agent systems
summary: >-
  Multi-agent systems coordinate multiple LLM-backed agents to tackle tasks no
  single model handles well, but empirical research shows failure rates of
  41–87% in production, with coordination structure proving harder to get right
  than individual agent capability.
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
compiled_at: '2026-07-09T14:16:41.797Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5431
    output_tokens: 1227
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
  cost_usd: 0.034698
---
Multi-agent systems (MAS) arrange multiple LLM-backed agents into networks where tasks are decomposed, delegated, and checked across participants. The appeal is parallelism and specialization: work that overflows a single context window, or that benefits from independent verification, becomes tractable when split across agents. But the promise consistently runs ahead of the reliability.

Christopher Meiklejohn's eight-part series is the most thorough practitioner map of the field available in these sources. [Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) identifies two research waves: 2023 proofs-of-concept showing agents could coordinate at all, and 2025 empirical work measuring why they fail. [Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) surveys the canonical 2023 systems — CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen — and finds shared failure modes: no concurrency control, no escalation paths. [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) surveys MAST, MAS-FIRE, and Silo-Bench, which put production failure rates between 41% and 87%, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues.

Coordination structure matters as much as individual agent quality. [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that the choice between convergent debate, adversarial debate, and shared-notebook state must match the task structure, and that distributed systems theory offers formalisms the field has not yet borrowed. [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) identifies specific open problems — topology-to-reliability mappings, CRDTs for shared state, backpressure protocols — framing MAS as distributed systems research conducted without the vocabulary.

On the infrastructure side, Anthropic's Managed Agents service [decouples the agent harness, session log, and sandbox](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) into stable, swappable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox topologies. Claude Code [now generates orchestration scripts dynamically](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) that spin up hundreds of parallel subagents for codebase-wide migrations and security audits. Cloudflare's Project Glasswing [used a multi-agent harness](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) with parallel hunters, adversarial validators, and cross-repo tracers to surface vulnerabilities that generic coding agents missed.

Verification is a recurring design challenge. [Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable for reliable self-verification. The BARRED framework [uses multi-agent debate to generate synthetic training data](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) for fine-tuning small classifiers, showing debate as a productive mechanism even outside the agent runtime itself.

Benchmarking lags the architecture. [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) notes that HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. The vocabulary problem compounds this: [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) maps the taxonomic landscape — Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model, Chen et al.'s challenge levels — showing that even naming the gaps requires a shared ontology the field is still building.

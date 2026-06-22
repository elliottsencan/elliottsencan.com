---
title: Multi-agent systems
summary: >-
  Networks of coordinating LLM agents that divide labor across specialized
  roles, with empirical failure rates between 41–87% in production and an open
  design space borrowed heavily from distributed systems theory.
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
  - 2026-06/2026-06-21t130526-agentic-engineering
compiled_at: '2026-06-22T02:37:15.858Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5442
    output_tokens: 1099
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
  cost_usd: 0.032811
---
A multi-agent system (MAS) is an architecture in which multiple LLM-backed agents interact, delegate to each other, and collectively attempt tasks that a single agent context cannot handle well. The field has developed in two recognizable waves. The first, roughly 2023, produced coordination proofs-of-concept: CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen each demonstrated that agents could divide roles and pass work between them, but [Meiklejohn's Wave 1 survey](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) identifies shared failure modes across all five, including missing concurrency control and no escalation paths when agents disagree. The second wave, from 2025 onward, shifted focus to measuring reliability. Papers surveyed by [Meiklejohn in Wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) — MAST, MAS-FIRE, and Silo-Bench — found failure rates between 41% and 87% in production settings, with inter-agent reasoning failures harder to address than prompt-level issues.

The vocabulary for describing these systems is still stabilizing. [Meiklejohn's taxonomy post](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) covers Tran et al.'s four-axis typology and Zhou et al.'s five-component agent model, and notes that gaps like unevolved agents and missing benchmarks remain underaddressed. Benchmarks themselves are a persistent problem: [Meiklejohn's benchmarks installment](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality or failure recovery.

On the production side, Anthropic's [Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces, enabling multi-brain and multi-sandbox configurations and cutting p50 time-to-first-token by roughly 60%. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) take a different angle: Claude writes orchestration scripts at runtime that spin up hundreds of parallel subagents for large-scale tasks like codebase migrations and security audits. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) shows a security-specific multi-agent harness using parallel hunters, adversarial validators, and cross-repo tracers to improve vulnerability discovery over generic single-agent approaches.

Coordination structure is its own design problem. [Meiklejohn's debate and state post](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) surveys convergent debate, adversarial debate, shared-notebook state, and the CALM theorem, concluding that coordination structure must match task structure and that distributed systems theory offers formalisms the field has not fully adopted. His [open questions post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) names CRDTs for shared state, backpressure protocols, and topology-to-reliability mapping as unsolved problems, arguing the field is rediscovering distributed systems without the vocabulary. The BARRED framework covered by [Diamant](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) applies multi-agent debate as a data-generation mechanism for fine-tuning classifiers, which shows how coordination patterns extend beyond task execution into training pipelines.

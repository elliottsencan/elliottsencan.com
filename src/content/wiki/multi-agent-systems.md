---
title: Multi-agent systems
summary: >-
  Multi-agent systems compose multiple LLM-backed agents into coordinated
  pipelines; research has moved from 2023 coordination proofs-of-concept to 2025
  reliability measurement, with production failure rates of 41–87% exposing deep
  structural problems.
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
compiled_at: '2026-06-22T07:22:46.130Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5442
    output_tokens: 1236
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
  cost_usd: 0.034866
last_source_added: '2026-07-02T12:21:25.108Z'
---
Multi-agent systems (MAS) coordinate two or more LLM-backed agents to accomplish tasks that exceed what a single model context or call can handle. Christopher Meiklejohn's eight-part survey provides the most thorough public map of the field, organizing its history into two waves [The Landscape](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the). Wave 1, roughly 2023, produced coordination proofs-of-concept: CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen each demonstrated that agents could divide labor, but all shared failure modes including missing concurrency control and no escalation paths when sub-tasks failed [Wave 1](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). Wave 2, 2025-2026, shifted to measuring reliability. The MAST, MAS-FIRE, and Silo-Bench papers found failure rates between 41% and 87% in production conditions, with inter-agent reasoning failures proving structurally harder to address than prompt-level issues [Wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

The taxonomy underlying this research matters. Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model, and Chen et al.'s challenge levels give researchers a shared vocabulary, though Meiklejohn notes that the terms also expose gaps: unevolved agents and missing benchmarks remain underaddressed [Vocabulary](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the). Benchmark numbers compound the problem because HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery [Benchmarks](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).

Coordination structure is a recurring design variable. Convergent debate, adversarial debate, shared-notebook state, and the CALM theorem each suit different task shapes, and Meiklejohn argues that distributed systems theory offers formalisms the field has not yet adopted [Debate, State, and Coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Output verification adds another dimension: modality shift, checking work in a different representation than it was produced, appears to be the strongest reliability lever [Verification Patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6).

Production deployments are converging on a few practical patterns. Anthropic's Managed Agents service separates the agent harness, session log, and sandbox into stable, swappable interfaces, enabling multi-brain and multi-sandbox topologies while cutting p50 time-to-first-token by roughly 60% [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). Claude Code's dynamic workflows let an orchestrator write its own orchestration scripts and spin up hundreds of parallel subagents for tasks like codebase migrations or security audits [Dynamic Workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Cloudflare's Project Glasswing used parallel hunters, adversarial validators, and cross-repo tracers to improve vulnerability discovery across 50 repositories [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us). Multi-agent debate also surfaces in data generation: the BARRED framework uses multi-agent debate to produce synthetic training data for fine-tuning small classifiers [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your).

Open problems identified by Meiklejohn include topology-to-reliability mapping, CRDTs for shared state, backpressure protocols, and failure recovery. The field is, in his framing, quietly rediscovering distributed systems without the vocabulary to name it [Open Questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

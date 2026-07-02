---
title: Multi-agent systems
summary: >-
  Multi-agent systems coordinate multiple LLM-backed agents to divide labor,
  debate outputs, and parallelize work — a field that has moved from 2023
  coordination proofs to 2025 reliability measurement, with failure rates still
  between 41% and 87% in production.
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
compiled_at: '2026-07-02T12:32:02.586Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5431
    output_tokens: 1202
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
  cost_usd: 0.034323
---
Multi-agent systems (MAS) place multiple LLM-backed agents in structured collaboration, each handling a slice of a task that would overwhelm a single context window or benefit from adversarial checking. The field's trajectory is well mapped by Christopher Meiklejohn's eight-part series: a first wave in 2023 proved coordination was possible, and a second wave from 2025 onward measured how often it breaks ["The Landscape"](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the).

The canonical 2023 systems — CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen — each demonstrated role-based coordination but shared structural gaps: no concurrency control, no escalation paths when agents disagreed ["Wave 1"](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). By 2025, empirical papers including MAST, MAS-FIRE, and Silo-Bench put failure rates at 41–87% in production, with inter-agent reasoning failures proving structurally harder to fix than prompt-level issues ["Wave 2"](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

Coordination structure matters as much as model capability. Meiklejohn's survey of debate and state papers argues that the right interaction pattern depends on task structure: convergent debate, adversarial debate, and shared-notebook state each fit different problem shapes, and the CALM theorem offers a formal handle on when coordination is avoidable ["Debate, State, and Coordination"](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Verification follows similar logic: checking work in a different modality than it was produced — modality shift — is the key variable for catching errors ["Verification Patterns"](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6).

Production deployments are catching up to the research. Anthropic's Managed Agents service separates the agent harness, session log, and sandbox into stable interfaces, enabling multi-brain, multi-sandbox topologies while cutting p50 time-to-first-token by roughly 60% [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). Claude Code's dynamic workflows let Claude write its own orchestration scripts, spinning up hundreds of parallel subagents for codebase-wide migrations or security audits [Dynamic Workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Cloudflare's Project Glasswing ran Anthropic's Mythos model through a harness of parallel hunters, adversarial validators, and cross-repo tracers to find vulnerabilities that generic coding agents missed [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us).

A recurring open question is whether the field has the vocabulary for what it is building. Meiklejohn argues MAS research is quietly rediscovering distributed systems — topology-to-reliability tradeoffs, CRDTs for shared state, backpressure protocols — without naming it as such ["Open Questions"](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). Benchmarks compound the problem: HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality or failure recovery ["Benchmarks"](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).

Multi-agent debate also has direct practical application beyond coordination. The BARRED framework generates synthetic training data through multi-agent debate to fine-tune small classifiers that outperform GPT-4.1 on domain-specific tasks [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your), showing that agent interaction is useful not only at inference time but as a data-generation mechanism.

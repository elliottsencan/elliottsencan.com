---
title: Multi-agent systems
summary: >-
  Architectures where multiple LLM-powered agents coordinate to complete tasks,
  spanning coordination patterns, failure taxonomy, verification strategies, and
  production deployment — a field quietly rediscovering distributed systems
  under new names.
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
compiled_at: '2026-06-21T20:18:10.207Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5442
    output_tokens: 1247
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
  cost_usd: 0.035031
---
Multi-agent systems (MAS) arrange multiple LLM-powered agents into networks where each handles a specialized role, with coordination, state, and verification distributed across the group rather than concentrated in a single prompt-response loop. Christopher Meiklejohn's eight-part survey is the most thorough mapping of the field available: [Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) frames the research in two waves, the 2023 coordination proofs-of-concept (CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen) and the 2025 empirical reliability turn, while [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) establishes the shared vocabulary: Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model, and Chen et al.'s challenge levels.

[Wave 1](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) showed that agents could coordinate at all, but left shared failure modes unaddressed: no concurrency control, no escalation paths. [Wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) measured what that costs in production. MAST, MAS-FIRE, and Silo-Bench report failure rates of 41–87%, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues.

[Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues that coordination structure must match task structure, drawing on convergent debate, adversarial debate, shared-notebook state, and the CALM theorem. [Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) makes the case that modality shift — verifying output in a different representation than it was produced — is the key variable in self-verification, with Cursor's visual feedback loop as the clearest real-world example. [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) notes that HumanEval and SWE-bench cannot measure coordination quality, communication overhead, or failure recovery, so benchmark numbers are systematically misleading for MAS. [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) closes by mapping unsolved problems — topology-to-reliability mappings, CRDTs for shared state, backpressure protocols — and arguing the field is rediscovering distributed systems without the vocabulary to name it.

On the production side, Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) service separates the agent harness, session log, and sandbox into stable swappable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox architectures. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) extend this by letting the model write its own orchestration scripts that spin up hundreds of parallel subagents for large-scale tasks. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) demonstrates the pattern in security: parallel hunters, adversarial validators, and cross-repo tracers dramatically improved vulnerability discovery over generic coding agents. Smaller implementations follow similar logic; [Zerostack's subagents](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) spawn read-only parallel child agents via a task tool to delegate multi-file exploration without bloating the main agent's context, reporting a 25% gain in code exploration time.

Multi-agent debate also appears as a data-generation technique: the [BARRED framework](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) uses multi-agent debate to produce synthetic training data for fine-tuning small classifiers that outperform GPT-4.1 on domain-specific policy tasks.

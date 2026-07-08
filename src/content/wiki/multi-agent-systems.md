---
title: Multi-agent systems
summary: >-
  Multi-agent systems coordinate multiple LLM-backed agents to tackle tasks too
  large or complex for a single model, but empirical research shows failure
  rates of 41–87% in production, making coordination structure and verification
  as important as raw model capability.
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
compiled_at: '2026-07-08T00:18:12.960Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5431
    output_tokens: 1286
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
  cost_usd: 0.035583
---
Multi-agent systems (MAS) pair or pipeline multiple LLM-backed agents so each handles a scoped subtask, with results aggregated or passed upstream. The appeal is straightforward: parallelism, specialization, and the ability to exceed a single context window. The engineering reality is harder.

Christopher Meiklejohn's eight-part series provides the most systematic account available. [Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) maps two waves of research: 2023 papers proving coordination was possible at all, and 2025 papers measuring how often it fails. [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) establishes the field's shared vocabulary, including Tran et al.'s four-axis typology and Zhou et al.'s five-component agent model. The canonical 2023 systems, covered in [Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) — CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen — demonstrated coordination but shared failure modes: no concurrency control, no escalation paths. [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) surveys 2025 empirical work showing production failure rates of 41–87%, with inter-agent reasoning failures harder to fix than prompt-level issues. [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues coordination structure must match task structure, drawing on debate, shared-notebook state, and the CALM theorem. [Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) identifies modality shift — checking work in a different representation than it was produced — as the key variable in self-verification. [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval and SWE-bench cannot measure coordination quality, communication overhead, or failure recovery. [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) closes by noting the field is quietly rediscovering distributed systems without the vocabulary to name it, flagging CRDTs, backpressure, and topology-to-reliability as unsolved problems.

Production deployments illustrate both the promise and the structural demands. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) service separates the agent harness, session log, and sandbox into stable interfaces, enabling multi-brain, multi-sandbox architectures and cutting p50 time-to-first-token by roughly 60%. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let an orchestrator write and execute scripts that spin up hundreds of parallel subagents for codebase-wide migrations or security audits. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) used parallel hunter agents, adversarial validators, and cross-repo tracers to improve vulnerability discovery over generic single-agent coding approaches. Zerostack's [subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) spawns read-only parallel child agents for multi-file exploration, reporting a 25% gain in code exploration time.

Multi-agent debate has a secondary use beyond task completion: [BARRED](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your), from Plurai, uses multi-agent debate to generate synthetic training data for fine-tuning small domain-specific classifiers, demonstrating that agent pipelines can serve as data engines rather than only task executors.

Ethan Mollick's [hands-on report with Claude 5 Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) notes the human role in multi-agent workflows has shifted from doing to commissioning — a soft claim about working style that sits alongside the harder structural findings above.

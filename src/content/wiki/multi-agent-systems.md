---
title: Multi-agent systems
summary: >-
  Networks of coordinating LLM agents that divide cognitive labor across
  specialized roles, with structural failure rates of 41–87% in production and
  an emerging toolchain that draws heavily on distributed systems theory.
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
compiled_at: '2026-07-04T21:24:26.714Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5431
    output_tokens: 1198
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
  cost_usd: 0.034263
---
A multi-agent system (MAS) is an architecture where multiple LLM-backed agents interact, each handling a slice of a larger task, with outcomes determined as much by coordination structure as by individual model capability. The field split into two recognizable waves [by Christopher Meiklejohn's account](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the): a 2023 wave proving agents could coordinate at all, and a 2025 reliability wave measuring how often they fail in practice.

The 2023 wave produced canonical systems like CAMEL, ChatDev, MetaGPT, and AutoGen, each demonstrating some form of role-based task decomposition [but sharing failure modes](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) including missing concurrency control and no escalation paths when agents deadlock or drift. The 2025 empirical turn made those failures legible: MAST, MAS-FIRE, and Silo-Bench found [failure rates of 41–87%](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), with inter-agent reasoning failures being structurally harder to fix than prompt-level issues.

Vocabulary for the field has been codified across several frameworks. Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model, and Chen et al.'s challenge levels [provide a shared taxonomy](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) that exposes gaps: unevolved agents, missing benchmarks, and coordination patterns borrowed from distributed systems without the formal vocabulary. That last gap is significant. Most MAS benchmarks still use HumanEval and SWE-bench, [designed for single agents](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7), and cannot measure coordination quality, communication overhead, or failure recovery.

Coordination mechanism matters beyond topology. Convergent debate, adversarial debate, shared-notebook state, and CALM-style consistency each suit different task structures [according to the research surveyed here](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Verification is similarly structural: checking outputs in a different representation than they were produced, what Meiklejohn calls modality shift, [substantially improves output quality](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6).

On the infrastructure side, Anthropic's Managed Agents service separates the agent harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox topologies [as production architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). Claude Code's dynamic workflows extend this to hundreds of parallel subagents spawned automatically for tasks like codebase migrations and security audits [at the orchestration layer](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Cloudflare's Project Glasswing applied parallel hunters, adversarial validators, and cross-repo tracers to vulnerability discovery [with measurable improvement](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) over generic coding agents.

Open questions remain substantial. The field is [quietly rediscovering distributed systems](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) without naming it as such: CRDTs for shared state, backpressure protocols, topology-to-reliability mappings, and formal failure recovery are all open. Multi-agent debate has meanwhile found practical application in synthetic data generation, where [BARRED uses adversarial agent debate](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) to produce training signal for small domain-specific classifiers that outperform GPT-4.1 on custom tasks.

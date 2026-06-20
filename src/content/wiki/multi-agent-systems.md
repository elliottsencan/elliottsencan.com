---
title: Multi-agent systems
summary: >-
  Multi-agent systems coordinate multiple LLM instances across structured
  topologies to handle tasks too large or complex for a single context window,
  with current research split between proving coordination is possible and
  measuring why it fails in production.
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
compiled_at: '2026-06-20T22:10:54.770Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5141
    output_tokens: 1308
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
  cost_usd: 0.035043
---
Multi-agent systems (MAS) pair multiple LLM instances so they can divide labor, check each other's outputs, and handle tasks that exceed any single context window. The field has passed through two recognizable waves. The first, circa 2023, asked whether agents could coordinate at all: CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen each demonstrated coordination in narrow conditions but shared failure modes including missing concurrency control and no escalation paths [Getting Up to Speed, Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). The second wave, 2025 onward, measured why these systems break in production. Empirical surveys covering MAST, MAS-FIRE, and Silo-Bench found failure rates between 41% and 87%, with inter-agent reasoning failures structurally harder to fix than prompt-level issues [Getting Up to Speed, Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

Taxonomically, the field has converged on shared vocabulary: Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model, and Chen et al.'s challenge levels all carve the design space in compatible ways, though gaps remain around unevolved agents and missing benchmarks [Getting Up to Speed, Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the). Coordination structure is not one-size-fits-all: convergent debate, adversarial debate, shared-notebook state, and the CALM theorem each fit different task structures, and matching the wrong topology to a task is itself a failure mode [Getting Up to Speed, Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Verification depends on modality shift, checking outputs in a different representation than the one used to produce them [Getting Up to Speed, Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6).

On the infrastructure side, Anthropic's Managed Agents service decouples the agent harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox layouts [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). Claude Code's dynamic workflows take this further, writing orchestration scripts that spin up hundreds of parallel subagents for large-scale tasks like codebase migrations or security audits [Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Zerostack's read-only parallel child agents show a narrower version of the same idea: delegating multi-file exploration without bloating the primary context achieves a 25% improvement in code exploration time [Subagents Design @ Zerostack](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack).

Multi-agent debate has also found a practical home in training data generation. The BARRED framework uses multi-agent debate to produce synthetic training data for fine-tuning small domain-specific classifiers, which outperform GPT-4.1 on custom policy tasks at lower cost [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your). In security, Cloudflare's Project Glasswing ran parallel hunter agents, adversarial validators, and cross-repo tracers against its own codebase, finding that the multi-agent harness improved vulnerability discovery over generic coding agents [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us).

The field's open problems map closely to unsolved distributed systems questions: topology-to-reliability relationships, CRDTs for shared state, failure recovery, and backpressure protocols. As Meiklejohn notes, MAS research is quietly rediscovering distributed systems without the vocabulary to name it [Getting Up to Speed, Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). Benchmarks compound the problem: HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery [Getting Up to Speed, Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).

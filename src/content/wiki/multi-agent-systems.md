---
title: Multi-agent systems
summary: >-
  Networks of cooperating LLM agents that divide tasks across specialized roles,
  with the field now grappling with failure rates of 41–87% in production and
  structural gaps borrowed from distributed systems theory.
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
compiled_at: '2026-06-20T12:46:06.612Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5141
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
  cost_usd: 0.033393
---
Multi-agent systems (MAS) arrange multiple LLM-powered agents to collaborate on tasks too large or complex for a single context window, assigning roles, routing work, and aggregating results. The architecture has developed in two recognizable waves. The first, around 2023, produced coordination proofs-of-concept: CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen each demonstrated that agents could divide labor and pass outputs between roles, though all shared failure modes like missing concurrency control and no escalation paths when a sub-task went wrong ["Wave 1"](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). The second wave shifted from demonstration to measurement. Empirical papers including MAST, MAS-FIRE, and Silo-Bench found failure rates of 41–87% in production settings, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues ["Wave 2"](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

The vocabulary for describing these systems is still settling. Meiklejohn's survey covers Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model, and Chen et al.'s challenge levels, noting that the terms expose gaps like unevolved agents and missing benchmarks ["Vocabulary"](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the). Benchmarks compound the problem: HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery ["Benchmarks"](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).

Coordination structure matters as much as the agents themselves. Debate between agents can be convergent or adversarial, and the CALM theorem argues that coordination structure must match task structure; distributed systems theory offers formalisms the field has yet to fully adopt ["Debate, State, and Coordination"](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Verification is another variable: modality shift, checking work in a different representation than it was produced, is identified as the key factor in output quality ["Verification Patterns"](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6).

Production deployments illustrate both the promise and the operational complexity. Anthropic's Managed Agents service separates the harness, session log, and sandbox into stable interfaces so model upgrades do not break clients, and supports multi-brain, multi-sandbox topologies that cut p50 time-to-first-token by roughly 60% ["Managed Agents"](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). Claude Code's dynamic workflows let Claude write its own orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations or security audits ["Dynamic Workflows"](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Cloudflare's Project Glasswing used parallel hunters, adversarial validators, and cross-repo tracers to improve vulnerability discovery over generic coding agents ["Project Glasswing"](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us). Multi-agent debate is also useful for data generation: the BARRED framework runs agents in adversarial debate to produce synthetic training data for fine-tuning small classifiers ["Vibe Training"](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your).

Open questions cluster around problems distributed systems already has names for: topology-to-reliability mapping, CRDTs for shared state, backpressure protocols, and failure recovery ["Open Questions"](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). The field is, as Meiklejohn puts it, quietly rediscovering distributed systems without the vocabulary to name it.

---
title: Multi-agent systems
summary: >-
  Multi-agent systems coordinate multiple LLM-backed agents to handle tasks too
  large or complex for a single context window, but empirical research shows
  failure rates of 41–87% in production, making coordination structure and
  verification as important as raw model capability.
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
compiled_at: '2026-07-09T23:25:48.925Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5431
    output_tokens: 1210
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
  cost_usd: 0.034443
---
Multi-agent systems (MAS) compose multiple LLM-backed agents that divide labor, communicate results, and check each other's work. The research field developed in two identifiable waves [as mapped by Christopher Meiklejohn](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the): a 2023 wave of coordination proofs-of-concept, followed by a 2025 wave focused on measuring why those systems fail in production.

The 2023 systems, including CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen, demonstrated that agents could coordinate at all, but shared structural weaknesses: no concurrency control, no escalation paths when agents disagree, and no principled recovery from failures [as catalogued in Part 3 of the series](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). Empirical work from 2025 and 2026 put numbers on those weaknesses. Papers surveyed under MAST, MAS-FIRE, and Silo-Bench found failure rates between 41% and 87%, with inter-agent reasoning failures structurally harder to fix than prompt-level issues [per Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

Coordination structure matters as much as model quality. Meiklejohn's series argues that convergent debate, adversarial debate, shared-notebook state, and the CALM theorem each suit different task types, and that distributed systems theory offers formalisms the MAS field is quietly rediscovering without the vocabulary to name them [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Output verification follows the same logic: checking work in a different representation than it was produced, what the series calls modality shift, improves reliability more reliably than re-prompting the same agent [Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6).

Production deployments illustrate the architecture choices this analysis implies. Anthropic's Managed Agents service decouples the agent harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox topologies [as described in the engineering post](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). Claude Code's dynamic workflows take this further, letting Claude write orchestration scripts that spawn hundreds of parallel subagents for tasks like codebase-wide migrations or security audits [per Anthropic's announcement](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Zerostack's subagent design narrows scope differently, using read-only parallel child agents for multi-file exploration to avoid bloating the main agent's context, reporting a 25% improvement in code exploration time [as detailed here](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack).

Security use cases show a distinct harness pattern. Cloudflare's Project Glasswing ran a multi-agent harness with parallel hunters, adversarial validators, and cross-repo tracers against its own codebases, finding that the harness structure improved vulnerability discovery substantially over a generic coding agent [per Cloudflare's report](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us).

Benchmarks remain a weak point. Standard tests like HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery, which means published MAS numbers are rarely comparable across systems [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). Open problems include matching topology to reliability guarantees, using CRDTs for shared agent state, and designing backpressure protocols, all of which the field is approaching without settled vocabulary [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

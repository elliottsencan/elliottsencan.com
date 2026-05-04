---
title: Agent coordination
summary: >-
  How multiple LLM-based agents divide work, share state, and resolve
  disagreements, and why coordination structure that mismatches task structure
  is a primary source of multi-agent system failure.
sources:
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - >-
    2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
aliases:
  - ai-coordination
compiled_at: 2026-05-04T04:10:14.743Z
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2751
    output_tokens: 585
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
  cost_usd: 0.017028
---
Agent coordination in LLM-based systems is the set of mechanisms by which [multiple agents divide tasks, exchange information, and arrive at consistent outputs](/wiki/multi-agent-systems). The field is still working out when coordination helps versus when it simply multiplies costs.

The empirical picture is sobering. [Meiklejohn's survey of MAST, MAS-FIRE, and Silo-Bench](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) found that multi-agent LLM systems fail 41-87% of the time across 1,600 traced runs. Crucially, the dominant failure mode is not coordination breakdown but information synthesis, meaning agents fail to integrate results correctly even when the coordination scaffolding works as intended.

The coordination mechanisms themselves are varied. [Meiklejohn's follow-up](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) surveys convergent debate, adversarial debate, shared-notebook state management, and the CALM theorem from distributed systems. The central argument there is that coordination structure must match task structure, and that [distributed systems theory already supplies the vocabulary the AI field keeps rediscovering](/wiki/distributed-systems).

The cost of getting this wrong is quantified by [Dickson's survey of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions): multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2-6x relative to a single-agent baseline. The practical implication is that single-agent systems should be the default unless the task structure genuinely requires parallelism or specialization.

When multi-agent architectures are warranted, [observability becomes critical](/wiki/production-systems). [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) is one example of a self-hosted agent runtime that builds in OpenTelemetry tracing alongside persistent memory and scheduling, treating coordination transparency as a first-class concern rather than an afterthought.

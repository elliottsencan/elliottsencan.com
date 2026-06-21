---
title: LLM orchestration
summary: >-
  LLM orchestration coordinates language models, agents, and supporting
  infrastructure through structured control flow, harness design, and governance
  layers to make multi-step AI work reliable and scalable.
sources:
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - 2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-21t112220-agentic-engineering
  - 2026-06/2026-06-21t130526-agentic-engineering
compiled_at: '2026-06-18T21:50:37.223Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3864
    output_tokens: 944
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
  cost_usd: 0.025752
last_source_added: '2026-06-21T20:05:26.957Z'
---
Orchestrating LLMs means more than chaining prompts. The sources here converge on a common problem: a single model in a single context window is too fragile and too limited for long-running, high-stakes tasks. The solutions span architectures, governance, and tooling.

The architectural consensus leans on role separation. Anthropic's harness work describes a GAN-inspired planner-generator-evaluator loop [Prithvi Rajasekaran](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) that sidesteps self-evaluation bias, and a two-agent initializer-plus-coding-agent design [Justin Young](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) that maintains progress across context windows. Ibrahim-3d's orchestrator plugin [Ibrahim-3d](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) extends this to include a virtual Board of Directors for architectural decisions, while Claude Code's dynamic workflows [Anthropic](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) now spawn hundreds of parallel subagents automatically.

Brian Suh argues that prompts alone cannot make agents reliable; deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, is what actually produces consistent behavior [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Anthropic's Managed Agents work supports this by decoupling the reasoning harness from sandboxes and session state into stable, swappable interfaces, cutting p50 time-to-first-token by 60% [Lance Martin et al.](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

At the governance layer, Speakeasy defines an AI control plane that sits between agents and every system they reach, enforcing identity, policy, and observability across all agent traffic [Sagar Batchu](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). MCP provides a protocol-level substrate for tool connectivity, and despite periodic skepticism it retains institutional backing [Substack](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees).

Two sources address the context problem directly. Recursive Language Models split long inputs into programmatic and token pools so an LLM can navigate massive datasets via a REPL, and their execution traces can bootstrap optimized agent architectures [dbreunig](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms). The harness-forge tool takes a meta-optimization angle, running a propose-score-Pareto-frontier loop to tune memory, retrieval, prompts, and context around a fixed model [Tristan Farmer](/reading/2026-06/2026-06-14t091145-001tmfharness-forge). AgentSwarms offers hands-on coverage of orchestration patterns including ReAct, RAG, and tool-calling [AgentSwarms](/reading/2026-06/2026-06-14t094245-agentswarms).

Taken together, the field is moving from prompt engineering toward system engineering: harnesses, control planes, and formal interfaces replacing ad-hoc prompt chains as the primary reliability mechanism.

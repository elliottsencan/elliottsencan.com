---
title: LLM orchestration
summary: >-
  LLM orchestration covers the architectures, harnesses, and control structures
  that coordinate one or more language models across multi-step tasks, from
  simple loop scaffolds to multi-agent pipelines with routing, state, and
  evaluation.
sources:
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - 2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors
  - 2026-05/2026-05-18t222802-raellioctowiz
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-21t112220-agentic-engineering
  - 2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router
  - >-
    2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences
  - 2026-06/2026-06-23t161552-the-coming-loop
  - 2026-06/2026-06-25t195020-strands-agents
  - 2026-07/2026-07-02t052125-jangles-bytepythia
  - 2026-08/2026-08-11t004752-danielmiesslerlifeos
compiled_at: '2026-11-24T03:59:34.569Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1249
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
  cost_usd: 0.036735
---
Orchestration is the structural layer between a raw language model and a useful system. It handles sequencing, state, tool dispatch, parallelism, and the boundary decisions about which model does what. The sources collected here trace this layer from early 2023 proof-of-concept multi-agent papers through to production-grade hosted services and open toolkits in 2026.

The canonical early framing comes from papers like CAMEL, ChatDev, MetaGPT, and AutoGen, surveyed in [Wave 1](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). These established that agents could coordinate at all, but shared failure modes: no concurrency control, no escalation paths, no durable state. The subsequent wave, covered in [the landscape overview](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), shifted attention from coordination proofs toward reliability measurement and agentic coding benchmarks.

A recurring design debate is where reliability comes from. Prompt engineering is the naive answer; several sources push back hard. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) tracks a data engineering agent through three architectures, concluding that environmental constraints, tool design, and context visibility outperform elaborate prompts. [Agents Need Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point in structural terms: explicit state transitions and validation checkpoints in software beat prompt chains that collapse under complexity.

On the harness side, Anthropic has published several architectural pieces. [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the agent harness, session log, and sandbox into stable interfaces so each layer can evolve independently. [Harness Design for Long-Running Apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator split that addresses context anxiety and self-evaluation bias. [Effective Harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) adds a two-agent initializer-plus-incrementer pattern for preserving state across context windows. [Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) takes this further by letting the model itself write orchestration scripts that spin up parallel subagents at scale.

A strategic counterpoint appears in [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat), which argues teams should skip building custom orchestration frameworks and instead expose domain APIs as MCP tool servers, letting frontier agents maintain the loop. The [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) project embodies this: it optimizes the scaffolding around a fixed model rather than replacing it.

Routing is another orchestration sub-problem. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to best-fit models by cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B preference-aligned router that maps queries to user-defined domains without retraining as the model roster changes.

One under-discussed risk is what orchestration does to code quality. [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies, producing defensive, opaque code and codebases that require machine participation to maintain. This tension between orchestration capability and human oversight is live and unresolved.

The coordination structure question is treated most formally in [Debate, State, and Coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate), which surveys convergent debate, adversarial debate, shared-notebook state, and the CALM theorem, arguing that distributed systems theory offers untapped formalisms that the field has largely ignored.

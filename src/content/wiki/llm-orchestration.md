---
title: LLM orchestration
summary: >-
  LLM orchestration covers the harness loops, control flow, routing logic, and
  multi-agent coordination structures that determine how language models are
  invoked, sequenced, and supervised in production systems.
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
compiled_at: '2026-08-11T07:58:46.166Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1403
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
  cost_usd: 0.039045
---
Orchestration is the layer between raw model capability and useful software: it decides which model runs, when, in what order, with what context, and under what constraints. The sources collected here trace that layer from early academic proofs-of-concept through production infrastructure.

The first wave of multi-agent research, covering systems like CAMEL, ChatDev, MetaGPT, and AutoGen, asked whether LLM agents could coordinate at all [Getting Up to Speed, Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the). The answer was conditionally yes, but those systems shared structural failures: no concurrency control, no escalation paths, and coordination mechanisms that did not match the structure of the tasks they were given [Wave 1](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). Later work on debate, shared state, and the CALM theorem pushed toward formalizing when agent interaction helps versus when it degrades output, borrowing from distributed systems theory [Debate, State, and Coordination](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate).

The practical engineering consensus that emerged from building real systems is that prompt engineering is the wrong tool for reliability. Deterministic control flow, explicit state transitions, and validation checkpoints do more work than elaborate prompt chains [Agents Need Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). A case study on a data engineering agent reinforces this: the system improved most when environmental constraints (tool design, ID keys, context visibility) were tightened, not when prompts were refined [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it).

For long-running tasks that exceed a single context window, harness design becomes the central engineering problem. Anthropic's Managed Agents separates the agent harness, session log, and sandbox into stable, swappable interfaces so the underlying model can be upgraded without breaking clients [Scaling Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). A GAN-inspired planner-generator-evaluator architecture addresses context anxiety and self-evaluation bias during multi-hour coding sessions [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). A two-agent initializer-plus-incremental-coder pattern achieves consistent progress across context windows by externalizing state to a progress file and git repo [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Recursive Language Models offer another angle: keeping data in a REPL environment and letting the model pull selectively into token space, so context rot is addressed structurally rather than by summarization [The Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

At the infrastructure level, orchestration splits into routing and governance. LLM routers match each request to the best-fit model for cost, latency, or quality; DigitalOcean's Inference Router uses a 30B mixture-of-experts model to do this dynamically [How We Built DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), while Arch-Router proposes a compact 1.5B model that aligns routing with user-defined preferences without retraining when new models are added [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). The governance side, sometimes called the AI control plane, unifies identity, policy enforcement, tool routing, and observability across all agents a system reaches [AI Control Plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors).

One strategic argument cuts against building custom orchestration at all: the orchestrator is not a defensible moat. Teams are better off shipping MCP tool servers and agent skills that extend frontier agents like Claude Code, letting model providers maintain the loop while the team invests in proprietary APIs and domain context [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat). Claude Code's dynamic workflows, which write orchestration scripts that spin up hundreds of parallel subagents automatically, make this position more concrete [Introducing Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code).

The risk that accompanies increased orchestration depth is not just technical. Outer harness loops amplify LLMs' tendencies toward defensive, opaque code, and codebases maintained through machine-generated orchestration may require machine participation to remain legible, narrowing the space for human engineering judgment [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop).

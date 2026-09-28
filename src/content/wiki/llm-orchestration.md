---
title: LLM orchestration
summary: >-
  LLM orchestration is the layer of control flow, harness design, and
  coordination logic that determines how language models are tasked, sequenced,
  and supervised, with current sources converging on structural engineering over
  prompt complexity as the path to reliability.
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
compiled_at: '2026-09-28T23:07:42.764Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6000
    output_tokens: 1302
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
  cost_usd: 0.03753
---
Orchestration, in the LLM context, refers to the machinery between a user request and a model response: the loops, harnesses, routing logic, state management, and inter-agent coordination that determine how work gets decomposed and executed. The concept spans a wide range of implementation choices, from thin scaffolding around a single model to full multi-agent pipelines with planning, execution, and evaluation layers.

The early wave of multi-agent research, documented by [Meiklejohn's survey of 2023 systems](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) covering CAMEL, MetaGPT, AutoGen and others, treated coordination as the primary research question. Those systems demonstrated that agents could divide labor, but shared failure modes persisted: no concurrency control, no escalation paths, and brittle role assignments. The field's second wave, per [Meiklejohn's landscape overview](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), shifted toward measuring reliability rather than proving coordination was possible.

That shift reflects a broader lesson across several sources: prompt engineering is the wrong lever for reliability. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traced three architectural iterations, concluding that environmental constraints (tool design, stable ID keys, context visibility) outperform elaborate prompts. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point structurally: explicit state transitions and validation checkpoints encoded in software hold up under complexity in ways prompt chains do not.

Anthropics's published engineering work addresses the harness layer directly. Their [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve without breaking clients. A [complementary post on long-running app development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator structure that addresses context anxiety and self-evaluation bias during multi-hour coding sessions. [Dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) extend this further, letting the model itself write orchestration scripts that spin up hundreds of parallel subagents for tasks like codebase-wide migrations.

Routing is one dimension of orchestration that has attracted dedicated research. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit backend for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B model that maps queries to user-defined domains for model selection, achieving strong alignment with human preferences without retraining when new models are added.

At the enterprise governance layer, [Speakeasy's AI control plane analysis](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes a meta-orchestration concern: unifying identity, policy enforcement, tool routing, and observability across every agent and system in an organization.

Not all commentary is optimistic about orchestration complexity. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops amplify LLMs' worst coding tendencies, producing defensive and opaque code that may require machine participation to maintain, which raises real questions about preserving human oversight. [Aiyan's strategic piece](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues the orchestration layer itself is not a competitive advantage and teams should invest in domain-specific tools and APIs instead, letting frontier providers maintain the loop.

The [Recursive Language Model framing](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) offers a different angle: keeping data in a REPL environment and letting the model selectively pull it into token space sidesteps context rot, and the resulting execution traces can inform more efficient agent designs. [Harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) operationalizes a related idea, running a propose-score-Pareto loop to optimize the scaffolding itself rather than the model weights.

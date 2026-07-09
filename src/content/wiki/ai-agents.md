---
title: AI Agents
summary: >-
  AI agents are LLM-powered systems that plan, execute, and verify tasks
  autonomously across multi-step workflows, with ongoing debate over
  architecture, memory, verification, and where humans should remain in the
  loop.
sources:
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - >-
    2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - 2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors
  - 2026-05/2026-05-14t222554-piyush-mishra-00helply
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-18t222802-raellioctowiz
  - >-
    2026-05/2026-05-19t134831-finite-attention-why-burnout-isnt-your-fault-and-how
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-28t074225-welcome-robot-overlords-please-dont-fire-us
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - 2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - >-
    2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - >-
    2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-21t112220-agentic-engineering
  - 2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents
  - 2026-06/2026-06-25t195020-strands-agents
  - 2026-07/2026-07-02t052125-jangles-bytepythia
compiled_at: '2026-07-09T14:07:04.857Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9951
    output_tokens: 1521
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
  cost_usd: 0.052668
---
An AI agent is a system where a language model drives a loop of reasoning, tool use, and action toward a goal without constant human instruction. The concept spans a wide range from single-model scripts to elaborate multi-agent pipelines, and the field is accumulating hard-won lessons about where autonomy works and where it breaks.

The most persistent architectural question is whether to use one agent or many. [Ben Dickson via AlphaSignal](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) synthesizes Stanford and Google/MIT research to argue that multi-agent orchestration carries a hidden coordination tax: errors can amplify up to 17x and tool-handling efficiency can drop 2 to 6x compared to single-agent baselines. The default should be a single agent, with multi-agent setups introduced only when the task genuinely requires parallelism or specialization. [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) and the [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) plugin represent the multi-agent end of the spectrum, coordinating dozens of models and tools in parallel; [Anthropic's GAN-inspired planner/generator/evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) sits in the middle, using role separation specifically to counter context anxiety and self-evaluation bias in long-running coding sessions.

Verification is the structural problem multi-agent work makes acute. [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable in verification patterns, with Cursor's visual feedback loop as the clearest real-world example. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the complementary point that reliable agents need deterministic control flow encoded in software, not increasingly elaborate prompts. The [12-factor-agents factor on unified state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for deriving all execution state from the context window so that debugging, recovery, and observability collapse into a single thread. These three pieces converge: the agent loop needs structure that prompts alone cannot provide.

Memory is a distinct unsolved layer. [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that memory systems fail because they store assertions rather than beliefs, missing provenance, confidence, and revision history. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures to let agents learn across sessions, and [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) layers schema metadata, human annotations, and self-improving memory to handle 600+ petabytes reliably. [AI Memory Systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) tracks 74 competing implementations, signaling how unsettled the space remains.

Safety concerns scale with capability. [Simon Willison](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents Claude Fable 5 autonomously inventing elaborate browser automation techniques to debug a CSS fix, then notes that the same resourcefulness makes unsandboxed agents genuinely dangerous. [Anthropic's vulnerability-discovery pipeline](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing as a structural control. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential exposure by keeping tokens encrypted on-device. The [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept generalizes this into a governance layer covering identity, policy enforcement, and observability across all agents in an enterprise.

The orchestration strategy question has a pragmatic answer from [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat): don't build a custom loop. Ship MCP tool servers and agent skills that extend frontier agents, letting the model provider maintain the loop while you invest in domain context and proprietary APIs. This view is echoed by the harness-design literature, including [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering), which argues the real engineering leverage is in the five harness subsystems — instructions, state, verification, scope, and session lifecycle — not in the model itself.

Capability is accelerating. [Ethan Mollick on Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) reports multi-hour autonomous workflows that delegate to sub-agents and deliver complex software, with the human role shifting from doing to commissioning. Task-completion horizons are [doubling roughly every year](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier), raising the stakes for getting architecture, memory, verification, and safety right before the capability curve outpaces the engineering.

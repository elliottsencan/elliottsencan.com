---
title: AI agents
summary: >-
  AI agents are LLM-powered systems that autonomously plan, act, and verify
  across multi-step tasks; the field's central tensions involve orchestration
  complexity, memory fidelity, verification rigor, and the cost of multi-agent
  coordination.
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
compiled_at: '2026-07-08T00:08:44.862Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9951
    output_tokens: 1667
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
  cost_usd: 0.054858
---
An AI agent is a system that wraps an LLM in a loop: the model reasons, selects tools, acts on the world, observes results, and iterates until a goal is met or a stopping condition fires. That basic loop is now applied across domains ranging from CI triage to video editing to vulnerability remediation, and the engineering decisions layered on top of it have become the substantive field of work.

The most contested question in agent design is whether to build custom orchestration at all. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that teams should skip proprietary frameworks and instead expose MCP tool servers that extend frontier agents like Claude Code, letting the model provider maintain the loop. That position is contested in practice by projects that build rich orchestration layers anyway. [Ibrahim-3d/orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) wraps Claude Code with a multi-agent pipeline covering planning, parallel execution, and a virtual board of directors for architectural decisions. [raelli/octowiz](/reading/2026-05/2026-05-18t222802-raellioctowiz) similarly routes coding workflows through dedicated skill libraries rather than monolithic prompts.

The choice between single- and multi-agent architectures has measurable consequences. [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) synthesizes Stanford and Google/MIT research showing that multi-agent orchestration can amplify errors up to 17x and reduce tool-handling efficiency by 2 to 6x, making single-agent systems the correct default for most tasks. [Getting Up to Speed on Multi-Agent Systems, Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that the key variable in multi-agent verification is modality shift: checking work in a different representation than it was produced, with Cursor's visual feedback loop cited as the strongest real-world example.

Reliability requires more than prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that deterministic state transitions and validation checkpoints encoded in software outperform elaborate prompt chains. The 12-factor-agents project extends this: [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) recommends unifying execution state and business state into a single context-window-derived thread, making the agent trivially serializable, debuggable, and resumable. The [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) curriculum formalizes this further into five harness subsystems: instructions, state, verification, scope, and session lifecycle.

Memory is a distinct problem from storage. [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that systems fail by storing bare assertions rather than beliefs with provenance, confidence, and revision history. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) implements biomimetic memory structures modeled on world facts, experiences, and mental models. OpenAI's internal data agent described in [Inside OpenAI's In-House Data Agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) layers schema metadata, human annotations, code enrichment, and self-improving memory to serve queries across 600 petabytes reliably.

Agent capability is advancing measurably. [Estimating No-CoT Task-Completion Time Horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) finds GPT-5.5 handles roughly 3-minute human tasks at 50% reliability, a capability doubling approximately every year since 2019. [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) reports Claude 5 Fable running multi-hour agentic workflows autonomously and delegating to sub-agents, though Ethan Mollick notes the human role has shifted from doing to commissioning.

Increased autonomy raises safety concerns that are structural, not incidental. [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents an agent autonomously inventing complex browser automation techniques to solve a trivial CSS problem, and warns that the same resourcefulness makes unsandboxed agents dangerous. [Anthropic's defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds to the attack surface by wrapping agentic pipelines in gVisor sandboxing. At enterprise scale, [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames governance as a distinct infrastructure layer covering identity, policy enforcement, tool routing, and observability across all agents.

Agentic VLM applications extend these patterns to multimodal inputs: [Vision Language Models](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger) surveys agents that operate on video and images, while [Poolday](/reading/2026-04/2026-04-30t231206-poolday) deploys a multi-agent system coordinating 100+ generative models to execute video edits end-to-end. The Mendral CI agent described in [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) applies the same loop to infrastructure: ingesting billions of log lines, tracing flaky tests to root causes, and opening fix PRs automatically.

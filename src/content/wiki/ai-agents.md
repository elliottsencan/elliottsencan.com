---
title: AI Agents
summary: >-
  AI agents are LLM-powered systems that autonomously plan, execute, and verify
  actions across tools and environments; the current literature argues over
  architecture, memory, state management, verification, and when multi-agent
  coordination helps versus hurts.
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
  - 2026-07/2026-07-09t161342-ai-2040-plan-a
  - 2026-08/2026-08-11t004752-danielmiesslerlifeos
  - >-
    2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test
compiled_at: '2026-10-26T22:19:34.709Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1559
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
  cost_usd: 0.054654
---
An AI agent, in the current engineering sense, is a system where a language model drives a loop: it receives context, selects actions (tool calls, code execution, API requests), observes results, and repeats until a goal is met or a stopping condition fires. The concept sounds simple; the implementation surface is enormous.

The most contested architectural question is whether to orchestrate multiple agents or keep things single. [AlphaSignal's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds multi-agent coordination introduces a hidden tax: errors can compound up to 17x and tool-handling efficiency drops 2-6x compared to single-agent baselines. The default should be one agent unless the task genuinely parallelizes. Yet multi-agent patterns keep appearing in production: Mendral's CI triage agent at PostHog handles 575K weekly jobs by ingesting billions of log lines and opening fix PRs automatically [via a single specialized agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), while Poolday's video editing platform [uses a multi-agent system](/reading/2026-04/2026-04-30t231206-poolday) to orchestrate 100+ generative models. Anthropic's own internal work describes a [GAN-inspired planner/generator/evaluator triad](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) that runs multi-hour coding sessions by structurally separating generation from critique.

Verification is where most agent implementations break down. [Christopher Meiklejohn's survey of multi-agent verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues the key variable is modality shift: checking output in a different representation than it was produced. Cursor's visual feedback loop is his strongest real-world example. Brian Suh pushes further, arguing that [agents need deterministic control flow in software](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts), not more elaborate prompts. Explicit state transitions and validation checkpoints are more reliable than prompt chains that collapse under complexity. The 12-factor-agents project's Factor 5 [makes a related point about state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents): unifying execution state and business state into a single context-window-derived thread simplifies serialization, recovery, and observability.

Memory is treated differently across the field. [Vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures (world facts, experiences, mental models) to let agents learn over time. A competing framing from [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues the real problem is not storage but belief maintenance: agents store assertions without provenance, confidence levels, or revision history, causing stale or contradictory beliefs to accumulate. OpenAI's internal data agent [addresses this via layered context](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent): schema metadata, human annotations, code enrichment, institutional docs, and self-improving memory across 600+ petabytes.

Safety concerns run through the literature at multiple levels. Simon Willison documents [Claude Fable autonomously inventing elaborate browser automation techniques](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) to debug a two-line CSS fix, then warns that the same resourcefulness makes unsandboxed coding agents dangerous. Anthropic's [vulnerability discovery harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing precisely for this reason. The sycophancy problem compounds agentic risk: [Bayesian modeling shows](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) that sycophantic models cause belief spiraling even in rational users, and eliminating hallucinations alone does not prevent it.

On the build-vs-extend question, [aiyan.io](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that teams should skip custom orchestration frameworks entirely, shipping MCP tool servers and agent skills that extend frontier agents like Claude Code instead. The moat is domain context and unique APIs, not the loop itself. The enterprise governance layer — identity, policy enforcement, tool routing, observability — is a separate concern addressed by what [Speakeasy calls the AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). Credential management for locally running agents is another distinct problem, with tools like [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeping tokens encrypted on-device.

Capability is still advancing fast. [LessWrong benchmarking](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) finds frontier models handle roughly 3-minute human tasks at 50% reliability, a capability doubling approximately every year since 2019. Ethan Mollick's experience with Claude Fable [finds the human role shifting](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) from doing to commissioning as agents run multi-hour workflows autonomously and delegate to sub-agents.

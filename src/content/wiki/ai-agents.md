---
title: AI agents
summary: >-
  AI agents are LLM-powered systems that take autonomous multi-step actions; the
  field's open questions center on architecture tradeoffs, memory and state
  management, verification, and where human oversight must remain.
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
compiled_at: '2026-09-07T21:08:24.014Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1479
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
  cost_usd: 0.053454
---
An AI agent is a system that uses a language model to plan and execute multi-step tasks with some degree of autonomy, calling tools, modifying state, and iterating toward a goal without constant human instruction. The category has expanded quickly from simple tool-calling loops to systems capable of multi-hour autonomous sessions, and the design decisions have become correspondingly consequential.

The most contested question in agent architecture is when to use multiple agents versus one. Research surveyed by [Ben Dickson at AlphaSignal](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, making single-agent defaults the sounder starting point for most tasks. That sits in tension with real deployments: [Mendral's CI triage agent](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team) handles 575K weekly jobs and 33M test executions by fanning work across agents, and [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) orchestrates 100+ generative models to produce fully editable video projects. Anthropic's own [GAN-inspired multi-agent architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) separates planner, generator, and evaluator roles to overcome context anxiety and self-evaluation bias during multi-hour coding sessions.

Verification is the area where agent reliability lives or dies. [Christopher Meiklejohn's survey of verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced in, is the key variable. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the complementary point: reliable agents need deterministic control flow encoded in software, not increasingly elaborate prompts. The [12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution and business state into a single context-window-derived thread so debugging, recovery, and forking become tractable.

Memory is still an unsolved problem. [Vectorize's Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures modeled on human cognition to let agents accumulate experience over time. A sharper framing from [Jakedismo's gist](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) is that memory systems fail because they store assertions rather than beliefs, missing provenance, confidence scope, and revision history. OpenAI's internal data agent [uses layered context](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) that includes schema metadata, human annotations, code enrichment, and self-improving memory to query 600+ petabytes reliably.

Safety concerns multiply with autonomy. [Simon Willison's observation of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents the model spontaneously inventing browser automation techniques to debug a two-line CSS fix, then flags that the same resourcefulness makes unsandboxed agents genuinely dangerous. [Anthropic's vulnerability-remediation harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing specifically to bound what an autonomous agent can touch. The sycophancy problem compounds this: a [Bayesian computational model](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that sycophantic outputs cause delusional belief spiraling even in ideally rational users, which matters because an agent acting on a user's miscalibrated beliefs can entrench rather than correct them.

Infrastructure around agents has matured into its own layer. [Speakeasy's control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) maps the governance requirements: unified identity, policy enforcement, tool routing, and observability across every agent in an enterprise. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses the credential problem specifically, keeping API tokens encrypted on-device so agents can authenticate without ever seeing raw secrets.

Where this heads is still open. [Ethan Mollick's report on Claude 5 Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) notes that multi-hour autonomous workflows have arrived but the human role has shifted from doing to commissioning. Capability measurements from [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) find frontier models completing roughly three-minute human tasks at 50% reliability with no chain-of-thought, a capability doubling roughly every year since 2019.

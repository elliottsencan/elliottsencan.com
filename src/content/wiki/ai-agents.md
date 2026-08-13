---
title: AI Agents
summary: >-
  AI agents are LLM-driven systems that plan, act, and iterate autonomously
  across tools and environments; current engineering practice centers on how to
  structure their control flow, memory, verification, and coordination to
  produce reliable results.
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
compiled_at: '2026-08-13T21:07:01.243Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1486
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
  cost_usd: 0.053559
---
An AI agent is a system where a language model drives a loop of reasoning and action, calling tools, reading results, and deciding next steps without continuous human instruction. The concept spans a wide range from a single model running a finite task to fleets of specialized sub-agents dividing work in parallel. What unites the sources here is that the architectural and operational choices surrounding that loop matter as much as the model powering it.

The question of single versus multi-agent design is contested. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) argues that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, making single-agent systems the right default for most tasks. Against that, [Anthropic's GAN-inspired planner/generator/evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) demonstrates how a structured multi-agent split can overcome context anxiety and self-evaluation bias in multi-hour coding sessions. [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) and the [Ibrahim-3d orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) show the same pattern applied to video editing and software planning respectively, using role separation to coordinate over 100 generative models or route high-stakes decisions to a virtual board of directors.

Control flow and state management are where most agent reliability problems originate. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the case that complex tasks need explicit state transitions and validation checkpoints encoded in software, not longer prompts. The 12-factor-agents project goes further, [arguing that execution state and business state should be unified into a single context-window-derived thread](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), making the agent's full history serializable, resumable, and debuggable from one place. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this into five harness subsystems: instructions, state, verification, scope, and session lifecycle.

Verification is its own discipline. [Christopher Meiklejohn's survey of multi-agent verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) identifies modality shift, checking work in a different representation than it was produced, as the key variable that separates effective self-checking from circular validation. Mendral's CI triage agent [illustrates this in production](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team), ingesting billions of log lines at PostHog's scale and opening fix PRs automatically.

Memory is consistently identified as a structural gap. [Vectorize-io's Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures, distinguishing world facts, experiences, and mental models, to let agents improve over time. A gist by Jakedismo [reframes the problem entirely](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): agents fail because they store assertions without provenance or confidence, and what they actually need is belief maintenance with supersession and outcome-scored pruning. The [AI memory systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) documents 74 systems across those dimensions.

Safety concerns attach to capability growth. [Simon Willison's documentation of Claude Fable 5](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) inventing elaborate browser automation to debug a two-line CSS fix illustrates how resourcefulness in capable agents becomes a risk surface when unsandboxed. Anthropic's [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) addresses one facet of this by running autonomous vulnerability discovery inside gVisor sandboxes. The [Latchkey credential layer](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) and the [AI control plane architecture survey](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) point at the governance layer: unified identity, policy enforcement, and observability across every agent and tool.

Capability benchmarking is moving fast. [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) find that frontier models now complete roughly three-minute human tasks at 50% reliability without chain-of-thought, a capability that has roughly doubled every year since 2019. Ethan Mollick's [hands-on report with Claude 5 Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) describes multi-hour autonomous workflows and sub-agent delegation as already usable, but notes that the human role has shifted from execution to commissioning.

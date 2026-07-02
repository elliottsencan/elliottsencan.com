---
title: AI agents
summary: >-
  AI agents are LLM-powered systems that take autonomous action across
  multi-step tasks; current practice centers on architecture choices,
  reliability patterns, memory design, and the coordination costs of multi-agent
  systems.
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
compiled_at: '2026-07-02T12:23:26.397Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9951
    output_tokens: 1494
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
  cost_usd: 0.052263
---
An AI agent is a system in which a language model drives autonomous action across a sequence of steps, using tools, memory, and control flow to accomplish goals without continuous human direction. The category spans everything from narrow CI triage bots to multi-hour autonomous coding sessions, and the engineering challenges involved have become a primary concern across the field.

The most basic architectural question is when to use multiple agents versus one. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) makes the case that single-agent systems should be the default: multi-agent orchestration introduces coordination overhead that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x. That said, multi-agent designs do appear in production for tasks that genuinely benefit from parallelism or specialization. Mendral's CI triage system processes 575K weekly jobs by running an agent that ingests billions of log lines and opens fix PRs automatically [](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). Poolday's video editing platform routes work through 100+ generative models via a multi-agent coordinator [](/reading/2026-04/2026-04-30t231206-poolday). Anthropic's own harness for long-running coding tasks uses a GAN-inspired planner-generator-evaluator triad to overcome context anxiety and self-evaluation bias [](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development).

Reliability is the persistent problem. Brian Suh argues that prompt engineering alone cannot produce dependable agents on complex tasks; what is needed is deterministic control flow encoded in software, with explicit state transitions and validation checkpoints [](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). The 12-factor-agents project formalizes this into a principle: unify execution state and business state into a single context-window-derived thread, so the entire history is serializable, debuggable, and resumable from any point [](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Verification is a related concern: Christopher Meiklejohn's survey of multi-agent verification patterns identifies modality shift as the key variable, checking work in a different representation than it was produced [](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6).

Memory is not just a storage problem. A belief-maintenance framing argues that agent memory systems fail when they store raw assertions without provenance, confidence, or revision history, and proposes architectures that track supersession and outcome-scored pruning [](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). The vectorize-io/hindsight project approaches this with biomimetic structures covering world facts, experiences, and mental models, reporting state-of-the-art results on LongMemEval [](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). OpenAI's internal data agent layers schema metadata, human annotations, code enrichment, and self-improving memory to query 600+ petabytes accurately [](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent).

Safety concerns attach to capability growth. Simon Willison documents Claude Fable 5 autonomously inventing elaborate browser automation techniques to solve a trivial CSS problem, and notes that the same resourcefulness that makes the agent useful makes it dangerous without sandboxing [](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Anthropic's vulnerability-discovery harness addresses this with gVisor sandboxing around an agentic pipeline for threat modeling, scanning, and patching [](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness). Sycophancy in underlying models introduces a subtler risk: a Bayesian computational model shows that sycophantic chatbots cause delusional belief spiraling even in ideally rational users, and that neither eliminating hallucinations nor warning users fully prevents the effect [](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in).

Enterprise deployment requires governance infrastructure beyond the agent itself. The AI control plane concept covers unified identity, policy enforcement, tool routing, and observability across every agent in an organization [](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). Credential handling is a concrete instance of this: Latchkey injects API tokens locally so agents can authenticate against services without ever seeing raw credentials [](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

Capability is measurably improving. Frontier models now handle tasks requiring roughly three minutes of human effort at 50% reliability, a threshold that has doubled approximately every year since 2019 [](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier). Ethan Mollick's hands-on report with Claude Fable 5 finds it capable of multi-hour autonomous workflows with sub-agent delegation, but observes that the human role has shifted from doing to commissioning [](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos).

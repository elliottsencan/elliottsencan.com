---
title: Agentic workflows
summary: >-
  Agentic workflows delegate multi-step tasks to LLM-powered systems that plan,
  call tools, and iterate autonomously — a design space where architecture,
  state management, reliability engineering, and human oversight are all
  actively contested.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - 2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively
  - 2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - >-
    2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup
  - >-
    2026-06/2026-06-20t053342-if-llms-have-human-like-attributes-then-so-does-age-of
  - 2026-06/2026-06-21t112220-agentic-engineering
  - >-
    2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk
  - 2026-06/2026-06-23t161552-the-coming-loop
  - 2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse
  - 2026-06/2026-06-25t195020-strands-agents
  - 2026-06/2026-06-30t173037-a-return-to-two-pizza-culture
compiled_at: '2026-07-06T00:07:45.172Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13725
    output_tokens: 1810
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
  cost_usd: 0.068325
---
An agentic workflow is any system where an LLM drives a loop: perceive context, decide an action, execute it via tools or code, observe the result, and repeat until a goal is reached. That loop is simple to describe and hard to make reliable. Most of the active engineering work in this space concerns what surrounds the model, not the model itself.

The basic taxonomy divides into single-agent and multi-agent architectures. [Research cited by Ben Dickson](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) argues that single-agent systems should be the default: multi-agent orchestration introduces a coordination overhead that can amplify errors up to 17x and reduce tool-handling efficiency by 2 to 6x. That said, parallelism has real value for tasks that decompose cleanly. Anthropic's Claude Code now supports dynamic workflows that spin up hundreds of parallel subagents for codebase-wide operations like migrations and security audits [(/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code)], and Cloudflare's Project Glasswing used parallel hunters, adversarial validators, and cross-repo tracers to improve vulnerability discovery over what a single agent could find [(/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us)]. Zerostack deploys read-only parallel child agents specifically for multi-file exploration, gaining 25% on code-exploration time without bloating the main agent's context [(/reading/2026-06/2026-06-11t023435-subagents-design-zerostack)].

Reliability is the central engineering problem. A data engineering agent described by Aiyan progressed through three architectures — rigid state machine, orchestrator, then a single general-purpose agent — and the main lesson was that environmental constraints (tool design, stable IDs, context visibility) outperform prompt engineering for controlling model behavior [(/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it)]. Brian Suh makes the same point more bluntly: agents need deterministic control flow encoded in software, not more elaborate prompts [(/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts)]. The 12-factor-agents project argues for unifying execution state and business state into a single context-window-derived thread, which simplifies serialization, debugging, and recovery [(/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents)].

State persistence across sessions is a structural weak point. Without it, each session re-derives decisions from scratch and the codebase accumulates incoherence [(/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup)]. Storybloq addresses this with a .story/ directory of JSON files that preserves session context across runs [(/reading/2026-05/2026-05-11t155625-storybloqstorybloq)]. Hindsight builds biomimetic memory structures — world facts, experiences, mental models — so agents accumulate knowledge rather than restarting from conversation history [(/reading/2026-05/2026-05-03t173422-vectorize-iohindsight)]. Zerostack's memory layer uses plain Markdown on disk with no vector stores, injected as XML context blocks [(/reading/2026-06/2026-06-11t023157-memory-design-zerostack)]. Anthropic's harness for long-running agents uses an initializer that scaffolds a feature list, git repo, and progress file alongside an incremental coding agent, enabling consistent progress across many context windows [(/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents)].

Observability and feedback close the improvement loop. Traces alone are insufficient; attaching feedback signals — user ratings, indirect behavior signals, LLM-as-judge, and deterministic rules — is what turns logging into learning [(/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning)]. Plurai auto-generates evaluation and guardrail models for agents without labeled data [(/reading/2026-05/2026-05-04t235011-plurai)], and the harness-forge skill runs a propose-score-Pareto loop to optimize scaffolding around a fixed model [(/reading/2026-06/2026-06-14t091145-001tmfharness-forge)].

Sandboxing and security are non-negotiable for autonomous agents. Claude Code running outside a container can leak credentials or destroy production data [(/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box)]. Anthropic's reference harness for vulnerability discovery uses gVisor sandboxing [(/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness)]. Latchkey keeps API credentials encrypted on-device so agents authenticate without seeing raw tokens [(/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents)]. Armin Ronacher warns that harness loops amplify LLMs' tendencies toward defensive, opaque code and risk producing codebases that require machine participation to maintain [(/reading/2026-06/2026-06-23t161552-the-coming-loop)].

The honest-account literature adds important friction. Christopher Meiklejohn found that even with 52 guardrails, Claude consistently declared work done after minimal checks, requiring manual verification of every feature [(/reading/2026-05/2026-05-03t110355-babysitting-the-agent)]. Lars Faye argues that full agentic coding workflows accelerate skill atrophy and create vendor dependency [(/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap)], while the Val Town blog proposes a "Slow Mode" that keeps humans involved at every step to preserve learning [(/reading/2026-05/2026-05-19t193626-slow-mode)].

At the organizational level, cheaper code generation does not remove the bottleneck: shared context, specification clarity, and management coherence determine whether agentic workflows compound alignment or misalignment [(/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code)]. Ethan Mollick's hands-on report with Claude 5 Fable notes the human role has shifted from doing to commissioning [(/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos)], a shift that requires new management skills most developers have not been trained for [(/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively)].

---
title: Agentic workflows
summary: >-
  Agentic workflows delegate multi-step tasks to AI agents operating with
  varying degrees of autonomy, raising interconnected challenges around state
  management, control flow, observability, memory, sandboxing, and
  organizational alignment.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - >-
    2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio
  - 2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
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
compiled_at: '2026-06-18T21:38:38.141Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10739
    output_tokens: 1310
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
  cost_usd: 0.051867
last_source_added: '2026-06-21T20:05:26.957Z'
---
An agentic workflow is one where an AI model takes a sequence of actions, calls tools, and makes decisions across multiple steps, often without a human approving each move. The engineering and organizational challenges this creates have become a coherent body of practice.

Control flow is the first structural concern. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents require deterministic state transitions and validation checkpoints encoded in software, not longer prompt chains, because prompt-based control is non-deterministic and cannot be verified at scale. The 12-factor-agents project extends this, recommending that execution state and business state be [unified into a single context-window-derived thread](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which simplifies serialization, recovery, and debugging. Anthropic's engineering work reinforces the point in practice: their [two-part harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer agent to scaffold a feature list and progress file so a coding agent can resume across context windows without losing track of where it is.

Memory and context persistence are equally foundational. Without them, each session re-derives foundational decisions from scratch and architectural drift accumulates. The [Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) treats this as a first-order startup risk, calling it agentic technical debt. Tools like [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) address it by persisting tickets, handovers, and roadmap state in a git-tracked directory. The open-source [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) system takes a more architectural approach, using biomimetic data structures and multi-strategy retrieval to build agent memory that improves over time.

Parallelism introduces its own tradeoffs. Anthropic's [Claude Code dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) now spawn tens to hundreds of parallel subagents for large-scale tasks. Zerostack's [subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) handles context bloat by constraining child agents to read-only tools. But [research summarized by Ben Dickson](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) warns that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and reduce tool-handling efficiency by 2-6x, making single-agent defaults sensible for most tasks.

Sandboxing is treated as non-negotiable by practitioners running agents that write and execute code. [Christian Ekrem](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) notes that Docker sandboxing prevents credential leaks while also removing confirmation prompts, making workflows faster. Anthropic's [vulnerability remediation harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor for the same reason at a more autonomous end of the spectrum. Simon Willison's observation that Claude Fable [spent $12 in tokens inventing novel debugging infrastructure](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) unsupervised underscores why scope and resource constraints matter.

Observability closes the loop. [Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone are insufficient: attaching feedback signals, whether user ratings, behavioral cues, or deterministic rules, is what converts observability data into a learning system. Anthropic's [Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, decoupling reasoning harnesses from sandboxes and session state so each can be iterated independently.

The organizational layer is where many workflows actually fail. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues agents amplify existing misalignment rather than fixing it; [Jappie](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) points to weak type systems, code distrust, and absent agent-management training as the real blockers. Both suggest that agentic workflows succeed or fail on organizational preconditions that the tooling cannot substitute for.

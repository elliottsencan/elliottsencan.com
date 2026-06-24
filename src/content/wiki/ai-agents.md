---
title: AI Agents
summary: >-
  AI agents are LLM-powered systems that pursue goals autonomously across
  multi-step tool use, code execution, and delegation — a fast-moving area where
  architecture choices around state, verification, memory, and orchestration
  have major practical consequences.
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
compiled_at: '2026-06-24T06:27:22.841Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9662
    output_tokens: 1622
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
  cost_usd: 0.053316
---
An AI agent is a system where a language model drives goal-directed behavior across multiple steps, deciding which tools to call, what code to execute, and when to escalate or delegate. The concept has matured quickly from novelty to production infrastructure, and the sources here collectively map the terrain of what works, what fails, and what engineering discipline the field still lacks.

The most basic design question is whether to use one agent or many. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) argues that multi-agent orchestration is not a default upgrade. Coordination overhead can amplify errors up to 17x and cut tool-handling efficiency by 2–6x, making single-agent systems the right starting point for most tasks. Multi-agent architectures earn their complexity only when tasks genuinely parallelize or require specialized roles. Anthropic's own engineering practice shows one principled multi-agent pattern: a planner-generator-evaluator triad, GAN-inspired, where each role checks a different failure mode, allowing multi-hour autonomous coding sessions to converge on polished output rather than drift [(/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development)]. A similar three-role structure appears in the orchestrator-supaconductor plugin, which adds a "Board of Directors" panel for high-stakes architectural decisions [(/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor)].

Verification is the central reliability problem. Christopher Meiklejohn's survey of verification patterns concludes that the most effective approach is modality shift: checking work in a different representation than it was produced in, with Cursor's visual feedback loop as the clearest real-world example [(/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6)]. Brian Suh makes a complementary point: reliability requires deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not increasingly elaborate prompts [(/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts)]. The 12-factor-agents project operationalizes this by advocating that execution state and business state be unified into a single context-window-derived thread, making the agent's full history serializable, debuggable, and recoverable from any point [(/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents)].

Memory is a second area where naive implementations consistently fail. The hindsight project builds biomimetic memory structures — world facts, experiences, mental models — rather than raw conversation history [(/reading/2026-05/2026-05-03t173422-vectorize-iohindsight)]. A more theoretical framing treats agent memory as a belief-maintenance problem: storing assertions without provenance, confidence, or revision history leads to stale or contradictory beliefs accumulating undetected [(/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage)]. OpenAI's internal data agent addresses this with layered context — schema metadata, human annotations, code enrichment, and self-improving memory — to serve accurate analytics across 600+ petabytes [(/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent)].

Safety and trust are not separable from capability. Simon Willison documents Claude Fable 5 autonomously inventing elaborate browser automation sequences to debug a two-line CSS fix, then notes that the same resourcefulness makes unsandboxed agents genuinely dangerous [(/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive)]. Anthropic's reference harness for vulnerability discovery uses gVisor sandboxing to constrain an autonomous patching pipeline [(/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness)]. Sycophancy is a subtler trust hazard: a Bayesian model shows that sycophantic chatbots can induce delusional belief spiraling even in ideally rational users, and informing users of the sycophancy does not reliably prevent the effect [(/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in)].

At the infrastructure layer, enterprises need governance that spans agents: a unified control plane covering identity, policy enforcement, tool routing, and observability [(/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors)]. Context delivery matters too. A zero-dependency bash CLI that tiers project context into machine-readable manifests lets agents navigate knowledge bases without burning excess tokens [(/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base)]. One practical deployment argument follows from this: rather than building custom orchestration, teams should ship MCP tool servers and agent skills that extend frontier agents like Claude Code, letting Anthropic maintain the loop while the team invests in domain-specific APIs [(/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat)].

Capability is still expanding rapidly. Frontier models now complete tasks that would take a human roughly three minutes, at 50% reliability, with that horizon doubling each year since 2019 [(/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier)]. Ethan Mollick's hands-on report with Claude Fable 5 finds multi-hour autonomous workflows now credible, but notes the human role has shifted from doing to commissioning [(/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos)]. That shift carries its own engineering discipline: operating instructions for agents during long coding sessions emphasize epistemic hygiene — distinguishing confirmed from inferred claims, maintaining rollback discipline, and exercising judgment at decision forks [(/reading/2026-06/2026-06-13t083401-sgupai-fable5md)].

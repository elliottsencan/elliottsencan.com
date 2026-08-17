---
title: AI agents
summary: >-
  Autonomous AI agents that plan, act, and iterate without continuous human
  input are shifting from prototype to production infrastructure, forcing
  concrete choices about architecture, memory, verification, and governance.
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
compiled_at: '2026-08-17T18:38:59.364Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1476
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
  cost_usd: 0.053409
---
An AI agent is a system that takes a goal, generates a sequence of actions or tool calls to pursue it, and iterates based on results, without a human approving each step. The concept has moved fast enough that the practical questions are no longer whether agents work but how to structure them so they work reliably.

The most direct architectural tension is between single-agent and multi-agent designs. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, making single-agent systems the right default for most tasks. That caution is real, but it does not dissolve the cases where parallelism or specialization genuinely matters. [Anthropic's GAN-inspired planner/generator/evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) shows how separating roles can overcome context anxiety and self-evaluation bias during multi-hour coding sessions, and [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) orchestrates 100+ generative models in parallel to produce fully editable video projects.

Control flow is the piece most teams underinvest in. [Brian Suh argues](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) that reliable agents need explicit state transitions and validation checkpoints encoded in software, not increasingly elaborate prompts. The 12-factor-agents project reinforces this at the state layer: [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) recommends unifying execution state and business state into a single context-window-derived thread, making serialization, recovery, and debugging all derive from one source of truth. [The walkinglabs harness-engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names the five subsystems that make this concrete: instructions, state, verification, scope, and session lifecycle.

Verification is where multi-agent designs earn their keep. [Christopher Meiklejohn's survey](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that the key variable is modality shift: checking work in a different representation than it was produced. Cursor's visual feedback loop is his strongest real-world example. Without some form of independent checking, sycophancy compounds: [a Bayesian computational model](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that sycophantic responses cause delusional belief spiraling even in ideally rational users, and neither eliminating hallucinations nor warning users fully prevents the effect.

Memory is a distinct unsolved problem. Most current systems treat it as conversation history, which is insufficient for long-running tasks. [Vectorize-io's Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic structures covering world facts, experiences, and mental models. A sharper framing comes from [Jakedismo's belief-maintenance argument](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): agents fail because they store assertions rather than beliefs, missing provenance, confidence, scope, and revision history. The practical corollary is that memory systems need supersession and outcome-scored pruning, not just append-only logs. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) addresses this with layered context: schema metadata, human annotations, code enrichment, institutional docs, and self-improving memory across 600+ petabytes.

Governance and safety are becoming infrastructure-level concerns. [Speakeasy's AI control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames the enterprise need as a unified governance layer covering identity, policy enforcement, tool routing, and observability across every agent. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential security specifically, keeping tokens encrypted on-device so agents can authenticate against services without ever seeing raw credentials. [Simon Willison's documentation of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix illustrates why sandboxing is not optional: the same resourcefulness that makes agents useful makes unsandboxed agents genuinely dangerous.

The capability trajectory is measurable. [A LessWrong analysis](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) finds GPT-5.5 handles roughly three-minute human tasks at 50% reliability without chain-of-thought, a capability doubling roughly every year since 2019. [Ethan Mollick's hands-on report with Claude 5 Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) notes multi-hour autonomous workflows and sub-agent delegation working well in practice, but observes that the human role has shifted from doing to commissioning.

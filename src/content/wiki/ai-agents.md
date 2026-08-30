---
title: AI agents
summary: >-
  AI agents are LLM-powered systems that plan, act, and loop autonomously;
  sources collectively map the architecture, coordination tradeoffs, memory
  design, verification patterns, and safety constraints that determine whether
  they work reliably in practice.
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
compiled_at: '2026-08-30T05:46:11.024Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1504
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
  cost_usd: 0.053829
---
An AI agent is a software system in which a language model drives a loop of reasoning, tool use, and action over some time horizon, often without direct human intervention at each step. The category spans narrow task runners and elaborate multi-agent pipelines, but the engineering questions are consistent: how do you give an agent reliable state, useful memory, trustworthy verification, and safe access to the world?

The most immediate architectural question is whether to use a single agent or multiple. [AlphaSignal's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) argues single-agent should be the default: multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and reduce tool-handling efficiency by 2-6x. The case for multiple agents is real but specific. [Anthropic's engineering post on long-running applications](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator triad that overcomes self-evaluation bias during multi-hour autonomous coding sessions. [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) orchestrates 100+ generative models for end-to-end video editing. The pattern that justifies multi-agent setups is role specialization with explicit handoffs, not general coordination.

Verification is where most agent pipelines fail quietly. [Christopher Meiklejohn's survey of verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues the key variable is modality shift: checking work in a different representation than it was produced. Brian Suh's piece on [control flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the complementary point that reliable agents need deterministic state transitions and validation checkpoints encoded in software, not increasingly elaborate prompts. The 12-factor-agents project pushes further: [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues execution state and business state should be unified in a single context-window-derived thread, making serialization, debugging, and recovery trivial.

Memory is a harder problem than it first appears. [Vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures (world facts, experiences, mental models) that let agents improve over time. A sharper critique comes from [Jakedismo's gist on belief maintenance](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): agents fail because they store assertions without provenance, confidence, or revision history, turning stale facts into confident errors. OpenAI's internal data agent [addresses this with layered context](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent): schema metadata, human annotations, code enrichment, institutional docs, and self-improving memory over 600+ petabytes.

Sycophancy introduces a related failure mode. [Chandra et al.](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) show via Bayesian modeling that even ideal reasoners spiral into delusional beliefs when the model confirms rather than corrects them. Neither removing hallucinations nor warning users fully prevents the effect, which implies agent pipelines need external evaluation stages rather than relying on the same model to self-assess.

Safety and scope containment become acute as agents grow more capable. [Simon Willison's report on Claude Fable 5](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents the model autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, then flags that the same resourcefulness makes unsandboxed agents genuinely dangerous. [Anthropic's defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing for autonomous vulnerability discovery. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps API credentials encrypted on-device so agents authenticate against external services without ever seeing raw tokens.

The infrastructure layer around agents is maturing rapidly. [Speakeasy's AI control plane overview](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) maps the governance layer enterprises need for unified identity, policy enforcement, tool routing, and observability across every agent. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) auto-generates training data and evaluation models for agent guardrails at sub-100ms latency. [Ethan Mollick's hands-on report with Claude Fable 5](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) notes the shift in human role: from doing to commissioning, with agents delegating to sub-agents across multi-hour workflows. That shift is the practical consequence of the capability trajectory [measured by Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier): frontier models now complete roughly three-minute human tasks at 50% reliability without chain-of-thought, a capability that has doubled annually since 2019.

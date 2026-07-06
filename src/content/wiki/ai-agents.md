---
title: AI Agents
summary: >-
  AI agents are LLM-powered systems that take autonomous multi-step action;
  current sources collectively map their architecture patterns, memory
  requirements, verification problems, and the hidden costs of scaling them.
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
compiled_at: '2026-07-06T00:08:24.726Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9951
    output_tokens: 1548
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
  cost_usd: 0.053073
---
An AI agent is a software system in which an LLM drives a loop of decision, action, and observation rather than answering a single prompt. The practical boundary between a capable chatbot and an agent is blurring fast: [Claude Fable 5](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) now runs multi-hour autonomous workflows, delegates to sub-agents, and delivers complex software with the human role shifted from doing to commissioning. Measured capability roughly doubles every year; one estimate puts GPT-5.5 at 50% reliability on tasks that take a human about three minutes, with implications that compound as the horizon extends [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier).

Architecture choices made early tend to compound. The dominant pattern is a planner-generator-evaluator triad, drawn from GAN thinking, where a separate evaluator counteracts the self-evaluation bias that causes a single model to accept its own mediocre output [Anthropic engineering](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). A matching principle appears in multi-agent verification research: checking work in a different representation than it was produced (modality shift) is the strongest known lever for catching errors, with Cursor's visual feedback loop cited as the best real-world instance [Meiklejohn](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). The 12-factor-agents project adds a structural discipline: unify execution state and business state into a single context-window-derived thread so the agent is serializable, resumable, and debuggable without a second state machine running beside it [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Multi-agent orchestration is not the default-good choice many teams assume. Stanford and Google/MIT research cited by [Dickson](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that coordination overhead can amplify errors up to 17x and cut tool-handling efficiency by 2-6x; single-agent systems should be the default and multi-agent the deliberate upgrade. When multi-agent is warranted, the orchestration layer itself is not a defensible moat: [aiyan.io](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues teams should ship MCP tool servers and domain skills rather than custom loop logic, letting frontier agents like Claude Code maintain the execution harness.

Memory is the axis where agent architectures diverge most sharply. A plain comparison table covers 74 systems across architecture, search mode, and lifecycle [ai-memory-comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison), but the more pointed critique is that most of them store assertions instead of beliefs. Without provenance, confidence score, and revision history, an agent cannot tell a stale fact from a current one or a hallucination baked in at ingest from a verified claim [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). The vectorize-io/hindsight project addresses this with biomimetic memory structures that separate world facts, experiences, and mental models so the agent can learn and improve across sessions [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). OpenAI's internal data agent handles a harder version of the same problem by layering schema metadata, human annotations, code enrichment, and self-improving memory over 600 petabytes of datasets [OpenAI](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent).

Reliability across long tasks requires deterministic scaffolding around the model. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that explicit state transitions and validation checkpoints in code outperform elaborate prompt chains, which collapse under complexity. [walkinglabs](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names five harness subsystems: instructions, state, verification, scope, and session lifecycle. The epistemic discipline required inside the agent loop mirrors what the harness enforces externally: [sgup/ai](/reading/2026-06/2026-06-13t083401-sgupai-fable5md) defines an operating contract covering confirmed versus inferred claims, rollback discipline, and judgment at decision forks.

Security and governance concerns scale with autonomy. Claude Fable's resourcefulness, inventing PyObjC screenshot capture and CORS servers to debug a CSS fix, is exactly what makes unsandboxed agents dangerous [Willison](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Anthropic's vulnerability-discovery harness wraps agentic pipelines in gVisor sandboxing [defending-code](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness). Enterprise deployments need a control plane: unified identity, policy enforcement, tool routing, and observability across every agent touching production systems [Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). Credential management is a distinct layer; Latchkey solves it by injecting API tokens locally so agents authenticate against external services without ever seeing raw credentials [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

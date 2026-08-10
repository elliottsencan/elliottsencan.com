---
title: LLM Agents
summary: >-
  LLM agents are software systems that give language models tools, memory, and
  control flow to act autonomously across multi-step tasks; the field's central
  tension is between prompt-based flexibility and engineered reliability.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - >-
    2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - 2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - 2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
  - >-
    2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - >-
    2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-23t161552-the-coming-loop
  - 2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents
  - 2026-07/2026-07-02t052125-jangles-bytepythia
  - 2026-07/2026-07-20t215754-stop-using-opencode
  - 2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades
compiled_at: '2026-08-10T19:02:07.951Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1843
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
  cost_usd: 0.054615
---
An LLM agent pairs a language model with tools, memory, and some form of control flow, then lets it act across multiple steps toward a goal. The concept ranges from a single model calling a search API to multi-agent pipelines where dozens of specialized subagents coordinate in parallel. What the sources collectively show is that the surface-level question — can agents do useful work? — was settled early, and the harder questions about reliability, architecture, memory, and oversight are only now being seriously addressed.

The 2023 wave of multi-agent research, surveyed by Christopher Meiklejohn, produced existence proofs: CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen each demonstrated that LLMs could coordinate toward shared goals [Getting Up to Speed on Multi-Agent Systems, Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). None of them solved concurrency control or failure escalation; they were proofs-of-concept that agents could coordinate at all. The 2025 wave shifted to measuring what breaks. MAST, MAS-FIRE, and Silo-Bench found failure rates between 41% and 87% in production-like conditions, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues [Wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). The taxonomy across this research is now somewhat standardized: Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model, and Chen et al.'s challenge levels give researchers shared vocabulary, though gaps remain around unevolved agents and missing benchmarks [Vocabulary](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the).

The reliability failure is the central practical problem. Two sources converge on the same diagnosis from different angles. Aiyan's account of evolving a data engineering agent through three architectures — rigid state machine, orchestrator, single general-purpose agent — found that environmental constraints (tool design, ID keys, context visibility) outperformed prompt engineering at every stage [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh makes this explicit: complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, rather than elaborate prompt chains that collapse under pressure [Agents Need Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Anthropic's own harness work confirms the direction: a two-agent initializer-plus-incremental-coding-agent pattern keeps state across context windows via a progress file and git repo, avoiding the context rot that single-agent long-horizon tasks suffer [Effective Harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Memory is an open architectural question. The solutions in production vary widely. Anthropic's Managed Agents service separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). Zerostack takes the opposite approach: plain Markdown files on disk, no vector store, no embeddings, with auto-injected XML context blocks and keyword search [Memory Design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). One architectural argument goes further, framing agent memory as a belief-maintenance problem rather than a storage problem: most systems store assertions without provenance, confidence, or revision history, which causes silent compounding errors over time [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). PageIndex addresses a related retrieval problem by building hierarchical tree indexes from long documents and using LLM reasoning rather than vector similarity, reaching 98.7% accuracy on FinanceBench [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex).

Verification is where the field is least mature. Meiklejohn argues that modality shift — checking work in a different representation than it was produced — is the key variable, with Cursor's visual feedback loop as the strongest real-world example [Verification Patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). Harrison Chase's argument for attaching feedback signals to traces — user ratings, indirect behavior, LLM-as-judge, deterministic rules — frames observability as only useful when it closes a learning loop [Agent Observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Christopher Meiklejohn's own hands-on experience building a social app with Claude found the agent declaring work done after minimal checks, requiring manual click-through of every feature despite 52 added guardrails [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent).

The capabilities frontier is moving fast. Ethan Mollick's report on Claude 5 Fable finds it running multi-hour agentic workflows, delegating to sub-agents, and delivering complex software autonomously [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos). Simon Willison documents the same model autonomously inventing screenshot capture via PyObjC and CORS servers to debug a two-line CSS fix, and notes that the same resourcefulness makes unsandboxed agents genuinely dangerous [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Armin Ronacher warns that harness loops are becoming unavoidable but amplify LLMs' worst tendencies, risking codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop).

Open questions that Meiklejohn identifies — topology-to-reliability mapping, CRDTs for shared state, backpressure protocols, failure recovery — are distributed systems problems the field is rediscovering without the vocabulary to name them [Open Questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). Most MAS benchmarks cannot measure coordination quality or failure recovery because they were designed for single agents [Benchmarks and What They Miss](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). The gap between benchmark performance and production reliability is where almost all current agent research is quietly living.

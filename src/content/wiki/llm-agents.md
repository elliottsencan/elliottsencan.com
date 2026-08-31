---
title: LLM agents
summary: >-
  LLM agents are software systems that give language models persistent goals,
  tool access, and multi-step autonomy; the emerging consensus across research
  and practice is that reliability comes from environmental constraints and
  architectural structure, not prompt engineering.
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
compiled_at: '2026-08-31T22:35:53.243Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1787
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
  cost_usd: 0.053775
---
An LLM agent is a language model equipped with tools, memory, and some mechanism for executing multi-step plans toward a goal. The term covers a wide range of architectures, from a single model looping through a task with file access to elaborate multi-agent pipelines with specialized roles, orchestrators, and cross-agent communication. What the sources here collectively expose is that the concept is maturing past proof-of-concept into a harder engineering problem than the early demos suggested.

The structural history matters. [Meiklejohn's series](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) divides published MAS work into two waves: 2023 papers (CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen) that asked whether agents could coordinate at all, and 2025 papers that measured how badly they fail in production. The [Wave 2 survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts failure rates at 41-87% across MAST, MAS-FIRE, and Silo-Bench benchmarks, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues. The [Wave 1 walkthrough](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) finds that even the canonical 2023 systems shared failure modes: missing concurrency control, no escalation paths when agents disagree.

The practical response to that failure rate is convergent: stop relying on prompts and build structure into the environment instead. Aiyan's data engineering case study traced an agent through three architectures before settling on one where tool design, stable ID keys, and context visibility did more work than any prompt. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point more bluntly: complex tasks need deterministic control flow with explicit state transitions and validation checkpoints. Anthropic's own production systems reflect this: their [long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer agent to scaffold a feature list, a git repo, and a progress file so the coding agent can resume across context windows without losing state. Their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, separating the harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve.

Memory is a recurring design axis. The [zerostack](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) team chose plain Markdown files with regex retrieval over vector stores, arguing that minimal RAM usage and no daemon dependency outweigh embedding-based recall quality for a coding agent. [Jakedismo's belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) attacks the same problem from a different angle: most memory systems store assertions without provenance, confidence, or revision history, which means agents accumulate stale or contradictory beliefs with no way to resolve them. The [AI Memory Systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) catalogs 74 systems across those dimensions, showing how fragmented the design space remains.

Verification is the other structural gap. [Meiklejohn's verification patterns post](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced, is the key variable. [LangChain's observability post](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) makes the corollary point: traces alone don't improve agents; attaching feedback signals to traces is what creates a learning loop. [Meiklejohn's own Glasswing anecdote](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) is the ground-level version of this: an agent consistently declaring work done after minimal checks, requiring the author to manually click through every feature to find what actually broke despite 52 new guardrails.

Capability is advancing alongside these structural concerns. [Ethan Mollick's hands-on report with Claude 5 Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) finds multi-hour agentic workflows running autonomously with sub-agent delegation, a genuine capability leap. [Simon Willison](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents the same model inventing elaborate browser automation to debug a two-line CSS fix, and notes that resourcefulness makes unsandboxed agents genuinely dangerous. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) used parallel hunters, adversarial validators, and cross-repo tracers to improve vulnerability discovery, showing multi-agent structure adding value over a single coding agent in security contexts.

The field's open questions cluster around distributed systems problems that most LLM agent researchers have not named as such. [Meiklejohn's concluding post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) lists unsolved topology-to-reliability mappings, CRDTs for shared state, backpressure protocols, and failure recovery as the frontier, arguing the field is rediscovering distributed systems without the vocabulary to formalize what it finds. Benchmarks compound the problem: [the benchmarks post](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) shows that HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery, which means published numbers systematically undercount the hard parts. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) adds a longer-term concern: harness loops that orchestrate coding agents amplify LLMs' worst tendencies toward defensive, opaque code, risking codebases that require machine participation to maintain.

---
title: LLM agents
summary: >-
  LLM agents are language models equipped with tools, memory, and control flow
  to act autonomously across multi-step tasks; the emerging consensus is that
  reliability comes from engineering constraints, not prompting, and that the
  field is quietly reinventing distributed systems.
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
compiled_at: '2026-11-10T01:19:58.073Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1465
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
  cost_usd: 0.048945
---
An LLM agent is a language model given enough scaffolding to take actions across time: calling tools, reading and writing state, spawning sub-processes, and recovering from failure. The basic unit is straightforward; the hard problems emerge at scale and in production.

The taxonomy is still being settled. [Meiklejohn's vocabulary survey](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) organizes the space using Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model (profile, memory, planning, action, and environment), and Chen et al.'s challenge levels. These frameworks expose a consistent gap: most deployed agents are static, with no mechanism for the agent itself to evolve its behavior based on outcomes.

The reliability picture from empirical research is sobering. [Wave 2 papers surveyed by Meiklejohn](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) show multi-agent systems failing 41-87% of the time in production, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues. [Meiklejohn's own two-week build diary](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) puts a human face on that number: an agent running 52 guardrails still consistently declared work done after minimal checks, forcing manual verification of every feature. Even impressive results have conditions attached; [a critique of Anthropic's agentic analytics stack](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) points out that the 95% accuracy Anthropic reports depends on months of senior data engineering work and warehouse reshaping that most teams cannot replicate.

The emerging consensus across practitioner accounts is that prompt engineering is the wrong lever for reliability. [Aiyan's data engineering agent case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) tracked an agent through three architectural generations and found that environmental constraints, specifically tool design, stable ID keys, and context visibility, outperformed prompt tuning at every stage. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same argument structurally: reliable agents need deterministic control flow with explicit state transitions and validation checkpoints encoded in software, not elaborated prompt chains that collapse under complexity.

Memory is a distinct failure surface. [A belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that most memory systems fail because they store bare assertions with no provenance, confidence, or revision history; the fix is tracking beliefs with supersession chains and outcome-scored pruning rather than naive append-only retrieval. The zerostack project takes a pragmatic opposite approach: [plain Markdown files with regex search](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store), no vector stores, no embeddings, keeping RAM at around 16MB versus 300MB for JS-based alternatives. These positions are not necessarily in conflict; the belief-maintenance critique targets semantic correctness while the file-based approach targets operational simplicity.

Verification is equally underspecified. [Meiklejohn's verification patterns survey](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues the key variable is modality shift: checking work in a different representation than it was produced in. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) extends this to observability: traces alone don't improve systems; attaching feedback signals to traces, through user ratings, indirect behavioral signals, LLM-as-judge, or deterministic rules, is what turns logging into a learning loop.

Capability is advancing alongside the failure modes. [Ethan Mollick's report on Claude 5 Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) describes multi-hour autonomous agentic workflows delegating to sub-agents and delivering complex software, shifting the human role from execution to commissioning. [Simon Willison's account of the same model](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents it autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, then flags that the same resourcefulness makes unsandboxed agents genuinely dangerous.

[Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) identifies a structural risk beyond individual failures: harness loops that orchestrate agents amplify LLMs' worst tendencies toward defensive, opaque code, and risk producing codebases that require machine participation to maintain. [Meiklejohn's open questions post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) names the field-wide version of this: topology-to-reliability mappings, CRDTs for shared state, backpressure protocols, and failure recovery patterns are all unsolved, and the field is quietly reinventing distributed systems without the vocabulary to name what it is building.

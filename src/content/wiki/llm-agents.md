---
title: LLM agents
summary: >-
  LLM agents are software systems that give language models the ability to take
  multi-step actions in an environment; the sources collectively map their
  architectures, failure modes, memory designs, and the engineering discipline
  required to make them reliable.
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
compiled_at: '2026-07-01T02:00:34.493Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8508
    output_tokens: 1628
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
  cost_usd: 0.049944
---
An LLM agent pairs a language model with tools, environment access, and some form of control flow so it can execute multi-step tasks rather than produce a single response. The taxonomy has grown quickly. [Meiklejohn's vocabulary post](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) draws on Tran et al.'s four-axis typology and Zhou et al.'s five-component agent model to organize the conceptual space, while noting that gaps remain: most deployed agents cannot evolve their own behavior, and benchmark coverage of coordination quality is thin.

The history of multi-agent research falls into two waves. The 2023 wave, covered in [Meiklejohn's Wave 1 post](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), produced proof-of-concept coordination systems (CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen) that demonstrated agents could divide labor but shared failure modes: no concurrency control, no escalation paths. The 2025-2026 wave shifted to measurement. [Wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) surveys MAST, MAS-FIRE, and Silo-Bench, finding inter-agent failure rates between 41% and 87% in production settings, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues.

Reliability is the central engineering problem. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces three architectural iterations, concluding that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same argument at the design level: reliable agents need deterministic control flow and explicit validation checkpoints encoded in software, not longer prompt chains. Meiklejohn's [open questions post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) notes the field is quietly rediscovering distributed systems — topology-to-reliability, CRDTs for shared state, backpressure protocols — without the vocabulary to name it.

Verification is a sub-problem of its own. [Meiklejohn's verification patterns post](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable. [Meiklejohn's personal experience](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) building a social app with Claude illustrates the cost of missing this: the agent repeatedly declared work done after minimal checks, requiring manual human verification of every feature.

Harness design is where much current production work lives. [Anthropic's harness post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent initializer-plus-incremental-coder pattern that maintains state across context windows via a progress file and git repo. [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, separating harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops are becoming unavoidable but amplify LLMs' worst tendencies, risking codebases that require machine participation to maintain.

Memory is a persistent design challenge. The space ranges from vector databases through file-based systems. [Zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) and its [memory design writeup](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) use plain Markdown files with keyword retrieval, arguing that minimal RAM and provider neutrality outweigh the retrieval advantages of embeddings. A more principled critique comes from [Jakedismo's belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): agents fail not from insufficient storage capacity but from storing assertions without provenance, confidence, scope, or revision history.

Observability requires feedback to close the loop. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone cannot improve agentic systems; attaching feedback signals — user ratings, LLM-as-judge, deterministic rules — to traces is what converts observability into a learning loop across model, harness, and context layers.

Capability is advancing fast enough to shift the human role. [Ethan Mollick's report on Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) finds multi-hour autonomous agentic workflows and sub-agent delegation now working in practice, with the human role shifting from execution to commissioning. [Simon Willison documents the same model](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) inventing elaborate browser automation to debug a two-line CSS fix, then notes that the same resourcefulness makes unsandboxed coding agents a genuine security concern, a point Cloudflare's [Mythos multi-agent security harness](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) makes concrete by deploying parallel hunters and adversarial validators against its own code repositories.

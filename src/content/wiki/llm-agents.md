---
title: LLM agents
summary: >-
  LLM agents are language models embedded in control loops that plan, use tools,
  and act across multi-step tasks; the field's central challenge has shifted
  from proving coordination is possible to engineering systems reliable enough
  for production use.
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
compiled_at: '2026-08-03T10:07:57.657Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1808
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
  cost_usd: 0.05409
---
An LLM agent is a language model placed inside a control loop: given a goal, it reasons about steps, invokes tools, observes results, and iterates until it produces an output or fails. The minimal form is a single model with a tool-call interface. The more complex forms involve multiple coordinating agents, persistent memory, sandboxed execution environments, and explicit harnesses managing state across many context windows.

The research history divides cleanly into two periods. The 2023 wave, surveyed by Christopher Meiklejohn across a multi-part series, produced coordination proofs-of-concept: CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen each demonstrated that LLMs could be organized into functional multi-agent systems [getting-up-to-speed-on-multi-agent-systems-part-3-wave-1](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). What those systems lacked was concurrency control and failure recovery. The 2025 wave turned to empirical measurement: MAST, MAS-FIRE, and Silo-Bench found failure rates between 41% and 87% in production settings, with inter-agent reasoning failures structurally harder to fix than prompt-level issues [getting-up-to-speed-on-multi-agent-systems-part-4-wave-2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

The reliability problem has a recurring answer across multiple practitioners: stop trying to prompt your way to correctness and encode constraints in software instead. A data engineering agent case study found that tool design, stable ID keys, and explicit context visibility outperformed prompt engineering at every iteration [dont-prompt-your-agent-for-reliability-engineer-it](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh reaches the same conclusion from a different angle: complex tasks need deterministic state transitions and validation checkpoints, not elaborate prompt chains that collapse under complexity [agents-need-control-flow-not-more-prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Anthropic's own production harnesses for long-running agents encode feature lists, git state, and progress files explicitly so Claude can resume work across context window boundaries [effective-harnesses-for-long-running-agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Observability is part of the engineering answer but not sufficient on its own. LangChain's Harrison Chase argues that traces alone tell you what happened; attaching feedback signals, user ratings, indirect behavior metrics, and deterministic rule checks is what turns observability into a learning loop capable of improving the model, harness, and context layers over time [agent-observability-needs-feedback-to-power-learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

Memory design is a separate but equally contested layer. The zerostack coding agent uses plain Markdown files and regex retrieval, explicitly rejecting vector stores as unnecessary infrastructure given constraints of minimal RAM and no daemon process [designing-memory-for-zerostack-plain-files-no-vector-store](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). PageIndex takes an LLM-reasoning-based approach to retrieval, building hierarchical tree indexes rather than relying on vector similarity [vectifyaipageindex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). A more foundational critique argues that agent memory systems fail structurally because they store assertions rather than beliefs, missing provenance, confidence, scope, and revision history [agent-memory-is-a-belief-maintenance-problem-not-a-storage](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).

Verification is a related unsolved problem. Meiklejohn's survey of verification patterns finds that modality shift, checking work in a different representation than it was produced, is the most reliable approach, with Cursor's visual feedback loop as the strongest real-world implementation [getting-up-to-speed-on-multi-agent-systems-part-6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). In practice, agents still declare work done prematurely; Christopher Meiklejohn's account of building a social app with Claude documents needing to manually click through every feature despite adding 52 guardrails [babysitting-the-agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent).

Capabilities at the frontier are accelerating. Ethan Mollick's hands-on report with Claude Fable 5 describes multi-hour autonomous workflows delegating to sub-agents and delivering complex software, but notes the human role has shifted from executing to commissioning [what-it-feels-like-to-work-with-mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos). Simon Willison documents the same model autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, then warns that the same resourcefulness makes unsandboxed agents genuinely dangerous [claude-fable-is-relentlessly-proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Armin Ronacher extends this concern: harness loops orchestrating coding agents risk amplifying LLMs' worst tendencies and producing codebases that require machine participation to maintain [the-coming-loop](/reading/2026-06/2026-06-23t161552-the-coming-loop).

The field is, as Meiklejohn concludes, quietly rediscovering distributed systems: topology-to-reliability mappings, CRDTs for shared state, backpressure protocols, and failure recovery patterns all have prior art in distributed systems research that the MAS literature has not yet absorbed [getting-up-to-speed-on-multi-agent-systems-part-8-open](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). The benchmarks used to track progress are also misaligned: HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery [getting-up-to-speed-on-multi-agent-systems-part-7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). Progress is real but the measurement infrastructure has not kept pace.

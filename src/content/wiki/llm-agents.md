---
title: LLM agents
summary: >-
  LLM agents are software systems that give language models the ability to take
  multi-step actions, use tools, and operate across extended tasks; current
  research centers on reliability, memory, coordination, and how much control to
  leave with humans.
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
compiled_at: '2026-09-28T23:05:58.381Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1714
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
  cost_usd: 0.05268
---
An LLM agent is a language model equipped with tools, memory, and some form of control flow that lets it pursue goals across multiple steps rather than answering a single prompt. The concept has expanded rapidly from simple tool-calling wrappers into multi-agent pipelines, autonomous coding systems, and long-running harnesses that persist across many context windows.

The architectural question that recurs across practical implementations is whether reliability comes from better prompts or better structure. ["Don't Prompt Your Agent for Reliability"](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) tracked a data engineering agent through three design generations and concluded that environmental constraints — well-scoped tools, stable ID keys, controlled context — outperform prompt engineering. ["Agents Need Control Flow, Not More Prompts"](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point from first principles: explicit state transitions and validation checkpoints encoded in software are what keep agents from collapsing under task complexity.

Anthropicʼs engineering posts on production harnesses show what this looks like at scale. Their two-agent initializer-plus-incremental-coder design maintains progress across context window boundaries by writing state to a file the agent can read back ["Effective Harnesses for Long-Running Agents"](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Their Managed Agents service separates the harness, session log, and sandbox into stable interfaces so that model improvements donʼt require harness rewrites, cutting p50 time-to-first-token by roughly 60% ["Scaling Managed Agents"](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). The harness-forge reference tool takes this further, running a propose-score-Pareto loop to optimize the scaffolding around a fixed model rather than the model itself [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge).

Memory is a persistent design problem. Implementations span the full spectrum: the zerostack coding agent stores plain Markdown files on disk with keyword search and no vector infrastructure ["Memory design @ zerostack"](/reading/2026-06/2026-06-11t023157-memory-design-zerostack); a 74-system comparison table catalogues the range of architectures in use ["AI Memory Systems — Feature Comparison"](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison); and one analysis argues that all of these miss the real issue — agents store assertions rather than beliefs, with no provenance, confidence, or revision history ["Agent memory is a belief-maintenance problem"](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). Recursive Language Models offer a related angle: keeping data in a REPL environment and having the agent selectively pull it into token space avoids context rot without requiring large external stores ["The Potential of RLMs"](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Observability is a growing concern as agents run longer. Traces alone are insufficient; attaching feedback signals — user ratings, behavioral signals, LLM-as-judge, deterministic rules — to those traces is what converts monitoring into a learning loop ["Agent Observability Needs Feedback"](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Security is a related operational concern: Claude Fable autonomously invented elaborate browser automation techniques to debug a CSS issue, and the same resourcefulness makes unsandboxed agents a genuine risk ["Claude Fable is relentlessly proactive"](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Anthropicʼs vulnerability-discovery harness addresses this with gVisor sandboxing and an agentic pipeline covering threat modeling through patching [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness).

Multi-agent coordination introduces failure modes absent from single-agent systems. A survey of 2023 coordination papers — CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen — found shared gaps: no concurrency control, no escalation paths ["Wave 1"](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). 2025 empirical work measured failure rates of 41–87% in production, with inter-agent reasoning failures structurally harder to fix than prompt-level issues ["Wave 2"](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). The open questions that remain — topology-to-reliability mappings, CRDTs for shared state, backpressure protocols — are distributed systems problems the field is rediscovering without the vocabulary to name them ["Open Questions"](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

The human oversight question is unresolved. One practitioner spent two weeks manually clicking through every feature of a Claude-built social app because the agent consistently declared work done after minimal verification ["Babysitting the Agent"](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). A contrasting proposal is a deliberate "Slow Mode" that keeps the programmer involved at each step, trading short-term output for genuine understanding of the code produced ["Slow Mode"](/reading/2026-05/2026-05-19t193626-slow-mode). Armin Ronacher warns that harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain ["The Coming Loop"](/reading/2026-06/2026-06-23t161552-the-coming-loop). The shift Ethan Mollick observed with Claude 5 Fable — the human role moving from doing to commissioning — is the same dynamic, described more optimistically ["What it feels like to work with Mythos"](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos).

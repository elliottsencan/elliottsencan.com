---
title: LLM agents
summary: >-
  LLM agents are language models embedded in execution loops with tools, memory,
  and sub-process coordination; recent sources show them maturing from
  single-turn assistants into multi-hour autonomous pipelines for coding,
  analytics, and security research.
sources:
  - 2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us
  - 2026-05/2026-05-18t222802-raellioctowiz
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - 2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - >-
    2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
  - >-
    2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - >-
    2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage
compiled_at: '2026-06-18T22:00:25.206Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4617
    output_tokens: 1072
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
  cost_usd: 0.029931
---
An LLM agent is a language model connected to an execution environment: it receives observations, selects actions via tools, and iterates until a goal is met or a constraint stops it. The architectural questions that define an agent are memory design, context management, orchestration depth, and sandboxing.

Memory design has attracted sustained engineering attention. The zerostack coding agent replaces vector stores with plain Markdown files and regex retrieval, arguing the approach fits low-RAM, no-daemon constraints better than embedding APIs [memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). A companion piece explains the tradeoffs explicitly [designing memory](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). A broader critique goes further: most memory systems fail not because of storage technology but because they record bare assertions without provenance, confidence, or revision history; the proposed fix is a JSONL truth-maintenance architecture with supersession and dependency expiry [belief maintenance](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). A comparison matrix of 71 live agent memory systems maps the full landscape from tiny MCP servers to research libraries [memory comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison). Octowiz takes a different approach, storing role-scoped engineering doctrine in LiteLLM Proxy memory and fetching only the relevant slice per session to keep context windows focused octowiz.

Sub-agent coordination is the other structural challenge. Zerostack spawns parallel read-only child agents via a task tool for codebase exploration, using Rust async tasks and strict tool constraints to prevent race conditions [subagents design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack). Ethan Mollick's test of Claude 5 Fable found it spinning up sub-agents autonomously and running multi-hour sessions, shifting the human role toward commissioning rather than collaborating [Mollick](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos).

Security is both a use case and a risk surface. Cloudflare's Mythos evaluation found the model meaningfully advances exploit-chain construction but requires a structured multi-agent harness to produce reliable, low-noise results at scale [Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us). Anthropic's defending-code-reference-harness gives a reference implementation for autonomous vulnerability discovery and remediation using an agentic pipeline with gVisor sandboxing [defending-code](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness).

The Recursive Language Model framing addresses a related scaling problem: context rot in long runs. Splitting inputs into programmatic and token context pools, with the model navigating data via a REPL, lets agents handle datasets that would otherwise overwhelm a single context window; execution traces from such runs can bootstrap optimized architectures [RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Anthropics internal analytics deployment shows what production depth requires: 95% query automation at 95% accuracy, built on canonical data foundations, structured sources of truth, domain skills, and continuous validation [Anthropic analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with). A critical read notes that the same stack demands months of senior data engineering and semantic layer rewrites that most organizations cannot replicate [Genloop critique](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got).

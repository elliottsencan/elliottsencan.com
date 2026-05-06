---
title: AI agents
summary: >-
  AI agents are LLM-powered systems that plan, act, and iterate autonomously;
  active research and engineering practice reveal deep tensions between
  coordination complexity, reliability, tool design, and the human oversight
  they still require.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-04t235011-plurai
compiled_at: '2026-05-06T04:00:21.862Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6858
    output_tokens: 1397
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
  cost_usd: 0.041529
---
An AI agent, in the current practical sense, is a system where a language model drives a loop of reasoning and action: it observes some environment, selects tools or sub-tasks, executes them, and feeds results back into its next decision. The concept sounds clean in definition and proves messy in deployment.

The architectural space has split into two rough camps. Single-agent systems handle tasks within one context window, keeping state centrally. Multi-agent systems distribute work across specialized roles. [Meiklejohn's survey of the MAS landscape](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) traces how 2023 coordination papers (CAMEL, ChatDev, MetaGPT, AutoGen) established the vocabulary, while a second wave of empirical work found failure rates of 41-87% across 1,600 agent traces, with information synthesis rather than coordination being the core bottleneck [as MAST's taxonomy documented](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). Stanford and Google/MIT research cited in [Dickson's piece on agent choice](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) found multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2-6x, making single-agent the safer default for most tasks.

When multi-agent architecture does pay off, the design patterns that work tend to separate concerns structurally. Anthropic's Managed Agents service decouples the harness, session log, and sandbox into independent interfaces, cutting p50 time-to-first-token by roughly 60% [according to their engineering post](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). A separate Anthropic post describes a GAN-inspired planner/generator/evaluator triad for multi-hour autonomous coding sessions that sidesteps context anxiety through architectural role separation [rather than prompt engineering](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). The recurring lesson across both: reliability comes from environment design and atomic tools, not from cleverer prompts.

Verification sits at the center of reliability work. [Meiklejohn's verification patterns installment](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking output in a different representation than it was produced in, is what separates weak self-evaluation from structural gates. Plurai operationalizes this differently: multi-agent debate validates synthetic training data before deploying a small language model for guardrails at sub-100ms latency [and 8x lower cost than LLM-as-judge](/reading/2026-05/2026-05-04t235011-plurai).

Memory and context are recurring pressure points. Projects like [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) add biomimetic memory structures so agents accumulate knowledge across sessions. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a simpler approach: tiered markdown files with a machine-readable manifest that agents can navigate without burning excess tokens. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a living knowledge base with Git-layer enforcement, preventing non-compliant code from merging.

Practical deployment cases expose the gap between capability claims and real costs. Mendral's CI agent processed 1.18 billion log lines and 33 million weekly test executions to auto-diagnose flaky tests, finding that log ingestion speed mattered more than the AI diagnosis itself [per Sam Alba's writeup](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). Poolday's Creator-1 orchestrates 100+ generative models for autonomous video editing [outputting fully editable projects](/reading/2026-04/2026-04-30t231206-poolday).

Two critiques cut across deployment contexts. Lars Faye argues that full reliance on coding agents erodes the debugging and critical-thinking skills needed to supervise those same agents, a paradox compounded by vendor lock-in and unpredictable token costs [making agentic-first workflows a liability](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Meiklejohn's field report documents the same gap from the other side: even with guardrails in place, an agent consistently declared work complete before it actually functioned, [requiring a human to verify everything after every ship](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). The open questions the field has not answered, including topology-to-reliability mapping and graceful failure recovery, [suggest borrowing from distributed-systems theory](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) rather than treating agents as a novel domain.

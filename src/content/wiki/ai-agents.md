---
title: AI agents
summary: >-
  AI agents are LLM-powered systems that take sequences of actions to accomplish
  goals; current work clusters around architecture choices, reliability
  engineering, tool design, memory, and the human oversight those systems still
  require.
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
compiled_at: '2026-05-06T03:44:28.656Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6858
    output_tokens: 1388
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
  cost_usd: 0.041394
---
An AI agent is an LLM-based system that plans and executes multi-step tasks, using tools, memory, and sometimes other agents to reach a goal. The concept sits at the intersection of language model capability and systems engineering, and the practical literature is now as concerned with failure modes as with what agents can do.

The foundational architecture question is how to split responsibility. Anthropic's engineering posts describe two complementary approaches: a GAN-inspired planner/generator/evaluator triad for long autonomous coding sessions [harness design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development), and a Managed Agents service that decouples the harness, session log, and sandbox so each can evolve independently, cutting p50 time-to-first-token by roughly 60% [managed agents](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). A parallel engineering account of a data-engineering agent found that moving through three architectures, rigid state machine to orchestrator with sub-agents to a single general-purpose agent, taught the same lesson: environment design and atomic tools outperform prompt engineering for reliability [engineer reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it).

Multi-agent systems add coordination overhead that often costs more than it saves. Stanford and Google/MIT research cited by Ben Dickson finds that multi-agent pipelines can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, making single-agent defaults the sounder starting point for most tasks [single vs multi](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Christopher Meiklejohn's eight-part retrospective on the MAS literature reinforces this: the five canonical 2023 papers (CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen) shared a failure mode of treating errors as termination rather than recoverable state [wave 1](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), and subsequent empirical work found multi-agent systems failing 41 to 87% of the time, with information synthesis, not coordination, as the core bottleneck [wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). Meiklejohn closes by arguing the field must borrow distributed-systems theory, including CRDTs for shared state and graceful failure recovery, to move forward [open questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

Verification is where architecture choices become consequential. The strongest structural gate is modality shift: checking work in a different representation than it was produced in [verification patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). Plurai's approach to this is to generate training data, validate it through multi-agent debate, and deploy small language models for evals at sub-100ms latency [Plurai](/reading/2026-05/2026-05-04t235011-plurai). MarkdownLM enforces architectural rules at the Git layer, blocking non-compliant code before it merges [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm).

Memory and context are persistent practical constraints. The vectorize-io hindsight project uses biomimetic data structures and multi-strategy retrieval to achieve state-of-the-art scores on LongMemEval [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). The LostWarrior knowledge-base CLI organizes project context as tiered markdown with a machine-readable manifest so agents can navigate without burning excess tokens [knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base). Mendral's CI agent, operating on PostHog's monorepo, found that log ingestion speed and smart routing mattered more than the AI diagnosis itself when processing 1.18 billion log lines per run [CI agents](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team).

Human oversight remains non-negotiable. Lars Faye argues that full reliance on coding agents erodes the debugging skills developers need to supervise those agents, a compounding liability alongside vendor lock-in and unpredictable token costs [agentic trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Christopher Meiklejohn's first-person account of building a social app with Claude documents the exhausting reality: the agent consistently declares work done before it works, and no guardrail eliminates the need for a human to verify every ship [babysitting](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). The agents in production today are systems to be engineered and supervised, not autonomous replacements for engineering judgment.

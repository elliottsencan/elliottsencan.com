---
title: AI Agents
summary: >-
  AI agents are LLM-powered systems that act autonomously across multi-step
  tasks; current practice centers on how to structure their control flow,
  memory, verification, and coordination without introducing more complexity
  than the task demands.
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
  - 2026-07/2026-07-09t161342-ai-2040-plan-a
  - 2026-08/2026-08-11t004752-danielmiesslerlifeos
  - >-
    2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test
compiled_at: '2026-10-19T22:01:16.937Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10423
    output_tokens: 1437
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
  cost_usd: 0.052824
---
An AI agent, in current engineering usage, is a system where a language model drives a loop: it receives context, selects actions (tool calls, code execution, API requests), observes results, and continues until a goal is reached or a stopping condition fires. The concept has moved fast enough that the practical questions are no longer about possibility but about architecture: how to structure control flow, manage state, verify outputs, and decide when to involve multiple agents versus one.

On control flow, the clearest position is that prompts alone cannot carry the load. [Agents Need Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that reliable agents require deterministic state transitions and validation checkpoints encoded in software, not increasingly elaborate prompt chains. The 12-factor-agents project reinforces this: [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) recommends unifying execution state and business state into a single context-window-derived thread, which simplifies serialization, debugging, and recovery without requiring a separate orchestration layer. [Agentic Engineering](/reading/2026-06/2026-06-21t112220-agentic-engineering) maps roughly 30 core concepts in this space, from agent loops and prompt caching to context rot and guardrails.

The question of single-agent versus multi-agent design has a clearer empirical answer than much of the discourse suggests. Research surveyed in [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x. Single-agent systems should be the default; multi-agent is warranted when tasks genuinely decompose into parallel, independent subtasks. Anthropic's own [harness design work](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator triad for multi-hour coding sessions, explicitly designed to overcome self-evaluation bias that single models exhibit. [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) applies a multi-agent approach to video editing, orchestrating 100+ generative models into a pipeline that outputs editable projects rather than static files.

Verification is a structural problem, not a prompt problem. [Verification Patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced, is the key variable. Cursor's visual feedback loop is cited as the strongest real-world example. Without external verification, agents are vulnerable to the sycophancy spiral documented in [Sycophantic Chatbots](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in): a Bayesian model shows that even ideally rational users develop delusional beliefs when an agent consistently confirms rather than corrects.

Memory is increasingly treated as a distinct engineering problem. [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures covering world facts, experiences, and mental models. [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that the real failure mode is storing assertions without provenance, confidence, or revision history, and proposes a JSONL belief-maintenance architecture. OpenAI's [internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) layers schema metadata, human annotations, code enrichment, and self-improving memory to query 600+ petabytes accurately.

At the infrastructure level, enterprise deployments need a governance layer. [AI Control Plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) maps the identity, policy enforcement, tool routing, and observability requirements when many agents share systems. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential injection specifically, keeping tokens encrypted on-device so agents authenticate against external services without seeing raw secrets. Sandboxing is a related concern: [Claude Fable's behavior](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) illustrates how a capable agent autonomously inventing elaborate browser automation techniques to debug a CSS fix is impressive and dangerous for the same reason.

The strategic layer is contested. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are not defensible and that teams should ship MCP tool servers and skills that extend frontier agents, letting model providers maintain the loop. Whether that advice holds as agent capability continues its measured climb, documented in [task-completion time horizon research](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) as roughly doubling every year since 2019, is an open question.

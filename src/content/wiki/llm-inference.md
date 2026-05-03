---
title: LLM inference
summary: >-
  LLM inference spans hardware constraints, latency optimization, and serving
  architecture; recent sources address VRAM budgeting, token throughput,
  multimodal model variants, and the cost of loading tool context into agent
  sessions.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
compiled_at: '2026-05-03T19:05:36.755Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 1781
    output_tokens: 692
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
  cost_usd: 0.015723
---
Running a language model in production involves tradeoffs at every layer: how much GPU memory the weights consume, how quickly the model produces tokens, and how the serving infrastructure handles concurrent sessions. These tradeoffs compound as models grow larger and more capable.

At the hardware level, VRAM is the binding constraint for most practitioners. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete by mapping any GPU against open-weight models at various quantization levels, surfacing tokens-per-second estimates alongside fit/no-fit verdicts. Quantization is the primary lever: a model that won't fit at full precision often runs comfortably at 4-bit or 8-bit, with an acceptable quality tradeoff.

At the serving layer, latency compounds across session setup, context loading, and first-token generation. Anthropic's Managed Agents work [separated the agent harness, session log, and sandbox into independent interfaces](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands), cutting p50 time-to-first-token by roughly 60% and p95 by over 90%. That result follows from reducing what the model needs to process before it can begin generating.

Context size is also an inference cost. [The MCP-as-GUI argument](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) frames tool definitions loaded per session as token-expensive overhead, analogous to rendering a GUI the model must read rather than call directly. Agents that write code to call APIs avoid loading those definitions into the context window at all.

Multimodal inference adds further pressure. [The 2025 VLM landscape](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger) covers architectures that handle any-to-any input, mixture-of-experts routing, and video understanding, each of which increases the per-forward-pass computation relative to text-only models. Smaller VLMs have improved enough that capable multimodal inference is now possible on consumer hardware.

Deploying specialized models via queued GPU endpoints, as shown in [the OpenAI Privacy Filter walkthrough](/reading/2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter), illustrates one practical pattern: pair a custom frontend with a dedicated inference endpoint so throughput and queue management stay separate from application logic.

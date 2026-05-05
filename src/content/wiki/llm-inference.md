---
title: LLM inference
summary: >-
  LLM inference covers the runtime execution of language models, from hardware
  constraints and quantization tradeoffs to latency optimization in production
  agent systems, with sources collectively surfacing cost, speed, and VRAM as
  the central pressure points.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
aliases:
  - inference-optimization
compiled_at: '2026-05-04T03:36:11.217Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2844
    output_tokens: 634
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
  cost_usd: 0.018042
---
Inference is the phase where a trained model produces outputs given inputs. Unlike training, which happens once, inference runs continuously in production and carries ongoing compute costs that scale with every token generated.

Hardware fit is the most immediate constraint. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) addresses this directly: given a GPU's VRAM, the tool calculates which open-weight models fit, at what quantization level, and at what throughput in tokens per second. Quantization is the central lever, trading precision for memory footprint so larger models become runnable on consumer or mid-tier hardware.

At the other end of the scale, production agent infrastructure treats inference latency as a first-class engineering concern. Anthropic's Managed Agents work [decouples the agent harness, session log, and sandbox](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) into independent interfaces, achieving roughly a 60% reduction in p50 time-to-first-token and over 90% reduction at p95. That result comes less from model-level changes and more from how inference calls are scheduled and what state travels with them.

Context size is a related pressure. [The MCP-as-GUI critique](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) notes that loading tool definitions into context each session is token-expensive, framing context consumption as a direct inference cost that compounds across agentic workflows.

On the model side, [the 2025 VLM survey](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger) documents how mixture-of-experts architectures and small-model advances are reshaping inference tradeoffs for multimodal workloads, with smaller models closing the capability gap while remaining cheaper to serve. Separately, [the OpenAI Privacy Filter walkthrough](/reading/2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter) shows queued GPU endpoints behind a Gradio server as a practical pattern for managing inference throughput in web-facing applications.

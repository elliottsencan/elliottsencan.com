---
title: LLM inference
summary: >-
  Running LLM inference involves hardware constraints, latency tradeoffs, and
  architectural decisions that shape what models can do in practice, from GPU
  VRAM limits to how agents route calls.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
compiled_at: '2026-05-01T05:12:52.935Z'
compiled_with: claude-sonnet-4-6
---
LLM inference is the computational work of running a trained model to produce outputs. The practical constraints start at the hardware level: a given GPU has fixed VRAM, and whether a model fits depends on parameter count and quantization level. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete by letting you pick a GPU and see which open-weight models fit, at which quantization settings, and what token throughput to expect. Quantization trades output fidelity for memory footprint, and the throughput benchmarks show how that tradeoff plays out across hardware tiers.

At the application layer, inference calls are typically wrapped in some service or API. [Hugging Face's walkthrough](/reading/2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter) of OpenAI's Privacy Filter model uses Gradio's queued API endpoints to handle concurrent requests, which surfaces the throughput and queuing concerns that appear once inference moves beyond a single user.

In agentic systems, inference cost and latency affect architectural decisions more sharply. [Anthropic's Managed Agents design](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the model harness from the execution sandbox so the inference layer can be swapped or upgraded as models improve without breaking downstream state. That separation matters because the model being called is expected to change; decoupling inference from execution makes that substitution cheaper.

How agents invoke inference also varies. [Mohan's argument against MCP](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) is partly an inference-efficiency argument: wrapping API calls in MCP tool definitions adds indirection and reduces composability compared to agents that write code and call APIs directly. The overhead of tool-mediated inference matters when an agent could instead construct and execute calls programmatically.

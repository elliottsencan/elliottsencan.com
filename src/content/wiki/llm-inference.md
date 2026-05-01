---
title: LLM inference
summary: >-
  Running LLMs locally or via API involves tradeoffs around VRAM, quantization,
  latency, and architectural choices that shape what models are practical and
  how agents and applications get built on top of them.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
compiled_at: '2026-05-01T05:20:53.447Z'
compiled_with: claude-sonnet-4-6
---
LLM inference, the process of generating outputs from a trained model, sits at the intersection of hardware constraints, deployment architecture, and application design. The practical starting point for local inference is VRAM: a tool like [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete by letting you select a GPU and immediately see which open-weight models fit, at which quantization level, and what token-per-second throughput to expect. Quantization is the main lever for fitting large models onto consumer hardware, and the tradeoffs between precision and performance are real enough that benchmarks matter.

At the application layer, inference calls are the substrate for everything from PII redaction pipelines to multi-step agents. [A Hugging Face walkthrough](/reading/2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter) builds Gradio apps on top of OpenAI's open-source Privacy Filter model, using queued API endpoints to handle concurrency, which illustrates how inference throughput and latency shape what application patterns are even viable.

For agentic systems, inference is the brain, and the architecture around it determines how much the brain has to do. [Anthropic's Managed Agents design](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the model harness, the execution sandbox, and session state into independent interfaces, so that as models improve the inference layer can be swapped without breaking the rest of the system. That separation also keeps the model from being responsible for state management it should not be doing.

How agents invoke inference matters too. [The argument against MCP as a default tool interface](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) is that wrapping API calls in tool schemas adds overhead and reduces composability, and that agents capable of writing code should call APIs directly rather than through a GUI-like abstraction layer. The implication is that inference efficiency depends not just on the model or hardware but on how the surrounding system routes work to the model in the first place.

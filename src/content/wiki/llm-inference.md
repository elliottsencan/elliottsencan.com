---
title: LLM inference
summary: >-
  Running LLMs locally or via API involves hard constraints around VRAM,
  quantization, and throughput that shape every architectural decision, from
  tool design to agent scaling to privacy-sensitive deployments.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
compiled_at: '2026-05-01T05:34:27.690Z'
compiled_with: claude-sonnet-4-6
---
LLM inference sits at the intersection of hardware limits and software architecture. The most concrete expression of those limits is VRAM: a given GPU can only hold so many model weights, and the quantization level you choose trades quality for fit. [CanItRun](https://canitrun.dev/) ([2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm)) makes this tangible by mapping open-weight models to GPU specs and projecting tokens-per-second benchmarks, which turns an abstract constraint into a planning tool.

Once inference is running, the way you expose it to calling code matters. Mohan argues in [Mad About Code](https://www.madaboutcode.com/mcp-as-a-gui-for-ai-agents.html) ([2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis)) that MCP tool wrappers around inference calls impose the same kind of overhead that GUIs impose on developers: discoverability at the cost of composability. Agents capable of writing code are better served by direct API calls or layered scripts than by the abstraction layer MCP adds.

At larger scale, inference becomes a resource to allocate across concurrent sessions. Anthropic's Managed Agents design ([2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands)) separates the model harness, the execution sandbox, and the session log into independent interfaces, so the inference-calling layer can evolve as models improve without breaking state or replaying work.

Inference also carries data-handling obligations when input contains sensitive content. The Hugging Face walkthrough of OpenAI's Privacy Filter ([2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter](/reading/2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter)) shows PII detection and image redaction built on queued API endpoints, treating the model as a filter in a processing pipeline rather than a generative endpoint. That framing, inference as a transformation step with defined input and output contracts, generalizes well beyond privacy use cases.

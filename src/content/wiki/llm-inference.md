---
title: LLM inference
summary: >-
  Running LLMs locally or via API involves tradeoffs between VRAM constraints,
  quantization, latency, and architectural choices about where model calls sit
  within a larger system.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
compiled_at: '2026-05-01T05:02:51.372Z'
compiled_with: claude-sonnet-4-6
---
LLM inference spans a wide range of concerns: raw hardware feasibility, latency under load, architectural placement within agent systems, and privacy handling for sensitive inputs.

At the hardware level, the first question is whether a given model fits on available GPU memory at all. [CanItRun](https://canitrun.dev/) addresses this directly, letting you select a GPU and see which open-weight models fit in VRAM, at which quantization level, and what token throughput to expect. Quantization is the primary lever for fitting larger models onto consumer hardware, and the tool makes the tradeoff between model size and inference speed concrete.

Once a model is running, where its calls live in a larger system matters. [Anthropic's Managed Agents architecture](https://www.anthropic.com/engineering/managed-agents) separates the agent harness from the sandbox and session log, so the inference-heavy "brain" can be swapped or upgraded as models improve without breaking downstream state. This decoupling treats LLM calls as a replaceable component rather than a fixed dependency.

How agents invoke models is a related question. [Ajeesh Mohan argues](https://www.madaboutcode.com/mcp-as-a-gui-for-ai-agents.html) that MCP tool wrappers add indirection that costs efficiency, and that code-capable agents are better served by direct API calls. The implication for inference is that wrapper overhead compounds latency, making direct invocation preferable wherever the agent can construct requests itself.

Privacy filtering adds another layer. [The Hugging Face walkthrough](https://huggingface.co/blog/openai-privacy-filter-web-apps) of OpenAI's Privacy Filter model shows inference being used not to generate text but to detect and redact PII before or after other model calls, with queued API endpoints handling concurrency. This treats a specialized model as a pipeline stage rather than a primary assistant.

---
title: LLM inference
summary: >-
  LLM inference is the runtime use of a language model to generate outputs;
  recent work on agent architectures shows how inference sits at the center of
  decisions about tool access, latency, and system decomposition.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
related_concepts:
  - ai-agents
  - mcp
  - developer-tools
  - software-engineering
compiled_at: '2026-05-01T04:13:25.591Z'
compiled_with: claude-sonnet-4-6
---
LLM inference is the step where a trained model processes input and produces output. In agentic systems, inference is not a single call but a loop: the model reasons, selects actions, calls tools, observes results, and reasons again. How that loop is structured has real consequences for cost, latency, and maintainability.

[Anthropic's Managed Agents post](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) draws a direct line between inference architecture and system design. By separating the agent harness (which drives inference) from the sandbox (which executes actions) and the session log (which stores state), Anthropic makes it possible to swap or upgrade the model powering inference without breaking the surrounding system. The inference layer, what they call the brain, can evolve independently as models improve.

The choice of what the model sees at inference time also matters. [Ajeesh Mohan argues](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) that MCP tool wrappers add overhead comparable to a GUI: they trade raw efficiency for discoverability. Agents capable of writing code are better served by direct API calls or layered scripts, because those paths reduce the token and latency cost of each inference step. The implication is that the interface layer presented to the model at inference time shapes how well it can perform, not just how easy it is to build against.

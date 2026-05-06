---
title: LLM inference
summary: >-
  LLM inference spans the full stack from VRAM constraints and quantization
  choices on consumer hardware to latency optimization in production agent
  services, with tooling debates about transparency, local runtimes, and
  cost-efficient alternatives to large models.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t071908-oobaboogatextgen
aliases:
  - local-ai
  - local-llm
compiled_at: '2026-05-06T16:11:39.846Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3352
    output_tokens: 667
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
  cost_usd: 0.020061
---
Running a language model in practice involves decisions at every layer: hardware fit, quantization level, runtime choice, and serving architecture. These concerns are distinct from training or fine-tuning but intersect with all of them.

At the hardware end, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) surfaces the most basic constraint: VRAM determines which open-weight models are even runnable on a given GPU, and quantization is the primary lever for fitting larger models into smaller memory budgets. The tradeoff is speed versus fidelity, and it varies model by model.

For local inference, runtime choice carries real consequences. [Zetaphor's critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that the tool obscures its llama.cpp dependency, misleads on model naming, and has drifted toward cloud monetization, while faster and more transparent alternatives exist. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) is one such alternative: a fully offline desktop runtime with OpenAI-compatible APIs, LoRA support, and no telemetry.

At the production end, inference latency becomes a systems problem. Anthropic's Managed Agents work [cut p50 time-to-first-token by roughly 60% and p95 by over 90%](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) by decoupling the agent harness, session log, and sandbox into independent interfaces. Cost is a parallel pressure: [Plurai](/reading/2026-05/2026-05-04t235011-plurai) illustrates the pattern of replacing large-model inference with small fine-tuned models for specific tasks, achieving sub-100ms latency at 8x lower cost than LLM-as-judge approaches.

Context size is its own inference cost. [The MCP-as-GUI critique](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) frames token consumption as a structural concern: tool definitions loaded into context each session inflate inference costs without composability benefits, favoring leaner API-based approaches instead.

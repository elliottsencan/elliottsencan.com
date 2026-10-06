---
title: LLM tooling
summary: >-
  The infrastructure, utilities, and integrations built around large language
  models to make them useful in practice: serving, context management, knowledge
  organization, sandboxing, and cost control.
sources:
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t071908-oobaboogatextgen
  - 2026-05/2026-05-14t222554-piyush-mishra-00helply
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - >-
    2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on
  - >-
    2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for
  - 2026-06/2026-06-20t145835-chopratejasheadroom
  - 2026-08/2026-08-10t220951-gvzdvclaudish-to-english
compiled_at: '2026-10-05T23:55:43.504Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 1090
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
  cost_usd: 0.029466
---
LLM tooling covers the practical layer between a raw model and a working system: how you run the model, feed it context, connect it to external data, and keep costs and risks manageable.

On the serving side, the options range from cloud APIs to fully local runtimes. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a local web UI and OpenAI-compatible API supporting GGUF/llama.cpp, LoRA fine-tuning, tool-calling, and MCP servers. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) demonstrates a common pattern: backends are swappable between cloud providers (OpenAI, Anthropic, Groq) and local runtimes (Ollama, LM Studio) without changing application logic. Local serving is not without controversy; [a critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues the project obscures its llama.cpp dependency, delivers inferior inference performance, and is drifting toward a closed-source, VC-backed cloud model that undercuts its local-first premise.

Context and knowledge management form a second major area. The Karpathy wiki pattern, described in [a Reddit implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), has the model ingest raw documents and maintain structured Markdown files that can be queried at scale without RAG. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a related approach: a zero-dependency bash CLI that organizes project context into tiered Markdown files with a machine-readable manifest so agents can navigate without burning excess tokens. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) addresses the same constraint from the compression side, reducing tool outputs and RAG chunks by 60-95% before they reach the model. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a signal-processing angle, applying wavelet transforms to source code to produce multi-resolution structural views that give LLMs precise, token-efficient context without language-specific parsers.

MCP has become a connective tissue across many of these tools. [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) exposes Databricks expertise through an MCP server alongside markdown skills and a Python core library. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) serves documentation to both humans and LLMs via llms.txt and MCP. Anthropic's [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows how to package local MCP servers as single-click bundles for Claude Desktop. Even a style plugin like [claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english), which rewrites Claude's output into plain English via a local Ollama call, is structured as a Claude Code plugin.

Safety and cost round out the picture. [Running Claude Code inside Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is argued as a baseline to prevent credential leaks and accidental production damage while still allowing auto-approve mode. On pricing, a [survey of the 2025-2026 model pricing collapse](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x spread between cheapest and most expensive frontier models, making provider-agnostic design a practical requirement rather than an architectural nicety.

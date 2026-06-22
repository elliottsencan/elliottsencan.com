---
title: LLM tooling
summary: >-
  The infrastructure layer for working with large language models: local
  runtimes, context management, MCP integrations, knowledge organization, and
  cost-aware API design.
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
compiled_at: '2026-06-22T02:36:18.283Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4233
    output_tokens: 910
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
  cost_usd: 0.026349
---
LLM tooling spans everything between a raw model and a working product: local inference runtimes, context compression, knowledge-base patterns, MCP server packaging, and pricing-aware client design.

On the local runtime side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop environment with an OpenAI-compatible API, GGUF/llama.cpp support, tool-calling, and MCP server integration. [Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) occupies similar territory but has drawn criticism for obscuring its llama.cpp dependency, shipping inferior inference performance, and shifting toward a VC-driven cloud model that undercuts its local-first premise.

Context management is a recurring concern. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, reporting 60-95% token reduction. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) approaches the same problem from the code-analysis angle, applying wavelet transforms to source files to produce multi-resolution structural context without language-specific parsers.

Knowledge organization for LLMs has its own patterns. The Karpathy wiki approach [documented on Reddit](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) has the model ingest raw documents and maintain structured Markdown files, sidestepping RAG entirely. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) operationalizes a lighter version of this with a bash CLI that produces both a human-readable INDEX.md and a machine-readable manifest.json for agent navigation. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) handles the documentation end, with llms.txt support and MCP integration so docs stay accessible to both humans and agents.

MCP as a packaging format is maturing. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) describes bundling a local MCP server into a single-click .mcpb archive for Claude Desktop. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) uses an MCP server as the integration point to surface Databricks-specific skills across Claude Code, Cursor, and Gemini CLI.

Security and cost round out the practical layer. [cekrem's post](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues Claude Code should always run inside Docker's sbx sandbox to prevent credential exposure. On cost, a [Superframeworks analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x gap between cheapest and most expensive frontier models, making provider-agnostic client architecture a baseline financial requirement.

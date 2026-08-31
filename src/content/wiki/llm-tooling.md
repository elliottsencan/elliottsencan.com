---
title: LLM tooling
summary: >-
  The infrastructure layer around large language models: local runners, context
  packaging, MCP servers, knowledge management, and cost-aware integrations that
  turn raw model APIs into usable developer workflows.
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
compiled_at: '2026-08-31T22:37:57.374Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 1055
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
  cost_usd: 0.028941
---
LLM tooling covers the layer of software that sits between a raw model and practical use: local inference runtimes, context-management libraries, documentation platforms, MCP servers, sandboxing practices, and pricing-aware integration patterns.

On the local inference side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop runner with an OpenAI-compatible API, GGUF/llama.cpp backends, tool-calling, and MCP support. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) takes a narrower scope, wrapping both cloud and local backends (Ollama, LM Studio) into a meeting-assistant shell. The Ollama ecosystem itself is contested: [Sleeping Robots](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues Ollama obscures its llama.cpp dependency, ships inferior inference performance, and is pivoting toward closed-source cloud infrastructure at the expense of its local-first origins.

Context engineering is increasingly a first-class problem. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction without quality loss. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different approach, applying Ricker wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without language-specific parsers. On the knowledge-base side, [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) organizes project context as tiered markdown with both a human-readable index and a machine-readable manifest, while a Reddit thread on [Karpathy's LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes having the model itself build and maintain structured markdown files, querying at scale without RAG.

MCP has become the connective tissue for packaging and distributing tooling. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) covers bundling a local MCP server as a single-click installable for Claude Desktop. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships Databricks expertise to coding assistants via an MCP server alongside markdown skills and a Python library. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) extends the pattern to documentation, serving knowledge to LLMs via llms.txt and MCP alongside traditional human-facing docs.

Sandboxing and cost sit at opposite ends of the operational concerns. [cekrem's post](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues Claude Code should always run inside Docker's sbx sandbox to prevent credential leaks and accidental production damage. At the same time, [Superframeworks](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x pricing gap between frontier models has collapsed the cost floor, making provider-agnostic design essential from day one. gvzdv's Claudish-to-English plugin illustrates one small output-layer tool: rewriting Claude's verbose assistant messages into plain English via a local model.

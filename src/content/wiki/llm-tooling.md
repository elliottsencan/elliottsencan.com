---
title: LLM tooling
summary: >-
  The infrastructure layer around large language models: local inference
  runtimes, context-packaging formats, MCP integration, knowledge-base patterns,
  and pricing considerations that shape how developers build with and around
  models.
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
compiled_at: '2026-06-18T22:59:26.434Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4273
    output_tokens: 925
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
  cost_usd: 0.026694
---
LLM tooling covers the practical layer between raw model APIs and working applications: how you run models, feed them context, expose capabilities via protocols, and manage cost.

On the local inference side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop runtime with an OpenAI-compatible API, GGUF/llama.cpp backends, tool-calling, and MCP server support. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) shows how that local-or-cloud backend choice gets surfaced in consumer apps, letting users switch between Ollama, LM Studio, OpenAI, or Anthropic without code changes. The local-first space has friction too: [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) documents how Ollama obscured its llama.cpp dependency, ships inferior inference performance, and is pivoting toward a closed-source cloud model, making backend choice a long-term architectural decision.

Context packaging has become its own sub-discipline. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) uses tiered markdown files with an INDEX.md and machine-readable manifest.json so agents can navigate large codebases without burning tokens. The Reddit guide on [Karpathy's LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) extends this further: ingest raw documents, have the model compile and maintain structured Markdown, then query at scale without RAG. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying Ricker wavelet transforms to source code as a 1D signal to produce multi-resolution structural views that are both token-efficient and parser-free.

MCP has emerged as the connective tissue across these tools. [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) exposes Databricks expertise through an MCP server consumed by Claude Code, Cursor, and Gemini CLI. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) serves documentation through MCP so agents get context-aware knowledge rather than raw HTML. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) formalizes distribution with a single-click bundle format for Claude Desktop.

Security and cost round out the practical picture. [Claude Code sandboxing](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that agentic coding tools should run inside Docker to prevent credential leaks when operating in auto-approve mode. On pricing, a [75x gap between frontier models](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) means the cost calculus shifts constantly; building provider-agnostic from day one is now standard advice.

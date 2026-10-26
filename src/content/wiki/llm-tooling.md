---
title: LLM tooling
summary: >-
  The infrastructure layer around large language models: local inference
  runtimes, context management, MCP servers, knowledge bases, and cost-aware API
  wiring that together make LLMs usable in real workflows.
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
compiled_at: '2026-10-26T22:29:52.358Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 953
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
  cost_usd: 0.027411
---
LLM tooling covers the practical layer between raw model APIs and working software: how you run models, feed them context, connect them to external systems, and keep costs manageable.

On the inference side, options split between local and cloud. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop runtime with an OpenAI-compatible API, GGUF support via llama.cpp, tool-calling, and MCP server integration. Ollama covers similar ground but [a detailed critique](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it ships inferior inference performance relative to llama.cpp directly, introduced confusing model naming, and is now pivoting toward a VC-backed cloud product that undermines its local-first premise. For cloud APIs, [pricing has collapsed dramatically](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on): a 75x spread between cheapest and most expensive frontier models means provider-agnostic architecture is now a real cost lever, not just a design nicety.

Context management is its own subfield. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction without quality loss. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying wavelet transforms to source code to produce multi-resolution structural views that give models precise context without language-specific parsers. For knowledge bases, [Karpathy's LLM-compiled wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) treats structured Markdown as the query layer, skipping RAG entirely, while [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) implements tiered markdown with a machine-readable manifest so agents can navigate context without excess token burn.

MCP has become the dominant connector protocol. [Databricks ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships Databricks expertise to coding assistants via an MCP server. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) exposes documentation to LLMs through MCP and llms.txt. Anthropic's [MCPB packaging guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) formalizes distribution as single-click bundles for Claude Desktop.

Security is a real concern as agentic tools gain file and credential access. Running Claude Code inside a Docker sandbox [is now considered necessary practice](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) to prevent credential leaks and accidental production writes. Smaller ergonomic tools like [claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english), which rewrites Claude's verbose output via a local model, show the ecosystem also evolving around developer experience at the margins.

---
title: LLM tooling
summary: >-
  The expanding ecosystem of tools built around large language models, covering
  local inference runtimes, context and token management, knowledge
  organization, MCP integrations, and the infrastructure choices that connect
  models to real workflows.
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
compiled_at: '2026-09-07T21:18:43.900Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 919
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
  cost_usd: 0.026901
---
LLM tooling spans every layer between a raw model and a working application: how you run the model, how you feed it context, and how you connect it to the systems around it.

On the inference side, the choices carry real tradeoffs. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully local, OpenAI-compatible server with support for GGUF, multiple backends, tool-calling, and LoRA fine-tuning. Ollama is the more popular alternative, but [a critical history by Zetaphor](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it obscures its llama.cpp dependency, ships inferior inference performance, uses misleading model naming, and is pivoting toward a closed-source cloud product. Both tools sit on the same foundation; the difference is transparency and trajectory.

Context management is increasingly its own discipline. [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, reporting 60-95% token reduction without quality loss. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without requiring language-specific parsers. Organizing knowledge for LLM consumption is its own sub-problem: [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) uses tiered markdown files with a machine-readable manifest, while [Karpathy's wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) has the model itself build and maintain structured documents at query time, skipping RAG entirely.

MCP has become the connective tissue for many of these tools. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) delivers platform expertise to coding assistants through an MCP server. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) serves documentation to both humans and LLMs via MCP and llms.txt. Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) packages local MCP servers as single-click bundles for Claude Desktop. Safety is part of the picture too: [running Claude Code inside Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) prevents credential leaks and accidental production writes that agentic tool use can trigger.

Pricing shapes what tooling decisions are viable. A [breakdown of the current pricing landscape](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x gap between the cheapest and most expensive frontier models, making provider-agnostic architecture a practical necessity rather than an aesthetic choice.

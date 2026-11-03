---
title: LLM tooling
summary: >-
  The growing ecosystem of libraries, servers, wrappers, and
  knowledge-management utilities built to extend, constrain, or interface with
  large language models in both local and cloud configurations.
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
compiled_at: '2026-11-03T00:41:44.222Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 1043
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
  cost_usd: 0.028761
---
LLM tooling spans three overlapping concerns: how models are served and accessed, how context is prepared and compressed, and how the surrounding development environment is wired together.

On the serving side, the local-inference landscape offers meaningful tradeoffs. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline desktop environment with an OpenAI-compatible API, GGUF/llama.cpp backends, LoRA fine-tuning, and MCP server support. Ollama covers similar ground but [a critical history of the project](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it obscures its llama.cpp dependency, ships inferior inference performance, and is drifting toward a closed-source cloud model. The [Helply desktop assistant](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) illustrates how applications can abstract over both local (Ollama, LM Studio) and cloud (OpenAI, Anthropic, Groq) backends simultaneously.

Context management is a second major surface. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) acts as a proxy that compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different approach, applying wavelet transforms to source code to produce multi-resolution structural views without language-specific parsers. Knowledge-base tooling addresses the same pressure from the document side: the [LostWarrior knowledge-base CLI](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) generates tiered markdown and a machine-readable manifest so agents can navigate context without excess token burn, and a [Reddit guide to Karpathy's LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes having models build and maintain structured Markdown at scale as an alternative to RAG.

MCP has emerged as a common integration layer across many of these tools. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) uses it to serve documentation to both humans and LLMs. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) wraps platform expertise in an MCP server consumable by Claude Code, Cursor, and Gemini CLI. Anthropic's [.mcpb packaging guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) standardizes distribution of local MCP servers as single-click bundles.

Safety and pricing shape how this tooling is actually deployed. Running an agentic coding assistant like Claude Code inside a Docker sandbox is argued as a baseline precaution against credential leaks and production data loss [by cekrem](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box). On cost, a 75x pricing spread across providers means architectural decisions about provider coupling carry real margin consequences [according to Superframeworks](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on). A [Claude Code plugin by Gvozdev](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) that rewrites assistant output into plain English via a local Ollama model sits at the edge of this space: a small utility that chains cloud and local inference purely for output readability.

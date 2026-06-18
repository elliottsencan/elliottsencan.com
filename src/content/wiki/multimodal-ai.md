---
title: Multimodal AI
summary: >-
  AI systems that process and generate across multiple input types, including
  text, images, video, and audio, increasingly embedded in reasoning pipelines,
  local tooling, and autonomous creative workflows.
sources:
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - 2026-04/2026-04-30t231206-poolday
  - 2026-05/2026-05-05t071908-oobaboogatextgen
compiled_at: '2026-06-18T23:05:03.652Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2625
    output_tokens: 391
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
  cost_usd: 0.01374
---
Multimodal AI covers models and systems that operate across more than one data modality. The most developed branch is vision-language models (VLMs), which [saw rapid architectural diversification through 2025](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger): any-to-any models, mixture-of-experts decoders, smaller high-capability models, video understanding, and multimodal RAG all matured in parallel. The same period saw VLMs move from passive inference into agentic roles, where they perceive, reason, and act across longer task chains.

Multimodal capability is also appearing in local, self-hosted tooling. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) supports multimodal input alongside standard LLM backends, meaning vision-capable models can be run fully offline without API dependency.

On the production side, [Poolday's Creator-1](/reading/2026-04/2026-04-30t231206-poolday) illustrates what multimodal orchestration looks like applied: a multi-agent system coordinates 100+ generative models to execute video edits end-to-end, producing editable project files rather than static outputs. This connects multimodal AI to agentic workflows where the plurality of modalities is not incidental but central to the task.

---
title: LLM fine-tuning
summary: >-
  LLM fine-tuning adapts a pretrained model to a specific task or domain;
  current tooling ranges from from-scratch training guides to efficient local
  adapters to automated synthetic data pipelines that can beat larger models at
  a fraction of the cost.
sources:
  - 2026-04/2026-04-24t093356-unsloth
  - >-
    2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your
  - 2026-05/2026-05-05t071908-oobaboogatextgen
  - 2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt
  - 2026-05/2026-05-10t213609-raiyanyahyahow-to-train-your-gpt
aliases:
  - machine-learning
compiled_at: '2026-06-18T21:49:21.134Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2785
    output_tokens: 521
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
  cost_usd: 0.01617
---
Fine-tuning starts where pretraining ends: given a model that already understands language, you update its weights on a narrower dataset to shift its behavior toward a specific task. The mechanics vary considerably by budget and goal.

At the accessible end, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) reduces the compute cost of fine-tuning dramatically, claiming up to 30x faster training and 90% less memory than FlashAttention 2, with tooling to generate datasets from PDFs, CSVs, and JSON without writing code. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) takes a similar local-first stance, adding LoRA fine-tuning alongside inference in a single offline desktop app.

For teams who want task-specific models without large infrastructure, the BARRED framework covered in [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) uses multi-agent debate to auto-generate verified synthetic training data. The result is a 3B-parameter classifier that outperforms GPT-4.1 on a policy task while costing far less at inference time. This is the central argument for fine-tuning over prompting: a smaller specialized model can beat a larger general one if the training data is good enough.

For those who want to understand what fine-tuning is actually adjusting, [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a modern LLM from scratch with every line commented, grounding the higher-level tooling in the underlying architecture.

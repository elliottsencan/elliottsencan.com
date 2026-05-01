---
title: Model training
summary: >-
  Practical LLM fine-tuning has shifted toward local, low-resource workflows:
  Unsloth cuts memory and time costs dramatically, while synthetic data
  generation lets small models match or beat frontier models on narrow tasks.
sources:
  - 2026-04/2026-04-24t093356-unsloth
  - >-
    2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your
compiled_at: '2026-05-01T05:21:23.431Z'
compiled_with: claude-sonnet-4-6
---
Fine-tuning large language models has historically required significant compute and carefully curated datasets. Two recent developments compress both requirements considerably.

[Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) addresses the compute side. It provides optimized kernels that train and run LLMs locally with up to 30x faster throughput and 90% less memory than FlashAttention 2. It supports LoRA adapters, vision and audio modalities, and over 500 model variants, accessible either through open-source code or a no-code studio. The practical effect is that fine-tuning workloads that previously required cloud GPU clusters can run on consumer hardware.

The data side is addressed by the BARRED framework, covered in [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your). BARRED uses multi-agent debate to generate synthetic training data that has been verified before it enters the training pipeline. The result is small classifiers fine-tuned on this data that outperform GPT-4.1 on custom policy guardrail tasks at substantially lower cost. The key claim is that a narrow, well-specified task paired with quality synthetic data can make a small model competitive with a much larger general-purpose one.

Together these point toward a pattern: fine-tuning increasingly happens locally, on smaller models, using generated rather than hand-labeled data, with the tradeoff being that the resulting models are specialized rather than general.

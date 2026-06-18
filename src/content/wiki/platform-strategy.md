---
title: Platform strategy
summary: >-
  Platform strategy covers how companies define the boundaries, moats, and
  tradeoffs of the systems they build or depend on, from internal developer
  platforms to AI infrastructure to market positioning.
sources:
  - 2026-04/2026-04-24t162154-he-came-he-saw-he-cooked
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-30t231537-startupsrip
  - 2026-04/2026-04-30t231745-optimal-vs-usertesting
  - 2026-05/2026-05-06t204115-platform-engineering-end-to-end
  - 2026-05/2026-05-08t131438-apocalypse-no
  - 2026-05/2026-05-10t205349-github-is-sinking
  - >-
    2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on
  - 2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate
  - >-
    2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup
aliases:
  - ai-strategy
compiled_at: '2026-06-18T23:03:37.707Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6526
    output_tokens: 752
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
  cost_usd: 0.030858
---
Platform strategy is the set of decisions about what a platform does, what it leaves to others, and where its defensible value actually sits. The sources here cut across several distinct platform contexts, but a common thread runs through them: the choice of what to own versus what to delegate determines whether a platform compounds or decays.

In software infrastructure, that boundary question is direct. [Platform Engineering End-to-End](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) makes the case that internal developer platforms exist to reduce cognitive load on product teams by owning the operational scaffolding, paved paths, and golden paths that would otherwise be rebuilt repeatedly. The platform team's job is to treat internal developers as customers, which means resisting the urge to build everything and instead curating what actually accelerates delivery.

The same logic applies to AI tooling. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that teams building on LLM agents should not invest in custom orchestration layers, because the orchestration problem is being solved at the frontier model level. The platform bet worth making is on your own APIs and domain context, the parts no one else can replicate.

This connects to a broader point about where moats actually form. [The Competitive Moat That AI Can't Replicate](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) argues that the deepest platform advantages are not technical but relational: accumulated trust that erodes the moment a platform optimizes purely for metrics. Platforms that automate away human contact discover the loss only after the trust is gone.

Platform dependency carries its own risks. [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking) is a case study in what happens when a platform declines under new ownership: reliability suffers, alternatives emerge, and the switching cost that once felt prohibitive starts to look worthwhile. [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes the parallel point for AI providers: a 75x price spread across frontier models means vendor lock-in is a strategic liability, and provider-agnostic architecture is now the baseline prudent posture.

For founders, [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) frames platform decisions as compounding: how you build in the MVP stage determines what is possible at scale, and agentic technical debt, where architectural decisions are re-derived from scratch each session, is harder to pay off than ordinary debt. Platform coherence is not a polish concern; it is a scaling prerequisite.

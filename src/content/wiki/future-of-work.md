---
title: Future of work
summary: >-
  AI automation, skill atrophy, tacit knowledge, and structural hiring
  dysfunction are reshaping what software work looks like and who survives it.
sources:
  - >-
    2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects
  - >-
    2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile
  - >-
    2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise
  - >-
    2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession
  - >-
    2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you
  - >-
    2026-05/2026-05-19t134831-finite-attention-why-burnout-isnt-your-fault-and-how
  - 2026-05/2026-05-28t074225-welcome-robot-overlords-please-dont-fire-us
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - 2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate
  - 2026-06/2026-06-21t231454-spacex-and-the-sentient-sun
  - 2026-06/2026-06-22t001042-how-to-leave
  - 2026-06/2026-06-22t182141-the-systemic-decay-of-tech-hiring
  - 2026-06/2026-06-30t173037-a-return-to-two-pizza-culture
  - 2026-07/2026-07-07t170607-the-software-engineering-war
  - 2026-07/2026-07-09t161342-ai-2040-plan-a
  - 2026-08/2026-08-03t025839-dont-be-a-meat-proxy
  - 2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic
aliases:
  - automation-history
  - labor-market
compiled_at: '2026-09-07T21:15:51.799Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4881
    output_tokens: 1078
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
  cost_usd: 0.030813
---
The question of what work looks like as AI matures is not a single debate but several overlapping ones, and the sources here pull in different directions.

On the macro level, [Kevin Drum's 2013 piece](/reading/2026-05/2026-05-28t074225-welcome-robot-overlords-please-dont-fire-us) anticipated the current anxiety: Moore's Law would eventually produce machines capable of displacing not just manual labor but cognitive labor, with no guarantee that new sectors would absorb the surplus workers. That concern has materialized faster than most expected. [Falk and Tsoukalas](/reading/2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects) formalize it as a game-theoretic trap: competitive pressure forces firms to lay off workers prematurely even when AI productivity gains are uncertain, producing a collectively bad equilibrium that no individual firm can escape unilaterally.

At the team level, the transformation is more granular. [Ethan Mollick's hands-on account](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) of working with Claude 5 Fable describes multi-hour autonomous workflows and sub-agent delegation, but frames the human role as shifting from doing to commissioning. [Werner Vogels](/reading/2026-06/2026-06-30t173037-a-return-to-two-pizza-culture) sees this compression as an argument for restructuring process itself, replacing the Working Backwards doc with a prototype-first loop. Meanwhile [Anton Zaides](/reading/2026-07/2026-07-07t170607-the-software-engineering-war) captures the resulting culture split between engineers who prioritize shipping fast with AI and those who insist on code quality, a divide that often has more to do with organizational context than genuine technical conviction.

The skill atrophy concern runs through several sources. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) argues that shipping AI-generated code without review erodes engineering craft and becomes categorically dangerous in safety-critical systems. [Zaides again](/reading/2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic) distinguishes delegating to AI from blindly accepting its output, and [gruhn](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) makes the same point: relaying raw AI output without synthesis shifts cognitive burden onto the recipient and evacuates the value the sender was supposed to add.

Tacit knowledge is a quieter thread but a persistent one. [cekrem's piece on Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) argues that the most valuable engineering expertise is structurally inaccessible to AI because it can only be transmitted through apprenticeship. If hiring and onboarding systems are already broken, as [Vladimir Klepov](/reading/2026-06/2026-06-22t182141-the-systemic-decay-of-tech-hiring) and [DHg](/reading/2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile) document independently, the pipeline for transmitting that knowledge is compromised before AI enters the picture.

The human-connection argument from [Ghost in the Data](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) adds another dimension: organizations that automate away human relationships destroy trust that no AI personalization can rebuild. [Abby Malson](/reading/2026-05/2026-05-19t134831-finite-attention-why-burnout-isnt-your-fault-and-how) locates a related failure in on-call systems designed to maximize data throughput without accounting for human attention limits. Both point to the same structural error: optimizing for what is measurable while destroying what is not.

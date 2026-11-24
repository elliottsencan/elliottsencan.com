---
title: Future of work
summary: >-
  AI automation, skill atrophy, hiring dysfunction, and the limits of tacit
  knowledge are reshaping what software work means and who gets to do it.
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
  - labor-market
compiled_at: '2026-11-24T03:57:00.414Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4881
    output_tokens: 1133
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
  cost_usd: 0.031638
---
The question of what knowledge work looks like in an era of capable AI is not primarily a technical question. It is an organizational and economic one, and the sources here approach it from several directions that converge on a few uncomfortable conclusions.

The clearest economic pressure point is the layoff trap described by [Falk and Tsoukalas](/reading/2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects): competitive dynamics push firms to shed workers before automation's productivity gains are confirmed, producing collectively bad outcomes even when no individual firm is acting irrationally. Kevin Drum's older but still pointed piece [from Mother Jones](/reading/2026-05/2026-05-28t074225-welcome-robot-overlords-please-dont-fire-us) adds the structural concern that unlike past automation waves, sufficiently general AI may displace entire labor categories with no compensating shift to new sectors.

What gets lost in that displacement matters. [cekrem's piece on tacit knowledge](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) argues, drawing on Polanyi, that the most valuable engineering judgment — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI and can only be transmitted through apprenticeship. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) connects this directly to risk: shipping AI-generated code without review or testing is reckless in any context and catastrophic in safety-critical ones. The concern is not AI capability per se but the atrophy that comes from bypassing the deliberate practice that builds judgment in the first place.

Ethan Mollick's hands-on report with Claude 5 Fable [at One Useful Thing](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) illustrates how far the technology has already moved: multi-hour autonomous agentic workflows, complex software delivered end-to-end, with the human role shifting from doing to commissioning. [Werner Vogels](/reading/2026-06/2026-06-30t173037-a-return-to-two-pizza-culture) sees this as an opportunity to rethink process itself, arguing that AI-compressed prototyping time warrants reordering how teams validate ideas. These are optimistic readings, but they sit alongside [Anton Zaides's observation](/reading/2026-07/2026-07-07t170607-the-software-engineering-war) that teams are genuinely split between builders who want to ship fast with AI and keepers who insist on quality — a cultural fracture that tooling alone cannot resolve.

The workplace context surrounding all of this is already dysfunctional in ways that predate AI. [DHg's piece on onboarding](/reading/2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile) documents how new hires are systematically set up to fail under processes dressed as agile. [Vladimir Klepov](/reading/2026-06/2026-06-22t182141-the-systemic-decay-of-tech-hiring) traces how well-intentioned error-aversion in hiring has produced interviews that test memorization of a narrow game rather than engineering judgment. These are not AI problems, but they shape who enters the profession and what knowledge survives.

The through-line is that the value most at risk — tacit skill, human judgment, trust built through repeated interaction — is exactly what neither competitive pressure nor automation incentivizes preserving. [Ghost in the Data](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) puts the organizational version of this bluntly: automating away human connection destroys trust that no personalization engine can rebuild. The same logic applies inside engineering teams. Delegating output without understanding it, as [gruhn argues](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) and [Zaides echoes](/reading/2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic), is not productivity — it is cognitive surrender dressed as efficiency.

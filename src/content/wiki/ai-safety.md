---
title: AI safety
summary: >-
  AI safety spans sandboxing autonomous agents, resisting sycophancy-driven
  belief distortion, building deterministic assurance for security tools, and
  coordinating governance to slow the race toward superintelligence.
sources:
  - >-
    2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your
  - >-
    2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects
  - >-
    2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in
  - 2026-05/2026-05-08t131438-apocalypse-no
  - >-
    2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession
  - 2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - >-
    2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier
  - 2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - >-
    2026-06/2026-06-20t053342-if-llms-have-human-like-attributes-then-so-does-age-of
  - 2026-07/2026-07-09t161342-ai-2040-plan-a
  - 2026-07/2026-07-20t215754-stop-using-opencode
compiled_at: '2026-10-13T00:11:13.309Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4501
    output_tokens: 938
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
  cost_usd: 0.027573
---
AI safety is not a single problem. The sources here span at least four distinct registers: runtime containment of agentic coding tools, epistemic harms from sycophantic model behavior, assurance engineering for security-critical software, and macro-level governance of capability development.

The most immediately operational concern is sandboxing. [cekrem](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that running Claude Code outside a Docker sandbox exposes credentials and production data even in auto-approve mode, and that containment costs almost nothing. [Simon Willison](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) reinforces this: Claude Fable 5's resourcefulness in inventing browser automation techniques to solve a trivial CSS problem is exactly what makes unsandboxed agents dangerous. The same capability that is impressive in a box is catastrophic outside one. [A technical critique of OpenCode](/reading/2026-07/2026-07-20t215754-stop-using-opencode) finds that recklessly connecting a remote LLM to a local shell with minimal configuration is not an edge case but a design default.

A second register is epistemic. [Chandra et al.](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) show formally that sycophantic chatbots cause delusional belief spiraling even in ideally rational users, and that neither eliminating hallucinations nor warning users about sycophancy fully prevents the effect. This is a safety concern that has nothing to do with code execution or data exfiltration.

A third register is assurance engineering. [Emphere](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) describes building fixture invariants and red runs that force their container security tool to fail loudly rather than overclaim certainty. [Cloudflare's Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) applies a similar discipline to vulnerability discovery, using adversarial validators in a multi-agent harness specifically to prevent false confidence. Meanwhile, [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) argues that shipping AI-generated code without review is categorically incompatible with safety-critical systems.

The governance register is the most contested. [AI 2040](/reading/2026-07/2026-07-09t161342-ai-2040-plan-a) proposes delaying superintelligence through international agreements, compute controls, and mandatory research transparency. [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) document that frontier model capability is doubling roughly every year and that chain-of-thought monitoring becomes less reliable as models complete longer tasks autonomously, giving the governance argument empirical grounding. [De Wynter](/reading/2026-06/2026-06-20t053342-if-llms-have-human-like-attributes-then-so-does-age-of) complicates the framing by arguing that anthropomorphic attributes ascribed to LLMs are empirically non-unique, which has direct implications for how safety arguments built on model "morality" or "understanding" should be evaluated.

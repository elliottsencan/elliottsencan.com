---
title: humanlayer/12-factor-agents
url: >-
  https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-05-unify-execution-state.md

  Platform%20Solutions%20Resources%20Open%20Source%20Enterprise%20Sign%20in%0APricing%20Sign%20up%0Ahumanlayer%20/%2012-factor-agents%20Public%0ANotifications%20Fork%201.6k%20Star%2021.2k%0ACode%20Issues%2011%20Pull%20requests%2013%20Discussions%20Actions%20Projects%20Security%20and%20quality%0AFiles%0Amain%0AGo%20to%20file%0Acontent%0Aappendix-13-pre-fetch.md%0Abrief-history-of-software.md%0Afactor-01-natural-language-to-t%E2%80%A6%0Afactor-02-own-your-prompts.md%0Afactor-03-own-your-context-win%E2%80%A6%0Afactor-04-tools-are-structured-%E2%80%A6%0Afactor-05-unify-execution-state.%E2%80%A6%0Afactor-06-launch-pause-resume%E2%80%A6%0Afactor-07-contact-humans-with-%E2%80%A6%0Afactor-08-own-your-control-flo%E2%80%A6%0Afactor-09-compact-errors.md%0Afactor-1-natural-language-to-to%E2%80%A6%0Afactor-10-small-focused-agents.%E2%80%A6%0Afactor-11-trigger-from-anywhere%E2%80%A6%0Afactor-12-stateless-reducer.md%0Afactor-2-own-your-prompts.md%0A12-factor-agents%20/%20content%20/%20factor-05-unify-execution-state.md%0Akyu08%20Delete%20unnecessary%20%5D%20744a31f%20%C2%B7%208%20months%20ago%20History%0APreview%20Code%20Blame%20Raw%0A%E2%86%90%20Back%20to%20README%0A5.%20Unify%20execution%20state%20and%20business%20state%0AEven%20outside%20the%20AI%20world,%20many%20infrastructure%20systems%20try%20to%20separate%20%22execution%0Astate%22%20from%20%22business%20state%22.%20For%20AI%20apps,%20this%20might%20involve%20complex%20abstractions%20to%0Atrack%20things%20like%20current%20step,%20next%20step,%20waiting%20status,%20retry%20counts,%20etc.%20This%0Aseparation%20creates%20complexity%20that%20may%20be%20worthwhile,%20but%20may%20be%20overkill%20for%20your%20use%0Acase.%0AAs%20always,%20it's%20up%20to%20you%20to%20decide%20what's%20right%20for%20your%20application.%20But%20don't%20think%20you%0Ahave%20to%20manage%20them%20separately.%0AMore%20clearly:%0AExecution%20state:%20current%20step,%20next%20step,%20waiting%20status,%20retry%20counts,%20etc.%0ABusiness%20state:%20What's%20happened%20in%20the%20agent%20workflow%20so%20far%20(e.g.%20list%20of%20OpenAI%0Amessages,%20list%20of%20tool%20calls%20and%20results,%20etc.)%0AIf%20possible,%20SIMPLIFY%20-%20unify%20these%20as%20much%20as%20possible.%0Aunify-state-crop.mp4%0A%E2%96%B6%20GIF%20Version%0AIn%20reality,%20you%20can%20engineer%20your%20application%20so%20that%20you%20can%20infer%20all%20execution%20state%0Afrom%20the%20context%20window.%20In%20many%20cases,%20execution%20state%20(current%20step,%20waiting%20status,%0Aetc.)%20is%20just%20metadata%20about%20what%20has%20happened%20so%20far.%0AYou%20may%20have%20things%20that%20can't%20go%20in%20the%20context%20window,%20like%20session%20ids,%20password%0Acontexts,%20etc,%20but%20your%20goal%20should%20be%20to%20minimize%20those%20things.%20By%20embracing%20factor%203%0Ayou%20can%20control%20what%20actually%20goes%20into%20the%20LLM%0AThis%20approach%20has%20several%20benefits:%0A1.%202.%203.%204.%205.%206.%207.%20Simplicity:%20One%20source%20of%20truth%20for%20all%20state%0ASerialization:%20The%20thread%20is%20trivially%20serializable/deserializable%0ADebugging:%20The%20entire%20history%20is%20visible%20in%20one%20place%0AFlexibility:%20Easy%20to%20add%20new%20state%20by%20just%20adding%20new%20event%20types%0ARecovery:%20Can%20resume%20from%20any%20point%20by%20just%20loading%20the%20thread%0AForking:%20Can%20fork%20the%20thread%20at%20any%20point%20by%20copying%20some%20subset%20of%20the%20thread%0Ainto%20a%20new%20context%20/%20state%20ID%0AHuman%20Interfaces%20and%20Observability:%20Trivial%20to%20convert%20a%20thread%20into%20a%20human-%0Areadable%20markdown%20or%20a%20rich%20Web%20app%20UI%0A%E2%86%90%20Tools%20Are%20Structured%20Outputs%20%7C%20Launch/Pause/Resume%20%E2%86%92

  https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-05-unify-execution-state.md
summary: >-
  Factor 5 of 12-factor-agents argues that AI apps should unify execution state
  and business state into a single context-window-derived thread, simplifying
  serialization, debugging, recovery, and observability.
category: tech
added: '2026-05-20T00:44:52.846Z'
source: GitHub
topics:
  - agentic-workflows
  - llm-engineering
  - software-architecture
  - context-engineering
  - ai-agents
compiled_at: '2026-05-20T00:44:52.846Z'
compiled_with: claude-sonnet-4-6
title_source: model
compile_cost:
  usage:
    input_tokens: 5693
    output_tokens: 100
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
  cost_usd: 0.018579
---


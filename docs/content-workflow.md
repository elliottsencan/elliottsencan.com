# Content workflow

Internal reference for the voice-memo → Whisper → Claude → self-edit pipeline. Linear: 2TS-237. Public articulation lives at [`/process`](../src/pages/process.astro).

The thesis: the thinking is the signal. AI structures and edits; it does not author. Voice memo captures the reasoning, Claude turns raw transcript into an outline, you write the draft yourself.

## 1. Record

- 10–15 min voice memo per post. No script — talk through the key ideas, decisions, and reasoning out loud.
- Any recorder is fine. Apple Voice Memos → export `.m4a` is the default.

## 2. Transcribe with Whisper

```sh
curl -s https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F model=whisper-1 \
  -F response_format=text \
  -F file=@memo.m4a \
  > memo.txt
```

Notes:
- `response_format=text` returns the raw transcript without JSON wrapping.
- 25 MB upload limit. If the memo is larger, trim silence or split the file.
- Expect ~$0.006/minute. A 15-minute memo is ≈ $0.09.

## 3. Structure with Claude

Paste the transcript into a Claude Project that has your writing samples as Project Knowledge (Slack messages, past docs/READMEs, prior posts, code review comments, personal emails — 5 registers). Use a structuring prompt like:

```
You're helping me turn a voice-memo transcript into a blog post outline.

Constraints:
- Preserve my phrasing and reasoning. Don't smooth the argument or
  paraphrase for clarity — I'll do that.
- Group related points into sections with short headings.
- Flag any place where I trailed off, contradicted myself, or left a
  thought unfinished. Don't fix those — list them so I can decide.
- Output as markdown: section headings + bullets quoting the original
  phrasing.

Transcript:

<paste>
```

The output is a scaffold, not a draft.

## 4. Write

Open the outline in your editor. Write the draft yourself. Claude is available for editing passes — tightening a paragraph, cutting a filler clause — but not for generating new prose.

## 5. Final pass

- Read the post aloud. Anything that sounds like AI wrote it gets cut or rewritten.
- Set `aiAssistance` honestly in the frontmatter. Definitions live at [`/process#ai-assistance-levels`](../src/pages/process.astro). If AI materially shaped the outline or edit, that's `heavy`. Don't under-flag.
- Set `aiNote` to a one-liner describing what AI actually did for this post, if useful.

## Frontmatter

```yaml
---
title: "…"
description: "…"
date: 2026-04-14
tags: ["…"]
aiAssistance: "light"   # none | light | heavy | full
aiNote: "Claude helped tighten the closing two paragraphs."
---
```

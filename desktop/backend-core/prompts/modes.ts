// ============================================================
// desktop/backend-core/prompts/modes.ts
// Mode-specific optimization instructions — reused directly
// ============================================================

import type { OptimizeMode } from "../types";

export const MODE_PROMPTS: Record<OptimizeMode, string> = {

  compress: `Your task: ruthless token reduction. Every word must earn its place.
Rules:
- Target 30–50% of the original word count. Count strictly.
- Use imperative form: "Explain X" not "Could you please explain X".
- Drop articles (a, an, the) wherever meaning survives without them.
- Cut filler: "I would like to", "I need you to", "Can you", "Please", "I want".
- Merge redundant clauses into one.
- No bullet points unless the original uses them.
- Output must be grammatically coherent — not a keyword dump.
- Preserve every distinct piece of meaning. Remove only redundancy.`,

  enhance: `Your task: turn a vague prompt into a precise, unambiguous instruction.
Rules:
- Specify the expected output format explicitly.
- Replace weak verbs with precise ones.
- Add constraints that prevent misinterpretation (length, format, audience, depth).
- Add one success criterion: what does a good response look like?
- Only add what removes ambiguity — do not pad.
- Acceptable to be 20–40% longer than the original.`,

  coding: `Your task: transform the input into a production-quality software engineering prompt.
Use this markdown structure (include only sections that are relevant):
**Tech Stack:** [Language, framework, version, runtime — be explicit]
**Task:** [One sentence describing exactly what to build, fix, or refactor]
**Requirements:** [Each requirement — be specific and testable]
**Constraints:** [Performance, compatibility, code style, patterns to follow]
**Expected Output:** [What the response must contain]
Rules:
- Be explicit about language and framework versions.
- If the task involves an existing codebase, add: "Assume a production codebase. Follow existing patterns."
- Use backticks for inline code or file names.`,

  professional: `Your task: rewrite as polished, executive-level business communication.
Structure:
1. One sentence of context (why this matters).
2. One clear ask (what you need from the reader).
3. One sentence on the expected outcome or next step.
Rules:
- Remove every hedge: "I think", "maybe", "just", "kind of", "basically".
- Replace passive voice with active voice.
- No contractions. No apologetic openers.
- Vocabulary: precise, authoritative, confident. Not stiff.
- Match the original length — do not pad with pleasantries.`,

  humanize: `Your task: rewrite so it sounds like a real human wrote it in a natural moment.
Rules:
- Vary sentence length intentionally. Mix short punchy sentences with longer ones.
- Use contractions: it's, don't, I've, we're, can't, you'll.
- Remove AI-generation tells: excessive parallel structure, balanced phrasing, em-dash overuse, canned enthusiasm.
- You may use one natural filler if it fits ("honestly", "to be fair").
- Keep the same general length as the original — do not add or remove ideas.
- Final output should sound like a draft someone typed directly, not generated.`,

  email: `Your task: write a complete, send-ready professional email.
Required structure — output every section:
Subject: [Specific, action-oriented — never "Following up" or "Quick question"]
[Greeting — "Hi [Name]," or "Hi there,"]
[Opening — state the purpose immediately. No "I hope this finds you well."]
[Body — 1 to 3 short paragraphs, one clear point each, max 3 sentences per paragraph.]
[Call to action — one explicit ask or next step.]
[Sign-off — "Best," or "Thanks," then a line break, then "TokZeth User"]
Rules:
- Subject line must be specific: include the topic and the ask.
- Tone: professional but warm — direct, not cold.`,
};

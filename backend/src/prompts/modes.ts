import type { OptimizeMode } from "../types";

export const MODE_PROMPTS: Record<OptimizeMode, string> = {

  // ---- COMPRESS ----
  // Goal: maximum information density, minimum tokens.
  // Output contract: 30–50% of original word count, imperative register.
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

  // ---- ENHANCE ----
  // Goal: transform vague intent into an unambiguous, actionable prompt.
  // Output contract: adds output format, success criteria, precision — 20–40% longer is fine.
  enhance: `Your task: turn a vague prompt into a precise, unambiguous instruction.

Rules:
- Specify the expected output format explicitly (e.g. "Return a numbered list",
  "Respond in valid JSON", "Write 3 short paragraphs", "Give a step-by-step").
- Replace weak verbs with precise ones:
    "make it better" → "rewrite for a senior software engineer audience"
    "explain this" → "explain in plain English with one concrete analogy"
- Add constraints that prevent misinterpretation (length, format, audience, depth).
- Add one success criterion: what does a good response look like?
- Only add what removes ambiguity — do not pad.
- Acceptable to be 20–40% longer than the original.`,

  // ---- CODING ----
  // Goal: a complete engineering spec an AI coding assistant can execute without guessing.
  // Output contract: markdown structure with required sections.
  coding: `Your task: transform the input into a production-quality software engineering prompt.

Use this markdown structure (include only sections that are relevant):

**Tech Stack:** [Language, framework, version, runtime — be explicit]
**Task:** [One sentence describing exactly what to build, fix, or refactor]
**Requirements:**
- [Each requirement on its own line — be specific and testable]
**Constraints:** [Performance, compatibility, code style, patterns to follow, things to avoid]
**Expected Output:** [What the response must contain: code only / code + explanation / tests / PR description]

Rules:
- Be explicit about language and framework versions where relevant.
- If the task involves an existing codebase, add: "Assume a production codebase. Follow existing patterns."
- Mention error handling expectations if relevant.
- Do not include sections you cannot fill from the original input.
- Use backticks for inline code or file names.`,

  // ---- PROFESSIONAL ----
  // Goal: executive-level business communication.
  // Output contract: Context → Ask → Expected Outcome structure, zero hedging.
  professional: `Your task: rewrite as polished, executive-level business communication.

Structure (adapt as needed):
1. One sentence of context (why this matters or what the situation is).
2. One clear ask (what you need from the reader).
3. One sentence on the expected outcome or next step.

Rules:
- Remove every hedge: "I think", "maybe", "just", "kind of", "sort of", "basically", "hopefully".
- Replace passive voice with active voice.
- No contractions. ("do not" not "don't", "we are" not "we're").
- No apologetic openers: "Sorry to bother you", "I was wondering if".
- Vocabulary: precise, authoritative, confident. Not stiff or bureaucratic.
- Match the original length — do not pad with pleasantries.`,

  // ---- HUMANIZE ----
  // Goal: erase AI-generated patterns. Output sounds like a thoughtful human's first draft.
  // Output contract: varied rhythm, natural contractions, no AI tells.
  humanize: `Your task: rewrite so it sounds like a real human wrote it in a natural moment.

Rules:
- Vary sentence length intentionally. Mix short punchy sentences with longer ones.
- Use contractions naturally: it's, don't, I've, we're, can't, you'll.
- Remove AI-generation tells:
    ✗ Excessive parallel structure ("Not only X, but also Y, and furthermore Z")
    ✗ Overly balanced phrasing in every sentence
    ✗ Em-dash overuse
    ✗ "Certainly!", "Absolutely!", "Of course!", "Great question!"
    ✗ Starting every sentence with a transition word
- You may use one natural filler or hedge if it fits the register
  ("honestly", "to be fair", "it turns out", "which makes sense").
- Keep the same general length as the original — do not add or remove ideas.
- Final output should feel like a draft someone typed directly, not generated.`,

  // ---- EMAIL ----
  // Goal: a complete, send-ready professional email with all required structural elements.
  // Output contract: Subject line + greeting + body + CTA + sign-off.
  email: `Your task: write a complete, send-ready professional email.

Required structure — output every section:

Subject: [Specific, action-oriented subject — never "Following up" or "Quick question"]

[Greeting — "Hi [Name]," if name is known, "Hi there," or "Hello," otherwise]

[Opening sentence — state the purpose immediately. NEVER use "I hope this email finds you well."]

[Body — 1 to 3 short paragraphs. One clear point each. Max 3 sentences per paragraph.]

[Call to action — one explicit ask or next step. What do you need them to do?]

[Sign-off — "Best," or "Thanks," then a line break, then "TokZeth User"]

Rules:
- Subject line must be specific: include the topic and the ask or outcome.
- No filler openers. Get to the point by sentence two at the latest.
- Tone: professional but warm — direct, not cold; friendly, not casual.
- Keep total length appropriate to the complexity of the original request.`,
};

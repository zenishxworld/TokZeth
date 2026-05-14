import type { OptimizeMode } from "../types";

// Each mode has a targeted instruction that shapes how the text is rewritten.
// These are appended after the base system prompt.

export const MODE_PROMPTS: Record<OptimizeMode, string> = {
  compress: `Make the text as concise as possible.
Remove all filler words, redundancy, and unnecessary context.
Keep every essential idea. Aim for 40-60% of the original length.
The result must be clear and direct.`,

  enhance: `Improve the clarity, specificity, and impact of the text.
Add relevant context where it improves the prompt.
Use precise language. Make it more actionable and unambiguous.
Do not change the core meaning.`,

  coding: `Rewrite this as a precise, technical software engineering prompt.
Be explicit about: programming language, frameworks, desired output, constraints.
Use technical terminology correctly.
Structure the prompt so an AI coding assistant can execute it without guessing.`,

  professional: `Rewrite this in a formal, professional business tone.
Remove casual language, slang, and contractions.
Use clear, authoritative, and confident language.
Suitable for professional correspondence or workplace communication.`,

  humanize: `Rewrite this to sound natural, warm, and conversational.
Remove robotic or AI-generated patterns.
Use natural rhythm, contractions, and everyday language.
It should read like a real human wrote it.`,

  email: `Rewrite this as a well-structured professional email.
Include: a clear subject line (prefix with "Subject: "), a polite greeting,
a clear body with the key message, and a professional sign-off.
Tone: polite, clear, and direct.`,
};

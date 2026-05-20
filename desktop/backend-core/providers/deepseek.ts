// ============================================================
// desktop/backend-core/providers/deepseek.ts
// DeepSeek API adapter — reused directly
// ============================================================

import axios from "axios";
import type { AIProvider, AIProviderResponse } from "./types";

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

export class DeepSeekProvider implements AIProvider {
  name = "deepseek";

  private apiKey: string;
  private model: string;

  constructor() {
    const key = process.env.DEEPSEEK_API_KEY;
    if (!key) throw new Error("DEEPSEEK_API_KEY is not set in environment");
    this.apiKey = key;
    this.model = process.env.DEEPSEEK_MODEL ?? "deepseek-chat";
  }

  async complete(
    systemPrompt: string,
    userMessage: string
  ): Promise<AIProviderResponse> {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      },
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    const choice = response.data.choices?.[0];
    if (!choice?.message?.content) {
      throw new Error("DeepSeek returned an empty response");
    }

    return {
      text: choice.message.content.trim(),
      inputTokens: response.data.usage?.prompt_tokens ?? 0,
      outputTokens: response.data.usage?.completion_tokens ?? 0,
    };
  }
}

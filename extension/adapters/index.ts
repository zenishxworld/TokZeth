import { Adapter } from "./base.adapter";
import chatGPTAdapter from "./chatgpt.adapter";
import claudeAdapter from "./claude.adapter";
import geminiAdapter from "./gemini.adapter";
import perplexityAdapter from "./perplexity.adapter";

const ADAPTERS = {
  "chatgpt.com": chatGPTAdapter,
  "claude.ai": claudeAdapter,
  "gemini.google.com": geminiAdapter,
  "www.perplexity.ai": perplexityAdapter,
};

export const getAdapter = (): Adapter | null => {
  const hostname = window.location.hostname;
  for (const domain in ADAPTERS) {
    if (hostname.includes(domain)) {
      return ADAPTERS[domain];
    }
  }
  return null;
};

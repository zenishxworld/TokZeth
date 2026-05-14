import type { OptimizeMode } from "../storage/settings";
import { fetchWithRetry, ApiError } from "../utils/api";

const BACKEND_URL =
  process.env.PLASMO_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

interface RefineMessage {
  type: "REFINE_TEXT";
  payload: {
    text: string;
    mode: OptimizeMode;
    userId?: string;
  };
}

interface RefineApiResponse {
  success: boolean;
  optimized?: string;
  error?: string;
}

chrome.runtime.onMessage.addListener(
  (message: RefineMessage, _sender, sendResponse) => {
    if (message.type !== "REFINE_TEXT") return false;

    const { text, mode, userId } = message.payload;

    fetchWithRetry<RefineApiResponse>(`${BACKEND_URL}/api/refine`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, mode, userId }),
      timeoutMs: 15_000,
      retries: 1,
    })
      .then((data) => {
        if (data.success && data.optimized) {
          sendResponse({ success: true, optimized: data.optimized });
        } else {
          sendResponse({
            success: false,
            error: data.error ?? "API returned an empty result",
          });
        }
      })
      .catch((err: unknown) => {
        let msg = "Network error — check your connection";
        if (err instanceof ApiError) {
          if (err.isTimeout) {
            msg = "Request timed out. Is the backend running?";
          } else if (err.statusCode) {
            msg = err.message; // structured API error from the server
          } else {
            msg = err.message;
          }
        }
        sendResponse({ success: false, error: msg });
      });

    // Return true to keep the message channel open for the async response
    return true;
  }
);

// Right-click context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "tokzeth-refine",
    title: "Optimize with TokZeth",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "tokzeth-refine" || !tab?.id) return;
  chrome.tabs.sendMessage(tab.id, {
    type: "CONTEXT_MENU_REFINE",
    payload: { text: info.selectionText },
  });
});

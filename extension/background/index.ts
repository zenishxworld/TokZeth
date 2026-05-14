// Background service worker.
// Content scripts send messages here; this worker makes the API call
// and sends the result back. This bypasses CORS restrictions on content scripts.

import type { OptimizeMode } from "../storage/settings";

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

interface RefineResult {
  success: boolean;
  optimized?: string;
  error?: string;
}

chrome.runtime.onMessage.addListener(
  (message: RefineMessage, _sender, sendResponse) => {
    if (message.type !== "REFINE_TEXT") return false;

    const { text, mode, userId } = message.payload;

    fetch(`${BACKEND_URL}/api/refine`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, mode, userId }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || !data.success) {
          sendResponse({
            success: false,
            error: data.error ?? "API request failed",
          } as RefineResult);
        } else {
          sendResponse({ success: true, optimized: data.optimized } as RefineResult);
        }
      })
      .catch((err) => {
        sendResponse({
          success: false,
          error: err instanceof Error ? err.message : "Network error",
        } as RefineResult);
      });

    // Return true to keep the message channel open for async response
    return true;
  }
);

// Context menu: right-click → "Optimize with TokZeth"
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

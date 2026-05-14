import { useState, useEffect } from "react";

const MESSAGES = [
  "Analyzing structure...",
  "Optimizing clarity...",
  "Reducing token usage...",
  "Enhancing prompt...",
  "Refining context..."
];

export function useLoadingMessages(isLoading: boolean, intervalMs = 1200) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setMessageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isLoading, intervalMs]);

  return MESSAGES[messageIndex];
}
// Fetch wrapper used by the background service worker.
// Provides: 15-second timeout via AbortController, single retry on
// transient network/timeout failures, typed errors.

export interface FetchOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
}

export class ApiError extends Error {
  statusCode?: number;
  isTimeout = false;

  constructor(message: string, statusCode?: number, isTimeout = false) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.isTimeout = isTimeout;
  }
}

export async function fetchWithRetry<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeoutMs = 15_000, retries = 1, ...init } = options;

  let lastError: ApiError = new ApiError("Unknown network error");

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, { ...init, signal: controller.signal });
      clearTimeout(timer);

      // Parse JSON regardless of status — error responses carry a body too
      const data = (await res.json()) as T;

      if (!res.ok) {
        // API errors (4xx / 5xx) are definitive — never retry them
        const msg =
          (data as Record<string, unknown>)?.error?.toString() ??
          `Server returned ${res.status}`;
        throw new ApiError(msg, res.status);
      }

      return data;
    } catch (err) {
      clearTimeout(timer);

      if (err instanceof ApiError) {
        // Definitive API error — rethrow immediately, do not retry
        throw err;
      }

      // Network or abort (timeout) error
      const isTimeout = (err as Error).name === "AbortError";
      lastError = new ApiError(
        isTimeout
          ? `Request timed out after ${timeoutMs / 1000}s`
          : (err as Error).message ?? "Network error",
        undefined,
        isTimeout
      );

      // Last attempt — break and fall through to throw
      if (attempt >= retries) break;
    }
  }

  throw lastError;
}

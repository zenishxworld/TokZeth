// ============================================================
// desktop/renderer/types.ts
// Extra types for renderer-only state
// ============================================================

export type OptimizeState =
  | { status: "idle" }
  | { status: "loading"; stage: string }
  | { status: "success"; result: { original: string; optimized: string; mode: string; tokensUsed?: number } }
  | { status: "error"; message: string };

export function isSuccess(s: OptimizeState): s is Extract<OptimizeState, { status: "success" }> {
  return s.status === "success";
}
export function isLoading(s: OptimizeState): s is Extract<OptimizeState, { status: "loading" }> {
  return s.status === "loading";
}

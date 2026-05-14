// Re-export shared types inline (avoids workspace symlink issues during dev)
// When the monorepo is fully linked, import from @tokzeth/shared instead.

export type OptimizeMode =
  | "compress"
  | "enhance"
  | "coding"
  | "professional"
  | "humanize"
  | "email";

export const VALID_MODES: OptimizeMode[] = [
  "compress",
  "enhance",
  "coding",
  "professional",
  "humanize",
  "email",
];

export interface RefineRequest {
  text: string;
  mode: OptimizeMode;
  userId?: string;
}

export interface RefineResponse {
  success: boolean;
  original: string;
  optimized: string;
  mode: OptimizeMode;
  tokensUsed?: number;
  provider?: string;
  error?: string;
}

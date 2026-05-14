// Roughly estimate tokens by assuming ~4 characters per token
export function calculateTokenSavings(original: string, optimized: string): number {
  const originalTokens = Math.max(1, Math.ceil(original.length / 4));
  const optimizedTokens = Math.ceil(optimized.length / 4);
  
  if (optimizedTokens >= originalTokens) return 0;
  
  const saved = originalTokens - optimizedTokens;
  return Math.round((saved / originalTokens) * 100);
}
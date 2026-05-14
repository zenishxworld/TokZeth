export type DetectedContext = "coding" | "email" | "professional" | "humanize" | "enhance";

export function detectContext(text: string): DetectedContext {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes("function") || lowerText.includes("bug") || lowerText.includes("api") || lowerText.includes("const ") || lowerText.includes("let ")) {
    return "coding";
  }
  
  if (lowerText.includes("dear ") || lowerText.includes("regards") || lowerText.includes("sincerely")) {
    return "email";
  }
  
  if (lowerText.includes("revenue") || lowerText.includes("synergy") || lowerText.includes("quarterly") || lowerText.includes("stakeholders")) {
    return "professional";
  }
  
  if (lowerText.includes("hey") || lowerText.includes("just wanted to") || lowerText.includes("pretty cool") || lowerText.includes("tbh")) {
    return "humanize";
  }
  
  return "enhance";
}
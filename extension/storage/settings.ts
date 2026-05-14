import { Storage } from "@plasmohq/storage";

export type OptimizeMode =
  | "compress"
  | "enhance"
  | "coding"
  | "professional"
  | "humanize"
  | "email";

export interface ExtensionSettings {
  activeMode: OptimizeMode;
  userId?: string;
  apiKey?: string;
}

const DEFAULT_SETTINGS: ExtensionSettings = {
  activeMode: "enhance",
};

const storage = new Storage();

export async function getSettings(): Promise<ExtensionSettings> {
  const mode = await storage.get<OptimizeMode>("activeMode");
  const userId = await storage.get<string>("userId");
  return {
    activeMode: mode ?? DEFAULT_SETTINGS.activeMode,
    userId,
  };
}

export async function saveMode(mode: OptimizeMode): Promise<void> {
  await storage.set("activeMode", mode);
}

export async function saveUserId(userId: string): Promise<void> {
  await storage.set("userId", userId);
}

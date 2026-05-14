import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TokZeth — AI Prompt Optimizer",
  description: "Optimize your AI prompts instantly. Select, refine, replace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

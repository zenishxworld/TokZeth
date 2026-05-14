"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MODES = [
  { icon: "✦", label: "Enhance", desc: "Clearer & more specific" },
  { icon: "◈", label: "Compress", desc: "Shorter & direct" },
  { icon: "⌨", label: "Coding", desc: "Dev-ready prompts" },
  { icon: "◉", label: "Professional", desc: "Formal tone" },
  { icon: "◌", label: "Humanize", desc: "Natural language" },
  { icon: "◷", label: "Email", desc: "Structured emails" },
];

export default function HomePage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  return (
    <main className="min-h-screen bg-[#0d0d14] text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#2a2a3d]">
        <div className="flex items-center gap-2">
          <span className="text-[#818cf8] text-xl">◈</span>
          <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-[#a5b4fc] to-[#818cf8] bg-clip-text text-transparent">
            TokZeth
          </span>
        </div>
        <button
          onClick={signIn}
          className="px-4 py-2 text-sm font-semibold bg-[#6366f1] hover:bg-[#818cf8] rounded-lg transition-colors"
        >
          Sign in with Google
        </button>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-medium text-[#818cf8] bg-[#13131f] border border-[#2a2a3d] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
            AI Prompt Optimization Layer
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Select text.{" "}
            <span className="bg-gradient-to-r from-[#6366f1] to-[#a5b4fc] bg-clip-text text-transparent">
              Optimize.
            </span>{" "}
            Replace.
          </h1>

          <p className="text-[#94a3b8] text-lg mb-10 leading-relaxed">
            TokZeth is a browser extension that instantly refines your prompts
            using AI. Works everywhere — ChatGPT, Claude, Notion, email, and
            more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={signIn}
              className="px-8 py-3.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-xl shadow-lg shadow-indigo-900/30 hover:shadow-indigo-900/50 transition-shadow"
            >
              Get Started Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 bg-[#13131f] border border-[#2a2a3d] text-[#94a3b8] font-semibold rounded-xl hover:border-[#6366f1] hover:text-white transition-colors"
            >
              View Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Mode Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-20 max-w-2xl w-full"
        >
          {MODES.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="flex flex-col items-center gap-2 p-4 bg-[#13131f] border border-[#2a2a3d] rounded-xl hover:border-[#6366f1] hover:bg-[#1a1a2e] transition-all cursor-default"
            >
              <span className="text-2xl text-[#818cf8]">{m.icon}</span>
              <span className="text-xs font-semibold text-[#e2e8f0]">{m.label}</span>
              <span className="text-[10px] text-[#64748b] text-center leading-tight">{m.desc}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Shortcut hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-sm text-[#64748b]"
        >
          Press{" "}
          <kbd className="px-2 py-0.5 text-xs bg-[#13131f] border border-[#2a2a3d] rounded font-mono text-[#818cf8]">
            Alt+Z
          </kbd>{" "}
          on any selected text to optimize instantly
        </motion.p>
      </section>
    </main>
  );
}

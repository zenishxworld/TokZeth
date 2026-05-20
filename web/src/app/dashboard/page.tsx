"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

const MODE_STATS = [
  { mode: "Enhance", count: 0, color: "#6366f1" },
  { mode: "Compress", count: 0, color: "#8b5cf6" },
  { mode: "Coding", count: 0, color: "#06b6d4" },
  { mode: "Professional", count: 0, color: "#10b981" },
  { mode: "Humanize", count: 0, color: "#f59e0b" },
  { mode: "Email", count: 0, color: "#f43f5e" },
];

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#6366f1] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0d0d14] text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-60 bg-[#0d0d14] border-r border-[#2a2a3d] flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-[#2a2a3d]">
          <span className="text-[#818cf8] text-xl">◈</span>
          <span className="font-bold text-lg bg-gradient-to-r from-[#a5b4fc] to-[#818cf8] bg-clip-text text-transparent">
            TokZeth
          </span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1">
          {[
            { icon: "◈", label: "Overview", active: true },
            { icon: "◉", label: "History", active: false },
            { icon: "✦", label: "Settings", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-[#6366f1]/10 text-[#818cf8] border border-[#6366f1]/20"
                  : "text-[#64748b] hover:text-[#94a3b8] hover:bg-[#13131f]"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[#2a2a3d]">
          <div className="flex items-center gap-3 mb-3">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user.displayName}</p>
              <p className="text-xs text-[#64748b] truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full py-2 text-xs text-[#64748b] hover:text-[#f87171] border border-[#2a2a3d] hover:border-[#f87171]/30 rounded-lg transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-60 p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">
              Welcome back, {user.displayName?.split(" ")[0]}
            </h1>
            <p className="text-[#64748b] text-sm">
              Your TokZeth extension is active. Select text anywhere and press{" "}
              <kbd className="px-1.5 py-0.5 text-xs bg-[#13131f] border border-[#2a2a3d] rounded font-mono text-[#818cf8]">
                Alt+Shift+Z
              </kbd>
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Optimizations", value: "0", icon: "✦" },
              { label: "Tokens Used", value: "0", icon: "◈" },
              { label: "Most Used Mode", value: "—", icon: "◉" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#13131f] border border-[#2a2a3d] rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#64748b] text-sm">{stat.label}</span>
                  <span className="text-[#818cf8]">{stat.icon}</span>
                </div>
                <p className="text-3xl font-bold text-[#e2e8f0]">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Mode breakdown */}
          <div className="bg-[#13131f] border border-[#2a2a3d] rounded-xl p-6">
            <h2 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider mb-5">
              Optimization Modes
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {MODE_STATS.map((m) => (
                <div
                  key={m.mode}
                  className="flex items-center justify-between p-3 bg-[#0d0d14] rounded-lg border border-[#2a2a3d]"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: m.color }}
                    />
                    <span className="text-sm text-[#94a3b8]">{m.mode}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#64748b]">
                    {m.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Extension install prompt */}
          <div className="mt-6 p-6 bg-gradient-to-r from-[#6366f1]/10 to-[#8b5cf6]/10 border border-[#6366f1]/20 rounded-xl">
            <h3 className="font-semibold mb-2">Install the Extension</h3>
            <p className="text-sm text-[#94a3b8] mb-4">
              Load the extension in Chrome to start optimizing prompts
              anywhere.
            </p>
            <ol className="text-sm text-[#64748b] space-y-1 list-decimal list-inside">
              <li>Go to <code className="text-[#818cf8]">chrome://extensions</code></li>
              <li>Enable Developer Mode</li>
              <li>Click &quot;Load unpacked&quot; and select <code className="text-[#818cf8]">extension/build/chrome-mv3-dev</code></li>
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, FolderOpen, Wrench, Terminal,
  User, GraduationCap, GitBranch, Users,
  Calendar, Gamepad2, Trophy, FileText, Mail,
  Sun, Download,
} from "lucide-react";

const actions = [
  { id: "home", label: "home", icon: Home },
  { id: "projects", label: "projects", icon: FolderOpen },
  { id: "skills", label: "skills", icon: Wrench },
  { id: "terminal", label: "terminal", icon: Terminal },
  { id: "about", label: "about", icon: User },
  { id: "academic", label: "education", icon: GraduationCap },
  { id: "github", label: "github", icon: GitBranch },
  { id: "community", label: "community", icon: Users },
  { id: "timeline", label: "timeline", icon: Calendar },
  { id: "games", label: "arcade", icon: Gamepad2 },
  { id: "achievements", label: "achievements", icon: Trophy },
  { id: "blog", label: "blog", icon: FileText },
  { id: "contact", label: "contact", icon: Mail },
  { id: "toggle-theme", label: "toggle theme", icon: Sun },
  { id: "download-resume", label: "download resume", icon: Download },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onToggleTheme: () => void;
}

export default function CommandPalette({ isOpen, onClose, onNavigate, onToggleTheme }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  const execute = (id: string) => {
    if (id === "toggle-theme") {
      onToggleTheme();
    } else if (id === "download-resume") {
      alert("Resume download coming soon!");
    } else {
      onNavigate(id);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIdx]) {
      execute(filtered[selectedIdx].id);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0" style={{ background: "rgba(100,120,90,0.4)" }} onClick={onClose} />
          <motion.div
            className="relative w-full max-w-md overflow-hidden"
            style={{
              background: "var(--retro-card)",
              border: "3px solid var(--retro-border)",
              borderRadius: 14,
            }}
            initial={{ scale: 0.95, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -10 }}
          >
            <div style={{ padding: "12px 16px", borderBottom: "2px solid var(--retro-border)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 9, color: "var(--retro-yellow)" }}>{">"}</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "'VT323', monospace",
                  fontSize: 18,
                  color: "var(--retro-text-light)",
                }}
              />
              <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-muted)" }}>ESC</span>
            </div>

            <div style={{ maxHeight: 300, overflowY: "auto" }}>
              {filtered.map((action, i) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.id}
                    onClick={() => execute(action.id)}
                    style={{
                      padding: "10px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      cursor: "pointer",
                      background: i === selectedIdx ? "rgba(255,255,255,0.05)" : "transparent",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={() => setSelectedIdx(i)}
                  >
                    <Icon size={16} style={{ color: i === selectedIdx ? "var(--retro-yellow)" : "var(--retro-muted)" }} />
                    <span style={{ fontFamily: "'VT323', monospace", fontSize: 16, color: i === selectedIdx ? "var(--retro-yellow)" : "var(--retro-text-light)" }}>
                      {action.label}
                    </span>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div style={{ padding: "16px", textAlign: "center", fontFamily: "'VT323', monospace", fontSize: 16, color: "var(--retro-muted)" }}>
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

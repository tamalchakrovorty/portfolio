"use client";

import { useState, useRef, useEffect } from "react";
import { siteData } from "@/data/portfolio";

interface TerminalPanelProps {
  onNavigate?: (id: string) => void;
  onCommandRun?: () => void;
}

const quickCommands = ["help", "whoami", "skills", "projects", "contact", "clear"];

export default function TerminalPanel({ onNavigate, onCommandRun }: TerminalPanelProps) {
  const [history, setHistory] = useState<string[]>([siteData.terminal.welcome, ""]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const navigateCommands: Record<string, string> = {
    projects: "projects",
    skills: "skills",
    home: "home",
    about: "about",
    contact: "contact",
    academic: "academic",
    community: "community",
    timeline: "timeline",
    blog: "blog",
    github: "github",
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    onCommandRun?.();

    if (trimmed === "clear") {
      setHistory([""]);
      setInput("");
      return;
    }

    if (navigateCommands[trimmed]) {
      setHistory(prev => [...prev, `$ ${trimmed}`, `Opening ${trimmed}...`, ""]);
      setTimeout(() => onNavigate?.(navigateCommands[trimmed]), 300);
      setInput("");
      return;
    }

    const cmds = siteData.terminal.commands as Record<string, string>;
    const output = cmds[trimmed] || `command not found: ${trimmed}. type 'help'`;
    setHistory(prev => [...prev, `$ ${trimmed}`, output, ""]);
    setInput("");
  };

  return (
    <div className="panel" style={{ height: "100%" }}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#0d1117", border: "2px solid #30363d", borderRadius: 8, overflow: "hidden" }}>
        {/* Title bar */}
        <div style={{ background: "#161b22", padding: "8px 14px", borderBottom: "1px solid #30363d", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 7 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
          </div>
          <span style={{ fontSize: 13, color: "#8b949e", fontFamily: "'VT323', monospace", flex: 1, textAlign: "center" }}>tamal@portfolio: ~</span>
        </div>

        {/* Terminal body */}
        <div style={{ flex: 1, padding: "16px 18px", fontFamily: "'VT323', monospace", fontSize: 17, lineHeight: 1.7, overflowY: "auto", color: "#c9d1d9" }}>
          {history.map((line, i) => {
            if (line.startsWith("$")) {
              const parts = line.split(" ");
              return (
                <div key={i}>
                  <span style={{ color: "#7ee787" }}>tamal@portfolio</span>
                  <span style={{ color: "#c9d1d9" }}>:</span>
                  <span style={{ color: "#79c0ff" }}>~</span>
                  <span style={{ color: "#c9d1d9" }}>$ </span>
                  <span style={{ color: "#f0f6fc" }}>{parts.slice(1).join(" ")}</span>
                </div>
              );
            }
            return <div key={i} style={{ color: "#8b949e", marginBottom: 2 }}>{line}</div>;
          })}
          <div style={{ display: "flex", gap: 0, alignItems: "center", marginTop: 2 }}>
            <span style={{ color: "#7ee787" }}>tamal@portfolio</span>
            <span style={{ color: "#c9d1d9" }}>:</span>
            <span style={{ color: "#79c0ff" }}>~</span>
            <span style={{ color: "#c9d1d9" }}>$ </span>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && input.trim()) handleCommand(input); }}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#f0f6fc", fontFamily: "'VT323', monospace", fontSize: 17, caretColor: "#7ee787" }}
              placeholder=""
              autoFocus
            />
          </div>
          <div ref={endRef} />
        </div>

        {/* Quick commands */}
        <div style={{ display: "flex", gap: 6, padding: "8px 14px", borderTop: "1px solid #30363d", flexWrap: "wrap", background: "#161b22" }}>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              style={{
                background: "#0d1117",
                border: "1px solid #30363d",
                color: "#8b949e",
                fontFamily: "'VT323', monospace",
                fontSize: 13,
                padding: "4px 10px",
                cursor: "pointer",
                borderRadius: 4,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#7ee787"; e.currentTarget.style.color = "#7ee787"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#30363d"; e.currentTarget.style.color = "#8b949e"; }}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

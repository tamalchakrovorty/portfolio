"use client";

import { Search } from "lucide-react";

export default function TopBar({ panel, onToggle, dark, onCmdPalette }: { panel: string; onToggle: () => void; dark: boolean; onCmdPalette: () => void }) {
  return (
    <div className="topbar">
      <span className="breadcrumb-path">~/</span>
      <span className="breadcrumb-active">{panel}</span>
      <div className="topbar-right">
        <div className="topbar-search" onClick={onCmdPalette}>
          <Search size={14} style={{ color: "var(--retro-muted)" }} />
          <span>Search...</span>
          <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-muted)", border: "1px solid var(--retro-border)", padding: "2px 6px", borderRadius: 3 }}>⌘K</span>
        </div>
        <button className="topbar-btn" style={{ fontSize: 18 }} onClick={onToggle}>
          {dark ? "☀" : "☾"}
        </button>
        <button className="topbar-btn" style={{ fontSize: 16, borderColor: "var(--retro-yellow)", color: "var(--retro-yellow)" }}>↓ resume</button>
      </div>
    </div>
  );
}

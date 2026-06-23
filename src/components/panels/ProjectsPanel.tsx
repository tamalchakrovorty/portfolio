"use client";

import { useState } from "react";
import { Code2, ExternalLink, Eye } from "lucide-react";
import { siteData } from "@/data/portfolio";

interface ProjectsPanelProps {
  onNavigate?: (id: string) => void;
}

const categories = ["All", "Web", "Full Stack", "AI", "Linux", "Community"];

export default function ProjectsPanel({ onNavigate }: ProjectsPanelProps) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? siteData.projects : siteData.projects.filter(p => p.category === filter);

  return (
    <div className="panel">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>&gt; FEATURED PROJECTS</div>
        <button
          className="retro-btn"
          onClick={() => onNavigate?.("contact")}
          style={{ fontSize: 7, display: "flex", alignItems: "center", gap: 4 }}
        >
          VIEW ALL PROJECTS <ExternalLink size={10} />
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {categories.map(cat => (
          <button key={cat} className={`retro-btn ${filter === cat ? "primary" : ""}`} onClick={() => setFilter(cat)} style={{ fontSize: 7 }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background: "var(--retro-card-dark)", border: "2px solid var(--retro-border)", overflow: "hidden", cursor: "pointer", transition: "border-color 0.2s" }}
            onClick={() => onNavigate?.("contact")}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--retro-yellow)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--retro-border)"}
          >
            {/* Thumbnail */}
            <div style={{ height: 100, background: "var(--retro-inner)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
              {p.icon}
            </div>
            <div style={{ padding: 12 }}>
              <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 9, color: "var(--retro-text-light)", marginBottom: 8, lineHeight: 1.5 }}>
                {p.title}
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                {p.stack.split(" · ").map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, color: "var(--retro-muted)", fontSize: 14 }}>
                <button style={{ background: "none", border: "none", color: "var(--retro-muted)", cursor: "pointer" }}><Code2 size={14} /></button>
                <button style={{ background: "none", border: "none", color: "var(--retro-muted)", cursor: "pointer" }}><ExternalLink size={14} /></button>
                <button style={{ background: "none", border: "none", color: "var(--retro-muted)", cursor: "pointer" }}><Eye size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { Users } from "lucide-react";
import { siteData } from "@/data/portfolio";

export default function CommunityPanel() {
  return (
    <div className="panel">
      <div className="section-title">&gt; COMMUNITY</div>
      <div className="panel-card-dark" style={{ padding: 18, marginBottom: 16, textAlign: "center" }}>
        <Users size={32} style={{ color: "var(--retro-yellow)", marginBottom: 8 }} />
        <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 14, color: "var(--retro-yellow)", textShadow: "2px 2px 0 var(--retro-yellow-shadow)" }}>
          {siteData.community.name}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        {siteData.community.stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 18, color: "var(--retro-yellow)" }}>{s.value}</div>
            <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-muted)", marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 17, color: "var(--retro-text-light)", marginBottom: 16 }}>{siteData.community.desc}</p>
      <button className="retro-btn primary">Visit Community →</button>
    </div>
  );
}

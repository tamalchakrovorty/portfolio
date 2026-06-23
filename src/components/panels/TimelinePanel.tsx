"use client";

import { GraduationCap, Code2, Database, Bird, Rocket } from "lucide-react";
import { siteData } from "@/data/portfolio";

const icons = [GraduationCap, Code2, Database, Code2, Bird, Rocket];

export default function TimelinePanel() {
  return (
    <div className="panel">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>&gt; EDUCATION &amp; JOURNEY TIMELINE</div>
      </div>

      <div className="panel-card" style={{ overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 36px", padding: "18px 20px" }}>
          {siteData.timeline.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 0", borderBottom: i < siteData.timeline.length - 2 ? "1px solid var(--retro-border)" : "none" }}>
                <span style={{ fontSize: 18, width: 24, textAlign: "center", paddingTop: 2 }}><Icon size={18} style={{ color: "var(--retro-yellow)" }} /></span>
                <span style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: 10,
                  background: "#2a2e1c",
                  color: "var(--retro-yellow)",
                  border: "1px solid var(--retro-border)",
                  padding: "5px 8px",
                  whiteSpace: "nowrap",
                }}>
                  {item.year}
                </span>
                <div>
                  <b style={{ display: "block", fontSize: 14.5, color: "var(--retro-text-light)", marginBottom: 3 }}>{item.event}</b>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

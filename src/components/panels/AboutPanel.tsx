"use client";

import { siteData } from "@/data/portfolio";

export default function AboutPanel() {
  return (
    <div className="panel">
      <div className="section-title">&gt; ABOUT ME</div>
      <div className="panel-card" style={{ padding: 18, marginBottom: 20 }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: "var(--retro-text-light)" }}>
          {siteData.about.bio.split("North South University").map((part, i) =>
            i === 0 ? <span key={i}>{part}<span style={{ color: "var(--retro-yellow)" }}>North South University</span></span> : <span key={i}>{part}</span>
          )}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div className="panel-card" style={{ padding: 14 }}>
          <div style={{ color: "var(--retro-yellow)", fontFamily: "'Press Start 2P', cursive", fontSize: 9, marginBottom: 10 }}>ACADEMIC</div>
          {siteData.about.academic.map((item, i) => (
            <div key={i} style={{ fontSize: 14, color: "var(--retro-text-light)", lineHeight: 2 }}>{item}</div>
          ))}
        </div>
        <div className="panel-card" style={{ padding: 14 }}>
          <div style={{ color: "var(--retro-yellow)", fontFamily: "'Press Start 2P', cursive", fontSize: 9, marginBottom: 10 }}>TECHNICAL</div>
          {siteData.about.technical.map((item, i) => (
            <div key={i} style={{ fontSize: 14, color: "var(--retro-text-light)", lineHeight: 2 }}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

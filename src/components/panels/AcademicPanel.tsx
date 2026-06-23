"use client";

import { GraduationCap } from "lucide-react";
import { siteData } from "@/data/portfolio";

export default function AcademicPanel() {
  const { academic } = siteData;
  return (
    <div className="panel">
      <div className="section-title">&gt; ACADEMIC JOURNEY</div>
      <div className="panel-card" style={{ padding: 18, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <GraduationCap size={20} style={{ color: "var(--retro-yellow)" }} />
          <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 10, color: "var(--retro-text-light)" }}>{academic.university}</div>
        </div>
        <div style={{ fontSize: 17, color: "var(--retro-text-light)" }}>{academic.degree} — Expected {academic.expected}</div>
        <div style={{ fontSize: 15, color: "var(--retro-muted)", marginTop: 4 }}>Also studying: {academic.also.join(", ")}</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
        {academic.timeline.map((item, i) => (
          <div key={i} style={{ flex: "1 1 100px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: "var(--retro-inner)", border: "2px solid var(--retro-yellow)", zIndex: 1 }} />
              {i < academic.timeline.length - 1 && <div style={{ flex: 1, height: 2, background: "var(--retro-border)" }} />}
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-yellow)" }}>{item.year}</div>
              <div style={{ fontSize: 13, color: "var(--retro-text-light)", marginTop: 4 }}>{item.event}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { siteData } from "@/data/portfolio";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export default function GitHubPanel() {
  const { github } = siteData;

  return (
    <div className="panel">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>&gt; GITHUB ACTIVITY</div>
        <span style={{ fontSize: 12, color: "var(--retro-muted)" }}>Contributions this year: 1,463</span>
      </div>

      <div className="panel-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 16px" }}>
          {/* Month labels */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--retro-muted)", marginBottom: 6, paddingLeft: 24 }}>
            {months.map(m => <span key={m}>{m}</span>)}
          </div>

          {/* Grid */}
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: 11, color: "var(--retro-muted)", height: 62, paddingTop: 2 }}>
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(26, 1fr)", gridTemplateRows: "repeat(3, 1fr)", gap: 3, flex: 1 }}>
              {Array.from({ length: 78 }).map((_, i) => {
                const intensity = Math.random();
                let bg = "var(--retro-border)";
                if (intensity > 0.85) bg = "#6fae3e";
                else if (intensity > 0.65) bg = "#5a9a3a";
                else if (intensity > 0.45) bg = "#4a8a3a";
                else if (intensity > 0.25) bg = "#3a7a2a";
                return (
                  <div key={i} style={{ width: "100%", aspectRatio: "1", background: bg }} />
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--retro-muted)", marginTop: 10 }}>
            <span>Latest Commit: Update student management system</span>
            <span style={{ background: "var(--retro-green)", color: "var(--retro-text)", padding: "3px 8px", fontSize: 11 }}>2 hours ago</span>
          </div>
        </div>
      </div>

      <a
        href={github.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: 16, fontFamily: "'Press Start 2P', cursive", fontSize: 8, color: "var(--retro-yellow)", textDecoration: "none" }}
      >
        View full GitHub →
      </a>
    </div>
  );
}

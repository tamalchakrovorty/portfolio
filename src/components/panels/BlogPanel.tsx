"use client";

import { FileText } from "lucide-react";
import { siteData } from "@/data/portfolio";

export default function BlogPanel() {
  return (
    <div className="panel">
      <div className="section-title">&gt; BLOG</div>
      <div className="panel-card" style={{ overflow: "hidden" }}>
        {siteData.blog.map((post, i) => (
          <a
            key={i}
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 16px",
              borderBottom: i < siteData.blog.length - 1 ? "1px solid var(--retro-border)" : "none",
              color: "var(--retro-text-light)",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <FileText size={16} style={{ color: "var(--retro-muted)" }} />
              <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-muted)", width: 80, flexShrink: 0 }}>{post.date}</span>
              <span style={{ fontSize: 17 }}>{post.title}</span>
            </div>
            <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 8, color: "var(--retro-muted)" }}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

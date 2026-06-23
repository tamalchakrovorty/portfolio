"use client";

import { Laptop, GitBranch, Code2, Hourglass, Users, Monitor, Bird, Bot, Download, Mail, GraduationCap } from "lucide-react";
import { siteData } from "@/data/portfolio";

interface HomePanelProps {
  onNavigate?: (id: string) => void;
}

const stats = [
  { label: "PROJECTS BUILT", value: "15+", icon: Laptop },
  { label: "GITHUB REPOS", value: "40+", icon: GitBranch },
  { label: "TECHNOLOGIES", value: "20+", icon: Code2 },
  { label: "YEARS CODING", value: "4+", icon: Hourglass },
  { label: "COMMUNITY IMPACT", value: "2000+", icon: Users },
];

const roles = [
  { label: "Full Stack Developer", icon: Monitor, color: "var(--retro-blue)" },
  { label: "Linux Enthusiast", icon: Bird, color: "var(--retro-yellow)" },
  { label: "Community Builder", icon: Users, color: "var(--retro-green)" },
  { label: "AI-Assisted Creator", icon: Bot, color: "var(--retro-purple)" },
];

export default function HomePanel({ onNavigate }: HomePanelProps) {
  return (
    <div className="panel">
      {/* Profile Card */}
      <div className="panel-card" style={{ padding: 18, marginBottom: 20, display: "grid", gridTemplateColumns: "240px 1fr", gap: 20 }}>
        <div>
          {/* Avatar with moon scene */}
          <div style={{ border: "3px solid var(--retro-yellow)", background: "var(--retro-card-dark)", height: 240, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: -3, left: -3, width: 6, height: 6, background: "var(--retro-yellow)" }} />
            <div style={{ position: "absolute", top: -3, right: -3, width: 6, height: 6, background: "var(--retro-yellow)" }} />
            <div style={{ position: "absolute", bottom: -3, left: -3, width: 6, height: 6, background: "var(--retro-yellow)" }} />
            <div style={{ position: "absolute", bottom: -3, right: -3, width: 6, height: 6, background: "var(--retro-yellow)" }} />
            {/* Pixel art avatar */}
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              <rect width="100" height="100" fill="var(--retro-card-dark)"/>
              <rect x="20" y="55" width="60" height="45" fill="#1a2540"/>
              <rect x="30" y="20" width="40" height="38" fill="#4a3220"/>
              <rect x="34" y="14" width="32" height="14" fill="#1a1006"/>
              <rect x="30" y="20" width="6" height="16" fill="#1a1006"/>
              <rect x="64" y="20" width="6" height="16" fill="#1a1006"/>
              <rect x="32" y="34" width="36" height="22" fill="#c98a55"/>
              <rect x="36" y="40" width="10" height="6" fill="#fff"/>
              <rect x="54" y="40" width="10" height="6" fill="#fff"/>
              <rect x="34" y="42" width="32" height="2" fill="#222"/>
              <rect x="46" y="50" width="8" height="3" fill="#222"/>
              <rect x="38" y="58" width="24" height="4" fill="#000"/>
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, fontSize: 13, fontFamily: "'Press Start 2P', cursive", letterSpacing: 0.5 }}>
            <span style={{ color: "var(--retro-muted)" }}>STATUS:</span>
            <span style={{ color: "var(--retro-green)", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--retro-green)" }} />
              AVAILABLE
            </span>
          </div>
        </div>

        <div>
          <h1 style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 20, color: "var(--retro-yellow)", marginBottom: 8, letterSpacing: 1, textShadow: "2px 2px 0 var(--retro-yellow-shadow)" }}>
            TAMAL CHAKRAVORTY
          </h1>
          <div style={{ fontSize: 17, color: "var(--retro-muted)", marginBottom: 16 }}>
            {siteData.about.academic[1]} Student
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div key={role.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15 }}>
                  <Icon size={18} style={{ color: role.color }} />
                  <span>{role.label}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="retro-btn primary"
              onClick={() => onNavigate?.("projects")}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              VIEW RESUME <Download size={14} />
            </button>
            <button
              className="retro-btn"
              onClick={() => onNavigate?.("contact")}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <Mail size={14} /> CONTACT ME
            </button>
          </div>
        </div>
      </div>

      {/* System Overview - 5 stats */}
      <div className="panel-card" style={{ marginBottom: 20 }}>
        <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--retro-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 11, color: "var(--retro-text)", letterSpacing: 0.5 }}>
            &gt; SYSTEM OVERVIEW
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={{ padding: 16, borderRight: "1px solid var(--retro-border)", textAlign: "left" }}>
                <div style={{ fontSize: 12, color: "var(--retro-muted)", letterSpacing: 0.5, marginBottom: 10, textTransform: "uppercase" }}>
                  {stat.label}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 18, color: "var(--retro-yellow)" }}>
                    {stat.value}
                  </span>
                  <Icon size={20} style={{ color: "var(--retro-muted)" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills + Education Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* Skills Card */}
        <div className="panel-card" style={{ padding: 12 }}>
          <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 9, color: "var(--retro-yellow)", marginBottom: 10, textShadow: "2px 2px 0 var(--retro-yellow-shadow)" }}>
            &gt; TOP SKILLS
          </div>
          {[
            { group: "WEB", items: siteData.skills.WEB.slice(0, 3) },
            { group: "LINUX", items: siteData.skills.LINUX.slice(0, 2) },
            { group: "TOOLS", items: siteData.skills.TOOLS.slice(0, 2) },
          ].map(({ group, items }) => (
            <div key={group} style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-muted)", marginBottom: 4 }}>{group}</div>
              {items.map((s) => (
                <div key={s.name} style={{ marginBottom: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 1 }}>
                    <span style={{ color: "var(--retro-text)" }}>{s.name}</span>
                    <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-muted)" }}>{s.level}%</span>
                  </div>
                  <div style={{ height: 4, background: "var(--retro-border)", borderRadius: 2 }}>
                    <div style={{ height: "100%", background: "var(--retro-yellow)", borderRadius: 2, width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
          <button className="retro-btn" style={{ width: "100%", marginTop: 6, fontSize: 9 }} onClick={() => onNavigate?.("skills")}>VIEW ALL SKILLS →</button>
        </div>

        {/* Education Card */}
        <div className="panel-card" style={{ padding: 16 }}>
          <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 10, color: "var(--retro-yellow)", marginBottom: 14, textShadow: "2px 2px 0 var(--retro-yellow-shadow)" }}>
            &gt; EDUCATION
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <GraduationCap size={24} style={{ color: "var(--retro-yellow)" }} />
            <div>
              <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 9, color: "var(--retro-text)" }}>{siteData.academic.university}</div>
              <div style={{ fontSize: 15, color: "var(--retro-muted)", marginTop: 4 }}>{siteData.academic.degree}</div>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 8, color: "var(--retro-muted)", marginBottom: 8 }}>TIMELINE</div>
            <div style={{ display: "flex", gap: 0 }}>
              {siteData.academic.timeline.map((item, i) => (
                <div key={i} style={{ flex: 1, position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--retro-inner)", border: "2px solid var(--retro-yellow)", zIndex: 1 }} />
                    {i < siteData.academic.timeline.length - 1 && <div style={{ flex: 1, height: 2, background: "var(--retro-border)" }} />}
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-yellow)" }}>{item.year}</div>
                    <div style={{ fontSize: 12, color: "var(--retro-muted)", marginTop: 2 }}>{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 8, color: "var(--retro-muted)", marginBottom: 6 }}>ALSO STUDYING</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {siteData.academic.also.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="panel-card-dark" style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 16, color: "var(--retro-text-light)", fontStyle: "italic" }}>
            {siteData.home.quote}
          </div>
        </div>
      </div>
    </div>
  );
}

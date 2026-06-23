"use client";

import { Medal, Shield, Bug, Rocket, Sword, Trophy, Keyboard, Moon, Compass, Terminal, Users, Gamepad2 } from "lucide-react";
import { loadAchievements } from "@/lib/achievements";

const iconMap: Record<string, React.FC<{ size?: number; style?: React.CSSProperties }>> = {
  "linux-explorer": Medal,
  "builder": Shield,
  "community": Users,
  "terminal-master": Terminal,
  "student-dev": Trophy,
  "game-player": Gamepad2,
  "badge-collector": Medal,
  "keyboard-warrior": Keyboard,
  "night-owl": Moon,
  "explorer": Compass,
};

const colorMap: Record<string, string> = {
  "linux-explorer": "#79c0ff",
  "builder": "#e8c87a",
  "community": "#7ee787",
  "terminal-master": "#ff5f57",
  "student-dev": "#d2a8ff",
  "game-player": "#7ee787",
  "badge-collector": "#e8c87a",
  "keyboard-warrior": "#79c0ff",
  "night-owl": "#d2a8ff",
  "explorer": "#ff5f57",
};

export default function AchievementsPanel() {
  const achievements = loadAchievements();

  return (
    <div className="panel">
      <div className="section-title">&gt; ACHIEVEMENTS</div>
      <div className="panel-card" style={{ overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: "var(--retro-border)" }}>
          {achievements.map((badge) => {
            const Icon = iconMap[badge.id] || Medal;
            const color = colorMap[badge.id] || "#e8c87a";
            return (
              <div
                key={badge.id}
                style={{
                  background: "var(--retro-card-dark)",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  opacity: badge.unlocked ? 1 : 0.4,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                title={badge.unlocked ? `${badge.name} — ${badge.condition}` : `Locked — ${badge.condition}`}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 6,
                    background: `${color}20`,
                    border: `2px solid ${color}`,
                  }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <span style={{ fontSize: 12, textAlign: "center", color: "var(--retro-text-light)", lineHeight: 1.3 }}>
                  {badge.name.split(" ").map((w, i) => (
                    <span key={i}>{w}<br /></span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

const STATS = ["GPA", "Coding", "Sleep", "Coffee", "Running"] as const;
type Stat = typeof STATS[number];

interface Turn {
  situation: string;
  choices: { text: string; effects: Partial<Record<Stat, number>> }[];
}

const turns: Turn[] = [
  {
    situation: "Monday morning. You have 3 assignments due this week.",
    choices: [
      { text: "Code all night", effects: { Coding: 20, Sleep: -30, GPA: 10 } },
      { text: "Sleep early, wake up fresh", effects: { Sleep: 20, GPA: 5, Coding: -5 } },
      { text: "Coffee marathon", effects: { Coffee: 20, Coding: 10, Sleep: -15 } },
    ],
  },
  {
    situation: "A hackathon is happening this weekend.",
    choices: [
      { text: "Join the hackathon", effects: { Coding: 25, Sleep: -20, Running: -10 } },
      { text: "Go for a run instead", effects: { Running: 25, Sleep: 10, Coding: -5 } },
      { text: "Study for exams", effects: { GPA: 20, Coding: -10, Sleep: -5 } },
    ],
  },
  {
    situation: "Your friend invites you to a Linux install party.",
    choices: [
      { text: "Install Arch Linux", effects: { Coding: 15, Sleep: -15, Coffee: 10 } },
      { text: "Stay home and rest", effects: { Sleep: 20, Coding: -5 } },
      { text: "Bring coffee and join", effects: { Coffee: 15, Coding: 10, Sleep: -10 } },
    ],
  },
  {
    situation: "Project deadline is tomorrow.",
    choices: [
      { text: "Pull an all-nighter", effects: { Coding: 30, Sleep: -40, Coffee: 15 } },
      { text: "Submit what you have", effects: { GPA: -5, Sleep: 10, Coding: 5 } },
      { text: "Ask for extension", effects: { GPA: 5, Sleep: 15, Coding: -5 } },
    ],
  },
  {
    situation: "Community run event on Sunday morning.",
    choices: [
      { text: "Wake up early and run", effects: { Running: 25, Sleep: -15, GPA: 5 } },
      { text: "Skip it, code instead", effects: { Coding: 20, Running: -10 } },
      { text: "Run then code all day", effects: { Running: 15, Coding: 15, Sleep: -20, Coffee: 10 } },
    ],
  },
  {
    situation: "Final semester. Graduation is near.",
    choices: [
      { text: "Focus on GPA", effects: { GPA: 25, Coding: -10, Sleep: -10 } },
      { text: "Build portfolio projects", effects: { Coding: 25, GPA: -5, Sleep: -10 } },
      { text: "Balance everything", effects: { GPA: 10, Coding: 10, Sleep: 5, Running: 5, Coffee: 5 } },
    ],
  },
];

const initialStats: Record<Stat, number> = { GPA: 50, Coding: 50, Sleep: 50, Coffee: 50, Running: 50 };

export default function StudentSimGame({ onExit }: { onExit: () => void }) {
  const [stats, setStats] = useState<Record<Stat, number>>(initialStats);
  const [turn, setTurn] = useState(0);
  const [finished, setFinished] = useState(false);

  const applyChoice = (effects: Partial<Record<Stat, number>>) => {
    const newStats = { ...stats };
    for (const [key, val] of Object.entries(effects)) {
      newStats[key as Stat] = Math.max(0, Math.min(100, newStats[key as Stat] + (val || 0)));
    }
    setStats(newStats);
    if (turn < turns.length - 1) {
      setTurn((t) => t + 1);
    } else {
      setFinished(true);
    }
  };

  const getGrade = () => {
    const avg = Object.values(stats).reduce((a, b) => a + b, 0) / 5;
    if (avg >= 80) return "S";
    if (avg >= 65) return "A";
    if (avg >= 50) return "B";
    if (avg >= 35) return "C";
    return "F";
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--retro-bg)" }}>
      <div style={{ marginBottom: 12, display: "flex", gap: 24, alignItems: "center" }}>
        <span className="retro-label">STUDENT SIM</span>
        <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 10, color: "var(--retro-text)" }}>Turn {turn + 1}/{turns.length}</span>
        <button onClick={onExit} className="retro-btn" style={{ fontSize: 7 }}>ESC EXIT</button>
      </div>

      <div style={{ display: "flex", gap: 24, width: 500 }}>
        {/* Stats */}
        <div style={{ width: 140, background: "var(--retro-card)", border: "2px solid var(--retro-border)", borderRadius: 8, padding: 12 }}>
          <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-yellow)", marginBottom: 10 }}>STATS</div>
          {STATS.map((s) => (
            <div key={s} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'VT323', monospace", fontSize: 14, color: "var(--retro-muted)", marginBottom: 2 }}>
                <span>{s}</span>
                <span>{stats[s]}</span>
              </div>
              <div style={{ width: "100%", height: 6, background: "var(--retro-inner)", borderRadius: 3, border: "1px solid var(--retro-border)" }}>
                <div style={{ height: "100%", background: stats[s] > 60 ? "#8bc34a" : stats[s] > 30 ? "var(--retro-yellow)" : "#ff5f56", borderRadius: 2, width: `${stats[s]}%`, transition: "width 0.3s" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Story */}
        <div style={{ flex: 1, background: "var(--retro-card)", border: "2px solid var(--retro-border)", borderRadius: 8, padding: 16 }}>
          {!finished ? (
            <>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: 18, color: "var(--retro-text)", marginBottom: 16, lineHeight: 1.6 }}>
                {turns[turn].situation}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {turns[turn].choices.map((choice, i) => (
                  <button key={i} className="retro-btn" onClick={() => applyChoice(choice.effects)} style={{ textAlign: "left", padding: "10px 14px" }}>
                    {choice.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div className="retro-label" style={{ fontSize: 12, marginBottom: 12 }}>SEMESTER COMPLETE</div>
              <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 28, color: "var(--retro-yellow)", marginBottom: 12 }}>{getGrade()}</div>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: 16, color: "var(--retro-muted)", marginBottom: 16 }}>
                {getGrade() === "S" ? "Perfect balance! You're a legend." :
                 getGrade() === "A" ? "Great job managing everything!" :
                 getGrade() === "B" ? "Not bad, but room for improvement." :
                 getGrade() === "C" ? "Struggling a bit. Try again?" :
                 "Game over. Time to rebalance!"}
              </div>
              <button className="retro-btn primary" onClick={() => { setStats(initialStats); setTurn(0); setFinished(false); }}>PLAY AGAIN</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

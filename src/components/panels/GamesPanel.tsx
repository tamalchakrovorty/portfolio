"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Dices, Terminal, GraduationCap } from "lucide-react";
import { siteData } from "@/data/portfolio";
import SnakeGame from "../games/SnakeGame";
import RunnerGame from "../games/RunnerGame";
import TerminalQuestGame from "../games/TerminalQuestGame";
import StudentSimGame from "../games/StudentSimGame";

const games = [
  { id: "snake", component: SnakeGame, icon: Gamepad2 },
  { id: "runner", component: RunnerGame, icon: Dices },
  { id: "terminal-quest", component: TerminalQuestGame, icon: Terminal },
  { id: "student-sim", component: StudentSimGame, icon: GraduationCap },
];

export default function GamesPanel({ onGamePlayed }: { onGamePlayed?: () => void }) {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    setActiveGame(id);
    onGamePlayed?.();
  };

  const ActiveGame = activeGame ? games.find((g) => g.id === activeGame)?.component : null;

  return (
    <>
      <div className="panel">
        <div className="section-title">&gt; ARCADE</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {siteData.games.map((game, i) => {
            const GameIcon = games[i].icon;
            return (
              <button
                key={i}
                className="panel-card-dark"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 24, cursor: "pointer", border: "2px solid var(--retro-border)", transition: "border-color 0.2s" }}
                onClick={() => handlePlay(games[i].id)}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--retro-yellow)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--retro-border)"}
              >
                <GameIcon size={32} style={{ color: "var(--retro-yellow)" }} />
                <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 8, color: "var(--retro-text-light)" }}>{game.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeGame && ActiveGame && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "var(--retro-bg)" }}
          >
            <ActiveGame onExit={() => setActiveGame(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

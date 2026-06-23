"use client";

import { useState, useEffect, useCallback } from "react";

const GROUND_Y = 120;
const GRAVITY = 0.6;
const JUMP_FORCE = -10;
const GAME_SPEED = 50;

interface Obstacle { x: number; type: "bug" | "deadline" | "crash"; }
interface Collectible { x: number; type: "coffee" | "linux" | "react" | "ai"; }

export default function RunnerGame({ onExit }: { onExit: () => void }) {
  const [playerY, setPlayerY] = useState(GROUND_Y);
  const [velocity, setVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  const jump = useCallback(() => {
    if (!isJumping && isRunning) {
      setVelocity(JUMP_FORCE);
      setIsJumping(true);
    }
  }, [isJumping, isRunning]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onExit(); return; }
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [jump, onExit]);

  useEffect(() => {
    if (!isRunning || gameOver) return;
    const interval = setInterval(() => {
      setPlayerY((y) => {
        const newY = y + velocity;
        if (newY >= GROUND_Y) {
          setIsJumping(false);
          setVelocity(0);
          return GROUND_Y;
        }
        return newY;
      });
      setVelocity((v) => v + GRAVITY);

      setObstacles((prev) => {
        const newObs = prev.map((o) => ({ ...o, x: o.x - 4 })).filter((o) => o.x > -30);
        if (Math.random() < 0.03) {
          const types: Obstacle["type"][] = ["bug", "deadline", "crash"];
          newObs.push({ x: 500, type: types[Math.floor(Math.random() * types.length)] });
        }
        return newObs;
      });

      setCollectibles((prev) => {
        const newCol = prev.map((c) => ({ ...c, x: c.x - 4 })).filter((c) => c.x > -30);
        if (Math.random() < 0.02) {
          const types: Collectible["type"][] = ["coffee", "linux", "react", "ai"];
          newCol.push({ x: 500, type: types[Math.floor(Math.random() * types.length)] });
        }
        return newCol;
      });

      setScore((s) => s + 1);
    }, GAME_SPEED);
    return () => clearInterval(interval);
  }, [isRunning, gameOver, velocity]);

  useEffect(() => {
    if (gameOver || !isRunning) return;
    const playerLeft = 60;
    const playerRight = 90;
    const playerTop = playerY - 30;
    const playerBottom = playerY;

    for (const obs of obstacles) {
      if (obs.x < playerRight && obs.x + 25 > playerLeft && GROUND_Y - 25 < playerBottom && GROUND_Y > playerTop) {
        setGameOver(true);
        setIsRunning(false);
        return;
      }
    }

    for (const col of collectibles) {
      if (col.x < playerRight && col.x + 20 > playerLeft && GROUND_Y - 20 < playerBottom && GROUND_Y > playerTop) {
        setScore((s) => s + 50);
        setCollectibles((prev) => prev.filter((c) => c !== col));
      }
    }
  }, [playerY, obstacles, collectibles, gameOver, isRunning]);

  const icons: Record<string, string> = { bug: "🐛", deadline: "⏰", crash: "💥", coffee: "☕", linux: "🐧", react: "⚛️", ai: "🤖" };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--retro-bg)" }}>
      <div style={{ marginBottom: 12, display: "flex", gap: 24, alignItems: "center" }}>
        <span className="retro-label">PIXEL RUNNER</span>
        <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 10, color: "var(--retro-text)" }}>Score: {score}</span>
        <button onClick={onExit} className="retro-btn" style={{ fontSize: 7 }}>ESC EXIT</button>
      </div>

      <div style={{
        width: 500,
        height: 200,
        background: "var(--retro-card)",
        border: "3px solid var(--retro-border)",
        borderRadius: 8,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Ground */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 30, background: "var(--retro-inner)", borderTop: "2px solid var(--retro-border)" }} />

        {/* Player */}
        <div style={{
          position: "absolute",
          left: 60,
          top: playerY - 30,
          width: 25,
          height: 30,
          background: "var(--retro-yellow)",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 8,
          color: "var(--retro-bg)",
        }}>
          TC
        </div>

        {/* Obstacles */}
        {obstacles.map((obs, i) => (
          <div key={i} style={{ position: "absolute", left: obs.x, bottom: 30, fontSize: 18 }}>
            {icons[obs.type]}
          </div>
        ))}

        {/* Collectibles */}
        {collectibles.map((col, i) => (
          <div key={i} style={{ position: "absolute", left: col.x, bottom: 50, fontSize: 14 }}>
            {icons[col.type]}
          </div>
        ))}
      </div>

      {gameOver && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <div className="retro-label" style={{ fontSize: 12, marginBottom: 8 }}>GAME OVER</div>
          <button className="retro-btn primary" onClick={() => { setPlayerY(GROUND_Y); setScore(0); setGameOver(false); setIsRunning(true); setObstacles([]); setCollectibles([]); }}>RESTART</button>
        </div>
      )}

      <div style={{ marginTop: 8, fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-muted)" }}>
        Space / Arrow Up to jump
      </div>
    </div>
  );
}

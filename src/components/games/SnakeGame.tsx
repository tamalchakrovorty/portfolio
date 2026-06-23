"use client";

import { useState, useEffect, useCallback } from "react";

const GRID = 15;
const CELL = 18;
const TECH_ITEMS = ["⚛️", "🟢", "🐧", "🐳", "📦"];

interface Pos { x: number; y: number; }

export default function SnakeGame({ onExit }: { onExit: () => void }) {
  const [snake, setSnake] = useState<Pos[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Pos>({ x: 10, y: 10 });
  const [dir, setDir] = useState<Pos>({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const spawnFood = useCallback(() => {
    setFood({
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onExit(); return; }
      if (gameOver) return;
      switch (e.key) {
        case "ArrowUp": case "w": setDir({ x: 0, y: -1 }); break;
        case "ArrowDown": case "s": setDir({ x: 0, y: 1 }); break;
        case "ArrowLeft": case "a": setDir({ x: -1, y: 0 }); break;
        case "ArrowRight": case "d": setDir({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameOver, onExit]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = { x: head.x + dir.x, y: head.y + dir.y };

        if (newHead.x < 0 || newHead.x >= GRID || newHead.y < 0 || newHead.y >= GRID) {
          setGameOver(true);
          return prev;
        }
        if (prev.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          spawnFood();
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [dir, food, gameOver, spawnFood]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--retro-bg)" }}>
      <div style={{ marginBottom: 12, display: "flex", gap: 24, alignItems: "center" }}>
        <span className="retro-label">SKILL SNAKE</span>
        <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 10, color: "var(--retro-text)" }}>Score: {score}</span>
        <button onClick={onExit} className="retro-btn" style={{ fontSize: 7 }}>ESC EXIT</button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID}, ${CELL}px)`,
        gap: 1,
        background: "var(--retro-inner)",
        border: "3px solid var(--retro-border)",
        borderRadius: 6,
        padding: 2,
      }}>
        {Array.from({ length: GRID * GRID }).map((_, i) => {
          const x = i % GRID;
          const y = Math.floor(i / GRID);
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div key={i} style={{
              width: CELL,
              height: CELL,
              background: isSnake ? "var(--retro-yellow)" : isFood ? "#8bc34a" : "var(--retro-card)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isFood ? 10 : 0,
            }}>
              {isFood ? TECH_ITEMS[Math.floor(Math.random() * TECH_ITEMS.length)] : ""}
            </div>
          );
        })}
      </div>

      {gameOver && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <div className="retro-label" style={{ fontSize: 12, marginBottom: 8 }}>GAME OVER</div>
          <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 9, color: "var(--retro-muted)", marginBottom: 12 }}>Score: {score}</div>
          <button className="retro-btn primary" onClick={() => { setSnake([{ x: 7, y: 7 }]); setScore(0); setGameOver(false); setDir({ x: 1, y: 0 }); }}>RESTART</button>
        </div>
      )}

      <div style={{ marginTop: 8, fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-muted)" }}>
        Arrow keys or WASD to move
      </div>
    </div>
  );
}

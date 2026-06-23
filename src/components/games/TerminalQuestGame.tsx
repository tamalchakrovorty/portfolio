"use client";

import { useState, useRef, useEffect } from "react";

const puzzles = [
  { question: "What command lists files in Linux?", answer: "ls", hint: "Two letters" },
  { question: "What command changes directory?", answer: "cd", hint: "Two letters" },
  { question: "What is the Linux kernel written in?", answer: "c", hint: "One letter" },
  { question: "What does 'sudo' stand for?", answer: "superuser do", hint: "Two words" },
  { question: "What is the package manager for Arch?", answer: "pacman", hint: "Like the game" },
];

export default function TerminalQuestGame({ onExit }: { onExit: () => void }) {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "=== TERMINAL QUEST ===",
    "Solve Linux puzzles to progress!",
    "",
  ]);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const handleSubmit = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setInput("");

    if (trimmed === "help") {
      setHistory((p) => [...p, `> ${trimmed}`, "Commands: answer <your answer>, hint, skip, exit", ""]);
      return;
    }
    if (trimmed === "hint") {
      setShowHint(true);
      setHistory((p) => [...p, `> ${trimmed}`, `Hint: ${puzzles[currentPuzzle].hint}`, ""]);
      return;
    }
    if (trimmed === "skip") {
      setHistory((p) => [...p, `> ${trimmed}`, `Answer was: ${puzzles[currentPuzzle].answer}`, ""]);
      if (currentPuzzle < puzzles.length - 1) {
        setCurrentPuzzle((c) => c + 1);
        setShowHint(false);
      } else {
        setHistory((p) => [...p, "All puzzles completed!", `Final Score: ${score}`, "Type 'exit' to return."]);
      }
      return;
    }
    if (trimmed === "exit") {
      onExit();
      return;
    }

    const answer = trimmed.replace(/^answer\s+/, "");
    if (answer === puzzles[currentPuzzle].answer) {
      const points = showHint ? 5 : 10;
      setScore((s) => s + points);
      setHistory((p) => [...p, `> ${cmd}`, `✓ Correct! +${points} points`, ""]);
      if (currentPuzzle < puzzles.length - 1) {
        setCurrentPuzzle((c) => c + 1);
        setShowHint(false);
      } else {
        setHistory((p) => [...p, "🎉 All puzzles completed!", `Final Score: ${score + points}`, "Type 'exit' to return."]);
      }
    } else {
      setHistory((p) => [...p, `> ${cmd}`, "✗ Wrong! Type 'hint' for a clue.", ""]);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--retro-bg)" }}>
      <div style={{ marginBottom: 12, display: "flex", gap: 24, alignItems: "center" }}>
        <span className="retro-label">TERMINAL QUEST</span>
        <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 10, color: "var(--retro-text)" }}>Score: {score} | Puzzle: {currentPuzzle + 1}/{puzzles.length}</span>
        <button onClick={onExit} className="retro-btn" style={{ fontSize: 7 }}>ESC EXIT</button>
      </div>

      <div style={{
        width: 500,
        background: "var(--retro-inner)",
        border: "3px solid var(--retro-border)",
        borderRadius: 8,
        overflow: "hidden",
      }}>
        <div style={{ background: "var(--retro-card)", padding: "6px 12px", borderBottom: "2px solid var(--retro-border)", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27c93f" }} />
          <span style={{ marginLeft: 4, fontFamily: "'VT323', monospace", fontSize: 14, color: "var(--retro-muted)" }}>terminal-quest:~</span>
        </div>

        <div style={{ padding: 14, fontFamily: "'VT323', monospace", fontSize: 16, lineHeight: 2, maxHeight: 300, overflowY: "auto" }}>
          {currentPuzzle < puzzles.length && (
            <div style={{ color: "var(--retro-yellow)", marginBottom: 8 }}>
              Puzzle {currentPuzzle + 1}: {puzzles[currentPuzzle].question}
            </div>
          )}
          {history.map((line, i) => (
            <div key={i} style={{ color: line.startsWith(">") ? "var(--retro-yellow)" : line.startsWith("✓") ? "#8bc34a" : line.startsWith("✗") ? "#ff5f56" : "var(--retro-muted)", whiteSpace: "pre-wrap" }}>
              {line}
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, alignItems: "center", borderTop: "1px solid #1e1e1e", paddingTop: 8, marginTop: 4 }}>
            <span style={{ color: "var(--retro-yellow)" }}>$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) handleSubmit(input); }}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--retro-text)", fontFamily: "'VT323', monospace", fontSize: 16, caretColor: "var(--retro-yellow)" }}
              placeholder="type answer..."
              autoFocus
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}

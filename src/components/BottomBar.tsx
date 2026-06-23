"use client";

import { useState, useEffect } from "react";

export default function BottomBar({ soundOn, onToggleSound }: { soundOn: boolean; onToggleSound: () => void }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="bottombar">
      <span>tamal-os v2.0</span>
      <span>next.js · react · ts</span>
      <button
        onClick={onToggleSound}
        style={{
          background: "transparent",
          border: "none",
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 7,
          color: soundOn ? "var(--retro-yellow)" : "var(--retro-muted)",
          cursor: "pointer",
          padding: 0,
        }}
        title={soundOn ? "Sound ON" : "Sound OFF"}
      >
        {soundOn ? "🔊 sound" : "🔇 sound"}
      </button>
      <span>{time}</span>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "Loading projects", delay: 0 },
  { text: "Loading academic modules", delay: 400 },
  { text: "Loading Linux kernel", delay: 800 },
];

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<{ text: string; done: boolean }[]>([]);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);

  const finish = useCallback(() => {
    if (done) return;
    setDone(true);
    localStorage.setItem("boot-seen", "1");
    setTimeout(onComplete, 300);
  }, [done, onComplete]);

  useEffect(() => {
    if (localStorage.getItem("boot-seen")) { onComplete(); return; }
    const t: NodeJS.Timeout[] = [];
    bootLines.forEach((line, i) => {
      t.push(setTimeout(() => setLines(p => [...p, { text: line.text, done: false }]), line.delay));
      t.push(setTimeout(() => setLines(p => p.map((l, idx) => idx === i ? { ...l, done: true } : l)), line.delay + 300));
    });
    t.push(setTimeout(() => setReady(true), 1400));
    return () => t.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    const h = () => finish();
    window.addEventListener("keydown", h);
    window.addEventListener("click", h);
    return () => { window.removeEventListener("keydown", h); window.removeEventListener("click", h); };
  }, [finish]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-8" style={{ background: "var(--retro-bg)" }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <div className="w-full max-w-lg" style={{ fontFamily: "'VT323', monospace" }}>
            <div className="retro-label mb-6" style={{ fontSize: 14 }}>
              INITIALIZING TAMAL OS v2.0<span style={{ animation: "blink 1s infinite" }}>_</span>
            </div>
            <div className="space-y-2 mb-8" style={{ fontSize: 20 }}>
              {lines.map((line, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span style={{ color: "var(--retro-text-light)" }}>{line.text}</span>
                  <span style={{ color: "var(--retro-muted)" }}>........</span>
                  <span style={{ color: line.done ? "var(--retro-green)" : "var(--retro-muted)" }}>{line.done ? "[OK]" : "[..]"}</span>
                </div>
              ))}
            </div>
            {ready && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 10, color: "var(--retro-muted)" }}>
                [ PRESS ANY KEY ]
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

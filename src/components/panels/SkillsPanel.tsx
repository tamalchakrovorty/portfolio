"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/portfolio";

function SkillPanel({ skill, onClose }: { skill: { name: string; level: number }; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0" style={{ background: "rgba(100,120,90,0.3)" }} onClick={onClose} />
      <motion.div
        className="relative w-full max-w-sm h-full overflow-y-auto"
        style={{ background: "var(--retro-card)", borderLeft: "3px solid var(--retro-border)", padding: 24 }}
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 retro-btn" style={{ fontSize: 8 }}>ESC</button>
        <div className="retro-label mb-6">{skill.name}</div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-muted)", marginBottom: 8 }}>LEVEL</div>
          <div style={{ width: "100%", height: 8, background: "var(--retro-border)", borderRadius: 4, border: "2px solid var(--retro-border)" }}>
            <div style={{ height: "100%", background: "var(--retro-yellow)", borderRadius: 2, width: `${skill.level}%` }} />
          </div>
          <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 8, color: "var(--retro-muted)", marginTop: 4 }}>{skill.level}%</div>
        </div>
        <div>
          <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-muted)", marginBottom: 8 }}>NOTES</div>
          <p style={{ fontSize: 16, color: "var(--retro-text-light)", lineHeight: 1.6 }}>Used extensively in personal and academic projects. Continuous learning through real-world applications.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SkillsPanel() {
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; level: number } | null>(null);

  return (
    <>
      <div className="panel">
        <div className="section-title">&gt; SKILL TREE</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {Object.entries(siteData.skills).map(([group, skills]) => (
            <div key={group} className="panel-card" style={{ padding: 14 }}>
              <div style={{ color: "var(--retro-yellow)", fontFamily: "'Press Start 2P', cursive", fontSize: 9, marginBottom: 12, letterSpacing: 0.5 }}>{group}</div>
              {skills.map((s) => (
                <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }} onClick={() => setSelectedSkill(s)}>
                  <div style={{ fontSize: 14, color: "var(--retro-text-light)", width: 80, flexShrink: 0 }}>{s.name}</div>
                  <div style={{ flex: 1, height: 4, background: "var(--retro-border)", borderRadius: 2 }}>
                    <div style={{ height: "100%", background: "var(--retro-yellow)", borderRadius: 2, width: `${s.level}%`, opacity: 0.8 }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedSkill && <SkillPanel skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
      </AnimatePresence>
    </>
  );
}

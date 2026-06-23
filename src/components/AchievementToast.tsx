"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AchievementToastProps {
  show: boolean;
  name: string;
  icon: string;
  onClose: () => void;
}

export default function AchievementToast({ show, name, icon, onClose }: AchievementToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-10 right-6 z-50"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          onAnimationComplete={() => setTimeout(onClose, 3000)}
          style={{
            background: "var(--retro-card-dark)",
            border: "3px solid var(--retro-yellow)",
            borderRadius: 10,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 4px 20px rgba(50,60,40,0.3)",
          }}
        >
          <span style={{ fontSize: 20 }}>{icon}</span>
          <div>
            <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 7, color: "var(--retro-yellow)", marginBottom: 2 }}>
              ACHIEVEMENT UNLOCKED
            </div>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: 16, color: "var(--retro-text-light)" }}>
              {name}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

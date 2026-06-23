"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import CommandPalette from "./CommandPalette";
import AchievementToast from "./AchievementToast";
import HomePanel from "./panels/HomePanel";
import ProjectsPanel from "./panels/ProjectsPanel";
import SkillsPanel from "./panels/SkillsPanel";
import TerminalPanel from "./panels/TerminalPanel";
import AboutPanel from "./panels/AboutPanel";
import AcademicPanel from "./panels/AcademicPanel";
import CommunityPanel from "./panels/CommunityPanel";
import TimelinePanel from "./panels/TimelinePanel";
import GamesPanel from "./panels/GamesPanel";
import AchievementsPanel from "./panels/AchievementsPanel";
import BlogPanel from "./panels/BlogPanel";
import ContactPanel from "./panels/ContactPanel";
import GitHubPanel from "./panels/GitHubPanel";
import { loadAchievements, saveAchievement, Achievement } from "@/lib/achievements";
import { getNextPanel, getPrevPanel, getPanelByIndex } from "@/lib/keyboard";
import { initSound, playIfEnabled, playNav, playPanelSwitch, playAchievement, toggleSound, isSoundEnabled } from "@/lib/sounds";

const panels: Record<string, React.FC<{ onNavigate?: (id: string) => void; onGamePlayed?: () => void; onCommandRun?: () => void }>> = {
  home: HomePanel,
  projects: ProjectsPanel,
  skills: SkillsPanel,
  terminal: TerminalPanel,
  about: AboutPanel,
  academic: AcademicPanel,
  github: GitHubPanel,
  community: CommunityPanel,
  timeline: TimelinePanel,
  games: GamesPanel,
  achievements: AchievementsPanel,
  blog: BlogPanel,
  contact: ContactPanel,
};

const visitedPanels = new Set<string>();
let terminalCommandCount = 0;

export default function OSApp() {
  const [activePanel, setActivePanel] = useState("home");
  const [dark, setDark] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [toast, setToast] = useState<{ show: boolean; name: string; icon: string }>({ show: false, name: "", icon: "" });
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    initSound();
    setSoundOn(isSoundEnabled());
    setAchievements(loadAchievements());

    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setDark(false);
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }

    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) {
      unlock("night-owl");
    }
  }, []);

  const unlock = useCallback((id: string) => {
    setAchievements((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, unlocked: true } : a));
      if (saveAchievement(id)) {
        const badge = updated.find((a) => a.id === id);
        if (badge) {
          setToast({ show: true, name: badge.name, icon: badge.icon });
          playIfEnabled(playAchievement);
        }
        const count = updated.filter((a) => a.unlocked).length;
        if (count >= 3) saveAchievement("badge-collector");
      }
      return updated;
    });
  }, []);

  const navigate = useCallback((id: string) => {
    playIfEnabled(playNav);
    setActivePanel(id);
    visitedPanels.add(id);

    if (id === "terminal") unlock("linux-explorer");
    if (id === "community") unlock("community");
    if (id === "academic") unlock("student-dev");
    if (id === "games") unlock("game-player");
    if (id === "projects") unlock("builder");

    const allPanels = ["home", "projects", "skills", "terminal", "about", "academic", "github", "community", "timeline", "games", "achievements", "blog", "contact"];
    if (visitedPanels.size >= allPanels.length) unlock("explorer");
  }, [unlock]);

  const toggleTheme = useCallback(() => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggleSoundEffect = useCallback(() => {
    const next = toggleSound();
    setSoundOn(next);
  }, []);

  const handleGamePlayed = useCallback(() => {
    unlock("game-player");
  }, [unlock]);

  const handleCommandRun = useCallback(() => {
    terminalCommandCount++;
    if (terminalCommandCount >= 5) unlock("terminal-master");
  }, [unlock]);

  const handleProjectsView = useCallback(() => {
    unlock("builder");
  }, [unlock]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Command palette: Ctrl+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
        if (!cmdOpen) unlock("keyboard-warrior");
        return;
      }

      // Arrow keys for panel navigation
      if (e.key === "ArrowRight" && !cmdOpen) {
        navigate(getNextPanel(activePanel));
      } else if (e.key === "ArrowLeft" && !cmdOpen) {
        navigate(getPrevPanel(activePanel));
      }

      // Number keys 1-9 for quick panel access
      if (!cmdOpen && !e.ctrlKey && !e.metaKey) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 9) {
          const panelId = getPanelByIndex(num - 1);
          if (panelId) navigate(panelId);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activePanel, cmdOpen, navigate, unlock]);

  const ActivePanel = panels[activePanel] || HomePanel;

  return (
    <div className="os-frame">
      <div className="titlebar" style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 12, color: "var(--retro-yellow)", textShadow: "2px 2px 0 var(--retro-yellow-shadow)" }}>Welcome to Tamal's Portfolio</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--retro-green)", boxShadow: "0 0 6px var(--retro-green)" }} />
        </div>
        <span className="status">ONLINE</span>
      </div>

      <div className="layout-body">
        <Sidebar activePanel={activePanel} onNavigate={navigate} />

        <div className="main-area">
          <TopBar panel={activePanel} onToggle={toggleTheme} dark={dark} onCmdPalette={() => { setCmdOpen(true); unlock("keyboard-warrior"); }} />
          <div className="content-area">
            <ActivePanel onNavigate={navigate} onGamePlayed={handleGamePlayed} onCommandRun={handleCommandRun} />
          </div>
          <BottomBar soundOn={soundOn} onToggleSound={toggleSoundEffect} />
        </div>
      </div>

      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onNavigate={navigate}
        onToggleTheme={toggleTheme}
      />

      <AchievementToast
        show={toast.show}
        name={toast.name}
        icon={toast.icon}
        onClose={() => setToast({ show: false, name: "", icon: "" })}
      />
    </div>
  );
}

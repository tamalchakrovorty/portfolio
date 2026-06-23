export interface Achievement {
  id: string;
  name: string;
  icon: string;
  condition: string;
  unlocked: boolean;
}

const STORAGE_KEY = "tamal-achievements";

const defaultAchievements: Achievement[] = [
  { id: "linux-explorer", name: "Linux Explorer", icon: "🐧", condition: "Visit terminal panel", unlocked: false },
  { id: "builder", name: "Builder", icon: "🔨", condition: "View 3+ projects", unlocked: false },
  { id: "community", name: "Community", icon: "🏃", condition: "Visit community panel", unlocked: false },
  { id: "terminal-master", name: "Terminal Master", icon: "⌨️", condition: "Run 5+ terminal commands", unlocked: false },
  { id: "student-dev", name: "Student Dev", icon: "🎓", condition: "Visit academic panel", unlocked: false },
  { id: "game-player", name: "Game Player", icon: "🕹️", condition: "Play any mini game", unlocked: false },
  { id: "badge-collector", name: "Badge Collector", icon: "🏅", condition: "Unlock 3+ achievements", unlocked: false },
  { id: "keyboard-warrior", name: "Keyboard Warrior", icon: "⌨️", condition: "Use ⌘K command palette", unlocked: false },
  { id: "night-owl", name: "Night Owl", icon: "🦉", condition: "Visit between 12am-5am", unlocked: false },
  { id: "explorer", name: "Explorer", icon: "🧭", condition: "Visit all panels", unlocked: false },
];

export function loadAchievements(): Achievement[] {
  if (typeof window === "undefined") return defaultAchievements;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return defaultAchievements.map((a) => ({
        ...a,
        unlocked: parsed.includes(a.id),
      }));
    }
  } catch {}
  return defaultAchievements;
}

export function saveAchievement(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const unlocked: string[] = stored ? JSON.parse(stored) : [];
    if (!unlocked.includes(id)) {
      unlocked.push(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
      return true;
    }
  } catch {}
  return false;
}

export function getUnlockedCount(achievements: Achievement[]): number {
  return achievements.filter((a) => a.unlocked).length;
}

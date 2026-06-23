const PANEL_ORDER = ["home", "projects", "skills", "terminal", "about", "academic", "community", "timeline", "games", "achievements", "blog", "contact", "github"];

export function getNextPanel(current: string): string {
  const idx = PANEL_ORDER.indexOf(current);
  return PANEL_ORDER[(idx + 1) % PANEL_ORDER.length];
}

export function getPrevPanel(current: string): string {
  const idx = PANEL_ORDER.indexOf(current);
  return PANEL_ORDER[(idx - 1 + PANEL_ORDER.length) % PANEL_ORDER.length];
}

export function getPanelByIndex(index: number): string | null {
  if (index >= 0 && index < PANEL_ORDER.length) return PANEL_ORDER[index];
  return null;
}

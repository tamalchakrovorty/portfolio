"use client";

import {
  Home, FolderOpen, Terminal,
  User, Gamepad2, Mail,
} from "lucide-react";

const navItems = [
  { id: "home", label: "home", icon: Home },
  { id: "projects", label: "projects", icon: FolderOpen },
  { id: "terminal", label: "terminal", icon: Terminal },
  { id: "contact", label: "contact", icon: Mail },
  { id: "about", label: "about", icon: User },
  { id: "games", label: "arcade", icon: Gamepad2 },
];

export default function Sidebar({ activePanel, onNavigate }: { activePanel: string; onNavigate: (id: string) => void }) {
  return (
    <div className="sidebar">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className={`nav-item ${activePanel === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon"><Icon size={16} /></span>
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

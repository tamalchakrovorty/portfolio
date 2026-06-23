"use client";

import { useState } from "react";
import { Mail, ExternalLink, Link } from "lucide-react";
import { siteData } from "@/data/portfolio";

const iconMap: Record<string, React.FC<{ size?: number; style?: React.CSSProperties }>> = {
  Email: Mail,
  GitHub: ExternalLink,
  LinkedIn: Link,
};

export default function ContactPanel() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="panel">
      <div className="section-title">&gt; CONTACT</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {siteData.contact.map((c, i) => {
          const Icon = iconMap[c.type] || Mail;
          return (
            <a
              key={i}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="panel-card-dark"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                color: "var(--retro-text-light)",
                textDecoration: "none",
                transition: "border-color 0.2s",
                border: "2px solid var(--retro-border)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--retro-yellow)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--retro-border)"}
            >
              <Icon size={16} style={{ color: "var(--retro-yellow)" }} />
              <div>
                <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 9 }}>{c.type}</div>
                <div style={{ fontSize: 14, color: "var(--retro-muted)", marginTop: 2 }}>{c.value}</div>
              </div>
            </a>
          );
        })}
      </div>

      <div style={{ borderTop: "2px solid var(--retro-border)", paddingTop: 16 }}>
        <div style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 9, color: "var(--retro-yellow)", marginBottom: 12 }}>Send a message</div>
        <form className="space-y-3" onSubmit={e => { e.preventDefault(); alert("Message sent! (Demo)"); setForm({ name: "", email: "", message: "" }); }}>
          <input className="retro-input" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="retro-input" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <textarea className="retro-input" placeholder="Message" rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: "none" }} />
          <button type="submit" className="retro-btn primary" style={{ width: "100%" }}>Send Message</button>
        </form>
      </div>
    </div>
  );
}

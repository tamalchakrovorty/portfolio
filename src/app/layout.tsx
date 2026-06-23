import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tamal OS v2.0 — Portfolio",
  description: "Where Language Meets Technology — Tamal Chakravorty",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ? stored === "dark" : prefersDark;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      aria-label="Toggle Theme"
      onClick={toggle}
      className="rounded px-3 py-2 text-sm font-medium bg-brand-yellow text-black hover:bg-yellow-600 shadow backdrop-blur-md"
    >
      {dark ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}

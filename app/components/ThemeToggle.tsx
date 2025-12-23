"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = saved ? saved === "dark" : prefersDark;
    setDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="ml-3 inline-flex items-center justify-center rounded-md border border-white/30 px-3 py-2 text-sm text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffe600]"
    >
      {dark ? (
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Switch to light mode</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Switch to dark mode</span>
        </div>
      )}
    </button>
  );
}

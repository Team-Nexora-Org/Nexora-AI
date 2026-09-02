"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("nexora-theme") as "light" | "dark" | null;
    const initial = saved || "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("nexora-theme", next);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="rounded-full border border-[#45A29E]/20 hover:bg-[#45A29E]/10 hover:text-[#66FCF1] transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-[#66FCF1]" />
      ) : (
        <Moon className="h-4 w-4 text-[#45A29E]" />
      )}
    </Button>
  );
}

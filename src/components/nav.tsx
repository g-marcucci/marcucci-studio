"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Avatar } from "./avatar";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const set = (t: "light" | "dark") => {
    setTheme(t);
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch {}
  };

  const item = (t: "light" | "dark", Icon: typeof Sun, label: string) => (
    <button
      type="button"
      onClick={() => set(t)}
      aria-pressed={theme === t}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] transition-colors ${
        theme === t ? "bg-surface text-fg shadow-[var(--shadow)]" : "text-faint hover:text-muted"
      }`}
    >
      <Icon className="size-3.5" />
      {label}
    </button>
  );

  return (
    <div className="flex rounded-full border border-line bg-surface-2 p-0.5">
      {item("light", Sun, "Claro")}
      {item("dark", Moon, "Escuro")}
    </div>
  );
}

function Clock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour12: false });
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="text-right leading-tight">
      <div className="font-mono text-[13px] tabular-nums text-fg">{now ?? "--:--:--"}</div>
      <div className="text-[11px] text-faint">Horário de Brasília · GMT−3</div>
    </div>
  );
}

export function Nav() {
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const ids = site.nav.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="sticky top-3 z-40 px-4 pt-5 md:px-8">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4">
        <div className="hidden w-48 md:block">
          <ThemeToggle />
        </div>

        <nav className="mx-auto flex items-center gap-0.5 rounded-full bg-[#141416] p-1 text-[13px] shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)] ring-1 ring-white/10">
          <a href="#inicio" className="mr-1 grid size-8 place-items-center rounded-full bg-white/5" aria-label={site.name}>
            <Avatar size={20} />
          </a>
          {site.nav.map((n) => {
            const isActive = active === n.href;
            const isCta = n.href === "#contato";
            return (
              <a
                key={n.href}
                href={n.href}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  isCta
                    ? "bg-white font-medium text-[#141416] hover:bg-white/90"
                    : isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white"
                } ${n.href === "#processo" || n.href === "#inicio" ? "hidden sm:block" : ""}`}
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden w-48 justify-end md:flex">
          <Clock />
        </div>
      </div>
    </header>
  );
}

export function MobileThemeToggle() {
  return (
    <div className="flex justify-center md:hidden">
      <ThemeToggle />
    </div>
  );
}

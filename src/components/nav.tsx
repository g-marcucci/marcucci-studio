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

  const toggle = () => {
    const t = theme === "dark" ? "light" : "dark";
    setTheme(t);
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Usar tema claro" : "Usar tema escuro"}
      className="grid size-9 shrink-0 place-items-center rounded-xl border border-line text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

const brasiliaTime = () =>
  new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour12: false });

// Comandos que o mini-terminal "digita" em loop. O último mostra a hora real.
const COMMANDS: { cmd: string; out: () => string }[] = [
  { cmd: "git push", out: () => "deploy no ar em 31s" },
  { cmd: "sync --marketplaces", out: () => "214 pedidos importados" },
  { cmd: "nfe emitir --lote", out: () => "38 notas emitidas" },
  { cmd: "date", out: () => `${brasiliaTime()} · Brasília` },
];

function MiniTerminal() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    const { cmd, out } = COMMANDS[index];
    if (typed < cmd.length) {
      const id = setTimeout(() => setTyped((n) => n + 1), 55 + Math.random() * 60);
      return () => clearTimeout(id);
    }
    if (output === null) {
      const id = setTimeout(() => setOutput(out()), 280);
      return () => clearTimeout(id);
    }
    const isClock = cmd === "date";
    // No "date" o relógio segue andando por alguns segundos antes do próximo comando.
    const tick = isClock ? setInterval(() => setOutput(out()), 1000) : undefined;
    const next = setTimeout(
      () => {
        setIndex((i) => (i + 1) % COMMANDS.length);
        setTyped(0);
        setOutput(null);
      },
      isClock ? 6000 : 2200,
    );
    return () => {
      clearTimeout(next);
      if (tick) clearInterval(tick);
    };
  }, [index, typed, output]);

  const { cmd } = COMMANDS[index];
  const done = output !== null;

  return (
    <div
      className="hidden w-[248px] shrink-0 rounded-xl bg-[#121016] px-3 py-1.5 font-mono text-[11px] leading-[1.45] ring-1 ring-white/10 lg:block"
      aria-hidden
    >
      <div className="flex items-center gap-1.5 truncate text-white/85">
        <span className="text-[#d4ff4a]">~</span>
        <span className="text-white/40">$</span>
        <span className="truncate">{cmd.slice(0, typed)}</span>
        {!done && <span className="-ml-1 inline-block h-3 w-[6px] animate-pulse bg-[#d4ff4a]" />}
      </div>
      <div className="flex items-center gap-1.5 truncate text-white/50">
        {done ? (
          <>
            <span className="text-[#d4ff4a]">✓</span>
            <span className="truncate tabular-nums">{output}</span>
          </>
        ) : (
          <span className="text-white/25">…</span>
        )}
      </div>
    </div>
  );
}

export function Nav() {
  const [active, setActive] = useState("#inicio");
  const links = site.nav.filter((n) => n.href !== "#inicio" && n.href !== "#contato");

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
    <header className="sticky top-2 z-40 px-3 pt-3 md:top-3 md:px-6 md:pt-4">
      <div className="mx-auto flex max-w-[1232px] items-center gap-3 rounded-2xl border border-line bg-surface/75 p-2 pl-3 shadow-[var(--shadow)] backdrop-blur-xl">
        <a href="#inicio" className="flex shrink-0 items-center gap-2.5" aria-label={site.name}>
          <Avatar size={26} />
          <span className="font-mono text-[13px] tracking-tight text-fg">
            marcucci<span className="text-faint">/studio</span>
          </span>
        </a>

        <nav className="mx-auto hidden items-center gap-1 md:flex">
          {links.map((n, i) => {
            const isActive = active === n.href;
            return (
              <a
                key={n.href}
                href={n.href}
                className={`group flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
                  isActive ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"
                }`}
              >
                <span className={`font-mono text-[10.5px] ${isActive ? "text-accent" : "text-faint"}`}>
                  0{i + 1}
                </span>
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <MiniTerminal />
          <ThemeToggle />
          <a
            href="#contato"
            className="rounded-xl bg-accent px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Contato
          </a>
        </div>
      </div>
    </header>
  );
}

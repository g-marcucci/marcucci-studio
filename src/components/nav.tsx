"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { HOME, LOCALE_LABEL, LOCALES, useLocale, useT, type Tr } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Avatar } from "./avatar";

function ThemeToggle() {
  const t = useT();
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
      aria-label={t(theme === "dark" ? { en: "Use light theme", pt: "Usar tema claro", es: "Usar tema claro" } : { en: "Use dark theme", pt: "Usar tema escuro", es: "Usar tema oscuro" })}
      className="grid size-9 shrink-0 place-items-center rounded-xl border border-line text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

const brasiliaTime = () =>
  new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour12: false });

// Comandos que o mini-terminal "digita" em loop. O último mostra a hora real.
const COMMANDS: { cmd: string; out: Tr | (() => string) }[] = [
  { cmd: "git push", out: { en: "deployed in 31s", pt: "deploy no ar em 31s", es: "deploy en línea en 31s" } },
  { cmd: "sync --marketplaces", out: { en: "214 orders imported", pt: "214 pedidos importados", es: "214 pedidos importados" } },
  { cmd: "invoices --batch", out: { en: "38 invoices issued", pt: "38 notas emitidas", es: "38 facturas emitidas" } },
  { cmd: "date", out: () => `${brasiliaTime()} · Brasília` },
];

function MiniTerminal() {
  const t = useT();
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
      const id = setTimeout(() => setOutput(typeof out === "function" ? out() : t(out)), 280);
      return () => clearTimeout(id);
    }
    const isClock = cmd === "date";
    // No "date" o relógio segue andando por alguns segundos antes do próximo comando.
    const tick = isClock && typeof out === "function" ? setInterval(() => setOutput(out()), 1000) : undefined;
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

/** Seletor de idioma: leva para a mesma página no outro idioma. */
function LanguageSwitch() {
  const { locale, alternates } = useLocale();
  return (
    <div className="flex shrink-0 rounded-xl border border-line p-0.5 font-mono text-[11px]" role="group" aria-label="Language">
      {LOCALES.map((l) => (
        <a
          key={l}
          href={alternates[l]}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded-lg px-1.5 py-1.5 transition-colors sm:px-2 ${
            l === locale ? "bg-surface-2 text-fg" : "text-faint hover:text-fg"
          }`}
        >
          {LOCALE_LABEL[l]}
        </a>
      ))}
    </div>
  );
}

export function Nav() {
  const t = useT();
  const { locale } = useLocale();
  const home = HOME[locale];
  const [active, setActive] = useState("home");
  const links = site.nav.filter((n) => n.id !== "home" && n.id !== "contact");
  const contact = site.nav.find((n) => n.id === "contact")!;

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    site.nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="sticky top-2 z-40 px-3 pt-3 md:top-3 md:px-6 md:pt-4">
      <div className="mx-auto flex max-w-[1232px] items-center gap-2 rounded-2xl border border-line bg-surface/75 p-2 pl-3 shadow-[var(--shadow)] backdrop-blur-xl sm:gap-3">
        <a href={home} className="flex shrink-0 items-center gap-2.5" aria-label={site.name}>
          <Avatar size={26} />
          <span className="hidden font-mono text-[13px] tracking-tight text-fg sm:inline">
            marcucci<span className="text-faint">/studio</span>
          </span>
        </a>

        <nav className="mx-auto hidden items-center gap-1 md:flex">
          {links.map((n, i) => {
            const isActive = n.id === active;
            return (
              <a
                key={n.id}
                href={`${home}#${n.id}`}
                className={`group flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
                  isActive ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"
                }`}
              >
                <span className={`font-mono text-[10.5px] ${isActive ? "text-accent" : "text-faint"}`}>
                  0{i + 1}
                </span>
                {t(n.label)}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2 md:ml-0">
          <MiniTerminal />
          <LanguageSwitch />
          <ThemeToggle />
          <a
            href={`#${contact.id}`}
            className="rounded-xl bg-accent px-3 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90 sm:px-4"
          >
            {t(contact.label)}
          </a>
        </div>
      </div>
    </header>
  );
}

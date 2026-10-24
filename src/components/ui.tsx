"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Anima de 0 até o valor quando o elemento entra na tela (e a cada mudança de valor). */
function useCountUp(value: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from.current, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setDisplay,
    });
    from.current = value;
    return () => controls.stop();
  }, [inView, value]);

  return [ref, display] as const;
}

export function CountUp({
  value,
  format = (n) => Math.round(n).toLocaleString("pt-BR"),
  className = "",
}: {
  value: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const [ref, display] = useCountUp(value);
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {format(display)}
    </span>
  );
}

/** Valor em reais com o "R$" e os centavos menores, como no painel do ERP. */
export function Money({ value, className = "" }: { value: number; className?: string }) {
  const [ref, display] = useCountUp(value);
  const [int, cents] = display.toFixed(2).split(".");
  return (
    <span ref={ref} className={`font-display tabular-nums tracking-tight ${className}`}>
      <span className="mr-1 text-[0.42em] font-medium text-muted">R$</span>
      {Number(int).toLocaleString("pt-BR")}
      <span className="text-[0.5em] font-medium text-faint">,{cents}</span>
    </span>
  );
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="font-pixel text-[14px] font-black tracking-[0.18em] text-muted uppercase">
      {index} · {children}
    </p>
  );
}

/** Linha "rótulo ······ valor" usada nas listas do painel. */
export function LeaderRow({
  dot,
  label,
  value,
  pct,
  sub,
}: {
  dot?: string;
  label: React.ReactNode;
  value: React.ReactNode;
  pct?: string;
  sub?: React.ReactNode;
}) {
  return (
    <div className="py-1.5">
      <div className="flex items-end gap-2 text-[13px]">
        {dot && <span className="mb-[5px] size-2 shrink-0 rounded-[3px]" style={{ background: dot }} />}
        <span className="text-fg">{label}</span>
        <span className="leader" />
        <span className="font-medium tabular-nums text-fg">{value}</span>
        {pct && <span className="w-9 text-right text-[12px] tabular-nums text-faint">{pct}</span>}
      </div>
      {sub && <div className="mt-0.5 pl-4 text-[11px] text-faint">{sub}</div>}
    </div>
  );
}

/** Medidor radial em "tracinhos", como o de margem e recuperação do ERP. */
export function TickGauge({
  value,
  label,
  sub,
  size = 150,
}: {
  value: number;
  label: string;
  sub: string;
  size?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const ticks = 26;
  const start = -225;
  const sweep = 270;
  const filled = Math.round((value / 100) * ticks);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg ref={ref} viewBox="0 0 100 100" className="size-full">
        {Array.from({ length: ticks }, (_, i) => {
          const a = ((start + (sweep / (ticks - 1)) * i) * Math.PI) / 180;
          const r1 = 36;
          const r2 = 47;
          const on = i < filled;
          return (
            <motion.line
              key={i}
              x1={50 + r1 * Math.cos(a)}
              y1={50 + r1 * Math.sin(a)}
              x2={50 + r2 * Math.cos(a)}
              y2={50 + r2 * Math.sin(a)}
              strokeWidth={4.2}
              strokeLinecap="round"
              initial={false}
              animate={{ stroke: inView && on ? "var(--accent)" : "var(--line-strong)" }}
              transition={{ delay: inView ? i * 0.03 : 0, duration: 0.25 }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
        <span className="font-display text-2xl tracking-tight text-fg">{label}</span>
        <span className="text-[11px] text-faint">{sub}</span>
      </div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface shadow-[var(--shadow)] ${className}`}>{children}</div>
  );
}

export function IconBadge({ children, tone = "accent" }: { children: React.ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    accent: "bg-accent-soft text-accent",
    ok: "bg-[color-mix(in_oklab,var(--ok)_14%,transparent)] text-ok",
    red: "bg-[color-mix(in_oklab,var(--nuvem)_14%,transparent)] text-nuvem",
    blue: "bg-[color-mix(in_oklab,var(--tiktok)_14%,transparent)] text-tiktok",
    amber: "bg-[color-mix(in_oklab,var(--amber)_16%,transparent)] text-amber",
  };
  return (
    <span className={`grid size-8 shrink-0 place-items-center rounded-lg [&_svg]:size-4 ${tones[tone]}`}>
      {children}
    </span>
  );
}

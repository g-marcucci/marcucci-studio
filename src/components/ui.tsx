"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

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

const FACE = 1.15; // altura de cada face do odômetro, em em
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const FADE_MASK =
  "linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%)";

/**
 * Uma coluna do odômetro: a pilha 0–9 desliza com mola até o algarismo. A
 * largura é a do algarismo em que ela para (um "1" é mais estreito que um "0"),
 * dada por uma cópia invisível dele; a pilha fica centrada por cima.
 */
function DigitColumn({ digit }: { digit: number }) {
  return (
    <span
      className="inline-grid overflow-hidden"
      style={{ height: `${FACE}em`, maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
    >
      <span className="invisible [grid-area:1/1]" style={{ lineHeight: `${FACE}em` }}>
        {digit}
      </span>
      <motion.span
        className="flex w-0 flex-col items-center justify-self-center [grid-area:1/1]"
        initial={{ y: "0em" }}
        animate={{ y: `${-digit * FACE}em` }}
        transition={{ type: "spring", duration: 0.7, bounce: 0.18 }}
      >
        {DIGITS.map((n) => (
          <span key={n} className="block" style={{ height: `${FACE}em`, lineHeight: `${FACE}em` }}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/**
 * Número em odômetro, como no ERP: cada dígito gira até o valor. Gira a partir
 * do zero quando entra na tela e de novo a cada mudança de valor. As colunas são
 * identificadas pela distância até a vírgula, então ganhar uma casa (999 → 1.000)
 * acrescenta uma coluna à esquerda sem remontar as outras.
 */
export function Odometer({
  value,
  format = (n) => Math.round(n).toLocaleString("pt-BR"),
  className = "",
}: {
  value: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const text = format(inView ? value : 0);
  const comma = text.indexOf(",");
  const anchor = comma === -1 ? text.length : comma;

  return (
    <span ref={ref} className={`inline-flex items-baseline tabular-nums ${className}`}>
      <span className="sr-only">{format(value)}</span>
      <span aria-hidden className="inline-flex items-baseline">
        {[...text].map((c, i) =>
          /\d/.test(c) ? (
            <DigitColumn key={`d${anchor - i}`} digit={Number(c)} />
          ) : (
            <span key={`m${anchor - i}${c}`} style={{ whiteSpace: "pre" }}>
              {c}
            </span>
          ),
        )}
      </span>
    </span>
  );
}

export function CountUp(props: { value: number; format?: (n: number) => string; className?: string }) {
  return <Odometer {...props} />;
}

/** Valor em reais com o "R$" e os centavos menores, como no painel do ERP. */
export function Money({ value, className = "" }: { value: number; className?: string }) {
  const cents = Math.round((value % 1) * 100);
  return (
    <span className={`inline-flex items-baseline font-display tracking-tight whitespace-nowrap ${className}`}>
      <span className="mr-1 text-[0.42em] font-medium text-muted">R$</span>
      <Odometer value={Math.floor(value)} />
      <span className="text-[0.5em] font-medium text-faint">
        ,<Odometer value={cents} format={(n) => String(Math.round(n)).padStart(2, "0")} />
      </span>
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

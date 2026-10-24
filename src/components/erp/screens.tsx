"use client";

import {
  Activity,
  ArrowDown,
  ArrowUp,
  Minus,
  Percent,
  Phone,
  RefreshCw,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLocale, useT, type Text, type Tr } from "@/lib/i18n";
import { brl } from "@/lib/site";
import { CountUp, IconBadge, LeaderRow, Money, TickGauge } from "../ui";

// Telas do ERP recriadas em código com dados fictícios. Ficam dentro de um
// <ErpWindow>, que aplica a fonte e as cores do próprio sistema (classe .erp).

/** Janela de navegador com o visual do ERP em volta de uma tela. */
export function ErpWindow({
  path,
  children,
  className = "",
}: {
  path: Text;
  children: React.ReactNode;
  className?: string;
}) {
  const t = useT();
  return (
    <div className={`erp overflow-hidden rounded-[18px] border border-line-strong bg-surface-2 ${className}`}>
      <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto w-full max-w-sm truncate rounded-md bg-surface-2 px-3 py-1 text-center font-mono text-[11px] text-faint">
          {t({ en: "erp.yourstore.com/", pt: "erp.sualoja.com.br/", es: "erp.tutienda.com/" })}<span className="text-fg">{t(path)}</span>
        </div>
        <span className="hidden font-mono text-[10.5px] text-faint sm:block">{t({ en: "sample data", pt: "dados fictícios", es: "datos ficticios" })}</span>
      </div>
      {children}
    </div>
  );
}

export function Segmented({ parts }: { parts: { color: string; value: number }[] }) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  return (
    <div className="flex h-2.5 gap-1">
      {parts.map((p, i) => (
        <motion.span
          key={i}
          className="rounded-full"
          style={{ background: p.color }}
          initial={{ flexGrow: 0 }}
          whileInView={{ flexGrow: Math.max(p.value / total, 0.012) }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

/* ── Carrinhos abandonados ───────────────────────────────────────────────── */

const CARTS: { item: Tr; units: number; when: Tr; total: number }[] = [
  {
    item: { en: "Pack of 3 basic cotton t-shirts", pt: "Kit 3 camisetas básicas algodão", es: "Kit 3 camisetas básicas de algodón" },
    units: 1,
    when: { en: "today · 12:58", pt: "hoje · 12:58", es: "hoy · 12:58" },
    total: 189.9,
  },
  {
    item: { en: "Kids' play tent", pt: "Barraca infantil toca cabana", es: "Carpa infantil tipo cabaña" },
    units: 2,
    when: { en: "yesterday · 10:41", pt: "ontem · 10:41", es: "ayer · 10:41" },
    total: 259.8,
  },
  {
    item: { en: "Stainless thermos 1L + 2 items", pt: "Garrafa térmica inox 1L + 2 produtos", es: "Termo inox 1L + 2 productos" },
    units: 3,
    when: { en: "2 days ago", pt: "há 2 dias", es: "hace 2 días" },
    total: 142.5,
  },
  {
    item: { en: "Adjustable desk lamp", pt: "Luminária de mesa articulada", es: "Lámpara de escritorio articulada" },
    units: 1,
    when: { en: "3 days ago", pt: "há 3 dias", es: "hace 3 días" },
    total: 98.4,
  },
];

export function CartsScreen() {
  const t = useT();
  const [recovered, setRecovered] = useState<number[]>([]);
  const stuck = CARTS.filter((_, i) => !recovered.includes(i)).reduce((s, c) => s + c.total, 0);
  const back = CARTS.filter((_, i) => recovered.includes(i)).reduce((s, c) => s + c.total, 0);
  const rate = Math.round((recovered.length / CARTS.length) * 100);

  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center gap-2.5 text-[13px] text-muted">
            <IconBadge tone="amber">
              <ShoppingCart />
            </IconBadge>
            {t({ en: "Value stuck in carts", pt: "Valor parado em carrinhos", es: "Valor detenido en carritos" })}
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <Money value={stuck} className="text-[34px] leading-none text-fg" />
            <span className="text-[12px] text-faint">{t({ en: `in ${CARTS.length - recovered.length} carts`, pt: `em ${CARTS.length - recovered.length} carrinhos`, es: `en ${CARTS.length - recovered.length} carritos` })}</span>
          </div>
          <div className="mt-4 space-y-2.5 text-[11.5px]">
            <div>
              <div className="flex justify-between text-muted">
                <span>{t({ en: "Abandoned", pt: "Abandonados", es: "Abandonados" })}</span>
                <span className="text-fg">R$ {brl(stuck)}</span>
              </div>
              <motion.div className="mt-1 h-1.5 rounded-full bg-amber" animate={{ width: `${Math.max(2, (stuck / (stuck + back)) * 100)}%` }} />
            </div>
            <div>
              <div className="flex justify-between text-muted">
                <span>{t({ en: "Recovered", pt: "Recuperados", es: "Recuperados" })}</span>
                <span className="text-fg">R$ {brl(back)}</span>
              </div>
              <motion.div className="mt-1 h-1.5 rounded-full bg-teal" animate={{ width: `${Math.max(2, (back / (stuck + back)) * 100)}%` }} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-line bg-surface p-4">
          <div className="flex w-full items-center gap-2.5 text-[13px] text-muted">
            <IconBadge tone="ok">
              <RefreshCw />
            </IconBadge>
            {t({ en: "Recovery rate", pt: "Taxa de recuperação", es: "Tasa de recuperación" })}
          </div>
          <TickGauge value={rate} label={`${rate}%`} sub={t({ en: "recovered", pt: "recuperados", es: "recuperados" })} size={132} />
          <div className="text-[11px] text-faint">
            {t({ en: `${recovered.length} of ${CARTS.length} became orders`, pt: `${recovered.length} de ${CARTS.length} viraram pedido`, es: `${recovered.length} de ${CARTS.length} se volvieron pedido` })}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="hidden grid-cols-[1fr_110px_100px_150px] gap-3 border-b border-line px-4 py-2 text-[11px] text-faint md:grid">
          <span>{t({ en: "Cart", pt: "Carrinho", es: "Carrito" })}</span>
          <span>{t({ en: "When", pt: "Quando", es: "Cuándo" })}</span>
          <span className="text-right">Total</span>
          <span className="text-right">{t({ en: "Status", pt: "Situação", es: "Estado" })}</span>
        </div>
        {CARTS.map((c, i) => {
          const done = recovered.includes(i);
          return (
            <div
              key={c.item.en}
              className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-line px-4 py-2.5 last:border-0 md:grid-cols-[1fr_110px_100px_150px]"
            >
              <div className="min-w-0">
                <div className="truncate text-[13px] text-fg">{t(c.item)}</div>
                <div className="text-[11px] text-faint">
                  {c.units} {c.units > 1 ? t({ en: "units", pt: "unidades", es: "unidades" }) : t({ en: "unit", pt: "unidade", es: "unidad" })} · {t({ en: "contact available", pt: "com contato", es: "con contacto" })}
                </div>
              </div>
              <span className="hidden text-[12px] text-muted md:block">{t(c.when)}</span>
              <span className="hidden text-right text-[13px] font-medium tabular-nums text-fg md:block">R$ {brl(c.total)}</span>
              <div className="flex justify-end">
                <AnimatePresence mode="wait" initial={false}>
                  {done ? (
                    <motion.span
                      key="ok"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-full bg-[color-mix(in_oklab,var(--teal)_14%,transparent)] px-2.5 py-1 text-[11.5px] text-teal"
                    >
                      ● {t({ en: "Recovered", pt: "Recuperado", es: "Recuperado" })}
                    </motion.span>
                  ) : (
                    <motion.button
                      key="call"
                      type="button"
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => setRecovered((r) => [...r, i])}
                      className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11.5px] text-ok transition-colors hover:bg-[color-mix(in_oklab,var(--ok)_10%,transparent)]"
                    >
                      <Phone className="size-3" /> {t({ en: "Reach out", pt: "Chamar de volta", es: "Contactar de nuevo" })}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Resultado e margem ──────────────────────────────────────────────────── */

export function MarginScreen() {
  const t = useT();
  const { locale } = useLocale();
  const gross = 1_048_210.4;
  const parts = [
    { label: t({ en: "Estimated net", pt: "Líquido estimado", es: "Neto estimado" }), value: 786_157.8, color: "var(--ok)" },
    { label: t({ en: "Marketplace fees", pt: "Tarifas do marketplace", es: "Tarifas del marketplace" }), value: 152_990.1, color: "var(--accent)" },
    { label: t({ en: "Refunds", pt: "Estornos", es: "Reembolsos" }), value: 2_310.5, color: "var(--nuvem)" },
    { label: t({ en: "Shipping you paid", pt: "Frete pago por você", es: "Envío pagado por ti" }), value: 106_752.0, color: "var(--tiktok)" },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div>
            <div className="flex items-center gap-2.5 text-[13px] text-muted">
              <IconBadge tone="ok">
                <Percent />
              </IconBadge>
              {t({ en: "Estimated margin", pt: "Margem estimada", es: "Margen estimado" })}
            </div>
            <Money value={parts[0].value} className="mt-4 flex text-[38px] leading-none text-fg" />
            <div className="mt-2 text-[12px] text-muted">{t({ en: `of R$ ${brl(gross)} in sales (gross)`, pt: `de R$ ${brl(gross)} em vendas (bruto)`, es: `de R$ ${brl(gross)} en ventas (bruto)` })}</div>
          </div>
          <TickGauge value={75} label={locale === "en" ? "75.0%" : "75,0%"} sub={t({ en: "net", pt: "líquido", es: "neto" })} size={128} />
        </div>
        <div className="mt-4">
          <Segmented parts={parts} />
        </div>
        <div className="mt-3">
          {parts.map((p, i) => (
            <LeaderRow
              key={p.label}
              dot={p.color}
              label={p.label}
              value={`${i ? "− " : ""}R$ ${brl(p.value)}`}
              pct={`${Math.round((p.value / gross) * 100)}%`}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid flex-1 grid-cols-2 gap-3">
          {[
            {
              label: t({ en: "Unpaid", pt: "Não pagas", es: "No pagadas" }),
              value: 164,
              sub: t({ en: "R$ 15.210 that never came in", pt: "R$ 15.210 que não entraram", es: "R$ 15.210 que no entraron" }),
              dot: "var(--nuvem)",
            },
            {
              label: t({ en: "Awaiting", pt: "Aguardando", es: "En espera" }),
              value: 9,
              sub: t({ en: "R$ 1.302 right now", pt: "R$ 1.302 agora", es: "R$ 1.302 ahora" }),
              dot: "var(--amber)",
            },
          ].map((k) => (
            <div key={k.label} className="flex flex-col rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center gap-1.5 text-[12px] text-muted">
                <span className="size-1.5 rounded-full" style={{ background: k.dot }} />
                {k.label}
              </div>
              <CountUp value={k.value} className="mt-1 font-display text-[34px] tracking-tight text-fg" />
              <div className="mt-auto text-[11px] text-faint">{k.sub}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-line bg-surface p-4 text-[12px] leading-relaxed text-muted">
          <span className="font-medium text-fg">{t({ en: "The margin deducts everything:", pt: "A margem desconta tudo:", es: "El margen descuenta todo:" })}</span>{" "}
          {t({ en: "each marketplace's fee, shipping and refunds, sale by sale, to show what's actually left.", pt: "tarifa de cada marketplace, frete e estornos, venda por venda, para mostrar o que de fato sobra.", es: "la tarifa de cada marketplace, el envío y los reembolsos, venta por venta, para mostrar lo que realmente queda." })}
        </div>
      </div>
    </div>
  );
}


/* ── Saúde da conta ──────────────────────────────────────────────────────── */

const LEVELS: { key: string; label: Tr }[] = [
  { key: "red", label: { en: "Red", pt: "Vermelho", es: "Rojo" } },
  { key: "orange", label: { en: "Orange", pt: "Laranja", es: "Naranja" } },
  { key: "yellow", label: { en: "Yellow", pt: "Amarelo", es: "Amarillo" } },
  { key: "lightgreen", label: { en: "Light green", pt: "Verde-claro", es: "Verde claro" } },
  { key: "green", label: { en: "Green", pt: "Verde", es: "Verde" } },
];

const METRICS: { label: Tr; value: number; limit: number }[] = [
  { label: { en: "Complaints", pt: "Reclamações", es: "Reclamos" }, value: 0.6, limit: 1 },
  { label: { en: "Mediations", pt: "Mediações", es: "Mediaciones" }, value: 0.1, limit: 0.5 },
  { label: { en: "Cancellations by you", pt: "Cancelamentos por você", es: "Cancelaciones tuyas" }, value: 0.9, limit: 1 },
  { label: { en: "Late shipments", pt: "Atrasos no envio", es: "Envíos con demora" }, value: 4.2, limit: 8 },
];

// Nível de cada um dos últimos 90 dias (índice em LEVELS): quase tudo verde,
// com uma passagem pelo verde-claro e um dia amarelo.
const HISTORY = Array.from({ length: 90 }, (_, d) => (d === 22 ? 2 : d > 18 && d < 30 ? 3 : 4));

export function HealthScreen() {
  const t = useT();
  const { locale } = useLocale();
  const pct = (n: number) => `${n.toLocaleString(locale === "en" ? "en-US" : locale, { minimumFractionDigits: 1 })}%`;
  const current = 4;
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex flex-wrap items-center gap-2.5 text-[13px] text-muted">
          <IconBadge tone="ok">
            <Activity />
          </IconBadge>
          {t({ en: "Reputation", pt: "Reputação", es: "Reputación" })}
          <span className="rounded-full border border-line px-2 py-0.5 text-[11px] text-fg">{t({ en: "Demo Store", pt: "Loja Demo", es: "Tienda Demo" })} · Mercado Livre</span>
          <span className="ml-auto text-[11px] text-faint">{t({ en: "read 12 min ago", pt: "lida há 12 min", es: "leída hace 12 min" })}</span>
        </div>
        <div className="mt-5 grid grid-cols-5 gap-1.5">
          {LEVELS.map((l, i) => {
            const on = i === current;
            return (
              <div key={l.key} className="flex flex-col items-center gap-1.5">
                <span className={`h-3 text-[10px] text-fg ${on ? "" : "invisible"}`}>▼</span>
                <motion.span
                  className={`block w-full origin-left rounded-full ${on ? "h-3" : "h-2"}`}
                  style={{ background: `var(--rep-${l.key})`, opacity: on ? 1 : 0.32 }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className={`text-[10.5px] ${on ? "font-medium text-fg" : "text-faint"}`}>{t(l.label)}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[12.5px] text-muted">
          <span className="font-medium text-ok">{t({ en: "Green for 60 days straight.", pt: "Verde há 60 dias seguidos.", es: "Verde hace 60 días seguidos." })}</span>{" "}
          {t({ en: "Every metric within the marketplace limit.", pt: "Todas as métricas dentro do limite do marketplace.", es: "Todas las métricas dentro del límite del marketplace." })}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-[1.35fr_1fr]">
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex justify-between text-[13px]">
            <span className="font-medium text-fg">{t({ en: "Metrics", pt: "Métricas", es: "Métricas" })}</span>
            <span className="text-[11px] text-faint">{t({ en: "last 60 days", pt: "últimos 60 dias", es: "últimos 60 días" })}</span>
          </div>
          <div className="mt-3 space-y-3">
            {METRICS.map((m, i) => {
              const ratio = m.value / m.limit;
              const warn = ratio >= 0.8;
              return (
                <div key={m.label.en}>
                  <div className="flex items-baseline justify-between text-[12.5px]">
                    <span className="text-fg">{t(m.label)}</span>
                    <span className="tabular-nums">
                      <span className={`font-medium ${warn ? "text-amber" : "text-fg"}`}>{pct(m.value)}</span>
                      <span className="text-faint"> / {t({ en: "limit", pt: "limite", es: "límite" })} {pct(m.limit)}</span>
                    </span>
                  </div>
                  <div className="relative mt-1.5 h-1.5 rounded-full bg-surface-2">
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: warn ? "var(--amber)" : "var(--ok)" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(ratio, 1) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex justify-between text-[13px]">
            <span className="font-medium text-fg">{t({ en: "History", pt: "Histórico", es: "Historial" })}</span>
            <span className="text-[11px] text-faint">{t({ en: "90 days", pt: "90 dias", es: "90 días" })}</span>
          </div>
          <div className="mt-3 grid grid-cols-[repeat(15,minmax(0,1fr))] gap-[3px]">
            {HISTORY.map((lv, d) => (
              <motion.span
                key={d}
                className="aspect-square rounded-[2px]"
                style={{ background: `var(--rep-${LEVELS[lv].key})` }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: d * 0.006 }}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] text-faint">
            {[2, 3, 4].map((lv) => (
              <span key={lv} className="flex items-center gap-1">
                <span className="size-2 rounded-[2px]" style={{ background: `var(--rep-${LEVELS[lv].key})` }} />
                {t(LEVELS[lv].label)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Inteligência de mercado ─────────────────────────────────────────────── */

type Rank = { name: Tr; price: number; move: number; mine?: boolean; trail: number[] };

const IGLOO: Tr = { en: "Waterproof 4-person dome tent", pt: "Barraca iglu 4 pessoas impermeável", es: "Carpa iglú 4 personas impermeable" };
const KIDS_TENT: Tr = { en: "Kids' play tent", pt: "Barraca infantil toca cabana", es: "Carpa infantil tipo cabaña" };
const MATTRESS: Tr = { en: "Double air mattress with pump", pt: "Colchão inflável casal com bomba", es: "Colchón inflable doble con bomba" };
const LANTERNS: Tr = { en: "Rechargeable lantern, pack of 3", pt: "Kit lanterna recarregável 3 un.", es: "Kit linterna recargable 3 u." };

const RANKINGS: Record<"vendidos" | "vitrine", Rank[]> = {
  vendidos: [
    { name: IGLOO, price: 389.9, move: 0, trail: [1, 1, 2, 1, 1, 1, 1] },
    { name: KIDS_TENT, price: 129.9, move: 3, mine: true, trail: [6, 6, 5, 5, 4, 3, 2] },
    { name: MATTRESS, price: 219.0, move: -1, trail: [2, 3, 2, 2, 3, 2, 3] },
    { name: LANTERNS, price: 89.9, move: 2, trail: [7, 7, 6, 6, 5, 5, 4] },
    { name: { en: "Folding beach chair", pt: "Cadeira dobrável de praia", es: "Silla plegable de playa" }, price: 149.9, move: -2, trail: [3, 3, 4, 4, 4, 5, 5] },
    { name: { en: "Cotton hammock", pt: "Rede de descanso algodão", es: "Hamaca de algodón" }, price: 99.9, move: 1, mine: true, trail: [8, 8, 7, 7, 7, 7, 6] },
  ],
  vitrine: [
    { name: KIDS_TENT, price: 129.9, move: 1, mine: true, trail: [3, 3, 2, 2, 2, 2, 1] },
    { name: IGLOO, price: 389.9, move: -1, trail: [1, 1, 1, 1, 1, 1, 2] },
    { name: { en: "Sleeping bag -5 °C", pt: "Saco de dormir -5 °C", es: "Bolsa de dormir -5 °C" }, price: 179.9, move: 4, trail: [9, 8, 8, 7, 6, 5, 3] },
    { name: MATTRESS, price: 219.0, move: 0, trail: [4, 4, 4, 3, 4, 4, 4] },
    { name: { en: "Portable gas stove", pt: "Fogareiro portátil a gás", es: "Hornillo portátil a gas" }, price: 119.0, move: -2, trail: [3, 3, 3, 4, 4, 5, 5] },
    { name: LANTERNS, price: 89.9, move: 0, trail: [6, 6, 6, 6, 6, 6, 6] },
  ],
};

const TRENDING: { term: Tr; growth: number }[] = [
  { term: { en: "4-person tent", pt: "barraca 4 pessoas", es: "carpa 4 personas" }, growth: 38 },
  { term: { en: "kids tent", pt: "barraca infantil", es: "carpa infantil" }, growth: 22 },
  { term: { en: "air mattress", pt: "colchão inflável", es: "colchón inflable" }, growth: 17 },
  { term: { en: "rechargeable lantern", pt: "lanterna recarregável", es: "linterna recargable" }, growth: 12 },
  { term: { en: "sleeping bag", pt: "saco de dormir", es: "bolsa de dormir" }, growth: 9 },
];

/** Minigráfico da posição no ranking (para cima = melhor). */
function Spark({ trail, up }: { trail: number[]; up: boolean }) {
  const max = 9;
  const pts = trail.map((p, i) => `${(i / (trail.length - 1)) * 56 + 2},${((p - 1) / (max - 1)) * 14 + 2}`).join(" ");
  return (
    <svg viewBox="0 0 60 18" className="h-[18px] w-[60px]" aria-hidden>
      <polyline points={pts} fill="none" stroke={up ? "var(--ok)" : "var(--faint)"} strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Move({ n }: { n: number }) {
  if (n === 0)
    return (
      <span className="flex w-9 items-center justify-end text-faint">
        <Minus className="size-3" />
      </span>
    );
  const up = n > 0;
  return (
    <span className={`flex w-9 items-center justify-end gap-0.5 text-[11px] font-medium ${up ? "text-ok" : "text-nuvem"}`}>
      {up ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
      {Math.abs(n)}
    </span>
  );
}

export function MarketScreen() {
  const t = useT();
  const [tab, setTab] = useState<keyof typeof RANKINGS>("vendidos");
  const list = RANKINGS[tab];
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-line bg-surface px-4 py-3 text-[13px] text-muted">
        <IconBadge>
          <TrendingUp />
        </IconBadge>
        <span className="text-fg">{t({ en: "Sports & leisure", pt: "Esporte e lazer", es: "Deportes y ocio" })}</span>
        <span className="text-faint">›</span> Camping <span className="text-faint">›</span>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[12px] text-accent">{t({ en: "Tents", pt: "Barracas", es: "Carpas" })}</span>
        <span className="ml-auto text-[11px] text-faint">{t({ en: "daily snapshot · today 06:00", pt: "retrato diário · hoje 06:00", es: "foto diaria · hoy 06:00" })}</span>
      </div>

      <div className="grid gap-3 md:grid-cols-[1.55fr_1fr]">
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between">
            <div className="flex rounded-full border border-line bg-surface-2 p-0.5 text-[12px]">
              {(
                [
                  ["vendidos", { en: "Best sellers", pt: "Mais vendidos", es: "Más vendidos" }],
                  ["vitrine", { en: "Showcase", pt: "Vitrine", es: "Vitrina" }],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  className={`rounded-full px-3 py-1 transition-colors ${tab === k ? "bg-surface text-fg shadow-[var(--shadow)]" : "text-muted hover:text-fg"}`}
                >
                  {t(label)}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-faint">{t({ en: "position · 7 days", pt: "posição · 7 dias", es: "posición · 7 días" })}</span>
          </div>
          <div className="mt-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((r, i) => (
                <motion.div
                  layout
                  key={`${tab}-${r.name.en}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="flex items-center gap-3 border-b border-line py-2 last:border-0"
                >
                  <span className="w-5 font-mono text-[12px] text-faint">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-[12.5px] text-fg">{t(r.name)}</span>
                      {r.mine && (
                        <span className="shrink-0 rounded-full bg-accent-soft px-1.5 text-[10px] font-medium text-accent">{t({ en: "you", pt: "você", es: "tú" })}</span>
                      )}
                    </div>
                    <div className="text-[10.5px] text-faint">R$ {brl(r.price)}</div>
                  </div>
                  <span className="hidden sm:block">
                    <Spark trail={r.trail} up={r.move > 0} />
                  </span>
                  <Move n={r.move} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="text-[13px] font-medium text-fg">{t({ en: "Who moved", pt: "Quem se mexeu", es: "Quién se movió" })}</div>
            <div className="mt-2 space-y-1.5 text-[12px]">
              {list
                .filter((r) => r.move !== 0)
                .sort((a, b) => b.move - a.move)
                .slice(0, 4)
                .map((r) => (
                  <div key={r.name.en} className="flex items-center gap-2">
                    <Move n={r.move} />
                    <span className="truncate text-muted">{t(r.name)}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex-1 rounded-xl border border-line bg-surface p-4">
            <div className="text-[13px] font-medium text-fg">{t({ en: "Trending searches", pt: "Buscas em alta", es: "Búsquedas en alza" })}</div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {TRENDING.map((term) => (
                <span key={term.term.en} className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11.5px] text-fg">
                  {t(term.term)}
                  <span className="text-[10.5px] font-medium text-ok">+{term.growth}%</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

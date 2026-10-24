"use client";

import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  ChevronDown,
  LayoutGrid,
  Megaphone,
  Plug,
  Receipt,
  ShoppingCart,
  Store,
  Tag,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { brl } from "@/lib/site";
import { Avatar } from "./avatar";
import { CountUp, IconBadge, LeaderRow, Money } from "./ui";

// Dados fictícios: a estrutura é a do ERP real, os números não.
type Period = 7 | 30 | 90;

const DATA: Record<
  Period,
  { total: number; prev: number; delta: number; orders: number; ticket: number; delivered: number }
> = {
  7: { total: 248_913.4, prev: 222_240.6, delta: 12, orders: 1_742, ticket: 142.89, delivered: 1_388 },
  30: { total: 1_084_512.3, prev: 827_871.2, delta: 31, orders: 7_618, ticket: 142.36, delivered: 6_544 },
  90: { total: 3_021_774.85, prev: 2_436_915.2, delta: 24, orders: 21_380, ticket: 141.33, delivered: 19_102 },
};

const MARKETPLACES = [
  { name: "Mercado Livre", color: "var(--ml)", share: 0.68 },
  { name: "Shopee", color: "var(--shopee)", share: 0.25 },
  { name: "TikTok Shop", color: "var(--tiktok)", share: 0.05 },
  { name: "Nuvemshop", color: "var(--nuvem)", share: 0.02 },
];

function series(n: number, seed: number) {
  return Array.from({ length: n }, (_, i) => {
    const t = i / Math.max(1, n - 1);
    const v =
      0.55 +
      0.22 * Math.sin(i * 0.9 + seed) +
      0.14 * Math.sin(i * 0.31 + seed * 2.1) +
      0.08 * Math.cos(i * 2.3 + seed) +
      0.12 * Math.sin(t * Math.PI);
    return Math.max(0.08, Math.min(1, v));
  });
}

function smoothPath(points: [number, number][]) {
  if (points.length < 2) return "";
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function AreaChart({ period }: { period: Period }) {
  const W = 520;
  const H = 200;
  const n = period === 7 ? 7 : period === 30 ? 30 : 45;
  const values = series(n, period / 7);
  const pts = values.map((v, i) => [(i / (n - 1)) * W, H - v * (H - 16)] as [number, number]);
  const line = smoothPath(pts);
  const area = `${line} L${W},${H} L0,${H} Z`;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[170px] w-full overflow-visible md:h-[200px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1={0} x2={W} y1={H * g} y2={H * g} stroke="var(--line)" vectorEffect="non-scaling-stroke" />
        ))}
        <motion.path
          key={`a${period}`}
          d={area}
          fill="url(#area)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.path
          key={`l${period}`}
          d={line}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-faint">
        <span>há {period} dias</span>
        <span>hoje</span>
      </div>
    </div>
  );
}

function Donut({ total }: { total: number }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const gap = 1.6;
  let offset = 0;
  return (
    <div className="relative mx-auto size-[150px]">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        {MARKETPLACES.map((m) => {
          const len = Math.max(0.5, m.share * c - gap);
          const el = (
            <motion.circle
              key={m.name}
              cx={50}
              cy={50}
              r={r}
              fill="none"
              stroke={m.color}
              strokeWidth={9}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: offset / c }}
            />
          );
          offset += m.share * c;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <CountUp value={total} className="font-display text-[26px] tracking-tight text-fg" />
        <span className="text-[10px] text-faint">pedidos no período</span>
      </div>
    </div>
  );
}

function DotMatrix({ color, filled }: { color: string; filled: number }) {
  return (
    <div className="grid grid-cols-12 gap-[3px]">
      {Array.from({ length: 48 }, (_, i) => {
        const col = i % 12;
        const row = Math.floor(i / 12);
        const h = Math.round(2 + 2 * Math.sin(col * 0.8 + filled));
        const on = 3 - row < h;
        return (
          <span
            key={i}
            className="size-[4px] rounded-full"
            style={{ background: on ? color : "var(--line-strong)" }}
          />
        );
      })}
    </div>
  );
}

// Mesmos grupos da barra lateral do ERP (um recorte dos itens de cada um).
const SIDEBAR = [
  {
    group: "Monitorar",
    items: [
      { icon: LayoutGrid, label: "Visão geral", active: true },
      { icon: Activity, label: "Saúde da conta" },
      { icon: Megaphone, label: "Publicidade" },
    ],
  },
  {
    group: "Vendas",
    items: [
      { icon: Receipt, label: "Pedidos" },
      { icon: Users, label: "Clientes" },
      { icon: ShoppingCart, label: "Carrinhos" },
      { icon: Tag, label: "Anúncios" },
    ],
  },
  { group: "Integrações", items: [{ icon: Plug, label: "Conexões" }] },
];

export function DashboardDemo() {
  const [period, setPeriod] = useState<Period>(30);
  const d = DATA[period];

  return (
    <div className="erp overflow-hidden rounded-[22px] border border-line-strong bg-surface-2 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)]">
      {/* barra do navegador */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto w-full max-w-sm truncate rounded-md bg-surface px-3 py-1 text-center font-mono text-[11px] text-faint">
          erp.sualoja.com.br/visao-geral
        </div>
        <div className="w-10" />
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className="hidden w-[190px] shrink-0 flex-col gap-0.5 border-r border-line bg-surface p-3 lg:flex">
          <div className="mb-3 flex items-center gap-2 px-1.5">
            <Avatar size={22} />
            <div className="leading-tight">
              <div className="text-[13px] font-medium text-fg">Loja Demo</div>
              <div className="text-[10px] text-faint">4 lojas conectadas</div>
            </div>
          </div>
          {SIDEBAR.map(({ group, items }) => (
            <div key={group} className="mb-2">
              <div className="px-2.5 pt-1 pb-1 text-[10px] font-medium tracking-wide text-faint uppercase">{group}</div>
              {items.map(({ icon: Icon, label, active }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px] ${
                    active ? "bg-accent-soft font-medium text-accent" : "text-muted"
                  }`}
                >
                  <Icon className="size-3.5" />
                  {label}
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* conteúdo */}
        <div className="min-w-0 flex-1 space-y-3 p-3 md:p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="font-display text-xl tracking-tight text-fg md:text-2xl">Visão geral</div>
              <div className="mt-0.5 flex items-center gap-2 text-[12px] text-muted">
                Suas vendas e pedidos no período
                <span className="hidden items-center gap-1.5 rounded-full border border-line bg-surface px-2 py-0.5 text-[10.5px] sm:flex">
                  <span className="live-dot size-1.5 rounded-full bg-ok" /> atualizado agora
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] text-fg md:flex">
                <Store className="size-3.5 text-muted" /> Todas as lojas <ChevronDown className="size-3.5 text-faint" />
              </div>
              <div className="flex rounded-full border border-line bg-surface p-0.5 text-[12px]">
                {([7, 30, 90] as Period[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={`rounded-full px-3 py-1 transition-colors ${
                      period === p ? "bg-fg text-bg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {p} dias
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2 sm:flex">
            <IconBadge tone="red">
              <AlertTriangle />
            </IconBadge>
            <span className="text-[13px] font-medium text-fg">Precisa da sua atenção</span>
            <span className="text-[12px] text-faint">5 avisos</span>
            <span className="rounded-full bg-[color-mix(in_oklab,var(--nuvem)_12%,transparent)] px-2 py-0.5 text-[11px] text-nuvem">
              2 urgentes
            </span>
          </div>

          <div className="grid gap-3 xl:grid-cols-[1.75fr_1fr]">
            {/* total de vendas */}
            <div className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-[13px] text-muted">
                  <IconBadge>
                    <TrendingUp />
                  </IconBadge>
                  Total de vendas
                </div>
                <span className="grid size-7 place-items-center rounded-full border border-line text-muted">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
              <div className="mt-3 grid gap-4 md:grid-cols-[220px_1fr]">
                <div className="flex flex-col">
                  <Money value={d.total} className="text-[38px] leading-none text-fg" />
                  <div className="mt-3 flex items-center gap-1 font-medium text-ok">
                    <span className="text-[11px]">▲</span>
                    <CountUp value={d.delta} format={(n) => `${Math.round(n)}%`} />
                  </div>
                  <div className="text-[11.5px] text-muted">
                    +R$ {brl(d.total - d.prev)} vs. período anterior
                  </div>
                  <div className="mt-5 space-y-2.5 text-[11.5px] md:mt-auto">
                    <div>
                      <div className="flex justify-between text-muted">
                        <span>Este período</span>
                        <span className="font-medium text-fg">R$ {brl(d.total)}</span>
                      </div>
                      <motion.div
                        className="mt-1 h-1.5 rounded-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.9 }}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-faint">
                        <span>Período anterior</span>
                        <span>R$ {brl(d.prev)}</span>
                      </div>
                      <motion.div
                        key={period}
                        className="mt-1 h-1.5 rounded-full bg-line-strong"
                        initial={{ width: 0 }}
                        animate={{ width: `${(d.prev / d.total) * 100}%` }}
                        transition={{ duration: 0.9 }}
                      />
                    </div>
                  </div>
                </div>
                <AreaChart period={period} />
              </div>
            </div>

            {/* marketplaces */}
            <div className="rounded-xl border border-line bg-surface p-4">
              <div className="flex justify-between text-[13px]">
                <span className="font-medium text-fg">Vendas por marketplace</span>
                <span className="text-muted">Ver pedidos</span>
              </div>
              <div className="my-3">
                <Donut total={d.orders} />
              </div>
              {MARKETPLACES.map((m) => (
                <LeaderRow
                  key={m.name}
                  dot={m.color}
                  label={m.name}
                  value={Math.round(d.orders * m.share).toLocaleString("pt-BR")}
                  pct={`${Math.round(m.share * 100)}%`}
                />
              ))}
            </div>
          </div>

          <div className="hidden gap-3 sm:grid sm:grid-cols-3">
            {[
              { icon: ShoppingCart, label: "Nº de pedidos", value: d.orders, color: "var(--accent)", foot: "▲ 28% vs. anterior", tone: "accent" },
              { icon: Tag, label: "Ticket médio", value: d.ticket, money: true, color: "var(--tiktok)", foot: "▼ 2% vs. anterior", tone: "blue" },
              { icon: Truck, label: "Pedidos entregues", value: d.delivered, color: "var(--teal)", foot: `${Math.round((d.delivered / d.orders) * 100)}% das vendas`, tone: "ok" },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-line bg-surface p-4">
                <div className="flex items-center gap-2.5 text-[13px] text-muted">
                  <IconBadge tone={k.tone}>
                    <k.icon />
                  </IconBadge>
                  {k.label}
                </div>
                <div className="mt-3 flex items-end justify-between gap-2">
                  {k.money ? (
                    <Money value={k.value} className="text-[28px] leading-none text-fg" />
                  ) : (
                    <CountUp value={k.value} className="font-display text-[28px] leading-none tracking-tight text-fg" />
                  )}
                  <DotMatrix color={k.color} filled={k.value % 7} />
                </div>
                <div className="mt-2 text-[11px] text-faint">{k.foot}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

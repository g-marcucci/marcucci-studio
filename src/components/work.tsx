"use client";

import { MessageCircle, Percent, Phone, RefreshCw, ShoppingCart, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { brl } from "@/lib/site";
import { CountUp, IconBadge, LeaderRow, Money, Reveal, SectionLabel, TickGauge } from "./ui";

// Telas do ERP recriadas em código com dados fictícios.

function Segmented({ parts }: { parts: { color: string; value: number }[] }) {
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

function ClientsScreen() {
  const tiers = [
    { name: "Fiéis", hint: "Três compras ou mais, a última nos últimos 90 dias.", value: 312, color: "var(--ok)" },
    { name: "Recorrentes", hint: "Duas compras, a última nos últimos 90 dias.", value: 689, color: "var(--tiktok)" },
    { name: "Novos", hint: "Primeira compra nos últimos 90 dias.", value: 8_940, color: "var(--teal)" },
    { name: "Esfriando", hint: "Compravam, mas a última foi entre 91 e 180 dias.", value: 214, color: "var(--amber)" },
    { name: "Inativos", hint: "Sem comprar há mais de 180 dias.", value: 157, color: "var(--nuvem)" },
  ];
  const total = tiers.reduce((s, t) => s + t.value, 0);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-surface md:grid-cols-4">
        {[
          { label: "Total de clientes", value: <CountUp value={total} />, sub: "em toda a base" },
          { label: "Ticket médio", value: <Money value={148.7} />, sub: "por compra" },
          { label: "Valor por cliente", value: <Money value={171.25} />, sub: "gasto total médio" },
          { label: "Compraram 1 vez", value: <CountUp value={9_401} />, sub: "91% dos clientes" },
        ].map((k, i) => (
          <div key={k.label} className={`p-4 ${i ? "border-line md:border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 1 ? "border-l" : ""}`}>
            <div className="text-[12px] text-muted">{k.label}</div>
            <div className="mt-1 font-display text-[26px] tracking-tight text-fg">{k.value}</div>
            <div className="text-[11px] text-faint">{k.sub}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[13px] text-fg">
            <IconBadge>
              <Users />
            </IconBadge>
            Clientes por faixa
          </div>
          <span className="text-[11px] text-faint">unificados por CPF/CNPJ entre marketplaces</span>
        </div>
        <Segmented parts={tiers} />
        <div className="mt-3">
          {tiers.map((t) => (
            <LeaderRow
              key={t.name}
              dot={t.color}
              label={
                <>
                  <span className="font-medium">{t.name}</span>
                  <span className="ml-2 hidden text-[11.5px] text-faint sm:inline">{t.hint}</span>
                </>
              }
              value={t.value.toLocaleString("pt-BR")}
              pct={`${Math.round((t.value / total) * 100)}%`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const CARTS = [
  { item: "Kit 3 camisetas básicas algodão", units: 1, when: "hoje · 12:58", total: 189.9 },
  { item: "Barraca infantil toca cabana", units: 2, when: "ontem · 10:41", total: 259.8 },
  { item: "Garrafa térmica inox 1L + 2 produtos", units: 3, when: "há 2 dias", total: 142.5 },
  { item: "Luminária de mesa articulada", units: 1, when: "há 3 dias", total: 98.4 },
];

function CartsScreen() {
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
            Valor parado em carrinhos
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <Money value={stuck} className="text-[34px] leading-none text-fg" />
            <span className="text-[12px] text-faint">em {CARTS.length - recovered.length} carrinhos</span>
          </div>
          <div className="mt-4 space-y-2.5 text-[11.5px]">
            <div>
              <div className="flex justify-between text-muted">
                <span>Abandonados</span>
                <span className="text-fg">R$ {brl(stuck)}</span>
              </div>
              <motion.div className="mt-1 h-1.5 rounded-full bg-amber" animate={{ width: `${Math.max(2, (stuck / (stuck + back)) * 100)}%` }} />
            </div>
            <div>
              <div className="flex justify-between text-muted">
                <span>Recuperados</span>
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
            Taxa de recuperação
          </div>
          <TickGauge value={rate} label={`${rate}%`} sub="recuperados" size={132} />
          <div className="text-[11px] text-faint">
            {recovered.length} de {CARTS.length} viraram pedido
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="hidden grid-cols-[1fr_110px_100px_150px] gap-3 border-b border-line px-4 py-2 text-[11px] text-faint md:grid">
          <span>Carrinho</span>
          <span>Quando</span>
          <span className="text-right">Total</span>
          <span className="text-right">Situação</span>
        </div>
        {CARTS.map((c, i) => {
          const done = recovered.includes(i);
          return (
            <div
              key={c.item}
              className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-line px-4 py-2.5 last:border-0 md:grid-cols-[1fr_110px_100px_150px]"
            >
              <div className="min-w-0">
                <div className="truncate text-[13px] text-fg">{c.item}</div>
                <div className="text-[11px] text-faint">
                  {c.units} {c.units > 1 ? "unidades" : "unidade"} · com contato
                </div>
              </div>
              <span className="hidden text-[12px] text-muted md:block">{c.when}</span>
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
                      ● Recuperado
                    </motion.span>
                  ) : (
                    <motion.button
                      key="call"
                      type="button"
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => setRecovered((r) => [...r, i])}
                      className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11.5px] text-ok transition-colors hover:bg-[color-mix(in_oklab,var(--ok)_10%,transparent)]"
                    >
                      <Phone className="size-3" /> Chamar de volta
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

function MarginScreen() {
  const gross = 1_048_210.4;
  const parts = [
    { label: "Líquido estimado", value: 786_157.8, color: "var(--ok)" },
    { label: "Tarifas do marketplace", value: 152_990.1, color: "var(--accent)" },
    { label: "Estornos", value: 2_310.5, color: "var(--nuvem)" },
    { label: "Frete pago por você", value: 106_752.0, color: "var(--tiktok)" },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 text-[13px] text-muted">
              <IconBadge tone="ok">
                <Percent />
              </IconBadge>
              Margem estimada
            </div>
            <Money value={parts[0].value} className="mt-4 block text-[38px] leading-none text-fg" />
            <div className="mt-2 text-[12px] text-muted">de R$ {brl(gross)} em vendas (bruto)</div>
          </div>
          <TickGauge value={75} label="75,0%" sub="líquido" size={128} />
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
            { label: "Não pagas", value: 164, sub: "R$ 15.210 que não entraram", dot: "var(--nuvem)" },
            { label: "Aguardando", value: 9, sub: "R$ 1.302 agora", dot: "var(--amber)" },
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
          <span className="font-medium text-fg">A margem desconta tudo:</span> tarifa de cada marketplace, frete e estornos,
          venda por venda, para mostrar o que de fato sobra.
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { id: "clientes", label: "Clientes", Screen: ClientsScreen },
  { id: "carrinhos", label: "Carrinhos abandonados", Screen: CartsScreen },
  { id: "margem", label: "Resultado e margem", Screen: MarginScreen },
] as const;

export function Work() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("carrinhos");
  const Active = TABS.find((t) => t.id === tab)!.Screen;

  return (
    <section id="trabalhos" className="border-t border-line px-5 py-24 md:px-14 md:py-32">
      <Reveal>
        <SectionLabel index="01">Trabalhos</SectionLabel>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-3xl font-display text-[44px] leading-[0.98] tracking-[-0.03em] text-fg md:text-[72px]">
            Trabalho em destaque. <span className="text-faint">Um ERP feito do zero.</span>
          </h2>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-2 text-[12px] text-faint">
            <span className="rounded-full border border-line px-2 py-0.5">Sistema · ERP</span>
            <span className="rounded-full border border-line px-2 py-0.5">2026</span>
          </div>
          <h3 className="mt-4 font-display text-3xl tracking-tight text-fg">ERP multimarketplace</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Gestão de vendas para quem vende no Mercado Livre, Shopee, TikTok Shop e Nuvemshop ao mesmo tempo. Fiz
            tudo, da arquitetura e das integrações ao visual de cada tela.
          </p>
          <ul className="mt-6 space-y-3 text-[14px]">
            {[
              ["4 marketplaces", "pedidos, clientes e anúncios num lugar só"],
              ["Margem real", "depois de tarifas, frete e estornos"],
              ["Base unificada", "o mesmo cliente reconhecido entre canais"],
              ["Carrinhos com contato", "para chamar de volta quem não fechou"],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                <span>
                  <span className="font-medium text-fg">{t}</span> <span className="text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center gap-2 text-[12px] text-faint">
            <MessageCircle className="size-3.5" /> Telas recriadas com dados fictícios. Pode clicar.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <div className="rounded-[22px] border border-line-strong bg-surface-2 p-3 md:p-4">
            <div className="mb-3 flex gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1 text-[12.5px]">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`relative shrink-0 rounded-full px-3.5 py-1.5 transition-colors ${
                    tab === t.id ? "text-bg" : "text-muted hover:text-fg"
                  }`}
                >
                  {tab === t.id && (
                    <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <Active />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

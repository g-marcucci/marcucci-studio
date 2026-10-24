"use client";

import { Activity, ArrowRight, Megaphone, MousePointerClick, Percent, Phone, RefreshCw, ShoppingCart, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { brl, projectHref } from "@/lib/site";
import { Avatar } from "./avatar";
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

const VISITS = Array.from({ length: 30 }, (_, i) =>
  Math.round(4200 + 1500 * Math.sin(i * 0.55) + 900 * Math.sin(i * 1.7 + 1) + i * 25),
);
const TOP_PRODUCTS = [
  { name: "Barraca infantil toca cabana", visits: 9_480, conv: "3,1%" },
  { name: "Rede de vôlei portátil 9,5 m", visits: 7_102, conv: "6,4%" },
  { name: "Kit 3 camisetas básicas algodão", visits: 5_890, conv: "2,2%" },
  { name: "Garrafa térmica inox 1L", visits: 4_975, conv: "4,8%" },
];

function TrafficScreen() {
  const max = Math.max(...VISITS);
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex items-center gap-2.5 text-[13px] text-muted">
          <IconBadge tone="blue">
            <Activity />
          </IconBadge>
          Visitas e conversão
          <span className="ml-auto text-[11px] text-faint">últimos 30 dias</span>
        </div>
        <div className="mt-3 grid gap-4 md:grid-cols-[150px_1fr_1.1fr]">
          <div className="flex flex-col">
            <CountUp value={158_420} className="font-display text-[30px] leading-none tracking-tight text-fg" />
            <span className="mt-1 text-[11px] text-faint">visitas no período</span>
            <div className="mt-auto grid grid-cols-2 gap-2 pt-4 text-[11px]">
              <div>
                <div className="text-faint">Conversão</div>
                <div className="font-medium text-ok">3,2%</div>
              </div>
              <div>
                <div className="text-faint">Vendas</div>
                <div className="font-medium text-fg">5.069</div>
              </div>
            </div>
          </div>
          <div className="flex h-[130px] items-end gap-[3px]">
            {VISITS.map((v, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-t-[2px] bg-tiktok/80"
                initial={{ height: 0 }}
                animate={{ height: `${(v / max) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.015, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <div>
            <div className="mb-1 text-[12px] font-medium text-fg">Mais visitados</div>
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.name} className="flex items-center gap-2 border-b border-line py-1.5 last:border-0">
                <span className="grid size-5 shrink-0 place-items-center rounded-md border border-line font-mono text-[10px] text-faint">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11.5px] text-fg">{p.name}</div>
                  <div className="text-[10px] text-faint">{p.visits.toLocaleString("pt-BR")} visitas</div>
                </div>
                <span className="text-[11px] font-medium text-ok">{p.conv}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center gap-2.5 text-[13px] text-muted">
            <IconBadge tone="red">
              <Megaphone />
            </IconBadge>
            Publicidade
          </div>
          <Money value={34_910.2} className="mt-3 block text-[32px] leading-none text-fg" />
          <div className="mt-1 text-[11.5px] text-muted">investidos no período</div>
          <div className="mt-3 text-[13px] font-medium text-ok">R$ 446.870,15 em vendas atribuídas aos anúncios</div>
        </div>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
          {[
            ["ROAS", "12,8×"],
            ["ACOS", "7,8%"],
            ["TACoS", "4,1%"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between rounded-xl border border-line bg-surface px-3 py-2">
              <span className="text-[11px] text-faint">{k}</span>
              <span className="font-display text-[17px] tracking-tight text-fg">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const MODULES = [
  {
    id: "clientes",
    icon: Users,
    title: "Clientes",
    text: "O mesmo comprador reconhecido entre canais pelo CPF/CNPJ, separado por faixa de fidelidade.",
    Screen: ClientsScreen,
  },
  {
    id: "carrinhos",
    icon: ShoppingCart,
    title: "Carrinhos abandonados",
    text: "Quem chegou ao checkout e não comprou, com contato para chamar de volta.",
    Screen: CartsScreen,
  },
  {
    id: "resultado",
    icon: Percent,
    title: "Resultado e margem",
    text: "O que sobra de verdade depois de tarifas, frete e estornos, venda por venda.",
    Screen: MarginScreen,
  },
  {
    id: "trafego",
    icon: MousePointerClick,
    title: "Tráfego e anúncios",
    text: "Visitas, conversão e retorno de cada campanha, lado a lado com as vendas.",
    Screen: TrafficScreen,
  },
] as const;

const AUTOPLAY_MS = 9000;

const META = [
  ["Tipo", "Sistema · ERP"],
  ["Ano", "2026"],
  ["Escopo", "Produto, design e código"],
  ["Canais", "Mercado Livre · Shopee · TikTok Shop · Nuvemshop"],
];

export function Work() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const href = projectHref();

  const select = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  // No celular a altura muda entre módulos, então não troca sozinho.
  useEffect(() => {
    if (matchMedia("(max-width: 767px)").matches) setAuto(false);
  }, []);

  return (
    <section id="trabalhos" className="border-t border-line px-5 py-24 md:px-14 md:py-32">
      <Reveal>
        <SectionLabel index="01">Trabalhos</SectionLabel>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted">
              <span className="text-accent">case 01</span> sistema sob medida
            </span>
            <h2 className="mt-4 font-display text-[36px] leading-[0.95] tracking-[-0.035em] text-fg sm:text-[56px] md:text-[80px]">
              ERP multimarketplace
            </h2>
          </div>
          <p className="text-[16px] leading-relaxed text-muted md:text-[17px]">
            Quem vende em quatro marketplaces ao mesmo tempo acaba com quatro painéis e nenhuma visão do todo. Esse ERP
            junta pedidos, clientes, margem e anúncios num lugar só.{" "}
            <span className="text-fg">Fiz tudo, da arquitetura e das integrações ao visual de cada tela.</span>
          </p>
        </div>
        <dl className="mt-10 grid grid-cols-2 border-y border-line md:grid-cols-[0.7fr_0.5fr_1fr_1.8fr]">
          {META.map(([k, v], i) => (
            <div key={k} className={`py-3 pr-4 ${i % 2 ? "border-l border-line pl-4" : i ? "md:border-l md:border-line md:pl-4" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""}`}>
              <dt className="font-mono text-[10.5px] tracking-wide text-faint uppercase">{k}</dt>
              <dd className="mt-1 text-[13.5px] text-fg">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Palco do case: fundo próprio com grid, módulos em linha e a tela em destaque */}
      <Reveal delay={0.05}>
        <div className="relative mt-12 overflow-hidden rounded-[28px] border border-line bg-surface-2/60 p-3 md:p-6 lg:p-8">
          <div
            className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(90%_70%_at_50%_0%,black,transparent_85%)]"
            style={{
              backgroundImage:
                "radial-gradient(70% 55% at 50% 0%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%), linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 32px 32px, 32px 32px",
            }}
            aria-hidden
          />

          <div className="relative -mx-3 flex snap-x gap-2 overflow-x-auto px-3 pb-1 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
            {MODULES.map((m, i) => {
              const on = i === active;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={on}
                  className={`relative flex w-[230px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 md:w-auto ${
                    on
                      ? "border-line-strong bg-surface shadow-[var(--shadow)]"
                      : "border-line bg-surface/50 hover:bg-surface/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`grid size-8 place-items-center rounded-lg transition-colors ${on ? "bg-accent text-white" : "bg-surface-2 text-muted"}`}>
                      <m.icon className="size-4" />
                    </span>
                    <span className={`font-mono text-[11px] ${on ? "text-accent" : "text-faint"}`}>0{i + 1}</span>
                  </div>
                  <div className={`mt-4 text-[15px] font-medium ${on ? "text-fg" : "text-muted"}`}>{m.title}</div>
                  <p className={`mt-1 text-[12.5px] leading-relaxed transition-colors ${on ? "text-muted" : "text-faint"}`}>{m.text}</p>
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-line" />
                  {on && (
                    <span
                      key={`${active}-${auto}`}
                      className="absolute bottom-0 left-0 h-[2px] bg-accent"
                      style={
                        auto
                          ? { animation: `grow ${AUTOPLAY_MS}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }
                          : { width: "100%" }
                      }
                      onAnimationEnd={() => auto && setActive((a) => (a + 1) % MODULES.length)}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            className="relative mx-auto mt-6 max-w-[1060px] md:mt-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden rounded-[18px] border border-line-strong bg-surface-2 shadow-[0_40px_80px_-40px_rgb(20_10_60/0.45),0_0_0_6px_var(--accent-soft)]">
              <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="mx-auto w-full max-w-sm truncate rounded-md bg-surface-2 px-3 py-1 text-center font-mono text-[11px] text-faint">
                  erp.sualoja.com.br/<span className="text-fg">{MODULES[active].id}</span>
                </div>
                <span className="hidden font-mono text-[10.5px] text-faint sm:block">dados fictícios</span>
              </div>
              {/* Todas as telas ocupam a mesma célula: a altura é a da maior, então trocar de módulo não dá pulo. */}
              <div className="grid grid-cols-[minmax(0,1fr)] p-3 md:p-4">
                {MODULES.map((m, i) => (
                  <div
                    key={m.id}
                    className={`[grid-area:1/1] transition-opacity duration-300 ${
                      // No celular só a tela ativa ocupa espaço; do md pra cima todas reservam altura.
                      i === active ? "opacity-100" : "pointer-events-none hidden opacity-0 md:invisible md:block"
                    }`}
                    aria-hidden={i !== active}
                    inert={i !== active}
                  >
                    {i === active ? (
                      <motion.div key={`on-${m.id}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        <m.Screen />
                      </motion.div>
                    ) : (
                      <m.Screen />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-[24px] border border-dashed border-line-strong p-5 md:p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-line bg-surface">
              <Avatar size={30} />
            </span>
            <div>
              <span className="font-mono text-[11px] text-faint">
                <span className="text-accent">case 02</span> · em aberto
              </span>
              <div className="font-display text-[24px] leading-tight tracking-tight text-fg md:text-[30px]">
                O próximo pode ser o seu.
              </div>
            </div>
          </div>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[14px] font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            Começar um projeto <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

"use client";

import {
  Activity,
  ArrowLeft,
  ArrowDownRight,
  Bell,
  Inbox,
  LayoutGrid,
  Link as LinkIcon,
  Megaphone,
  Percent,
  Plug,
  Receipt,
  ShoppingBasket,
  ShoppingCart,
  Star,
  Tag,
  TrendingUp,
  Undo2,
  Upload,
  Users,
  Warehouse,
  Webhook,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { brl } from "@/lib/site";
import { DashboardDemo } from "./dashboard-demo";
import { CartsScreen, ErpWindow, HealthScreen, MarginScreen, MarketScreen, Segmented } from "./erp/screens";
import { CountUp, IconBadge, Money, Reveal, SectionLabel, TickGauge } from "./ui";
import { META } from "./work";

/* ── Abertura ──────────────────────────────────────────────────────────────── */

function CaseHero() {
  return (
    <section className="px-5 pt-12 md:px-14 md:pt-16">
      <a href="/#trabalhos" className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg">
        <ArrowLeft className="size-3.5" /> Trabalhos
      </a>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted">
            <span className="text-accent">case 01</span> sistema sob medida
          </span>
          <h1 className="mt-4 font-display text-[40px] leading-[0.95] tracking-[-0.035em] text-fg sm:text-[60px] md:text-[88px]">
            ERP multimarketplace
          </h1>
        </div>
        <p className="text-[16px] leading-relaxed text-muted md:text-[18px]">
          Um hub para quem vende no Mercado Livre, na Shopee, no TikTok Shop e na Nuvemshop ao mesmo tempo: pedidos,
          clientes, reputação, margem e anúncios num lugar só.{" "}
          <span className="text-fg">Produto, design e código feitos do zero.</span>
        </p>
      </div>
      <dl className="mt-10 grid grid-cols-2 border-y border-line md:grid-cols-[0.7fr_0.5fr_1fr_1.8fr]">
        {META.map(([k, v], i) => (
          <div
            key={k}
            className={`py-3 pr-4 ${i % 2 ? "border-l border-line pl-4" : i ? "md:border-l md:border-line md:pl-4" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""}`}
          >
            <dt className="font-mono text-[10.5px] tracking-wide text-faint uppercase">{k}</dt>
            <dd className="mt-1 text-[13.5px] text-fg">{v}</dd>
          </div>
        ))}
      </dl>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12"
      >
        <DashboardDemo />
        <p className="mt-3 text-center text-[12px] text-faint">Visão geral, recriada com dados fictícios. Troque o período.</p>
      </motion.div>
    </section>
  );
}

/* ── Desafio e solução ─────────────────────────────────────────────────────── */

function Challenge() {
  return (
    <section className="border-t border-line px-5 py-20 md:px-14 md:py-28">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <SectionLabel index="01">O desafio</SectionLabel>
          <h2 className="mt-4 font-display text-[30px] leading-[1.05] tracking-tight text-fg md:text-[40px]">
            Quatro marketplaces, quatro painéis.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            Cada canal mostra pedidos, tarifas e reputação do seu jeito, e nenhum mostra o negócio inteiro: quanto sobrou
            de verdade depois das taxas, quem é o cliente que compra em mais de um lugar, qual conta está perto de perder
            a reputação.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionLabel index="02">A solução</SectionLabel>
          <h2 className="mt-4 font-display text-[30px] leading-[1.05] tracking-tight text-fg md:text-[40px]">
            Um hub organizado pelo que o lojista faz.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            As contas se conectam uma vez e o sistema junta tudo em 19 telas, agrupadas em monitorar, vender e integrar.
            Cada número vem acompanhado do contexto e do próximo passo, para virar decisão e não só relatório.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Mapa do sistema ───────────────────────────────────────────────────────── */

const MAP = [
  {
    group: "Monitorar",
    items: [
      { icon: LayoutGrid, label: "Visão geral", anchor: "visao-geral" },
      { icon: Activity, label: "Saúde da conta", anchor: "saude" },
      { icon: Megaphone, label: "Publicidade" },
      { icon: Bell, label: "Avisos" },
      { icon: Star, label: "Avaliações" },
    ],
  },
  {
    group: "Vendas",
    items: [
      { icon: Receipt, label: "Pedidos" },
      { icon: Users, label: "Clientes" },
      { icon: ShoppingCart, label: "Carrinhos abandonados", anchor: "carrinhos" },
      { icon: Tag, label: "Anúncios" },
      { icon: Warehouse, label: "Full" },
      { icon: Percent, label: "Promoções" },
      { icon: LinkIcon, label: "Páginas de ofertas" },
      { icon: ShoppingBasket, label: "Comprados juntos" },
      { icon: TrendingUp, label: "Inteligência de mercado", anchor: "mercado" },
      { icon: Upload, label: "Pedidos externos" },
      { icon: Inbox, label: "Atendimento" },
      { icon: Undo2, label: "Devoluções" },
    ],
  },
  {
    group: "Integrações",
    items: [
      { icon: Plug, label: "Conexões" },
      { icon: Webhook, label: "Webhooks" },
    ],
  },
];

function SystemMap() {
  return (
    <section className="border-t border-line px-5 py-20 md:px-14 md:py-28">
      <Reveal>
        <SectionLabel index="03">O sistema</SectionLabel>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl font-display text-[36px] leading-[1] tracking-[-0.03em] text-fg md:text-[56px]">
            19 telas, três grupos.
          </h2>
          <p className="max-w-sm text-[14px] leading-relaxed text-muted">
            A barra lateral do ERP, aberta. As marcadas com <span className="text-accent">●</span> estão em destaque
            logo abaixo.
          </p>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-[1fr_1.6fr_1fr]">
        {MAP.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.06}>
            <div className="erp h-full rounded-[20px] border border-line bg-surface p-4 shadow-[var(--shadow)]">
              <div className="flex items-center justify-between px-2 pb-2">
                <span className="text-[11px] font-medium tracking-wide text-faint uppercase">{g.group}</span>
                <span className="font-mono text-[11px] text-faint">{g.items.length}</span>
              </div>
              <div className={g.items.length > 6 ? "grid gap-0.5 sm:grid-cols-2" : "grid gap-0.5"}>
                {g.items.map(({ icon: Icon, label, anchor }) => {
                  const inner = (
                    <>
                      <Icon className={`size-4 shrink-0 ${anchor ? "text-accent" : "text-faint"}`} />
                      <span className="truncate">{label}</span>
                      {anchor && <span className="ml-auto text-[10px] text-accent">●</span>}
                    </>
                  );
                  const cls = "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px]";
                  return anchor ? (
                    <a key={label} href={`#${anchor}`} className={`${cls} bg-accent-soft font-medium text-fg transition-opacity hover:opacity-80`}>
                      {inner}
                    </a>
                  ) : (
                    <div key={label} className={`${cls} text-muted`}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Destaque 01: Visão geral ao vivo ─────────────────────────────────────── */

const INCOMING = [
  { mp: "Mercado Livre", color: "var(--ml)", value: 189.9 },
  { mp: "Shopee", color: "var(--shopee)", value: 74.5 },
  { mp: "Mercado Livre", color: "var(--ml)", value: 312.0 },
  { mp: "TikTok Shop", color: "var(--tiktok)", value: 129.9 },
  { mp: "Nuvemshop", color: "var(--nuvem)", value: 248.4 },
  { mp: "Shopee", color: "var(--shopee)", value: 59.9 },
];

/** Pedidos entrando sozinhos: os números da Visão geral giram a cada pedido. */
function LiveOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setCount((c) => c + 1), 2600);
    return () => clearInterval(id);
  }, [inView]);

  const arrived = Array.from({ length: count }, (_, i) => ({ ...INCOMING[i % INCOMING.length], n: 48213 + i }));
  const total = 1_084_512.3 + arrived.reduce((s, o) => s + o.value, 0);
  const orders = 7_618 + count;

  return (
    <div ref={ref} className="grid gap-3 p-3 md:grid-cols-[1.4fr_1fr] md:p-4">
      <div className="space-y-3">
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center gap-2.5 text-[13px] text-muted">
            <IconBadge>
              <TrendingUp />
            </IconBadge>
            Total de vendas
            <span className="ml-auto flex items-center gap-1.5 text-[11px] text-faint">
              <span className="live-dot size-1.5 rounded-full bg-ok" /> ao vivo
            </span>
          </div>
          <Money value={total} className="mt-4 text-[40px] leading-none text-fg md:text-[52px]" />
          <div className="mt-2 text-[12px] text-muted">últimos 30 dias, todas as lojas</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="text-[12.5px] text-muted">Nº de pedidos</div>
            <CountUp value={orders} className="mt-2 font-display text-[28px] leading-none tracking-tight text-fg" />
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="text-[12.5px] text-muted">Ticket médio</div>
            <Money value={Math.round((total / orders) * 100) / 100} className="mt-2 text-[28px] leading-none text-fg" />
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="text-[13px] font-medium text-fg">Pedidos chegando</div>
        <div className="mt-2 h-[208px] overflow-hidden">
          <AnimatePresence initial={false}>
            {arrived
              .slice(-5)
              .reverse()
              .map((o) => (
                <motion.div
                  key={o.n}
                  layout
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-2.5 border-b border-line py-2 text-[12.5px] last:border-0"
                >
                  <span className="size-2 shrink-0 rounded-full" style={{ background: o.color }} />
                  <span className="text-fg">#{o.n}</span>
                  <span className="truncate text-faint">{o.mp}</span>
                  <span className="ml-auto font-medium tabular-nums text-fg">R$ {brl(o.value)}</span>
                </motion.div>
              ))}
          </AnimatePresence>
          {count === 0 && <p className="pt-6 text-center text-[12px] text-faint">aguardando o próximo pedido…</p>}
        </div>
      </div>
    </div>
  );
}

/* ── Destaques ─────────────────────────────────────────────────────────────── */

const HIGHLIGHTS = [
  {
    id: "visao-geral",
    title: "Visão geral",
    path: "visao-geral",
    text: "O faturamento das quatro lojas somado, com o que pede atenção no topo. Quando entra pedido, os números giram como um odômetro, dígito a dígito, sem recarregar a tela.",
    points: ["Vendas, pedidos e ticket por período e por loja", "Avisos urgentes antes de tudo", "Números que giram quando o valor muda"],
    Screen: LiveOverview,
  },
  {
    id: "saude",
    title: "Saúde da conta",
    path: "saude",
    text: "A reputação de cada conta no termômetro do marketplace, com as métricas que puxam a nota para baixo e o histórico dos últimos 90 dias.",
    points: ["Termômetro com as cinco faixas", "Cada métrica contra o limite do marketplace", "Histórico diário para ver a tendência"],
    Screen: HealthScreen,
  },
  {
    id: "carrinhos",
    title: "Carrinhos abandonados",
    path: "carrinhos",
    text: "Quem chegou ao checkout e não comprou, com o valor parado e o contato para chamar de volta. A taxa de recuperação mostra se o esforço está valendo.",
    points: ["Valor parado e valor recuperado", "Contato de quem desistiu", "Taxa de recuperação no medidor"],
    Screen: CartsScreen,
  },
  {
    id: "resultado",
    title: "Resultado e margem",
    path: "resultado",
    text: "O faturamento bruto engana. Aqui a margem desconta a tarifa de cada marketplace, o frete e os estornos, venda por venda, para mostrar o que de fato sobra.",
    points: ["Líquido estimado sobre o bruto", "Composição dos custos em barra empilhada", "Vendas não pagas separadas das canceladas"],
    Screen: MarginScreen,
  },
  {
    id: "mercado",
    title: "Inteligência de mercado",
    path: "mercado",
    text: "O que vende no nicho do lojista, todo dia: o ranking da categoria, quem subiu e quem caiu, as buscas em alta e onde os produtos dele aparecem.",
    points: ["Mais vendidos e vitrine da categoria", "Movimento de posição em 7 dias", "Buscas em crescimento"],
    Screen: MarketScreen,
  },
];

function Highlights() {
  return (
    <section className="border-t border-line px-5 py-20 md:px-14 md:py-28">
      <Reveal>
        <SectionLabel index="04">Destaques</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-[36px] leading-[1] tracking-[-0.03em] text-fg md:text-[56px]">
          Cinco telas de perto.
        </h2>
      </Reveal>
      <div className="mt-14 space-y-20 md:space-y-28">
        {HIGHLIGHTS.map((h, i) => (
          <div key={h.id} id={h.id} className="grid scroll-mt-28 grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <span className="font-mono text-[12px] text-accent">0{i + 1}</span>
              <h3 className="mt-2 font-display text-[28px] leading-tight tracking-tight text-fg md:text-[34px]">{h.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{h.text}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-4 text-[13.5px]">
                {h.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-fg">
                    <ArrowDownRight className="mt-0.5 size-3.5 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="min-w-0">
              <ErpWindow path={h.path} className="shadow-[0_30px_60px_-40px_rgb(20_10_60/0.45)]">
                {h.id === "visao-geral" ? (
                  <h.Screen />
                ) : (
                  <div className="p-3 md:p-4">
                    <h.Screen />
                  </div>
                )}
              </ErpWindow>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Acabamento ────────────────────────────────────────────────────────────── */

function MiniKpi() {
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <div className="flex items-center gap-2 text-[12px] text-muted">
        <IconBadge>
          <TrendingUp />
        </IconBadge>
        Total de vendas
      </div>
      <div className="mt-2 font-display text-[22px] tracking-tight text-fg">
        <span className="mr-1 text-[10px] text-muted">R$</span>1.084.512<span className="text-[11px] text-faint">,30</span>
      </div>
      <div className="text-[11px] font-medium text-ok">▲ 31%</div>
    </div>
  );
}

const CYCLE = [1284, 9071, 30562, 742, 58164];

function Craft() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setI((n) => (n + 1) % CYCLE.length), 1800);
    return () => clearInterval(id);
  }, [inView]);

  const card = "flex flex-col rounded-[20px] border border-line bg-surface p-5 shadow-[var(--shadow)]";
  return (
    <section className="border-t border-line px-5 py-20 md:px-14 md:py-28">
      <Reveal>
        <SectionLabel index="05">Acabamento</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-[36px] leading-[1] tracking-[-0.03em] text-fg md:text-[56px]">
          Os detalhes que ninguém pede.
        </h2>
      </Reveal>
      <div ref={ref} className="mt-12 grid gap-4 md:grid-cols-3">
        <Reveal className="h-full">
          <div className={`${card} h-full`}>
            <div className="erp grid h-[150px] place-items-center rounded-xl border border-line bg-surface-2">
              <CountUp value={CYCLE[i]} className="font-display text-[48px] tracking-tight text-fg" />
            </div>
            <h3 className="mt-5 text-[17px] font-medium text-fg">Números em odômetro</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
              Cada dígito gira até o novo valor, no sentido certo e com mola. A largura acompanha o algarismo, então o texto
              ao lado não balança.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.06} className="h-full">
          <div className={`${card} h-full`}>
            <div className="grid h-[150px] grid-cols-2 gap-2">
              <div className="erp erp-light flex items-center rounded-xl border border-line bg-surface-2 p-2">
                <div className="w-full">
                  <MiniKpi />
                </div>
              </div>
              <div className="erp erp-dark flex items-center rounded-xl border border-line bg-surface-2 p-2">
                <div className="w-full">
                  <MiniKpi />
                </div>
              </div>
            </div>
            <h3 className="mt-5 text-[17px] font-medium text-fg">Tema escuro de verdade</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
              Cada cor tem a sua versão escura, inclusive as de estado, que precisam continuar legíveis como texto e não só
              como fundo.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="h-full">
          <div className={`${card} h-full`}>
            <div className="erp flex h-[150px] items-center gap-4 rounded-xl border border-line bg-surface-2 px-4">
              <TickGauge value={75} label="75%" sub="margem" size={110} />
              <div className="flex-1 space-y-3">
                <Segmented
                  parts={[
                    { color: "var(--ok)", value: 75 },
                    { color: "var(--accent)", value: 15 },
                    { color: "var(--tiktok)", value: 10 },
                  ]}
                />
                <div className="grid grid-cols-8 gap-[3px]">
                  {Array.from({ length: 32 }, (_, k) => (
                    <span
                      key={k}
                      className="aspect-square rounded-full"
                      style={{ background: 4 - Math.floor(k / 8) <= ((k % 8) * 3) % 5 ? "var(--accent)" : "var(--line-strong)" }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <h3 className="mt-5 text-[17px] font-medium text-fg">Gráficos feitos à mão</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
              Medidores, barras empilhadas e barras de pontos em SVG, sem biblioteca: leves, no tema e com rótulo e número
              sempre ao lado da cor.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CaseErp() {
  return (
    <>
      <CaseHero />
      <Challenge />
      <SystemMap />
      <Highlights />
      <Craft />
    </>
  );
}

"use client";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bell,
  Building2,
  Check,
  EyeOff,
  FileSpreadsheet,
  Inbox,
  KeyRound,
  LayoutGrid,
  Link as LinkIcon,
  Lock,
  Megaphone,
  MessageCircle,
  Percent,
  Plug,
  Receipt,
  RefreshCw,
  ShieldCheck,
  ShoppingBasket,
  ShoppingCart,
  Signature,
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
import { MetaStrip } from "./work";

// Tudo o que esta página descreve vem do próprio sistema (telas, integrações e
// regras de segurança). Os números e nomes nas telas são fictícios.

const SECTION = "border-t border-line px-5 py-20 md:px-14 md:py-28";

function SectionHead({
  index,
  label,
  title,
  text,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  text?: React.ReactNode;
}) {
  return (
    <Reveal>
      <SectionLabel index={index}>{label}</SectionLabel>
      <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-end md:gap-16">
        <h2 className="font-display text-[34px] leading-[1.02] tracking-[-0.03em] text-fg md:text-[52px]">{title}</h2>
        {text && <p className="max-w-md text-[15px] leading-relaxed text-muted md:justify-self-end">{text}</p>}
      </div>
    </Reveal>
  );
}

/* ── Abertura ──────────────────────────────────────────────────────────────── */

const STATS = [
  { value: 8, label: "canais integrados", sub: "marketplaces e loja própria" },
  { value: 19, label: "telas no painel", sub: "em três grupos" },
  { value: 180, label: "dias de vendas", sub: "na análise de comprados juntos" },
  { value: 90, label: "dias, no máximo", sub: "de retenção de dados pessoais" },
];

function CaseHero() {
  return (
    <section className="px-5 pt-12 md:px-14 md:pt-16">
      <a href="/#trabalhos" className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg">
        <ArrowLeft className="size-3.5" /> Trabalhos
      </a>
      <span className="mt-10 flex w-fit items-center gap-2 rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted">
        <span className="text-accent">case 01</span> sistema sob medida
      </span>
      <h1 className="mt-4 font-display text-[40px] leading-[0.95] tracking-[-0.035em] text-fg sm:text-[64px] md:text-[96px]">
        ERP multimarketplace
      </h1>
      <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <p className="max-w-xl text-[17px] leading-relaxed text-muted md:text-[19px]">
          Um hub para quem vende em vários canais ao mesmo tempo. As contas se conectam uma vez e o sistema junta
          pedidos, clientes, reputação, margem, anúncios e atendimento num lugar só.{" "}
          <span className="text-fg">Produto, design e código feitos do zero.</span>
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-7">
          {STATS.map((s) => (
            <div key={s.label} className="border-t border-line pt-3">
              <CountUp value={s.value} className="font-display text-[40px] leading-none tracking-tight text-fg md:text-[48px]" />
              <div className="mt-2 text-[14px] text-fg">{s.label}</div>
              <div className="text-[12.5px] text-faint">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <MetaStrip className="mt-12" />
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
    <section className={SECTION}>
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <SectionLabel index="01">O desafio</SectionLabel>
          <h2 className="mt-5 font-display text-[30px] leading-[1.05] tracking-tight text-fg md:text-[40px]">
            Oito canais, oito painéis.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            Cada canal mostra pedidos, tarifas e reputação do seu jeito, e nenhum mostra o negócio inteiro: quanto sobrou
            de verdade depois das taxas, quem é o cliente que compra em mais de um lugar, qual conta está perto de perder
            a reputação, o que repor antes de faltar.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionLabel index="02">A solução</SectionLabel>
          <h2 className="mt-5 font-display text-[30px] leading-[1.05] tracking-tight text-fg md:text-[40px]">
            Um hub organizado pelo que o lojista faz.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            Por dentro, um modelo único de pedido, produto e estoque, com um adaptador para cada canal. Na tela, 19 telas
            agrupadas em monitorar, vender e integrar. Cada número vem com o contexto e o próximo passo, para virar
            decisão e não só relatório.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Canais ────────────────────────────────────────────────────────────────── */

const CHANNELS = [
  { name: "Mercado Livre", color: "#ffe600", kind: "Marketplace", full: true, covers: ["pedidos", "catálogo", "reputação", "Full", "anúncios pagos", "atendimento"] },
  { name: "Shopee", color: "#ee4d2d", kind: "Marketplace", full: true, covers: ["pedidos", "catálogo", "avaliações", "webhooks"] },
  { name: "Magalu", color: "#0086ff", kind: "Marketplace", covers: ["pedidos", "catálogo", "SAC", "margem", "promoções", "perguntas"] },
  { name: "TikTok Shop", color: "#25f4ee", kind: "Marketplace", covers: ["pedidos", "catálogo", "margem", "devoluções", "promoções", "visitas"] },
  { name: "SHEIN", color: "#9aa0a6", kind: "Marketplace", covers: ["pedidos", "pós-venda", "catálogo"] },
  { name: "Dafiti", color: "#ff6b00", kind: "Marketplace", covers: ["pedidos", "catálogo", "devoluções", "margem", "webhooks"] },
  { name: "Leroy Merlin", color: "#78be20", kind: "Marketplace via Mirakl", covers: ["pedidos", "catálogo", "devoluções", "cupons", "atendimento"] },
  { name: "Nuvemshop", color: "#2c3357", kind: "Loja própria", covers: ["pedidos", "catálogo", "cupons", "carrinhos abandonados"] },
];

function Channels() {
  return (
    <section className={SECTION}>
      <SectionHead
        index="03"
        label="Canais"
        title="Oito canais, um adaptador para cada."
        text="Cada integração conversa com a API do canal e traduz tudo para o mesmo formato. Mercado Livre e Shopee estão completos; os outros seis já leem o que importa e ganham o resto aos poucos."
      />
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CHANNELS.map((c, i) => (
          <Reveal key={c.name} delay={(i % 4) * 0.05} className="h-full">
            <div className="flex h-full flex-col rounded-[18px] border border-line bg-surface p-5 shadow-[var(--shadow)]">
              <div className="flex items-center gap-2.5">
                <span className="size-3 rounded-full ring-1 ring-line-strong" style={{ background: c.color }} />
                <span className="text-[16px] font-medium text-fg">{c.name}</span>
              </div>
              <div className="mt-1 text-[12px] text-faint">{c.kind}</div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.covers.map((t) => (
                  <span key={t} className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[11.5px] text-muted">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-5">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10.5px] ${
                    c.full ? "bg-accent-soft text-accent" : "bg-surface-2 text-muted"
                  }`}
                >
                  <span className={`size-1.5 rounded-full ${c.full ? "bg-accent" : "bg-faint"}`} />
                  {c.full ? "completo" : "leitura"}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Mapa do sistema ───────────────────────────────────────────────────────── */

type MapItem = { icon: typeof LayoutGrid; label: string; sub: string; anchor?: string };

const MAP: { group: string; items: MapItem[] }[] = [
  {
    group: "Monitorar",
    items: [
      { icon: LayoutGrid, label: "Visão geral", sub: "Vendas e pedidos no período", anchor: "visao-geral" },
      { icon: Activity, label: "Saúde da conta", sub: "Como cada marketplace avalia a loja", anchor: "saude" },
      { icon: Megaphone, label: "Publicidade", sub: "Investimento em anúncios e o retorno" },
      { icon: Bell, label: "Avisos", sub: "Comunicados do marketplace para cada conta" },
      { icon: Star, label: "Avaliações", sub: "A nota e o comentário de quem comprou" },
    ],
  },
  {
    group: "Vendas",
    items: [
      { icon: Receipt, label: "Pedidos", sub: "Os pedidos de todos os canais, juntos" },
      { icon: Users, label: "Clientes", sub: "Quem compra, juntado pelo CPF/CNPJ" },
      { icon: ShoppingCart, label: "Carrinhos abandonados", sub: "Quem chegou ao checkout e não comprou", anchor: "carrinhos" },
      { icon: Tag, label: "Anúncios", sub: "O que está publicado, com os selos do canal" },
      { icon: Warehouse, label: "Full", sub: "O estoque no armazém: o que repor e o que sobra" },
      { icon: Percent, label: "Promoções", sub: "As campanhas de cada conta" },
      { icon: LinkIcon, label: "Páginas de ofertas", sub: "Links públicos para mandar na comunidade" },
      { icon: ShoppingBasket, label: "Comprados juntos", sub: "Base para kits, compre junto e cupons" },
      { icon: TrendingUp, label: "Inteligência de mercado", sub: "Onde você está no nicho e quem domina", anchor: "mercado" },
      { icon: Upload, label: "Pedidos externos", sub: "Vendas fora dos canais, por planilha" },
      { icon: Inbox, label: "Atendimento", sub: "As conversas do marketplace no hub" },
      { icon: Undo2, label: "Devoluções", sub: "Reclamações e as devoluções que elas trazem" },
    ],
  },
  {
    group: "Integrações",
    items: [
      { icon: Plug, label: "Conexões", sub: "As contas conectadas a cada loja" },
      { icon: Webhook, label: "Webhooks", sub: "Eventos de pedido para o seu ERP, CRM ou n8n" },
    ],
  },
];

function MapEntry({ item }: { item: MapItem }) {
  const { icon: Icon, label, sub, anchor } = item;
  const body = (
    <>
      <span
        className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg ${anchor ? "bg-accent text-white" : "bg-surface-2 text-muted"}`}
      >
        <Icon className="size-3.5" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-[14px] font-medium text-fg">
          {label}
          {anchor && <span className="rounded-full bg-accent-soft px-1.5 text-[10px] font-medium text-accent">destaque</span>}
        </span>
        <span className="block text-[12.5px] leading-snug text-muted">{sub}</span>
      </span>
    </>
  );
  const cls = "flex gap-3 rounded-xl p-2.5";
  return anchor ? (
    <a href={`#${anchor}`} className={`${cls} transition-colors hover:bg-accent-soft`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function SystemMap() {
  const [monitor, sales, integrations] = MAP;
  const group = (g: (typeof MAP)[number], cols = false) => (
    <div className="erp rounded-[20px] border border-line bg-surface p-3 shadow-[var(--shadow)] md:p-4">
      <div className="flex items-center justify-between px-2.5 pb-2">
        <span className="text-[11px] font-medium tracking-wide text-faint uppercase">{g.group}</span>
        <span className="font-mono text-[11px] text-faint">{g.items.length}</span>
      </div>
      <div className={cols ? "grid gap-0.5 sm:grid-cols-2" : "grid gap-0.5"}>
        {g.items.map((it) => (
          <MapEntry key={it.label} item={it} />
        ))}
      </div>
    </div>
  );
  return (
    <section className={SECTION}>
      <SectionHead
        index="04"
        label="O sistema"
        title="19 telas, três grupos."
        text="A barra lateral do ERP, aberta, com o que cada tela faz. As marcadas como destaque aparecem de perto logo abaixo."
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Reveal className="flex flex-col gap-4">
          {group(monitor)}
          {group(integrations)}
        </Reveal>
        <Reveal delay={0.06}>{group(sales, true)}</Reveal>
      </div>
    </section>
  );
}

/* ── Destaque 01: Visão geral ao vivo ─────────────────────────────────────── */

const INCOMING = [
  { mp: "Mercado Livre", color: "var(--ml)", value: 189.9 },
  { mp: "Shopee", color: "var(--shopee)", value: 74.5 },
  { mp: "Magalu", color: "#0086ff", value: 312.0 },
  { mp: "TikTok Shop", color: "var(--tiktok)", value: 129.9 },
  { mp: "Nuvemshop", color: "var(--nuvem)", value: 248.4 },
  { mp: "Dafiti", color: "#ff6b00", value: 159.9 },
];
const PRELOADED = 3;

/** Pedidos entrando sozinhos: os números da Visão geral giram a cada pedido. */
function LiveOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [count, setCount] = useState(PRELOADED);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setCount((c) => c + 1), 2600);
    return () => clearInterval(id);
  }, [inView]);

  const arrived = Array.from({ length: count }, (_, i) => ({ ...INCOMING[i % INCOMING.length], n: 48210 + i }));
  const total = 1_084_512.3 + arrived.slice(PRELOADED).reduce((s, o) => s + o.value, 0);
  const orders = 7_618 + count - PRELOADED;

  return (
    <div ref={ref} className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
      <div className="space-y-4">
        <div className="rounded-xl border border-line bg-surface p-5">
          <div className="flex items-center gap-2.5 text-[13px] text-muted">
            <IconBadge>
              <TrendingUp />
            </IconBadge>
            Total de vendas
            <span className="ml-auto flex items-center gap-1.5 text-[11px] text-faint">
              <span className="live-dot size-1.5 rounded-full bg-ok" /> ao vivo
            </span>
          </div>
          <Money value={total} className="mt-5 text-[40px] leading-none text-fg md:text-[56px]" />
          <div className="mt-3 text-[12px] text-muted">últimos 30 dias, todas as lojas</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-line bg-surface p-5">
            <div className="text-[12.5px] text-muted">Nº de pedidos</div>
            <CountUp value={orders} className="mt-3 font-display text-[30px] leading-none tracking-tight text-fg" />
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <div className="text-[12.5px] text-muted">Ticket médio</div>
            <Money value={Math.round((total / orders) * 100) / 100} className="mt-3 text-[30px] leading-none text-fg" />
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-line bg-surface p-5">
        <div className="text-[13px] font-medium text-fg">Pedidos chegando</div>
        <div className="mt-3 h-[220px] overflow-hidden">
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
                  className="flex items-center gap-2.5 border-b border-line py-2.5 text-[12.5px] last:border-0"
                >
                  <span className="size-2 shrink-0 rounded-full" style={{ background: o.color }} />
                  <span className="text-fg">#{o.n}</span>
                  <span className="truncate text-faint">{o.mp}</span>
                  <span className="ml-auto font-medium tabular-nums text-fg">R$ {brl(o.value)}</span>
                </motion.div>
              ))}
          </AnimatePresence>
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
    text: "O faturamento de todos os canais somado, com o que pede atenção no topo. Quando entra pedido, os números giram como um odômetro, dígito a dígito, sem recarregar a tela.",
    points: ["por período e por loja", "avisos urgentes primeiro", "números ao vivo"],
    Screen: LiveOverview,
  },
  {
    id: "saude",
    title: "Saúde da conta",
    text: "A reputação de cada conta no termômetro do marketplace, com as métricas que puxam a nota para baixo e o histórico dos últimos 90 dias.",
    points: ["termômetro de cinco faixas", "métrica contra o limite", "histórico diário"],
    Screen: HealthScreen,
  },
  {
    id: "carrinhos",
    title: "Carrinhos abandonados",
    text: "Quem chegou ao checkout da loja e não comprou, com o valor parado e o contato para chamar de volta. A taxa de recuperação mostra se o esforço está valendo.",
    points: ["valor parado e recuperado", "contato de quem desistiu", "taxa de recuperação"],
    Screen: CartsScreen,
  },
  {
    id: "resultado",
    title: "Resultado e margem",
    text: "O faturamento bruto engana. A margem desconta a tarifa de cada canal, o frete e os estornos, venda por venda, para mostrar o que de fato sobra.",
    points: ["líquido sobre o bruto", "composição dos custos", "não pagas à parte"],
    Screen: MarginScreen,
  },
  {
    id: "mercado",
    title: "Inteligência de mercado",
    text: "Os mais vendidos de cada categoria acompanhada, lidos todo dia: onde os produtos do lojista aparecem, quem subiu e quem caiu e as buscas em alta.",
    points: ["ranking diário", "movimento em 7 dias", "buscas em alta"],
    Screen: MarketScreen,
  },
];

function Highlights() {
  return (
    <section className={SECTION}>
      <SectionHead index="05" label="Destaques" title="Cinco telas de perto." text="Recriadas com dados fictícios e interativas: troque abas, chame carrinhos de volta, veja os pedidos chegando." />
      <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
        {HIGHLIGHTS.map((h, i) => (
          <div key={h.id} id={h.id} className="scroll-mt-28">
            <Reveal>
              <div className="grid gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-end md:gap-16">
                <div>
                  <span className="font-mono text-[12px] text-accent">0{i + 1} / 05</span>
                  <h3 className="mt-2 font-display text-[30px] leading-tight tracking-tight text-fg md:text-[40px]">{h.title}</h3>
                </div>
                <div>
                  <p className="text-[15.5px] leading-relaxed text-muted">{h.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {h.points.map((p) => (
                      <span key={p} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[12.5px] text-fg">
                        <Check className="size-3 text-accent" />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="mt-8 min-w-0 md:mt-10">
              <ErpWindow path={h.id} className="shadow-[0_30px_60px_-40px_rgb(20_10_60/0.45)]">
                <div className="p-4 md:p-6">
                  <h.Screen />
                </div>
              </ErpWindow>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Mais módulos (mini-telas) ─────────────────────────────────────────────── */

function MiniBasket() {
  return (
    <div className="space-y-2">
      {[
        { a: "Barraca infantil", b: "Colchão inflável", lift: "2,4×", n: 38 },
        { a: "Lanterna 3 un.", b: "Pilhas recarregáveis", lift: "3,1×", n: 21 },
      ].map((p) => (
        <div key={p.a} className="rounded-lg border border-line bg-surface p-2.5">
          <div className="flex items-center gap-1.5 text-[11.5px] text-fg">
            {p.a} <span className="text-faint">+</span> {p.b}
          </div>
          <div className="mt-1 flex items-center gap-2 text-[10.5px] text-muted">
            <span className="rounded-full bg-accent-soft px-1.5 font-medium text-accent">lift {p.lift}</span>
            {p.n} pedidos juntos
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniFull() {
  return (
    <div className="space-y-1.5 text-[11.5px]">
      {[
        { sku: "Barraca iglu 4p", tone: "var(--nuvem)", label: "Urgente", note: "repor até sexta" },
        { sku: "Colchão casal", tone: "var(--amber)", label: "Esta semana", note: "12 dias de estoque" },
        { sku: "Cadeira de praia", tone: "var(--tiktok)", label: "Excedente", note: "sobra de 40 un." },
      ].map((r) => (
        <div key={r.sku} className="flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5">
          <span className="truncate text-fg">{r.sku}</span>
          <span className="ml-auto shrink-0 rounded-full px-1.5 text-[10px] font-medium" style={{ color: r.tone, background: `color-mix(in oklab, ${r.tone} 14%, transparent)` }}>
            {r.label}
          </span>
        </div>
      ))}
      <div className="px-1 text-[10.5px] text-faint">3 unidades travadas: avariadas</div>
    </div>
  );
}

function MiniListing() {
  return (
    <div className="rounded-lg border border-line bg-surface p-2.5">
      <div className="flex gap-2.5">
        <span className="size-10 shrink-0 rounded-md bg-surface-2" />
        <div className="min-w-0">
          <div className="truncate text-[11.5px] text-fg">Barraca infantil toca cabana</div>
          <div className="text-[10.5px] text-faint">R$ 129,90 · 84 em estoque</div>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {[
          ["vitrine do catálogo", "var(--ok)"],
          ["preço acima da concorrência", "var(--amber)"],
          ["cadastro 92/100", "var(--accent)"],
          ["moderação ok", "var(--ok)"],
        ].map(([t, c]) => (
          <span key={t} className="rounded-full px-1.5 py-0.5 text-[10px] font-medium" style={{ color: c, background: `color-mix(in oklab, ${c} 13%, transparent)` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function MiniWebhook() {
  return (
    <div className="rounded-lg bg-[#121016] p-3 font-mono text-[10px] leading-relaxed text-white/70">
      <div className="text-white/40">POST https://seu-erp.com/pedidos</div>
      <div>
        <span className="text-[#d4ff4a]">X-Lemund-Signature</span>: sha256=9f2c…
      </div>
      <div className="mt-1.5">{"{"}</div>
      <div className="pl-3">
        <span className="text-[#b7a6ff]">&quot;event&quot;</span>: &quot;order.paid&quot;,
      </div>
      <div className="pl-3">
        <span className="text-[#b7a6ff]">&quot;store&quot;</span>: &quot;mercado_livre&quot;,
      </div>
      <div className="pl-3">
        <span className="text-[#b7a6ff]">&quot;total&quot;</span>: 189.9
      </div>
      <div>{"}"}</div>
    </div>
  );
}

function MiniPromoPage() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-line bg-surface p-2.5">
        <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-accent">
          <LinkIcon className="size-3" /> ofertas.sualoja.com/camping
        </div>
        <div className="mt-1.5 flex gap-3 text-[10.5px] text-muted">
          <span>
            <span className="font-medium text-fg">1.284</span> visitas
          </span>
          <span>
            <span className="font-medium text-fg">312</span> cliques
          </span>
          <span className="text-ok">● no ar</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1.5 rounded-lg bg-[#25d366] py-1.5 text-[11px] font-medium text-white">
        <MessageCircle className="size-3.5" /> Enviar para o grupo
      </div>
    </div>
  );
}

function MiniInbox() {
  return (
    <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-1.5">
      <div className="space-y-1">
        {["Ana · pedido #4821", "Bruno · troca", "Carla · prazo"].map((c, i) => (
          <div key={c} className={`truncate rounded-md px-2 py-1.5 text-[10.5px] ${i === 0 ? "bg-accent-soft text-fg" : "text-muted"}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="space-y-1.5 rounded-md border border-line bg-surface p-2">
        <div className="w-fit max-w-full rounded-lg bg-surface-2 px-2 py-1 text-[10px] text-fg">Chega até sábado?</div>
        <div className="ml-auto w-fit max-w-full rounded-lg bg-accent px-2 py-1 text-[10px] text-white">Sai hoje, chega sexta!</div>
      </div>
    </div>
  );
}

function MiniReturns() {
  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {[
          ["Aguardando você", 3, true],
          ["Em andamento", 7, false],
          ["Encerradas", 41, false],
        ].map(([t, n, on]) => (
          <span key={t as string} className={`rounded-full px-2 py-0.5 text-[10.5px] ${on ? "bg-fg text-bg" : "border border-line text-muted"}`}>
            {t} <span className="opacity-60">{n}</span>
          </span>
        ))}
      </div>
      <div className="mt-2 space-y-1.5">
        {["Não recebi o produto", "Produto diferente do anúncio"].map((r) => (
          <div key={r} className="flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[11px] text-fg">
            {r}
            <span className="ml-auto text-[10px] text-amber">conta na reputação</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniUpload() {
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <div className="grid place-items-center rounded-lg border border-dashed border-line-strong py-3 text-[11px] text-muted">
        <FileSpreadsheet className="mb-1 size-5 text-ok" />
        vendas-loja-fisica.xlsx
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-ok">
        <Check className="size-3.5" /> 128 vendas importadas para a Visão geral
      </div>
    </div>
  );
}

const MODULES = [
  { title: "Comprados juntos", text: "Quem compra um produto também leva outro: base para kits, compre junto e cupons.", Mini: MiniBasket },
  { title: "Full", text: "O estoque no armazém do marketplace: o que repor, até quando, e o que está travado.", Mini: MiniFull },
  { title: "Anúncios", text: "Os sinais do canal sobre cada anúncio: moderação, vitrine, preço e qualidade do cadastro.", Mini: MiniListing },
  { title: "Webhooks", text: "Cada pedido pago vira um evento assinado para o ERP, o CRM, o emissor de nota ou o n8n.", Mini: MiniWebhook },
  { title: "Páginas de ofertas", text: "Um link público com as ofertas de uma promoção, enviado direto para o grupo do WhatsApp.", Mini: MiniPromoPage },
  { title: "Atendimento", text: "As conversas do marketplace dentro do hub, com lista e conversa lado a lado.", Mini: MiniInbox },
  { title: "Devoluções", text: "Reclamações separadas pelo que pede ação agora, com o aviso do que conta na reputação.", Mini: MiniReturns },
  { title: "Pedidos externos", text: "Vendas fora dos canais conectados, por planilha, para o faturamento contar inteiro.", Mini: MiniUpload },
];

function MoreModules() {
  return (
    <section className={SECTION}>
      <SectionHead
        index="06"
        label="E mais"
        title="O resto do sistema, em resumo."
        text="Outras oito telas que fazem parte do dia a dia: estoque, catálogo, integrações com outros sistemas, atendimento e o que acontece fora dos canais."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map(({ title, text, Mini }, i) => (
          <Reveal key={title} delay={(i % 4) * 0.05} className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-surface shadow-[var(--shadow)]">
              <div className="erp h-[168px] overflow-hidden border-b border-line bg-surface-2 p-3.5">
                <Mini />
              </div>
              <div className="p-5">
                <h3 className="text-[16px] font-medium text-fg">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Por baixo do capô ─────────────────────────────────────────────────────── */

const LAYERS = [
  { title: "Painel", tech: "React · Vite", text: "As 19 telas, nos temas claro e escuro." },
  { title: "API", tech: "NestJS · TypeScript", text: "Resolve a loja, as permissões e orquestra tudo." },
  { title: "Filas", tech: "Redis · BullMQ", text: "Importações, leituras diárias e eventos em segundo plano." },
  { title: "Adaptadores", tech: "um por canal", text: "Traduzem cada API para o mesmo modelo de pedido e produto." },
];

const SAFEGUARDS = [
  { icon: Lock, title: "Credenciais cifradas", text: "Os acessos aos canais ficam cifrados (AES-256-GCM) e só abrem na memória, na hora do uso." },
  { icon: Building2, title: "Cada loja isolada", text: "Todo dado tem dono e toda consulta é filtrada pela loja. Esquecer o filtro é difícil, não fácil." },
  { icon: EyeOff, title: "LGPD no desenho", text: "Os dados do comprador ficam separados do pedido, cifrados e são apagados em até 90 dias." },
  { icon: KeyRound, title: "Login em duas etapas", text: "2FA por aplicativo, com códigos de recuperação para não perder o acesso." },
  { icon: Signature, title: "Eventos assinados", text: "Os webhooks saem com assinatura HMAC, para quem recebe confirmar que vieram do hub." },
  { icon: RefreshCw, title: "Sem pedido duplicado", text: "Evento repetido do marketplace não vira pedido em dobro: o processamento é idempotente." },
];

const STACK = ["TypeScript", "React", "Vite", "NestJS", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Docker", "Vitest"];

function UnderTheHood() {
  return (
    <section className={SECTION}>
      <SectionHead
        index="07"
        label="Por baixo do capô"
        title="Feito para crescer canal a canal."
        text="Nenhuma regra de negócio conhece um marketplace específico: canal novo é um adaptador novo, sem mexer no resto."
      />
      <Reveal className="mt-12">
        <div className="grid gap-3 rounded-[24px] border border-line bg-surface-2/60 p-3 md:grid-cols-4 md:p-4">
          {LAYERS.map((l, i) => (
            <div key={l.title} className="relative rounded-2xl border border-line bg-surface p-5">
              <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
              <div className="mt-3 text-[17px] font-medium text-fg">{l.title}</div>
              <div className="font-mono text-[11.5px] text-accent">{l.tech}</div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{l.text}</p>
              {i < LAYERS.length - 1 && (
                <span className="absolute top-1/2 -right-[13px] z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-faint md:grid">
                  <ArrowRight className="size-3" />
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
          <span className="font-mono text-[11px] text-faint">stack</span>
          {STACK.map((t) => (
            <span key={t} className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-muted">
              {t}
            </span>
          ))}
        </div>
      </Reveal>
      <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {SAFEGUARDS.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.05}>
            <div className="flex gap-4 border-t border-line pt-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="size-4" />
              </span>
              <div>
                <h3 className="text-[15.5px] font-medium text-fg">{title}</h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          </Reveal>
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

  const card = "flex h-full flex-col rounded-[20px] border border-line bg-surface p-5 shadow-[var(--shadow)]";
  return (
    <section className={SECTION}>
      <SectionHead index="08" label="Acabamento" title="Os detalhes que ninguém pede." />
      <div ref={ref} className="mt-12 grid gap-4 md:grid-cols-3">
        <Reveal className="h-full">
          <div className={card}>
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
          <div className={card}>
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
          <div className={card}>
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
      <Reveal className="mt-4">
        <div className="flex items-start gap-3 rounded-[20px] border border-line bg-surface px-5 py-4 text-[13.5px] leading-relaxed text-muted">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
          <span>
            Telas &quot;só leitura&quot; dizem isso no subtítulo, e vendas e clientes trazem um &quot;como é contado&quot; ao lado dos
            números. Nome de tela que promete o que não faz é tratado como erro.
          </span>
        </div>
      </Reveal>
    </section>
  );
}

export function CaseErp() {
  return (
    <>
      <CaseHero />
      <Challenge />
      <Channels />
      <SystemMap />
      <Highlights />
      <MoreModules />
      <UnderTheHood />
      <Craft />
    </>
  );
}

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
import { HOME, useLocale, useT, type Text, type Tr } from "@/lib/i18n";
import { brl } from "@/lib/site";
import { DashboardDemo } from "./dashboard-demo";
import { CartsScreen, ErpWindow, HealthScreen, MarginScreen, MarketScreen, Segmented } from "./erp/screens";
import { CountUp, IconBadge, Money, Reveal, SectionLabel, TickGauge } from "./ui";
import { ERP_PATHS, MetaStrip } from "./work";

// Tudo o que esta página descreve vem do próprio sistema (telas, integrações e
// regras de segurança). Os números e nomes nas telas são fictícios.

const SECTION = "border-t border-line px-5 py-20 md:px-14 md:py-28";

function SectionHead({ index, label, title, text }: { index: string; label: Tr; title: Tr; text?: Tr }) {
  const t = useT();
  return (
    <Reveal>
      <SectionLabel index={index}>{t(label)}</SectionLabel>
      <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-end md:gap-16">
        <h2 className="font-display text-[34px] leading-[1.02] tracking-[-0.03em] text-fg md:text-[52px]">{t(title)}</h2>
        {text && <p className="max-w-md text-[15px] leading-relaxed text-muted md:justify-self-end">{t(text)}</p>}
      </div>
    </Reveal>
  );
}

/* ── Abertura ──────────────────────────────────────────────────────────────── */

const STATS: { value: number; label: Tr; sub: Tr }[] = [
  {
    value: 8,
    label: { en: "channels integrated", pt: "canais integrados", es: "canales integrados" },
    sub: { en: "marketplaces and own store", pt: "marketplaces e loja própria", es: "marketplaces y tienda propia" },
  },
  {
    value: 19,
    label: { en: "screens in the panel", pt: "telas no painel", es: "pantallas en el panel" },
    sub: { en: "in three groups", pt: "em três grupos", es: "en tres grupos" },
  },
  {
    value: 180,
    label: { en: "days of sales", pt: "dias de vendas", es: "días de ventas" },
    sub: { en: "in the bought-together analysis", pt: "na análise de comprados juntos", es: "en el análisis de comprados juntos" },
  },
  {
    value: 90,
    label: { en: "days, at most", pt: "dias, no máximo", es: "días, como máximo" },
    sub: { en: "of personal data retention", pt: "de retenção de dados pessoais", es: "de retención de datos personales" },
  },
];

function CaseHero() {
  const t = useT();
  const { locale } = useLocale();
  return (
    <section className="px-5 pt-12 md:px-14 md:pt-16">
      <a href={`${HOME[locale]}#work`} className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg">
        <ArrowLeft className="size-3.5" /> {t({ en: "Work", pt: "Trabalhos", es: "Trabajos" })}
      </a>
      <span className="mt-10 flex w-fit items-center gap-2 rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted">
        <span className="text-accent">case 01</span> {t({ en: "custom system", pt: "sistema sob medida", es: "sistema a medida" })}
      </span>
      <h1 className="mt-4 font-display text-[40px] leading-[0.95] tracking-[-0.035em] text-fg sm:text-[64px] md:text-[96px]">
        {t({ en: "Multi-marketplace ERP", pt: "ERP multimarketplace", es: "ERP multimarketplace" })}
      </h1>
      <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <p className="max-w-xl text-[17px] leading-relaxed text-muted md:text-[19px]">
          {t({
            en: "A hub for sellers on several channels at once. Accounts connect once and the system brings orders, customers, reputation, margin, listings and customer service together in one place.",
            pt: "Um hub para quem vende em vários canais ao mesmo tempo. As contas se conectam uma vez e o sistema junta pedidos, clientes, reputação, margem, anúncios e atendimento num lugar só.",
            es: "Un hub para quien vende en varios canales a la vez. Las cuentas se conectan una vez y el sistema reúne pedidos, clientes, reputación, margen, publicaciones y atención en un solo lugar.",
          })}{" "}
          <span className="text-fg">
            {t({ en: "Product, design and code built from scratch.", pt: "Produto, design e código feitos do zero.", es: "Producto, diseño y código hechos desde cero." })}
          </span>
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-7">
          {STATS.map((s) => (
            <div key={s.label.en} className="border-t border-line pt-3">
              <CountUp value={s.value} className="font-display text-[40px] leading-none tracking-tight text-fg md:text-[48px]" />
              <div className="mt-2 text-[14px] text-fg">{t(s.label)}</div>
              <div className="text-[12.5px] text-faint">{t(s.sub)}</div>
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
        <p className="mt-3 text-center text-[12px] text-faint">
          {t({
            en: "The overview, recreated with sample data. Try changing the period.",
            pt: "Visão geral, recriada com dados fictícios. Troque o período.",
            es: "El resumen, recreado con datos ficticios. Cambia el período.",
          })}
        </p>
      </motion.div>
    </section>
  );
}

/* ── Desafio e solução ─────────────────────────────────────────────────────── */

function Challenge() {
  const t = useT();
  return (
    <section className={SECTION}>
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <SectionLabel index="01">{t({ en: "The challenge", pt: "O desafio", es: "El desafío" })}</SectionLabel>
          <h2 className="mt-5 font-display text-[30px] leading-[1.05] tracking-tight text-fg md:text-[40px]">
            {t({ en: "Eight channels, eight dashboards.", pt: "Oito canais, oito painéis.", es: "Ocho canales, ocho paneles." })}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            {t({
              en: "Each channel shows orders, fees and reputation its own way, and none of them shows the whole business: what's really left after fees, which customer buys in more than one place, which account is close to losing its reputation, what to restock before it runs out.",
              pt: "Cada canal mostra pedidos, tarifas e reputação do seu jeito, e nenhum mostra o negócio inteiro: quanto sobrou de verdade depois das taxas, quem é o cliente que compra em mais de um lugar, qual conta está perto de perder a reputação, o que repor antes de faltar.",
              es: "Cada canal muestra pedidos, tarifas y reputación a su manera, y ninguno muestra el negocio completo: cuánto quedó de verdad después de las comisiones, qué cliente compra en más de un lugar, qué cuenta está cerca de perder la reputación, qué reponer antes de que falte.",
            })}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionLabel index="02">{t({ en: "The solution", pt: "A solução", es: "La solución" })}</SectionLabel>
          <h2 className="mt-5 font-display text-[30px] leading-[1.05] tracking-tight text-fg md:text-[40px]">
            {t({
              en: "A hub organized around what the seller does.",
              pt: "Um hub organizado pelo que o lojista faz.",
              es: "Un hub organizado según lo que hace el vendedor.",
            })}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            {t({
              en: "Inside, a single model for orders, products and stock, with one adapter per channel. On screen, 19 screens grouped into monitor, sell and integrate. Every number comes with context and the next step, so it turns into a decision, not just a report.",
              pt: "Por dentro, um modelo único de pedido, produto e estoque, com um adaptador para cada canal. Na tela, 19 telas agrupadas em monitorar, vender e integrar. Cada número vem com o contexto e o próximo passo, para virar decisão e não só relatório.",
              es: "Por dentro, un modelo único de pedido, producto y stock, con un adaptador por canal. En pantalla, 19 pantallas agrupadas en monitorear, vender e integrar. Cada número viene con el contexto y el siguiente paso, para que sea una decisión y no solo un informe.",
            })}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Canais ────────────────────────────────────────────────────────────────── */

const MARKETPLACE: Tr = { en: "Marketplace", pt: "Marketplace", es: "Marketplace" };
const ORDERS: Tr = { en: "orders", pt: "pedidos", es: "pedidos" };
const CATALOG: Tr = { en: "catalog", pt: "catálogo", es: "catálogo" };
const RETURNS: Tr = { en: "returns", pt: "devoluções", es: "devoluciones" };
const MARGIN: Tr = { en: "margin", pt: "margem", es: "margen" };
const PROMOS: Tr = { en: "promotions", pt: "promoções", es: "promociones" };
const SUPPORT: Tr = { en: "customer service", pt: "atendimento", es: "atención" };
const COUPONS: Tr = { en: "coupons", pt: "cupons", es: "cupones" };

const CHANNELS: { name: string; color: string; kind: Tr; full?: boolean; covers: Text[] }[] = [
  {
    name: "Mercado Livre",
    color: "#ffe600",
    kind: MARKETPLACE,
    full: true,
    covers: [ORDERS, CATALOG, { en: "reputation", pt: "reputação", es: "reputación" }, "Full", { en: "paid ads", pt: "anúncios pagos", es: "anuncios pagos" }, SUPPORT],
  },
  { name: "Shopee", color: "#ee4d2d", kind: MARKETPLACE, full: true, covers: [ORDERS, CATALOG, { en: "reviews", pt: "avaliações", es: "reseñas" }, "webhooks"] },
  { name: "Magalu", color: "#0086ff", kind: MARKETPLACE, covers: [ORDERS, CATALOG, { en: "support desk", pt: "SAC", es: "SAC" }, MARGIN, PROMOS, { en: "questions", pt: "perguntas", es: "preguntas" }] },
  { name: "TikTok Shop", color: "#25f4ee", kind: MARKETPLACE, covers: [ORDERS, CATALOG, MARGIN, RETURNS, PROMOS, { en: "visits", pt: "visitas", es: "visitas" }] },
  { name: "SHEIN", color: "#9aa0a6", kind: MARKETPLACE, covers: [ORDERS, { en: "after-sales", pt: "pós-venda", es: "posventa" }, CATALOG] },
  { name: "Dafiti", color: "#ff6b00", kind: MARKETPLACE, covers: [ORDERS, CATALOG, RETURNS, MARGIN, "webhooks"] },
  {
    name: "Leroy Merlin",
    color: "#78be20",
    kind: { en: "Marketplace via Mirakl", pt: "Marketplace via Mirakl", es: "Marketplace vía Mirakl" },
    covers: [ORDERS, CATALOG, RETURNS, COUPONS, SUPPORT],
  },
  {
    name: "Nuvemshop",
    color: "#2c3357",
    kind: { en: "Own store", pt: "Loja própria", es: "Tienda propia" },
    covers: [ORDERS, CATALOG, COUPONS, { en: "abandoned carts", pt: "carrinhos abandonados", es: "carritos abandonados" }],
  },
];

function Channels() {
  const t = useT();
  return (
    <section className={SECTION}>
      <SectionHead
        index="03"
        label={{ en: "Channels", pt: "Canais", es: "Canales" }}
        title={{ en: "Eight channels, one adapter each.", pt: "Oito canais, um adaptador para cada.", es: "Ocho canales, un adaptador para cada uno." }}
        text={{
          en: "Each integration talks to the channel's API and translates everything into the same format. Mercado Livre and Shopee are complete; the other six already read what matters and gain the rest over time.",
          pt: "Cada integração conversa com a API do canal e traduz tudo para o mesmo formato. Mercado Livre e Shopee estão completos; os outros seis já leem o que importa e ganham o resto aos poucos.",
          es: "Cada integración habla con la API del canal y traduce todo al mismo formato. Mercado Livre y Shopee están completos; los otros seis ya leen lo que importa y suman el resto de a poco.",
        }}
      />
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CHANNELS.map((c, i) => (
          <Reveal key={c.name} delay={(i % 4) * 0.05} className="h-full">
            <div className="flex h-full flex-col rounded-[18px] border border-line bg-surface p-5 shadow-[var(--shadow)]">
              <div className="flex items-center gap-2.5">
                <span className="size-3 rounded-full ring-1 ring-line-strong" style={{ background: c.color }} />
                <span className="text-[16px] font-medium text-fg">{c.name}</span>
              </div>
              <div className="mt-1 text-[12px] text-faint">{t(c.kind)}</div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.covers.map((cover) => (
                  <span key={t(cover)} className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[11.5px] text-muted">
                    {t(cover)}
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
                  {c.full ? t({ en: "complete", pt: "completo", es: "completo" }) : t({ en: "read", pt: "leitura", es: "lectura" })}
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

type MapItem = { icon: typeof LayoutGrid; label: Tr; sub: Tr; anchor?: string };

const MAP: { group: Tr; items: MapItem[] }[] = [
  {
    group: { en: "Monitor", pt: "Monitorar", es: "Monitorear" },
    items: [
      {
        icon: LayoutGrid,
        label: { en: "Overview", pt: "Visão geral", es: "Resumen" },
        sub: { en: "Sales and orders in the period", pt: "Vendas e pedidos no período", es: "Ventas y pedidos en el período" },
        anchor: "overview",
      },
      {
        icon: Activity,
        label: { en: "Account health", pt: "Saúde da conta", es: "Salud de la cuenta" },
        sub: { en: "How each marketplace rates the store", pt: "Como cada marketplace avalia a loja", es: "Cómo cada marketplace evalúa la tienda" },
        anchor: "health",
      },
      {
        icon: Megaphone,
        label: { en: "Advertising", pt: "Publicidade", es: "Publicidad" },
        sub: { en: "Ad spend and its return", pt: "Investimento em anúncios e o retorno", es: "Inversión en anuncios y su retorno" },
      },
      {
        icon: Bell,
        label: { en: "Notices", pt: "Avisos", es: "Avisos" },
        sub: { en: "Marketplace notices for each account", pt: "Comunicados do marketplace para cada conta", es: "Comunicados del marketplace para cada cuenta" },
      },
      {
        icon: Star,
        label: { en: "Reviews", pt: "Avaliações", es: "Reseñas" },
        sub: { en: "Rating and comment from buyers", pt: "A nota e o comentário de quem comprou", es: "La nota y el comentario de quien compró" },
      },
    ],
  },
  {
    group: { en: "Sales", pt: "Vendas", es: "Ventas" },
    items: [
      {
        icon: Receipt,
        label: { en: "Orders", pt: "Pedidos", es: "Pedidos" },
        sub: { en: "Orders from every channel, together", pt: "Os pedidos de todos os canais, juntos", es: "Los pedidos de todos los canales, juntos" },
      },
      {
        icon: Users,
        label: { en: "Customers", pt: "Clientes", es: "Clientes" },
        sub: { en: "Who buys, matched by tax ID", pt: "Quem compra, juntado pelo CPF/CNPJ", es: "Quién compra, unificado por documento" },
      },
      {
        icon: ShoppingCart,
        label: { en: "Abandoned carts", pt: "Carrinhos abandonados", es: "Carritos abandonados" },
        sub: { en: "Who reached checkout and didn't buy", pt: "Quem chegou ao checkout e não comprou", es: "Quién llegó al checkout y no compró" },
        anchor: "carts",
      },
      {
        icon: Tag,
        label: { en: "Listings", pt: "Anúncios", es: "Publicaciones" },
        sub: { en: "What's published, with the channel's badges", pt: "O que está publicado, com os selos do canal", es: "Lo publicado, con los sellos del canal" },
      },
      {
        icon: Warehouse,
        label: { en: "Fulfillment", pt: "Full", es: "Full" },
        sub: { en: "Warehouse stock: what to restock, what's left over", pt: "O estoque no armazém: o que repor e o que sobra", es: "El stock en el depósito: qué reponer y qué sobra" },
      },
      {
        icon: Percent,
        label: { en: "Promotions", pt: "Promoções", es: "Promociones" },
        sub: { en: "Each account's campaigns", pt: "As campanhas de cada conta", es: "Las campañas de cada cuenta" },
      },
      {
        icon: LinkIcon,
        label: { en: "Deal pages", pt: "Páginas de ofertas", es: "Páginas de ofertas" },
        sub: { en: "Public links to share with the community", pt: "Links públicos para mandar na comunidade", es: "Enlaces públicos para enviar a la comunidad" },
      },
      {
        icon: ShoppingBasket,
        label: { en: "Bought together", pt: "Comprados juntos", es: "Comprados juntos" },
        sub: { en: "The basis for bundles, cross-sell and coupons", pt: "Base para kits, compre junto e cupons", es: "Base para kits, compra conjunta y cupones" },
      },
      {
        icon: TrendingUp,
        label: { en: "Market intelligence", pt: "Inteligência de mercado", es: "Inteligencia de mercado" },
        sub: { en: "Where you stand in the niche and who leads", pt: "Onde você está no nicho e quem domina", es: "Dónde estás en el nicho y quién domina" },
        anchor: "market",
      },
      {
        icon: Upload,
        label: { en: "External orders", pt: "Pedidos externos", es: "Pedidos externos" },
        sub: { en: "Sales outside the channels, via spreadsheet", pt: "Vendas fora dos canais, por planilha", es: "Ventas fuera de los canales, por planilla" },
      },
      {
        icon: Inbox,
        label: { en: "Customer service", pt: "Atendimento", es: "Atención" },
        sub: { en: "Marketplace conversations inside the hub", pt: "As conversas do marketplace no hub", es: "Las conversaciones del marketplace en el hub" },
      },
      {
        icon: Undo2,
        label: { en: "Returns", pt: "Devoluções", es: "Devoluciones" },
        sub: { en: "Claims and the returns they bring", pt: "Reclamações e as devoluções que elas trazem", es: "Reclamos y las devoluciones que traen" },
      },
    ],
  },
  {
    group: { en: "Integrations", pt: "Integrações", es: "Integraciones" },
    items: [
      {
        icon: Plug,
        label: { en: "Connections", pt: "Conexões", es: "Conexiones" },
        sub: { en: "Accounts connected to each store", pt: "As contas conectadas a cada loja", es: "Las cuentas conectadas a cada tienda" },
      },
      {
        icon: Webhook,
        label: { en: "Webhooks", pt: "Webhooks", es: "Webhooks" },
        sub: { en: "Order events for your ERP, CRM or n8n", pt: "Eventos de pedido para o seu ERP, CRM ou n8n", es: "Eventos de pedido para tu ERP, CRM o n8n" },
      },
    ],
  },
];

function MapEntry({ item }: { item: MapItem }) {
  const t = useT();
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
          {t(label)}
          {anchor && (
            <span className="rounded-full bg-accent-soft px-1.5 text-[10px] font-medium text-accent">
              {t({ en: "highlight", pt: "destaque", es: "destacado" })}
            </span>
          )}
        </span>
        <span className="block text-[12.5px] leading-snug text-muted">{t(sub)}</span>
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
  const t = useT();
  const [monitor, sales, integrations] = MAP;
  const group = (g: (typeof MAP)[number], cols = false) => (
    <div className="erp rounded-[20px] border border-line bg-surface p-3 shadow-[var(--shadow)] md:p-4">
      <div className="flex items-center justify-between px-2.5 pb-2">
        <span className="text-[11px] font-medium tracking-wide text-faint uppercase">{t(g.group)}</span>
        <span className="font-mono text-[11px] text-faint">{g.items.length}</span>
      </div>
      <div className={cols ? "grid gap-0.5 sm:grid-cols-2" : "grid gap-0.5"}>
        {g.items.map((it) => (
          <MapEntry key={it.label.en} item={it} />
        ))}
      </div>
    </div>
  );
  return (
    <section className={SECTION}>
      <SectionHead
        index="04"
        label={{ en: "The system", pt: "O sistema", es: "El sistema" }}
        title={{ en: "19 screens, three groups.", pt: "19 telas, três grupos.", es: "19 pantallas, tres grupos." }}
        text={{
          en: "The ERP sidebar, opened up, with what each screen does. The ones marked as highlights appear up close below.",
          pt: "A barra lateral do ERP, aberta, com o que cada tela faz. As marcadas como destaque aparecem de perto logo abaixo.",
          es: "La barra lateral del ERP, abierta, con lo que hace cada pantalla. Las marcadas como destacadas aparecen de cerca más abajo.",
        }}
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
  const t = useT();
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
            {t({ en: "Total sales", pt: "Total de vendas", es: "Total de ventas" })}
            <span className="ml-auto flex items-center gap-1.5 text-[11px] text-faint">
              <span className="live-dot size-1.5 rounded-full bg-ok" /> {t({ en: "live", pt: "ao vivo", es: "en vivo" })}
            </span>
          </div>
          <Money value={total} className="mt-5 text-[40px] leading-none text-fg md:text-[56px]" />
          <div className="mt-3 text-[12px] text-muted">
            {t({ en: "last 30 days, all stores", pt: "últimos 30 dias, todas as lojas", es: "últimos 30 días, todas las tiendas" })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-line bg-surface p-5">
            <div className="text-[12.5px] text-muted">{t({ en: "Orders", pt: "Nº de pedidos", es: "Nº de pedidos" })}</div>
            <CountUp value={orders} className="mt-3 font-display text-[30px] leading-none tracking-tight text-fg" />
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <div className="text-[12.5px] text-muted">{t({ en: "Average order", pt: "Ticket médio", es: "Ticket promedio" })}</div>
            <Money value={Math.round((total / orders) * 100) / 100} className="mt-3 text-[30px] leading-none text-fg" />
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-line bg-surface p-5">
        <div className="text-[13px] font-medium text-fg">{t({ en: "Incoming orders", pt: "Pedidos chegando", es: "Pedidos entrando" })}</div>
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

const HIGHLIGHTS: { id: keyof typeof ERP_PATHS; title: Tr; text: Tr; points: Tr[]; Screen: () => React.ReactNode }[] = [
  {
    id: "overview",
    title: { en: "Overview", pt: "Visão geral", es: "Resumen" },
    text: {
      en: "Revenue from every channel added up, with what needs attention at the top. When an order comes in, the numbers roll like an odometer, digit by digit, without reloading the screen.",
      pt: "O faturamento de todos os canais somado, com o que pede atenção no topo. Quando entra pedido, os números giram como um odômetro, dígito a dígito, sem recarregar a tela.",
      es: "La facturación de todos los canales sumada, con lo que pide atención arriba. Cuando entra un pedido, los números giran como un odómetro, dígito a dígito, sin recargar la pantalla.",
    },
    points: [
      { en: "by period and by store", pt: "por período e por loja", es: "por período y por tienda" },
      { en: "urgent alerts first", pt: "avisos urgentes primeiro", es: "avisos urgentes primero" },
      { en: "live numbers", pt: "números ao vivo", es: "números en vivo" },
    ],
    Screen: LiveOverview,
  },
  {
    id: "health",
    title: { en: "Account health", pt: "Saúde da conta", es: "Salud de la cuenta" },
    text: {
      en: "Each account's reputation on the marketplace's thermometer, with the metrics that drag the score down and the history of the last 90 days.",
      pt: "A reputação de cada conta no termômetro do marketplace, com as métricas que puxam a nota para baixo e o histórico dos últimos 90 dias.",
      es: "La reputación de cada cuenta en el termómetro del marketplace, con las métricas que bajan la nota y el historial de los últimos 90 días.",
    },
    points: [
      { en: "five-band thermometer", pt: "termômetro de cinco faixas", es: "termómetro de cinco franjas" },
      { en: "each metric vs. its limit", pt: "métrica contra o limite", es: "métrica contra el límite" },
      { en: "daily history", pt: "histórico diário", es: "historial diario" },
    ],
    Screen: HealthScreen,
  },
  {
    id: "carts",
    title: { en: "Abandoned carts", pt: "Carrinhos abandonados", es: "Carritos abandonados" },
    text: {
      en: "Who reached the store's checkout and didn't buy, with the value left behind and the contact to bring them back. The recovery rate shows whether the effort pays off.",
      pt: "Quem chegou ao checkout da loja e não comprou, com o valor parado e o contato para chamar de volta. A taxa de recuperação mostra se o esforço está valendo.",
      es: "Quién llegó al checkout de la tienda y no compró, con el valor detenido y el contacto para volver a llamarlo. La tasa de recuperación muestra si el esfuerzo vale la pena.",
    },
    points: [
      { en: "value stuck and recovered", pt: "valor parado e recuperado", es: "valor detenido y recuperado" },
      { en: "contact of who gave up", pt: "contato de quem desistiu", es: "contacto de quien desistió" },
      { en: "recovery rate", pt: "taxa de recuperação", es: "tasa de recuperación" },
    ],
    Screen: CartsScreen,
  },
  {
    id: "margin",
    title: { en: "Results and margin", pt: "Resultado e margem", es: "Resultado y margen" },
    text: {
      en: "Gross revenue is misleading. The margin deducts each channel's fee, shipping and refunds, sale by sale, to show what's actually left.",
      pt: "O faturamento bruto engana. A margem desconta a tarifa de cada canal, o frete e os estornos, venda por venda, para mostrar o que de fato sobra.",
      es: "La facturación bruta engaña. El margen descuenta la tarifa de cada canal, el envío y los reembolsos, venta por venta, para mostrar lo que realmente queda.",
    },
    points: [
      { en: "net over gross", pt: "líquido sobre o bruto", es: "neto sobre bruto" },
      { en: "cost breakdown", pt: "composição dos custos", es: "composición de costos" },
      { en: "unpaid kept apart", pt: "não pagas à parte", es: "no pagadas aparte" },
    ],
    Screen: MarginScreen,
  },
  {
    id: "market",
    title: { en: "Market intelligence", pt: "Inteligência de mercado", es: "Inteligencia de mercado" },
    text: {
      en: "The best sellers of each tracked category, read daily: where the seller's products show up, who rose and who fell, and the trending searches.",
      pt: "Os mais vendidos de cada categoria acompanhada, lidos todo dia: onde os produtos do lojista aparecem, quem subiu e quem caiu e as buscas em alta.",
      es: "Los más vendidos de cada categoría seguida, leídos a diario: dónde aparecen los productos del vendedor, quién subió y quién bajó y las búsquedas en alza.",
    },
    points: [
      { en: "daily ranking", pt: "ranking diário", es: "ranking diario" },
      { en: "7-day movement", pt: "movimento em 7 dias", es: "movimiento en 7 días" },
      { en: "trending searches", pt: "buscas em alta", es: "búsquedas en alza" },
    ],
    Screen: MarketScreen,
  },
];

function Highlights() {
  const t = useT();
  return (
    <section className={SECTION}>
      <SectionHead
        index="05"
        label={{ en: "Highlights", pt: "Destaques", es: "Destacados" }}
        title={{ en: "Five screens up close.", pt: "Cinco telas de perto.", es: "Cinco pantallas de cerca." }}
        text={{
          en: "Recreated with sample data and interactive: switch tabs, reach out to carts, watch orders come in.",
          pt: "Recriadas com dados fictícios e interativas: troque abas, chame carrinhos de volta, veja os pedidos chegando.",
          es: "Recreadas con datos ficticios e interactivas: cambia pestañas, contacta carritos, mira los pedidos entrando.",
        }}
      />
      <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
        {HIGHLIGHTS.map((h, i) => (
          <div key={h.id} id={h.id} className="scroll-mt-28">
            <Reveal>
              <div className="grid gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-end md:gap-16">
                <div>
                  <span className="font-mono text-[12px] text-accent">0{i + 1} / 05</span>
                  <h3 className="mt-2 font-display text-[30px] leading-tight tracking-tight text-fg md:text-[40px]">{t(h.title)}</h3>
                </div>
                <div>
                  <p className="text-[15.5px] leading-relaxed text-muted">{t(h.text)}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {h.points.map((p) => (
                      <span key={p.en} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[12.5px] text-fg">
                        <Check className="size-3 text-accent" />
                        {t(p)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="mt-8 min-w-0 md:mt-10">
              <ErpWindow path={ERP_PATHS[h.id]} className="shadow-[0_30px_60px_-40px_rgb(20_10_60/0.45)]">
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
  const t = useT();
  return (
    <div className="space-y-2">
      {[
        { a: { en: "Kids' tent", pt: "Barraca infantil", es: "Carpa infantil" }, b: { en: "Air mattress", pt: "Colchão inflável", es: "Colchón inflable" }, lift: "2,4×", n: 38 },
        { a: { en: "Lanterns, 3 pack", pt: "Lanterna 3 un.", es: "Linterna 3 u." }, b: { en: "Rechargeable batteries", pt: "Pilhas recarregáveis", es: "Pilas recargables" }, lift: "3,1×", n: 21 },
      ].map((p) => (
        <div key={p.a.en} className="rounded-lg border border-line bg-surface p-2.5">
          <div className="flex items-center gap-1.5 text-[11.5px] text-fg">
            {t(p.a)} <span className="text-faint">+</span> {t(p.b)}
          </div>
          <div className="mt-1 flex items-center gap-2 text-[10.5px] text-muted">
            <span className="rounded-full bg-accent-soft px-1.5 font-medium text-accent">lift {p.lift}</span>
            {p.n} {t({ en: "orders together", pt: "pedidos juntos", es: "pedidos juntos" })}
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniFull() {
  const t = useT();
  return (
    <div className="space-y-1.5 text-[11.5px]">
      {[
        { sku: { en: "Dome tent 4p", pt: "Barraca iglu 4p", es: "Carpa iglú 4p" }, tone: "var(--nuvem)", label: { en: "Urgent", pt: "Urgente", es: "Urgente" } },
        { sku: { en: "Double mattress", pt: "Colchão casal", es: "Colchón doble" }, tone: "var(--amber)", label: { en: "This week", pt: "Esta semana", es: "Esta semana" } },
        { sku: { en: "Beach chair", pt: "Cadeira de praia", es: "Silla de playa" }, tone: "var(--tiktok)", label: { en: "Surplus", pt: "Excedente", es: "Excedente" } },
      ].map((r) => (
        <div key={r.sku.en} className="flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5">
          <span className="truncate text-fg">{t(r.sku)}</span>
          <span className="ml-auto shrink-0 rounded-full px-1.5 text-[10px] font-medium" style={{ color: r.tone, background: `color-mix(in oklab, ${r.tone} 14%, transparent)` }}>
            {t(r.label)}
          </span>
        </div>
      ))}
      <div className="px-1 text-[10.5px] text-faint">
        {t({ en: "3 units stuck: damaged", pt: "3 unidades travadas: avariadas", es: "3 unidades trabadas: dañadas" })}
      </div>
    </div>
  );
}

function MiniListing() {
  const t = useT();
  return (
    <div className="rounded-lg border border-line bg-surface p-2.5">
      <div className="flex gap-2.5">
        <span className="size-10 shrink-0 rounded-md bg-surface-2" />
        <div className="min-w-0">
          <div className="truncate text-[11.5px] text-fg">{t({ en: "Kids' play tent", pt: "Barraca infantil toca cabana", es: "Carpa infantil tipo cabaña" })}</div>
          <div className="text-[10.5px] text-faint">R$ 129,90 · 84 {t({ en: "in stock", pt: "em estoque", es: "en stock" })}</div>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {(
          [
            [{ en: "catalog showcase", pt: "vitrine do catálogo", es: "vitrina del catálogo" }, "var(--ok)"],
            [{ en: "price above competitors", pt: "preço acima da concorrência", es: "precio sobre la competencia" }, "var(--amber)"],
            [{ en: "listing 92/100", pt: "cadastro 92/100", es: "ficha 92/100" }, "var(--accent)"],
            [{ en: "moderation ok", pt: "moderação ok", es: "moderación ok" }, "var(--ok)"],
          ] as [Tr, string][]
        ).map(([label, c]) => (
          <span key={label.en} className="rounded-full px-1.5 py-0.5 text-[10px] font-medium" style={{ color: c, background: `color-mix(in oklab, ${c} 13%, transparent)` }}>
            {t(label)}
          </span>
        ))}
      </div>
    </div>
  );
}

function MiniWebhook() {
  return (
    <div className="rounded-lg bg-[#121016] p-3 font-mono text-[10px] leading-relaxed text-white/70">
      <div className="text-white/40">POST https://your-erp.com/orders</div>
      <div>
        <span className="text-[#d4ff4a]">X-Hub-Signature</span>: sha256=9f2c…
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
  const t = useT();
  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-line bg-surface p-2.5">
        <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-accent">
          <LinkIcon className="size-3" /> {t({ en: "deals.yourstore.com/camping", pt: "ofertas.sualoja.com/camping", es: "ofertas.tutienda.com/camping" })}
        </div>
        <div className="mt-1.5 flex gap-3 text-[10.5px] text-muted">
          <span>
            <span className="font-medium text-fg">1.284</span> {t({ en: "visits", pt: "visitas", es: "visitas" })}
          </span>
          <span>
            <span className="font-medium text-fg">312</span> {t({ en: "clicks", pt: "cliques", es: "clics" })}
          </span>
          <span className="text-ok">● {t({ en: "live", pt: "no ar", es: "en línea" })}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1.5 rounded-lg bg-[#25d366] py-1.5 text-[11px] font-medium text-white">
        <MessageCircle className="size-3.5" /> {t({ en: "Send to the group", pt: "Enviar para o grupo", es: "Enviar al grupo" })}
      </div>
    </div>
  );
}

function MiniInbox() {
  const t = useT();
  const threads: Tr[] = [
    { en: "Ana · order #4821", pt: "Ana · pedido #4821", es: "Ana · pedido #4821" },
    { en: "Bruno · exchange", pt: "Bruno · troca", es: "Bruno · cambio" },
    { en: "Carla · delivery time", pt: "Carla · prazo", es: "Carla · plazo" },
  ];
  return (
    <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-1.5">
      <div className="space-y-1">
        {threads.map((c, i) => (
          <div key={c.en} className={`truncate rounded-md px-2 py-1.5 text-[10.5px] ${i === 0 ? "bg-accent-soft text-fg" : "text-muted"}`}>
            {t(c)}
          </div>
        ))}
      </div>
      <div className="space-y-1.5 rounded-md border border-line bg-surface p-2">
        <div className="w-fit max-w-full rounded-lg bg-surface-2 px-2 py-1 text-[10px] text-fg">
          {t({ en: "Will it arrive by Saturday?", pt: "Chega até sábado?", es: "¿Llega antes del sábado?" })}
        </div>
        <div className="ml-auto w-fit max-w-full rounded-lg bg-accent px-2 py-1 text-[10px] text-white">
          {t({ en: "Ships today, arrives Friday!", pt: "Sai hoje, chega sexta!", es: "¡Sale hoy, llega el viernes!" })}
        </div>
      </div>
    </div>
  );
}

function MiniReturns() {
  const t = useT();
  const tabs: [Tr, number, boolean][] = [
    [{ en: "Awaiting you", pt: "Aguardando você", es: "Esperándote" }, 3, true],
    [{ en: "In progress", pt: "Em andamento", es: "En curso" }, 7, false],
    [{ en: "Closed", pt: "Encerradas", es: "Cerradas" }, 41, false],
  ];
  const claims: Tr[] = [
    { en: "Item not received", pt: "Não recebi o produto", es: "No recibí el producto" },
    { en: "Item not as described", pt: "Produto diferente do anúncio", es: "Producto distinto al anuncio" },
  ];
  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {tabs.map(([label, n, on]) => (
          <span key={label.en} className={`rounded-full px-2 py-0.5 text-[10.5px] ${on ? "bg-fg text-bg" : "border border-line text-muted"}`}>
            {t(label)} <span className="opacity-60">{n}</span>
          </span>
        ))}
      </div>
      <div className="mt-2 space-y-1.5">
        {claims.map((r) => (
          <div key={r.en} className="flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[11px] text-fg">
            {t(r)}
            <span className="ml-auto text-[10px] text-amber">{t({ en: "affects reputation", pt: "conta na reputação", es: "cuenta en la reputación" })}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniUpload() {
  const t = useT();
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <div className="grid place-items-center rounded-lg border border-dashed border-line-strong py-3 text-[11px] text-muted">
        <FileSpreadsheet className="mb-1 size-5 text-ok" />
        {t({ en: "retail-store-sales.xlsx", pt: "vendas-loja-fisica.xlsx", es: "ventas-tienda-fisica.xlsx" })}
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-ok">
        <Check className="size-3.5" />{" "}
        {t({ en: "128 sales imported into the overview", pt: "128 vendas importadas para a Visão geral", es: "128 ventas importadas al resumen" })}
      </div>
    </div>
  );
}

const MODULES: { title: Tr; text: Tr; Mini: () => React.ReactNode }[] = [
  {
    title: { en: "Bought together", pt: "Comprados juntos", es: "Comprados juntos" },
    text: {
      en: "People who buy one product also take another: the basis for bundles, cross-sell and coupons.",
      pt: "Quem compra um produto também leva outro: base para kits, compre junto e cupons.",
      es: "Quien compra un producto también lleva otro: base para kits, compra conjunta y cupones.",
    },
    Mini: MiniBasket,
  },
  {
    title: { en: "Fulfillment", pt: "Full", es: "Full" },
    text: {
      en: "Stock in the marketplace warehouse: what to restock, by when, and what's stuck.",
      pt: "O estoque no armazém do marketplace: o que repor, até quando, e o que está travado.",
      es: "El stock en el depósito del marketplace: qué reponer, hasta cuándo y qué está trabado.",
    },
    Mini: MiniFull,
  },
  {
    title: { en: "Listings", pt: "Anúncios", es: "Publicaciones" },
    text: {
      en: "The channel's signals on each listing: moderation, showcase, price and listing quality.",
      pt: "Os sinais do canal sobre cada anúncio: moderação, vitrine, preço e qualidade do cadastro.",
      es: "Las señales del canal sobre cada publicación: moderación, vitrina, precio y calidad de la ficha.",
    },
    Mini: MiniListing,
  },
  {
    title: { en: "Webhooks", pt: "Webhooks", es: "Webhooks" },
    text: {
      en: "Every paid order becomes a signed event for the ERP, the CRM, the invoicing tool or n8n.",
      pt: "Cada pedido pago vira um evento assinado para o ERP, o CRM, o emissor de nota ou o n8n.",
      es: "Cada pedido pagado se vuelve un evento firmado para el ERP, el CRM, el emisor de facturas o n8n.",
    },
    Mini: MiniWebhook,
  },
  {
    title: { en: "Deal pages", pt: "Páginas de ofertas", es: "Páginas de ofertas" },
    text: {
      en: "A public link with a promotion's deals, sent straight to the WhatsApp group.",
      pt: "Um link público com as ofertas de uma promoção, enviado direto para o grupo do WhatsApp.",
      es: "Un enlace público con las ofertas de una promoción, enviado directo al grupo de WhatsApp.",
    },
    Mini: MiniPromoPage,
  },
  {
    title: { en: "Customer service", pt: "Atendimento", es: "Atención" },
    text: {
      en: "Marketplace conversations inside the hub, with the list and the thread side by side.",
      pt: "As conversas do marketplace dentro do hub, com lista e conversa lado a lado.",
      es: "Las conversaciones del marketplace dentro del hub, con lista y conversación lado a lado.",
    },
    Mini: MiniInbox,
  },
  {
    title: { en: "Returns", pt: "Devoluções", es: "Devoluciones" },
    text: {
      en: "Claims sorted by what needs action now, flagging the ones that affect reputation.",
      pt: "Reclamações separadas pelo que pede ação agora, com o aviso do que conta na reputação.",
      es: "Reclamos separados por lo que pide acción ahora, con aviso de lo que cuenta en la reputación.",
    },
    Mini: MiniReturns,
  },
  {
    title: { en: "External orders", pt: "Pedidos externos", es: "Pedidos externos" },
    text: {
      en: "Sales outside the connected channels, via spreadsheet, so revenue counts in full.",
      pt: "Vendas fora dos canais conectados, por planilha, para o faturamento contar inteiro.",
      es: "Ventas fuera de los canales conectados, por planilla, para que la facturación cuente completa.",
    },
    Mini: MiniUpload,
  },
];

function MoreModules() {
  const t = useT();
  return (
    <section className={SECTION}>
      <SectionHead
        index="06"
        label={{ en: "And more", pt: "E mais", es: "Y más" }}
        title={{ en: "The rest of the system, in brief.", pt: "O resto do sistema, em resumo.", es: "El resto del sistema, en resumen." }}
        text={{
          en: "Eight more screens from the day-to-day: stock, catalog, integrations with other systems, customer service and what happens outside the channels.",
          pt: "Outras oito telas que fazem parte do dia a dia: estoque, catálogo, integrações com outros sistemas, atendimento e o que acontece fora dos canais.",
          es: "Otras ocho pantallas del día a día: stock, catálogo, integraciones con otros sistemas, atención y lo que pasa fuera de los canales.",
        }}
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map(({ title, text, Mini }, i) => (
          <Reveal key={title.en} delay={(i % 4) * 0.05} className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-surface shadow-[var(--shadow)]">
              <div className="erp h-[168px] overflow-hidden border-b border-line bg-surface-2 p-3.5">
                <Mini />
              </div>
              <div className="p-5">
                <h3 className="text-[16px] font-medium text-fg">{t(title)}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{t(text)}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Por baixo do capô ─────────────────────────────────────────────────────── */

const LAYERS: { title: Tr; tech: Text; text: Tr }[] = [
  {
    title: { en: "Panel", pt: "Painel", es: "Panel" },
    tech: "React · Vite",
    text: { en: "The 19 screens, in light and dark themes.", pt: "As 19 telas, nos temas claro e escuro.", es: "Las 19 pantallas, en tema claro y oscuro." },
  },
  {
    title: { en: "API", pt: "API", es: "API" },
    tech: "NestJS · TypeScript",
    text: {
      en: "Resolves the store and permissions, and orchestrates everything.",
      pt: "Resolve a loja, as permissões e orquestra tudo.",
      es: "Resuelve la tienda, los permisos y orquesta todo.",
    },
  },
  {
    title: { en: "Queues", pt: "Filas", es: "Colas" },
    tech: "Redis · BullMQ",
    text: {
      en: "Imports, daily reads and events in the background.",
      pt: "Importações, leituras diárias e eventos em segundo plano.",
      es: "Importaciones, lecturas diarias y eventos en segundo plano.",
    },
  },
  {
    title: { en: "Adapters", pt: "Adaptadores", es: "Adaptadores" },
    tech: { en: "one per channel", pt: "um por canal", es: "uno por canal" },
    text: {
      en: "Translate each API into the same order and product model.",
      pt: "Traduzem cada API para o mesmo modelo de pedido e produto.",
      es: "Traducen cada API al mismo modelo de pedido y producto.",
    },
  },
];

const SAFEGUARDS: { icon: typeof Lock; title: Tr; text: Tr }[] = [
  {
    icon: Lock,
    title: { en: "Encrypted credentials", pt: "Credenciais cifradas", es: "Credenciales cifradas" },
    text: {
      en: "Channel access tokens are stored encrypted (AES-256-GCM) and only opened in memory, at the moment of use.",
      pt: "Os acessos aos canais ficam cifrados (AES-256-GCM) e só abrem na memória, na hora do uso.",
      es: "Los accesos a los canales quedan cifrados (AES-256-GCM) y solo se abren en memoria, al momento de usarlos.",
    },
  },
  {
    icon: Building2,
    title: { en: "Every store isolated", pt: "Cada loja isolada", es: "Cada tienda aislada" },
    text: {
      en: "All data has an owner and every query is filtered by store. Forgetting the filter is hard, not easy.",
      pt: "Todo dado tem dono e toda consulta é filtrada pela loja. Esquecer o filtro é difícil, não fácil.",
      es: "Todo dato tiene dueño y toda consulta se filtra por tienda. Olvidar el filtro es difícil, no fácil.",
    },
  },
  {
    icon: EyeOff,
    title: { en: "Privacy by design", pt: "LGPD no desenho", es: "Privacidad desde el diseño" },
    text: {
      en: "Buyer data is kept apart from the order, encrypted and deleted within 90 days (Brazil's LGPD).",
      pt: "Os dados do comprador ficam separados do pedido, cifrados e são apagados em até 90 dias.",
      es: "Los datos del comprador quedan separados del pedido, cifrados y se borran en hasta 90 días (LGPD de Brasil).",
    },
  },
  {
    icon: KeyRound,
    title: { en: "Two-step login", pt: "Login em duas etapas", es: "Login en dos pasos" },
    text: {
      en: "App-based 2FA, with recovery codes so access is never lost.",
      pt: "2FA por aplicativo, com códigos de recuperação para não perder o acesso.",
      es: "2FA por aplicación, con códigos de recuperación para no perder el acceso.",
    },
  },
  {
    icon: Signature,
    title: { en: "Signed events", pt: "Eventos assinados", es: "Eventos firmados" },
    text: {
      en: "Webhooks go out with an HMAC signature, so the receiver can confirm they came from the hub.",
      pt: "Os webhooks saem com assinatura HMAC, para quem recebe confirmar que vieram do hub.",
      es: "Los webhooks salen con firma HMAC, para que quien los recibe confirme que vienen del hub.",
    },
  },
  {
    icon: RefreshCw,
    title: { en: "No duplicate orders", pt: "Sem pedido duplicado", es: "Sin pedidos duplicados" },
    text: {
      en: "A repeated marketplace event never becomes a second order: processing is idempotent.",
      pt: "Evento repetido do marketplace não vira pedido em dobro: o processamento é idempotente.",
      es: "Un evento repetido del marketplace no se vuelve un pedido doble: el procesamiento es idempotente.",
    },
  },
];

const STACK = ["TypeScript", "React", "Vite", "NestJS", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Docker", "Vitest"];

function UnderTheHood() {
  const t = useT();
  return (
    <section className={SECTION}>
      <SectionHead
        index="07"
        label={{ en: "Under the hood", pt: "Por baixo do capô", es: "Bajo el capó" }}
        title={{ en: "Built to grow one channel at a time.", pt: "Feito para crescer canal a canal.", es: "Hecho para crecer canal a canal." }}
        text={{
          en: "No business rule knows about a specific marketplace: a new channel is a new adapter, without touching the rest.",
          pt: "Nenhuma regra de negócio conhece um marketplace específico: canal novo é um adaptador novo, sem mexer no resto.",
          es: "Ninguna regla de negocio conoce un marketplace específico: un canal nuevo es un adaptador nuevo, sin tocar el resto.",
        }}
      />
      <Reveal className="mt-12">
        <div className="grid gap-3 rounded-[24px] border border-line bg-surface-2/60 p-3 md:grid-cols-4 md:p-4">
          {LAYERS.map((l, i) => (
            <div key={l.title.en} className="relative rounded-2xl border border-line bg-surface p-5">
              <span className="font-mono text-[11px] text-faint">0{i + 1}</span>
              <div className="mt-3 text-[17px] font-medium text-fg">{t(l.title)}</div>
              <div className="font-mono text-[11.5px] text-accent">{t(l.tech)}</div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{t(l.text)}</p>
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
          {STACK.map((s) => (
            <span key={s} className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-muted">
              {s}
            </span>
          ))}
        </div>
      </Reveal>
      <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {SAFEGUARDS.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title.en} delay={(i % 3) * 0.05}>
            <div className="flex gap-4 border-t border-line pt-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="size-4" />
              </span>
              <div>
                <h3 className="text-[15.5px] font-medium text-fg">{t(title)}</h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{t(text)}</p>
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
  const t = useT();
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <div className="flex items-center gap-2 text-[12px] text-muted">
        <IconBadge>
          <TrendingUp />
        </IconBadge>
        {t({ en: "Total sales", pt: "Total de vendas", es: "Total de ventas" })}
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
  const t = useT();
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
      <SectionHead
        index="08"
        label={{ en: "Craft", pt: "Acabamento", es: "Acabado" }}
        title={{ en: "The details nobody asks for.", pt: "Os detalhes que ninguém pede.", es: "Los detalles que nadie pide." }}
      />
      <div ref={ref} className="mt-12 grid gap-4 md:grid-cols-3">
        <Reveal className="h-full">
          <div className={card}>
            <div className="erp grid h-[150px] place-items-center rounded-xl border border-line bg-surface-2">
              <CountUp value={CYCLE[i]} className="font-display text-[48px] tracking-tight text-fg" />
            </div>
            <h3 className="mt-5 text-[17px] font-medium text-fg">{t({ en: "Odometer numbers", pt: "Números em odômetro", es: "Números en odómetro" })}</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
              {t({
                en: "Each digit rolls to the new value, in the right direction and with a spring. The width follows the digit, so the text next to it doesn't wobble.",
                pt: "Cada dígito gira até o novo valor, no sentido certo e com mola. A largura acompanha o algarismo, então o texto ao lado não balança.",
                es: "Cada dígito gira hasta el nuevo valor, en el sentido correcto y con resorte. El ancho sigue al dígito, así el texto de al lado no se mueve.",
              })}
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
            <h3 className="mt-5 text-[17px] font-medium text-fg">{t({ en: "A real dark theme", pt: "Tema escuro de verdade", es: "Tema oscuro de verdad" })}</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
              {t({
                en: "Every color has its own dark version, including status colors, which must stay readable as text and not only as a background.",
                pt: "Cada cor tem a sua versão escura, inclusive as de estado, que precisam continuar legíveis como texto e não só como fundo.",
                es: "Cada color tiene su versión oscura, incluso los de estado, que deben seguir legibles como texto y no solo como fondo.",
              })}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="h-full">
          <div className={card}>
            <div className="erp flex h-[150px] items-center gap-4 rounded-xl border border-line bg-surface-2 px-4">
              <TickGauge value={75} label="75%" sub={t({ en: "margin", pt: "margem", es: "margen" })} size={110} />
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
            <h3 className="mt-5 text-[17px] font-medium text-fg">{t({ en: "Hand-made charts", pt: "Gráficos feitos à mão", es: "Gráficos hechos a mano" })}</h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
              {t({
                en: "Gauges, stacked bars and dot bars in SVG, no library: lightweight, themed, always with a label and number next to the color.",
                pt: "Medidores, barras empilhadas e barras de pontos em SVG, sem biblioteca: leves, no tema e com rótulo e número sempre ao lado da cor.",
                es: "Medidores, barras apiladas y barras de puntos en SVG, sin biblioteca: livianos, en el tema y con etiqueta y número siempre junto al color.",
              })}
            </p>
          </div>
        </Reveal>
      </div>
      <Reveal className="mt-4">
        <div className="flex items-start gap-3 rounded-[20px] border border-line bg-surface px-5 py-4 text-[13.5px] leading-relaxed text-muted">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
          <span>
            {t({
              en: "Read-only screens say so in their subtitle, and sales and customers show a \"how it's counted\" next to the numbers. A screen name that promises what it doesn't do is treated as a bug.",
              pt: "Telas \"só leitura\" dizem isso no subtítulo, e vendas e clientes trazem um \"como é contado\" ao lado dos números. Nome de tela que promete o que não faz é tratado como erro.",
              es: "Las pantallas de \"solo lectura\" lo dicen en el subtítulo, y ventas y clientes muestran un \"cómo se cuenta\" junto a los números. Un nombre de pantalla que promete lo que no hace se trata como error.",
            })}
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

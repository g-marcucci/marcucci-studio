"use client";

import { Activity, ArrowRight, ArrowUpRight, Percent, ShoppingCart, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CASE_PATH, useLocale, useT, type Text, type Tr } from "@/lib/i18n";
import { projectHref } from "@/lib/site";
import { Avatar } from "./avatar";
import { CartsScreen, ErpWindow, HealthScreen, MarginScreen, MarketScreen } from "./erp/screens";
import { Reveal, SectionLabel } from "./ui";

/** Caminho falso de cada tela na barra do navegador das demonstrações. */
export const ERP_PATHS = {
  overview: { en: "overview", pt: "visao-geral", es: "resumen" },
  health: { en: "account-health", pt: "saude", es: "salud" },
  carts: { en: "abandoned-carts", pt: "carrinhos", es: "carritos" },
  margin: { en: "margin", pt: "resultado", es: "resultado" },
  market: { en: "market", pt: "mercado", es: "mercado" },
} satisfies Record<string, Tr>;

const MODULES = [
  {
    id: "health",
    icon: Activity,
    title: { en: "Account health", pt: "Saúde da conta", es: "Salud de la cuenta" },
    text: {
      en: "Reputation on each marketplace, metric by metric, before it becomes a problem.",
      pt: "A reputação em cada marketplace, métrica por métrica, antes que vire problema.",
      es: "La reputación en cada marketplace, métrica por métrica, antes de que sea un problema.",
    },
    Screen: HealthScreen,
  },
  {
    id: "carts",
    icon: ShoppingCart,
    title: { en: "Abandoned carts", pt: "Carrinhos abandonados", es: "Carritos abandonados" },
    text: {
      en: "Who reached checkout and didn't buy, with the contact to bring them back.",
      pt: "Quem chegou ao checkout e não comprou, com contato para chamar de volta.",
      es: "Quién llegó al checkout y no compró, con el contacto para volver a llamarlo.",
    },
    Screen: CartsScreen,
  },
  {
    id: "margin",
    icon: Percent,
    title: { en: "Results and margin", pt: "Resultado e margem", es: "Resultado y margen" },
    text: {
      en: "What's actually left after fees, shipping and refunds, sale by sale.",
      pt: "O que sobra de verdade depois de tarifas, frete e estornos, venda por venda.",
      es: "Lo que realmente queda después de tarifas, envío y reembolsos, venta por venta.",
    },
    Screen: MarginScreen,
  },
  {
    id: "market",
    icon: TrendingUp,
    title: { en: "Market intelligence", pt: "Inteligência de mercado", es: "Inteligencia de mercado" },
    text: {
      en: "What sells in the niche and who rose or fell in the ranking, every day.",
      pt: "O que vende no nicho e quem subiu ou caiu no ranking, todo dia.",
      es: "Qué se vende en el nicho y quién subió o bajó en el ranking, cada día.",
    },
    Screen: MarketScreen,
  },
] as const;

const AUTOPLAY_MS = 9000;

const META: [Tr, Text][] = [
  [{ en: "Type", pt: "Tipo", es: "Tipo" }, "ERP"],
  [{ en: "Year", pt: "Ano", es: "Año" }, "2026"],
  [{ en: "Scope", pt: "Escopo", es: "Alcance" }, { en: "Product, design and code", pt: "Produto, design e código", es: "Producto, diseño y código" }],
  [{ en: "Channels", pt: "Canais", es: "Canales" }, "Mercado Livre · Shopee · Magalu · TikTok Shop · SHEIN · Dafiti · Leroy Merlin · Nuvemshop"],
];

/** Ficha técnica do case (tipo, ano, escopo, canais). */
export function MetaStrip({ className = "" }: { className?: string }) {
  const t = useT();
  return (
    <dl className={`grid grid-cols-2 border-y border-line md:grid-cols-[0.6fr_0.4fr_0.9fr_2.1fr] ${className}`}>
      {META.map(([k, v], i) => (
        <div
          key={k.en}
          className={`py-3 pr-4 ${i % 2 ? "border-l border-line pl-4" : i ? "md:border-l md:border-line md:pl-4" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""}`}
        >
          <dt className="font-mono text-[10.5px] tracking-wide text-faint uppercase">{t(k)}</dt>
          <dd className="mt-1 text-[13.5px] leading-snug text-fg">{t(v)}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Work() {
  const t = useT();
  const { locale } = useLocale();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);

  const select = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  // No celular a altura muda entre módulos, então não troca sozinho.
  useEffect(() => {
    if (matchMedia("(max-width: 767px)").matches) setAuto(false);
  }, []);

  return (
    <section id="work" className="border-t border-line px-5 py-24 md:px-14 md:py-32">
      <Reveal>
        <SectionLabel index="01">{t({ en: "Work", pt: "Trabalhos", es: "Trabajos" })}</SectionLabel>
        <span className="mt-6 inline-flex items-center gap-2 rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted">
          <span className="text-accent">case 01</span> {t({ en: "custom system", pt: "sistema sob medida", es: "sistema a medida" })}
        </span>
        <h2 className="mt-4 font-display text-[36px] leading-[0.95] tracking-[-0.035em] text-fg sm:text-[56px] md:text-[80px]">
          ERP multimarketplace
        </h2>
        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16">
          <p className="max-w-2xl text-[16px] leading-relaxed text-muted md:text-[18px]">
            {t({
              en: "Selling on several marketplaces at once means one dashboard per channel and no view of the whole. This ERP brings eight channels together, with orders, customers, reputation, margin and listings in one place.",
              pt: "Quem vende em vários marketplaces ao mesmo tempo acaba com um painel para cada canal e nenhuma visão do todo. Esse ERP junta oito canais, com pedidos, clientes, reputação, margem e anúncios num lugar só.",
              es: "Quien vende en varios marketplaces a la vez termina con un panel por canal y ninguna visión del conjunto. Este ERP reúne ocho canales, con pedidos, clientes, reputación, margen y publicaciones en un solo lugar.",
            })}{" "}
            <span className="text-fg">
              {t({
                en: "I built all of it, from the architecture and integrations to the design of every screen.",
                pt: "Fiz tudo, da arquitetura e das integrações ao visual de cada tela.",
                es: "Hice todo, de la arquitectura y las integraciones al diseño de cada pantalla.",
              })}
            </span>
          </p>
          <Link
            href={CASE_PATH[locale]}
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-[14px] font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            {t({ en: "See full case study", pt: "Ver case completo", es: "Ver caso completo" })}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <MetaStrip className="mt-10" />
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
                  <div className={`mt-4 text-[15px] font-medium ${on ? "text-fg" : "text-muted"}`}>{t(m.title)}</div>
                  <p className={`mt-1 text-[12.5px] leading-relaxed transition-colors ${on ? "text-muted" : "text-faint"}`}>{t(m.text)}</p>
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
            <ErpWindow
              path={ERP_PATHS[MODULES[active].id]}
              className="shadow-[0_40px_80px_-40px_rgb(20_10_60/0.45),0_0_0_6px_var(--accent-soft)]"
            >
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
            </ErpWindow>
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
                <span className="text-accent">case 02</span> · {t({ en: "open", pt: "em aberto", es: "abierto" })}
              </span>
              <div className="font-display text-[24px] leading-tight tracking-tight text-fg md:text-[30px]">
                {t({ en: "The next one could be yours.", pt: "O próximo pode ser o seu.", es: "El próximo puede ser el tuyo." })}
              </div>
            </div>
          </div>
          <a
            href={projectHref()}
            className="group flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[14px] font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            {t({ en: "Start a project", pt: "Começar um projeto", es: "Empezar un proyecto" })} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

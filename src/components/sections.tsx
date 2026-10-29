"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Code2,
  FileText,
  Mail,
  MessageCircle,
  MessagesSquare,
  PenTool,
  Plus,
  RefreshCw,
  Rocket,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { HOME, useLocale, useT, type Tr } from "@/lib/i18n";
import { contactLinks, projectHref, site, whatsappDisplay, whatsappHref } from "@/lib/site";
import { ContactForm } from "./contact-form";
import { Avatar } from "./avatar";
import { DashboardDemo } from "./dashboard-demo";
import { Reveal, SectionLabel } from "./ui";

const VERBS: Tr[] = [
  { en: "organizes", pt: "organiza", es: "organiza" },
  { en: "automates", pt: "automatiza", es: "automatiza" },
  { en: "connects", pt: "conecta", es: "conecta" },
  { en: "scales", pt: "acelera", es: "acelera" },
];
const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789";

/** Verbo do título que troca sozinho, "decodificando" letra por letra. */
function RotatingVerb({ prefix }: { prefix?: string }) {
  const t = useT();
  const verbs = VERBS.map(t);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(verbs[0]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % VERBS.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const target = verbs[index];
    let frame = 0;
    const total = 14;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / total) * target.length);
      setText(
        [...target]
          .map((c, i) => (i < revealed ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (frame >= total) {
        setText(target);
        clearInterval(id);
      }
    }, 40);
    return () => clearInterval(id);
  }, [index]);

  return (
    <span className="flex w-fit items-baseline whitespace-nowrap">
      {prefix && <span className="mr-[0.25em]">{prefix}</span>}
      <span className="font-pixel font-black tracking-[-0.02em] text-accent" aria-live="polite">
        {text}
      </span>
      <span className="ml-1.5 inline-block h-[0.72em] w-[0.38em] translate-y-[0.06em] animate-pulse bg-[#d4ff4a]" aria-hidden />
    </span>
  );
}

const INCLUDED: Tr[] = [
  { en: "Interface designed around your workflow", pt: "Interface desenhada para o seu fluxo", es: "Interfaz diseñada para tu flujo" },
  { en: "Front-end, back-end and database", pt: "Front-end, back-end e banco de dados", es: "Front-end, back-end y base de datos" },
  { en: "Integrations with the tools you use", pt: "Integrações com o que você já usa", es: "Integraciones con lo que ya usas" },
  { en: "Launch, domain and ongoing evolution", pt: "Publicação, domínio e evolução", es: "Publicación, dominio y evolución" },
];

// Etiquetas de "especificação" presas nas bordas do painel (só em telas grandes).
const ANNOTATIONS: { label: Tr; className: string }[] = [
  { label: { en: "custom-built modules", pt: "módulos sob medida", es: "módulos a medida" }, className: "-top-3 left-[3%]" },
  { label: { en: "data that updates itself", pt: "dados atualizados sozinhos", es: "datos que se actualizan solos" }, className: "-top-3 left-[44%]" },
  { label: { en: "8 channels via API", pt: "8 canais via API", es: "8 canales vía API" }, className: "top-[34%] -right-4" },
  { label: { en: "the metrics you choose", pt: "indicadores que você escolhe", es: "los indicadores que eliges" }, className: "-bottom-3 left-[38%]" },
];

export function Hero() {
  const t = useT();
  const { locale } = useLocale();
  return (
    <section id="home" className="relative px-5 pt-12 md:px-14 md:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[760px] [mask-image:radial-gradient(70%_60%_at_30%_25%,black,transparent_80%)]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-pixel text-[12px] font-bold tracking-[0.16em] text-muted uppercase">
            <span className="live-dot size-1.5 rounded-full bg-ok" />{" "}
            {t({ en: "Booking projects", pt: "Agenda aberta", es: "Agenda abierta" })}
          </span>
          <h1
            className={`mt-6 font-display leading-[1.02] tracking-[-0.035em] text-fg sm:text-[60px] ${
              locale === "en"
                ? "text-[34px] md:text-[72px] lg:text-[60px] xl:text-[76px]"
                : "text-[40px] md:text-[76px] xl:text-[84px]"
            }`}
          >
            {/* Em inglês o "that" vai para a linha do verbo, para não sobrar sozinho. */}
            {locale === "en" ? (
              <>
                Custom software <RotatingVerb prefix="that" />{" "}
              </>
            ) : (
              <>
                {t({ en: "", pt: "Software sob medida que", es: "Software a medida que" })} <RotatingVerb />{" "}
              </>
            )}
            {t({ en: "your business.", pt: "o seu negócio.", es: "tu negocio." })}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pb-3"
        >
          <p className="text-[17px] leading-snug text-muted md:text-[19px]">
            {t({
              en: "Systems, web apps, automations and websites. This is",
              pt: "Sistemas, webapps, automações e sites. Aqui é a",
              es: "Sistemas, web apps, automatizaciones y sitios. Esto es",
            })}{" "}
            <span className="inline-flex translate-y-[3px] items-center gap-1.5 rounded-full border border-line bg-surface py-0.5 pr-2.5 pl-1 align-baseline text-fg">
              <Avatar size={18} />
              <span className="text-[0.85em]">{site.name}</span>
            </span>
            {t({
              en: ", building everything from scratch, from the database to the last screen.",
              pt: ", que constrói tudo do zero, do banco de dados à última tela.",
              es: ", que construye todo desde cero, de la base de datos a la última pantalla.",
            })}
          </p>
          <ol className="mt-6 border-t border-line font-mono text-[12.5px]">
            {INCLUDED.map((item, i) => (
              <li key={item.en} className="flex items-center gap-3 border-b border-line py-2 text-fg">
                <span className="text-accent">0{i + 1}</span>
                {t(item)}
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href="#work"
              className="group flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-[14px] font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              {t({ en: "See work", pt: "Ver trabalhos", es: "Ver trabajos" })}{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={projectHref()}
              className="rounded-full border border-line-strong bg-surface px-5 py-2.5 text-[14px] font-medium text-fg transition-transform hover:-translate-y-0.5"
            >
              {t({ en: "Start a project", pt: "Começar um projeto", es: "Empezar un proyecto" })}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-16 md:mt-20"
      >
        <DashboardDemo />
        {ANNOTATIONS.map((a, i) => (
          <motion.span
            key={a.label.en}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
            className={`pointer-events-none absolute z-10 hidden items-center gap-1.5 rounded-md bg-fg px-2 py-1 font-mono text-[11px] whitespace-nowrap text-bg shadow-lg lg:flex ${a.className}`}
          >
            <span className="size-1.5 rounded-[2px] bg-[#d4ff4a]" />
            <span className="text-bg/50">0{i + 1}</span>
            {t(a.label)}
          </motion.span>
        ))}
        <p className="mt-5 text-center text-[12px] text-faint lg:mt-9">
          {t({
            en: "The multi-marketplace ERP dashboard, recreated here with sample data. Try changing the period above.",
            pt: "Painel do ERP multimarketplace, recriado aqui com dados fictícios. Troque o período ali em cima.",
            es: "Panel del ERP multimarketplace, recreado aquí con datos ficticios. Cambia el período arriba.",
          })}
        </p>
      </motion.div>
    </section>
  );
}

const EVENTS: { icon: typeof ShoppingBag; color: string; text: Tr }[] = [
  { icon: ShoppingBag, color: "var(--ml)", text: { en: "Order #48213 imported from Mercado Livre", pt: "Pedido #48213 importado do Mercado Livre", es: "Pedido #48213 importado de Mercado Libre" } },
  { icon: RefreshCw, color: "var(--teal)", text: { en: "Stock synced across 4 channels", pt: "Estoque sincronizado em 4 canais", es: "Stock sincronizado en 4 canales" } },
  { icon: FileText, color: "var(--accent)", text: { en: "Invoice 3,882 issued", pt: "NF-e 3.882 emitida", es: "Factura 3.882 emitida" } },
  { icon: MessageCircle, color: "var(--ok)", text: { en: "Cart recovered via WhatsApp", pt: "Carrinho recuperado pelo WhatsApp", es: "Carrito recuperado por WhatsApp" } },
  { icon: Bell, color: "var(--amber)", text: { en: "Monday report sent at 9:00", pt: "Relatório de segunda enviado às 9:00", es: "Informe del lunes enviado a las 9:00" } },
  { icon: Truck, color: "var(--shopee)", text: { en: "Shipping label created on Shopee", pt: "Etiqueta de envio gerada na Shopee", es: "Etiqueta de envío generada en Shopee" } },
  { icon: Users, color: "var(--tiktok)", text: { en: "Customer matched across 2 marketplaces", pt: "Cliente unificado entre 2 marketplaces", es: "Cliente unificado entre 2 marketplaces" } },
  { icon: RefreshCw, color: "var(--nuvem)", text: { en: "Margin recalculated after a new fee", pt: "Margem recalculada após nova tarifa", es: "Margen recalculado tras una nueva tarifa" } },
];

export function EventsMarquee() {
  const t = useT();
  const row = [...EVENTS, ...EVENTS];
  return (
    <div className="marquee-mask mt-14 overflow-hidden py-2" aria-hidden>
      <div className="animate-marquee flex w-max gap-2.5">
        {row.map((e, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] text-muted"
          >
            <span className="grid size-5 place-items-center rounded-md" style={{ background: e.color }}>
              <e.icon className="size-3 text-white" />
            </span>
            {t(e.text)}
          </span>
        ))}
      </div>
    </div>
  );
}

const STEPS: { icon: typeof Rocket; title: Tr; text: Tr; badge?: Tr }[] = [
  {
    icon: MessagesSquare,
    title: { en: "Conversation and diagnosis", pt: "Conversa e diagnóstico", es: "Conversación y diagnóstico" },
    text: {
      en: "I learn the business, how things work today and what needs to work first. You get a written scope.",
      pt: "Entendo o negócio, o processo de hoje e o que precisa funcionar primeiro. Sai daqui um escopo por escrito.",
      es: "Entiendo el negocio, el proceso actual y lo que debe funcionar primero. De aquí sale un alcance por escrito.",
    },
  },
  {
    icon: PenTool,
    title: { en: "Prototype", pt: "Protótipo", es: "Prototipo" },
    text: {
      en: "You click through the screens, with your brand, before the first line of production code.",
      pt: "Você navega pelas telas, com a sua marca, antes da primeira linha de código de produção.",
      es: "Navegas por las pantallas, con tu marca, antes de la primera línea de código de producción.",
    },
    badge: { en: "you approve first", pt: "você aprova antes", es: "apruebas antes" },
  },
  {
    icon: Code2,
    title: { en: "Built in stages", pt: "Construção em etapas", es: "Construcción por etapas" },
    text: {
      en: "Short deliveries on a test link. You use it, comment and adjust along the way.",
      pt: "Entregas curtas num link de teste. Você usa, comenta e ajusta no caminho.",
      es: "Entregas cortas en un enlace de prueba. Lo usas, comentas y ajustas en el camino.",
    },
  },
  {
    icon: Rocket,
    title: { en: "Live and evolving", pt: "No ar e evolução", es: "En línea y evolución" },
    text: {
      en: "I launch it, connect the domain, integrations and payments, and stay on for the next versions.",
      pt: "Publico, conecto domínio, integrações e pagamentos, e sigo junto nas próximas versões.",
      es: "Lo publico, conecto dominio, integraciones y pagos, y sigo contigo en las próximas versiones.",
    },
  },
];

export function Process() {
  const t = useT();
  return (
    <section id="process" className="border-t border-line px-3 py-24 md:px-14 md:py-32">
      <Reveal>
        <div className="brand-panel rounded-[28px] p-6 text-white md:p-12">
          <p className="font-pixel text-[13px] font-bold tracking-[0.18em] text-[#d4ff4a]/80 uppercase">
            03 · {t({ en: "Process", pt: "Processo", es: "Proceso" })}
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-2 md:items-end">
            <h2 className="font-display text-[40px] leading-[0.98] tracking-[-0.03em] md:text-[64px]">
              {t({
                en: "You use the system before it's finished.",
                pt: "Você usa o sistema antes de ele ficar pronto.",
                es: "Usas el sistema antes de que esté terminado.",
              })}
            </h2>
            <p className="max-w-md text-[16px] leading-relaxed text-white/80 md:justify-self-end">
              {t({
                en: "Every stage ends with something you can open and test: a prototype, a test link, a live version. No waiting months for a surprise delivery.",
                pt: "Cada etapa termina com algo que você abre e testa: um protótipo, um link de teste, uma versão no ar. Nada de esperar meses por uma entrega surpresa.",
                es: "Cada etapa termina con algo que abres y pruebas: un prototipo, un enlace de prueba, una versión en línea. Nada de esperar meses por una entrega sorpresa.",
              })}
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title.en} className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm transition-colors hover:border-[#d4ff4a]/40">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] text-white/60">0{i + 1}</span>
                  <span className="grid size-8 place-items-center rounded-lg bg-[#d4ff4a] text-[#150d36]">
                    <s.icon className="size-4" />
                  </span>
                </div>
                <h3 className="mt-8 flex flex-wrap items-center gap-2 text-[17px] font-medium">
                  {t(s.title)}
                  {s.badge && (
                    <span className="rounded-full bg-[#d4ff4a] px-2 py-0.5 text-[10.5px] font-medium text-[#150d36]">{t(s.badge)}</span>
                  )}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/80">{t(s.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// Revise estas respostas: elas descrevem como você trabalha.
const FAQ: { q: Tr; a: Tr }[] = [
  {
    q: { en: "Do you only code, or design too?", pt: "Você faz só o código ou o design também?", es: "¿Solo programas o también diseñas?" },
    a: {
      en: "Both. Every project ships with its own interface, designed around your workflow, plus all the code that runs behind it.",
      pt: "Os dois. Cada projeto sai com uma interface própria, desenhada para o seu fluxo, e com todo o código que roda por trás dela.",
      es: "Ambos. Cada proyecto sale con una interfaz propia, diseñada para tu flujo, y con todo el código que corre detrás.",
    },
  },
  {
    q: { en: "Can it integrate with the tools I already use?", pt: "Dá para integrar com o que eu já uso?", es: "¿Se puede integrar con lo que ya uso?" },
    a: {
      en: "Almost always: marketplaces, payment providers, ERPs, spreadsheets, WhatsApp and your own APIs. If the tool has an API, it can be connected.",
      pt: "Quase sempre, sim: marketplaces, meios de pagamento, ERPs, planilhas, WhatsApp e APIs próprias. Se a ferramenta tem API, dá para conectar.",
      es: "Casi siempre: marketplaces, medios de pago, ERPs, hojas de cálculo, WhatsApp y APIs propias. Si la herramienta tiene API, se puede conectar.",
    },
  },
  {
    q: { en: "How long does it take?", pt: "Quanto tempo leva?", es: "¿Cuánto tiempo lleva?" },
    a: {
      en: "It depends on the scope. A landing page takes a few days. A system is delivered in stages, so you start using the first parts early.",
      pt: "Depende do escopo. Uma landing page sai em poucos dias. Um sistema é entregue em etapas, e você começa a usar as primeiras partes cedo.",
      es: "Depende del alcance. Una landing page sale en pocos días. Un sistema se entrega por etapas y empiezas a usar las primeras partes pronto.",
    },
  },
  {
    q: { en: "How does pricing work?", pt: "Como funciona o orçamento?", es: "¿Cómo funciona el presupuesto?" },
    a: {
      en: "After our first conversation you get a written scope with what will be delivered in each stage, the timeline and the price.",
      pt: "Depois da primeira conversa você recebe um escopo por escrito, com o que será entregue em cada etapa, prazo e valor.",
      es: "Después de la primera conversación recibes un alcance por escrito, con lo que se entrega en cada etapa, plazo y valor.",
    },
  },
  {
    q: { en: "And after it goes live?", pt: "E depois que entra no ar?", es: "¿Y después de que sale en línea?" },
    a: {
      en: "I stay on for fixes, improvements and new versions. If it makes sense, we set up a maintenance plan.",
      pt: "Sigo junto com correções, melhorias e novas versões. Se fizer sentido, combinamos um plano de manutenção.",
      es: "Sigo contigo con correcciones, mejoras y nuevas versiones. Si tiene sentido, acordamos un plan de mantenimiento.",
    },
  },
];

export function Faq() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-line px-5 py-24 md:px-14 md:py-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <SectionLabel index="04">{t({ en: "Questions", pt: "Dúvidas", es: "Dudas" })}</SectionLabel>
          <h2 className="mt-4 font-display text-[44px] leading-[0.98] tracking-[-0.03em] text-fg md:text-[64px]">
            {t({ en: "Frequently", pt: "Perguntas", es: "Preguntas" })}{" "}
            <span className="text-faint">{t({ en: "asked questions.", pt: "frequentes.", es: "frecuentes." })}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="border-t border-line">
            {FAQ.map((f, i) => (
              <div key={f.q.en} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-[17px] text-fg"
                  aria-expanded={open === i}
                >
                  {t(f.q)}
                  <Plus className={`size-4 shrink-0 text-muted transition-transform duration-300 ${open === i ? "rotate-45" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-5 text-[15px] leading-relaxed text-muted">{t(f.a)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Cta() {
  const t = useT();
  const { locale } = useLocale();
  const { email } = site.contact;
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line px-3 py-24 md:px-14 md:py-32">
      <Reveal>
        <div className="brand-panel rounded-[28px] px-5 py-10 text-white md:px-12 md:py-14">
          <div className="flex justify-between text-[12px] text-white/70">
            <span>{t({ en: "Systems · Web apps · Automations · Websites", pt: "Sistemas · Webapps · Automações · Sites", es: "Sistemas · Web apps · Automatizaciones · Sitios" })}</span>
            <span className="hidden sm:block">{t({ en: "Custom-built projects", pt: "Projetos sob medida", es: "Proyectos a medida" })}</span>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <div className="flex flex-col">
              <h2 className="font-display text-[42px] leading-[0.98] tracking-[-0.035em] text-white md:text-[64px]">
                {t({
                  en: "Got a process still living in a spreadsheet?",
                  pt: "Tem um processo que ainda vive numa planilha?",
                  es: "¿Tienes un proceso que aún vive en una hoja de cálculo?",
                })}{" "}
                <span className="text-[#d4ff4a]">{t({ en: "Tell me.", pt: "Me conta.", es: "Cuéntame." })}</span>
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/75">
                {t({
                  en: "Fill in the form and the message arrives neatly organized on my WhatsApp. I reply personally, no bots in between.",
                  pt: "Preencha o formulário e a mensagem chega organizada no meu WhatsApp. Respondo pessoalmente, sem robô no meio.",
                  es: "Completa el formulario y el mensaje llega organizado a mi WhatsApp. Respondo personalmente, sin bots de por medio.",
                })}
              </p>
              <div className="mt-8 space-y-2 lg:mt-auto lg:pt-10">
                <span className="block font-mono text-[11px] tracking-wide text-white/50 uppercase">
                  {t({ en: "or reach me directly", pt: "ou fale direto", es: "o escríbeme directo" })}
                </span>
                <a
                  href={whatsappHref(locale)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-fit items-center gap-2.5 text-[16px] text-white transition-colors hover:text-[#d4ff4a]"
                >
                  <MessageCircle className="size-4" /> {whatsappDisplay()}
                </a>
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex w-fit items-center gap-2.5 text-[16px] text-white transition-colors hover:text-[#d4ff4a]"
                  >
                    <Mail className="size-4" /> {email}
                  </a>
                )}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const t = useT();
  const { locale } = useLocale();
  const links = contactLinks();
  return (
    <footer className="border-t border-line px-5 py-14 md:px-14">
      <div className="flex flex-wrap justify-between gap-10">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Avatar size={28} />
            <span className="font-display text-lg text-fg">{site.name}</span>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            {t({
              en: "Custom systems, web apps, automations and websites, from the database to the last screen.",
              pt: "Sistemas, webapps, automações e sites sob medida, do banco de dados à última tela.",
              es: "Sistemas, web apps, automatizaciones y sitios a medida, de la base de datos a la última pantalla.",
            })}
          </p>
        </div>
        <div className="flex gap-14 text-[14px]">
          <div>
            <div className="mb-3 text-[12px] text-faint">{t({ en: "Pages", pt: "Páginas", es: "Páginas" })}</div>
            <ul className="space-y-2">
              {site.nav.map((n) => (
                <li key={n.id}>
                  <a href={n.id === "contact" ? "#contact" : `${HOME[locale]}#${n.id}`} className="text-fg hover:text-accent">
                    {t(n.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {links.length > 0 && (
            <div>
              <div className="mb-3 text-[12px] text-faint">{t({ en: "Contact", pt: "Contato", es: "Contacto" })}</div>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-fg hover:text-accent">
                      {l.label} <ArrowUpRight className="size-3 text-faint" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="mt-12 border-t border-line pt-6 text-[12px] text-faint">
        © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  const { locale } = useLocale();
  const { whatsapp } = site.contact;
  // Some enquanto a seção de contato está na tela: lá o formulário e o link direto já resolvem.
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!whatsapp) return null;
  return (
    <a
      href={whatsappHref(locale)}
      target="_blank"
      rel="noreferrer"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className={`fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-[#141416] py-2 pr-4 pl-2 text-[13px] font-medium text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.5)] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <span className="grid size-7 place-items-center rounded-full bg-[#25d366]">
        <MessageCircle className="size-4" />
      </span>
      WhatsApp
    </a>
  );
}

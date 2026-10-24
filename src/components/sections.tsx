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
import { contactLinks, projectHref, site, whatsappDisplay, whatsappHref } from "@/lib/site";
import { ContactForm } from "./contact-form";
import { Avatar } from "./avatar";
import { DashboardDemo } from "./dashboard-demo";
import { Reveal, SectionLabel } from "./ui";

function isExternal(href: string) {
  return href.startsWith("http");
}

const VERBS = ["organiza", "automatiza", "conecta", "acelera"];
const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789";

/** Verbo do título que troca sozinho, "decodificando" letra por letra. */
function RotatingVerb() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(VERBS[0]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % VERBS.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const target = VERBS[index];
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
      <span className="font-pixel font-black tracking-[-0.02em] text-accent" aria-live="polite">
        {text}
      </span>
      <span className="ml-1.5 inline-block h-[0.72em] w-[0.38em] translate-y-[0.06em] animate-pulse bg-[#d4ff4a]" aria-hidden />
    </span>
  );
}

const INCLUDED = [
  "Interface desenhada para o seu fluxo",
  "Front-end, back-end e banco de dados",
  "Integrações com o que você já usa",
  "Publicação, domínio e evolução",
];

// Etiquetas de "especificação" presas nas bordas do painel (só em telas grandes).
const ANNOTATIONS = [
  { label: "módulos sob medida", className: "-top-3 left-[3%]" },
  { label: "dados atualizados sozinhos", className: "-top-3 left-[44%]" },
  { label: "4 marketplaces via API", className: "top-[34%] -right-4" },
  { label: "indicadores que você escolhe", className: "-bottom-3 left-[38%]" },
];

export function Hero() {
  const href = projectHref();
  return (
    <section id="inicio" className="relative px-5 pt-12 md:px-14 md:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[760px] [mask-image:radial-gradient(70%_60%_at_30%_25%,black,transparent_80%)]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="relative grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:items-end lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-pixel text-[12px] font-bold tracking-[0.16em] text-muted uppercase">
            <span className="live-dot size-1.5 rounded-full bg-ok" /> Agenda aberta
          </span>
          <h1 className="mt-6 font-display text-[42px] leading-[1.02] tracking-[-0.035em] text-fg sm:text-[60px] md:text-[76px] xl:text-[84px]">
            Software sob medida que <RotatingVerb /> o seu negócio.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pb-3"
        >
          <p className="text-[17px] leading-snug text-muted md:text-[19px]">
            Sistemas, webapps, automações e sites. Aqui é a{" "}
            <span className="inline-flex translate-y-[3px] items-center gap-1.5 rounded-full border border-line bg-surface py-0.5 pr-2.5 pl-1 align-baseline text-fg">
              <Avatar size={18} />
              <span className="text-[0.85em]">{site.name}</span>
            </span>
            , que constrói tudo do zero, do banco de dados à última tela.
          </p>
          <ol className="mt-6 border-t border-line font-mono text-[12.5px]">
            {INCLUDED.map((item, i) => (
              <li key={item} className="flex items-center gap-3 border-b border-line py-2 text-fg">
                <span className="text-accent">0{i + 1}</span>
                {item}
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href="#trabalhos"
              className="group flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-[14px] font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              Ver trabalhos <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={href}
              target={isExternal(href) ? "_blank" : undefined}
              rel="noreferrer"
              className="rounded-full border border-line-strong bg-surface px-5 py-2.5 text-[14px] font-medium text-fg transition-transform hover:-translate-y-0.5"
            >
              Começar um projeto
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
            key={a.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
            className={`pointer-events-none absolute z-10 hidden items-center gap-1.5 rounded-md bg-fg px-2 py-1 font-mono text-[11px] whitespace-nowrap text-bg shadow-lg lg:flex ${a.className}`}
          >
            <span className="size-1.5 rounded-[2px] bg-[#d4ff4a]" />
            <span className="text-bg/50">0{i + 1}</span>
            {a.label}
          </motion.span>
        ))}
        <p className="mt-5 text-center text-[12px] text-faint lg:mt-9">
          Painel do ERP multimarketplace, recriado aqui com dados fictícios. Troque o período ali em cima.
        </p>
      </motion.div>
    </section>
  );
}

const EVENTS = [
  { icon: ShoppingBag, color: "var(--ml)", text: "Pedido #48213 importado do Mercado Livre" },
  { icon: RefreshCw, color: "var(--teal)", text: "Estoque sincronizado em 4 canais" },
  { icon: FileText, color: "var(--accent)", text: "NF-e 3.882 emitida" },
  { icon: MessageCircle, color: "var(--ok)", text: "Carrinho recuperado pelo WhatsApp" },
  { icon: Bell, color: "var(--amber)", text: "Relatório de segunda enviado às 9:00" },
  { icon: Truck, color: "var(--shopee)", text: "Etiqueta de envio gerada na Shopee" },
  { icon: Users, color: "var(--tiktok)", text: "Cliente unificado entre 2 marketplaces" },
  { icon: RefreshCw, color: "var(--nuvem)", text: "Margem recalculada após nova tarifa" },
];

export function EventsMarquee() {
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
            {e.text}
          </span>
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  { icon: MessagesSquare, title: "Conversa e diagnóstico", text: "Entendo o negócio, o processo de hoje e o que precisa funcionar primeiro. Sai daqui um escopo por escrito." },
  { icon: PenTool, title: "Protótipo", text: "Você navega pelas telas, com a sua marca, antes da primeira linha de código de produção.", badge: "você aprova antes" },
  { icon: Code2, title: "Construção em etapas", text: "Entregas curtas num link de teste. Você usa, comenta e ajusta no caminho." },
  { icon: Rocket, title: "No ar e evolução", text: "Publico, conecto domínio, integrações e pagamentos, e sigo junto nas próximas versões." },
];

export function Process() {
  return (
    <section id="processo" className="border-t border-line px-3 py-24 md:px-14 md:py-32">
      <Reveal>
        <div className="brand-panel rounded-[28px] p-6 text-white md:p-12">
          <p className="font-pixel text-[13px] font-bold tracking-[0.18em] text-[#d4ff4a]/80 uppercase">03 · Processo</p>
          <div className="mt-4 grid gap-6 md:grid-cols-2 md:items-end">
            <h2 className="font-display text-[40px] leading-[0.98] tracking-[-0.03em] md:text-[64px]">
              Você usa o sistema antes de ele ficar pronto.
            </h2>
            <p className="max-w-md text-[16px] leading-relaxed text-white/80 md:justify-self-end">
              Cada etapa termina com algo que você abre e testa: um protótipo, um link de teste, uma versão no ar.
              Nada de esperar meses por uma entrega surpresa.
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm transition-colors hover:border-[#d4ff4a]/40">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] text-white/60">0{i + 1}</span>
                  <span className="grid size-8 place-items-center rounded-lg bg-[#d4ff4a] text-[#150d36]">
                    <s.icon className="size-4" />
                  </span>
                </div>
                <h3 className="mt-8 flex flex-wrap items-center gap-2 text-[17px] font-medium">
                  {s.title}
                  {s.badge && (
                    <span className="rounded-full bg-[#d4ff4a] px-2 py-0.5 text-[10.5px] font-medium text-[#150d36]">{s.badge}</span>
                  )}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/80">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// Revise estas respostas: elas descrevem como você trabalha.
const FAQ = [
  { q: "Você faz só o código ou o design também?", a: "Os dois. Cada projeto sai com uma interface própria, desenhada para o seu fluxo, e com todo o código que roda por trás dela." },
  { q: "Dá para integrar com o que eu já uso?", a: "Quase sempre, sim: marketplaces, meios de pagamento, ERPs, planilhas, WhatsApp e APIs próprias. Se a ferramenta tem API, dá para conectar." },
  { q: "Quanto tempo leva?", a: "Depende do escopo. Uma landing page sai em poucos dias. Um sistema é entregue em etapas, e você começa a usar as primeiras partes cedo." },
  { q: "Como funciona o orçamento?", a: "Depois da primeira conversa você recebe um escopo por escrito, com o que será entregue em cada etapa, prazo e valor." },
  { q: "E depois que entra no ar?", a: "Sigo junto com correções, melhorias e novas versões. Se fizer sentido, combinamos um plano de manutenção." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-line px-5 py-24 md:px-14 md:py-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <SectionLabel index="04">Dúvidas</SectionLabel>
          <h2 className="mt-4 font-display text-[44px] leading-[0.98] tracking-[-0.03em] text-fg md:text-[64px]">
            Perguntas <span className="text-faint">frequentes.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="border-t border-line">
            {FAQ.map((f, i) => (
              <div key={f.q} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-[17px] text-fg"
                  aria-expanded={open === i}
                >
                  {f.q}
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
                      <p className="max-w-xl pb-5 text-[15px] leading-relaxed text-muted">{f.a}</p>
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
  const { email } = site.contact;
  return (
    <section id="contato" className="scroll-mt-24 border-t border-line px-3 py-24 md:px-14 md:py-32">
      <Reveal>
        <div className="brand-panel rounded-[28px] px-5 py-10 text-white md:px-12 md:py-14">
          <div className="flex justify-between text-[12px] text-white/70">
            <span>Sistemas · Webapps · Automações · Sites</span>
            <span className="hidden sm:block">Projetos sob medida</span>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <div className="flex flex-col">
              <h2 className="font-display text-[42px] leading-[0.98] tracking-[-0.035em] text-white md:text-[64px]">
                Tem um processo que ainda vive numa planilha? <span className="text-[#d4ff4a]">Me conta.</span>
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/75">
                Preencha o formulário e a mensagem chega organizada no meu WhatsApp. Respondo pessoalmente, sem robô no meio.
              </p>
              <div className="mt-8 space-y-2 lg:mt-auto lg:pt-10">
                <span className="block font-mono text-[11px] tracking-wide text-white/50 uppercase">ou fale direto</span>
                <a
                  href={whatsappHref()}
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
            Sistemas, webapps, automações e sites sob medida, do banco de dados à última tela.
          </p>
        </div>
        <div className="flex gap-14 text-[14px]">
          <div>
            <div className="mb-3 text-[12px] text-faint">Páginas</div>
            <ul className="space-y-2">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-fg hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {links.length > 0 && (
            <div>
              <div className="mb-3 text-[12px] text-faint">Contato</div>
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
  const { whatsapp } = site.contact;
  // Some enquanto a seção de contato está na tela: lá o formulário e o link direto já resolvem.
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const el = document.getElementById("contato");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!whatsapp) return null;
  return (
    <a
      href={whatsappHref()}
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

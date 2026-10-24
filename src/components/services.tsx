"use client";

import {
  AppWindow,
  Check,
  Cpu,
  FileText,
  Globe,
  LayoutDashboard,
  MessageCircle,
  Plug,
  ShoppingBag,
  Workflow,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Reveal, SectionLabel } from "./ui";

function Tile({
  icon: Icon,
  index,
  title,
  text,
  children,
  className = "",
  horizontal = false,
}: {
  icon: typeof Cpu;
  index: string;
  title: string;
  text: string;
  children: React.ReactNode;
  className?: string;
  horizontal?: boolean;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[20px] border border-line bg-surface shadow-[var(--shadow)] ${
        horizontal ? "lg:flex-row-reverse" : ""
      } ${className}`}
    >
      <div
        className={`relative min-h-[200px] flex-1 border-b border-line bg-surface-2/60 p-4 ${
          horizontal ? "lg:border-b-0 lg:border-l lg:p-6" : ""
        }`}
      >
        {children}
      </div>
      <div className={`p-5 ${horizontal ? "lg:w-[360px] lg:shrink-0" : ""}`}>
        <div className="flex items-start justify-between">
          <span className="grid size-9 place-items-center rounded-xl border border-line bg-surface-2 text-fg">
            <Icon className="size-4" />
          </span>
          <span className="font-mono text-[11px] text-faint">{index}</span>
        </div>
        <h3 className="mt-4 font-display text-2xl tracking-tight text-fg">{title}</h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{text}</p>
      </div>
    </div>
  );
}

/* Sistemas: quadro de pedidos que andam de coluna sozinhos */
function SystemsMini() {
  const cols = ["Novo", "Separando", "Enviado", "Entregue"];
  const orders = ["#4821", "#4822", "#4823"];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="grid h-full grid-cols-4 gap-2">
      {cols.map((c, ci) => (
        <div key={c} className="rounded-lg border border-line bg-surface p-2">
          <div className="mb-2 text-[10.5px] text-faint">{c}</div>
          <div className="space-y-1.5">
            {orders.map((o, oi) => {
              const pos = (tick + oi * 2) % 6;
              if (Math.min(pos, 3) !== ci) return null;
              return (
                <motion.div
                  layoutId={o}
                  key={o}
                  className="rounded-md border border-line bg-surface-2 px-2 py-1.5 text-[10.5px] text-fg"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                >
                  <div className="font-medium">{o}</div>
                  <div className="mt-1 h-1 w-3/4 rounded-full" style={{ background: ["var(--ml)", "var(--shopee)", "var(--tiktok)"][oi] }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Automações: fluxo com um "pulso" passando de etapa em etapa */
function AutomationMini() {
  const steps = [
    { icon: ShoppingBag, label: "Novo pedido" },
    { icon: FileText, label: "Emite NF-e" },
    { icon: MessageCircle, label: "Avisa no WhatsApp" },
  ];
  const [step, setStep] = useState(0);
  const [runs, setRuns] = useState(214);
  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => {
        if (s === steps.length) setRuns((r) => r + 1);
        return (s + 1) % (steps.length + 1);
      });
    }, 900);
    return () => clearInterval(id);
  }, [steps.length]);
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {steps.map(({ icon: Icon, label }, i) => {
        const done = step > i;
        const active = step === i;
        return (
          <div key={label}>
            <div
              className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-[12px] transition-colors duration-300 ${
                active ? "border-accent bg-accent-soft text-fg" : "border-line bg-surface text-muted"
              }`}
            >
              <Icon className="size-3.5" />
              {label}
              <span className="ml-auto">
                {done ? <Check className="size-3.5 text-ok" /> : active ? <span className="live-dot block size-1.5 rounded-full bg-ok" /> : null}
              </span>
            </div>
            {i < steps.length - 1 && <div className="ml-5 h-2 w-px bg-line-strong" />}
          </div>
        );
      })}
      <div className="mt-1 font-mono text-[10.5px] text-faint">
        rodou {runs} vezes hoje · 0 erros
      </div>
    </div>
  );
}

/* Webapps: telinha de app com check-list que se completa */
function WebappMini() {
  const items = ["Cadastro do cliente", "Pagamento via PIX", "Agendamento confirmado"];
  const [done, setDone] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setDone((d) => (d + 1) % (items.length + 2)), 1100);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <div className="mx-auto flex h-full w-[170px] flex-col rounded-[18px] border border-line-strong bg-surface p-3">
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line-strong" />
      <div className="text-[11px] text-faint">Olá, Ana</div>
      <div className="font-display text-[15px] text-fg">Seu pedido</div>
      <div className="mt-3 space-y-1.5">
        {items.map((it, i) => (
          <div key={it} className="flex items-center gap-2 text-[10.5px] text-muted">
            <span
              className={`grid size-3.5 place-items-center rounded-full border transition-colors ${
                done > i ? "border-ok bg-ok text-white" : "border-line-strong"
              }`}
            >
              {done > i && <Check className="size-2.5" />}
            </span>
            {it}
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-lg bg-fg py-1.5 text-center text-[10.5px] text-bg">Continuar</div>
    </div>
  );
}

/* Sites: wireframe que se monta bloco a bloco */
function SiteMini() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v + 1) % 6), 800);
    return () => clearInterval(id);
  }, []);
  const blocks = [
    <div key="nav" className="flex justify-between"><div className="h-2 w-10 rounded bg-fg/70" /><div className="h-2 w-16 rounded bg-line-strong" /></div>,
    <div key="h" className="space-y-1.5 pt-2"><div className="h-3.5 w-4/5 rounded bg-fg/80" /><div className="h-3.5 w-3/5 rounded bg-faint/60" /></div>,
    <div key="b" className="flex gap-1.5"><div className="h-4 w-14 rounded-full bg-accent" /><div className="h-4 w-14 rounded-full border border-line-strong" /></div>,
    <div key="g" className="grid grid-cols-3 gap-1.5"><div className="h-9 rounded bg-surface-2" /><div className="h-9 rounded bg-surface-2" /><div className="h-9 rounded bg-surface-2" /></div>,
  ];
  return (
    <div className="flex h-full flex-col gap-2.5 rounded-xl border border-line bg-surface p-3">
      <AnimatePresence>
        {blocks.slice(0, Math.min(n, blocks.length)).map((b) => (
          <motion.div key={b.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {b}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* Dashboards: barras em pixels pontilhados */
function DashMini() {
  const bars = [5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 12, 14];
  return (
    <div className="flex h-full items-end gap-1.5">
      {bars.map((h, i) => (
        <div key={i} className="flex flex-1 flex-col-reverse gap-[2px]">
          {Array.from({ length: h }, (_, j) => (
            <motion.span
              key={j}
              className="h-[6px] rounded-[1px]"
              style={{ background: j > h - 3 ? "color-mix(in oklab, var(--teal) 55%, transparent)" : "var(--teal)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 + j * 0.02 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Edite à vontade com as ferramentas que você mais integra.
const INTEGRATIONS = [
  "Mercado Livre", "Shopee", "TikTok Shop", "Nuvemshop", "WhatsApp", "PIX",
  "Gateways de pagamento", "Planilhas", "ERPs", "E-mail", "APIs de IA", "Webhooks",
];

function IntegrationsMini() {
  return (
    <div className="flex h-full flex-wrap content-center gap-1.5">
      {INTEGRATIONS.map((n, i) => (
        <motion.span
          key={n}
          className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11.5px] text-muted"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03 }}
        >
          <Plug className="size-3 text-faint" />
          {n}
        </motion.span>
      ))}
      <span className="flex items-center rounded-full border border-dashed border-line-strong px-2.5 py-1 text-[11.5px] text-faint">
        + a API que você já usa
      </span>
    </div>
  );
}

export function Services() {
  return (
    <section id="servicos" className="border-t border-line px-5 py-24 md:px-14 md:py-32">
      <Reveal>
        <SectionLabel index="02">Serviços</SectionLabel>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-3xl font-display text-[44px] leading-[0.98] tracking-[-0.03em] text-fg md:text-[72px]">
            O que eu construo. <span className="text-faint">Do processo ao produto.</span>
          </h2>
          <p className="max-w-xs text-[14px] leading-relaxed text-muted md:text-right">
            Cuido da interface e de tudo que roda por trás dela. Você fala direto com quem desenha e programa.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Tile icon={Cpu} index="01" title="Sistemas e ERPs" text="Plataformas sob medida com painel, permissões, relatórios e integrações. Feitas para o seu processo, não o contrário." className="h-full">
            <SystemsMini />
          </Tile>
        </Reveal>
        <Reveal delay={0.05}>
          <Tile icon={Workflow} index="02" title="Automações" text="Tarefas repetitivas que passam a rodar sozinhas: pedidos, notas, mensagens, planilhas e relatórios." className="h-full">
            <AutomationMini />
          </Tile>
        </Reveal>
        <Reveal>
          <Tile icon={AppWindow} index="03" title="Webapps" text="Aplicações que abrem no navegador ou no celular, com login, pagamentos e fluxos curtos." className="h-full">
            <WebappMini />
          </Tile>
        </Reveal>
        <Reveal delay={0.05}>
          <Tile icon={Globe} index="04" title="Sites e landing pages" text="Sites institucionais e páginas de venda criados do zero, rápidos e pensados para converter." className="h-full">
            <SiteMini />
          </Tile>
        </Reveal>
        <Reveal delay={0.1}>
          <Tile icon={LayoutDashboard} index="05" title="Dashboards" text="Os números do negócio em uma tela, atualizados sozinhos e fáceis de ler." className="h-full">
            <DashMini />
          </Tile>
        </Reveal>
        <Reveal className="md:col-span-2 lg:col-span-3">
          <Tile icon={Plug} index="06" title="Integrações" text="Conecto o sistema ao que você já usa: marketplaces, meios de pagamento, ERPs, planilhas, WhatsApp e IA." className="h-full" horizontal>
            <IntegrationsMini />
          </Tile>
        </Reveal>
      </div>
    </section>
  );
}

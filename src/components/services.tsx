"use client";

import { Check, CreditCard, FileText, MessageCircle, Plus, Search, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Avatar } from "./avatar";
import { CountUp, Reveal, SectionLabel } from "./ui";

const LIME = "#d4ff4a";

function useTicker(ms: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
  return tick;
}

/** Card de serviço no formato "módulo": cabeçalho mono, área visual e entregas. */
function Module({
  index,
  slug,
  status,
  title,
  text,
  tags,
  children,
  className = "",
  horizontal = false,
}: {
  index: string;
  slug: string;
  status: string;
  title: string;
  text: string;
  tags: string[];
  children: React.ReactNode;
  className?: string;
  horizontal?: boolean;
}) {
  return (
    <div
      className={`group relative flex h-full flex-col rounded-[20px] border border-line bg-surface shadow-[var(--shadow)] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong ${className}`}
    >
      {/* marcas de seleção nos cantos, como num editor de design */}
      {["-top-1 -left-1 border-t-2 border-l-2", "-top-1 -right-1 border-t-2 border-r-2", "-bottom-1 -left-1 border-b-2 border-l-2", "-bottom-1 -right-1 border-b-2 border-r-2"].map((c) => (
        <span
          key={c}
          className={`pointer-events-none absolute z-10 size-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${c}`}
          style={{ borderColor: LIME }}
        />
      ))}

      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px]">
        <span className="text-muted">
          <span className="text-accent">{index}</span> <span className="text-faint">/</span> {slug}
        </span>
        <span className="flex items-center gap-1.5 text-faint">
          <span className="live-dot size-1.5 rounded-full bg-ok" />
          {status}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${horizontal ? "lg:flex-row-reverse" : ""}`}>
        <div
          className={`relative min-h-[230px] flex-1 overflow-hidden border-b border-line bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] bg-[size:14px_14px] p-4 ${
            horizontal ? "lg:border-b-0 lg:border-l" : ""
          }`}
        >
          {children}
        </div>
        <div className={`flex flex-col p-5 ${horizontal ? "lg:w-[340px] lg:shrink-0 lg:justify-end" : ""}`}>
          <h3 className="font-display text-[26px] leading-tight tracking-tight text-fg">{title}</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{text}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[10.5px] text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Window({ children, className = "", url }: { children: React.ReactNode; className?: string; url?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[var(--shadow)] ${className}`}>
      <div className="flex items-center gap-1 border-b border-line px-2.5 py-1.5">
        <span className="size-1.5 rounded-full bg-line-strong" />
        <span className="size-1.5 rounded-full bg-line-strong" />
        <span className="size-1.5 rounded-full bg-line-strong" />
        {url && <span className="ml-2 truncate font-mono text-[9px] text-faint">{url}</span>}
      </div>
      {children}
    </div>
  );
}

/* 01 · Sistemas: app com kanban sempre cheio e pedidos mudando de coluna */
const COLS = ["Novo", "Separando", "Enviado", "Entregue"];
const GHOSTS = [2, 1, 2, 1];
const ORDERS = [
  { id: "#4821", color: "var(--ml)", value: "189,90" },
  { id: "#4822", color: "var(--shopee)", value: "74,50" },
  { id: "#4823", color: "var(--tiktok)", value: "312,00" },
];

function SystemsMini() {
  const tick = useTicker(1500);
  return (
    <Window className="flex h-full min-h-[200px] flex-col">
      <div className="flex flex-1">
        <div className="hidden w-[92px] shrink-0 space-y-1.5 border-r border-line p-2.5 sm:block">
          <div className="mb-3 flex items-center gap-1.5">
            <Avatar size={14} />
            <span className="h-1.5 w-10 rounded-full bg-fg/70" />
          </div>
          {[1, 0, 0, 0, 0].map((on, i) => (
            <div key={i} className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 ${on ? "bg-accent-soft" : ""}`}>
              <span className={`size-1.5 rounded-[2px] ${on ? "bg-accent" : "bg-line-strong"}`} />
              <span className={`h-1 rounded-full ${on ? "w-9 bg-accent" : "w-8 bg-line-strong"}`} />
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1 p-2.5">
          <div className="mb-2.5 flex items-center gap-2">
            <span className="text-[11px] font-medium text-fg">Pedidos</span>
            <span className="flex flex-1 items-center gap-1 rounded-md border border-line px-1.5 py-0.5 text-[9px] text-faint">
              <Search className="size-2.5" /> buscar pedido, cliente…
            </span>
            <span className="flex items-center gap-0.5 rounded-md bg-fg px-1.5 py-0.5 text-[9px] text-bg">
              <Plus className="size-2.5" /> Novo
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {COLS.map((c, ci) => (
              <div key={c} className="min-h-[130px] rounded-lg bg-surface-2 p-1.5">
                <div className="mb-1.5 flex items-center justify-between text-[9.5px] text-faint">
                  {c}
                  <span className="font-mono">{GHOSTS[ci] + ORDERS.filter((_, oi) => Math.min((tick + oi * 2) % 6, 3) === ci).length}</span>
                </div>
                <div className="space-y-1">
                  {ORDERS.map((o, oi) =>
                    Math.min((tick + oi * 2) % 6, 3) === ci ? (
                      <motion.div
                        layoutId={o.id}
                        key={o.id}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                        className="rounded-md border border-line bg-surface px-1.5 py-1 text-[9.5px] shadow-sm"
                      >
                        <div className="flex justify-between font-medium text-fg">
                          {o.id}
                          <span className="size-1.5 rounded-full" style={{ background: o.color }} />
                        </div>
                        <div className="mt-0.5 font-mono text-[8.5px] text-faint">R$ {o.value}</div>
                      </motion.div>
                    ) : null,
                  )}
                  {Array.from({ length: GHOSTS[ci] }, (_, g) => (
                    <div key={g} className="space-y-1 rounded-md border border-line bg-surface/60 px-1.5 py-1.5">
                      <div className="h-1 w-3/4 rounded-full bg-line-strong" />
                      <div className="h-1 w-1/2 rounded-full bg-line" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

/* 02 · Automações: gatilho, etapas e log das execuções */
const STEPS = [
  { icon: FileText, label: "Emite a NF-e" },
  { icon: CreditCard, label: "Baixa no financeiro" },
  { icon: MessageCircle, label: "Avisa no WhatsApp" },
];

function clock(run: number) {
  const t = 12 * 3600 + 40 * 60 + run * 37;
  return [Math.floor(t / 3600) % 24, Math.floor(t / 60) % 60, t % 60].map((n) => String(n).padStart(2, "0")).join(":");
}

function AutomationMini() {
  const tick = useTicker(800);
  const step = tick % (STEPS.length + 2);
  const run = 4821 + Math.floor(tick / (STEPS.length + 2));
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center gap-2 rounded-lg border border-dashed border-accent/60 bg-accent-soft px-2.5 py-1.5 text-[11px] text-fg">
        <Zap className="size-3.5 text-accent" />
        <span className="text-muted">quando</span> pedido for pago
      </div>
      {STEPS.map(({ icon: Icon, label }, i) => {
        const done = step > i + 1;
        const active = step === i + 1;
        return (
          <div
            key={label}
            className={`ml-3 flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] transition-colors duration-300 ${
              active ? "border-accent bg-surface text-fg" : "border-line bg-surface text-muted"
            }`}
          >
            <Icon className="size-3.5" />
            {label}
            <span className="ml-auto">
              {done ? <Check className="size-3.5 text-ok" /> : active ? <span className="live-dot block size-1.5 rounded-full bg-ok" /> : null}
            </span>
          </div>
        );
      })}
      <div className="mt-auto space-y-0.5 rounded-lg bg-[#121016] px-2.5 py-2 font-mono text-[9.5px] leading-relaxed">
        {[0, 1, 2].map((k) => (
          <div key={run - k} className={k === 0 ? "text-white/80" : "text-white/35"}>
            <span style={{ color: LIME }}>✓</span> {clock(run - k)} pedido #{run - k} · 3 etapas
          </div>
        ))}
      </div>
    </div>
  );
}

/* 03 · Webapps: o mesmo app no desktop e no celular */
const CHECKS = ["Cadastro", "Pagamento via PIX", "Agendamento"];

function WebappMini() {
  const tick = useTicker(1000);
  const done = tick % (CHECKS.length + 2);
  return (
    <div className="relative h-full min-h-[200px]">
      <Window url="app.suaempresa.com" className="absolute top-0 left-0 w-[78%]">
        <div className="space-y-1.5 p-2.5">
          <div className="text-[10px] font-medium text-fg">Agendamentos de hoje</div>
          {["09:00 · Ana", "10:30 · Bruno", "14:00 · Carla", "16:15 · Diego"].map((r, i) => (
            <div key={r} className="flex items-center justify-between rounded-md border border-line px-2 py-1 text-[9.5px] text-muted">
              {r}
              <span
                className={`rounded-full px-1.5 text-[8.5px] ${
                  i < done - 1 ? "bg-[color-mix(in_oklab,var(--ok)_14%,transparent)] text-ok" : "bg-surface-2 text-faint"
                }`}
              >
                {i < done - 1 ? "confirmado" : "pendente"}
              </span>
            </div>
          ))}
        </div>
      </Window>
      <div className="absolute right-0 bottom-0 w-[44%] max-w-[150px] rounded-[16px] border border-line-strong bg-surface p-2 shadow-[var(--shadow)]">
        <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-line-strong" />
        <div className="text-[9px] text-faint">Olá, Ana</div>
        <div className="font-display text-[12px] text-fg">Seu horário</div>
        <div className="mt-1.5 space-y-1">
          {CHECKS.map((c, i) => (
            <div key={c} className="flex items-center gap-1.5 text-[9px] text-muted">
              <span
                className={`grid size-3 place-items-center rounded-full border transition-colors ${
                  done > i ? "border-ok bg-ok text-white" : "border-line-strong"
                }`}
              >
                {done > i && <Check className="size-2" />}
              </span>
              {c}
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-md bg-accent py-1 text-center text-[9px] text-white">Confirmar</div>
      </div>
    </div>
  );
}

/* 04 · Sites: janela que alterna entre desktop e mobile, com o layout se reorganizando */
function SiteMini() {
  const tick = useTicker(2600);
  const mobile = tick % 2 === 1;
  return (
    <div className="flex h-full min-h-[200px] flex-col items-center">
      <div className="mb-2 flex gap-1 rounded-full border border-line bg-surface p-0.5 font-mono text-[9.5px]">
        {["1440px", "390px"].map((w, i) => (
          <span key={w} className={`rounded-full px-2 py-0.5 transition-colors ${mobile === (i === 1) ? "bg-fg text-bg" : "text-faint"}`}>
            {w}
          </span>
        ))}
      </div>
      <motion.div
        animate={{ width: mobile ? "42%" : "100%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1"
      >
        <Window className="h-full">
          <motion.div layout className="space-y-2 p-2.5">
            <motion.div layout className="flex items-center justify-between">
              <span className="h-1.5 w-8 rounded-full bg-fg/70" />
              {mobile ? (
                <span className="space-y-0.5">
                  <span className="block h-0.5 w-3 bg-faint" />
                  <span className="block h-0.5 w-3 bg-faint" />
                </span>
              ) : (
                <span className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1 w-5 rounded-full bg-line-strong" />
                  ))}
                </span>
              )}
            </motion.div>
            <motion.div layout className="space-y-1 pt-1">
              <div className="h-2.5 w-4/5 rounded bg-fg/80" />
              <div className="h-2.5 w-3/5 rounded bg-faint/50" />
            </motion.div>
            <motion.div layout className="flex gap-1">
              <span className="h-3 w-10 rounded-full bg-accent" />
              <span className="h-3 w-10 rounded-full border border-line-strong" />
            </motion.div>
            <motion.div layout className={`grid gap-1 ${mobile ? "grid-cols-1" : "grid-cols-3"}`}>
              {[0, 1, 2].map((i) => (
                <motion.div layout key={i} className="h-7 rounded-md bg-surface-2" />
              ))}
            </motion.div>
          </motion.div>
        </Window>
      </motion.div>
    </div>
  );
}

/* 05 · Dashboards: KPI + barras com linha de meta */
const BARS = [5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 12, 14];

function DashMini() {
  return (
    <div className="flex h-full min-h-[200px] flex-col">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10.5px] text-faint">Faturamento · 12 semanas</div>
          <div className="font-display text-[22px] leading-tight tracking-tight text-fg">
            R$ <CountUp value={84210} />
          </div>
        </div>
        <span className="rounded-full bg-[color-mix(in_oklab,var(--ok)_14%,transparent)] px-2 py-0.5 text-[10.5px] font-medium text-ok">▲ 18%</span>
      </div>
      <div className="relative mt-3 flex flex-1 items-end gap-1.5">
        <div className="pointer-events-none absolute inset-x-0 top-[22%] border-t border-dashed border-accent/70">
          <span className="absolute -top-2 right-0 bg-surface px-1 font-mono text-[8.5px] text-accent">meta</span>
        </div>
        {BARS.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col-reverse gap-[2px]">
            {Array.from({ length: h }, (_, j) => (
              <motion.span
                key={j}
                className="h-[5px] rounded-[1px]"
                style={{ background: i === BARS.length - 1 ? "var(--accent)" : "var(--teal)", opacity: j > h - 3 ? 0.55 : 1 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: j > h - 3 ? 0.55 : 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 + j * 0.02 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 06 · Integrações: hub com o mascote no centro e dados fluindo pelas linhas */
// Edite à vontade com as ferramentas que você mais integra.
const LEFT = ["Mercado Livre", "Shopee", "TikTok Shop", "Nuvemshop", "Gateways de pagamento", "PIX"];
const RIGHT = ["WhatsApp", "E-mail", "Planilhas", "ERPs", "APIs de IA", "Webhooks"];

// Cada etiqueta fica centrada na sua faixa; as colunas laterais ocupam 1/3.1 da largura.
const rowY = (i: number) => ((i + 0.5) * 100) / LEFT.length;
const EDGE = (1 / 3.1) * 100;

function IntegrationsMini() {
  return (
    <div className="relative h-full min-h-[260px]">
      <svg className="pointer-events-none absolute inset-0 hidden size-full md:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {[...LEFT.map((_, i) => ({ x: EDGE, y: rowY(i), k: `l${i}` })), ...RIGHT.map((_, i) => ({ x: 100 - EDGE, y: rowY(i), k: `r${i}` }))].map(({ x, y, k }, i) => {
          const d = `M${x},${y} C50,${y} ${x < 50 ? 40 : 60},50 50,50`;
          return (
            <g key={k}>
              <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
              <path
                d={d}
                fill="none"
                stroke={i % 2 ? "var(--accent)" : LIME}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="6 600"
                vectorEffect="non-scaling-stroke"
                style={{ animation: `flow ${2.4 + (i % 4) * 0.4}s linear ${i * 0.25}s infinite` }}
              />
            </g>
          );
        })}
      </svg>

      <div className="relative grid h-full grid-cols-2 gap-x-3 gap-y-1.5 md:grid-cols-[1fr_1.1fr_1fr] md:gap-0">
        <div className="contents md:flex md:flex-col">
          {LEFT.map((n) => (
            <Chip key={n} label={n} side="left" />
          ))}
        </div>
        <div className="col-span-2 row-start-1 flex items-center justify-center py-3 md:col-span-1 md:row-auto md:px-6">
          <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-accent/50 bg-surface px-4 py-3 shadow-[0_0_0_6px_var(--accent-soft)]">
            <Avatar size={34} />
            <span className="font-mono text-[10.5px] text-fg">seu sistema</span>
          </div>
        </div>
        <div className="contents md:flex md:flex-col">
          {RIGHT.map((n) => (
            <Chip key={n} label={n} side="right" />
          ))}
        </div>
      </div>
    </div>
  );
}

function Chip({ label, side }: { label: string; side: "left" | "right" }) {
  return (
    <span className={`flex md:flex-1 md:items-center ${side === "left" ? "md:justify-end" : "md:justify-start"}`}>
      <span className="relative z-[1] w-fit max-w-full truncate rounded-full border border-line bg-surface px-2.5 py-1 text-[11.5px] text-muted shadow-sm">
        {label}
      </span>
    </span>
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
        <Reveal className="md:col-span-2">
          <Module index="01" slug="sistemas" status="4 colunas · ao vivo" title="Sistemas e ERPs" text="Plataformas sob medida para o seu processo, não o contrário: pedidos, estoque, financeiro e o que mais o negócio precisar." tags={["painel", "permissões", "relatórios", "integrações"]}>
            <SystemsMini />
          </Module>
        </Reveal>
        <Reveal delay={0.05}>
          <Module index="02" slug="automações" status="rodando" title="Automações" text="Tarefas repetitivas que passam a rodar sozinhas, com registro de cada execução." tags={["gatilhos", "filas", "alertas", "logs"]}>
            <AutomationMini />
          </Module>
        </Reveal>
        <Reveal>
          <Module index="03" slug="webapps" status="desktop + mobile" title="Webapps" text="Aplicações que abrem no navegador ou no celular, com login, pagamentos e fluxos curtos." tags={["login", "pagamentos", "mobile"]}>
            <WebappMini />
          </Module>
        </Reveal>
        <Reveal delay={0.05}>
          <Module index="04" slug="sites" status="responsivo" title="Sites e landing pages" text="Sites institucionais e páginas de venda criados do zero, rápidos em qualquer tela." tags={["institucional", "landing page", "SEO"]}>
            <SiteMini />
          </Module>
        </Reveal>
        <Reveal delay={0.1}>
          <Module index="05" slug="dashboards" status="atualizado agora" title="Dashboards" text="Os números do negócio em uma tela, atualizados sozinhos e fáceis de ler." tags={["KPIs", "gráficos", "metas"]}>
            <DashMini />
          </Module>
        </Reveal>
        <Reveal className="md:col-span-2 lg:col-span-3">
          <Module index="06" slug="integrações" status="12 conexões" title="Integrações" text="Conecto o sistema ao que você já usa: marketplaces, pagamentos, ERPs, planilhas, WhatsApp e IA. Se tem API, dá para conversar." tags={["APIs", "webhooks", "sincronização"]} horizontal>
            <IntegrationsMini />
          </Module>
        </Reveal>
      </div>
    </section>
  );
}

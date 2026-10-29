"use client";

import {
  ArrowLeft,
  BookOpen,
  Bot,
  Check,
  ClipboardList,
  FileText,
  Gauge,
  Headphones,
  History,
  MessageCircle,
  Network,
  Plug,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HOME, useLocale, useT, type Tr } from "@/lib/i18n";
import { AGENTS, LIME, OrchestraPanel } from "./orchestra";
import { Faq } from "./sections";
import { Reveal, SectionLabel } from "./ui";

// Página do serviço de agentes de IA. Os exemplos (pedidos, valores, chamados)
// são fictícios e só ilustram como o fluxo funciona.

const SECTION = "border-t border-line px-5 py-20 md:px-14 md:py-28";

function SectionHead({
  index,
  label,
  title,
  text,
}: {
  index: string;
  label: Tr;
  title: Tr;
  text?: Tr;
}) {
  const t = useT();
  return (
    <Reveal>
      <SectionLabel index={index}>{t(label)}</SectionLabel>
      <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-end md:gap-16">
        <h2 className="font-display text-[34px] leading-[1.02] tracking-[-0.03em] text-fg md:text-[52px]">
          {t(title)}
        </h2>
        {text && (
          <p className="max-w-md text-[15px] leading-relaxed text-muted md:justify-self-end">
            {t(text)}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/** Pontinho colorido + nome de um agente da orquestra. */
function AgentTag({ i }: { i: number }) {
  const t = useT();
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[10.5px] text-muted">
      <span
        className="size-1.5 rounded-[2px]"
        style={{
          background: AGENTS[i].color === LIME ? "#9bc21a" : AGENTS[i].color,
        }}
      />
      {t(AGENTS[i].role).toLowerCase()}
    </span>
  );
}

/* ── Abertura ──────────────────────────────────────────────────────────────── */

const GETS: Tr[] = [
  {
    en: "A team of agents designed around your process",
    pt: "Uma equipe de agentes desenhada para o seu processo",
    es: "Un equipo de agentes diseñado para tu proceso",
  },
  {
    en: "Connected to your systems: ERP, WhatsApp, email, spreadsheets",
    pt: "Ligada aos seus sistemas: ERP, WhatsApp, e-mail, planilhas",
    es: "Conectado a tus sistemas: ERP, WhatsApp, e-mail, planillas",
  },
  {
    en: "A panel to follow every run, its cost and its result",
    pt: "Um painel para acompanhar cada execução, o custo e o resultado",
    es: "Un panel para seguir cada ejecución, su costo y su resultado",
  },
  {
    en: "You approve what matters; the rest runs on its own",
    pt: "Você aprova o que importa; o resto roda sozinho",
    es: "Tú apruebas lo importante; el resto corre solo",
  },
];

function Hero() {
  const t = useT();
  const { locale } = useLocale();
  return (
    <section className="px-5 pt-12 md:px-14 md:pt-16">
      <a
        href={`${HOME[locale]}#ai`}
        className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="size-3.5" />{" "}
        {t({ en: "Services", pt: "Serviços", es: "Servicios" })}
      </a>
      <span className="mt-10 flex w-fit items-center gap-2 rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted">
        <span className="text-accent">
          {t({ en: "service", pt: "serviço", es: "servicio" })}
        </span>
        {t({
          en: "multi-agent automation",
          pt: "automação multiagente",
          es: "automatización multiagente",
        })}
      </span>
      <h1 className="mt-4 max-w-5xl font-display text-[40px] leading-[0.95] tracking-[-0.035em] text-fg sm:text-[64px] md:text-[88px]">
        {t({
          en: "AI agents that work",
          pt: "Agentes de IA que trabalham",
          es: "Agentes de IA que trabajan",
        })}{" "}
        <span className="text-faint">
          {t({ en: "as a team.", pt: "em equipe.", es: "en equipo." })}
        </span>
      </h1>
      <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <p className="max-w-xl text-[17px] leading-relaxed text-muted md:text-[19px]">
          {t({
            en: "One model alone guesses. A team of agents plans, looks things up, acts on your systems and checks the result before it reaches a customer. Each step goes to the model that does it best, for the lowest cost.",
            pt: "Um modelo sozinho chuta. Uma equipe de agentes planeja, pesquisa, age nos seus sistemas e confere o resultado antes de chegar no cliente. Cada passo vai para o modelo que faz melhor, pelo menor custo.",
            es: "Un modelo solo adivina. Un equipo de agentes planifica, investiga, actúa en tus sistemas y verifica el resultado antes de que llegue al cliente. Cada paso va al modelo que lo hace mejor, al menor costo.",
          })}{" "}
          <span className="text-fg">
            {t({
              en: "Designed, built and monitored by the same person.",
              pt: "Desenhado, construído e acompanhado pela mesma pessoa.",
              es: "Diseñado, construido y acompañado por la misma persona.",
            })}
          </span>
        </p>
        <ul className="border-t border-line">
          {GETS.map((g) => (
            <li
              key={g.en}
              className="flex items-start gap-3 border-b border-line py-3.5 text-[15px] text-fg"
            >
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {t(g)}
            </li>
          ))}
        </ul>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14"
      >
        <OrchestraPanel />
        <p className="mt-3 text-center text-[12px] text-faint">
          {t({
            en: "A simulated run, step by step. Each note on the score is one model call.",
            pt: "Uma execução simulada, passo a passo. Cada nota da partitura é uma chamada de modelo.",
            es: "Una ejecución simulada, paso a paso. Cada nota de la partitura es una llamada a un modelo.",
          })}
        </p>
      </motion.div>
    </section>
  );
}

/* ── Onde se encaixa ───────────────────────────────────────────────────────── */

const CASES: {
  icon: React.ReactNode;
  title: Tr;
  text: Tr;
  agents: number[];
}[] = [
  {
    icon: <Headphones />,
    title: {
      en: "Customer support",
      pt: "Atendimento",
      es: "Atención al cliente",
    },
    text: {
      en: "Reads the ticket, checks the order in the ERP, drafts the reply in your tone and only asks a person when it's delicate.",
      pt: "Lê o chamado, consulta o pedido no ERP, escreve a resposta no seu tom e só chama uma pessoa quando é delicado.",
      es: "Lee el ticket, consulta el pedido en el ERP, redacta la respuesta en tu tono y solo llama a una persona cuando es delicado.",
    },
    agents: [1, 2, 3],
  },
  {
    icon: <FileText />,
    title: {
      en: "Documents into data",
      pt: "Documentos viram dados",
      es: "Documentos en datos",
    },
    text: {
      en: "Invoices, quotes, contracts and PDFs, scans included: extracted, matched against your records and registered in the system.",
      pt: "Notas, orçamentos, contratos e PDFs, até digitalizados: extraídos, conferidos com o seu cadastro e lançados no sistema.",
      es: "Facturas, presupuestos, contratos y PDFs, incluso escaneados: extraídos, cotejados con tus registros y cargados en el sistema.",
    },
    agents: [1, 3, 2],
  },
  {
    icon: <TrendingUp />,
    title: {
      en: "Reports that explain",
      pt: "Relatórios que explicam",
      es: "Informes que explican",
    },
    text: {
      en: "Pulls numbers from every channel, compares periods and writes what changed and why, in plain language, on a schedule.",
      pt: "Puxa os números de todos os canais, compara períodos e escreve o que mudou e por quê, em linguagem simples, com agenda.",
      es: "Trae los números de cada canal, compara períodos y escribe qué cambió y por qué, en lenguaje simple, con agenda.",
    },
    agents: [2, 1, 0],
  },
  {
    icon: <MessageCircle />,
    title: {
      en: "Sales on WhatsApp",
      pt: "Vendas no WhatsApp",
      es: "Ventas por WhatsApp",
    },
    text: {
      en: "Answers leads at any hour, qualifies them, checks stock and price, and hands the hot ones to your team with the context.",
      pt: "Responde leads a qualquer hora, qualifica, consulta estoque e preço e passa os quentes para a sua equipe com o contexto.",
      es: "Responde leads a cualquier hora, los califica, consulta stock y precio, y pasa los calientes a tu equipo con el contexto.",
    },
    agents: [0, 2, 3],
  },
  {
    icon: <ClipboardList />,
    title: {
      en: "Back-office routines",
      pt: "Rotinas de back-office",
      es: "Rutinas de back-office",
    },
    text: {
      en: "Marketplace questions, stock syncs, order follow-ups, overdue payments: the repetitive work that eats the team's day.",
      pt: "Perguntas de marketplace, sincronia de estoque, acompanhamento de pedidos, cobranças: o repetitivo que come o dia da equipe.",
      es: "Preguntas de marketplace, sincronización de stock, seguimiento de pedidos, cobranzas: lo repetitivo que se come el día del equipo.",
    },
    agents: [0, 2],
  },
  {
    icon: <BookOpen />,
    title: {
      en: "Company knowledge",
      pt: "Conhecimento da empresa",
      es: "Conocimiento de la empresa",
    },
    text: {
      en: "An assistant that knows your policies, manuals and history, answers the team with sources and never makes up a rule.",
      pt: "Um assistente que conhece suas políticas, manuais e histórico, responde a equipe com a fonte e nunca inventa regra.",
      es: "Un asistente que conoce tus políticas, manuales e historial, responde al equipo con la fuente y nunca inventa reglas.",
    },
    agents: [1, 3],
  },
];

function UseCases() {
  const t = useT();
  return (
    <section className={SECTION}>
      <SectionHead
        index="01"
        label={{
          en: "Where it fits",
          pt: "Onde se encaixa",
          es: "Dónde encaja",
        }}
        title={{
          en: "Work that follows rules but still needs judgment.",
          pt: "Trabalho que segue regras, mas ainda pede julgamento.",
          es: "Trabajo que sigue reglas, pero aún pide criterio.",
        }}
        text={{
          en: "If someone on your team spends the day reading, looking up and copying between systems, there's probably an agent team for it.",
          pt: "Se alguém da sua equipe passa o dia lendo, consultando e copiando entre sistemas, provavelmente existe uma equipe de agentes para isso.",
          es: "Si alguien de tu equipo pasa el día leyendo, consultando y copiando entre sistemas, probablemente hay un equipo de agentes para eso.",
        }}
      />
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CASES.map((c, i) => (
          <Reveal key={c.title.en} delay={0.04 * i} className="h-full">
            <div className="group flex h-full flex-col rounded-[20px] border border-line bg-surface p-5 shadow-[var(--shadow)] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong">
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent [&_svg]:size-[18px]">
                  {c.icon}
                </span>
                <span className="font-mono text-[11px] text-faint">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[22px] leading-tight tracking-tight text-fg">
                {t(c.title)}
              </h3>
              <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-muted">
                {t(c.text)}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.agents.map((a) => (
                  <AgentTag key={a} i={a} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Anatomia ──────────────────────────────────────────────────────────────── */

type Line = [code: string, comment?: Tr];

const LAYERS: {
  icon: React.ReactNode;
  title: Tr;
  text: Tr;
  file: string;
  code: Line[];
}[] = [
  {
    icon: <Bot />,
    title: { en: "Orchestrator", pt: "Orquestrador", es: "Orquestador" },
    text: {
      en: "Receives the goal, plans the steps and decides who does what. It knows when to stop and when to call a person.",
      pt: "Recebe o objetivo, planeja os passos e decide quem faz o quê. Sabe quando parar e quando chamar uma pessoa.",
      es: "Recibe el objetivo, planifica los pasos y decide quién hace qué. Sabe cuándo parar y cuándo llamar a una persona.",
    },
    file: "orchestrator.yaml",
    code: [
      ["orchestrator:"],
      [
        "  model: claude",
        {
          en: "plans and delegates",
          pt: "planeja e delega",
          es: "planifica y delega",
        },
      ],
      ['  goal: "answer pending tickets"'],
      [
        "  max_steps: 12",
        {
          en: "never loops forever",
          pt: "nunca entra em loop",
          es: "nunca entra en bucle",
        },
      ],
      ["  on_doubt: ask_human"],
    ],
  },
  {
    icon: <Network />,
    title: {
      en: "Specialist agents",
      pt: "Agentes especialistas",
      es: "Agentes especialistas",
    },
    text: {
      en: "Each one does a single job well, with its own instructions and only the tools it needs.",
      pt: "Cada um faz bem uma única função, com instruções próprias e só as ferramentas de que precisa.",
      es: "Cada uno hace bien una sola tarea, con instrucciones propias y solo las herramientas que necesita.",
    },
    file: "agents.yaml",
    code: [
      ["agents:"],
      [
        "  research: { model: gpt-mini }",
        { en: "reads and summarizes", pt: "lê e resume", es: "lee y resume" },
      ],
      [
        "  operator: { model: llama-local }",
        {
          en: "runs on your server",
          pt: "roda no seu servidor",
          es: "corre en tu servidor",
        },
      ],
      [
        "  reviewer: { model: gemini }",
        { en: "second opinion", pt: "segunda opinião", es: "segunda opinión" },
      ],
      ["    checks: [tone, promises, personal_data]"],
    ],
  },
  {
    icon: <Plug />,
    title: { en: "Tools", pt: "Ferramentas", es: "Herramientas" },
    text: {
      en: "The hands of the team: APIs and MCP servers for the ERP, WhatsApp, email and spreadsheets, each with its own permission.",
      pt: "As mãos da equipe: APIs e servidores MCP para ERP, WhatsApp, e-mail e planilhas, cada um com a sua permissão.",
      es: "Las manos del equipo: APIs y servidores MCP para el ERP, WhatsApp, e-mail y planillas, cada uno con su permiso.",
    },
    file: "tools.yaml",
    code: [
      ["tools:"],
      [
        "  erp.orders:    mcp://erp/orders",
        { en: "read only", pt: "só leitura", es: "solo lectura" },
      ],
      [
        "  helpdesk.reply: api://helpdesk",
        { en: "needs approval", pt: "pede aprovação", es: "pide aprobación" },
      ],
      ["  whatsapp.send: api://whatsapp"],
      ["  sheets.append: api://sheets"],
    ],
  },
  {
    icon: <BookOpen />,
    title: { en: "Knowledge", pt: "Conhecimento", es: "Conocimiento" },
    text: {
      en: "Your documents and data indexed for search (RAG), so answers come from your rules, with the source attached.",
      pt: "Seus documentos e dados indexados para busca (RAG), para as respostas virem das suas regras, com a fonte junto.",
      es: "Tus documentos y datos indexados para búsqueda (RAG), para que las respuestas salgan de tus reglas, con la fuente.",
    },
    file: "knowledge.yaml",
    code: [
      ["knowledge:"],
      ["  sources: [policies/*.pdf, faq.md, erp.products]"],
      [
        "  index: embeddings",
        {
          en: "refreshed every night",
          pt: "atualizado toda noite",
          es: "actualizado cada noche",
        },
      ],
      ["  cite_sources: true"],
    ],
  },
  {
    icon: <ShieldCheck />,
    title: { en: "Guardrails", pt: "Limites", es: "Límites" },
    text: {
      en: "Budgets, approval rules, logs of every step and tests on real cases before each change goes live.",
      pt: "Orçamento, regras de aprovação, log de cada passo e testes com casos reais antes de cada mudança ir ao ar.",
      es: "Presupuesto, reglas de aprobación, log de cada paso y pruebas con casos reales antes de cada cambio.",
    },
    file: "guardrails.yaml",
    code: [
      ["guardrails:"],
      ['  budget: { per_run: "US$ 0.50", per_day: "US$ 20" }'],
      ["  approval: [refunds, discount > 10%]"],
      ["  log: every_step"],
      [
        "  evals: 120 real cases",
        {
          en: "before each release",
          pt: "antes de cada versão",
          es: "antes de cada versión",
        },
      ],
    ],
  },
];

function Code({ code }: { code: Line[] }) {
  const t = useT();
  return (
    <pre className="overflow-x-auto font-mono text-[12.5px] leading-[1.9] md:text-[13.5px]">
      {code.map(([c, comment], i) => {
        const m = c.match(/^(\s*)([\w.]+)(:)(.*)$/);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex gap-4 whitespace-pre"
          >
            <span className="w-4 shrink-0 text-right text-white/20 select-none">
              {i + 1}
            </span>
            <span>
              {m ? (
                <>
                  {m[1]}
                  <span className="text-[#b7a6ff]">{m[2]}</span>
                  <span className="text-white/40">{m[3]}</span>
                  <span className="text-white/85">{m[4]}</span>
                </>
              ) : (
                <span className="text-white/85">{c}</span>
              )}
              {comment && (
                <span className="text-white/30">
                  {"  # "}
                  {t(comment)}
                </span>
              )}
            </span>
          </motion.div>
        );
      })}
    </pre>
  );
}

function Anatomy() {
  const t = useT();
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];
  return (
    <section className={SECTION}>
      <SectionHead
        index="02"
        label={{ en: "Anatomy", pt: "Anatomia", es: "Anatomía" }}
        title={{
          en: "Five pieces, each one under your control.",
          pt: "Cinco peças, cada uma sob o seu controle.",
          es: "Cinco piezas, cada una bajo tu control.",
        }}
        text={{
          en: "Behind the animation there's plain configuration. You can read it, change it and audit it.",
          pt: "Por trás da animação há configuração simples. Dá para ler, mudar e auditar.",
          es: "Detrás de la animación hay configuración simple. Se puede leer, cambiar y auditar.",
        }}
      />
      <Reveal delay={0.05}>
        <div className="mt-12 grid gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col gap-2">
            {LAYERS.map((l, i) => {
              const on = i === active;
              return (
                <button
                  key={l.file}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`flex gap-3.5 rounded-2xl border p-4 text-left transition-colors ${
                    on
                      ? "border-accent bg-accent-soft"
                      : "border-line bg-surface hover:border-line-strong"
                  }`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-xl [&_svg]:size-[18px] ${on ? "bg-accent text-white" : "bg-surface-2 text-muted"}`}
                  >
                    {l.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-[15px] font-medium text-fg">
                      <span className="font-mono text-[11px] text-faint">
                        0{i + 1}
                      </span>
                      {t(l.title)}
                    </span>
                    <span
                      className={`mt-0.5 block text-[13.5px] leading-relaxed ${on ? "text-fg/75" : "text-muted"}`}
                    >
                      {t(l.text)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="stage-panel order-first flex min-h-[300px] flex-col overflow-hidden rounded-[22px] border border-white/10 text-white lg:order-none lg:min-h-[360px]">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={layer.file}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ml-3 font-mono text-[11px] text-white/55"
                >
                  {layer.file}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex-1 p-5 md:p-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={layer.file}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Code code={layer.code} />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* mapa das cinco peças, com a atual acesa */}
            <div className="grid grid-cols-5 gap-1.5 border-t border-white/10 p-4">
              {LAYERS.map((l, i) => (
                <button
                  key={l.file}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group flex flex-col items-center gap-1.5"
                  aria-label={t(l.title)}
                >
                  <span
                    className="h-1 w-full rounded-full transition-colors"
                    style={{
                      background:
                        i === active ? LIME : "rgb(255 255 255 / 0.12)",
                    }}
                  />
                  <span
                    className={`hidden truncate font-mono text-[10px] sm:block ${i === active ? "text-white/80" : "text-white/35"}`}
                  >
                    {l.file.replace(".yaml", "")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Modelo certo para cada passo ──────────────────────────────────────────── */

const ROUTES: { step: Tr; model: string; why: Tr; cost: number }[] = [
  {
    step: {
      en: "Plan and decide",
      pt: "Planejar e decidir",
      es: "Planificar y decidir",
    },
    model: "Claude · GPT",
    why: {
      en: "the hardest reasoning",
      pt: "o raciocínio mais difícil",
      es: "el razonamiento más difícil",
    },
    cost: 100,
  },
  {
    step: {
      en: "Read documents and images",
      pt: "Ler documentos e imagens",
      es: "Leer documentos e imágenes",
    },
    model: "GPT · Gemini",
    why: {
      en: "vision and long text",
      pt: "visão e texto longo",
      es: "visión y texto largo",
    },
    cost: 46,
  },
  {
    step: {
      en: "Review and double-check",
      pt: "Revisar e conferir",
      es: "Revisar y verificar",
    },
    model: "Gemini Flash",
    why: {
      en: "fast second opinion",
      pt: "segunda opinião rápida",
      es: "segunda opinión rápida",
    },
    cost: 18,
  },
  {
    step: {
      en: "Search your knowledge",
      pt: "Buscar no seu conhecimento",
      es: "Buscar en tu conocimiento",
    },
    model: "embeddings",
    why: {
      en: "cents per thousand documents",
      pt: "centavos por mil documentos",
      es: "centavos por mil documentos",
    },
    cost: 6,
  },
  {
    step: {
      en: "Look up and update systems",
      pt: "Consultar e atualizar sistemas",
      es: "Consultar y actualizar sistemas",
    },
    model: "Llama · local",
    why: {
      en: "runs on your server, data stays in",
      pt: "roda no seu servidor, os dados não saem",
      es: "corre en tu servidor, los datos no salen",
    },
    cost: 2,
  },
];

function Routing() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className={SECTION}>
      <SectionHead
        index="03"
        label={{ en: "Routing", pt: "Roteamento", es: "Enrutamiento" }}
        title={{
          en: "The right model for each step.",
          pt: "O modelo certo para cada passo.",
          es: "El modelo correcto para cada paso.",
        }}
        text={{
          en: "The expensive model only thinks where thinking pays off. Simple steps go to cheaper or local models, and nothing is tied to a single provider.",
          pt: "O modelo caro só pensa onde pensar compensa. Passos simples vão para modelos mais baratos ou locais, e nada fica preso a um fornecedor.",
          es: "El modelo caro solo piensa donde pensar compensa. Los pasos simples van a modelos más baratos o locales, y nada queda atado a un proveedor.",
        }}
      />
      <Reveal delay={0.05}>
        <div
          ref={ref}
          className="mt-12 overflow-hidden rounded-[22px] border border-line bg-surface shadow-[var(--shadow)]"
        >
          <div className="hidden grid-cols-[minmax(0,1.1fr)_minmax(0,0.8fr)_minmax(0,1.3fr)] gap-6 border-b border-line px-6 py-3 font-mono text-[11px] tracking-wider text-faint uppercase md:grid">
            <span>{t({ en: "step", pt: "passo", es: "paso" })}</span>
            <span>{t({ en: "model", pt: "modelo", es: "modelo" })}</span>
            <span>
              {t({
                en: "relative cost per call",
                pt: "custo relativo por chamada",
                es: "costo relativo por llamada",
              })}
            </span>
          </div>
          {ROUTES.map((r, i) => (
            <div
              key={r.model}
              className="grid gap-2 border-b border-line px-5 py-4 last:border-b-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.8fr)_minmax(0,1.3fr)] md:items-center md:gap-6 md:px-6"
            >
              <div>
                <div className="text-[15px] font-medium text-fg">
                  {t(r.step)}
                </div>
                <div className="text-[12.5px] text-faint">{t(r.why)}</div>
              </div>
              <span className="w-fit rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11.5px] text-fg">
                {r.model}
              </span>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "var(--accent)" }}
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${Math.max(r.cost, 2)}%` : 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
                <span className="w-10 text-right font-mono text-[12px] text-muted tabular-nums">
                  {r.cost === 2 ? "≈0" : r.cost}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] text-faint">
          {t({
            en: "Illustrative proportions (most expensive step = 100). Real prices vary by provider and volume.",
            pt: "Proporções ilustrativas (passo mais caro = 100). Os preços reais variam por fornecedor e volume.",
            es: "Proporciones ilustrativas (paso más caro = 100). Los precios reales varían según proveedor y volumen.",
          })}
        </p>
      </Reveal>
    </section>
  );
}

/* ── Sob controle ──────────────────────────────────────────────────────────── */

const APPROVALS: { what: Tr; ref: string; why: Tr; agent: number }[] = [
  {
    what: {
      en: "Refund R$ 189,90",
      pt: "Reembolso de R$ 189,90",
      es: "Reembolso de R$ 189,90",
    },
    ref: "#4821",
    why: {
      en: "Within the 7-day policy, customer's first request.",
      pt: "Dentro da política de 7 dias, primeiro pedido do cliente.",
      es: "Dentro de la política de 7 días, primer pedido del cliente.",
    },
    agent: 3,
  },
  {
    what: {
      en: "15% discount on a quote",
      pt: "Desconto de 15% num orçamento",
      es: "Descuento del 15% en un presupuesto",
    },
    ref: "#318",
    why: {
      en: "Above the 10% limit, but the client buys every month.",
      pt: "Acima do limite de 10%, mas o cliente compra todo mês.",
      es: "Sobre el límite del 10%, pero el cliente compra cada mes.",
    },
    agent: 0,
  },
  {
    what: {
      en: "Reply to a complaint",
      pt: "Resposta a uma reclamação",
      es: "Respuesta a un reclamo",
    },
    ref: "#2207",
    why: {
      en: "Reviewer flagged an upset tone. Draft is ready.",
      pt: "O revisor marcou tom irritado. O rascunho está pronto.",
      es: "El revisor marcó un tono molesto. El borrador está listo.",
    },
    agent: 3,
  },
];

/** Fila de aprovação: um pedido entra, o botão "Aprovar" é clicado e entra o próximo. */
function ApprovalDemo() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [state, setState] = useState({ i: 0, approved: false });
  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(
      () =>
        setState((s) =>
          s.approved
            ? { i: (s.i + 1) % APPROVALS.length, approved: false }
            : { ...s, approved: true },
        ),
      state.approved ? 1500 : 2600,
    );
    return () => clearTimeout(id);
  }, [state, inView]);
  const item = APPROVALS[state.i];
  const agent = AGENTS[item.agent];

  return (
    <div
      ref={ref}
      className="stage-panel flex h-full min-h-[340px] flex-col justify-center overflow-hidden rounded-[22px] border border-white/10 p-5 text-white md:p-8"
    >
      <div className="flex items-center justify-between font-mono text-[11px] text-white/45">
        <span>
          {t({ en: "approvals", pt: "aprovações", es: "aprobaciones" })}
        </span>
        <span>
          {APPROVALS.length - state.i - (state.approved ? 1 : 0)}{" "}
          {t({ en: "pending", pt: "pendentes", es: "pendientes" })}
        </span>
      </div>
      <div className="relative mt-4 h-[210px]">
        {/* cartas de trás da pilha */}
        <div className="absolute inset-x-6 top-3 h-full rounded-2xl border border-white/5 bg-white/[0.03]" />
        <div className="absolute inset-x-3 top-1.5 h-full rounded-2xl border border-white/10 bg-white/[0.04]" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={state.i}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, rotate: 4 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col rounded-2xl border border-white/15 bg-[#1b1733] p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className="flex items-center gap-1.5 font-mono text-[10.5px]"
                style={{ color: agent.color }}
              >
                <span
                  className="size-1.5 rounded-[2px]"
                  style={{ background: agent.color }}
                />
                {t(agent.role).toLowerCase()}{" "}
                {t({ en: "asks", pt: "pede", es: "pide" })}
              </span>
              <span className="font-mono text-[11px] text-white/35">
                {item.ref}
              </span>
            </div>
            <div className="mt-3 font-display text-[22px] leading-tight tracking-tight">
              {t(item.what)}
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">
              {t(item.why)}
            </p>
            <div className="mt-auto flex items-center gap-2 pt-4">
              <motion.span
                className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-medium text-[#150d36]"
                style={{ background: LIME }}
                animate={
                  state.approved ? { scale: [1, 0.92, 1] } : { scale: 1 }
                }
                transition={{ duration: 0.3 }}
              >
                <Check className="size-3.5" strokeWidth={3} />
                {state.approved
                  ? t({ en: "Approved", pt: "Aprovado", es: "Aprobado" })
                  : t({ en: "Approve", pt: "Aprovar", es: "Aprobar" })}
              </motion.span>
              <span className="rounded-full border border-white/15 px-4 py-1.5 text-[13px] text-white/70">
                {t({ en: "Edit", pt: "Editar", es: "Editar" })}
              </span>
              <AnimatePresence>
                {state.approved && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-auto font-mono text-[10.5px] text-white/45"
                  >
                    {t({
                      en: "by you · logged",
                      pt: "por você · registrado",
                      es: "por ti · registrado",
                    })}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const CONTROLS: { icon: React.ReactNode; title: Tr; text: Tr }[] = [
  {
    icon: <UserCheck />,
    title: {
      en: "A person approves what matters",
      pt: "Uma pessoa aprova o que importa",
      es: "Una persona aprueba lo importante",
    },
    text: {
      en: "Refunds, discounts, sensitive replies: you set the rules for what waits for a yes.",
      pt: "Reembolsos, descontos, respostas delicadas: você define o que espera um sim.",
      es: "Reembolsos, descuentos, respuestas delicadas: tú defines qué espera un sí.",
    },
  },
  {
    icon: <History />,
    title: {
      en: "Every step is logged",
      pt: "Cada passo fica registrado",
      es: "Cada paso queda registrado",
    },
    text: {
      en: "What each agent read, decided and did, with the time and cost. Nothing happens in a black box.",
      pt: "O que cada agente leu, decidiu e fez, com horário e custo. Nada acontece numa caixa-preta.",
      es: "Qué leyó, decidió e hizo cada agente, con hora y costo. Nada pasa en una caja negra.",
    },
  },
  {
    icon: <Wallet />,
    title: {
      en: "Budget with a ceiling",
      pt: "Orçamento com teto",
      es: "Presupuesto con techo",
    },
    text: {
      en: "Limits per run and per day. If something goes off the rails, it stops before it costs you.",
      pt: "Limites por execução e por dia. Se algo sair do trilho, para antes de custar caro.",
      es: "Límites por ejecución y por día. Si algo se desvía, se detiene antes de costar caro.",
    },
  },
  {
    icon: <Gauge />,
    title: {
      en: "Tested on real cases",
      pt: "Testado com casos reais",
      es: "Probado con casos reales",
    },
    text: {
      en: "Each change runs against a set of your real cases before going live, so quality only goes up.",
      pt: "Cada mudança roda contra um conjunto dos seus casos reais antes de ir ao ar, para a qualidade só subir.",
      es: "Cada cambio corre contra un conjunto de tus casos reales antes de salir, para que la calidad solo suba.",
    },
  },
];

function Control() {
  const t = useT();
  return (
    <section className={SECTION}>
      <SectionHead
        index="04"
        label={{ en: "Under control", pt: "Sob controle", es: "Bajo control" }}
        title={{
          en: "Autonomous where it's safe. Yours where it counts.",
          pt: "Autônomo onde é seguro. Seu onde conta.",
          es: "Autónomo donde es seguro. Tuyo donde cuenta.",
        }}
      />
      <div className="mt-12 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Reveal className="h-full">
          <ApprovalDemo />
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {CONTROLS.map((c, i) => (
            <Reveal key={c.title.en} delay={0.05 * i} className="h-full">
              <div className="flex h-full flex-col rounded-[20px] border border-line bg-surface p-5 shadow-[var(--shadow)]">
                <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent [&_svg]:size-[18px]">
                  {c.icon}
                </span>
                <h3 className="mt-4 text-[16px] font-medium text-fg">
                  {t(c.title)}
                </h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                  {t(c.text)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Como construímos ──────────────────────────────────────────────────────── */

const BUILD: { title: Tr; text: Tr; out: Tr }[] = [
  {
    title: {
      en: "Map the work",
      pt: "Mapear o trabalho",
      es: "Mapear el trabajo",
    },
    text: {
      en: "I follow how the task is done today, with real examples, and find where agents help and where a person must stay.",
      pt: "Acompanho como a tarefa é feita hoje, com exemplos reais, e vejo onde os agentes ajudam e onde uma pessoa precisa ficar.",
      es: "Sigo cómo se hace la tarea hoy, con ejemplos reales, y veo dónde ayudan los agentes y dónde debe quedar una persona.",
    },
    out: { en: "process map", pt: "mapa do processo", es: "mapa del proceso" },
  },
  {
    title: {
      en: "Prototype with your data",
      pt: "Protótipo com seus dados",
      es: "Prototipo con tus datos",
    },
    text: {
      en: "A first agent team running on your real cases, so you see the quality before anything is connected.",
      pt: "Uma primeira equipe de agentes rodando nos seus casos reais, para você ver a qualidade antes de ligar qualquer coisa.",
      es: "Un primer equipo de agentes corriendo con tus casos reales, para que veas la calidad antes de conectar nada.",
    },
    out: {
      en: "working prototype",
      pt: "protótipo funcionando",
      es: "prototipo funcionando",
    },
  },
  {
    title: {
      en: "Connect and set limits",
      pt: "Conectar e pôr limites",
      es: "Conectar y poner límites",
    },
    text: {
      en: "Tools, permissions, budgets and approval rules. The agents start acting on your systems, carefully.",
      pt: "Ferramentas, permissões, orçamento e regras de aprovação. Os agentes começam a agir nos seus sistemas, com cuidado.",
      es: "Herramientas, permisos, presupuesto y reglas de aprobación. Los agentes empiezan a actuar en tus sistemas, con cuidado.",
    },
    out: { en: "connected flow", pt: "fluxo conectado", es: "flujo conectado" },
  },
  {
    title: {
      en: "Run side by side",
      pt: "Rodar lado a lado",
      es: "Correr lado a lado",
    },
    text: {
      en: "For a while everything goes through a person. We adjust until the approvals are just a click.",
      pt: "Por um tempo tudo passa por uma pessoa. Ajustamos até as aprovações virarem só um clique.",
      es: "Por un tiempo todo pasa por una persona. Ajustamos hasta que aprobar sea solo un clic.",
    },
    out: {
      en: "assisted operation",
      pt: "operação assistida",
      es: "operación asistida",
    },
  },
  {
    title: {
      en: "Let it run, keep watching",
      pt: "Deixar rodar e acompanhar",
      es: "Dejar correr y acompañar",
    },
    text: {
      en: "The team runs on its own. You get a panel with volume, quality and cost, and I keep improving it.",
      pt: "A equipe roda sozinha. Você tem um painel com volume, qualidade e custo, e eu sigo melhorando.",
      es: "El equipo corre solo. Tienes un panel con volumen, calidad y costo, y yo sigo mejorándolo.",
    },
    out: {
      en: "monthly report",
      pt: "relatório mensal",
      es: "informe mensual",
    },
  },
];

function Build() {
  const t = useT();
  return (
    <section className="border-t border-line px-3 py-20 md:px-14 md:py-28">
      <Reveal>
        <div className="brand-panel rounded-[28px] p-6 text-white md:p-12">
          <p className="font-pixel text-[13px] font-bold tracking-[0.18em] text-[#d4ff4a]/80 uppercase">
            05 ·{" "}
            {t({
              en: "How we build it",
              pt: "Como construímos",
              es: "Cómo lo construimos",
            })}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-[36px] leading-[0.98] tracking-[-0.03em] md:text-[56px]">
            {t({
              en: "From the first case to running on its own.",
              pt: "Do primeiro caso até rodar sozinho.",
              es: "Del primer caso a correr solo.",
            })}
          </h2>
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {BUILD.map((b, i) => (
              <li
                key={b.title.en}
                className="flex flex-col rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm"
              >
                <span className="font-pixel text-[28px] font-black leading-none text-[#d4ff4a]">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-[16px] font-medium">{t(b.title)}</h3>
                <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-white/70">
                  {t(b.text)}
                </p>
                <span className="mt-4 w-fit rounded-md border border-white/15 px-2 py-0.5 font-mono text-[10.5px] text-white/70">
                  → {t(b.out)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Página ────────────────────────────────────────────────────────────────── */

const AI_FAQ: { q: Tr; a: Tr }[] = [
  {
    q: {
      en: "Will it replace my team?",
      pt: "Vai substituir a minha equipe?",
      es: "¿Va a reemplazar a mi equipo?",
    },
    a: {
      en: "It takes the repetitive part off their plate. People stay where judgment, relationships and decisions matter, and approve what the agents prepare.",
      pt: "Tira o repetitivo das mãos deles. As pessoas ficam onde importam julgamento, relacionamento e decisão, e aprovam o que os agentes preparam.",
      es: "Les quita lo repetitivo. Las personas quedan donde importan el criterio, la relación y las decisiones, y aprueban lo que preparan los agentes.",
    },
  },
  {
    q: {
      en: "Is my data safe?",
      pt: "Meus dados ficam seguros?",
      es: "¿Mis datos están seguros?",
    },
    a: {
      en: "I use provider plans that don't train on your data, give each agent only the access it needs, and can run sensitive steps on a local model that never leaves your server.",
      pt: "Uso planos dos fornecedores que não treinam com os seus dados, dou a cada agente só o acesso de que precisa e posso rodar passos sensíveis num modelo local, que não sai do seu servidor.",
      es: "Uso planes de los proveedores que no entrenan con tus datos, doy a cada agente solo el acceso que necesita y puedo correr pasos sensibles en un modelo local que no sale de tu servidor.",
    },
  },
  {
    q: {
      en: "What if the AI gets it wrong?",
      pt: "E se a IA errar?",
      es: "¿Y si la IA se equivoca?",
    },
    a: {
      en: "That's why there's a reviewer agent, approval rules and tests on real cases. Mistakes get caught before reaching a customer, and each one becomes a new test.",
      pt: "Por isso existem o agente revisor, as regras de aprovação e os testes com casos reais. O erro é pego antes de chegar no cliente, e cada um vira um teste novo.",
      es: "Por eso existen el agente revisor, las reglas de aprobación y las pruebas con casos reales. El error se atrapa antes de llegar al cliente, y cada uno se vuelve una prueba nueva.",
    },
  },
  {
    q: {
      en: "How much does it cost to run?",
      pt: "Quanto custa para rodar?",
      es: "¿Cuánto cuesta mantenerlo?",
    },
    a: {
      en: "It depends on volume, but routing keeps it low: most steps go to cheap or local models. You see the cost of every run on the panel and set a monthly ceiling.",
      pt: "Depende do volume, mas o roteamento mantém baixo: a maioria dos passos vai para modelos baratos ou locais. Você vê o custo de cada execução no painel e define um teto mensal.",
      es: "Depende del volumen, pero el enrutamiento lo mantiene bajo: la mayoría de los pasos va a modelos baratos o locales. Ves el costo de cada ejecución en el panel y defines un techo mensual.",
    },
  },
  {
    q: {
      en: "Do I need to change my systems?",
      pt: "Preciso trocar meus sistemas?",
      es: "¿Tengo que cambiar mis sistemas?",
    },
    a: {
      en: "No. The agents connect to what you already use through APIs. If something has no API, we find another way in, or I build the piece that's missing.",
      pt: "Não. Os agentes se conectam ao que você já usa pelas APIs. Se algo não tem API, achamos outro caminho, ou eu construo a peça que falta.",
      es: "No. Los agentes se conectan a lo que ya usas mediante APIs. Si algo no tiene API, buscamos otro camino, o construyo la pieza que falta.",
    },
  },
];

export function AiService() {
  return (
    <>
      <Hero />
      <UseCases />
      <Anatomy />
      <Routing />
      <Control />
      <Build />
      <Faq items={AI_FAQ} index="06" />
    </>
  );
}

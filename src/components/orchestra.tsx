"use client";

import { ArrowRight, Database, Network, Plug, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AI_PATH, HTML_LANG, useLocale, useT, type Tr } from "@/lib/i18n";
import { Odometer, Reveal, SectionLabel } from "./ui";

// Orquestra de IAs: um maestro (o mascote do Claude Code) rege quatro agentes,
// cada um num modelo. A cada compasso ele aponta a batuta para um agente, que
// trabalha; o passo entra no log e vira uma nota na partitura embaixo.

export const LIME = "#d4ff4a";
const CLAWD = "#d97757";
const CLAWD_SHADE = "#b9603f";
const STEP_MS = 1700;
const HOLD_MS = 3400;

export type Agent = {
  role: Tr;
  model: string;
  color: string;
  tokens: number;
  cost: number;
};

export const AGENTS: Agent[] = [
  {
    role: { en: "Planner", pt: "Planejador", es: "Planificador" },
    model: "Claude",
    color: "#b7a6ff",
    tokens: 1840,
    cost: 0.055,
  },
  {
    role: { en: "Research", pt: "Pesquisa", es: "Investigación" },
    model: "GPT · RAG",
    color: "#2ed3c0",
    tokens: 5260,
    cost: 0.021,
  },
  {
    role: { en: "Operator", pt: "Operador", es: "Operador" },
    model: "Llama · local",
    color: LIME,
    tokens: 720,
    cost: 0,
  },
  {
    role: { en: "Reviewer", pt: "Revisor", es: "Revisor" },
    model: "Gemini",
    color: "#ff8fc4",
    tokens: 2380,
    cost: 0.012,
  },
];

type Script = { task: Tr; steps: [agent: number, text: Tr][] };

export const SCRIPTS: Script[] = [
  {
    task: {
      en: "Answer 240 support tickets",
      pt: "Responder 240 chamados de suporte",
      es: "Responder 240 tickets de soporte",
    },
    steps: [
      [
        0,
        {
          en: "Split into 3 queues: refunds, tracking, other",
          pt: "Dividiu em 3 filas: reembolso, rastreio, outros",
          es: "Dividió en 3 colas: reembolsos, seguimiento, otros",
        },
      ],
      [
        1,
        {
          en: "Pulled 14 policies from the knowledge base",
          pt: "Buscou 14 políticas na base de conhecimento",
          es: "Buscó 14 políticas en la base de conocimiento",
        },
      ],
      [
        2,
        {
          en: "Looked up 240 orders through the ERP API",
          pt: "Consultou 240 pedidos pela API do ERP",
          es: "Consultó 240 pedidos por la API del ERP",
        },
      ],
      [
        1,
        {
          en: "Drafted replies with each order's context",
          pt: "Escreveu as respostas com o contexto de cada pedido",
          es: "Redactó las respuestas con el contexto de cada pedido",
        },
      ],
      [
        3,
        {
          en: "Flagged 6 sensitive replies for a person",
          pt: "Separou 6 respostas delicadas para uma pessoa",
          es: "Separó 6 respuestas delicadas para una persona",
        },
      ],
      [
        2,
        {
          en: "Sent 234 replies through the helpdesk",
          pt: "Enviou 234 respostas pelo helpdesk",
          es: "Envió 234 respuestas por el helpdesk",
        },
      ],
      [
        0,
        {
          en: "Wrote the day's summary for the team",
          pt: "Escreveu o resumo do dia para a equipe",
          es: "Escribió el resumen del día para el equipo",
        },
      ],
      [
        3,
        {
          en: "Checked tone and promises: all good",
          pt: "Conferiu tom e promessas: tudo certo",
          es: "Revisó tono y promesas: todo bien",
        },
      ],
    ],
  },
  {
    task: {
      en: "Turn supplier PDFs into purchase orders",
      pt: "Transformar PDFs de fornecedores em pedidos de compra",
      es: "Convertir PDFs de proveedores en órdenes de compra",
    },
    steps: [
      [
        0,
        {
          en: "Plan: read, extract, match, register",
          pt: "Plano: ler, extrair, conferir, cadastrar",
          es: "Plan: leer, extraer, cotejar, registrar",
        },
      ],
      [
        1,
        {
          en: "Read 32 PDFs, scans included",
          pt: "Leu 32 PDFs, inclusive digitalizados",
          es: "Leyó 32 PDFs, incluso escaneados",
        },
      ],
      [
        1,
        {
          en: "Extracted 418 line items",
          pt: "Extraiu 418 itens",
          es: "Extrajo 418 ítems",
        },
      ],
      [
        3,
        {
          en: "Matched 97% of SKUs to the catalog",
          pt: "Casou 97% dos SKUs com o catálogo",
          es: "Cotejó el 97% de los SKUs con el catálogo",
        },
      ],
      [
        0,
        {
          en: "Sent 12 unknown SKUs to a person",
          pt: "Mandou 12 SKUs desconhecidos para uma pessoa",
          es: "Envió 12 SKUs desconocidos a una persona",
        },
      ],
      [
        2,
        {
          en: "Created 32 purchase orders in the ERP",
          pt: "Criou 32 pedidos de compra no ERP",
          es: "Creó 32 órdenes de compra en el ERP",
        },
      ],
      [
        3,
        {
          en: "Totals checked against the invoices",
          pt: "Conferiu os totais com as notas",
          es: "Cotejó los totales con las facturas",
        },
      ],
      [
        2,
        {
          en: "Notified the buyer on WhatsApp",
          pt: "Avisou o comprador no WhatsApp",
          es: "Avisó al comprador por WhatsApp",
        },
      ],
    ],
  },
  {
    task: {
      en: "Weekly sales report across 8 channels",
      pt: "Relatório semanal de vendas dos 8 canais",
      es: "Informe semanal de ventas de los 8 canales",
    },
    steps: [
      [
        0,
        {
          en: "Plan: collect, compare, explain",
          pt: "Plano: coletar, comparar, explicar",
          es: "Plan: recopilar, comparar, explicar",
        },
      ],
      [
        2,
        {
          en: "Pulled sales from 8 channels via API",
          pt: "Puxou as vendas dos 8 canais pela API",
          es: "Trajo las ventas de los 8 canales por API",
        },
      ],
      [
        1,
        {
          en: "Compared with the last 4 weeks",
          pt: "Comparou com as últimas 4 semanas",
          es: "Comparó con las últimas 4 semanas",
        },
      ],
      [
        1,
        {
          en: "Found 3 products losing margin",
          pt: "Achou 3 produtos perdendo margem",
          es: "Encontró 3 productos perdiendo margen",
        },
      ],
      [
        3,
        {
          en: "Double-checked every number in the ERP",
          pt: "Conferiu cada número no ERP",
          es: "Verificó cada número en el ERP",
        },
      ],
      [
        0,
        {
          en: "Wrote the report in plain language",
          pt: "Escreveu o relatório em linguagem simples",
          es: "Escribió el informe en lenguaje simple",
        },
      ],
      [
        2,
        {
          en: "Generated the PDF with charts",
          pt: "Gerou o PDF com os gráficos",
          es: "Generó el PDF con los gráficos",
        },
      ],
      [
        2,
        {
          en: "Emailed it to the team",
          pt: "Mandou por e-mail para a equipe",
          es: "Lo envió por e-mail al equipo",
        },
      ],
    ],
  },
];

export const STEPS = SCRIPTS[0].steps.length;

/** Roda os roteiros em loop enquanto a seção está na tela. `step === STEPS` é o "concluído". */
export function useRun(active: boolean) {
  const [run, setRun] = useState({ s: 0, step: 0 });
  useEffect(() => {
    if (!active) return;
    const done = run.step >= STEPS;
    const id = setTimeout(
      () =>
        setRun((r) =>
          r.step >= STEPS
            ? { s: (r.s + 1) % SCRIPTS.length, step: 0 }
            : { ...r, step: r.step + 1 },
        ),
      done ? HOLD_MS : STEP_MS,
    );
    return () => clearTimeout(id);
  }, [run, active]);
  return run;
}

/* ---------- O maestro ---------- */

// Ângulo da batuta para cada agente (0° aponta para a direita, -90° para cima).
const ANGLES = [-142, -110, -72, -40];

/**
 * Mascote do Claude Code em pixel art, de batuta na mão. As coordenadas estão
 * numa grade de 24 × 18; o ombro direito (14.5, 12) é o pivô da batuta.
 */
export function Conductor({ target }: { target: number | null }) {
  const angle = target === null ? -62 : ANGLES[target];
  const look = target === null ? 0 : target < 2 ? -1 : 1;
  return (
    <svg
      viewBox="0 0 24 18"
      className="w-[136px] overflow-visible md:w-[188px]"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {/* pernas ficam no chão; o corpo balança no compasso por cima delas */}
      {[5, 7, 12, 14].map((x) => (
        <rect
          key={x}
          x={x}
          y={14.5}
          width={1}
          height={2.5}
          fill={CLAWD_SHADE}
        />
      ))}
      <g className="conduct-bob">
        <g className="conduct-arm">
          <rect x={3} y={11} width={2} height={2} fill={CLAWD} />
        </g>
        <rect x={5} y={7} width={10} height={8} fill={CLAWD} />
        <rect x={5} y={14} width={10} height={1} fill={CLAWD_SHADE} />
        {/* olhos: olham para o agente da vez e piscam */}
        <g
          style={{
            transform: `translate(${look}px, ${target === null ? 0 : -1}px)`,
            transition: "transform .35s ease",
          }}
        >
          <g className="animate-blink">
            <rect x={7} y={9} width={1} height={2} fill="#14111d" />
            <rect x={12} y={9} width={1} height={2} fill="#14111d" />
          </g>
        </g>
        {/* braço da batuta: gira até o agente e marca o tempo */}
        <g
          style={{
            transform: `rotate(${angle}deg)`,
            transformBox: "view-box",
            transformOrigin: "14.5px 12px",
            transition: "transform .6s cubic-bezier(.34,1.56,.64,1)",
          }}
        >
          <g className="baton-wobble">
            <rect x={14} y={11} width={3} height={2} fill={CLAWD} />
            <rect x={17} y={11.65} width={6.4} height={0.7} fill="#f4f1ea" />
            <rect
              x={23}
              y={11.5}
              width={1}
              height={1}
              fill={target === null ? LIME : AGENTS[target].color}
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

/* ---------- Palco ---------- */

// Centro de cada card no palco (em % da largura, com o espaço entre eles) e onde as
// linhas terminam, perto da batuta. O palco tem altura fixa de 430px no desktop.
const CARD_X = [11.9, 37.3, 62.7, 88.1];
const CARD_BOTTOM = [37.5, 31, 31, 37.5];
const BATON = { x: 52, y: 62 };

function AgentCard({
  agent,
  state,
  text,
  beat,
  className = "",
}: {
  agent: Agent;
  state: "idle" | "active" | "done";
  text: string;
  beat: string;
  className?: string;
}) {
  const t = useT();
  const on = state === "active";
  return (
    <div
      className={`relative h-[118px] rounded-2xl border bg-[#15122a]/85 p-3 backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-500 md:h-[122px] ${
        on ? "md:-translate-y-1" : "border-white/10"
      } ${className}`}
      style={
        on
          ? {
              borderColor: agent.color,
              boxShadow: `0 0 0 1px ${agent.color}, 0 14px 40px -12px ${agent.color}`,
            }
          : undefined
      }
    >
      <span className="flex min-w-0 items-center gap-1.5 text-[13px] font-medium text-white">
        <span
          className="size-2 shrink-0 rounded-[3px]"
          style={{ background: agent.color }}
        />
        <span className="truncate">{t(agent.role)}</span>
      </span>
      <div
        className="mt-1.5 flex h-4 items-center gap-1 font-mono text-[10px]"
        style={{ color: on ? agent.color : undefined }}
      >
        {on ? (
          <>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="size-1 rounded-full"
                style={{ background: agent.color }}
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
            <span className="ml-1">
              {t({ en: "working", pt: "trabalhando", es: "trabajando" })}
            </span>
          </>
        ) : state === "done" ? (
          <span className="text-white/45">
            ✓ {t({ en: "done", pt: "feito", es: "hecho" })}
          </span>
        ) : (
          <span className="text-white/30">
            {t({ en: "waiting", pt: "aguardando", es: "esperando" })}
          </span>
        )}
        <span className="ml-auto shrink-0 rounded-md border border-white/10 px-1.5 py-px text-[9.5px] text-white/55">
          {agent.model}
        </span>
      </div>
      <p
        className={`mt-1 line-clamp-3 text-[11.5px] leading-snug transition-colors md:line-clamp-2 ${on ? "text-white/85" : "text-white/40"}`}
      >
        {text || "—"}
        {on && (
          <span
            className="ml-0.5 inline-block h-3 w-[5px] translate-y-0.5 animate-pulse"
            style={{ background: agent.color }}
          />
        )}
      </p>

      {/* notinhas saindo do agente da vez */}
      <AnimatePresence>
        {on && (
          <motion.span
            key={beat}
            className="pointer-events-none absolute -top-1 right-4 flex gap-1.5 text-[15px]"
            style={{ color: agent.color }}
          >
            {["♪", "♫"].map((n, i) => (
              <motion.span
                key={n}
                initial={{ opacity: 0, y: 6 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -30,
                  x: i ? 10 : -6,
                  rotate: i ? 14 : -10,
                }}
                transition={{ duration: 1.5, delay: i * 0.25, ease: "easeOut" }}
              >
                {n}
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stage({ script, step }: { script: Script; step: number }) {
  const t = useT();
  const target = step < STEPS ? script.steps[step][0] : null;
  const seen = script.steps.slice(0, Math.min(step + 1, STEPS));
  const last = (a: number) => [...seen].reverse().find(([x]) => x === a)?.[1];

  return (
    <div className="relative md:h-[430px]">
      {/* luz de palco sobre o maestro */}
      <div
        className="pointer-events-none absolute top-[-24px] left-1/2 hidden h-[calc(100%+24px)] w-[380px] -translate-x-1/2 md:block"
        style={{
          clipPath: "polygon(44% 0, 56% 0, 100% 100%, 0 100%)",
          background:
            "linear-gradient(to bottom, rgb(255 236 205 / 0.16), rgb(255 236 205 / 0.015) 85%)",
        }}
      />

      {/* fios do maestro até cada agente */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden size-full md:block"
        aria-hidden
      >
        {AGENTS.map((a, i) => {
          const on = target === i;
          const d = `M ${CARD_X[i]} ${CARD_BOTTOM[i]} Q ${CARD_X[i]} ${BATON.y} ${BATON.x} ${BATON.y}`;
          return (
            <g key={i}>
              <path
                d={d}
                fill="none"
                stroke="rgb(255 255 255 / 0.09)"
                strokeWidth={1.2}
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={d}
                fill="none"
                stroke={a.color}
                strokeWidth={2}
                strokeDasharray="5 7"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="dash-flow"
                style={{ opacity: on ? 1 : 0, transition: "opacity .4s ease" }}
              />
            </g>
          );
        })}
      </svg>

      <div className="relative grid grid-cols-2 gap-2 md:absolute md:inset-x-0 md:top-3 md:grid-cols-4 md:gap-2.5">
        {AGENTS.map((a, i) => (
          <AgentCard
            key={i}
            agent={a}
            state={target === i ? "active" : last(i) ? "done" : "idle"}
            text={t(last(i) ?? "")}
            beat={`${t(script.task)}-${step}`}
            className={i === 0 || i === 3 ? "md:mt-7" : ""}
          />
        ))}
      </div>

      <div className="relative mt-8 flex flex-col items-center md:absolute md:inset-x-0 md:bottom-2 md:mt-0">
        <Conductor target={target} />
        {/* púlpito */}
        <div className="relative -mt-0.5 flex h-[30px] w-[200px] items-center justify-center rounded-lg border border-white/10 bg-[#1d1838] font-mono text-[10px] tracking-[0.14em] text-white/55 uppercase shadow-[0_-1px_0_#d4ff4a55_inset,0_20px_40px_-10px_rgb(0_0_0/0.8)]">
          <span
            className="mr-2 size-1.5 rounded-full"
            style={{ background: LIME, boxShadow: `0 0 8px ${LIME}` }}
          />
          {t({ en: "orchestrator", pt: "orquestrador", es: "orquestador" })}
        </div>
        <div className="mt-1 h-3 w-[260px] rounded-[50%] bg-[radial-gradient(closest-side,rgb(212_255_74/0.22),transparent)]" />
      </div>
    </div>
  );
}

/* ---------- Log e números ---------- */

function RunLog({
  script,
  step,
  s,
}: {
  script: Script;
  step: number;
  s: number;
}) {
  const t = useT();
  const { locale } = useLocale();
  const lang = HTML_LANG[locale];
  const shown = script.steps.slice(0, Math.min(step + 1, STEPS));
  const done = step >= STEPS;
  const tokens = shown.reduce(
    (sum, [a], i) => sum + AGENTS[a].tokens + i * 37,
    0,
  );
  const cost = shown.reduce((sum, [a]) => sum + AGENTS[a].cost, 0);
  const models = new Set(shown.map(([a]) => a)).size;
  const secs = (i: number) =>
    (i * (STEP_MS / 1000) + 0.4).toLocaleString(lang, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between font-mono text-[11px] text-white/45">
        <span>run.log</span>
        <span>
          {t({ en: "step", pt: "passo", es: "paso" })}{" "}
          {Math.min(step + 1, STEPS)}/{STEPS}
        </span>
      </div>
      <div className="relative mt-3 flex h-[232px] flex-col justify-end overflow-hidden font-mono text-[11.5px] leading-relaxed lg:h-auto lg:flex-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-[#110e22] to-transparent" />
        <AnimatePresence initial={false}>
          {shown.map(([a, text], i) => (
            <motion.div
              key={`${s}-${i}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex gap-2 py-0.5"
            >
              <span className="w-9 shrink-0 text-right text-white/25">
                {secs(i)}s
              </span>
              <span className="text-white/70">
                <span style={{ color: AGENTS[a].color }}>
                  {t(AGENTS[a].role).toLowerCase()}
                </span>{" "}
                <span className="text-white/25">›</span> {t(text)}
              </span>
            </motion.div>
          ))}
          {done && (
            <motion.div
              key={`${s}-done`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 flex gap-2 py-0.5"
            >
              <span className="w-9 shrink-0" />
              <span style={{ color: LIME }}>
                ✓{" "}
                {t({
                  en: "Done. Report ready for you.",
                  pt: "Pronto. Resultado entregue para você.",
                  es: "Listo. Resultado entregado para ti.",
                })}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
        {[
          {
            label: { en: "tokens", pt: "tokens", es: "tokens" },
            value: (
              <Odometer
                value={tokens}
                format={(n) => Math.round(n).toLocaleString(lang)}
              />
            ),
          },
          {
            label: { en: "cost", pt: "custo", es: "costo" },
            value: (
              <>
                <span className="mr-0.5 text-[0.6em] text-white/45">US$</span>
                <Odometer
                  value={cost}
                  format={(n) =>
                    n.toLocaleString(lang, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }
                />
              </>
            ),
          },
          {
            label: { en: "models", pt: "modelos", es: "modelos" },
            value: <Odometer value={models} />,
          },
        ].map((m) => (
          <div key={m.label.en}>
            <div className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
              {t(m.label)}
            </div>
            <div className="mt-0.5 flex items-baseline font-display text-[22px] tracking-tight text-white">
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Partitura ---------- */

/** Colcheia em pixel: cabeça, haste e bandeirinha. */
function Note({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 6 9"
      className="h-[18px] w-3"
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x={0} y={6} width={3} height={3} fill={color} />
      <rect x={2} y={0} width={1} height={7} fill={color} />
      <rect x={3} y={1} width={1} height={1} fill={color} />
      <rect x={4} y={2} width={1} height={2} fill={color} />
    </svg>
  );
}

function Score({ script, step }: { script: Script; step: number }) {
  const t = useT();
  const done = step >= STEPS;
  const head = Math.min(step, STEPS - 1);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-white/45">
        <span>{t({ en: "score", pt: "partitura", es: "partitura" })}</span>
        <span>
          {t({
            en: "each note is one model call",
            pt: "cada nota é uma chamada de modelo",
            es: "cada nota es una llamada a un modelo",
          })}
        </span>
      </div>
      <div className="relative mt-3">
        {AGENTS.map((a, row) => (
          <div key={row} className="flex h-9 items-center">
            <span className="flex w-[78px] shrink-0 items-center gap-1.5 truncate font-mono text-[10.5px] text-white/55 md:w-[112px]">
              <span
                className="size-1.5 shrink-0 rounded-[2px]"
                style={{ background: a.color }}
              />
              {t(a.role).toLowerCase()}
            </span>
            <div className="relative h-full flex-1">
              {/* pauta de 5 linhas */}
              <div className="absolute inset-x-0 top-1/2 flex h-5 -translate-y-1/2 flex-col justify-between">
                {[0, 1, 2, 3, 4].map((l) => (
                  <span key={l} className="h-px bg-white/[0.09]" />
                ))}
              </div>
              {script.steps.map(([agent], col) =>
                agent === row ? (
                  <AnimatePresence key={col}>
                    {col <= step && (
                      <motion.span
                        className="absolute"
                        style={{
                          left: `calc(${((col + 0.5) / STEPS) * 100}% - 6px)`,
                          top: `${4 + ((col * 3 + row) % 4) * 2.5}px`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          duration: 0.5,
                          bounce: 0.5,
                        }}
                      >
                        <Note color={a.color} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                ) : null,
              )}
            </div>
          </div>
        ))}
        {/* barras de compasso e a agulha que toca */}
        <div className="pointer-events-none absolute inset-y-0 right-0 left-[78px] md:left-[112px]">
          {Array.from({ length: STEPS + 1 }, (_, i) => (
            <span
              key={i}
              className="absolute inset-y-1 w-px bg-white/[0.06]"
              style={{ left: `${(i / STEPS) * 100}%` }}
            />
          ))}
          <motion.span
            className="absolute -inset-y-1 w-0.5 rounded-full"
            style={{ background: LIME, boxShadow: `0 0 12px ${LIME}` }}
            animate={{
              left: `${((head + 0.5) / STEPS) * 100}%`,
              opacity: done ? 0 : 1,
            }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Painel completo (página do serviço) ---------- */

/** Palco, log e partitura num painel só. Roda enquanto está na tela. */
export function OrchestraPanel() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const { s, step } = useRun(inView);
  const script = SCRIPTS[s];
  const done = step >= STEPS;

  return (
    <div
      ref={ref}
      className="stage-panel overflow-hidden rounded-[28px] border border-white/10 text-white"
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 font-mono text-[11px] md:px-6">
        <span className="hidden text-white/40 sm:inline">orchestra.run</span>
        <span className="hidden text-white/20 sm:inline">·</span>
        <span className="min-w-0 flex-1 truncate text-white/80">
          <span className="text-white/40">
            {t({ en: "task", pt: "tarefa", es: "tarea" })}:{" "}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="inline-block"
            >
              “{t(script.task)}”
            </motion.span>
          </AnimatePresence>
        </span>
        <span
          className="flex shrink-0 items-center gap-1.5"
          style={{ color: done ? LIME : undefined }}
        >
          {done ? (
            <>✓ {t({ en: "done", pt: "pronto", es: "listo" })}</>
          ) : (
            <>
              <span className="live-dot size-1.5 rounded-full bg-[#22c55e]" />
              <span className="text-white/55">
                {t({ en: "live", pt: "ao vivo", es: "en vivo" })}
              </span>
            </>
          )}
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="p-4 md:p-6">
          <Stage script={script} step={step} />
        </div>
        <div className="border-t border-white/10 p-4 md:p-6 lg:border-t-0 lg:border-l">
          <RunLog script={script} step={step} s={s} />
        </div>
      </div>

      <div className="border-t border-white/10 p-4 md:p-6">
        <Score script={script} step={step} />
      </div>
    </div>
  );
}

export const CAPABILITIES: {
  icon: React.ReactNode;
  title: Tr;
  text: Tr;
  tags: string[];
}[] = [
  {
    icon: <Network />,
    title: {
      en: "Agents that split the work",
      pt: "Agentes que dividem o trabalho",
      es: "Agentes que dividen el trabajo",
    },
    text: {
      en: "A planner breaks the task down, specialists do their part and a reviewer checks before anything goes out.",
      pt: "Um planejador quebra a tarefa, especialistas fazem cada parte e um revisor confere antes de qualquer coisa sair.",
      es: "Un planificador divide la tarea, los especialistas hacen su parte y un revisor verifica antes de que algo salga.",
    },
    tags: ["multi-agent", "workflows"],
  },
  {
    icon: <Database />,
    title: {
      en: "Answers from your data",
      pt: "Respostas a partir dos seus dados",
      es: "Respuestas desde tus datos",
    },
    text: {
      en: "RAG over documents, spreadsheets and the ERP, with the source of each answer so nobody has to take it on faith.",
      pt: "RAG em documentos, planilhas e no ERP, com a fonte de cada resposta para ninguém precisar confiar no escuro.",
      es: "RAG sobre documentos, planillas y el ERP, con la fuente de cada respuesta para no tener que creer a ciegas.",
    },
    tags: ["RAG", "embeddings"],
  },
  {
    icon: <Plug />,
    title: {
      en: "Plugged into your tools",
      pt: "Ligado nas suas ferramentas",
      es: "Conectado a tus herramientas",
    },
    text: {
      en: "APIs, MCP, WhatsApp, email and the ERP: the agents act on real systems, not just chat about them.",
      pt: "APIs, MCP, WhatsApp, e-mail e o ERP: os agentes agem nos sistemas de verdade, não só conversam sobre eles.",
      es: "APIs, MCP, WhatsApp, e-mail y el ERP: los agentes actúan en los sistemas reales, no solo conversan sobre ellos.",
    },
    tags: ["MCP", "tool use", "APIs"],
  },
  {
    icon: <ShieldCheck />,
    title: {
      en: "Right model, under control",
      pt: "Modelo certo, sob controle",
      es: "Modelo correcto, bajo control",
    },
    text: {
      en: "Each step goes to the model that fits it, cheap ones for simple work. Logs, limits and a person approving what matters.",
      pt: "Cada passo vai para o modelo que faz sentido, os baratos no trabalho simples. Logs, limites e uma pessoa aprovando o que importa.",
      es: "Cada paso va al modelo que corresponde, los baratos para el trabajo simple. Logs, límites y una persona aprobando lo importante.",
    },
    tags: ["routing", "guardrails", "evals"],
  },
];

/* ---------- Seção da home ---------- */

// Posições dos agentes no palco compacto (centro, em % da largura e da altura):
// em arco a partir de md, em duas linhas no celular.
const MINI_POS = [
  { x: 17, y: 20 },
  { x: 39, y: 9 },
  { x: 61, y: 9 },
  { x: 83, y: 20 },
];
const MINI_POS_MOBILE = [
  { x: 25, y: 10 },
  { x: 75, y: 10 },
  { x: 25, y: 27 },
  { x: 75, y: 27 },
];
const MINI_BATON = { x: 52, y: 60 };

/** Palco compacto: o maestro aponta para os agentes e a fala da vez aparece embaixo. */
function MiniStage() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const { s, step } = useRun(inView);
  const script = SCRIPTS[s];
  const target = step < STEPS ? script.steps[step][0] : null;
  const line = step < STEPS ? script.steps[step] : null;

  return (
    <div
      ref={ref}
      className="stage-panel relative flex h-full min-h-[420px] flex-col overflow-hidden text-white"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 font-mono text-[11px]">
        <span className="live-dot size-1.5 shrink-0 rounded-full bg-[#22c55e]" />
        <span className="min-w-0 flex-1 truncate text-white/70">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={s}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              “{t(script.task)}”
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="shrink-0 text-white/40">
          {Math.min(step + 1, STEPS)}/{STEPS}
        </span>
      </div>

      <div className="relative flex-1">
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-full w-[300px] -translate-x-1/2"
          style={{
            clipPath: "polygon(43% 0, 57% 0, 100% 100%, 0 100%)",
            background:
              "linear-gradient(to bottom, rgb(255 236 205 / 0.14), rgb(255 236 205 / 0.01) 85%)",
          }}
        />
        {[MINI_POS_MOBILE, MINI_POS].map((pos, k) => (
          <svg
            key={k}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className={`pointer-events-none absolute inset-0 size-full ${k ? "hidden md:block" : "md:hidden"}`}
            aria-hidden
          >
            {AGENTS.map((a, i) => {
              const p = pos[i];
              const d = `M ${p.x} ${p.y + 6} Q ${p.x} ${MINI_BATON.y} ${MINI_BATON.x} ${MINI_BATON.y}`;
              return (
                <g key={i}>
                  <path
                    d={d}
                    fill="none"
                    stroke="rgb(255 255 255 / 0.09)"
                    strokeWidth={1.2}
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke={a.color}
                    strokeWidth={2}
                    strokeDasharray="5 7"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="dash-flow"
                    style={{
                      opacity: target === i ? 1 : 0,
                      transition: "opacity .4s ease",
                    }}
                  />
                </g>
              );
            })}
          </svg>
        ))}
        {AGENTS.map((a, i) => {
          const on = target === i;
          return (
            <div
              key={i}
              className="absolute top-(--ym) left-(--xm) flex -translate-x-1/2 -translate-y-1/2 md:top-(--y) md:left-(--x) flex-col items-center rounded-xl border bg-[#15122a]/90 px-2.5 py-1.5 transition-[border-color,box-shadow] duration-500"
              style={{
                ["--x" as string]: `${MINI_POS[i].x}%`,
                ["--y" as string]: `${MINI_POS[i].y}%`,
                ["--xm" as string]: `${MINI_POS_MOBILE[i].x}%`,
                ["--ym" as string]: `${MINI_POS_MOBILE[i].y}%`,
                borderColor: on ? a.color : "rgb(255 255 255 / 0.1)",
                boxShadow: on
                  ? `0 0 0 1px ${a.color}, 0 10px 30px -10px ${a.color}`
                  : undefined,
              }}
            >
              <span className="flex items-center gap-1.5 text-[12px] font-medium whitespace-nowrap">
                <span
                  className="size-1.5 rounded-[2px]"
                  style={{ background: a.color }}
                />
                {t(a.role)}
              </span>
              <span className="font-mono text-[9.5px] whitespace-nowrap text-white/45">
                {a.model}
              </span>
            </div>
          );
        })}
        <div className="absolute inset-x-0 bottom-3 flex flex-col items-center">
          <Conductor target={target} />
          <div className="-mt-0.5 h-2.5 w-[180px] rounded-[50%] bg-[radial-gradient(closest-side,rgb(212_255_74/0.25),transparent)]" />
        </div>
      </div>

      <div className="flex h-[58px] items-center border-t border-white/10 px-4 font-mono text-[11.5px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`${s}-${step}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="line-clamp-2 text-white/75"
          >
            {line ? (
              <>
                <span style={{ color: AGENTS[line[0]].color }}>
                  {t(AGENTS[line[0]].role).toLowerCase()}
                </span>
                <span className="text-white/25"> › </span>
                {t(line[1])}
              </>
            ) : (
              <span style={{ color: LIME }}>
                ✓{" "}
                {t({
                  en: "Done. Result handed to you.",
                  pt: "Pronto. Resultado entregue para você.",
                  es: "Listo. Resultado entregado para ti.",
                })}
              </span>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function AiSection() {
  const t = useT();
  const { locale } = useLocale();
  return (
    <section
      id="ai"
      className="border-t border-line px-5 py-24 md:px-14 md:py-32"
    >
      <Reveal>
        <SectionLabel index="03">
          {t({ en: "AI agents", pt: "Agentes de IA", es: "Agentes de IA" })}
        </SectionLabel>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-3xl font-display text-[44px] leading-[0.98] tracking-[-0.03em] text-fg md:text-[72px]">
            {t({
              en: "Multi-agent automations.",
              pt: "Automações multiagente.",
              es: "Automatizaciones multiagente.",
            })}{" "}
            <span className="text-faint">
              {t({
                en: "AI that works as a team.",
                pt: "IA que trabalha em equipe.",
                es: "IA que trabaja en equipo.",
              })}
            </span>
          </h2>
          <p className="max-w-xs text-[14px] leading-relaxed text-muted md:text-right">
            {t({
              en: "Agents that split the work between LLMs, read your data, use your tools and call a person when it matters. Not a chatbot: a team that delivers.",
              pt: "Agentes que dividem o trabalho entre LLMs, leem seus dados, usam suas ferramentas e chamam uma pessoa quando importa. Não é um chatbot: é uma equipe que entrega.",
              es: "Agentes que dividen el trabajo entre LLMs, leen tus datos, usan tus herramientas y llaman a una persona cuando importa. No es un chatbot: es un equipo que entrega.",
            })}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-14 grid overflow-hidden rounded-[24px] border border-line bg-surface shadow-[var(--shadow)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <MiniStage />
          <div className="flex flex-col p-6 md:p-8">
            <p className="font-mono text-[11px] tracking-wider text-faint uppercase">
              {t({
                en: "What the team does",
                pt: "O que a equipe faz",
                es: "Lo que hace el equipo",
              })}
            </p>
            <ul className="mt-2">
              {CAPABILITIES.map((c) => (
                <li
                  key={c.title.en}
                  className="flex gap-3.5 border-b border-line py-4 last:border-b-0"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent [&_svg]:size-4">
                    {c.icon}
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium text-fg">
                      {t(c.title)}
                    </span>
                    <span className="mt-0.5 block text-[13.5px] leading-relaxed text-muted">
                      {t(c.text)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={AI_PATH[locale]}
              className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-[14px] font-medium text-bg transition-transform hover:-translate-y-0.5 lg:mt-auto"
            >
              {t({
                en: "See how it works",
                pt: "Ver como funciona",
                es: "Ver cómo funciona",
              })}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

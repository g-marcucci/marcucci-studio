// Ícones em pixel art, na mesma grade do mascote: 12 × 12, desenhados à mão.
// "a" é o traço principal (cor do texto), "b" o detalhe em meio-tom e "." vazio.

const ICONS = {
  // agentes que dividem o trabalho: um nó que distribui para dois
  network: [
    "....aaaa....",
    "....abba....",
    "....aaaa....",
    ".....aa.....",
    ".....aa.....",
    "..aaaaaaaa..",
    "..a......a..",
    "..a......a..",
    "aaaa....aaaa",
    "abba....abba",
    "aaaa....aaaa",
    "............",
  ],
  // base de conhecimento em camadas
  database: [
    "..aaaaaaaa..",
    ".a........a.",
    ".aaaaaaaaaa.",
    ".a........a.",
    ".a.bb.....a.",
    ".aaaaaaaaaa.",
    ".a........a.",
    ".a.bb.....a.",
    ".aaaaaaaaaa.",
    ".a........a.",
    "..aaaaaaaa..",
    "............",
  ],
  // conector: ligado às suas ferramentas
  plug: [
    "...a....a...",
    "...a....a...",
    ".aaaaaaaaaa.",
    ".a........a.",
    ".a..bbbb..a.",
    ".a........a.",
    "..a......a..",
    "...aaaaaa...",
    ".....aa.....",
    ".....aa.....",
    ".....aa.....",
    "............",
  ],
  // escudo com o visto
  shield: [
    ".....aa.....",
    "...aa..aa...",
    ".aa......aa.",
    ".a........a.",
    ".a.......aa.",
    ".a......aa.a",
    ".a.a...aa..a",
    "..aaa.aa..a.",
    "..a.aaa...a.",
    "...a.a...a..",
    "....a..a....",
    ".....aa.....",
  ],
  // atendimento
  headset: [
    "...aaaaaa...",
    "..a......a..",
    ".a........a.",
    ".a........a.",
    "a..........a",
    "a..........a",
    "aaa......aaa",
    "abba....abba",
    "abba....abba",
    "abba....abba",
    "aaa......aaa",
    "............",
  ],
  // documento que vira linhas de dados
  document: [
    ".aaaaaaa....",
    ".a.....aa...",
    ".a.....a.a..",
    ".a.....aaaa.",
    ".a.bbbbb..a.",
    ".a........a.",
    ".a.bbbbbb.a.",
    ".a........a.",
    ".a.bbbb...a.",
    ".a........a.",
    ".aaaaaaaaaa.",
    "............",
  ],
  // relatório: barras e a tendência por cima
  chart: [
    "..........b.",
    ".........bb.",
    "........b.b.",
    "...b...b....",
    "..b.b.b.....",
    ".b...b......",
    "b...........",
    "........aa..",
    ".....aa.aa..",
    "..aa.aa.aa..",
    "..aa.aa.aa..",
    "aaaaaaaaaaaa",
  ],
  // conversa
  chat: [
    "..aaaaaaaa..",
    ".a........a.",
    "a..........a",
    "a..........a",
    "a..b..b..b.a",
    "a..........a",
    ".a........a.",
    "..aaaaaaaa..",
    "..a.........",
    ".a..........",
    "a...........",
    "............",
  ],
  // rotina de back-office
  clipboard: [
    "....aaaa....",
    ".aaa.bb.aaa.",
    ".a........a.",
    ".a.b.aaaa.a.",
    ".a........a.",
    ".a.b.aaaa.a.",
    ".a........a.",
    ".a.b.aaa..a.",
    ".a........a.",
    ".a........a.",
    ".aaaaaaaaaa.",
    "............",
  ],
  // livro aberto
  book: [
    "............",
    "aaaaa..aaaaa",
    "a...aaaa...a",
    "a.bb.aa.bb.a",
    "a....aa....a",
    "a.bb.aa.bb.a",
    "a....aa....a",
    "a.bb.aa....a",
    "a....aa....a",
    "aaaaaaaaaaaa",
    ".....aa.....",
    "............",
  ],
  // orquestrador: a cabecinha que rege
  bot: [
    ".....b......",
    ".....a......",
    "..aaaaaaaa..",
    ".a........a.",
    ".a.aa..aa.a.",
    ".a.aa..aa.a.",
    ".a........a.",
    ".a..bbbb..a.",
    ".a........a.",
    "..aaaaaaaa..",
    "...a....a...",
    "..aa....aa..",
  ],
  // caixa marcada: aprovado
  approve: [
    ".aaaaaaaaaa.",
    "a..........a",
    "a..........a",
    "a........a.a",
    "a.......aa.a",
    "a.a....aa..a",
    "a.aa..aa...a",
    "a..aaaa....a",
    "a...aa.....a",
    "a..........a",
    "a..........a",
    ".aaaaaaaaaa.",
  ],
  // log: linhas de terminal
  log: [
    "aaaaaaaaaaaa",
    "a..........a",
    "a.b.aaaaa..a",
    "a..........a",
    "a.b.aaaaaa.a",
    "a..........a",
    "a.b.aaaa...a",
    "a..........a",
    "a.bb.......a",
    "a..........a",
    "aaaaaaaaaaaa",
    "............",
  ],
  // orçamento: barras abaixo do teto tracejado
  budget: [
    "bb.bb.bb.bb.",
    "............",
    ".........aa.",
    "......aa.aa.",
    "......aa.aa.",
    "...aa.aa.aa.",
    "...aa.aa.aa.",
    "aa.aa.aa.aa.",
    "aa.aa.aa.aa.",
    "aa.aa.aa.aa.",
    "aaaaaaaaaaaa",
    "............",
  ],
  // testes: a grade de casos com um que falhou
  tests: [
    "............",
    "aa.aa.aa.aa.",
    "aa.aa.aa.aa.",
    "............",
    "aa.aa.bb.aa.",
    "aa.aa.bb.aa.",
    "............",
    "aa.aa.aa.aa.",
    "aa.aa.aa.aa.",
    "............",
    "aa.aa.aa.aa.",
    "aa.aa.aa.aa.",
  ],
} satisfies Record<string, string[]>;

export type PixelIconName = keyof typeof ICONS;

/** Ícone em pixel; herda a cor do texto. Em 24px cada pixel da grade vira 2px na tela. */
export function PixelIcon({ name, size = 24, className = "" }: { name: PixelIconName; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges" className={className} aria-hidden>
      {ICONS[name].flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "." ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" opacity={c === "b" ? 0.5 : 1} />
          ),
        ),
      )}
    </svg>
  );
}

// Mascote em pixel art da Marcucci Studio: um "bloco" violeta com olhos de cursor.
// . vazio · d contorno · b corpo · l brilho · s sombra
const BODY = [
  "...dddddddd...",
  "..dbbbbbbbbd..",
  ".dbllbbbbbbbd.",
  "dblblbbbbbbbbd",
  "dbllbbbbbbbbbd",
  "dblbbbbbbbbbbd",
  "dbbbbbbbbbbbbd",
  "dbbbbbbbbbbbbd",
  "dbbbbbbbbbbbbd",
  "dbbbbbbbbbbbsd",
  "dbbbbbbbbbbsbd",
  ".dbbbbbbbbsbd.",
  "..dbbbbbsbsd..",
  "...dddddddd...",
];

const COLORS: Record<string, string> = {
  d: "#3a23b8",
  b: "#6a4df5",
  l: "#a796ff",
  s: "#5238e0",
};

const EYES = [
  [4, 5],
  [4, 6],
  [4, 7],
  [9, 5],
  [9, 6],
  [9, 7],
];

export function Avatar({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      {BODY.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={COLORS[c]} />,
        ),
      )}
      <g className="animate-blink">
        {EYES.map(([x, y]) => (
          <rect key={`e${x}-${y}`} x={x} y={y} width={1} height={1} fill="#fff" />
        ))}
      </g>
    </svg>
  );
}

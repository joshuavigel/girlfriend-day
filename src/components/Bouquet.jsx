// A big wrapped bouquet of purple flowers, drawn as one SVG so it scales cleanly.

const BLOOMS = [
  { cx: 100, cy: 40, r: 30, tone: 0 },
  { cx: 57, cy: 60, r: 26, tone: 1 },
  { cx: 143, cy: 60, r: 26, tone: 1 },
  { cx: 100, cy: 78, r: 22, tone: 2 },
  { cx: 77, cy: 100, r: 25, tone: 0 },
  { cx: 123, cy: 100, r: 25, tone: 2 },
  { cx: 37, cy: 101, r: 20, tone: 2 },
  { cx: 163, cy: 101, r: 20, tone: 0 },
  { cx: 64, cy: 133, r: 18, tone: 1 },
  { cx: 136, cy: 133, r: 18, tone: 1 },
  { cx: 100, cy: 124, r: 19, tone: 0 },
]

const TONES = [
  ['#c4a0f5', '#8b5cf6', '#6d28d9'],
  ['#e4d3fb', '#b388f0', '#8b5cf6'],
  ['#f0c8f2', '#c084d8', '#9333a8'],
]

const LEAVES = [
  { x: 30, y: 132, rot: -48 },
  { x: 170, y: 132, rot: 48 },
  { x: 48, y: 158, rot: -28 },
  { x: 152, y: 158, rot: 28 },
  { x: 88, y: 150, rot: -10 },
]

export default function Bouquet({ width = 240 }) {
  return (
    <svg width={width} height={width * 1.12} viewBox="0 0 200 224" fill="none">
      <defs>
        {TONES.map(([light, mid, deep], i) => (
          <radialGradient key={i} id={`bq-p${i}`} cx="50%" cy="80%" r="70%">
            <stop offset="0%" stopColor={deep} />
            <stop offset="55%" stopColor={mid} />
            <stop offset="100%" stopColor={light} />
          </radialGradient>
        ))}
        <linearGradient id="bq-wrap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" />
          <stop offset="55%" stopColor="#efe1fb" />
          <stop offset="100%" stopColor="#dcc6f5" />
        </linearGradient>
      </defs>

      {/* stems, fanning up from the wrap */}
      <g stroke="#7aa85a" strokeWidth="3.4" strokeLinecap="round" opacity="0.9">
        {BLOOMS.map((b, i) => (
          <path key={i} d={`M100 196 Q ${(100 + b.cx) / 2} ${(196 + b.cy) / 2} ${b.cx} ${b.cy}`} />
        ))}
      </g>

      {/* leaves — pointed, with a centre vein */}
      {LEAVES.map((l, i) => (
        <g key={i} transform={`rotate(${l.rot} ${l.x} ${l.y})`}>
          <path
            d={`M${l.x} ${l.y - 21} C ${l.x + 11} ${l.y - 7}, ${l.x + 8} ${l.y + 11}, ${l.x} ${l.y + 21}
                C ${l.x - 8} ${l.y + 11}, ${l.x - 11} ${l.y - 7}, ${l.x} ${l.y - 21} Z`}
            fill="#8cbf63"
          />
          <path
            d={`M${l.x} ${l.y - 17} L${l.x} ${l.y + 17}`}
            stroke="#6f9e4c"
            strokeWidth="1.3"
            opacity="0.75"
          />
        </g>
      ))}

      {/* paper wrap */}
      <path d="M56 138 L144 138 L118 218 L82 218 Z" fill="url(#bq-wrap)" />
      <path d="M56 138 L100 138 L100 218 L82 218 Z" fill="#ffffff" opacity="0.35" />
      <path
        d="M56 138 L144 138 L118 218 L82 218 Z"
        fill="none"
        stroke="#c9aeeb"
        strokeWidth="1.6"
        opacity="0.7"
      />

      {/* ribbon: a band, two soft loops and trailing tails */}
      <rect x="70" y="170" width="60" height="10" rx="5" fill="#a855f7" />
      <path d="M88 175 C 74 163, 62 168, 68 175 C 62 182, 74 187, 88 175 Z" fill="#b968f9" />
      <path d="M112 175 C 126 163, 138 168, 132 175 C 138 182, 126 187, 112 175 Z" fill="#b968f9" />
      <path
        d="M96 180 C 92 190, 88 197, 84 204"
        stroke="#9333ea"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M104 180 C 108 190, 113 196, 118 202"
        stroke="#9333ea"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="100" cy="175" r="5" fill="#d8b4fe" />

      {/* blooms, drawn last so they sit on top of the stems */}
      {BLOOMS.map((b, i) => (
        <g key={i}>
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx={b.cx}
              cy={b.cy - b.r * 0.6}
              rx={b.r * 0.42}
              ry={b.r * 0.62}
              fill={`url(#bq-p${b.tone})`}
              transform={`rotate(${deg} ${b.cx} ${b.cy})`}
            />
          ))}
          <circle cx={b.cx} cy={b.cy} r={b.r * 0.28} fill="#fde68a" />
          <circle cx={b.cx} cy={b.cy} r={b.r * 0.16} fill="#fbbf24" />
        </g>
      ))}
    </svg>
  )
}

// Hand-rolled SVG clip art: purple flowers + matcha drinks.
// Each accepts a `size` and inherits animation from its wrapper in App.jsx.

let uid = 0
const nextId = () => `d${++uid}`

export function Flower({ size = 64, tone = 'violet' }) {
  const id = nextId()
  const tones = {
    violet: ['#c4a0f5', '#8b5cf6', '#6d3fc4'],
    lilac: ['#e4d3fb', '#b388f0', '#8b5cf6'],
    orchid: ['#f0c8f2', '#c084d8', '#9333a8'],
  }
  const [light, mid, deep] = tones[tone] || tones.violet

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id={`${id}p`} cx="50%" cy="80%" r="70%">
          <stop offset="0%" stopColor={deep} />
          <stop offset="55%" stopColor={mid} />
          <stop offset="100%" stopColor={light} />
        </radialGradient>
      </defs>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="50"
          cy="26"
          rx="15"
          ry="23"
          fill={`url(#${id}p)`}
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="11" fill="#fde68a" />
      <circle cx="50" cy="50" r="6" fill="#fbbf24" />
      <circle cx="47" cy="47" r="2" fill="#fef3c7" />
    </svg>
  )
}

export function Matcha({ size = 60 }) {
  const id = nextId()
  return (
    <svg width={size} height={size * 1.55} viewBox="0 0 60 93" fill="none">
      <defs>
        <linearGradient id={`${id}m`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a3d977" />
          <stop offset="55%" stopColor="#8bc34a" />
          <stop offset="100%" stopColor="#7cb342" />
        </linearGradient>
      </defs>

      {/* straw */}
      <rect x="34" y="4" width="7" height="26" rx="3.5" fill="#f9a8d4" transform="rotate(11 37 17)" />

      {/* cup body */}
      <path d="M11 28 h38 l-4 56 a5 5 0 0 1-5 4.6 H20 a5 5 0 0 1-5-4.6 Z" fill="#ffffff" opacity="0.55" />
      {/* milk layer (bottom) */}
      <path d="M14.4 62 h31.2 l-2.6 22 a5 5 0 0 1-5 4.6 H22 a5 5 0 0 1-5-4.6 Z" fill="#fffaf2" />
      {/* matcha layer (top) */}
      <path d="M12 32 h36 l-2.2 32 H14.2 Z" fill={`url(#${id}m)`} />
      {/* foam line */}
      <rect x="12.4" y="32" width="35.2" height="4.5" rx="2" fill="#c5e59a" />
      {/* ice cubes */}
      <rect x="19" y="39" width="10" height="9" rx="2.5" fill="#ffffff" opacity="0.4" transform="rotate(-12 24 43)" />
      <rect x="33" y="47" width="9" height="8" rx="2.5" fill="#ffffff" opacity="0.35" transform="rotate(15 37 51)" />
      {/* lid */}
      <rect x="8" y="23" width="44" height="8" rx="4" fill="#ffffff" opacity="0.85" />
      <rect x="8" y="23" width="44" height="8" rx="4" fill="none" stroke="#e3ded6" strokeWidth="1.2" />
      {/* cup shine */}
      <path d="M18 34 l-2.4 48" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      {/* outline last, so the cup keeps its shape at small sizes */}
      <path
        d="M11 28 h38 l-4 56 a5 5 0 0 1-5 4.6 H20 a5 5 0 0 1-5-4.6 Z"
        fill="none"
        stroke="#b9b0a4"
        strokeWidth="1.4"
        opacity="0.55"
      />
    </svg>
  )
}

export function Sparkle({ size = 20, color = '#c4b5fd' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 0c.6 6.4 5 10.8 12 12-7 1.2-11.4 5.6-12 12-.6-6.4-5-10.8-12-12C7 10.8 11.4 6.4 12 0Z"
        fill={color}
      />
    </svg>
  )
}

export function Heart({ size = 18, color = '#f0abfc' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s-8.5-5.3-8.5-11A5 5 0 0 1 12 6.6 5 5 0 0 1 20.5 10c0 5.7-8.5 11-8.5 11Z"
        fill={color}
      />
    </svg>
  )
}

import { useEffect, useRef, useState } from 'react'
import Envelope from './components/Envelope.jsx'
import PhotoBurst from './components/PhotoBurst.jsx'
import Bouquet from './components/Bouquet.jsx'
import { Flower, Matcha, Sparkle, Heart } from './components/Decor.jsx'

/* ────────────────────────────────────────────────────────────────
   ✍️  WRITE YOUR MESSAGE HERE
   Leave it as an empty string ('') to keep the letter blank.
   Line breaks are preserved exactly as you type them.
   ──────────────────────────────────────────────────────────────── */
const LETTER_TEXT = `To my lovely girlfriend,

I know I can't give you flowers in person so I did my best to bring them here!

It's been a really great few months with you. You are the sweetest person I know, and I feel so grateful that I met you.

I know it's hard only being able to text. We spend just as much time on facetime as in real life. But seeing you that weekend made me realize then it was all worth it - even just for a few days.

Thank you for the warmth, connection, and trust you bring me.

Love,

Your funky boyfriend,

Josh`

const SIGNATURE = '' // e.g. 'love, josh'

// Decorations that bloom out of the envelope alongside the photos.
const decor = [
  { el: <Flower size={62} tone="violet" />, x: '-40vw', y: '-40vh', r: -18, d: 120 },
  { el: <Flower size={44} tone="lilac" />, x: '41vw', y: '-42vh', r: 22, d: 260 },
  { el: <Matcha size={46} />, x: '-42vw', y: '-16vh', r: -12, d: 340 },
  { el: <Flower size={52} tone="orchid" />, x: '43vw', y: '-14vh', r: 14, d: 200 },
  { el: <Matcha size={54} />, x: '40vw', y: '16vh', r: 10, d: 420 },
  { el: <Flower size={58} tone="violet" />, x: '-43vw', y: '13vh', r: 16, d: 480 },
  { el: <Flower size={40} tone="lilac" />, x: '-24vw', y: '41vh', r: -20, d: 540 },
  { el: <Matcha size={40} />, x: '25vw', y: '42vh', r: -8, d: 600 },
  { el: <Flower size={36} tone="orchid" />, x: '-13vw', y: '-44vh', r: 25, d: 660 },
  { el: <Sparkle size={26} />, x: '15vw', y: '-45vh', r: 0, d: 720 },
  { el: <Sparkle size={20} color="#f5d0fe" />, x: '-33vw', y: '30vh', r: 0, d: 760 },
  { el: <Heart size={24} color="#d8b4fe" />, x: '34vw', y: '-30vh', r: 0, d: 800 },
]

// Soft decor that sits in the background from the very first screen.
const ambient = [
  { el: <Flower size={104} tone="lilac" />, css: { top: '-3%', left: '-9%' }, r: -14, s: 7 },
  { el: <Flower size={78} tone="violet" />, css: { top: '9%', right: '-6%' }, r: 18, s: 8.5 },
  { el: <Matcha size={70} />, css: { bottom: '4%', left: '-5%' }, r: -9, s: 9 },
  { el: <Flower size={92} tone="orchid" />, css: { bottom: '-4%', right: '-8%' }, r: 12, s: 7.5 },
  { el: <Matcha size={52} />, css: { top: '24%', left: '6%' }, r: 8, s: 10 },
  { el: <Flower size={54} tone="violet" />, css: { bottom: '26%', right: '7%' }, r: -16, s: 8 },
]

// Ambient petals drifting down behind everything, always on.
const petals = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.3 + 4) % 96}%`,
  delay: `${(i * 1.6) % 14}s`,
  dur: `${13 + (i % 5) * 2.5}s`,
  size: 12 + (i % 4) * 6,
  tone: ['violet', 'lilac', 'orchid'][i % 3],
}))

export default function App() {
  const [taps, setTaps] = useState(0)
  const [phase, setPhase] = useState('closed') // closed → opening → open
  const [atEnd, setAtEnd] = useState(false)
  const bodyRef = useRef(null)

  // Hide the "there's more below" cue once she's read to the bottom.
  const handleLetterScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    setAtEnd(scrollTop + clientHeight >= scrollHeight - 12)
  }

  const handleTap = () => {
    if (phase !== 'closed') return
    const next = taps + 1
    setTaps(next)
    if (next >= 3) setPhase('opening')
  }

  // Let the flap finish swinging before the letter + photos take over.
  useEffect(() => {
    if (phase !== 'opening') return
    const t = setTimeout(() => setPhase('open'), 900)
    return () => clearTimeout(t)
  }, [phase])

  const open = phase === 'open'

  // If the whole letter already fits, there is nothing to scroll — drop the cue.
  useEffect(() => {
    if (!open) return
    const el = bodyRef.current
    if (el && el.scrollHeight <= el.clientHeight + 12) setAtEnd(true)
  }, [open])

  return (
    <main className={`app ${phase}`}>
      <div className="bg-glow" aria-hidden="true" />

      <div className="ambient" aria-hidden="true">
        {ambient.map((a, i) => (
          <span
            key={i}
            className="ambient-item"
            style={{ ...a.css, '--r': `${a.r}deg`, '--sway': `${a.s}s` }}
          >
            {a.el}
          </span>
        ))}
      </div>

      <div className="petals" aria-hidden="true">
        {petals.map((p, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          >
            <Flower size={p.size} tone={p.tone} />
          </span>
        ))}
      </div>

      <div className="decor" aria-hidden="true">
        {open &&
          decor.map((d, i) => (
            <span
              key={i}
              className="decor-item"
              style={{
                '--x': d.x,
                '--y': d.y,
                '--r': `${d.r}deg`,
                '--delay': `${d.d}ms`,
                '--sway': `${6 + (i % 4)}s`,
              }}
            >
              {d.el}
            </span>
          ))}
      </div>

      <PhotoBurst active={open} />

      {open && (
        <div className="bouquet" aria-hidden="true">
          <Bouquet width={244} />
        </div>
      )}

      {phase !== 'open' && <Envelope taps={taps} phase={phase} onTap={handleTap} />}

      {open && (
        <article className="letter">
          <div className="letter-edge" />
          <div className="letter-body" ref={bodyRef} onScroll={handleLetterScroll}>
            {LETTER_TEXT ? (
              LETTER_TEXT.split(/\n{2,}/).map((para, i) => (
                <p key={i} className="letter-text">
                  {para}
                </p>
              ))
            ) : (
              <div className="letter-lines" aria-hidden="true">
                {Array.from({ length: 9 }, (_, i) => (
                  <span key={i} />
                ))}
              </div>
            )}
            {SIGNATURE && <p className="letter-sign">{SIGNATURE}</p>}
            <span className="letter-heart">
              <Heart size={20} color="#c084fc" />
            </span>
          </div>
          <div className={`letter-fade ${atEnd ? 'hide' : ''}`} aria-hidden="true">
            <span className="letter-chevron">⌄</span>
          </div>
        </article>
      )}
    </main>
  )
}

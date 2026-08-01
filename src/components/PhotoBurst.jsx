import { useState } from 'react'

// Vite bundles + hashes these at build time, so they work on GitHub Pages.
const modules = import.meta.glob('../assets/photos/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
})
const photos = Object.keys(modules)
  .sort()
  .map((k) => modules[k])

// Where each polaroid flies to, measured from the middle of the screen.
// Tuned to frame the letter. The bottom-centre slot is left free for the bouquet,
// so the seventh photo sits top-centre instead.
const spots = [
  { x: '-33vw', y: '-30vh', r: -13 },
  { x: '33vw', y: '-31vh', r: 11 },
  { x: '-38vw', y: '-5vh', r: 8 },
  { x: '38vw', y: '1vh', r: -9 },
  { x: '-33vw', y: '25vh', r: 14 },
  { x: '34vw', y: '27vh', r: -12 },
  { x: '0vw', y: '-42vh', r: 4 },
]

export default function PhotoBurst({ active }) {
  const [zoomed, setZoomed] = useState(null)

  if (!active) return null

  return (
    <>
      <div className="burst" aria-hidden={false}>
        {photos.map((src, i) => {
          const s = spots[i % spots.length]
          return (
            <button
              key={src}
              className="polaroid"
              style={{
                '--x': s.x,
                '--y': s.y,
                '--r': `${s.r}deg`,
                '--delay': `${i * 110}ms`,
                '--float': `${5 + (i % 3)}s`,
              }}
              onClick={() => setZoomed(src)}
              aria-label={`Photo ${i + 1}`}
            >
              <img src={src} alt="" loading="eager" />
              <span className="polaroid-lip" />
            </button>
          )
        })}
      </div>

      {zoomed && (
        <div className="lightbox" onClick={() => setZoomed(null)} role="dialog">
          <img src={zoomed} alt="" />
          <p>tap anywhere to close</p>
        </div>
      )}
    </>
  )
}

import { Heart } from './Decor.jsx'

/**
 * Closed envelope. Takes 3 taps to open — each tap wiggles it and lights a heart.
 * `phase` is 'closed' | 'opening' | 'open' (owned by App).
 */
export default function Envelope({ taps, phase, onTap }) {
  const flapOpen = phase !== 'closed'

  return (
    <div className={`env-stage ${phase}`}>
      <button
        className={`env ${flapOpen ? 'is-open' : ''}`}
        style={{ '--wiggle-key': taps }}
        key={taps}
        onClick={onTap}
        aria-label="Open the letter"
      >
        <span className="env-back" />
        <span className="env-paper" />
        <span className="env-front" />
        <span className="env-flap" />
        <span className="env-seal">
          <Heart size={18} color="#fff" />
        </span>
      </button>

      <div className="env-hint">
        <p>tap me three times</p>
        <div className="env-dots">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`env-dot ${taps > i ? 'on' : ''}`}>
              <Heart size={16} color={taps > i ? '#a855f7' : '#cdb9ec'} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

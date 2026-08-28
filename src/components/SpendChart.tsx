// Spending by category — single-measure magnitude, so ONE hue (the primary),
// no categorical palette. Hand-rolled SVG; labels and values wear text tokens,
// never the series color. Bars are thin with rounded data-ends; native <title>
// tooltips carry the hover layer.
import { useState } from 'react'
import { SPENDING, money } from '../data'

const W = 480
const ROW = 34
const LABEL_W = 120
const VALUE_W = 78
const BAR_MAX = W - LABEL_W - VALUE_W

export function SpendChart() {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...SPENDING.map(s => s.amount))
  const H = SPENDING.length * ROW

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="Spending by category this month"
    >
      {SPENDING.map((s, i) => {
        const w = Math.max(8, (s.amount / max) * BAR_MAX)
        const y = i * ROW
        const active = hover === i
        return (
          <g
            key={s.category}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <title>{`${s.category}: ${money(s.amount)}`}</title>
            {/* row hit target */}
            <rect x={0} y={y} width={W} height={ROW} fill="transparent" />
            <text
              x={0}
              y={y + ROW / 2 + 4}
              fontSize={12}
              fill="var(--md-sys-color-on-surface-variant)"
            >
              {s.category}
            </text>
            <rect
              x={LABEL_W}
              y={y + ROW / 2 - 7}
              width={w}
              height={14}
              rx={4}
              fill="var(--md-sys-color-primary)"
              opacity={hover === null || active ? 1 : 0.55}
            />
            <text
              x={LABEL_W + w + 8}
              y={y + ROW / 2 + 4}
              fontSize={12}
              fontWeight={active ? 600 : 400}
              fill="var(--md-sys-color-on-surface)"
            >
              {money(s.amount)}
            </text>
          </g>
        )
      })}
      {/* recessive baseline */}
      <line x1={LABEL_W} y1={0} x2={LABEL_W} y2={H} stroke="var(--md-sys-color-outline-variant)" />
    </svg>
  )
}

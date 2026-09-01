// WIRING CHECK — verifies the adapter wiring, never the engine. The engine
// owns the contrast guarantee; this walks the pairings the ADAPTER creates
// when it maps tokens into MUI slots (which on lands on which fill, which
// text on which plane) and asserts they hold the engine's bars (4.5:1 text,
// 3.0:1 crayon). A failure means a mis-wired mapping, not an engine problem.
//
// Run: npm run check:wiring
// Hexes come from the same LaneTokens the app renders — a failure here is a
// failure the user would see.
import { resolveSeed } from '../src/seed'
import { laneTokens, NAME, type LaneTokens } from '../src/theme/tokens'

// Agnostic seed sweep — hue × chroma spread, no named brands.
const SEEDS = ['#1D5AF0', '#0E8A5F', '#C2418A', '#B98300', '#6B4FD8']

const TEXT_BAR = 4.5
const WAX_BAR = 3.0

// WCAG relative luminance / contrast ratio from sRGB hex.
function lum(hex: string): number {
  const c = hex.replace('#', '')
  const ch = (i: number) => {
    const v = parseInt(c.slice(i, i + 2), 16) / 255
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * ch(0) + 0.7152 * ch(2) + 0.0722 * ch(4)
}
const ratio = (a: string, b: string): number => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

interface Failure {
  seed: string
  lane: string
  pair: string
  got: number
  bar: number
}
const failures: Failure[] = []
let checked = 0

function assertPair(seed: string, lane: string, pair: string, fg: string, bg: string, bar: number) {
  checked++
  const got = ratio(fg, bg)
  if (got < bar - 1e-9) failures.push({ seed, lane, pair, got, bar })
}

function checkLane(seed: string, t: LaneTokens) {
  const lane = t.lane

  // on-fill on its fill — the stamp family and every signal (both adapters ship these)
  assertPair(seed, lane, 'stamp-on / stamp-fill', t.stamp.on, t.stamp.fill, TEXT_BAR)
  if (t.secondaryStamp)
    assertPair(seed, lane, 'secondary on / fill', t.secondaryStamp.on, t.secondaryStamp.fill, TEXT_BAR)
  for (const role of ['critical', 'warning', 'positive', 'info'] as const) {
    const s = t.signals[role]
    assertPair(seed, lane, `${role} on / fill`, s.on, s.fill, TEXT_BAR)
    // alert soft pair: signal pen on signal highlighter
    assertPair(seed, lane, `${role} pen / highlighter`, s.pen, s.highlighter, TEXT_BAR)
  }

  // text stops on every plane they sit on (cards use low/mid/high; dialogs high)
  for (const [plane, bg] of Object.entries(t.planes)) {
    assertPair(seed, lane, `on-surface / plane-${plane}`, t.neutral(NAME.textStrong), bg, TEXT_BAR)
    assertPair(seed, lane, `on-surface-variant / plane-${plane}`, t.neutral(NAME.pencil), bg, TEXT_BAR)
    // the link trio renders on the same planes
    assertPair(seed, lane, `link / plane-${plane}`, t.link.default, bg, TEXT_BAR)
  }

  // outline vs the surface the engine's law gates it on (crayon-26 is clamped vs
  // the paper-5 tier — plane-dim in light, plane-high in dark; asserting it
  // against the poles would over-assert a guarantee the engine never made)
  const waxGround = lane === 'light' ? t.planes.dim : t.planes.high
  assertPair(seed, lane, 'outline / its gated plane', t.neutral(NAME.crayon), waxGround, WAX_BAR)
}

for (const hex of SEEDS) {
  const seed = resolveSeed(hex)
  checkLane(hex, laneTokens(seed, 'light'))
  checkLane(hex, laneTokens(seed, 'dark'))
}

if (failures.length) {
  console.error(`wiring check FAILED — ${failures.length} of ${checked} adapter pairings under the bar:`)
  for (const f of failures)
    console.error(`  ${f.seed} ${f.lane}  ${f.pair}  ${f.got.toFixed(2)} < ${f.bar}`)
  process.exit(1)
}
console.log(`wiring OK — ${checked} adapter pairings across ${SEEDS.length} seeds × 2 lanes hold the engine bars (${TEXT_BAR}/${WAX_BAR})`)

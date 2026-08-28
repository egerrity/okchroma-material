// The design-owned contrast guarantee: walks the pairs BOTH adapters actually
// ship — every on-X on its X, text on the planes it sits on, outline against
// the surface the engine's law gates it on — and asserts the WCAG bars
// (4.5:1 text, 3.0:1 non-text). Fails loud with the failing pair.
//
// Run: npm run guarantee
// Hexes come from the same LaneTokens the app renders — a failure here is a
// failure the user would see.
import { resolveSeed } from '../src/seed'
import { laneTokens, NAME, type LaneTokens } from '../src/theme/tokens'

// Agnostic seed sweep — hue × chroma spread, no named brands.
const SEEDS = ['#1D5AF0', '#0E8A5F', '#C2418A', '#B98300', '#6B4FD8']

const TEXT_BAR = 4.5
const MARK_BAR = 3.0

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
    // alert soft pair: signal ink on signal wash
    assertPair(seed, lane, `${role} ink / wash`, s.ink, s.wash, TEXT_BAR)
  }

  // text stops on every plane they sit on (cards use low/mid/high; dialogs high)
  for (const [plane, bg] of Object.entries(t.planes)) {
    assertPair(seed, lane, `on-surface / plane-${plane}`, t.neutral(NAME.inkStrong), bg, TEXT_BAR)
    assertPair(seed, lane, `on-surface-variant / plane-${plane}`, t.neutral(NAME.lead), bg, TEXT_BAR)
    // the link trio renders on the same planes
    assertPair(seed, lane, `link / plane-${plane}`, t.link.default, bg, TEXT_BAR)
  }

  // outline vs the surface the engine's law gates it on (mark-74 is clamped vs
  // the paper-95 tier — plane-dim in light, plane-high in dark; asserting it
  // against the poles would over-assert a guarantee the engine never made)
  const markGround = lane === 'light' ? t.planes.dim : t.planes.high
  assertPair(seed, lane, 'outline / its gated plane', t.neutral(NAME.mark), markGround, MARK_BAR)
}

for (const hex of SEEDS) {
  const seed = resolveSeed(hex)
  checkLane(hex, laneTokens(seed, 'light'))
  checkLane(hex, laneTokens(seed, 'dark'))
}

if (failures.length) {
  console.error(`guarantee FAILED — ${failures.length} of ${checked} pairs under the bar:`)
  for (const f of failures)
    console.error(`  ${f.seed} ${f.lane}  ${f.pair}  ${f.got.toFixed(2)} < ${f.bar}`)
  process.exit(1)
}
console.log(`guarantee OK — ${checked} pairs across ${SEEDS.length} seeds × 2 lanes, bars ${TEXT_BAR}/${MARK_BAR}`)

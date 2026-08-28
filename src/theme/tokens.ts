// Seed → per-lane token values, keyed by okchroma's OWN exported name rosters.
//
// Rename-resilience rule: no engine token name is ever spelled as a string in
// this repo — the ladder is enumerated via stopTokenName, the stamp family via
// the STAMP_* constants, signals via SIGNAL_EMIT_NAME. An engine rename breaks
// this file's build instead of silently mis-mapping.
//
// All hexes come from stopHex (the emit instrument). Never read ColorStop
// channels directly — they are P3-encoded.
import {
  stopHex,
  stopTokenName,
  SCALE_STOP_COUNT,
  OFFSET_ALPHAS,
  ctaNeedsBorder,
  ctaBorderRung,
  pageStopFor,
  CSS_FAMILY,
  type GeneratedScale,
} from 'okchroma'
import { type Seed, type SignalRole } from '../seed'

export type Lane = 'light' | 'dark'

// Ladder positions the adapters need, resolved ONCE from the engine's name
// table so the mapping reads in engine vocabulary. stopFor() throws on a
// missing name, which is exactly the loud failure a renumber should cause.
const stopIndex = new Map<string, number>(
  Array.from({ length: SCALE_STOP_COUNT }, (_, i) => [stopTokenName(i + 1), i]),
)
function stopFor(scale: GeneratedScale, lane: Lane, name: string): string {
  const i = stopIndex.get(name)
  if (i === undefined) throw new Error(`unknown ladder token: ${name}`)
  return stopHex(scale[lane][i])
}

export interface StampValues {
  fill: string
  fillHover: string
  fillPressed: string
  on: string
  /** the gated outline stroke — ALWAYS rendered, usually transparent */
  edge: string
}

export interface SignalValues {
  fill: string
  on: string
  /** soft container ground (alert background tier) */
  wash: string
  /** text on the soft container */
  ink: string
}

export interface LaneTokens {
  lane: Lane
  /** ladder value by engine token name, for the three ramps */
  brand: (name: string) => string
  neutral: (name: string) => string
  secondary: ((name: string) => string) | null
  stamp: StampValues
  secondaryStamp: StampValues | null
  signals: Record<SignalRole, SignalValues>
  /** full ladder + stamp access per signal family (template ramp projection) */
  signalStop: (role: SignalRole, name: string) => string
  signalStamp: (role: SignalRole) => StampValues
  /** the SYSTEM link trio (resolveLinkTrio — a link is not a text-style CTA) */
  link: { default: string; hover: string; pressed: string }
  /** Elevation planes, the owner-shipped per-mode exception (tokens/semantic.css):
   *  the same paper stops serve in reversed order per mode; high/dim take the pole. */
  planes: { dim: string; low: string; mid: string; high: string }
  /** the offset alpha law: ink-or-white at a constant alpha, color flips per lane */
  alpha: (rung: keyof typeof OFFSET_ALPHAS) => string
}

// Engine-vocabulary names for the slots the adapters consume, resolved from the
// name table by ladder position (paper band tops the table, ink band ends it).
const NAME = {
  paperTop: stopTokenName(1), // page tier
  paper2: stopTokenName(2),
  paper3: stopTokenName(3),
  wash4: stopTokenName(4), // container tier
  washBorder: stopTokenName(7), // quiet border (wash-80)
  mark: stopTokenName(8), // the 3:1-clamped ring/border stop (mark-74)
  lead: stopTokenName(9), // first text stop (lead-53)
  inkMid: stopTokenName(10), // between state (ink-42)
  inkStrong: stopTokenName(11), // strong text (ink-30)
}
export { NAME }

function stampValues(
  scale: GeneratedScale,
  lane: Lane,
  neutral?: GeneratedScale,
  cssPrefix: string = CSS_FAMILY.brandPrimary,
): StampValues {
  const isDark = lane === 'dark'
  const white = isDark ? scale.onFillTextIsWhiteDark : scale.onFillTextIsWhite
  // stamp-edge: the engine's own gate against the neutral page — resolves to an
  // offset alpha rung only when the fill sits close to the page, else transparent.
  // Consumers render the border ALWAYS so layout never shifts.
  let edge = 'transparent'
  if (neutral) {
    const page = pageStopFor(neutral, lane)
    if (ctaNeedsBorder(scale, lane, page)) {
      const a = OFFSET_ALPHAS[ctaBorderRung(cssPrefix)]
      edge = isDark ? `rgba(255, 255, 255, ${a})` : `rgba(0, 0, 0, ${a})`
    }
  }
  return {
    fill: stopHex(isDark ? scale.ctaDark : scale.cta),
    fillHover: stopHex(isDark ? scale.ctaHoverDark : scale.ctaHover),
    fillPressed: stopHex(isDark ? scale.ctaPressedDark : scale.ctaPressed),
    on: white ? '#ffffff' : '#000000',
    edge,
  }
}

function signalValues(scale: GeneratedScale, lane: Lane): SignalValues {
  const s = stampValues(scale, lane)
  return {
    fill: s.fill,
    on: s.on,
    wash: stopFor(scale, lane, NAME.paper2),
    ink: stopFor(scale, lane, NAME.inkStrong),
  }
}

export function laneTokens(seed: Seed, lane: Lane): LaneTokens {
  const brandScale = seed.theme.themed.scale
  const secondaryScale = seed.theme.secondary?.scale ?? null
  const n = seed.neutral

  // Plane law from tokens/semantic.css: light dim/low/mid/high = paper-95/97/99/pole-white,
  // dark = pole-black/paper-99/97/95 — same stops, order reversed, poles at the extremes.
  const planes =
    lane === 'light'
      ? {
          dim: stopFor(n, lane, NAME.paper3),
          low: stopFor(n, lane, NAME.paper2),
          mid: stopFor(n, lane, NAME.paperTop),
          high: '#ffffff',
        }
      : {
          dim: '#000000',
          low: stopFor(n, lane, NAME.paperTop),
          mid: stopFor(n, lane, NAME.paper2),
          high: stopFor(n, lane, NAME.paper3),
        }

  const signals = Object.fromEntries(
    (['critical', 'warning', 'positive', 'info'] as SignalRole[]).map(role => [
      role,
      signalValues(seed.signal(role), lane),
    ]),
  ) as Record<SignalRole, SignalValues>

  return {
    lane,
    brand: name => stopFor(brandScale, lane, name),
    neutral: name => stopFor(n, lane, name),
    secondary: secondaryScale ? name => stopFor(secondaryScale, lane, name) : null,
    stamp: stampValues(brandScale, lane, n, CSS_FAMILY.brandPrimary),
    secondaryStamp: secondaryScale ? stampValues(secondaryScale, lane, n, CSS_FAMILY.brandSecondary) : null,
    signals,
    signalStop: (role, name) => stopFor(seed.signal(role), lane, name),
    signalStamp: role => stampValues(seed.signal(role), lane, n),
    // the SYSTEM link trio (agents.md: a link is not a text-style CTA)
    link:
      lane === 'dark'
        ? {
            default: stopHex(seed.link.linkDark),
            hover: stopHex(seed.link.linkHoverDark),
            pressed: stopHex(seed.link.linkPressedDark),
          }
        : {
            default: stopHex(seed.link.link),
            hover: stopHex(seed.link.linkHover),
            pressed: stopHex(seed.link.linkPressed),
          },
    planes,
    alpha: rung =>
      lane === 'dark'
        ? `rgba(255, 255, 255, ${OFFSET_ALPHAS[rung]})`
        : `rgba(0, 0, 0, ${OFFSET_ALPHAS[rung]})`,
  }
}

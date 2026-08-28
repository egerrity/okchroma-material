// LaneTokens → Material 3 system color roles (--md-sys-color-*) plus the
// okchroma extension roles (--okx-*) for what Material has no slot for.
//
// Both lanes are emitted once; the [data-mui-color-scheme] attribute (the same
// one MUI's useColorScheme toggles) selects the dark set, so one switch drives
// the MUI build and the Own build together.
//
// Documented role gaps (owner ruling: no invented third hue):
//   tertiary            → aliased to the secondary-container tier
//   primary-fixed family → not emitted (no engine analog; nothing consumes it here)
import { type LaneTokens, NAME } from './tokens'

function roleVars(t: LaneTokens, other: LaneTokens): Record<string, string> {
  const sec = t.secondary
  const secStamp = t.secondaryStamp
  // secondary falls back to the brand ramp only if derivation ever returns null
  // (deriveSecondary makes this unreachable in practice; loud comment over silence)
  const s = sec ?? t.brand
  const sFill = secStamp ?? t.stamp

  return {
    // ── primary ──────────────────────────────────────────────────────────────
    'md-sys-color-primary': t.stamp.fill,
    'md-sys-color-on-primary': t.stamp.on,
    'md-sys-color-primary-container': t.brand(NAME.wash4),
    'md-sys-color-on-primary-container': t.brand(NAME.inkStrong),

    // ── secondary (derived quiet companion on the brand's own hue) ───────────
    'md-sys-color-secondary': sFill.fill,
    'md-sys-color-on-secondary': sFill.on,
    'md-sys-color-secondary-container': s(NAME.wash4),
    'md-sys-color-on-secondary-container': s(NAME.inkStrong),

    // ── tertiary: GAP — aliased to the secondary-container tier ──────────────
    'md-sys-color-tertiary': s(NAME.lead),
    'md-sys-color-on-tertiary': t.planes.high,
    'md-sys-color-tertiary-container': s(NAME.paper3),
    'md-sys-color-on-tertiary-container': s(NAME.inkStrong),

    // ── error ← critical signal ──────────────────────────────────────────────
    'md-sys-color-error': t.signals.critical.fill,
    'md-sys-color-on-error': t.signals.critical.on,
    'md-sys-color-error-container': t.signals.critical.wash,
    'md-sys-color-on-error-container': t.signals.critical.ink,

    // ── surfaces ← the plane law + the neutral ladder ────────────────────────
    'md-sys-color-surface': t.planes.low,
    'md-sys-color-surface-dim': t.planes.dim,
    'md-sys-color-surface-bright': t.planes.high,
    'md-sys-color-surface-container-lowest': t.planes.high,
    'md-sys-color-surface-container-low': t.planes.mid,
    'md-sys-color-surface-container': t.planes.low,
    'md-sys-color-surface-container-high': t.planes.dim,
    'md-sys-color-surface-container-highest': t.neutral(NAME.wash4),
    'md-sys-color-on-surface': t.neutral(NAME.inkStrong),
    'md-sys-color-on-surface-variant': t.neutral(NAME.lead),

    // ── outline: like-for-like — MD3 wants 3:1, mark-74 is 3:1-clamped ───────
    'md-sys-color-outline': t.neutral(NAME.mark),
    'md-sys-color-outline-variant': t.neutral(NAME.washBorder),

    // ── inverse ← the other lane (the engine emits a real dark lane) ─────────
    'md-sys-color-inverse-surface': other.planes.mid,
    'md-sys-color-inverse-on-surface': other.neutral(NAME.inkStrong),
    'md-sys-color-inverse-primary': other.stamp.fill,

    'md-sys-color-surface-tint': t.stamp.fill,
    'md-sys-color-scrim': '#000000',
    'md-sys-color-shadow': '#000000',

    // ── okx extensions: roles Material is missing ────────────────────────────
    // the link trio (Material has no link role)
    'okx-link': t.link.default,
    'okx-link-hover': t.link.hover,
    'okx-link-pressed': t.link.pressed,
    // real guaranteed state colors (vs MD3's opacity state-layers)
    'okx-fill-hover': t.stamp.fillHover,
    'okx-fill-pressed': t.stamp.fillPressed,
    'okx-secondary-fill-hover': sFill.fillHover,
    'okx-secondary-fill-pressed': sFill.fillPressed,
    // the focus ring law
    'okx-focus': t.neutral(NAME.mark),
    // outlined-action border = the brand's own gated ring stop
    'okx-primary-outline': t.brand(NAME.mark),
    // the between text/state stop (no MD3 analog)
    'okx-ink-mid': t.neutral(NAME.inkMid),
    // full signal set (MD3 ships only error)
    ...Object.fromEntries(
      (['warning', 'positive', 'info'] as const).flatMap(role => [
        [`okx-${role}`, t.signals[role].fill],
        [`okx-on-${role}`, t.signals[role].on],
        [`okx-${role}-container`, t.signals[role].wash],
        [`okx-on-${role}-container`, t.signals[role].ink],
      ]),
    ),
    // the offset alpha law (state washes that composite on any ground)
    'okx-alpha-6': t.alpha(6),
    'okx-alpha-8': t.alpha(8),
    'okx-alpha-16': t.alpha(16),
  }
}

const block = (selector: string, vars: Record<string, string>): string =>
  `${selector} {\n${Object.entries(vars)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join('\n')}\n}`

/** The full role stylesheet for both lanes. Inject once per seed. */
export function md3Css(light: LaneTokens, dark: LaneTokens): string {
  return [
    block(':root', roleVars(light, dark)),
    block('[data-mui-color-scheme="dark"]', roleVars(dark, light)),
  ].join('\n\n')
}

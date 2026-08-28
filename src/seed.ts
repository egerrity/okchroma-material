// One brand hex in → the whole app's color system out.
//
// This is the only module that talks to the okchroma resolver. Everything else
// consumes the LaneTokens built in theme/tokens.ts from this result. WCAG lane
// throughout (employer constraint — no APCA anywhere in this PoC).
import {
  resolveTheme,
  generateNeutralScale,
  signalScalesFor,
  SIGNAL_EMIT_NAME,
  type ResolvedTheme,
  type GeneratedScale,
} from 'okchroma'

export type SignalRole = 'critical' | 'warning' | 'positive' | 'info'

export interface Seed {
  hex: string
  theme: ResolvedTheme
  neutral: GeneratedScale
  /** Theme-effective signal scale by ROLE — override-aware (a brand that collides
   *  with a signal ships a per-brand variant; this resolves to it). */
  signal: (role: SignalRole) => GeneratedScale
}

export const DEFAULT_SEED = '#1D5AF0'

export function resolveSeed(hex: string): Seed {
  const theme = resolveTheme({
    primaryHex: hex,
    name: 'poc',
    deriveSecondary: true,
    contrastProfile: 'wcag',
  })
  const neutral = generateNeutralScale(theme.themed.scale.brandH, 'default', 'wcag')

  const base = signalScalesFor('wcag')
  const byRole = new Map<SignalRole, GeneratedScale>()
  for (const [identity, { scale }] of base) {
    const override = theme.themed.signalOverrides.find(o => o.name === identity)
    byRole.set(SIGNAL_EMIT_NAME[identity] as SignalRole, override?.scale ?? scale)
  }

  return {
    hex,
    theme,
    neutral,
    signal: role => {
      const s = byRole.get(role)
      if (!s) throw new Error(`no signal scale for role ${role}`)
      return s
    },
  }
}

/** Loose hex validation for the seed input. */
export const isHex = (v: string): boolean => /^#?[0-9a-fA-F]{6}$/.test(v)
export const normalizeHex = (v: string): string => (v.startsWith('#') ? v : `#${v}`)

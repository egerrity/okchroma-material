// Dump both lanes' LaneTokens for a seed as JSON — feeds the Figma wiring.
// Run: esbuild bundle + node (same harness as guarantee.ts).
import { resolveSeed } from '../src/seed'
import { laneTokens, NAME } from '../src/theme/tokens'

const hex = process.argv[2] ?? '#1D5AF0'
const seed = resolveSeed(hex)

const lane = (l: 'light' | 'dark') => {
  const t = laneTokens(seed, l)
  const ladder = (f: (n: string) => string) =>
    Object.fromEntries(Object.values(NAME).map(n => [n, f(n)]))
  return {
    brand: ladder(t.brand),
    neutral: ladder(t.neutral),
    secondary: t.secondary ? ladder(t.secondary) : null,
    stamp: t.stamp,
    secondaryStamp: t.secondaryStamp,
    signals: t.signals,
    link: t.link,
    planes: t.planes,
    alpha: { a6: t.alpha(6), a8: t.alpha(8), a16: t.alpha(16) },
  }
}

console.log(JSON.stringify({ seed: hex, light: lane('light'), dark: lane('dark') }, null, 1))

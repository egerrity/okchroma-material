// The edge-case seed roster — a FIXED set, deliberately not a free picker:
// the render is reviewed on the same seeds scripts/check-map.ts sweeps, so
// anything the eye catches is reproducible and already contrast-verified.
// Each entry names what it stresses.
import * as React from 'react'
import { DEFAULT_SEED } from '../seed'

export const SEED_ROSTER: ReadonlyArray<{ hex: string; label: string }> = [
  { hex: DEFAULT_SEED, label: 'Blue (default)' },
  { hex: '#0E8A5F', label: 'Green (positive-adjacent)' },
  { hex: '#C2418A', label: 'Magenta' },
  { hex: '#E53935', label: 'Red (critical collision)' },
  { hex: '#FFD600', label: 'Gold (light seed)' },
  { hex: '#F5F5F5', label: 'Near-white (degenerate)' },
]

interface SeedState {
  hex: string
  setHex: (hex: string) => void
}

const SeedCtx = React.createContext<SeedState>({ hex: DEFAULT_SEED, setHex: () => {} })

export const useSeedHex = () => React.useContext(SeedCtx)

export function SeedProvider({ children }: { children: React.ReactNode }) {
  const [hex, setHex] = React.useState(DEFAULT_SEED)
  const value = React.useMemo(() => ({ hex, setHex }), [hex])
  return <SeedCtx.Provider value={value}>{children}</SeedCtx.Provider>
}

// The template dashboard is the only preview surface. Seed state lives here;
// the header's pickers set it, buildColorSchemes rebuilds the theme.
//
// Picker drags fire per tick; the theme rebuild is debounced (150ms) so the
// preview stays live without rebuilding on every wheel movement.
import { useMemo, useRef, useState } from 'react'
import Dashboard from './dashboard/Dashboard'
import { SeedContext } from './seedContext'
import { DEFAULT_SEED } from './seed'

function useDebounced<T>(set: (v: T) => void, ms: number): (v: T) => void {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  return (v: T) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => set(v), ms)
  }
}

export default function App() {
  const [brandHex, setBrandHex] = useState(DEFAULT_SEED)
  const [altHex, setAltHex] = useState<string | null>(null)
  const setBrandDebounced = useDebounced(setBrandHex, 150)
  const setAltDebounced = useDebounced(setAltHex, 150)
  const seed = useMemo(
    () => ({ brandHex, altHex, setBrandHex: setBrandDebounced, setAltHex: setAltDebounced }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [brandHex, altHex],
  )
  return (
    <SeedContext.Provider value={seed}>
      <Dashboard />
    </SeedContext.Provider>
  )
}

// The template dashboard is the only preview surface. Seed state lives here;
// the header's pickers set it, buildColorSchemes rebuilds the theme.
import { useMemo, useState } from 'react'
import Dashboard from './dashboard/Dashboard'
import { SeedContext } from './seedContext'
import { DEFAULT_SEED } from './seed'

export default function App() {
  const [brandHex, setBrandHex] = useState(DEFAULT_SEED)
  const [altHex, setAltHex] = useState<string | null>(null)
  const seed = useMemo(
    () => ({ brandHex, altHex, setBrandHex, setAltHex }),
    [brandHex, altHex],
  )
  return (
    <SeedContext.Provider value={seed}>
      <Dashboard />
    </SeedContext.Provider>
  )
}
